'use client'

import { useState, useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { Sparkles, Send, MapPin, BedDouble, Bath, Maximize, TrendingUp, Users, MessageSquare, Settings, Mic, MicOff, Heart, Flame, Snowflake, Thermometer, Building2, Crown, Calendar, Eye, X } from 'lucide-react'

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
    <div className="flex items-center gap-3">
      <img src={logo} alt={brandName} className="h-14 w-14 object-contain" />
      <div>
        <div className="text-[10px] uppercase tracking-[0.2em] text-[#C8CCD1]/60">Powered by Atlas AI</div>
        <div className="font-serif text-[#E2C285] text-lg leading-tight">{brandName}</div>
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
                <div className="text-[10px] uppercase tracking-wider text-[#1B3A4F]/60">Annual NOI</div>
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
          {onAskAtlas && (
            <Button onClick={() => { onAskAtlas(p); onOpenChange(false) }} className="bg-[#1B3A4F] hover:bg-[#1B3A4F]/90 text-[#E2C285]">
              <Calendar className="h-4 w-4 mr-2" />Ask Atlas to schedule a showing
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
  const recognitionRef = useRef(null)
  const scrollRef = useRef(null)

  useEffect(() => {
    const existing = typeof window !== 'undefined' ? localStorage.getItem('atlas_session') : null
    if (existing) setSessionId(existing)
  }, [])

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight
  }, [messages, loading, recommended])

  // Voice setup
  useEffect(() => {
    if (typeof window === 'undefined') return
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition
    if (!SR) return
    const r = new SR()
    r.continuous = false
    r.interimResults = true
    r.lang = 'en-US'
    let finalText = ''
    r.onresult = (e) => {
      let interim = ''
      finalText = ''
      for (let i = 0; i < e.results.length; i++) {
        const t = e.results[i][0].transcript
        if (e.results[i].isFinal) finalText += t
        else interim += t
      }
      setInput((finalText || interim).trim())
    }
    r.onend = () => setListening(false)
    r.onerror = () => setListening(false)
    recognitionRef.current = r
  }, [])

  function toggleMic() {
    const r = recognitionRef.current
    if (!r) { alert('Voice not supported in this browser. Try Chrome.'); return }
    if (listening) { r.stop(); setListening(false) }
    else { setInput(''); r.start(); setListening(true) }
  }

  const greeting = persona === 'residential'
    ? "Welcome to Anasa Collection. I'm Atlas — your personal concierge. Tell me what you're dreaming of — the city, the lifestyle, the must-haves — and I'll curate exceptional homes for you."
    : "Welcome to Next Endeavor CRE. I'm Atlas — your acquisition advisor. Share your mandate — asset class, geography, check size, target yield — and I'll surface investment-grade opportunities."

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
        body: JSON.stringify({ sessionId, message: msg, persona })
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

      {/* Messages */}
      <div ref={scrollRef} className="h-[440px] overflow-y-auto px-4 py-4 bg-gradient-to-b from-[#F5EDE0] to-white space-y-3">
        {messages.length === 0 && (
          <>
            <div className="flex gap-2">
              <div className="h-7 w-7 rounded-full bg-gradient-to-br from-[#C9A867] to-[#E2C285] text-[#1B3A4F] flex items-center justify-center text-xs font-bold flex-shrink-0">A</div>
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
        {messages.map((m, i) => (
          <div key={i} className={`flex gap-2 ${m.role === 'user' ? 'justify-end' : ''}`}>
            {m.role === 'assistant' && <div className="h-7 w-7 rounded-full bg-gradient-to-br from-[#C9A867] to-[#E2C285] text-[#1B3A4F] flex items-center justify-center text-xs font-bold flex-shrink-0">A</div>}
            <div className={`rounded-2xl px-4 py-2.5 max-w-[85%] text-sm leading-relaxed whitespace-pre-wrap ${m.role === 'user' ? 'bg-[#1B3A4F] text-white rounded-tr-sm' : 'bg-white border border-[#C8CCD1]/40 rounded-tl-sm text-[#1B3A4F]'}`}>
              {m.content}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex gap-2">
            <div className="h-7 w-7 rounded-full bg-gradient-to-br from-[#C9A867] to-[#E2C285] text-[#1B3A4F] flex items-center justify-center text-xs font-bold flex-shrink-0">A</div>
            <div className="bg-white border border-[#C8CCD1]/40 rounded-2xl rounded-tl-sm px-4 py-2.5 text-sm">
              <span className="inline-flex gap-1">
                <span className="h-2 w-2 rounded-full bg-[#C9A867] animate-bounce" />
                <span className="h-2 w-2 rounded-full bg-[#C9A867] animate-bounce" style={{ animationDelay: '120ms' }} />
                <span className="h-2 w-2 rounded-full bg-[#C9A867] animate-bounce" style={{ animationDelay: '240ms' }} />
              </span>
            </div>
          </div>
        )}

        {recommended.length > 0 && (
          <div className="pt-3">
            <div className="text-xs font-semibold text-[#1B3A4F] pl-9 pb-2 flex items-center gap-1.5 tracking-wide uppercase"><Sparkles className="h-3.5 w-3.5 text-[#C9A867]" />Curated for you</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pl-9">
              {recommended.map(p => <PropertyCard key={p.id} p={p} isFavorite={favIds.has(p.id)} onToggleFavorite={toggleFavorite} onView={setViewProperty} persona={persona} />)}
            </div>
          </div>
        )}

        {favorites.length > 0 && (
          <div className="pt-4">
            <div className="text-xs font-semibold text-[#1B3A4F] pl-9 pb-2 flex items-center gap-1.5 tracking-wide uppercase"><Heart className="h-3.5 w-3.5 fill-[#C9A867] text-[#C9A867]" />My Shortlist ({favorites.length})</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pl-9">
              {favorites.map(p => <PropertyCard key={'f'+p.id} p={p} isFavorite={true} onToggleFavorite={toggleFavorite} onView={setViewProperty} persona={persona} />)}
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
          placeholder={listening ? 'Listening…' : 'Tell Atlas what you\'re looking for…'}
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
    setSessions(sRes || [])
    setStats(statsRes)
  }
  useEffect(() => { load() }, [])
  useEffect(() => {
    const t = setInterval(load, 5000)
    return () => clearInterval(t)
  }, [])

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
            <span className="flex items-center gap-2"><MessageSquare className="h-4 w-4" />Active Conversations</span>
            <Select value={filterTier} onValueChange={setFilterTier}>
              <SelectTrigger className="h-7 w-[110px] text-xs bg-white/10 border-white/20 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
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
                  <Input value={adminMsg} onChange={e => setAdminMsg(e.target.value)} placeholder="Override Atlas — write as broker…" className="text-xs h-8 border-[#C8CCD1]" />
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
                    <div className="text-xs uppercase tracking-widest text-[#1B3A4F]/50 mb-1">Atlas Recommendations</div>
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

function App() {
  const [tab, setTab] = useState('concierge')

  return (
    <div className="min-h-screen bg-[#F5EDE0] font-sans">
      {/* Top Nav */}
      <header className="sticky top-0 z-30 backdrop-blur bg-[#1B3A4F]/95 border-b border-[#C9A867]/20 text-white">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <img src={LOGOS.residential} alt="Anasa" className="h-12 w-12 object-contain" />
              <span className="text-base text-[#E2C285]/40 font-serif italic">×</span>
              <img src={LOGOS.commercial} alt="Next Endeavor" className="h-12 w-12 object-contain" />
            </div>
            <div className="hidden md:block border-l border-white/20 pl-4">
              <div className="text-[10px] uppercase tracking-[0.25em] text-[#C8CCD1]/70">Concierge Platform</div>
              <div className="text-sm font-serif text-[#E2C285]">Powered by Atlas AI</div>
            </div>
          </div>
          <Tabs value={tab} onValueChange={setTab}>
            <TabsList className="bg-white/10 border border-[#C9A867]/20">
              <TabsTrigger value="concierge" className="data-[state=active]:bg-[#C9A867] data-[state=active]:text-[#1B3A4F]"><Sparkles className="h-3.5 w-3.5 mr-1.5" />Concierge</TabsTrigger>
              <TabsTrigger value="admin" className="data-[state=active]:bg-[#C9A867] data-[state=active]:text-[#1B3A4F]"><Settings className="h-3.5 w-3.5 mr-1.5" />Broker Dashboard</TabsTrigger>
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
                <div className="flex items-center gap-3">
                  <div className="h-px w-12 bg-[#C9A867]" />
                  <span className="text-[#E2C285] text-[11px] uppercase tracking-[0.32em] font-medium">An Atlas-Powered Concierge</span>
                </div>
                <h1 className="font-serif text-5xl lg:text-6xl leading-[1.05] text-[#F5EDE0]">
                  Precision in <span className="italic text-[#E2C285]">Commercial</span> Investment.
                  <br />
                  Elegance in <span className="italic text-[#E2C285]">Luxury</span> Living.
                </h1>
                <p className="text-[#F5EDE0]/80 text-lg leading-relaxed font-light max-w-lg">
                  <span className="text-[#E2C285] font-medium">Atlas</span> is your always-on AI concierge — qualifying leads, learning their tastes, and curating properties autonomously. Two brands. One intelligent agent. You step in only to close.
                </p>
                <div className="flex flex-wrap gap-2 pt-2">
                  <Badge variant="outline" className="text-[#F5EDE0]/85 border-[#C9A867]/40 bg-white/5 font-normal">Claude Sonnet 4</Badge>
                  <Badge variant="outline" className="text-[#F5EDE0]/85 border-[#C9A867]/40 bg-white/5 font-normal">Memory &amp; preference learning</Badge>
                  <Badge variant="outline" className="text-[#F5EDE0]/85 border-[#C9A867]/40 bg-white/5 font-normal">Voice enabled</Badge>
                  <Badge variant="outline" className="text-[#F5EDE0]/85 border-[#C9A867]/40 bg-white/5 font-normal">IDX/MLS ready</Badge>
                </div>
                <div className="grid grid-cols-3 gap-6 pt-6 border-t border-[#C9A867]/25">
                  <div>
                    <div className="text-3xl font-serif text-[#E2C285]">24/7</div>
                    <div className="text-[10px] text-[#F5EDE0]/60 uppercase tracking-[0.2em] mt-1">Lead capture</div>
                  </div>
                  <div>
                    <div className="text-3xl font-serif text-[#E2C285]">∞</div>
                    <div className="text-[10px] text-[#F5EDE0]/60 uppercase tracking-[0.2em] mt-1">Memory per lead</div>
                  </div>
                  <div>
                    <div className="text-3xl font-serif text-[#E2C285]">Auto</div>
                    <div className="text-[10px] text-[#F5EDE0]/60 uppercase tracking-[0.2em] mt-1">Lead scoring</div>
                  </div>
                </div>
              </div>
              <div className="lg:col-span-3">
                <ChatPanel />
              </div>
            </div>
          </section>

          {/* Two-Brand cards */}
          <section className="max-w-7xl mx-auto px-6 py-16">
            <div className="text-center mb-10">
              <div className="flex items-center gap-3 justify-center mb-3">
                <div className="h-px w-12 bg-[#C9A867]" />
                <span className="text-[#1B3A4F]/60 text-xs uppercase tracking-[0.3em]">One Atlas · Two Brands</span>
                <div className="h-px w-12 bg-[#C9A867]" />
              </div>
              <h2 className="text-3xl font-serif text-[#1B3A4F]">Tailored intelligence for every client.</h2>
              <p className="text-[#1B3A4F]/60 mt-2 font-light">Toggle the brand persona at any time — Atlas adapts its voice, criteria, and curation instantly.</p>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="p-6 border-[#C9A867]/40 bg-gradient-to-br from-white via-white to-[#C9A867]/5 hover:border-[#C9A867] transition-all hover:shadow-xl">
                <div className="flex items-start justify-between mb-3">
                  <img src={LOGOS.residential} alt="The Anasa Collection" className="h-28 w-28 object-contain" />
                  <Badge className="bg-[#1B3A4F] text-[#E2C285] hover:bg-[#1B3A4F] border-0">Residential Luxury</Badge>
                </div>
                <h3 className="text-2xl font-serif text-[#1B3A4F] mt-2">The Anasa Collection</h3>
                <p className="text-sm text-[#1B3A4F]/70 mt-2 leading-relaxed">Atlas speaks the language of lifestyle. Warm, evocative, attuned to the way you want to live — schools, views, privacy, prestige. Curates trophy listings that fit.</p>
                <ul className="text-sm mt-4 space-y-1.5 text-[#1B3A4F]/80">
                  <li className="flex gap-2"><span className="text-[#C9A867]">◆</span>Captures buyer aspirations &amp; lifestyle</li>
                  <li className="flex gap-2"><span className="text-[#C9A867]">◆</span>Tracks budget, beds/baths, amenities</li>
                  <li className="flex gap-2"><span className="text-[#C9A867]">◆</span>Curates evocative property shortlists</li>
                </ul>
              </Card>
              <Card className="p-6 border-[#C9A867]/40 bg-gradient-to-br from-white via-white to-[#1B3A4F]/5 hover:border-[#C9A867] transition-all hover:shadow-xl">
                <div className="flex items-start justify-between mb-3">
                  <img src={LOGOS.commercial} alt="Next Endeavor CRE" className="h-28 w-28 object-contain" />
                  <Badge className="bg-[#1B3A4F] text-[#E2C285] hover:bg-[#1B3A4F] border-0">Commercial Real Estate</Badge>
                </div>
                <h3 className="text-2xl font-serif text-[#1B3A4F] mt-2">Next Endeavor CRE</h3>
                <p className="text-sm text-[#1B3A4F]/70 mt-2 leading-relaxed">Atlas pivots to analyst mode. Sharp, financial, deal-focused. Qualifies the principal, deal size, and target cap rate — surfaces investment-grade assets.</p>
                <ul className="text-sm mt-4 space-y-1.5 text-[#1B3A4F]/80">
                  <li className="flex gap-2"><span className="text-[#C9A867]">◆</span>Captures mandate &amp; firm details</li>
                  <li className="flex gap-2"><span className="text-[#C9A867]">◆</span>Tracks cap rate, NOI, sq ft, zoning</li>
                  <li className="flex gap-2"><span className="text-[#C9A867]">◆</span>Surfaces MOBs, ASCs, Class A office</li>
                </ul>
              </Card>
            </div>
          </section>
        </>
      )}

      {tab === 'admin' && (
        <section className="max-w-7xl mx-auto px-6 py-8">
          <div className="mb-6 flex items-start justify-between">
            <div>
              <h1 className="text-3xl font-serif text-[#1B3A4F]">Broker Dashboard</h1>
              <p className="text-[#1B3A4F]/60 text-sm mt-1">Monitor Atlas in real time · Override · Pipeline management</p>
            </div>
            <div className="text-xs text-[#1B3A4F]/50">Auto-refreshes every 5s</div>
          </div>
          <AdminDashboard />
        </section>
      )}

      <footer className="border-t border-[#C9A867]/20 bg-[#1B3A4F] text-[#C8CCD1] mt-12">
        <div className="max-w-7xl mx-auto px-6 py-6 text-xs flex justify-between items-center">
          <div className="flex items-center gap-3">
            <img src={LOGOS.residential} alt="" className="h-9 w-9 object-contain" />
            <span className="opacity-40 font-serif italic">×</span>
            <img src={LOGOS.commercial} alt="" className="h-9 w-9 object-contain" />
          </div>
          <div className="opacity-60">Powered by Atlas AI · Claude Sonnet 4</div>
        </div>
      </footer>
    </div>
  )
}

export default App
