'use client'
import { useEffect, useState } from 'react'
import HobsonOrb from '@/components/HobsonOrb'

/**
 * MicroOrb — 24px inline orb beside the hero tagline.
 * Click → fires window event 'hobson:toggle-orb' (start/stop inline voice convo).
 * Listens to 'hobson:state' to mirror chat state (idle | listening | thinking | speaking).
 */
export default function MicroOrb({ size = 24 }) {
  const [state, setState] = useState('idle')

  useEffect(() => {
    const onState = (e) => setState(e.detail || 'idle')
    window.addEventListener('hobson:state', onState)
    return () => window.removeEventListener('hobson:state', onState)
  }, [])

  const active = state !== 'idle'
  const ringColor = state === 'listening'
    ? '#E2C285'
    : state === 'thinking'
      ? '#7ab8f5'
      : state === 'speaking'
        ? '#E2C285'
        : '#C9A867'

  return (
    <span
      role="button"
      aria-label="Talk to Hobson"
      onClick={() => window.dispatchEvent(new Event('hobson:toggle-orb'))}
      className="relative inline-flex items-center justify-center cursor-pointer transition-transform hover:scale-110"
      style={{ marginLeft: '12px', width: size + 'px', height: size + 'px' }}
    >
      <span
        className="absolute inset-0 rounded-full transition-all"
        style={{
          boxShadow: `0 0 0 1.5px ${ringColor}, 0 0 ${active ? 14 : 10}px ${ringColor}99, 0 0 ${active ? 22 : 16}px rgba(122,184,245,0.35)`,
        }}
      />
      <HobsonOrb size={size} state={state} />
    </span>
  )
}
