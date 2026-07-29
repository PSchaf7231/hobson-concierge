'use client'

import { useEffect, useRef, useState } from 'react'
import { X, Mic } from 'lucide-react'

// Live, real-time conversational voice agent — distinct from the dictate-then-TTS
// mic button elsewhere in the app. This opens one persistent WebSocket to Deepgram's
// Voice Agent (STT + Claude + TTS in one pipeline) for an actual back-and-forth call.
const HOBSON_PROMPT = `# Role
You are HOBSON — an AI concierge inspired by the English butler Hobson from the film Arthur (1981). Impeccable, observant, quietly witty, never gushing.

# Voice rules
Short, elegant sentences — 1-2 sentences per turn, under 200 characters unless asked for detail. No markdown, no emojis, no modern slang. Never break character to say "as an AI."

# Address
Use the caller's first name once you know it. Never guess "sir" or "madam" without direct evidence of gender. When unsure, default to neutral: "Of course." "Very good."

# What you're doing on this call
You represent Paul Schafranick's real estate practice (residential via The Anasa Collection, commercial via Next Endeavor CRE) and, where relevant, Go VIP Limos. Your job on this call: greet warmly, discover naturally what the caller needs (buying, selling, renting, or commercial), and gather their name and best contact info within the first few exchanges — never pushy. You do not have live access to specific listings on this call, so do not invent or promise specific properties; instead let them know Paul or the appropriate specialist will follow up with tailored options.

# Never
Insult a client, invent listings, use slang, or break character.`

const KEYTERMS = [
  'PalmBeachRealEstatePros.com', 'VantaSure Realty', 'VantaSure', 'The Anasa Collection', 'Anasa',
  'Next Endeavor CRE', 'NextEndeavorCRE.com', 'United Realty Group', 'URGFL', 'GoVipLimos.com',
  'Royal Palm Yacht & Country Club', 'The Sanctuary', 'Le Lac', 'Long Lake Estates', 'Woodfield Country Club',
  'St. Andrews Country Club', 'Boca West', 'Broken Sound', 'Boca Bridges', 'Seven Bridges', 'The Bridges',
  'Lotus', 'Boca Pointe', 'Boca Grove', 'Boca Falls', 'Boca Bath & Tennis', 'Les Jardins', 'Timbercreek',
  'Millpond', 'Mizner Park', 'Camino Real', 'Palmetto Park', 'Boca Delray', 'Addison Reserve', 'Boca Marina',
  'Lake Ida', 'Tropic Isle', 'Pineapple Grove', 'Stone Creek Ranch', 'Foxe Chase', 'Mizner Country Club',
  'Delaire Country Club', 'Gleneagles', 'Seagate', 'Seagate Towers', 'Marina Historic District', 'Delray Isle',
  'Seagrove', 'Palm Trail', 'Rio Poco', 'Tierra Del Rey', 'Delray Lakes Estates', 'Kings Point',
  'Atlantic Avenue', 'East Delray', 'West Delray', 'Loch Bar', 'Delray Beach', 'Boca Raton',
  'Palm Beach County', 'Triple-Net', 'NNN', 'Cap Rate', 'Ambulatory Surgery Center', 'Dialysis Clinic',
  'Medical Office Building', 'DaVita', 'Fresenius', '1031 Exchange', 'Waterfront Estate', 'Gated Community',
  'Deepwater Access', 'Single-Tenant', 'Acquisition Strategy',
]

const SETTINGS_MESSAGE = {
  type: 'Settings',
  audio: {
    input: { encoding: 'linear16', sample_rate: 48000 },
    output: { encoding: 'linear16', sample_rate: 24000, container: 'none' },
  },
  agent: {
    language: 'en',
    speak: { provider: { type: 'deepgram', model: 'aura-2-draco-en' } },
    listen: { provider: { type: 'deepgram', model: 'flux-general-en', keyterms: KEYTERMS } },
    think: { provider: { type: 'anthropic', model: 'claude-sonnet-5' }, prompt: HOBSON_PROMPT },
    greeting: 'Good day. This is Hobson. How may I be of service today?',
  },
}

function floatTo16BitPCM(float32Array) {
  const out = new Int16Array(float32Array.length)
  for (let i = 0; i < float32Array.length; i++) {
    const s = Math.max(-1, Math.min(1, float32Array[i]))
    out[i] = s < 0 ? s * 0x8000 : s * 0x7fff
  }
  return out
}

function reportLog(payload) {
  try {
    fetch('/api/voice-agent-log', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      keepalive: true,
    }).catch(() => {})
  } catch (e) {}
}

export default function HobsonVoiceAgent({ onClose }) {
  const [status, setStatus] = useState('connecting') // connecting | listening | speaking | error | closed
  const [errorMsg, setErrorMsg] = useState('')
  const connectionRef = useRef(null)
  const micStreamRef = useRef(null)
  const inputCtxRef = useRef(null)
  const outputCtxRef = useRef(null)
  const playheadRef = useRef(0)
  const stoppedRef = useRef(false)

  useEffect(() => {
    let cancelled = false

    async function start() {
      try {
        const tokenRes = await fetch('/api/voice-agent-token', { method: 'POST' })
        const tokenData = await tokenRes.json()
        if (!tokenRes.ok || !tokenData.access_token) {
          throw new Error(tokenData.error || 'Could not get a voice session token')
        }
        if (cancelled) return

        const { DeepgramClient } = await import('@deepgram/sdk')
        const dg = new DeepgramClient({ accessToken: tokenData.access_token })
        const connection = await dg.agent.v1.connect({ Authorization: `Bearer ${tokenData.access_token}` })
        connectionRef.current = connection

        // Deepgram rejects any mic audio sent before it confirms our Settings
        // message was applied ("Received binary message before Settings") — so
        // mic startup below waits on this instead of firing right after sendSettings.
        let settingsApplied
        const settingsAppliedPromise = new Promise((resolve) => { settingsApplied = resolve })

        connection.on('error', (err) => {
          reportLog({ event: 'sdk-error', message: err.message, stack: err.stack })
          settingsApplied()
          if (cancelled) return
          setStatus('error')
          setErrorMsg(err.message || 'Connection error')
        })
        connection.on('close', () => {
          reportLog({ event: 'sdk-close' })
          settingsApplied()
          if (!cancelled) setStatus('closed')
        })
        connection.on('message', (data) => {
          if (cancelled || !data || typeof data !== 'object') return
          if (data.type === 'SettingsApplied') settingsApplied()
          if (data.type === 'AgentStartedSpeaking') setStatus('speaking')
          if (data.type === 'UserStartedSpeaking') setStatus('listening')
          if (data.type === 'AgentAudioDone') setStatus('listening')
          if (data.type === 'Error') {
            reportLog({ event: 'agent-error-message', data })
            settingsApplied()
            setStatus('error')
            setErrorMsg(data.description || 'Agent error')
          }
        })

        // The SDK's built-in 'message' handler JSON-parses every frame, which breaks on
        // the binary audio frames the agent sends back — so we listen for those directly
        // on the underlying socket instead, ourselves, to actually play Hobson's voice.
        connection.socket.addEventListener('message', (event) => {
          if (cancelled) return
          if (event.data instanceof ArrayBuffer) playAudioChunk(event.data)
          else if (event.data instanceof Blob) event.data.arrayBuffer().then((buf) => { if (!cancelled) playAudioChunk(buf) })
        })
        // Raw close event has the actual WebSocket close code/reason Deepgram sent,
        // which the SDK's own 'close' event doesn't surface.
        connection.socket.addEventListener('close', (event) => {
          reportLog({ event: 'raw-socket-close', code: event.code, reason: event.reason, wasClean: event.wasClean })
        })

        connection.connect()
        await connection.waitForOpen()
        if (cancelled) return
        connection.sendSettings(SETTINGS_MESSAGE)

        await settingsAppliedPromise
        if (cancelled || connection.socket?.readyState !== WebSocket.OPEN) return

        await startMic(connection)
        if (!cancelled) setStatus('listening')
      } catch (e) {
        reportLog({ event: 'start-exception', message: e.message, stack: e.stack })
        if (!cancelled) { setStatus('error'); setErrorMsg(e.message || 'Could not start voice session') }
      }
    }

    async function startMic(connection) {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      micStreamRef.current = stream
      const inputCtx = new (window.AudioContext || window.webkitAudioContext)({ sampleRate: 48000 })
      inputCtxRef.current = inputCtx
      const source = inputCtx.createMediaStreamSource(stream)
      const processor = inputCtx.createScriptProcessor(4096, 1, 1)
      processor.onaudioprocess = (e) => {
        if (stoppedRef.current) return
        const pcm = floatTo16BitPCM(e.inputBuffer.getChannelData(0))
        try { connection.sendMedia(pcm.buffer) } catch (err) { /* socket not open yet/anymore */ }
      }
      source.connect(processor)
      processor.connect(inputCtx.destination)
      inputCtxRef.current._processor = processor
      inputCtxRef.current._source = source
    }

    function playAudioChunk(arrayBuffer) {
      if (!outputCtxRef.current) {
        outputCtxRef.current = new (window.AudioContext || window.webkitAudioContext)({ sampleRate: 24000 })
        playheadRef.current = outputCtxRef.current.currentTime
      }
      const ctx = outputCtxRef.current
      const int16 = new Int16Array(arrayBuffer)
      const float32 = new Float32Array(int16.length)
      for (let i = 0; i < int16.length; i++) float32[i] = int16[i] / 0x8000
      const buffer = ctx.createBuffer(1, float32.length, 24000)
      buffer.copyToChannel(float32, 0)
      const src = ctx.createBufferSource()
      src.buffer = buffer
      src.connect(ctx.destination)
      const startAt = Math.max(ctx.currentTime, playheadRef.current)
      src.start(startAt)
      playheadRef.current = startAt + buffer.duration
    }

    start()

    return () => {
      cancelled = true
      stoppedRef.current = true
      try { connectionRef.current?.close() } catch (e) {}
      try { micStreamRef.current?.getTracks().forEach((t) => t.stop()) } catch (e) {}
      try { inputCtxRef.current?._processor?.disconnect() } catch (e) {}
      try { inputCtxRef.current?._source?.disconnect() } catch (e) {}
      try { inputCtxRef.current?.close() } catch (e) {}
      try { outputCtxRef.current?.close() } catch (e) {}
    }
  }, [])

  const label = {
    connecting: 'Connecting…',
    listening: 'Listening…',
    speaking: 'Hobson is speaking…',
    error: errorMsg || 'Something went wrong',
    closed: 'Call ended',
  }[status]

  return (
    <div className="fixed inset-0 z-50 bg-[#0A1628]/95 flex flex-col items-center justify-center gap-6 px-6">
      <button onClick={onClose} className="absolute top-6 right-6 text-[#D4AF37]/70 hover:text-[#D4AF37]" aria-label="End call">
        <X className="h-6 w-6" />
      </button>
      <div className={`h-24 w-24 rounded-full flex items-center justify-center border-2 ${status === 'error' ? 'border-red-400' : 'border-[#D4AF37]'} ${status === 'speaking' || status === 'listening' ? 'animate-pulse' : ''}`}>
        <Mic className={`h-9 w-9 ${status === 'error' ? 'text-red-400' : 'text-[#D4AF37]'}`} />
      </div>
      <div className="text-[#F5EDE0] text-sm tracking-wide text-center max-w-sm">{label}</div>
      {status === 'error' && (
        <button onClick={onClose} className="text-[#D4AF37] text-xs underline underline-offset-4">Close</button>
      )}
    </div>
  )
}
