'use client'

import { useEffect, useRef, useState } from 'react'
import dynamic from 'next/dynamic'
import { X } from 'lucide-react'

const HobsonOrb = dynamic(() => import('@/components/HobsonOrb'), { ssr: false })

// Live, real-time conversational voice agent — distinct from the dictate-then-TTS
// mic button elsewhere in the app. Vapi's Web SDK handles the mic capture, audio
// playback, and connection lifecycle; the persona, model, and voice are configured
// on the assistant itself in the Vapi dashboard, not here.
const VAPI_PUBLIC_KEY = '68eda40a-dd39-4de7-9b43-681cd78b1e5b'
const VAPI_ASSISTANT_ID = '842d33bb-ecf1-4c15-a5e0-7c2afef6f107'

export default function HobsonVoiceAgent({ onClose }) {
  const [status, setStatus] = useState('connecting') // connecting | listening | speaking | error | closed
  const [errorMsg, setErrorMsg] = useState('')
  const vapiRef = useRef(null)

  useEffect(() => {
    let cancelled = false

    async function start() {
      try {
        const { default: Vapi } = await import('@vapi-ai/web')
        if (cancelled) return
        const vapi = new Vapi(VAPI_PUBLIC_KEY)
        vapiRef.current = vapi

        vapi.on('call-start', () => { if (!cancelled) setStatus('listening') })
        vapi.on('speech-start', () => { if (!cancelled) setStatus('speaking') })
        vapi.on('speech-end', () => { if (!cancelled) setStatus('listening') })
        vapi.on('call-end', () => { if (!cancelled) setStatus('closed') })
        vapi.on('error', (e) => {
          if (cancelled) return
          setStatus('error')
          setErrorMsg(e?.message || e?.error?.message || 'Connection error')
        })

        await vapi.start(VAPI_ASSISTANT_ID)
      } catch (e) {
        if (!cancelled) { setStatus('error'); setErrorMsg(e.message || 'Could not start voice session') }
      }
    }

    start()

    return () => {
      cancelled = true
      try { vapiRef.current?.stop() } catch (e) {}
    }
  }, [])

  const label = {
    connecting: 'Connecting…',
    listening: 'Listening…',
    speaking: 'Hobson is speaking…',
    error: errorMsg || 'Something went wrong',
    closed: 'Call ended',
  }[status]

  const orbState = { connecting: 'thinking', listening: 'listening', speaking: 'speaking', error: 'idle', closed: 'idle' }[status] || 'idle'

  return (
    <div className="fixed inset-0 z-50 bg-[#0A1628]/95 flex flex-col items-center justify-center gap-6 px-6">
      <button onClick={onClose} className="absolute top-6 right-6 text-[#D4AF37]/70 hover:text-[#D4AF37]" aria-label="End call">
        <X className="h-6 w-6" />
      </button>
      <HobsonOrb size={180} state={orbState} />
      <div className="text-[#F5EDE0] text-sm tracking-wide text-center max-w-sm">{label}</div>
      {status === 'error' && (
        <button onClick={onClose} className="text-[#D4AF37] text-xs underline underline-offset-4">Close</button>
      )}
    </div>
  )
}
