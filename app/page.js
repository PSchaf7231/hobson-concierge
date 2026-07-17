'use client'

import React, { useState, useEffect, useRef } from 'react'
import dynamic from 'next/dynamic'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { Sparkles, Send, MapPin, BedDouble, Bath, Maximize, TrendingUp, Users, MessageSquare, Settings, Mic, MicOff, Heart, Flame, Snowflake, Thermometer, Building2, Crown, Calendar, Eye, X, Printer, Map as MapIcon, Volume2, Loader2, Bookmark } from 'lucide-react'

const PropertyMap = dynamic(() => import('@/components/PropertyMap'), { ssr: false, loading: () => <div className="h-full flex items-center justify-center bg-[#0A1628] text-[#D4AF37]/60">Loading map…</div> })
const MicroOrb = dynamic(() => import('@/components/MicroOrb'), { ssr: false })
const PropertyShowcase = dynamic(() => import('@/components/PropertyShowcase'), { ssr: false })

// Brand palette
const LOGOS = { residential: '/anasa.png', commercial: '/next-endeavor.png' }
const NAVY = '#0A1628'
const GOLD = '#D4AF37'
const SERIF = '"Cormorant Garamond", "Playfair Display", Georgia, serif'

function TierBadge({ tier, score }) {
  if (!tier) return null
  const cfg = {
    hot: { icon: Flame, label: 'HOT', cls: 'bg-gradient-to-r from-[#D4AF37] to-[#E2C285] text-[#0A1628] border-0' },
    warm: { icon: Thermometer, label: 'WARM', cls: 'bg-[#D4AF37]/40 text-[#0A1628] border-0' },
    cold: { icon: Snowflake, label: 'COLD', cls: 'bg-[#0A1628]/10 text-[#0A1628]/70 border border-[#0A1628]/20' }
  }[tier] || { icon: Snowflake, label: tier.toUpperCase(), cls: 'bg-stone-200' }
  const Icon = cfg.icon
  return (
    <span className={`inline-flex items-center gap-1 text-[10px] font-bold tracking-wide px-2 py-0.5 rounded-full ${cfg.cls}`}>
      <Icon className="h-3 w-3" /> {cfg.label}{typeof score === 'number' ? ` · ${score}` : ''}
    </span>
  )
}

function PropertyDetailDialog({ property, open, onOpenChange, isFavorite, onToggleFavorite, onAskAtlas }) {
  if (!property) return null
  const p = property
  const isCommercial = p.type === 'commercial'
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl p-0 overflow-hidden bg-white border-[#D4AF37]/30">
        <div className="relative h-72 bg-[#0A1628]">
          <img src={p.image} alt={p.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
          <Badge className="absolute top-3 left-3 bg-[#0A1628]/95 text-[#D4AF37] border-0 font-medium">{isCommercial ? 'Next Endeavor CRE' : 'Anasa Collection'}</Badge>
          <button onClick={() => onToggleFavorite && onToggleFavorite(p.id)} className="absolute top-3 right-12 h-9 w-9 rounded-full bg-white/95 hover:bg-white flex items-center justify-center shadow">
            <Heart className={`h-4 w-4 ${isFavorite ? 'fill-[#D4AF37] text-[#D4AF37]' : 'text-[#0A1628]/60'}`} />
          </button>
          <div className="absolute bottom-4 left-4 right-4 text-white">
            <div style={{ fontFamily: SERIF }} className="text-3xl text-[#D4AF37] leading-tight">{p.title}</div>
            <div className="flex items-center gap-1 mt-1 text-sm opacity-90"><MapPin className="h-4 w-4" />{p.address}</div>
          </div>
        </div>
        <div className="p-6 space-y-5 max-h-[55vh] overflow-y-auto">
          <div className="flex items-baseline justify-between">
            <div className="text-3xl font-bold text-[#D4AF37]">${p.price.toLocaleString()}</div>
            {p.capRate && (
              <div className="text-right">
                <div className="text-xs uppercase tracking-wider text-[#0A1628]/60">Cap rate</div>
                <div className="text-2xl font-bold text-emerald-700">{p.capRate}%</div>
              </div>
            )}
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 border-y border-[#D4AF37]/20 py-4">
            {p.beds > 0 && (<div className="text-center"><BedDouble className="h-5 w-5 text-[#D4AF37] mx-auto" /><div className="text-lg font-semibold text-[#0A1628] mt-1">{p.beds}</div><div className="text-[10px] uppercase tracking-wider text-[#0A1628]/60">Bedrooms</div></div>)}
            {p.baths > 0 && (<div className="text-center"><Bath className="h-5 w-5 text-[#D4AF37] mx-auto" /><div className="text-lg font-semibold text-[#0A1628] mt-1">{p.baths}</div><div className="text-[10px] uppercase tracking-wider text-[#0A1628]/60">Bathrooms</div></div>)}
            <div className="text-center"><Maximize className="h-5 w-5 text-[#D4AF37] mx-auto" /><div className="text-lg font-semibold text-[#0A1628] mt-1">{p.sqft.toLocaleString()}</div><div className="text-[10px] uppercase tracking-wider text-[#0A1628]/60">Square Feet</div></div>
          </div>
          <div><div className="text-xs uppercase tracking-widest text-[#0A1628]/50 mb-2">Description</div><p className="text-sm text-[#0A1628]/80 leading-relaxed">{p.description}</p></div>
        </div>
        <DialogFooter className="bg-[#F5EDE0] border-t border-[#D4AF37]/20 p-4 gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>Close</Button>
          {onAskAtlas && (<Button onClick={() => { onAskAtlas(p); onOpenChange(false) }} className="bg-[#0A1628] hover:bg-[#0A1628]/90 text-[#D4AF37]"><Calendar className="h-4 w-4 mr-2" />Ask Hobson to schedule a showing</Button>)}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

// Legacy PropertyCard (used in AdminDashboard only)
function PropertyCard({ p, isFavorite, onToggleFavorite, onView }) {
  return (
    <Card className="overflow-hidden border border-[#C8CCD1]/40 hover:shadow-xl hover:border-[#D4AF37]/60 transition-all bg-white group cursor-pointer" onClick={() => onView && onView(p)}>
      <div className="h-40 relative overflow-hidden">
        <img src={p.image} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
      </div>
      <div className="p-3 space-y-1.5">
        <div style={{ fontFamily: SERIF }} className="text-[#0A1628] text-base leading-tight">{p.title}</div>
        <div className="text-xs text-[#0A1628]/60 flex items-center gap-1"><MapPin className="h-3 w-3" />{p.city}, {p.state}</div>
        <div className="text-lg font-bold text-[#D4AF37]">${p.price.toLocaleString()}</div>
      </div>
    </Card>
  )
}

// =====================================================================
// LEAD CAPTURE MODAL
// =====================================================================
function LeadCaptureModal({ open, onOpenChange, sessionId, onCaptured }) {
  const [firstName, setFirstName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [busy, setBusy] = useState(false)
  const [err, setErr] = useState(null)

  async function submit() {
    setErr(null)
    if (!firstName.trim() || !email.trim() || !phone.trim()) {
      setErr('Please fill in all fields.')
      return
    }
    setBusy(true)
    try {
      // Push into the existing session as a lead capture. Backend already wires
      // BoldTrail auto-push on qualified leads.
      if (sessionId) {
        await fetch(`/api/sessions/${sessionId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            lead: { name: firstName.trim(), email: email.trim(), phone: phone.trim() },
            savedSearch: true
          })
        })
      }
      onCaptured && onCaptured()
      onOpenChange(false)
    } catch (e) {
      setErr(e.message || 'Could not save. Try again?')
    } finally {
      setBusy(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md p-0 overflow-hidden border-[#D4AF37]/30" style={{ background: NAVY }}>
        <div className="px-6 pt-6 pb-2">
          <div className="inline-flex items-center gap-2 text-[#D4AF37] text-[10px] uppercase tracking-[0.3em] mb-3">
            <div className="h-px w-6 bg-[#D4AF37]" />
            Save Your Search
          </div>
          <h2 style={{ fontFamily: SERIF }} className="text-2xl text-[#F5EDE0] leading-tight">
            Get updates when new listings match.
          </h2>
          <p className="text-[#F5EDE0]/70 text-sm mt-2 leading-relaxed">
            Hobson will keep working in the background and alert you the moment something fitting hits the market.
          </p>
        </div>
        <div className="px-6 py-4 space-y-3">
          <div>
            <label className="text-[10px] uppercase tracking-wider text-[#D4AF37]/70 font-medium">First Name</label>
            <input value={firstName} onChange={e => setFirstName(e.target.value)} placeholder="Alex" className="w-full mt-1 bg-[#0A1628] border border-[#D4AF37]/30 focus:border-[#D4AF37] focus:outline-none rounded text-[#F5EDE0] placeholder-[#F5EDE0]/30 text-sm px-3 py-2" />
          </div>
          <div>
            <label className="text-[10px] uppercase tracking-wider text-[#D4AF37]/70 font-medium">Email</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@email.com" className="w-full mt-1 bg-[#0A1628] border border-[#D4AF37]/30 focus:border-[#D4AF37] focus:outline-none rounded text-[#F5EDE0] placeholder-[#F5EDE0]/30 text-sm px-3 py-2" />
          </div>
          <div>
            <label className="text-[10px] uppercase tracking-wider text-[#D4AF37]/70 font-medium">Phone Number (this becomes your password)</label>
            <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} placeholder="(561) 555-1234" className="w-full mt-1 bg-[#0A1628] border border-[#D4AF37]/30 focus:border-[#D4AF37] focus:outline-none rounded text-[#F5EDE0] placeholder-[#F5EDE0]/30 text-sm px-3 py-2" />
          </div>
          {err && <div className="text-[11px] text-red-300">{err}</div>}
        </div>
        <div className="px-6 pb-6 flex items-center justify-between gap-3">
          <button onClick={() => onOpenChange(false)} className="text-[11px] uppercase tracking-widest text-[#F5EDE0]/50 hover:text-[#F5EDE0]/80 transition">Maybe later</button>
          <button onClick={submit} disabled={busy} className="px-5 py-2 rounded-full bg-[#D4AF37] hover:bg-[#E2C285] disabled:opacity-50 text-[#0A1628] text-xs uppercase tracking-[0.2em] font-semibold transition">
            {busy ? 'Saving…' : 'Save my search'}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

// =====================================================================
// INLINE LEAD CAPTURE (shaded 3-field form in top nav)
// =====================================================================
function InlineLeadCapture() {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [busy, setBusy] = useState(false)
  const [done, setDone] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const captured = localStorage.getItem('atlas_lead_captured')
    if (captured) {
      setDone(true)
      const savedName = localStorage.getItem('atlas_lead_name') || ''
      setFirstName(savedName)
    }
  }, [])

  async function submit() {
    if (!firstName.trim() || !email.trim() || !phone.trim() || busy) return
    setBusy(true)
    try {
      const sessionId = typeof window !== 'undefined' ? localStorage.getItem('atlas_session') : null
      if (sessionId) {
        const fullName = `${firstName.trim()} ${lastName.trim()}`.trim()
        await fetch(`/api/sessions/${sessionId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            lead: { name: fullName, email: email.trim(), phone: phone.trim() },
            savedSearch: true
          })
        })
      }
      localStorage.setItem('atlas_lead_captured', '1')
      localStorage.setItem('atlas_lead_name', firstName.trim())
      setDone(true)
    } catch (e) {} finally { setBusy(false) }
  }

  if (done) {
    return (
      <div className="flex items-center gap-2 text-[#D4AF37] text-[10px] uppercase tracking-[0.2em]">
        <div className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
        Search saved{firstName ? ` · ${firstName}` : ''}
      </div>
    )
  }

  const inputCls = "h-8 rounded bg-[#D4AF37]/10 border border-[#D4AF37]/25 focus:border-[#D4AF37] focus:bg-[#D4AF37]/15 focus:outline-none text-[#F5EDE0] placeholder-[#F5EDE0]/40 text-[11px] px-2.5 transition"

  return (
    <>
      {/* Desktop / tablet: inline 4-field capture bar */}
      <div className="hidden lg:flex items-center gap-1.5 flex-shrink-0">
        <input type="text" value={firstName} onChange={e => setFirstName(e.target.value)} placeholder="First name" className={`${inputCls} w-24`} />
        <input type="text" value={lastName} onChange={e => setLastName(e.target.value)} placeholder="Last name" className={`${inputCls} w-24`} />
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" className={`${inputCls} w-36`} />
        <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} placeholder="Phone (= password)" className={`${inputCls} w-36`} />
        <button onClick={submit} disabled={busy || !firstName || !email || !phone} className="h-8 px-3 rounded bg-[#D4AF37] hover:bg-[#E2C285] disabled:opacity-40 text-[#0A1628] text-[10px] uppercase tracking-[0.2em] font-semibold transition">
          {busy ? '…' : 'Save'}
        </button>
      </div>
      {/* Mobile: compact "Save" button that opens the modal */}
      <button
        onClick={() => setMobileOpen(true)}
        className="lg:hidden h-8 px-3 rounded bg-[#D4AF37] hover:bg-[#E2C285] text-[#0A1628] text-[10px] uppercase tracking-[0.2em] font-semibold transition flex-shrink-0"
      >
        Save Search
      </button>
      <LeadCaptureModal
        open={mobileOpen}
        onOpenChange={setMobileOpen}
        sessionId={typeof window !== 'undefined' ? localStorage.getItem('atlas_session') : null}
        onCaptured={() => {
          try { localStorage.setItem('atlas_lead_captured', '1'); localStorage.setItem('atlas_lead_name', firstName.trim()) } catch (e) {}
          setDone(true)
          setMobileOpen(false)
        }}
      />
    </>
  )
}

// ==========================================================================
// Compact custom dropdown — inline scrollable options, stays within panel.
// Native <select> popups escape the panel and can render off-screen.
// This version keeps everything inside the overlay's bounds.
// ==========================================================================
function CompactSelect({ value, onChange, options, placeholder = 'Any', className = '' }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  useEffect(() => {
    if (!open) return
    const h = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false) }
    document.addEventListener('mousedown', h)
    return () => document.removeEventListener('mousedown', h)
  }, [open])
  const selected = options.find(o => o.value === value)
  const label = selected ? selected.label : placeholder
  return (
    <div ref={ref} className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setOpen(v => !v)}
        className="w-full h-8 rounded bg-[#D4AF37]/10 border border-[#D4AF37]/30 hover:border-[#D4AF37]/60 focus:border-[#D4AF37] focus:outline-none text-[#F5EDE0] text-[11px] px-2.5 text-left flex items-center justify-between transition"
      >
        <span className={value ? '' : 'text-[#F5EDE0]/50'}>{label}</span>
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" style={{ transform: open ? 'rotate(180deg)' : 'none', transition: 'transform .15s' }}><path d="m6 9 6 6 6-6"/></svg>
      </button>
      {open && (
        <div className="absolute top-full left-0 right-0 mt-1 max-h-36 overflow-y-auto rounded border border-[#D4AF37]/50 bg-[#0A1628] z-50 shadow-2xl hobson-scroll">
          {options.map(o => (
            <button
              key={o.value}
              type="button"
              onClick={() => { onChange(o.value); setOpen(false) }}
              className={`block w-full text-left px-2.5 py-1.5 text-[11px] hover:bg-[#D4AF37]/25 transition ${o.value === value ? 'bg-[#D4AF37]/30 text-[#F5EDE0]' : 'text-[#F5EDE0]/85'}`}
            >
              {o.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

// =====================================================================
// CHAT PANEL (left half of concierge)
// =====================================================================
function ChatPanel({ onProperties, onViewCountUpdate }) {
  const [persona, setPersona] = useState('residential')
  const [sessionId, setSessionId] = useState(null)
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [recommended, setRecommended] = useState([])
  const [favorites, setFavorites] = useState([])
  const [favIds, setFavIds] = useState(new Set())
  const [leadTier, setLeadTier] = useState(null)
  const [leadScore, setLeadScore] = useState(null)
  const [listening, setListening] = useState(false)
  const [viewProperty, setViewProperty] = useState(null)
  const [speakingIdx, setSpeakingIdx] = useState(null)
  const [orbActive, setOrbActive] = useState(false)
  const [orbSpeaking, setOrbSpeaking] = useState(false)
  const [leadCaptured, setLeadCaptured] = useState(false)
  const [captureOpen, setCaptureOpen] = useState(false)
  const audioRef = useRef(null)
  const recognitionRef = useRef(null)
  const scrollRef = useRef(null)
  const lastPlayedRef = useRef(null)
  const sendingRef = useRef(false)

  // Broadcast orb state to MicroOrb (idle | listening | thinking | speaking)
  useEffect(() => {
    if (typeof window === 'undefined') return
    let s = 'idle'
    if (orbActive) {
      if (orbSpeaking) s = 'speaking'
      else if (loading) s = 'thinking'
      else if (listening) s = 'listening'
    } else {
      if (orbSpeaking) s = 'speaking'
      else if (loading) s = 'thinking'
      else if (listening) s = 'listening'
    }
    window.dispatchEvent(new CustomEvent('hobson:state', { detail: s }))
  }, [orbActive, listening, loading, orbSpeaking])

  useEffect(() => {
    const existing = typeof window !== 'undefined' ? localStorage.getItem('atlas_session') : null
    if (existing) setSessionId(existing)
    const captured = typeof window !== 'undefined' ? localStorage.getItem('atlas_lead_captured') : null
    if (captured) setLeadCaptured(true)
  }, [])

  // Lead capture lives ONLY in the nav-bar (4 shaded input boxes). No pop-ups.

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight
  }, [messages, loading, recommended])

  // Auto-play Hobson's latest reply when orb is active
  useEffect(() => {
    if (!orbActive || messages.length === 0) return
    const last = messages[messages.length - 1]
    if (last.role !== 'assistant') return
    const fingerprint = messages.length + ':' + (last.content || '').slice(0, 60)
    if (lastPlayedRef.current === fingerprint) return
    lastPlayedRef.current = fingerprint
    ;(async () => {
      try {
        try { recognitionRef.current?.stop() } catch (e) {}
        setListening(false)
        const res = await fetch('/api/voice', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ text: last.content }) })
        if (!res.ok) return
        const blob = await res.blob()
        const url = URL.createObjectURL(blob)
        const audio = new Audio(url)
        audioRef.current = audio
        audio.onplay = () => setOrbSpeaking(true)
        audio.onended = () => {
          URL.revokeObjectURL(url)
          setOrbSpeaking(false)
          setTimeout(() => {
            if (orbActive && recognitionRef.current) {
              try { recognitionRef.current.start(); setListening(true) } catch (e) {}
            }
          }, 700)
        }
        await audio.play()
      } catch (e) { setOrbSpeaking(false) }
    })()
  }, [messages, orbActive])

  // Voice setup
  useEffect(() => {
    if (typeof window === 'undefined') return
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition
    if (!SR) return
    const r = new SR()
    r.continuous = false
    r.interimResults = true
    r.lang = 'en-US'
    r.onresult = (e) => {
      let finalText = ''
      let interim = ''
      for (let i = 0; i < e.results.length; i++) {
        const t = e.results[i][0].transcript
        if (e.results[i].isFinal) finalText += t
        else interim += t
      }
      setInput((finalText || interim).trim())
      if (finalText && orbActive) {
        const text = finalText.trim()
        if (text.length > 1 && !sendingRef.current) {
          sendingRef.current = true
          setInput('')
          send(text).finally(() => { sendingRef.current = false })
        }
      }
    }
    r.onend = () => setListening(false)
    r.onerror = (e) => {
      setListening(false)
      if (e?.error === 'audio-capture' || e?.error === 'not-allowed' || e?.error === 'aborted') {
        recognitionRef.current = null
      }
    }
    recognitionRef.current = r
  }, [orbActive])

  async function toggleMic() {
    const r = recognitionRef.current
    if (!r) { alert('Voice input requires Chrome or Edge browser.'); return }
    if (listening) { try { r.stop() } catch (e) {} ; setListening(false); return }
    setInput('')
    try { r.start(); setListening(true) } catch (e) { alert('Could not start microphone. ' + e.message) }
  }

  async function playVoice(text, idx) {
    if (audioRef.current) { try { audioRef.current.pause() } catch (e) {} }
    if (speakingIdx === idx) { setSpeakingIdx(null); return }
    setSpeakingIdx(idx)
    try {
      const res = await fetch('/api/voice', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ text }) })
      if (!res.ok) { setSpeakingIdx(null); return }
      const blob = await res.blob()
      const url = URL.createObjectURL(blob)
      const audio = new Audio(url)
      audioRef.current = audio
      audio.onended = () => { setSpeakingIdx(null); URL.revokeObjectURL(url) }
      audio.onerror = () => setSpeakingIdx(null)
      await audio.play()
    } catch (e) { setSpeakingIdx(null) }
  }

  const greeting = persona === 'residential'
    ? 'Welcome. I am Hobson. Whom do I have the pleasure of assisting today — and tell me, what does the right home feel like?'
    : 'Welcome to Next Endeavor CRE. I am Hobson. Tell me about the mandate — and I\'ll connect you with Paul personally.'

  async function send(text) {
    const msg = (text ?? input).trim()
    if (!msg || loading) return
    setInput('')
    const newMsgs = [...messages, { role: 'user', content: msg }]
    setMessages(newMsgs)
    setLoading(true)
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId, message: msg, persona, fast: orbActive })
      })
      const data = await res.json()
      if (data.sessionId && !sessionId) {
        setSessionId(data.sessionId)
        localStorage.setItem('atlas_session', data.sessionId)
      }
      setMessages([...newMsgs, { role: 'assistant', content: data.reply || '...' }])
      setRecommended(data.recommended || [])
      onProperties && onProperties(data.recommended || [])
      setFavorites(data.favorites || [])
      setFavIds(new Set((data.favorites || []).map(f => f.id)))
      setLeadTier(data.lead_tier)
      setLeadScore(data.lead_score)
      // Lead capture is nav-bar-only — no intrusive center-screen pop-ups anywhere.
    } catch (e) {
      setMessages([...newMsgs, { role: 'assistant', content: 'Connection issue. Try again?' }])
    } finally {
      setLoading(false)
    }
  }

  async function toggleFavorite(propertyId) {
    if (!sessionId) return
    const res = await fetch(`/api/sessions/${sessionId}/favorite`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ propertyId }) })
    const data = await res.json()
    setFavorites(data.favorites || [])
    setFavIds(new Set((data.favorites || []).map(f => f.id)))
  }

  function resetChat() {
    localStorage.removeItem('atlas_session')
    setSessionId(null); setMessages([]); setRecommended([]); setFavorites([]); setFavIds(new Set()); setLeadTier(null); setLeadScore(null)
    onProperties && onProperties([])
  }

  // Search Criteria plate — collapsible filter panel between video and chat box
  const [searchOpen, setSearchOpen] = useState(false)
  const [moreFilters, setMoreFilters] = useState(false)
  const [filters, setFilters] = useState({
    location: '',
    propertyType: '',
    priceMin: '',
    priceMax: '',
    beds: '',
    baths: '',
    status: 'Active',
    sqftMin: '',
    yearBuiltMin: '',
    garage: '',
    pool: '',
    waterfront: '',
    hoaMax: '',
    view: ''
  })
  function runSearch() {
    const f = filters
    const parts = []
    if (f.location) parts.push(`in ${f.location}`)
    if (f.propertyType) parts.push(f.propertyType.toLowerCase())
    if (f.priceMin || f.priceMax) {
      const mn = f.priceMin ? `$${Number(f.priceMin).toLocaleString()}` : '$0'
      const mx = f.priceMax ? `$${Number(f.priceMax).toLocaleString()}` : 'no cap'
      parts.push(`priced ${mn} to ${mx}`)
    }
    if (f.beds && f.beds !== 'Any') parts.push(`${f.beds} beds`)
    if (f.baths && f.baths !== 'Any') parts.push(`${f.baths} baths`)
    if (f.sqftMin) parts.push(`min ${f.sqftMin} sqft`)
    if (f.yearBuiltMin) parts.push(`built ${f.yearBuiltMin}`)
    if (f.garage) parts.push(`${f.garage} garage`)
    if (f.pool && f.pool !== 'Any') parts.push(f.pool === 'Yes' ? 'with a private pool' : 'no pool')
    if (f.waterfront === 'Yes') parts.push('waterfront')
    if (f.hoaMax) parts.push(`HOA under ${f.hoaMax}`)
    if (f.view) parts.push(`${f.view.toLowerCase()}`)
    if (f.status && f.status !== 'Active') parts.push(`status ${f.status.toLowerCase()}`)
    const q = parts.length ? `Show me properties ${parts.join(', ')}.` : 'Show me the full Palm Beach County inventory, any price.'
    setSearchOpen(false)
    setMoreFilters(false)
    send(q)
  }
  // Option lists
  const PRICE_OPTS = [
    { value: '', label: 'Any' },
    { value: '100000', label: '$100k' }, { value: '200000', label: '$200k' }, { value: '300000', label: '$300k' },
    { value: '400000', label: '$400k' }, { value: '500000', label: '$500k' }, { value: '600000', label: '$600k' },
    { value: '750000', label: '$750k' }, { value: '1000000', label: '$1M' }, { value: '1500000', label: '$1.5M' },
    { value: '2000000', label: '$2M' }, { value: '3000000', label: '$3M' }, { value: '5000000', label: '$5M' },
    { value: '7500000', label: '$7.5M' }, { value: '10000000', label: '$10M' }, { value: '20000000', label: '$20M+' }
  ]
  const BED_OPTS = [{value:'',label:'Any'},{value:'1+',label:'1+'},{value:'2+',label:'2+'},{value:'3+',label:'3+'},{value:'4+',label:'4+'},{value:'5+',label:'5+'},{value:'6+',label:'6+'}]
  const BATH_OPTS = [{value:'',label:'Any'},{value:'1+',label:'1+'},{value:'1.5+',label:'1.5+'},{value:'2+',label:'2+'},{value:'3+',label:'3+'},{value:'4+',label:'4+'},{value:'5+',label:'5+'}]
  const PROPTYPE_OPTS = [{value:'',label:'Any'},{value:'Single Family',label:'Single Family'},{value:'Condo',label:'Condo'},{value:'Townhouse',label:'Townhouse'},{value:'Multi-Family',label:'Multi-Family'},{value:'Land',label:'Land'}]
  const STATUS_OPTS = [{value:'Active',label:'Active'},{value:'Pending',label:'Pending'},{value:'Sold',label:'Sold'}]
  const SQFT_OPTS = [{value:'',label:'Any'},{value:'1000',label:'1k+'},{value:'1500',label:'1.5k+'},{value:'2000',label:'2k+'},{value:'2500',label:'2.5k+'},{value:'3000',label:'3k+'},{value:'4000',label:'4k+'},{value:'5000',label:'5k+'}]
  const YEAR_OPTS = [{value:'',label:'Any'},{value:'2020+',label:'2020+'},{value:'2010+',label:'2010+'},{value:'2000+',label:'2000+'},{value:'1990+',label:'1990+'},{value:'1980+',label:'1980+'}]
  const GARAGE_OPTS = [{value:'',label:'Any'},{value:'1+',label:'1+'},{value:'2+',label:'2+'},{value:'3+',label:'3+'},{value:'4+',label:'4+'}]
  const POOL_OPTS = [{value:'',label:'Any'},{value:'Yes',label:'Yes (Private)'},{value:'No',label:'No'}]
  const WATER_OPTS = [{value:'',label:'Any'},{value:'Yes',label:'Yes'},{value:'No',label:'No'}]
  const HOA_OPTS = [{value:'',label:'Any'},{value:'$100/mo',label:'$100/mo'},{value:'$200/mo',label:'$200/mo'},{value:'$500/mo',label:'$500/mo'},{value:'$1000/mo',label:'$1k/mo'}]
  const VIEW_OPTS = [{value:'',label:'Any'},{value:'Ocean View',label:'Ocean View'},{value:'Canal/Water View',label:'Canal/Water View'},{value:'Golf Course View',label:'Golf Course View'},{value:'Garden View',label:'Garden View'}]

  const suggestions = persona === 'residential'
    ? ['Waterfront estate in Boca, $4–6M', 'New construction, Delray Beach', 'Golf course view, Wellington']
    : ['Stabilized MOB near hospital, 7%+ cap', 'Class A office, Palm Beach County', 'ASC with NNN lease, 8%+ cap']

  return (
    <div className="h-full flex flex-col overflow-hidden" style={{ background: NAVY, color: '#F5EDE0' }}>
      {/* Top: small dual brand toggle */}
      <div className="px-6 pt-5 pb-2 flex items-center justify-between flex-shrink-0">
        <div className="inline-flex items-center gap-0.5 rounded-full border border-[#D4AF37]/30 p-0.5">
          <button onClick={() => { if (persona !== 'residential') { setPersona('residential'); resetChat() } }} className={`text-[9px] uppercase tracking-[0.2em] px-2.5 py-1 rounded-full transition ${persona === 'residential' ? 'bg-[#D4AF37] text-[#0A1628] font-semibold' : 'text-[#D4AF37]/70 hover:text-[#D4AF37]'}`}>
            Anasa Collection
          </button>
          <button onClick={() => { if (persona !== 'commercial') { setPersona('commercial'); resetChat() } }} className={`text-[9px] uppercase tracking-[0.2em] px-2.5 py-1 rounded-full transition ${persona === 'commercial' ? 'bg-[#D4AF37] text-[#0A1628] font-semibold' : 'text-[#D4AF37]/70 hover:text-[#D4AF37]'}`}>
            Next Endeavor CRE
          </button>
        </div>
        {leadTier && <TierBadge tier={leadTier} score={leadScore} />}
      </div>

      {/* Hero copy — two lines, "Luxury" starts under end of "Commercial" */}
      <div className="px-6 pt-3 pb-4 flex-shrink-0 flex justify-center">
        <div style={{ fontFamily: SERIF, fontWeight: 500 }} className="inline-block text-left text-[1.75rem] lg:text-[2rem] leading-[1.2] text-[#F5EDE0]">
          <div>Smart <span className="italic text-[#D4AF37]">Commercial</span> Investments.</div>
          <div className="pl-[7.8em]"><span className="italic text-[#D4AF37]">Luxury</span> Homes Done Right.</div>
        </div>
      </div>

      {/* Hobson avatar / HeyGen video slot — portrait, centered with breathing room */}
      {/* ⚠️ LOCKED LAYOUT (per Emergent Support directive) — DO NOT CHANGE:
             width  = w-[75%]
             aspect = aspect-[16/9]
             padding = px-6 pb-6
         Any adjustment here regresses the Concierge window and MUST be re-approved. */}
      <div className="px-6 pt-3 pb-6 flex-shrink-0 flex justify-center">
        <div data-locked-layout="hobson-avatar-75-16by9" className="relative rounded-lg overflow-hidden border border-[#D4AF37]/25 shadow-xl w-full lg:w-[75%] aspect-[16/9]" style={{ background: '#0B1526' }}>
          {/* HeyGen recorded avatar — autoplays on loop, muted (browser policy). */}
          <video
            ref={(el) => { if (el) window.__hobsonVideo = el }}
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
            poster=""
          >
            <source src="/hobson-avatar.mp4" type="video/mp4" />
          </video>
          {/* Play / Pause toggle — small "P" pill, top-right of video */}
          <button
            onClick={() => {
              const v = window.__hobsonVideo
              if (!v) return
              v.muted = false
              if (v.paused) v.play(); else v.pause()
            }}
            title="Play / pause (unmutes on first click)"
            className="absolute top-2 right-2 z-10 h-6 w-6 rounded-full bg-[#0A1628]/80 hover:bg-[#0A1628] backdrop-blur-sm border border-[#D4AF37]/40 text-[#D4AF37] text-[11px] font-semibold flex items-center justify-center transition"
          >
            P
          </button>
          {/* Tiny status pill so users still see Hobson's state (listening/speaking/thinking) */}
          <div className="absolute bottom-2 right-3 z-10 px-2 py-0.5 rounded-full bg-[#0A1628]/80 backdrop-blur-sm border border-[#D4AF37]/30 text-[9px] uppercase tracking-[0.25em] text-[#D4AF37]/90 font-medium">
            Hobson · {orbSpeaking ? 'Speaking' : listening ? 'Listening' : loading ? 'Thinking' : 'Online'}
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent" />
        </div>
      </div>

      {/* Search Criteria — gold pill + overlay filter panel (does NOT push chat down) */}
      <div className="relative flex-shrink-0 px-6 pb-1 flex justify-center z-30">
        <button
          type="button"
          onClick={() => setSearchOpen(v => !v)}
          className="inline-flex items-center gap-2 px-5 py-1.5 rounded-full text-[10px] uppercase tracking-[0.32em] font-semibold text-[#3a2a10] transition shadow-md hover:brightness-110"
          style={{
            background: 'linear-gradient(to bottom, #E6C878 0%, #C9A227 55%, #A88418 100%)',
            border: '1px solid #8a6b2a',
            boxShadow: '0 2px 8px rgba(201, 162, 39, 0.35), inset 0 1px 0 rgba(255,255,255,0.35)'
          }}
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>
          Search Criteria
          {recommended.length > 0 && <span className="text-[9px] normal-case tracking-normal opacity-80">· {recommended.length} shown</span>}
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" style={{ transform: searchOpen ? 'rotate(180deg)' : 'none', transition: 'transform .2s' }}><path d="m6 9 6 6 6-6"/></svg>
        </button>
        {searchOpen && (
          <div className="fixed inset-x-2 top-14 bottom-4 lg:absolute lg:inset-auto lg:top-full lg:left-6 lg:right-6 lg:bottom-auto lg:mt-2 lg:max-h-[52vh] rounded-xl border border-[#D4AF37]/40 shadow-2xl backdrop-blur-md p-4 z-50 overflow-y-auto hobson-scroll"
               style={{ background: 'linear-gradient(to bottom, rgba(10,22,40,0.98), rgba(11,21,38,0.98))' }}>
            {/* Header */}
            <div className="flex items-center justify-between mb-3">
              <div className="text-[10px] uppercase tracking-[0.28em] text-[#D4AF37] font-semibold">Primary Filters</div>
              <button onClick={() => setSearchOpen(false)} className="text-[#F5EDE0]/50 hover:text-[#F5EDE0] text-xs">✕</button>
            </div>

            {/* PRIMARY ROW — 6 fields + More Filters + Search */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-[1.6fr_1fr_1fr_1fr_1fr_1fr] gap-2">
              <div>
                <label className="text-[9px] uppercase tracking-widest text-[#D4AF37]/70 block mb-1">Location</label>
                <input value={filters.location} onChange={e => setFilters(f => ({...f, location: e.target.value}))} placeholder="City, Zip, or Neighborhood" className="w-full h-8 rounded bg-[#D4AF37]/10 border border-[#D4AF37]/30 focus:border-[#D4AF37] focus:outline-none text-[#F5EDE0] text-[11px] px-2.5" />
              </div>
              <div>
                <label className="text-[9px] uppercase tracking-widest text-[#D4AF37]/70 block mb-1">Property Type</label>
                <CompactSelect value={filters.propertyType} onChange={v => setFilters(f => ({...f, propertyType: v}))} options={PROPTYPE_OPTS} />
              </div>
              <div>
                <label className="text-[9px] uppercase tracking-widest text-[#D4AF37]/70 block mb-1">Min Price</label>
                <CompactSelect value={filters.priceMin} onChange={v => setFilters(f => ({...f, priceMin: v}))} options={PRICE_OPTS} />
              </div>
              <div>
                <label className="text-[9px] uppercase tracking-widest text-[#D4AF37]/70 block mb-1">Max Price</label>
                <CompactSelect value={filters.priceMax} onChange={v => setFilters(f => ({...f, priceMax: v}))} options={PRICE_OPTS} />
              </div>
              <div>
                <label className="text-[9px] uppercase tracking-widest text-[#D4AF37]/70 block mb-1">Bedrooms</label>
                <CompactSelect value={filters.beds} onChange={v => setFilters(f => ({...f, beds: v}))} options={BED_OPTS} />
              </div>
              <div>
                <label className="text-[9px] uppercase tracking-widest text-[#D4AF37]/70 block mb-1">Bathrooms</label>
                <CompactSelect value={filters.baths} onChange={v => setFilters(f => ({...f, baths: v}))} options={BATH_OPTS} />
              </div>
            </div>

            {/* More Filters toggle + Search actions */}
            <div className="flex items-center justify-between mt-4">
              <button
                type="button"
                onClick={() => setMoreFilters(v => !v)}
                className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.22em] text-[#D4AF37] hover:text-[#E6C878] transition"
              >
                {moreFilters ? '− Fewer Filters' : '+ More Filters'}
              </button>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setFilters({ location:'', propertyType:'', priceMin:'', priceMax:'', beds:'', baths:'', status:'Active', sqftMin:'', yearBuiltMin:'', garage:'', pool:'', waterfront:'', hoaMax:'', view:'' })}
                  className="text-[10px] uppercase tracking-[0.22em] text-[#F5EDE0]/50 hover:text-[#F5EDE0]/80 transition"
                >
                  Clear
                </button>
                <button
                  type="button"
                  onClick={runSearch}
                  className="px-6 py-2 rounded-full text-[10px] uppercase tracking-[0.28em] font-semibold text-[#3a2a10] transition shadow-md hover:brightness-110"
                  style={{ background: 'linear-gradient(to bottom, #E6C878 0%, #C9A227 55%, #A88418 100%)', border: '1px solid #8a6b2a' }}
                >
                  Search
                </button>
              </div>
            </div>

            {/* SECONDARY TRAY — appears only when More Filters is clicked */}
            {moreFilters && (
              <div className="mt-4 pt-4 border-t border-[#D4AF37]/20">
                <div className="text-[10px] uppercase tracking-[0.28em] text-[#D4AF37] font-semibold mb-3">More Filters</div>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
                  <div>
                    <label className="text-[9px] uppercase tracking-widest text-[#D4AF37]/70 block mb-1">Property Status</label>
                    <CompactSelect value={filters.status} onChange={v => setFilters(f => ({...f, status: v}))} options={STATUS_OPTS} />
                  </div>
                  <div>
                    <label className="text-[9px] uppercase tracking-widest text-[#D4AF37]/70 block mb-1">Sqft (min)</label>
                    <CompactSelect value={filters.sqftMin} onChange={v => setFilters(f => ({...f, sqftMin: v}))} options={SQFT_OPTS} />
                  </div>
                  <div>
                    <label className="text-[9px] uppercase tracking-widest text-[#D4AF37]/70 block mb-1">Year Built (min)</label>
                    <CompactSelect value={filters.yearBuiltMin} onChange={v => setFilters(f => ({...f, yearBuiltMin: v}))} options={YEAR_OPTS} />
                  </div>
                  <div>
                    <label className="text-[9px] uppercase tracking-widest text-[#D4AF37]/70 block mb-1">Garage Spaces</label>
                    <CompactSelect value={filters.garage} onChange={v => setFilters(f => ({...f, garage: v}))} options={GARAGE_OPTS} />
                  </div>
                  <div>
                    <label className="text-[9px] uppercase tracking-widest text-[#D4AF37]/70 block mb-1">Pool</label>
                    <CompactSelect value={filters.pool} onChange={v => setFilters(f => ({...f, pool: v}))} options={POOL_OPTS} />
                  </div>
                  <div>
                    <label className="text-[9px] uppercase tracking-widest text-[#D4AF37]/70 block mb-1">Waterfront</label>
                    <CompactSelect value={filters.waterfront} onChange={v => setFilters(f => ({...f, waterfront: v}))} options={WATER_OPTS} />
                  </div>
                  <div>
                    <label className="text-[9px] uppercase tracking-widest text-[#D4AF37]/70 block mb-1">HOA Fees (max)</label>
                    <CompactSelect value={filters.hoaMax} onChange={v => setFilters(f => ({...f, hoaMax: v}))} options={HOA_OPTS} />
                  </div>
                  <div>
                    <label className="text-[9px] uppercase tracking-widest text-[#D4AF37]/70 block mb-1">View</label>
                    <CompactSelect value={filters.view} onChange={v => setFilters(f => ({...f, view: v}))} options={VIEW_OPTS} />
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Middle + Bottom UNIFIED: one chat box containing scrollable history AND input.
          Width matches Hobson video (75%), centered, fills the remaining vertical space. */}
      <div className="flex-1 min-h-0 px-6 pt-3 pb-6 flex justify-center">
        <div className="w-full lg:w-[75%] flex flex-col min-h-0 rounded-2xl border border-[#D4AF37]/30 bg-[#0B1526]/70 shadow-lg overflow-hidden">
          {/* Scrollable message history — scrollbar is INSIDE this box */}
          <div ref={scrollRef} className="flex-1 min-h-0 overflow-y-auto px-4 py-3 space-y-4 hobson-scroll">
            {messages.map((m, i) => (
              <div key={i} className={m.role === 'user' ? 'flex justify-end' : ''}>
                {m.role === 'assistant' ? (
                  <div className="space-y-1 max-w-full">
                    <div className="text-[9px] uppercase tracking-[0.28em] text-[#D4AF37]/80 font-medium flex items-center gap-2">
                      Hobson
                      <button onClick={() => playVoice(m.content, i)} className="inline-flex items-center justify-center h-5 w-5 rounded-full hover:bg-[#D4AF37]/20 transition" title={speakingIdx === i ? 'Stop' : 'Hear Hobson speak'}>
                        {speakingIdx === i ? <Loader2 className="h-3 w-3 text-[#D4AF37] animate-spin" /> : <Volume2 className="h-3 w-3 text-[#D4AF37]/60 hover:text-[#D4AF37]" />}
                      </button>
                    </div>
                    <div style={{ fontFamily: SERIF }} className="text-[#F5EDE0] text-[1.05rem] leading-relaxed whitespace-pre-wrap">{m.content}</div>
                  </div>
                ) : (
                  <div className="bg-[#D4AF37]/15 border border-[#D4AF37]/30 text-[#F5EDE0] rounded-2xl rounded-tr-sm px-4 py-2 max-w-[85%] text-sm leading-relaxed whitespace-pre-wrap">{m.content}</div>
                )}
              </div>
            ))}

            {loading && (
              <div className="space-y-1">
                <div className="text-[9px] uppercase tracking-[0.28em] text-[#D4AF37]/80 font-medium">Hobson</div>
                <span className="inline-flex gap-1 pt-1">
                  <span className="h-2 w-2 rounded-full bg-[#D4AF37] animate-bounce" />
                  <span className="h-2 w-2 rounded-full bg-[#D4AF37] animate-bounce" style={{ animationDelay: '120ms' }} />
                  <span className="h-2 w-2 rounded-full bg-[#D4AF37] animate-bounce" style={{ animationDelay: '240ms' }} />
                </span>
              </div>
            )}
          </div>

          {/* Input row — anchored at the bottom of the same box */}
          <div className="border-t border-[#D4AF37]/20 flex items-start gap-2 p-3 flex-shrink-0">
            <button onClick={toggleMic} className={`h-10 w-10 rounded-full flex items-center justify-center transition flex-shrink-0 mt-1 ${listening ? 'bg-[#D4AF37] text-[#0A1628] animate-pulse' : 'border border-[#D4AF37]/30 hover:border-[#D4AF37] text-[#D4AF37]'}`} aria-label="voice input" title={listening ? 'Listening…' : 'Speak to Hobson'}>
              {listening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
            </button>
            <textarea value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send() } }} placeholder={listening ? 'Listening…' : 'Tell Hobson what you\'re looking for…'} rows={3} className="flex-1 bg-transparent border-0 focus:outline-none text-[#F5EDE0] placeholder-[#F5EDE0]/40 text-sm px-2 py-2 transition resize-none leading-relaxed" disabled={loading} />
            <button onClick={() => send()} disabled={loading || !input.trim()} className="h-10 w-10 rounded-full bg-[#D4AF37] hover:bg-[#E2C285] disabled:opacity-40 text-[#0A1628] flex items-center justify-center transition flex-shrink-0 mt-1">
              <Send className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      <PropertyDetailDialog
        property={viewProperty}
        open={!!viewProperty}
        onOpenChange={(o) => !o && setViewProperty(null)}
        isFavorite={viewProperty ? favIds.has(viewProperty.id) : false}
        onToggleFavorite={toggleFavorite}
        onAskAtlas={(p) => send(`Tell me more about ${p.title} in ${p.city} and how soon I could see it`)}
      />
    </div>
  )
}

// =====================================================================
// RIGHT PANEL: crossfading idle homes OR active property showcase OR map
// =====================================================================
function IdleCrossfade() {
  const [idx, setIdx] = useState(0)
  const HOMES = ['/hobson-homes/home-1.jpg', '/hobson-homes/home-2.jpg', '/hobson-homes/home-3.jpg']
  useEffect(() => {
    const t = setInterval(() => setIdx(i => (i + 1) % HOMES.length), 4000)
    return () => clearInterval(t)
  }, [])
  return (
    <div className="absolute inset-0">
      {HOMES.map((src, i) => (
        <img key={src} src={src} alt="" className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-[1800ms] ${i === idx ? 'opacity-100' : 'opacity-0'}`} />
      ))}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#0A1628]/95 via-[#0A1628]/40 to-transparent" />
    </div>
  )
}

function RightPanel({ tab, properties, onSaveSearch }) {
  const hasProps = properties.length > 0
  return (
    <div className="relative h-full overflow-hidden" style={{ background: NAVY }}>
      {/* MAP MODE */}
      {tab === 'map' && (
        <div className="absolute inset-0 pb-[92px]">
          <MapPanel />
        </div>
      )}

      {/* CONCIERGE MODE */}
      {tab === 'concierge' && !hasProps && <IdleCrossfade />}
      {tab === 'concierge' && hasProps && (
        <div className="absolute inset-0 pt-16 pb-[92px]">
          <PropertyShowcase properties={properties} />
        </div>
      )}

      {/* FIXED BOTTOM BRAND BAR — always visible */}
      <BrandFooterBar />
    </div>
  )
}

function MapPanel() {
  const [props, setProps] = useState([])
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    fetch('/api/properties').then(r => r.json()).then(d => { setProps(Array.isArray(d) ? d : []); setLoading(false) })
  }, [])
  return (
    <div className="h-full w-full pt-16">
      {loading ? (
        <div className="h-full flex items-center justify-center text-[#D4AF37]/60">Loading map…</div>
      ) : (
        <div className="h-full w-full relative">
          <PropertyMap properties={props} filterType="all" />
          <div className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-[#0A1628]/85 border border-[#D4AF37]/30 backdrop-blur-sm text-[#D4AF37] text-[9px] uppercase tracking-[0.24em]">Draw-to-search · coming next</div>
        </div>
      )}
    </div>
  )
}

function BrandFooterBar() {
  return (
    <div className="absolute bottom-0 left-0 right-0 z-30 border-t border-[#D4AF37]/25 backdrop-blur-md" style={{ background: 'rgba(10, 22, 40, 0.92)' }}>
      <div className="grid grid-cols-2 divide-x divide-[#D4AF37]/20">
        <div className="flex items-center gap-3 px-5 py-3">
          <img src={LOGOS.residential} alt="Anasa" className="h-10 w-14 object-contain flex-shrink-0" />
          <div className="min-w-0">
            <div style={{ fontFamily: SERIF }} className="text-[#D4AF37] text-sm leading-none truncate">The Anasa Collection</div>
            <div className="text-[9px] uppercase tracking-[0.22em] text-[#F5EDE0]/60 mt-1 truncate">Residential Luxury</div>
          </div>
        </div>
        <div className="flex items-center gap-3 px-5 py-3">
          <img src={LOGOS.commercial} alt="Next Endeavor" className="h-10 w-10 object-contain flex-shrink-0" />
          <div className="min-w-0">
            <div style={{ fontFamily: SERIF }} className="text-[#D4AF37] text-sm leading-none truncate">Next Endeavor CRE</div>
            <div className="text-[9px] uppercase tracking-[0.22em] text-[#F5EDE0]/60 mt-1 truncate">Commercial Investments</div>
          </div>
        </div>
      </div>
    </div>
  )
}

// =====================================================================
// ADMIN DASHBOARD (unchanged, hidden behind ?admin=1)
// =====================================================================
function AdminDashboard() {
  const [sessions, setSessions] = useState([])
  const [stats, setStats] = useState(null)
  const [selected, setSelected] = useState(null)
  const [adminMsg, setAdminMsg] = useState('')
  const [filterTier, setFilterTier] = useState('all')
  async function load() {
    const [sRes, statsRes] = await Promise.all([fetch('/api/sessions').then(r => r.json()), fetch('/api/stats').then(r => r.json())])
    setSessions(Array.isArray(sRes) ? sRes : [])
    setStats(statsRes)
  }
  useEffect(() => { load() }, [])
  async function loadSession(id) { const r = await fetch(`/api/sessions/${id}`).then(r => r.json()); setSelected(r) }
  async function updateSession(patch) {
    if (!selected) return
    const r = await fetch(`/api/sessions/${selected.id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(patch) }).then(r => r.json())
    setSelected(r); load()
  }
  const stages = ['discovery', 'qualified', 'showing', 'negotiating', 'closed']
  const filteredSessions = filterTier === 'all' ? sessions : sessions.filter(s => (s.lead_tier || 'cold') === filterTier)
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Card className="p-4"><div className="text-xs text-[#0A1628]/60 uppercase tracking-wider">Total Leads</div><div className="text-3xl font-bold mt-1 text-[#0A1628]">{stats?.totalLeads || 0}</div></Card>
        <Card className="p-4"><div className="text-xs text-[#0A1628]/60 uppercase tracking-wider">Hot</div><div className="text-3xl font-bold mt-1 text-[#D4AF37]">{stats?.byTier?.hot || 0}</div></Card>
        <Card className="p-4"><div className="text-xs text-[#0A1628]/60 uppercase tracking-wider">Warm</div><div className="text-3xl font-bold mt-1">{stats?.byTier?.warm || 0}</div></Card>
        <Card className="p-4"><div className="text-xs text-[#0A1628]/60 uppercase tracking-wider">Cold</div><div className="text-3xl font-bold mt-1 text-[#0A1628]/50">{stats?.byTier?.cold || 0}</div></Card>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="lg:col-span-1 p-0 overflow-hidden">
          <div className="px-4 py-3 border-b bg-[#0A1628] text-[#D4AF37] font-semibold text-sm flex items-center justify-between">
            <span className="flex items-center gap-2"><MessageSquare className="h-4 w-4" />Active Conversations</span>
            <Select value={filterTier} onValueChange={setFilterTier}>
              <SelectTrigger className="h-7 w-[110px] text-xs bg-white/10 border-white/20 text-white"><SelectValue /></SelectTrigger>
              <SelectContent><SelectItem value="all">All</SelectItem><SelectItem value="hot">Hot</SelectItem><SelectItem value="warm">Warm</SelectItem><SelectItem value="cold">Cold</SelectItem></SelectContent>
            </Select>
          </div>
          <div className="max-h-[640px] overflow-y-auto divide-y">
            {filteredSessions.length === 0 && <div className="p-4 text-sm text-[#0A1628]/50">No leads yet.</div>}
            {filteredSessions.map(s => {
              const last = s.messages?.[s.messages.length - 1]
              return (
                <button key={s.id} onClick={() => loadSession(s.id)} className={`w-full text-left px-4 py-3 hover:bg-[#F5EDE0] transition ${selected?.id === s.id ? 'bg-[#D4AF37]/10' : ''}`}>
                  <div className="flex items-center justify-between gap-2">
                    <div className="font-medium text-sm truncate">{s.lead?.name || 'Anonymous lead'}</div>
                    <TierBadge tier={s.lead_tier} score={s.lead_score} />
                  </div>
                  <div className="text-xs text-[#0A1628]/60 truncate mt-0.5">{last?.content?.slice(0, 70) || 'No messages yet'}</div>
                </button>
              )
            })}
          </div>
        </Card>
        <Card className="lg:col-span-2 p-0 overflow-hidden">
          {!selected && <div className="p-10 text-center text-[#0A1628]/50">Select a lead.</div>}
          {selected && (
            <div className="flex flex-col max-h-[760px]">
              <div className="px-4 py-3 border-b bg-[#0A1628] text-[#D4AF37] font-semibold text-sm flex items-center justify-between">
                <span>Conversation</span>
                <TierBadge tier={selected.lead_tier} score={selected.lead_score} />
              </div>
              <div className="flex-1 overflow-y-auto p-3 space-y-2 bg-[#F5EDE0]">
                {selected.messages?.map((m, i) => (
                  <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : ''}`}>
                    <div className={`text-xs rounded-lg px-3 py-2 max-w-[85%] ${m.role === 'user' ? 'bg-[#0A1628] text-white' : 'bg-white border'}`}>{m.content}</div>
                  </div>
                ))}
              </div>
              <div className="p-2 border-t bg-white flex gap-2">
                <Input value={adminMsg} onChange={e => setAdminMsg(e.target.value)} placeholder="Broker override…" className="text-xs h-8" />
                <Button size="sm" onClick={() => { if (adminMsg.trim()) { updateSession({ adminMessage: adminMsg }); setAdminMsg('') } }} className="bg-[#0A1628] hover:bg-[#0A1628]/90 text-[#D4AF37]">Send</Button>
              </div>
              <div className="p-4 border-t space-y-3 text-sm">
                <div className="text-xs uppercase tracking-widest text-[#0A1628]/50">Pipeline Stage</div>
                <div className="flex flex-wrap gap-1">
                  {stages.map(st => (<button key={st} onClick={() => updateSession({ stage: st })} className={`text-[11px] px-2 py-1 rounded border capitalize ${selected.stage === st ? 'bg-[#0A1628] text-[#D4AF37]' : ''}`}>{st}</button>))}
                </div>
                <div className="text-xs uppercase tracking-widest text-[#0A1628]/50">Learned Preferences</div>
                <pre className="text-[11px] bg-[#F5EDE0] p-2 rounded overflow-x-auto whitespace-pre-wrap">{JSON.stringify(selected.preferences || {}, null, 2)}</pre>
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  )
}

// =====================================================================
// APP — true 50/50 split with gold vertical divider
// =====================================================================
function App() {
  const [tab, setTab] = useState('concierge')
  const [isAdmin, setIsAdmin] = useState(false)
  const [heroShowcase, setHeroShowcase] = useState([])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search)
      setIsAdmin(params.get('admin') === '1')
    }
  }, [])

  function triggerSaveSearch() {
    window.dispatchEvent(new CustomEvent('hobson:save-search'))
  }

  return (
    <div className="min-h-screen lg:h-screen flex flex-col overflow-y-auto lg:overflow-hidden" style={{ background: NAVY }}>
      {/* Top Nav — simple, single row, Concierge + Map only */}
      <header className="flex-shrink-0 border-b border-[#D4AF37]/20" style={{ background: NAVY }}>
        <div className="max-w-[1600px] mx-auto px-6 py-2 flex items-center justify-between gap-4">
          {/* LEFT: brand logos */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <img src={LOGOS.residential} alt="Anasa Collection" className="h-10 w-14 object-contain" />
            <img src={LOGOS.commercial} alt="Next Endeavor CRE" className="h-10 w-10 object-contain" />
            <span className="hidden xl:inline text-[#F5EDE0] text-xl ml-2" style={{ fontFamily: SERIF, fontWeight: 500 }}>VantaSure Realty</span>
          </div>
          {/* CENTER: tabs */}
          <Tabs value={tab} onValueChange={setTab} className="flex-shrink-0">
            <TabsList className="bg-transparent border border-[#D4AF37]/25 h-8">
              <TabsTrigger value="concierge" className="data-[state=active]:bg-[#D4AF37] data-[state=active]:text-[#0A1628] text-[#F5EDE0] text-[10px] uppercase tracking-[0.22em] px-3">
                <Sparkles className="h-3 w-3 mr-1" />Concierge
              </TabsTrigger>
              <TabsTrigger value="map" className="data-[state=active]:bg-[#D4AF37] data-[state=active]:text-[#0A1628] text-[#F5EDE0] text-[10px] uppercase tracking-[0.22em] px-3">
                <MapIcon className="h-3 w-3 mr-1" />Map
              </TabsTrigger>
              {isAdmin && (
                <TabsTrigger value="admin" className="data-[state=active]:bg-[#D4AF37] data-[state=active]:text-[#0A1628] text-[#F5EDE0] text-[10px] uppercase tracking-[0.22em] px-3">
                  <Settings className="h-3 w-3 mr-1" />Dashboard
                </TabsTrigger>
              )}
            </TabsList>
          </Tabs>
          {/* RIGHT: inline lead capture (3 shaded fields + save) */}
          <InlineLeadCapture />
        </div>
      </header>

      {/* MAIN: true 50/50 split w/ gold vertical divider (or full-width admin) */}
      {tab === 'admin' && isAdmin ? (
        <main className="flex-1 overflow-y-auto" style={{ background: '#F5EDE0' }}>
          <section className="max-w-7xl mx-auto px-6 py-8">
            <h1 style={{ fontFamily: SERIF }} className="text-3xl text-[#0A1628]">Broker Dashboard</h1>
            <p className="text-[#0A1628]/60 text-sm mt-1 mb-6">Monitor Hobson · Override · Pipeline management</p>
            <AdminDashboard />
          </section>
        </main>
      ) : (
        <main className="flex-1 grid grid-cols-1 lg:grid-cols-[1fr_1px_1fr] lg:overflow-hidden">
          {/* LEFT panel */}
          <ChatPanel onProperties={setHeroShowcase} />
          {/* Gold vertical divider */}
          <div className="hidden lg:block w-px" style={{ background: `linear-gradient(to bottom, transparent 0%, ${GOLD} 8%, ${GOLD} 92%, transparent 100%)` }} />
          {/* RIGHT panel */}
          <RightPanel tab={tab} properties={heroShowcase} onSaveSearch={triggerSaveSearch} />
        </main>
      )}

      {/* Bottom strip: Agent Login placeholder */}
      <footer className="flex-shrink-0 border-t border-[#D4AF37]/15 py-2" style={{ background: NAVY }}>
        <div className="max-w-[1600px] mx-auto px-6 flex items-center justify-between text-[10px]">
          <div className="text-[#F5EDE0]/40">Powered by Hobson · Real Estate, Handled</div>
          <a href="#agent-login" className="text-[#F5EDE0]/50 hover:text-[#D4AF37] transition uppercase tracking-[0.22em]">Agent Login</a>
        </div>
      </footer>
    </div>
  )
}

export default App
