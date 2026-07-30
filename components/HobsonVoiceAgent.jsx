'use client'

import { useEffect, useRef, useState } from 'react'
import dynamic from 'next/dynamic'
import { PhoneOff } from 'lucide-react'

const HobsonOrb = dynamic(() => import('@/components/HobsonOrb'), { ssr: false })

// Live, real-time conversational voice agent — distinct from the dictate-then-TTS
// mic button elsewhere in the app. Vapi's Web SDK handles the mic capture, audio
// playback, and connection lifecycle; the persona, model, and voice are configured
// on the assistant itself in the Vapi dashboard, not here.
const VAPI_PUBLIC_KEY = '68eda40a-dd39-4de7-9b43-681cd78b1e5b'
const VAPI_ASSISTANT_ID = '842d33bb-ecf1-4c15-a5e0-7c2afef6f107'

// Renders as a persistent gold bar (not a full-screen takeover) so it's always
// visible and reachable regardless of scroll position or chat state — a
// separate, general conversation with Hobson, not tied to property search.
export default function HobsonVoiceAgent() {
  const [status, setStatus] = useState('idle') // idle | connecting | listening | speaking | error
  const [errorMsg, setErrorMsg] = useState('')
  const vapiRef = useRef(null)

  async function startCall() {
    if (status === 'connecting' || status === 'listening' || status === 'speaking') return
    setStatus('connecting')
    setErrorMsg('')
    try {
      const { default: Vapi } = await import('@vapi-ai/web')
      const vapi = new Vapi(VAPI_PUBLIC_KEY)
      vapiRef.current = vapi

      vapi.on('call-start', () => setStatus('listening'))
      vapi.on('speech-start', () => setStatus('speaking'))
      vapi.on('speech-end', () => setStatus('listening'))
      vapi.on('call-end', () => setStatus('idle'))
      vapi.on('error', (e) => {
        setStatus('error')
        setErrorMsg(e?.message || e?.error?.message || 'Connection error')
      })

      await vapi.start(VAPI_ASSISTANT_ID)
    } catch (e) {
      setStatus('error')
      setErrorMsg(e.message || 'Could not start voice session')
    }
  }

  function endCall() {
    try { vapiRef.current?.stop() } catch (e) {}
    vapiRef.current = null
    setStatus('idle')
  }

  useEffect(() => {
    return () => { try { vapiRef.current?.stop() } catch (e) {} }
  }, [])

  const active = status === 'connecting' || status === 'listening' || status === 'speaking'
  const orbState = { connecting: 'thinking', listening: 'listening', speaking: 'speaking', error: 'idle', idle: 'idle' }[status]

  const label = {
    idle: 'Talk to Hobson — start a live conversation',
    connecting: 'Connecting…',
    listening: 'Listening…',
    speaking: 'Hobson is speaking…',
    error: errorMsg || 'Something went wrong — tap to try again',
  }[status]

  const clickable = status === 'idle' || status === 'error'

  return (
    <div
      onClick={clickable ? startCall : undefined}
      role={clickable ? 'button' : undefined}
      className={`w-full flex items-center justify-center gap-3 px-4 py-2.5 transition ${clickable ? 'cursor-pointer hover:brightness-110' : ''}`}
      style={{ background: 'linear-gradient(to right, #A88418, #C9A227 45%, #E6C878 55%, #C9A227)' }}
    >
      <HobsonOrb size={22} state={orbState} />
      <span className="text-[#3a2a10] text-[11px] sm:text-xs uppercase tracking-[0.2em] font-semibold truncate">{label}</span>
      {active && (
        <button
          onClick={(e) => { e.stopPropagation(); endCall() }}
          className="ml-1 h-6 w-6 rounded-full flex items-center justify-center bg-[#0A1628]/20 hover:bg-[#0A1628]/35 text-[#3a2a10] flex-shrink-0"
          aria-label="End call"
        >
          <PhoneOff className="h-3.5 w-3.5" />
        </button>
      )}
    </div>
  )
}
