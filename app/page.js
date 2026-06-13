'use client'

import { useState, useEffect, useRef } from 'react'
import dynamic from 'next/dynamic'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { Sparkles, Send, MapPin, BedDouble, Bath, Maximize, TrendingUp, Users, MessageSquare, Settings, Mic, MicOff, Heart, Flame, Snowflake, Thermometer, Building2, Crown, Calendar, Eye, X, Printer, Map as MapIcon, Volume2, Loader2 } from 'lucide-react'

const PropertyMap = dynamic(() => import('@/components/PropertyMap'), { ssr: false, loading: () => <div className="h-[640px] flex items-center justify-center bg-[#F5EDE0] border border-[#C9A867]/30 rounded text-[#1B3A4F]/60">Loading map…</div> })
const HobsonOrb = dynamic(() => import('@/components/HobsonOrb'), { ssr: false })
const MicroOrb = dynamic(() => import('@/components/MicroOrb'), { ssr: false })
const HeroSearch = dynamic(() => import('@/components/HeroSearch'), { ssr: false })

// ============ BRAND ASSETS ============
const LOGOS = {
  residential: '/anasa.png',
  commercial: '/next-endeavor.png'
}
const HERO_IMG = 'https://images.unsplash.com/photo-1535498730771-e735b998cd64?crop=entropy&cs=srgb&fm=jpg&q=85&w=2400'

// Brand colors
// Navy: #1B3A4F   Gold: #C9A867  Light Gold: #E2C285   Silver: #C8CCD1   Ivory: #F5EDE0

function BrandHeader({ persona }) {
  const logo = LOGOS[persona]
  const brandName = persona === 'residential' ? 'The Anasa Collection' : 'Next Endeavor CRE'
  return (
    <div className="flex items-center gap-3 min-w-0">
      <img src={logo} alt={brandName} className="h-16 w-20 object-contain flex-shrink-0" />
      <div className="min-w-0">
        <div className="text-[9px] uppercase tracking-[0.25em] text-[#C8CCD1]/60 whitespace-nowrap">Concierge · Online</div>
        <div className="font-serif text-[#E2C285] text-lg leading-tight whitespace-nowrap">{brandName}</div>
      </div>
    </div>
  )
}

function TierBadge({ tier, score }) {
  if (!tier) return null
  const cfg = {
    hot: { icon: Flame, label: 'HOT', cls: 'bg-gradient-to-r from-[#C9A867] to-[#E2C285] text-[#1B3A4F] border-0' },
    warm: { icon: Thermometer, label: 'WARM', cls: 'bg-[#C8CCD1] text-[#1B3A4F] border-0' },
    cold: { icon: Snowflake, label: 'COLD', cls: 'bg-[#1B3A4F]/10 text-[#1B3A4F]/70 border border-[#1B3A4F]/20' }
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
      <DialogContent className="max-w-4xl p-0 overflow-hidden bg-white border-[#C9A867]/30">
        <div className="relative h-72 bg-[#1B3A4F]">
          <img src={p.image} alt={p.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
          <Badge className="absolute top-3 left-3 bg-[#1B3A4F]/95 text-[#E2C285] border-0 font-medium">{isCommercial ? 'Next Endeavor CRE' : 'Anasa Collection'}</Badge>
          <button onClick={() => onToggleFavorite && onToggleFavorite(p.id)} className="absolute top-3 right-12 h-9 w-9 rounded-full bg-white/95 hover:bg-white flex items-center justify-center shadow">
            <Heart className={`h-4 w-4 ${isFavorite ? 'fill-[#C9A867] text-[#C9A867]' : 'text-[#1B3A4F]/60'}`} />
          </button>
          <div className="absolute bottom-4 left-4 right-4 text-white">
            <div className="font-serif text-3xl text-[#E2C285] leading-tight">{p.title}</div>
            <div className="flex items-center gap-1 mt-1 text-sm opacity-90"><MapPin className="h-4 w-4" />{p.address}</div>
          </div>
        </div>
        <div className="p-6 space-y-5 max-h-[55vh] overflow-y-auto">
          <div className="flex items-baseline justify-between">
            <div className="text-3xl font-bold text-[#C9A867]">${p.price.toLocaleString()}</div>
            {p.capRate && (
              <div className="text-right">
                <div className="text-xs uppercase tracking-wider text-[#1B3A4F]/60">Cap rate</div>
                <div className="text-2xl font-bold text-emerald-700">{p.capRate}%</div>
              </div>
            )}
          </div>

          {/* Key stats grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 border-y border-[#C8CCD1]/40 py-4">
            {p.beds > 0 && (
              <div className="text-center">
                <BedDouble className="h-5 w-5 text-[#C9A867] mx-auto" />
                <div className="text-lg font-semibold text-[#1B3A4F] mt-1">{p.beds}</div>
                <div className="text-[10px] uppercase tracking-wider text-[#1B3A4F]/60">Bedrooms</div>
              </div>
            )}
            {p.baths > 0 && (
              <div className="text-center">
                <Bath className="h-5 w-5 text-[#C9A867] mx-auto" />
                <div className="text-lg font-semibold text-[#1B3A4F] mt-1">{p.baths}</div>
                <div className="text-[10px] uppercase tracking-wider text-[#1B3A4F]/60">Bathrooms</div>
              </div>
            )}
            <div className="text-center">
              <Maximize className="h-5 w-5 text-[#C9A867] mx-auto" />
              <div className="text-lg font-semibold text-[#1B3A4F] mt-1">{p.sqft.toLocaleString()}</div>
              <div className="text-[10px] uppercase tracking-wider text-[#1B3A4F]/60">Square Feet</div>
            </div>
            {p.noi && (
              <div className="text-center">
                <TrendingUp className="h-5 w-5 text-[#C9A867] mx-auto" />
                <div className="text-lg font-semibold text-[#1B3A4F] mt-1">${(p.noi/1000).toFixed(0)}K</div>
                <div className="text-[10px] uppercase tracking-wider text-[#1B3A4F]/60">Hnnual NOI</div>
              </div>
            )}
            {p.zoning && !p.noi && (
              <div className="text-center">
                <Building2 className="h-5 w-5 text-[#C9A867] mx-auto" />
                <div className="text-lg font-semibold text-[#1B3A4F] mt-1">{p.zoning}</div>
                <div className="text-[10px] uppercase tracking-wider text-[#1B3A4F]/60">Zoning</div>
              </div>
            )}
          </div>

          <div>
            <div className="text-xs uppercase tracking-widest text-[#1B3A4F]/50 mb-2">Description</div>
            <p className="text-sm text-[#1B3A4F]/80 leading-relaxed">{p.description}</p>
          </div>

          <div>
            <div className="text-xs uppercase tracking-widest text-[#1B3A4F]/50 mb-2">Features & Amenities</div>
            <div className="flex flex-wrap gap-1.5">
              {(p.amenities || []).map(a => (
                <span key={a} className="text-xs px-2.5 py-1 rounded-full bg-[#F5EDE0] border border-[#C8CCD1]/40 text-[#1B3A4F]/80 capitalize">{a}</span>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="bg-[#F5EDE0] rounded p-2">
              <div className="text-[10px] uppercase tracking-wider text-[#1B3A4F]/50">Listing ID</div>
              <div className="font-mono text-[#1B3A4F]">{p.id.toUpperCase()}</div>
            </div>
            <div className="bg-[#F5EDE0] rounded p-2">
              <div className="text-[10px] uppercase tracking-wider text-[#1B3A4F]/50">Property Type</div>
              <div className="text-[#1B3A4F] capitalize">{p.subtype}</div>
            </div>
          </div>
        </div>
        <DialogFooter className="bg-[#F5EDE0] border-t border-[#C8CCD1]/40 p-4 gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)} className="border-[#C8CCD1]">Close</Button>
          <a href={`/brief/${p.id}`} target="_blank">
            <Button variant="outline" className="border-[#C9A867] text-[#1B3A4F]">
              <Printer className="h-4 w-4 mr-2" />Property Brief (PDF)
            </Button>
          </a>
          {onAskAtlas && (
            <Button onClick={() => { onAskAtlas(p); onOpenChange(false) }} className="bg-[#1B3A4F] hover:bg-[#1B3A4F]/90 text-[#E2C285]">
              <Calendar className="h-4 w-4 mr-2" />Hsk Hobson to schedule a showing
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

function PropertyCard({ p, isFavorite, onToggleFavorite, onView, persona }) {
  return (
    <Card className="overflow-hidden border border-[#C8CCD1]/40 hover:shadow-xl hover:border-[#C9A867]/60 transition-all bg-white group cursor-pointer" onClick={() => onView && onView(p)}>
      <div className="h-40 relative overflow-hidden">
        <img src={p.image} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
        <Badge className="absolute top-2 left-2 bg-[#1B3A4F]/90 hover:bg-[#1B3A4F] text-[#E2C285] border-0 font-medium">
          {p.type === 'residential' ? 'The Anasa Collection' : 'Next Endeavor CRE'}
        </Badge>
        {onToggleFavorite && (
          <button
            onClick={(e) => { e.stopPropagation(); onToggleFavorite(p.id) }}
            className="absolute top-2 right-2 h-8 w-8 rounded-full bg-white/95 hover:bg-white flex items-center justify-center shadow transition"
            aria-label="favorite"
          >
            <Heart className={`h-4 w-4 transition ${isFavorite ? 'fill-[#C9A867] text-[#C9A867]' : 'text-[#1B3A4F]/60'}`} />
          </button>
        )}
        <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition bg-[#1B3A4F]/85 text-white text-[10px] px-2 py-0.5 rounded-full flex items-center gap-1">
          <Eye className="h-3 w-3" />View details
        </div>
      </div>
      <div className="p-3 space-y-1.5">
        <div className="font-serif text-[#1B3A4F] text-base leading-tight">{p.title}</div>
        <div className="text-xs text-[#1B3A4F]/60 flex items-center gap-1"><MapPin className="h-3 w-3" />{p.city}, {p.state}</div>
        <div className="text-lg font-bold text-[#C9A867]">${p.price.toLocaleString()}</div>
        <div className="flex flex-wrap gap-3 text-xs text-[#1B3A4F]/70 pt-1">
          {p.beds > 0 && <span className="flex items-center gap-1"><BedDouble className="h-3 w-3" />{p.beds}</span>}
          {p.baths > 0 && <span className="flex items-center gap-1"><Bath className="h-3 w-3" />{p.baths}</span>}
          <span className="flex items-center gap-1"><Maximize className="h-3 w-3" />{p.sqft.toLocaleString()} sqft</span>
          {p.capRate && <span className="flex items-center gap-1 font-semibold text-emerald-700"><TrendingUp className="h-3 w-3" />{p.capRate}% cap</span>}
        </div>
        <div className="flex flex-wrap gap-1 pt-1">
          {(p.amenities || []).slice(0, 3).map(a => (
            <span key={a} className="text-[10px] px-1.5 py-0.5 rounded bg-[#F5EDE0] text-[#1B3A4F]/70 border border-[#C8CCD1]/30">{a}</span>
          ))}
        </div>
      </div>
    </Card>
  )
}

function ChatPanel() {
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
  const [voiceError, setVoiceError] = useState(null)
  const [voiceMode, setVoiceMode] = useState(false)
  const [orbActive, setOrbActive] = useState(false)
  const [orbSpeaking, setOrbSpeaking] = useState(false)
  const audioRef = useRef(null)
  const recognitionRef = useRef(null)
  const scrollRef = useRef(null)
  const lastPlayedRef = useRef(null)      // guards against double-playing the same reply
  const sendingRef = useRef(false)        // guards against double-send from multiple recognition finals

  // Broadcast orb state to MicroOrb (idle | listening | thinking | speaking)
  useEffect(() => {
    if (typeof window === 'undefined') return
    let s = 'idle'
    if (orbActive) {
      if (orbSpeaking) s = 'speaking'
      else if (loading) s = 'thinking'
      else if (listening) s = 'listening'
      else s = 'idle'
    }
    window.dispatchEvent(new CustomEvent('hobson:state', { detail: s }))
  }, [orbActive, listening, loading, orbSpeaking])

  useEffect(() => {
    const existing = typeof window !== 'undefined' ? localStorage.getItem('atlas_session') : null
    if (existing) setSessionId(existing)
  }, [])

  // Micro-orb toggle → INLINE voice conversation (no overlay)
  useEffect(() => {
    const toggle = () => {
      setOrbActive((prev) => {
        if (prev) {
          // Stop everything
          try { recognitionRef.current?.stop() } catch (e) {}
          try { audioRef.current?.pause() } catch (e) {}
          setListening(false)
          setOrbSpeaking(false)
          return false
        } else {
          // Start listening
          setTimeout(() => {
            try { recognitionRef.current?.start(); setListening(true) } catch (e) {}
          }, 200)
          return true
        }
      })
    }
    window.addEventListener('hobson:toggle-orb', toggle)
    return () => window.removeEventListener('hobson:toggle-orb', toggle)
  }, [])

  // External Search bar → submit query as a Hobson chat message
  useEffect(() => {
    const onSearch = (e) => {
      const q = (e?.detail || '').toString().trim()
      if (q) send(q)
    }
    window.addEventListener('hobson:search', onSearch)
    return () => window.removeEventListener('hobson:search', onSearch)
  }, [])

  // Broadcast persona changes so HeroSearch can swap its placeholder
  useEffect(() => {
    if (typeof window === 'undefined') return
    window.dispatchEvent(new CustomEvent('hobson:persona', { detail: persona }))
  }, [persona])

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight
  }, [messages, loading, recommended])

  // Auto-play Hobson's latest reply (Voice Mode OR Orb Mode), then resume listening
  useEffect(() => {
    const active = voiceMode || orbActive
    if (!active || messages.length === 0) return
    const last = messages[messages.length - 1]
    if (last.role !== 'assistant') return

    // 🛡️ Guard: don't replay the same message (handles StrictMode double-render + state churn)
    const fingerprint = messages.length + ':' + (last.content || '').slice(0, 60)
    if (lastPlayedRef.current === fingerprint) return
    lastPlayedRef.current = fingerprint

    ;(async () => {
      try {
        // 🔇 Cut the mic — Hobson is about to speak
        try { recognitionRef.current?.stop() } catch (e) {}
        setListening(false)

        const res = await fetch('/api/voice', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text: last.content })
        })
        if (!res.ok) return
        const blob = await res.blob()
        const url = URL.createObjectURL(blob)
        const audio = new Audio(url)
        audioRef.current = audio
        audio.onplay = () => setOrbSpeaking(true)
        audio.onended = () => {
          URL.revokeObjectURL(url)
          setOrbSpeaking(false)
          // 700ms tail — let speaker echo die before mic reopens
          setTimeout(() => {
            if ((voiceMode || orbActive) && recognitionRef.current) {
              try { recognitionRef.current.start(); setListening(true) } catch (e) {}
            }
          }, 700)
        }
        await audio.play()
      } catch (e) { setOrbSpeaking(false) }
    })()
  }, [messages, voiceMode, orbActive])

  // 🎙️ BARGE-IN: when user starts speaking while Hobson is talking → cut him off instantly
  useEffect(() => {
    if (!orbActive || typeof window === 'undefined') return
    let stream, audioCtx, analyser, raf, alive = true

    ;(async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({ audio: { echoCancellation: true, noiseSuppression: true } })
        audioCtx = new (window.AudioContext || window.webkitAudioContext)()
        const src = audioCtx.createMediaStreamSource(stream)
        analyser = audioCtx.createAnalyser()
        analyser.fftSize = 512
        src.connect(analyser)
        const data = new Uint8Array(analyser.frequencyBinCount)
        const VOL_THRESHOLD = 28  // ambient noise floor; voice spikes above this

        const tick = () => {
          if (!alive) return
          analyser.getByteFrequencyData(data)
          let sum = 0
          for (let i = 0; i < data.length; i++) sum += data[i]
          const avg = sum / data.length
          // If Hobson is speaking AND user voice detected → BARGE IN
          if (audioRef.current && !audioRef.current.paused && avg > VOL_THRESHOLD) {
            try { audioRef.current.pause() } catch (e) {}
            setOrbSpeaking(false)
            // Mic likely still off — restart it so we capture what they're saying
            setTimeout(() => {
              if (recognitionRef.current) {
                try { recognitionRef.current.start(); setListening(true) } catch (e) {}
              }
            }, 100)
          }
          raf = requestAnimationFrame(tick)
        }
        tick()
      } catch (e) { /* mic permission denied or not available */ }
    })()

    return () => {
      alive = false
      if (raf) cancelAnimationFrame(raf)
      if (stream) stream.getTracks().forEach(t => t.stop())
      if (audioCtx) audioCtx.close().catch(() => {})
    }
  }, [orbActive])

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
      // Auto-send on final result in voice mode OR orb mode (guard against double-fire)
      if (finalText && (voiceMode || orbActive)) {
        const text = finalText.trim()
        if (text.length > 1 && !sendingRef.current) {
          sendingRef.current = true
          setInput('')
          send(text).finally(() => { sendingRef.current = false })
        }
      }
    }
    r.onend = () => setListening(false)
    r.onerror = () => setListening(false)
    recognitionRef.current = r
  }, [voiceMode, orbActive])

  async function toggleMic() {
    const r = recognitionRef.current
    if (!r) { alert('Voice input requires Chrome or Edge browser. Try opening in Chrome.'); return }
    if (listening) { try { r.stop() } catch (e) {} ; setListening(false); return }
    setInput('')
    try {
      r.start()
      setListening(true)
    } catch (e) {
      alert('Could not start microphone. Make sure you are using Chrome and have granted mic permission. (' + e.message + ')')
    }
  }

  async function playVoice(text, idx) {
    setVoiceError(null)
    if (audioRef.current) { try { audioRef.current.pause() } catch (e) {} }
    if (speakingIdx === idx) { setSpeakingIdx(null); return }
    setSpeakingIdx(idx)
    try {
      const res = await fetch('/api/voice', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text })
      })
      if (!res.ok) {
        const err = await res.json()
        setVoiceError(err.error || 'voice unavailable')
        setSpeakingIdx(null)
        return
      }
      const blob = await res.blob()
      const url = URL.createObjectURL(blob)
      const audio = new Audio(url)
      audioRef.current = audio
      audio.onended = () => { setSpeakingIdx(null); URL.revokeObjectURL(url) }
      audio.onerror = () => { setSpeakingIdx(null); setVoiceError('playback error') }
      await audio.play()
    } catch (e) {
      setVoiceError(e.message)
      setSpeakingIdx(null)
    }
  }

  const greeting = persona === 'residential'
    ? "Welcome to The Anasa Collection. I am Hobson. Whom do I have the pleasure of assisting today? And tell me, what does the right home feel like?"
    : "Welcome to Next Endeavor CRE. I am Hobson. Whom do I have the honor of representing today? Tell me about the mandate — and I'll connect you with Paul personally."

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
        body: JSON.stringify({ sessionId, message: msg, persona, fast: voiceMode || orbActive })
      })
      const data = await res.json()
      if (data.sessionId && !sessionId) {
        setSessionId(data.sessionId)
        localStorage.setItem('atlas_session', data.sessionId)
      }
      setMessages([...newMsgs, { role: 'assistant', content: data.reply || '...' }])
      setRecommended(data.recommended || [])
      setFavorites(data.favorites || [])
      setFavIds(new Set((data.favorites || []).map(f => f.id)))
      setLeadTier(data.lead_tier)
      setLeadScore(data.lead_score)
    } catch (e) {
      setMessages([...newMsgs, { role: 'assistant', content: 'Connection issue. Try again?' }])
    } finally {
      setLoading(false)
    }
  }

  async function toggleFavorite(propertyId) {
    if (!sessionId) return
    const res = await fetch(`/api/sessions/${sessionId}/favorite`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ propertyId })
    })
    const data = await res.json()
    setFavorites(data.favorites || [])
    setFavIds(new Set((data.favorites || []).map(f => f.id)))
  }

  function resetChat() {
    localStorage.removeItem('atlas_session')
    setSessionId(null); setMessages([]); setRecommended([]); setFavorites([]); setFavIds(new Set()); setLeadTier(null); setLeadScore(null)
  }

  const suggestions = persona === 'residential'
    ? ['Beachfront villa in Malibu around $9M', 'Manhattan penthouse with skyline views', 'Napa estate with a vineyard', '6bd/7ba pool home in Boca Raton, $4-6M']
    : ['Stabilized MOB near hospital, $10–15M, 7%+ cap', 'Class A office in SF, $25M+', 'ASC with NNN lease, 8%+ cap']

  return (
    <Card className="border border-[#C9A867]/30 shadow-2xl overflow-hidden bg-white">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-[#C9A867]/20 bg-gradient-to-r from-[#1B3A4F] via-[#1B3A4F] to-[#264B62] text-white">
        <BrandHeader persona={persona} />
        <div className="flex items-center gap-2">
          {leadTier && <TierBadge tier={leadTier} score={leadScore} />}
          <Select value={persona} onValueChange={(v) => { setPersona(v); resetChat() }}>
            <SelectTrigger className="h-8 w-[220px] bg-white/10 border-[#C9A867]/30 text-white text-xs hover:bg-white/15">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="residential"><span className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-[#C9A867]" />The Anasa Collection</span></SelectItem>
              <SelectItem value="commercial"><span className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-[#C9A867]" />Next Endeavor CRE</span></SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* (Voice CTA moved to hero left column — see HobsonOrb) */}

      {/* Messages */}
      <div ref={scrollRef} className="h-[440px] overflow-y-auto px-4 py-4 bg-gradient-to-b from-[#F5EDE0] to-white space-y-3">
        {messages.length === 0 && (
          <>
            <div className="flex gap-2">
              <div className="h-7 w-7 rounded-full bg-gradient-to-br from-[#C9A867] to-[#E2C285] text-[#1B3A4F] flex items-center justify-center text-xs font-bold flex-shrink-0">H</div>
              <div className="bg-white border border-[#C8CCD1]/40 rounded-2xl rounded-tl-sm px-4 py-2.5 max-w-[85%] text-sm leading-relaxed text-[#1B3A4F]">{greeting}</div>
            </div>
            <div className="flex flex-wrap gap-2 pl-9 pt-2">
              {suggestions.map(s => (
                <button key={s} onClick={() => send(s)} className="text-xs border border-[#C8CCD1] hover:border-[#C9A867] hover:text-[#C9A867] rounded-full px-3 py-1 bg-white transition text-[#1B3A4F]">
                  {s}
                </button>
              ))}
            </div>
          </>
        )}

        {recommended.length > 0 && (
          <div className="pt-1 pb-2">
            <div className="text-xs font-semibold text-[#1B3A4F] pl-9 pb-2 flex items-center gap-1.5 tracking-wide uppercase"><Sparkles className="h-3.5 w-3.5 text-[#C9A867]" />Curated for you</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pl-9">
              {recommended.map(p => <PropertyCard key={p.id} p={p} isFavorite={favIds.has(p.id)} onToggleFavorite={toggleFavorite} onView={setViewProperty} persona={persona} />)}
            </div>
          </div>
        )}

        {favorites.length > 0 && (
          <div className="pt-2">
            <div className="flex items-center justify-between pl-9 pb-2">
              <div className="text-xs font-semibold text-[#1B3A4F] flex items-center gap-1.5 tracking-wide uppercase"><Heart className="h-3.5 w-3.5 fill-[#C9A867] text-[#C9A867]" />My Shortlist ({favorites.length})</div>
              {sessionId && (
                <a href={`/shortlist/${sessionId}`} target="_blank" className="text-xs text-[#C9A867] hover:underline font-medium flex items-center gap-1">
                  Open shareable view →
                </a>
              )}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pl-9">
              {favorites.map(p => <PropertyCard key={'f'+p.id} p={p} isFavorite={true} onToggleFavorite={toggleFavorite} onView={setViewProperty} persona={persona} />)}
            </div>
          </div>
        )}

        {messages.map((m, i) => (
          <div key={i} className={`flex gap-2 ${m.role === 'user' ? 'justify-end' : ''}`}>
            {m.role === 'assistant' && <div className="h-7 w-7 rounded-full bg-gradient-to-br from-[#C9A867] to-[#E2C285] text-[#1B3A4F] flex items-center justify-center text-xs font-bold flex-shrink-0">H</div>}
            <div className={`rounded-2xl px-4 py-2.5 max-w-[85%] text-sm leading-relaxed whitespace-pre-wrap relative group ${m.role === 'user' ? 'bg-[#1B3A4F] text-white rounded-tr-sm' : 'bg-white border border-[#C8CCD1]/40 rounded-tl-sm text-[#1B3A4F]'}`}>
              {m.content}
              {m.role === 'assistant' && (
                <button
                  onClick={() => playVoice(m.content, i)}
                  className="ml-2 inline-flex items-center justify-center h-6 w-6 rounded-full hover:bg-[#C9A867]/20 transition align-middle"
                  title={speakingIdx === i ? 'Stop' : 'Hear Hobson speak'}
                >
                  {speakingIdx === i ? <Loader2 className="h-3.5 w-3.5 text-[#C9A867] animate-spin" /> : <Volume2 className="h-3.5 w-3.5 text-[#C9A867]/60 hover:text-[#C9A867]" />}
                </button>
              )}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex gap-2">
            <div className="h-7 w-7 rounded-full bg-gradient-to-br from-[#C9A867] to-[#E2C285] text-[#1B3A4F] flex items-center justify-center text-xs font-bold flex-shrink-0">H</div>
            <div className="bg-white border border-[#C8CCD1]/40 rounded-2xl rounded-tl-sm px-4 py-2.5 text-sm">
              <span className="inline-flex gap-1">
                <span className="h-2 w-2 rounded-full bg-[#C9A867] animate-bounce" />
                <span className="h-2 w-2 rounded-full bg-[#C9A867] animate-bounce" style={{ animationDelay: '120ms' }} />
                <span className="h-2 w-2 rounded-full bg-[#C9A867] animate-bounce" style={{ animationDelay: '240ms' }} />
              </span>
            </div>
          </div>
        )}

      </div>

      {/* Input */}
      <div className="border-t border-[#C8CCD1]/40 bg-white p-3 flex gap-2">
        <button
          onClick={toggleMic}
          className={`h-10 w-10 rounded-md flex items-center justify-center transition flex-shrink-0 ${listening ? 'bg-[#C9A867] text-[#1B3A4F] animate-pulse' : 'bg-[#F5EDE0] hover:bg-[#C8CCD1]/30 text-[#1B3A4F]'}`}
          aria-label="voice input"
          title={listening ? 'Listening… click to stop' : 'Click to speak'}
        >
          {listening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
        </button>
        <Input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send() } }}
          placeholder={listening ? 'Listening…' : 'Tell Hobson what you\'re looking for…'}
          className="flex-1 border-[#C8CCD1] focus-visible:ring-[#C9A867]"
          disabled={loading}
        />
        <Button onClick={() => send()} disabled={loading || !input.trim()} className="bg-[#1B3A4F] hover:bg-[#1B3A4F]/90 text-[#E2C285]">
          <Send className="h-4 w-4" />
        </Button>
      </div>

      <PropertyDetailDialog
        property={viewProperty}
        open={!!viewProperty}
        onOpenChange={(o) => !o && setViewProperty(null)}
        isFavorite={viewProperty ? favIds.has(viewProperty.id) : false}
        onToggleFavorite={toggleFavorite}
        onAskAtlas={(p) => send(`Tell me more about ${p.title} in ${p.city} and how soon I could see it`)}
      />

      {/* Full-Screen Voice Mode Overlay */}
      {voiceMode && (
        <div className="fixed inset-0 z-[100] bg-gradient-to-br from-[#1B3A4F] via-[#264B62] to-[#1B3A4F] flex flex-col items-center justify-center">
          <button
            onClick={() => {
              setVoiceMode(false)
              if (recognitionRef.current && listening) { try { recognitionRef.current.stop() } catch (e) {} }
              if (audioRef.current) { try { audioRef.current.pause() } catch (e) {} }
              setListening(false)
            }}
            className="absolute top-6 right-6 h-10 w-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition"
          >
            <X className="h-5 w-5" />
          </button>

          <div className="text-center mb-12">
            <div className="text-[#E2C285] text-xs uppercase tracking-[0.4em] mb-3">In Conversation With</div>
            <div className="font-serif text-5xl text-[#F5EDE0]">Hobson</div>
            <div className="text-[#F5EDE0]/60 text-sm mt-2">{persona === 'residential' ? 'The Anasa Collection' : 'Next Endeavor CRE'}</div>
          </div>

          {/* Pulsing orb */}
          <div className="relative flex items-center justify-center my-8">
            <div className={`absolute h-64 w-64 rounded-full bg-[#C9A867]/20 ${listening ? 'animate-ping' : ''}`} />
            <div className={`absolute h-48 w-48 rounded-full bg-[#C9A867]/30 ${listening ? 'animate-pulse' : ''}`} />
            <button
              onClick={() => {
                if (listening) {
                  try { recognitionRef.current?.stop() } catch (e) {}
                  setListening(false)
                } else {
                  setInput('')
                  try { recognitionRef.current?.start(); setListening(true) } catch (e) {}
                }
              }}
              className={`relative h-36 w-36 rounded-full bg-gradient-to-br from-[#C9A867] to-[#E2C285] text-[#1B3A4F] flex items-center justify-center shadow-2xl hover:scale-105 transition ${listening ? 'ring-4 ring-[#E2C285]/50' : ''}`}
            >
              {listening ? <Mic className="h-12 w-12" /> : (loading ? <Loader2 className="h-12 w-12 animate-spin" /> : <Mic className="h-12 w-12" />)}
            </button>
          </div>

          <div className="text-center mt-4 max-w-2xl px-6">
            <div className="text-[#E2C285] text-sm font-medium mb-2">
              {listening ? 'Listening…' : loading ? 'Hobson is thinking…' : 'Tap the orb to speak'}
            </div>
            {messages.length > 0 && (
              <div className="bg-white/5 backdrop-blur rounded-lg p-4 max-h-60 overflow-y-auto text-left text-sm space-y-3 mt-4">
                {messages.slice(-4).map((m, i) => (
                  <div key={i} className={m.role === 'user' ? 'text-[#F5EDE0]/80' : 'text-[#E2C285]'}>
                    <span className="text-[10px] uppercase tracking-wider opacity-50 mr-2">{m.role === 'user' ? 'You' : 'Hobson'}</span>
                    {m.content}
                  </div>
                ))}
              </div>
            )}
          </div>

          <button
            onClick={() => {
              setVoiceMode(false)
              if (recognitionRef.current && listening) { try { recognitionRef.current.stop() } catch (e) {} }
              if (audioRef.current) { try { audioRef.current.pause() } catch (e) {} }
              setListening(false)
            }}
            className="mt-10 px-6 py-2 text-sm rounded-full border border-[#C9A867]/40 text-[#F5EDE0] hover:bg-white/10 transition"
          >
            End Conversation
          </button>
        </div>
      )}
    </Card>
  )
}

function AdminDashboard() {
  const [sessions, setSessions] = useState([])
  const [stats, setStats] = useState(null)
  const [selected, setSelected] = useState(null)
  const [adminMsg, setAdminMsg] = useState('')
  const [filterTier, setFilterTier] = useState('all')

  async function load() {
    const [sRes, statsRes] = await Promise.all([
      fetch('/api/sessions').then(r => r.json()),
      fetch('/api/stats').then(r => r.json())
    ])
    setSessions(Array.isArray(sRes) ? sRes : [])
    setStats(statsRes)
  }
  useEffect(() => { load() }, [])

  async function loadSession(id) {
    const r = await fetch(`/api/sessions/${id}`).then(r => r.json())
    setSelected(r)
  }

  async function updateSession(patch) {
    if (!selected) return
    const r = await fetch(`/api/sessions/${selected.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(patch)
    }).then(r => r.json())
    setSelected(r); load()
  }

  const stages = ['discovery', 'qualified', 'showing', 'negotiating', 'closed']
  const filteredSessions = filterTier === 'all' ? sessions : sessions.filter(s => (s.lead_tier || 'cold') === filterTier)

  return (
    <div className="space-y-6">
      {/* Stats grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Card className="p-4 border-[#C9A867]/30 bg-gradient-to-br from-white to-[#F5EDE0]">
          <div className="text-xs text-[#1B3A4F]/60 flex items-center gap-1 uppercase tracking-wider"><Users className="h-3 w-3" />Total Leads</div>
          <div className="text-3xl font-bold mt-1 text-[#1B3A4F]">{stats?.totalLeads || 0}</div>
        </Card>
        <Card className="p-4 border-[#C9A867] bg-gradient-to-br from-[#C9A867]/10 to-[#E2C285]/5">
          <div className="text-xs text-[#1B3A4F]/70 flex items-center gap-1 uppercase tracking-wider"><Flame className="h-3 w-3 text-[#C9A867]" />Hot Leads</div>
          <div className="text-3xl font-bold mt-1 text-[#C9A867]">{stats?.byTier?.hot || 0}</div>
        </Card>
        <Card className="p-4 border-[#C8CCD1] bg-gradient-to-br from-white to-[#C8CCD1]/10">
          <div className="text-xs text-[#1B3A4F]/70 flex items-center gap-1 uppercase tracking-wider"><Thermometer className="h-3 w-3" />Warm</div>
          <div className="text-3xl font-bold mt-1 text-[#1B3A4F]/80">{stats?.byTier?.warm || 0}</div>
        </Card>
        <Card className="p-4 border-[#C8CCD1]/40">
          <div className="text-xs text-[#1B3A4F]/60 flex items-center gap-1 uppercase tracking-wider"><Snowflake className="h-3 w-3" />Cold</div>
          <div className="text-3xl font-bold mt-1 text-[#1B3A4F]/50">{stats?.byTier?.cold || 0}</div>
        </Card>
      </div>

      {/* Stage row */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        {stages.map(stage => (
          <Card key={stage} className="p-3 border-[#C8CCD1]/40">
            <div className="text-xs text-[#1B3A4F]/60 capitalize uppercase tracking-wider">{stage}</div>
            <div className="text-2xl font-bold mt-1 text-[#1B3A4F]">{stats?.byStage?.[stage] || 0}</div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Lead list */}
        <Card className="lg:col-span-1 p-0 overflow-hidden border-[#C8CCD1]/40">
          <div className="px-4 py-3 border-b bg-[#1B3A4F] text-[#E2C285] font-semibold text-sm flex items-center justify-between">
            <span className="flex items-center gap-2"><MessageSquare className="h-4 w-4" />Hctive Conversations</span>
            <Select value={filterTier} onValueChange={setFilterTier}>
              <SelectTrigger className="h-7 w-[110px] text-xs bg-white/10 border-white/20 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Hll</SelectItem>
                <SelectItem value="hot">🔥 Hot</SelectItem>
                <SelectItem value="warm">Warm</SelectItem>
                <SelectItem value="cold">Cold</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="max-h-[640px] overflow-y-auto divide-y divide-[#C8CCD1]/40">
            {filteredSessions.length === 0 && <div className="p-4 text-sm text-[#1B3A4F]/50">No leads in this filter yet.</div>}
            {filteredSessions.map(s => {
              const last = s.messages?.[s.messages.length - 1]
              const brand = s.persona === 'residential' ? 'The Anasa Collection' : 'Next Endeavor CRE'
              return (
                <button key={s.id} onClick={() => loadSession(s.id)} className={`w-full text-left px-4 py-3 hover:bg-[#F5EDE0] transition ${selected?.id === s.id ? 'bg-[#C9A867]/10' : ''}`}>
                  <div className="flex items-center justify-between gap-2">
                    <div className="font-medium text-sm truncate text-[#1B3A4F]">{s.lead?.name || 'Anonymous lead'}</div>
                    <TierBadge tier={s.lead_tier} score={s.lead_score} />
                  </div>
                  <div className="text-xs text-[#1B3A4F]/60 truncate mt-0.5">{last?.content?.slice(0, 70) || 'No messages yet'}</div>
                  <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                    <Badge variant="outline" className="text-[10px] capitalize border-[#C8CCD1] text-[#1B3A4F]/70">{s.stage || 'discovery'}</Badge>
                    <span className="text-[10px] text-[#C9A867] font-semibold tracking-wide">{brand}</span>
                    {s.lead?.email && <span className="text-[10px] text-[#1B3A4F]/50 truncate">{s.lead.email}</span>}
                  </div>
                </button>
              )
            })}
          </div>
        </Card>

        {/* Detail */}
        <Card className="lg:col-span-2 p-0 overflow-hidden border-[#C8CCD1]/40">
          {!selected && <div className="p-10 text-center text-[#1B3A4F]/50">Select a lead to view conversation & details.</div>}
          {selected && (
            <div className="grid grid-cols-1 md:grid-cols-2 max-h-[760px]">
              <div className="border-r border-[#C8CCD1]/40 flex flex-col max-h-[760px]">
                <div className="px-4 py-3 border-b bg-[#1B3A4F] text-[#E2C285] font-semibold text-sm flex items-center justify-between">
                  <span>Conversation</span>
                  <TierBadge tier={selected.lead_tier} score={selected.lead_score} />
                </div>
                <div className="flex-1 overflow-y-auto p-3 space-y-2 bg-[#F5EDE0]">
                  {selected.messages?.map((m, i) => (
                    <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : ''}`}>
                      <div className={`text-xs rounded-lg px-3 py-2 max-w-[85%] ${m.role === 'user' ? 'bg-[#1B3A4F] text-white' : m.fromAdmin ? 'bg-[#C9A867]/20 border border-[#C9A867]/40 text-[#1B3A4F]' : 'bg-white border border-[#C8CCD1]/40 text-[#1B3A4F]'}`}>
                        {m.fromAdmin && <div className="text-[9px] uppercase font-bold opacity-70 mb-0.5 text-[#C9A867]">Broker override</div>}
                        <div className="whitespace-pre-wrap">{m.content}</div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-2 border-t border-[#C8CCD1]/40 bg-white flex gap-2">
                  <Input value={adminMsg} onChange={e => setAdminMsg(e.target.value)} placeholder="Override Hobson — write as broker…" className="text-xs h-8 border-[#C8CCD1]" />
                  <Button size="sm" onClick={() => { if (adminMsg.trim()) { updateSession({ adminMessage: adminMsg }); setAdminMsg('') } }} className="bg-[#1B3A4F] hover:bg-[#1B3A4F]/90 text-[#E2C285]">Send</Button>
                </div>
              </div>

              <div className="p-4 overflow-y-auto max-h-[760px] space-y-4 text-sm">
                <div>
                  <div className="text-xs uppercase tracking-widest text-[#1B3A4F]/50 mb-1">Lead</div>
                  <div className="space-y-1 text-[#1B3A4F]">
                    <div><span className="font-medium">Name:</span> {selected.lead?.name || '—'}</div>
                    <div><span className="font-medium">Email:</span> {selected.lead?.email || '—'}</div>
                    <div><span className="font-medium">Phone:</span> {selected.lead?.phone || '—'}</div>
                    <div><span className="font-medium">Company:</span> {selected.lead?.company || '—'}</div>
                  </div>
                </div>

                <div>
                  <div className="text-xs uppercase tracking-widest text-[#1B3A4F]/50 mb-1">Lead Score</div>
                  <div className="flex items-center gap-2">
                    <TierBadge tier={selected.lead_tier} score={selected.lead_score} />
                    <div className="flex-1 h-2 rounded-full bg-[#C8CCD1]/40 overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-[#C8CCD1] via-[#E2C285] to-[#C9A867]" style={{ width: `${selected.lead_score || 0}%` }} />
                    </div>
                  </div>
                </div>

                <div>
                  <div className="text-xs uppercase tracking-widest text-[#1B3A4F]/50 mb-1">Pipeline Stage</div>
                  <div className="flex flex-wrap gap-1">
                    {stages.map(st => (
                      <button key={st} onClick={() => updateSession({ stage: st })} className={`text-[11px] px-2 py-1 rounded border capitalize transition ${selected.stage === st ? 'bg-[#1B3A4F] text-[#E2C285] border-[#1B3A4F]' : 'border-[#C8CCD1] hover:border-[#C9A867] text-[#1B3A4F]'}`}>
                        {st}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="text-xs uppercase tracking-widest text-[#1B3A4F]/50 mb-1">Brand / Persona</div>
                  <Select value={selected.persona} onValueChange={v => updateSession({ persona: v })}>
                    <SelectTrigger className="h-8 text-xs"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="residential">The Anasa Collection</SelectItem>
                      <SelectItem value="commercial">Next Endeavor CRE</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <div className="text-xs uppercase tracking-widest text-[#1B3A4F]/50 mb-1">Learned Preferences</div>
                  <pre className="text-[11px] bg-[#F5EDE0] border border-[#C8CCD1]/40 p-2 rounded overflow-x-auto whitespace-pre-wrap text-[#1B3A4F]">{JSON.stringify(selected.preferences || {}, null, 2)}</pre>
                </div>

                {selected.favoriteProperties?.length > 0 && (
                  <div>
                    <div className="text-xs uppercase tracking-widest text-[#1B3A4F]/50 mb-1 flex items-center gap-1"><Heart className="h-3 w-3 fill-[#C9A867] text-[#C9A867]" />Shortlist</div>
                    <div className="space-y-2">
                      {selected.favoriteProperties.map(p => (
                        <div key={p.id} className="flex gap-2 border border-[#C9A867]/30 rounded p-2 bg-[#C9A867]/5">
                          <img src={p.image} className="h-12 w-16 object-cover rounded" />
                          <div className="text-xs text-[#1B3A4F]">
                            <div className="font-semibold">{p.title}</div>
                            <div className="text-[#1B3A4F]/60">{p.city}, {p.state} · ${p.price.toLocaleString()}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {selected.recommendedProperties?.length > 0 && (
                  <div>
                    <div className="text-xs uppercase tracking-widest text-[#1B3A4F]/50 mb-1">Hobson Recommendations</div>
                    <div className="space-y-2">
                      {selected.recommendedProperties.map(p => (
                        <div key={p.id} className="flex gap-2 border border-[#C8CCD1]/40 rounded p-2">
                          <img src={p.image} className="h-12 w-16 object-cover rounded" />
                          <div className="text-xs text-[#1B3A4F]">
                            <div className="font-semibold">{p.title}</div>
                            <div className="text-[#1B3A4F]/60">{p.city}, {p.state} · ${p.price.toLocaleString()}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div>
                  <div className="text-xs uppercase tracking-widest text-[#1B3A4F]/50 mb-1">Integrations</div>
                  <div className="flex flex-wrap gap-2 text-[11px]">
                    <Badge variant="outline" className="border-[#C8CCD1] text-[#1B3A4F]/70">IDX/MLS Feed</Badge>
                    <Badge variant="outline" className="border-[#C8CCD1] text-[#1B3A4F]/70">Follow Up Boss</Badge>
                    <Badge variant="outline" className="border-[#C8CCD1] text-[#1B3A4F]/70">Resend (Email)</Badge>
                    <Badge variant="outline" className="border-[#C8CCD1] text-[#1B3A4F]/70">ElevenLabs (Voice)</Badge>
                  </div>
                  <div className="text-[10px] text-[#1B3A4F]/50 mt-1">Wired in backend — provide API keys to activate.</div>
                </div>
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  )
}

function IntegrationsPanel() {
  const [settings, setSettings] = useState(null)
  const [edit, setEdit] = useState({ boldtrail: {}, idx: {}, resend: {}, elevenlabs: {} })
  const [busy, setBusy] = useState(null)
  const [results, setResults] = useState({})

  async function load() {
    const r = await fetch('/api/settings').then(r => r.json())
    setSettings(r)
  }
  useEffect(() => { load() }, [])

  function setField(section, key, val) {
    setEdit(prev => ({ ...prev, [section]: { ...prev[section], [key]: val } }))
  }

  async function save(section) {
    setBusy(`save-${section}`)
    await fetch('/api/settings', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ [section]: edit[section] })
    })
    setEdit(prev => ({ ...prev, [section]: {} }))
    await load()
    setBusy(null)
  }

  async function runTest(endpoint, key) {
    setBusy(key)
    setResults(prev => ({ ...prev, [key]: null }))
    try {
      const r = await fetch(endpoint, { method: 'POST' }).then(r => r.json())
      setResults(prev => ({ ...prev, [key]: r }))
    } catch (e) {
      setResults(prev => ({ ...prev, [key]: { ok: false, error: e.message } }))
    } finally {
      setBusy(null)
    }
  }

  if (!settings) return <div className="p-6 text-[#1B3A4F]/60">Loading integrations…</div>

  const sections = [
    {
      id: 'boldtrail',
      title: 'Bold Trail CRM',
      subtitle: 'Auto-push qualified leads with conversation history',
      status: settings.boldtrail?.enabled && settings.boldtrail?.apiKey ? 'Connected' : 'Not configured',
      fields: [
        { key: 'baseUrl', label: 'API Base URL', placeholder: 'https://api.boldtrail.com/v1', type: 'text' },
        { key: 'apiKey', label: 'API Key / Bearer Token', placeholder: 'bt_live_...', type: 'password' },
        { key: 'accountId', label: 'Account / Site ID (optional)', placeholder: '123456', type: 'text' }
      ],
      toggles: [
        { key: 'enabled', label: 'Enable integration' },
        { key: 'autoPushHot', label: 'Auto-push HOT leads' },
        { key: 'autoPushWarm', label: 'Auto-push WARM leads' }
      ],
      testButton: { label: 'Send test lead to Bold Trail', endpoint: '/api/integrations/boldtrail/test', resultKey: 'boldtrail-test' }
    },
    {
      id: 'idx',
      title: 'IDX / MLS Feed (RESO Web API)',
      subtitle: 'Pull live listings from your MLS into Hobson',
      status: settings.idx?.enabled && settings.idx?.feedUrl ? `Synced ${settings.idx.propertyCount || 0} listings` : 'Not configured',
      fields: [
        { key: 'feedUrl', label: 'RESO Web API base URL', placeholder: 'https://api.mlsgrid.com/v2', type: 'text' },
        { key: 'clientId', label: 'Client ID (or username)', placeholder: 'optional for some feeds', type: 'text' },
        { key: 'clientSecret', label: 'Client Secret / API token', placeholder: 'your secret', type: 'password' }
      ],
      toggles: [
        { key: 'enabled', label: 'Enable IDX' }
      ],
      testButton: { label: 'Test connection', endpoint: '/api/integrations/idx/test', resultKey: 'idx-test' },
      extraButton: { label: 'Sync now (pull 200 listings)', endpoint: '/api/integrations/idx/sync', resultKey: 'idx-sync' }
    },
    {
      id: 'resend',
      title: 'Resend (Email alerts)',
      subtitle: 'Email yourself when Hobson qualifies a HOT lead',
      status: settings.resend?.enabled ? 'Configured' : 'Not configured',
      fields: [
        { key: 'apiKey', label: 'Resend API key', placeholder: 're_...', type: 'password' },
        { key: 'fromEmail', label: 'From address', placeholder: 'atlas@nextendeavorcre.com', type: 'text' },
        { key: 'alertEmail', label: 'Send alerts to', placeholder: 'you@email.com', type: 'text' }
      ],
      toggles: [{ key: 'enabled', label: 'Enable email alerts' }]
    },
    {
      id: 'elevenlabs',
      title: 'ElevenLabs (Hobson speaks)',
      subtitle: 'Premium voice responses from Hobson',
      status: settings.elevenlabs?.enabled ? 'Configured' : 'Not configured',
      fields: [
        { key: 'apiKey', label: 'ElevenLabs API key', placeholder: 'sk_...', type: 'password' },
        { key: 'voiceId', label: 'Voice ID', placeholder: 'EXAVITQu4vr4xnSDxMaL', type: 'text' }
      ],
      toggles: [{ key: 'enabled', label: 'Enable voice output' }]
    }
  ]

  return (
    <div className="space-y-4">
      {sections.map(s => {
        const current = settings[s.id] || {}
        const draft = edit[s.id] || {}
        return (
          <Card key={s.id} className="p-5 border-[#C8CCD1]/40">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="font-serif text-xl text-[#1B3A4F]">{s.title}</h3>
                <p className="text-xs text-[#1B3A4F]/60 mt-0.5">{s.subtitle}</p>
              </div>
              <Badge className={current.enabled ? 'bg-emerald-100 text-emerald-800 border-0' : 'bg-stone-100 text-stone-600 border-0'}>
                {s.status}
              </Badge>
            </div>
            <div className="grid md:grid-cols-2 gap-3">
              {s.fields.map(f => (
                <div key={f.key}>
                  <label className="text-[10px] uppercase tracking-wider text-[#1B3A4F]/60">{f.label}</label>
                  <Input
                    type={f.type}
                    placeholder={current[f.key] || f.placeholder}
                    value={draft[f.key] ?? ''}
                    onChange={e => setField(s.id, f.key, e.target.value)}
                    className="border-[#C8CCD1] text-sm mt-1"
                  />
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-4 mt-4">
              {s.toggles.map(t => (
                <label key={t.key} className="flex items-center gap-2 text-sm text-[#1B3A4F] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={draft[t.key] !== undefined ? draft[t.key] : !!current[t.key]}
                    onChange={e => setField(s.id, t.key, e.target.checked)}
                    className="h-4 w-4 accent-[#C9A867]"
                  />
                  {t.label}
                </label>
              ))}
            </div>
            <div className="flex flex-wrap gap-2 mt-4 pt-3 border-t border-[#C8CCD1]/40">
              <Button size="sm" onClick={() => save(s.id)} disabled={busy === `save-${s.id}`} className="bg-[#1B3A4F] hover:bg-[#1B3A4F]/90 text-[#E2C285]">
                {busy === `save-${s.id}` ? 'Saving…' : 'Save'}
              </Button>
              {s.testButton && (
                <Button size="sm" variant="outline" onClick={() => runTest(s.testButton.endpoint, s.testButton.resultKey)} disabled={busy === s.testButton.resultKey} className="border-[#C9A867] text-[#1B3A4F]">
                  {busy === s.testButton.resultKey ? 'Testing…' : s.testButton.label}
                </Button>
              )}
              {s.extraButton && (
                <Button size="sm" variant="outline" onClick={() => runTest(s.extraButton.endpoint, s.extraButton.resultKey)} disabled={busy === s.extraButton.resultKey} className="border-[#C9A867] text-[#1B3A4F]">
                  {busy === s.extraButton.resultKey ? 'Syncing…' : s.extraButton.label}
                </Button>
              )}
            </div>
            {results[s.testButton?.resultKey] && (
              <pre className={`mt-3 text-[10px] p-2 rounded overflow-x-auto ${results[s.testButton.resultKey].ok ? 'bg-emerald-50 text-emerald-900 border border-emerald-200' : 'bg-red-50 text-red-900 border border-red-200'}`}>
                {JSON.stringify(results[s.testButton.resultKey], null, 2)}
              </pre>
            )}
            {s.extraButton && results[s.extraButton.resultKey] && (
              <pre className={`mt-3 text-[10px] p-2 rounded overflow-x-auto ${results[s.extraButton.resultKey].ok ? 'bg-emerald-50 text-emerald-900 border border-emerald-200' : 'bg-red-50 text-red-900 border border-red-200'}`}>
                {JSON.stringify(results[s.extraButton.resultKey], null, 2)}
              </pre>
            )}
          </Card>
        )
      })}
    </div>
  )
}

function MapView() {
  const [props, setProps] = useState([])
  const [filter, setFilter] = useState('all')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/properties').then(r => r.json()).then(d => { setProps(d || []); setLoading(false) })
  }, [])

  const counts = {
    all: props.length,
    residential: props.filter(p => p.type === 'residential').length,
    commercial: props.filter(p => p.type === 'commercial').length
  }

  return (
    <section className="max-w-7xl mx-auto px-6 py-8">
      <div className="mb-5 flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <div className="h-px w-12 bg-[#C9A867]" />
            <span className="text-[#1B3A4F]/60 text-xs uppercase tracking-[0.3em]">National Inventory</span>
          </div>
          <h1 className="text-3xl font-serif text-[#1B3A4F]">Property Map</h1>
          <p className="text-[#1B3A4F]/60 text-sm mt-1">{counts.all} active listings · Click any pin for full details</p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => setFilter('all')} className={`text-xs px-3 py-1.5 rounded border transition ${filter==='all' ? 'bg-[#1B3A4F] text-[#E2C285] border-[#1B3A4F]' : 'border-[#C8CCD1] text-[#1B3A4F] hover:border-[#C9A867]'}`}>Hll ({counts.all})</button>
          <button onClick={() => setFilter('residential')} className={`text-xs px-3 py-1.5 rounded border transition flex items-center gap-1.5 ${filter==='residential' ? 'bg-[#C9A867] text-[#1B3A4F] border-[#C9A867]' : 'border-[#C8CCD1] text-[#1B3A4F] hover:border-[#C9A867]'}`}>
            <span className="h-2 w-2 rounded-full bg-[#C9A867] inline-block" />The Anasa Collection ({counts.residential})
          </button>
          <button onClick={() => setFilter('commercial')} className={`text-xs px-3 py-1.5 rounded border transition flex items-center gap-1.5 ${filter==='commercial' ? 'bg-[#1B3A4F] text-[#E2C285] border-[#1B3A4F]' : 'border-[#C8CCD1] text-[#1B3A4F] hover:border-[#C9A867]'}`}>
            <span className="h-2 w-2 rounded-full bg-[#1B3A4F] inline-block" />Next Endeavor CRE ({counts.commercial})
          </button>
        </div>
      </div>
      {loading ? (
        <div className="h-[640px] flex items-center justify-center bg-[#F5EDE0] border border-[#C9A867]/30 rounded text-[#1B3A4F]/60">Loading properties…</div>
      ) : (
        <PropertyMap properties={props} filterType={filter} />
      )}
      <div className="mt-3 text-[11px] text-[#1B3A4F]/50 italic">
        Once your Beaches MLS feed is live, this map will plot all active RAPB+GFLR listings in real time.
      </div>
    </section>
  )
}

function App() {
  const [tab, setTab] = useState('concierge')

  return (
    <div className="min-h-screen bg-[#F5EDE0] font-sans">
      {/* Top Nav */}
      <header className="sticky top-0 z-30 backdrop-blur bg-[#1B3A4F]/95 border-b border-[#C9A867]/20 text-white">
        <div className="max-w-7xl mx-auto px-6 py-2 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <img src={LOGOS.residential} alt="The Anasa Collection" className="h-11 w-16 object-contain" />
              <span className="text-sm text-[#E2C285]/40 font-serif italic">×</span>
              <img src={LOGOS.commercial} alt="Next Endeavor CRE" className="h-11 w-11 object-contain" />
            </div>
          </div>
          <Tabs value={tab} onValueChange={setTab}>
            <TabsList className="bg-white/10 border border-[#C9A867]/20">
              <TabsTrigger value="concierge" className="data-[state=active]:bg-[#C9A867] data-[state=active]:text-[#1B3A4F]"><Sparkles className="h-3.5 w-3.5 mr-1.5" />Concierge</TabsTrigger>
              <TabsTrigger value="map" className="data-[state=active]:bg-[#C9A867] data-[state=active]:text-[#1B3A4F]"><MapIcon className="h-3.5 w-3.5 mr-1.5" />Map</TabsTrigger>
              <TabsTrigger value="admin" className="data-[state=active]:bg-[#C9A867] data-[state=active]:text-[#1B3A4F]"><Settings className="h-3.5 w-3.5 mr-1.5" />Dashboard</TabsTrigger>
              <TabsTrigger value="integrations" className="data-[state=active]:bg-[#C9A867] data-[state=active]:text-[#1B3A4F]"><Building2 className="h-3.5 w-3.5 mr-1.5" />Integrations</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </header>

      {tab === 'concierge' && (
        <>
          {/* Hero */}
          <section className="relative">
            <div className="absolute inset-0">
              <img src={HERO_IMG} className="w-full h-full object-cover" alt="" />
              <div className="absolute inset-0 bg-gradient-to-br from-[#1B3A4F]/95 via-[#264B62]/85 to-[#1B3A4F]/60" />
            </div>
            <div className="relative max-w-7xl mx-auto px-6 py-16 lg:py-24 grid lg:grid-cols-5 gap-12 items-start">
              <div className="lg:col-span-2 text-white space-y-7 pt-4">
                <div className="inline-flex items-center gap-3">
                  <div className="h-px w-12 bg-[#C9A867]" />
                  <span className="inline-flex items-center text-[#E2C285] text-[11px] uppercase tracking-[0.32em] font-medium">
                    A Hobson-Powered Concierge
                    <MicroOrb size={24} />
                  </span>
                </div>
                <h1 className="font-serif text-5xl lg:text-6xl leading-[1.05] text-[#F5EDE0]">
                  Smart <span className="italic text-[#E2C285]">Commercial</span> Investments.
                  <br />
                  <span className="italic text-[#E2C285]">Luxury</span> Homes Done Right.
                </h1>
              </div>

              {/* Hobson Voice Orb is now inline next to "A HOBSON-POWERED CONCIERGE" */}
              <div className="lg:col-span-3 space-y-2">
                <p className="text-[#F5EDE0]/85 text-[13px] font-light leading-snug pl-1">
                  Type what you're looking for, say it out loud, or just talk to <span className="text-[#E2C285] font-medium">Hobson</span>. He remembers what matters to you and finds listings that fit.
                </p>
                <HeroSearch />
                <ChatPanel />
              </div>
            </div>
          </section>

          {/* Two-Brand cards */}
          <section className="max-w-7xl mx-auto px-6 py-16">
            <div className="text-center mb-10">
              <div className="flex items-center gap-3 justify-center mb-3">
                <div className="h-px w-12 bg-[#C9A867]" />
                <span className="text-[#1B3A4F]/60 text-xs uppercase tracking-[0.3em]">One Hobson · Two Brands</span>
                <div className="h-px w-12 bg-[#C9A867]" />
              </div>
              <h2 className="text-3xl font-serif text-[#1B3A4F]">Tailored intelligence for every client.</h2>
              <p className="text-[#1B3A4F]/60 mt-2 font-light">Toggle the brand persona at any time — Hobson adapts his voice, criteria, and curation instantly.</p>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="p-6 border-[#C9A867]/40 bg-gradient-to-br from-white via-white to-[#C9A867]/5 hover:border-[#C9A867] transition-all hover:shadow-xl">
                <div className="flex items-start justify-between mb-3">
                  <img src={LOGOS.residential} alt="The Anasa Collection" className="h-28 w-28 object-contain" />
                  <Badge className="bg-[#1B3A4F] text-[#E2C285] hover:bg-[#1B3A4F] border-0">Residential Luxury</Badge>
                </div>
                <h3 className="text-2xl font-serif text-[#1B3A4F] mt-2">The Anasa Collection</h3>
                <p className="text-sm text-[#1B3A4F]/70 mt-2 leading-relaxed">Hobson speaks the language of lifestyle. He pays attention to how you actually want to live: schools, views, privacy, the feel of a place. Then he finds the homes that fit.</p>
                <ul className="text-sm mt-4 space-y-1.5 text-[#1B3A4F]/80">
                  <li className="flex gap-2"><span className="text-[#C9A867]">◆</span>Listens for what you really want</li>
                  <li className="flex gap-2"><span className="text-[#C9A867]">◆</span>Tracks budget, beds, baths, and must-haves</li>
                  <li className="flex gap-2"><span className="text-[#C9A867]">◆</span>Pulls a short list of homes worth your time</li>
                </ul>
              </Card>
              <Card className="p-6 border-[#C9A867]/40 bg-gradient-to-br from-white via-white to-[#1B3A4F]/5 hover:border-[#C9A867] transition-all hover:shadow-xl">
                <div className="flex items-start justify-between mb-3">
                  <img src={LOGOS.commercial} alt="Next Endeavor CRE" className="h-28 w-28 object-contain" />
                  <Badge className="bg-[#1B3A4F] text-[#E2C285] hover:bg-[#1B3A4F] border-0">Commercial Real Estate</Badge>
                </div>
                <h3 className="text-2xl font-serif text-[#1B3A4F] mt-2">Next Endeavor CRE</h3>
                <p className="text-sm text-[#1B3A4F]/70 mt-2 leading-relaxed">On the commercial side, Hobson gets down to business. He learns who you are, the size of deal you're after, and the returns you need, then connects you straight to Paul.</p>
                <ul className="text-sm mt-4 space-y-1.5 text-[#1B3A4F]/80">
                  <li className="flex gap-2"><span className="text-[#C9A867]">◆</span>Learns your criteria and firm details</li>
                  <li className="flex gap-2"><span className="text-[#C9A867]">◆</span>Tracks cap rate, NOI, square footage, zoning</li>
                  <li className="flex gap-2"><span className="text-[#C9A867]">◆</span>Connects you directly to Paul</li>
                </ul>
                <a
                  href="tel:+15612557285"
                  className="mt-5 inline-flex items-center gap-2 px-4 py-2.5 rounded-md bg-[#1B3A4F] hover:bg-[#264B62] text-[#E2C285] text-sm font-medium tracking-wide transition shadow-md"
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.37 1.9.72 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.35 1.85.59 2.81.72A2 2 0 0 1 22 16.92z"/></svg>
                  Call Paul directly: 561-255-7285
                </a>
              </Card>
            </div>
          </section>
        </>
      )}

      {tab === 'map' && <MapView />}

      {tab === 'admin' && (
        <section className="max-w-7xl mx-auto px-6 py-8">
          <div className="mb-6 flex items-start justify-between">
            <div>
              <h1 className="text-3xl font-serif text-[#1B3A4F]">Broker Dashboard</h1>
              <p className="text-[#1B3A4F]/60 text-sm mt-1">Monitor Hobson in real time · Override · Pipeline management</p>
            </div>
            <div className="text-xs text-[#1B3A4F]/50">Auto-refreshes every 5s</div>
          </div>
          <AdminDashboard />
        </section>
      )}

      {tab === 'integrations' && (
        <section className="max-w-5xl mx-auto px-6 py-8">
          <div className="mb-6">
            <h1 className="text-3xl font-serif text-[#1B3A4F]">Integrations</h1>
            <p className="text-[#1B3A4F]/60 text-sm mt-1">Connect Bold Trail, your MLS IDX feed, Resend, and ElevenLabs. Hobson activates each one the moment a valid key is saved.</p>
          </div>
          <IntegrationsPanel />
        </section>
      )}

      <footer className="border-t border-[#C9A867]/20 bg-[#1B3A4F] text-[#C8CCD1] mt-12">
        <div className="max-w-7xl mx-auto px-6 py-6 text-xs flex justify-between items-center">
          <div className="flex items-center gap-3">
            <img src={LOGOS.residential} alt="" className="h-14 w-20 object-contain" />
            <span className="opacity-40 font-serif italic">×</span>
            <img src={LOGOS.commercial} alt="" className="h-14 w-14 object-contain" />
          </div>
          <div className="opacity-60">Powered by Hobson · Real Estate, Handled</div>
        </div>
      </footer>
    </div>
  )
}

export default App
