'use client'
import { useEffect, useState } from 'react'

const PLACEHOLDERS = {
  residential: 'Try "Boca Raton, 5bd / 4ba, $500–600K"  —  or just chat with Hobson below',
  commercial: 'Try "Stabilized MOB near hospital, $10–15M, 7%+ cap"  —  or chat with Hobson below',
}

export default function HeroSearch() {
  const [persona, setPersona] = useState('residential')

  useEffect(() => {
    const onPersona = (e) => setPersona(e.detail || 'residential')
    window.addEventListener('hobson:persona', onPersona)
    return () => window.removeEventListener('hobson:persona', onPersona)
  }, [])

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        const q = e.currentTarget.q.value.trim()
        if (!q) return
        window.dispatchEvent(new CustomEvent('hobson:search', { detail: q }))
        e.currentTarget.q.value = ''
      }}
      className="relative group"
    >
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
        <svg className="h-4 w-4 text-[#C9A867]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="7" /><path d="M21 21l-4.3-4.3" /></svg>
      </div>
      <input
        name="q"
        type="text"
        placeholder={PLACEHOLDERS[persona] || PLACEHOLDERS.residential}
        className="w-full h-12 pl-11 pr-28 rounded-md bg-white/95 backdrop-blur border border-[#C9A867]/40 text-[#1B3A4F] placeholder-[#1B3A4F]/45 focus:outline-none focus:ring-2 focus:ring-[#C9A867] focus:border-[#C9A867] text-sm font-light shadow-lg"
      />
      <button
        type="submit"
        className="absolute inset-y-1.5 right-1.5 px-4 rounded-sm bg-[#1B3A4F] hover:bg-[#264B62] text-[#E2C285] text-xs uppercase tracking-[0.18em] font-medium transition"
      >
        Search
      </button>
    </form>
  )
}
