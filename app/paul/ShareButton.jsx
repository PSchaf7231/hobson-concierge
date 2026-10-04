'use client'

import { useState } from 'react'

const CARD_URL = 'https://paul.askhobson.homes'

// Native share sheet works on both iPhone and Android (text, AirDrop,
// WhatsApp, etc). Desktop browsers without it fall back to copying the link.
export function ShareButton() {
  const [copied, setCopied] = useState(false)

  async function share() {
    if (navigator.share) {
      try {
        await navigator.share({ title: 'Paul Schafranick', text: 'Paul Schafranick, Palm Beach real estate', url: CARD_URL })
      } catch {}
      return
    }
    try {
      await navigator.clipboard.writeText(CARD_URL)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {}
  }

  return (
    <button
      type="button"
      onClick={share}
      className="w-full rounded-full border border-[#C9A227]/50 py-3 text-[12px] uppercase tracking-[0.24em] text-[#E6C878] transition hover:bg-[#C9A227]/10"
    >
      {copied ? 'Link copied' : 'Share this card'}
    </button>
  )
}
