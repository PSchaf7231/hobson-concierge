'use client'

import { useState, useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Sparkles, Send, Building2, Home, MapPin, BedDouble, Bath, Maximize, TrendingUp, Users, MessageSquare, Settings, ArrowRight, Crown, Stethoscope } from 'lucide-react'

const HERO_IMG = 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?crop=entropy&cs=srgb&fm=jpg&q=85&w=2000'

function PersonaPill({ persona }) {
  const isRes = persona === 'residential'
  return (
    <span className={`inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full border ${isRes ? 'border-amber-300 bg-amber-50 text-amber-900' : 'border-sky-300 bg-sky-50 text-sky-900'}`}>
      {isRes ? <Crown className="h-3 w-3" /> : <Stethoscope className="h-3 w-3" />}
      {isRes ? 'Residential Luxury' : 'Commercial / Medical'}
    </span>
  )
}

function PropertyCard({ p }) {
  return (
    <Card className="overflow-hidden border border-border/60 hover:shadow-lg transition-shadow">
      <div className="h-40 bg-muted relative">
        <img src={p.image} alt={p.title} className="w-full h-full object-cover" />
        <Badge className="absolute top-2 left-2 bg-black/70 hover:bg-black/70 text-white border-0">{p.type}</Badge>
      </div>
      <div className="p-3 space-y-1.5">
        <div className="font-semibold text-sm leading-tight">{p.title}</div>
        <div className="text-xs text-muted-foreground flex items-center gap-1"><MapPin className="h-3 w-3" />{p.city}, {p.state}</div>
        <div className="text-base font-bold">${p.price.toLocaleString()}</div>
        <div className="flex flex-wrap gap-3 text-xs text-muted-foreground pt-1">
          {p.beds > 0 && <span className="flex items-center gap-1"><BedDouble className="h-3 w-3" />{p.beds}</span>}
          {p.baths > 0 && <span className="flex items-center gap-1"><Bath className="h-3 w-3" />{p.baths}</span>}
          <span className="flex items-center gap-1"><Maximize className="h-3 w-3" />{p.sqft.toLocaleString()} sqft</span>
          {p.capRate && <span className="flex items-center gap-1 font-medium text-emerald-700"><TrendingUp className="h-3 w-3" />{p.capRate}% cap</span>}
        </div>
        <div className="flex flex-wrap gap-1 pt-1">
          {(p.amenities || []).slice(0, 3).map(a => (
            <span key={a} className="text-[10px] px-1.5 py-0.5 rounded bg-muted text-muted-foreground">{a}</span>
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
  const [lead, setLead] = useState({})
  const [preferences, setPreferences] = useState({})
  const scrollRef = useRef(null)

  useEffect(() => {
    const existing = typeof window !== 'undefined' ? localStorage.getItem('atlas_session') : null
    if (existing) setSessionId(existing)
  }, [])

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages, loading])

  const greeting = persona === 'residential'
    ? "Hi, I'm Atlas. I help you discover homes that match your life. Tell me what you're dreaming of — city, vibe, must-haves — and I'll curate options for you."
    : "I'm Atlas. I source and qualify commercial and medical real estate opportunities. Share your acquisition mandate — asset class, geography, check size, target yield — and I'll surface matching deals."

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
      setLead(data.lead || {})
      setPreferences(data.preferences || {})
    } catch (e) {
      setMessages([...newMsgs, { role: 'assistant', content: 'Sorry, I hit a snag. Try again?' }])
    } finally {
      setLoading(false)
    }
  }

  function resetChat() {
    localStorage.removeItem('atlas_session')
    setSessionId(null)
    setMessages([])
    setRecommended([])
    setLead({})
    setPreferences({})
  }

  const suggestions = persona === 'residential'
    ? ['I want a beachfront villa in Malibu around $9M', 'Looking for a Manhattan penthouse with skyline views', 'Show me Napa estates with a vineyard']
    : ['I need a stabilized MOB near a hospital, $10–15M, 7%+ cap', 'Class A office in SF, $25M+', 'Looking for ASCs with NNN leases']

  return (
    <Card className="border border-border/60 shadow-2xl overflow-hidden bg-card">
      <div className="flex items-center justify-between px-4 py-3 border-b bg-gradient-to-r from-stone-900 to-zinc-900 text-white">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-amber-400 text-stone-900 flex items-center justify-center font-bold">A</div>
          <div>
            <div className="text-sm font-semibold leading-tight">Atlas</div>
            <div className="text-[11px] opacity-80">AI Concierge · Online</div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Select value={persona} onValueChange={(v) => { setPersona(v); resetChat() }}>
            <SelectTrigger className="h-8 w-[200px] bg-white/10 border-white/20 text-white text-xs">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="residential"><span className="flex items-center gap-2"><Crown className="h-3.5 w-3.5" />Residential Luxury</span></SelectItem>
              <SelectItem value="commercial"><span className="flex items-center gap-2"><Stethoscope className="h-3.5 w-3.5" />Commercial / Medical</span></SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div ref={scrollRef} className="h-[420px] overflow-y-auto px-4 py-4 bg-gradient-to-b from-stone-50 to-white space-y-3">
        {messages.length === 0 && (
          <>
            <div className="flex gap-2">
              <div className="h-7 w-7 rounded-full bg-amber-400 text-stone-900 flex items-center justify-center text-xs font-bold flex-shrink-0">A</div>
              <div className="bg-white border rounded-2xl rounded-tl-sm px-4 py-2.5 max-w-[85%] text-sm leading-relaxed">{greeting}</div>
            </div>
            <div className="flex flex-wrap gap-2 pl-9 pt-2">
              {suggestions.map(s => (
                <button key={s} onClick={() => send(s)} className="text-xs border border-stone-300 hover:border-amber-500 hover:text-amber-700 rounded-full px-3 py-1 bg-white transition">
                  {s}
                </button>
              ))}
            </div>
          </>
        )}
        {messages.map((m, i) => (
          <div key={i} className={`flex gap-2 ${m.role === 'user' ? 'justify-end' : ''}`}>
            {m.role === 'assistant' && <div className="h-7 w-7 rounded-full bg-amber-400 text-stone-900 flex items-center justify-center text-xs font-bold flex-shrink-0">A</div>}
            <div className={`rounded-2xl px-4 py-2.5 max-w-[85%] text-sm leading-relaxed whitespace-pre-wrap ${m.role === 'user' ? 'bg-stone-900 text-white rounded-tr-sm' : 'bg-white border rounded-tl-sm'}`}>
              {m.content}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex gap-2">
            <div className="h-7 w-7 rounded-full bg-amber-400 text-stone-900 flex items-center justify-center text-xs font-bold flex-shrink-0">A</div>
            <div className="bg-white border rounded-2xl rounded-tl-sm px-4 py-2.5 text-sm">
              <span className="inline-flex gap-1">
                <span className="h-2 w-2 rounded-full bg-stone-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="h-2 w-2 rounded-full bg-stone-400 animate-bounce" style={{ animationDelay: '120ms' }} />
                <span className="h-2 w-2 rounded-full bg-stone-400 animate-bounce" style={{ animationDelay: '240ms' }} />
              </span>
            </div>
          </div>
        )}

        {recommended.length > 0 && (
          <div className="pt-3">
            <div className="text-xs font-semibold text-stone-600 pl-9 pb-2 flex items-center gap-1.5"><Sparkles className="h-3.5 w-3.5 text-amber-500" />Curated for you</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pl-9">
              {recommended.map(p => <PropertyCard key={p.id} p={p} />)}
            </div>
          </div>
        )}
      </div>

      <div className="border-t bg-white p-3 flex gap-2">
        <Input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send() } }}
          placeholder="Tell Atlas what you're looking for…"
          className="flex-1"
          disabled={loading}
        />
        <Button onClick={() => send()} disabled={loading || !input.trim()} className="bg-stone-900 hover:bg-stone-800">
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </Card>
  )
}

function AdminDashboard() {
  const [sessions, setSessions] = useState([])
  const [stats, setStats] = useState(null)
  const [selected, setSelected] = useState(null)
  const [override, setOverride] = useState('')
  const [adminMsg, setAdminMsg] = useState('')

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
    setSelected(r)
    load()
  }

  const stages = ['discovery', 'qualified', 'showing', 'negotiating', 'closed']

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        <Card className="p-4">
          <div className="text-xs text-muted-foreground flex items-center gap-1"><Users className="h-3 w-3" /> Total Leads</div>
          <div className="text-2xl font-bold mt-1">{stats?.totalLeads || 0}</div>
        </Card>
        {stages.map(stage => (
          <Card key={stage} className="p-4">
            <div className="text-xs text-muted-foreground capitalize">{stage}</div>
            <div className="text-2xl font-bold mt-1">{stats?.byStage?.[stage] || 0}</div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Lead list */}
        <Card className="lg:col-span-1 p-0 overflow-hidden">
          <div className="px-4 py-3 border-b bg-muted/50 font-semibold text-sm flex items-center gap-2"><MessageSquare className="h-4 w-4" />Active Conversations</div>
          <div className="max-h-[600px] overflow-y-auto divide-y">
            {sessions.length === 0 && <div className="p-4 text-sm text-muted-foreground">No leads yet. Start a chat to see them here.</div>}
            {sessions.map(s => {
              const last = s.messages?.[s.messages.length - 1]
              return (
                <button key={s.id} onClick={() => loadSession(s.id)} className={`w-full text-left px-4 py-3 hover:bg-stone-50 transition ${selected?.id === s.id ? 'bg-amber-50' : ''}`}>
                  <div className="flex items-center justify-between gap-2">
                    <div className="font-medium text-sm truncate">{s.lead?.name || 'Anonymous lead'}</div>
                    <Badge variant="outline" className="text-[10px] capitalize">{s.stage || 'discovery'}</Badge>
                  </div>
                  <div className="text-xs text-muted-foreground truncate mt-0.5">{last?.content?.slice(0, 70) || 'No messages yet'}</div>
                  <div className="flex items-center gap-2 mt-1.5">
                    <PersonaPill persona={s.persona} />
                    {s.lead?.email && <span className="text-[10px] text-muted-foreground truncate">{s.lead.email}</span>}
                  </div>
                </button>
              )
            })}
          </div>
        </Card>

        {/* Detail */}
        <Card className="lg:col-span-2 p-0 overflow-hidden">
          {!selected && <div className="p-10 text-center text-muted-foreground">Select a lead to view conversation & details.</div>}
          {selected && (
            <div className="grid grid-cols-1 md:grid-cols-2 max-h-[700px]">
              {/* Conversation */}
              <div className="border-r flex flex-col max-h-[700px]">
                <div className="px-4 py-3 border-b bg-muted/50 font-semibold text-sm">Conversation</div>
                <div className="flex-1 overflow-y-auto p-3 space-y-2 bg-stone-50">
                  {selected.messages?.map((m, i) => (
                    <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : ''}`}>
                      <div className={`text-xs rounded-lg px-3 py-2 max-w-[85%] ${m.role === 'user' ? 'bg-stone-900 text-white' : m.fromAdmin ? 'bg-emerald-100 border border-emerald-300' : 'bg-white border'}`}>
                        {m.fromAdmin && <div className="text-[9px] uppercase font-bold opacity-60 mb-0.5">Broker override</div>}
                        <div className="whitespace-pre-wrap">{m.content}</div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-2 border-t bg-white flex gap-2">
                  <Input value={adminMsg} onChange={e => setAdminMsg(e.target.value)} placeholder="Override Atlas — write as broker…" className="text-xs h-8" />
                  <Button size="sm" onClick={() => { if (adminMsg.trim()) { updateSession({ adminMessage: adminMsg }); setAdminMsg('') } }}>Send</Button>
                </div>
              </div>

              {/* Details / controls */}
              <div className="p-4 overflow-y-auto max-h-[700px] space-y-4 text-sm">
                <div>
                  <div className="text-xs uppercase tracking-wide text-muted-foreground mb-1">Lead</div>
                  <div className="space-y-1">
                    <div><span className="font-medium">Name:</span> {selected.lead?.name || '—'}</div>
                    <div><span className="font-medium">Email:</span> {selected.lead?.email || '—'}</div>
                    <div><span className="font-medium">Phone:</span> {selected.lead?.phone || '—'}</div>
                    <div><span className="font-medium">Company:</span> {selected.lead?.company || '—'}</div>
                  </div>
                </div>

                <div>
                  <div className="text-xs uppercase tracking-wide text-muted-foreground mb-1">Pipeline</div>
                  <div className="flex flex-wrap gap-1">
                    {stages.map(st => (
                      <button key={st} onClick={() => updateSession({ stage: st })} className={`text-[11px] px-2 py-1 rounded border capitalize ${selected.stage === st ? 'bg-stone-900 text-white border-stone-900' : 'border-stone-300 hover:border-stone-500'}`}>
                        {st}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="text-xs uppercase tracking-wide text-muted-foreground mb-1">Persona</div>
                  <Select value={selected.persona} onValueChange={v => updateSession({ persona: v })}>
                    <SelectTrigger className="h-8 text-xs"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="residential">Residential Luxury</SelectItem>
                      <SelectItem value="commercial">Commercial / Medical</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <div className="text-xs uppercase tracking-wide text-muted-foreground mb-1">Learned Preferences</div>
                  <pre className="text-[11px] bg-muted p-2 rounded overflow-x-auto whitespace-pre-wrap">{JSON.stringify(selected.preferences || {}, null, 2)}</pre>
                </div>

                {selected.recommendedProperties?.length > 0 && (
                  <div>
                    <div className="text-xs uppercase tracking-wide text-muted-foreground mb-1">Atlas Recommendations</div>
                    <div className="space-y-2">
                      {selected.recommendedProperties.map(p => (
                        <div key={p.id} className="flex gap-2 border rounded p-2">
                          <img src={p.image} className="h-12 w-16 object-cover rounded" />
                          <div className="text-xs">
                            <div className="font-semibold">{p.title}</div>
                            <div className="text-muted-foreground">{p.city}, {p.state} · ${p.price.toLocaleString()}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div>
                  <div className="text-xs uppercase tracking-wide text-muted-foreground mb-1">Integrations (ready)</div>
                  <div className="flex flex-wrap gap-2 text-[11px]">
                    <Badge variant="outline">IDX/MLS Feed</Badge>
                    <Badge variant="outline">Follow Up Boss CRM</Badge>
                    <Badge variant="outline">Email Sync</Badge>
                  </div>
                  <div className="text-[10px] text-muted-foreground mt-1">Wired in backend schema — connect API keys to activate.</div>
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
    <div className="min-h-screen bg-stone-50">
      {/* Header */}
      <header className="sticky top-0 z-30 backdrop-blur bg-white/80 border-b">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-9 w-9 rounded-lg bg-stone-900 text-amber-400 flex items-center justify-center font-bold">A</div>
            <div>
              <div className="font-semibold leading-tight">Atlas</div>
              <div className="text-[10px] uppercase tracking-wider text-muted-foreground">AI Real Estate Concierge</div>
            </div>
          </div>
          <Tabs value={tab} onValueChange={setTab}>
            <TabsList>
              <TabsTrigger value="concierge"><Sparkles className="h-3.5 w-3.5 mr-1.5" />Concierge</TabsTrigger>
              <TabsTrigger value="admin"><Settings className="h-3.5 w-3.5 mr-1.5" />Broker Dashboard</TabsTrigger>
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
              <div className="absolute inset-0 bg-gradient-to-br from-stone-950/85 via-stone-900/75 to-stone-900/40" />
            </div>
            <div className="relative max-w-7xl mx-auto px-6 py-12 lg:py-20 grid lg:grid-cols-5 gap-10 items-start">
              <div className="lg:col-span-2 text-white space-y-6 pt-4">
                <Badge className="bg-amber-400 text-stone-900 hover:bg-amber-400 border-0">A concierge-in-a-box</Badge>
                <h1 className="text-4xl lg:text-5xl font-bold leading-tight">
                  Meet <span className="text-amber-400">Atlas</span> — your<br />always-on real estate concierge.
                </h1>
                <p className="text-stone-200 text-lg leading-relaxed">
                  Atlas qualifies leads, learns their tastes, and curates properties — autonomously. From luxury residential discovery to commercial &amp; medical acquisition. You step in only to close.
                </p>
                <div className="flex flex-wrap gap-2 pt-2">
                  <Badge variant="outline" className="text-stone-200 border-stone-400 bg-white/5">Conversational AI · Claude Sonnet 4</Badge>
                  <Badge variant="outline" className="text-stone-200 border-stone-400 bg-white/5">Memory &amp; preference learning</Badge>
                  <Badge variant="outline" className="text-stone-200 border-stone-400 bg-white/5">IDX/MLS ready</Badge>
                </div>
                <div className="grid grid-cols-3 gap-4 pt-4 text-white">
                  <div>
                    <div className="text-3xl font-bold text-amber-400">24/7</div>
                    <div className="text-xs text-stone-300">Lead capture</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-amber-400">2</div>
                    <div className="text-xs text-stone-300">Persona workflows</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-amber-400">∞</div>
                    <div className="text-xs text-stone-300">Memory per lead</div>
                  </div>
                </div>
              </div>
              <div className="lg:col-span-3">
                <ChatPanel />
              </div>
            </div>
          </section>

          {/* Capabilities */}
          <section className="max-w-7xl mx-auto px-6 py-16">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold">Built for high-touch, autonomous flows.</h2>
              <p className="text-muted-foreground mt-2">Atlas adapts to two distinct acquisition workflows — toggle anytime.</p>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="p-6 border-amber-200">
                <Crown className="h-8 w-8 text-amber-500 mb-3" />
                <h3 className="text-xl font-semibold">Residential Luxury</h3>
                <p className="text-sm text-muted-foreground mt-1">Warm, lifestyle-led conversation. Atlas asks about schools, views, privacy, and curates trophy listings that fit.</p>
                <ul className="text-sm mt-3 space-y-1 text-stone-700">
                  <li>• Captures buyer aspirations &amp; lifestyle</li>
                  <li>• Tracks budget, beds/baths, amenities</li>
                  <li>• Curates evocative property shortlists</li>
                </ul>
              </Card>
              <Card className="p-6 border-sky-200">
                <Stethoscope className="h-8 w-8 text-sky-600 mb-3" />
                <h3 className="text-xl font-semibold">Commercial / Medical Acquisition</h3>
                <p className="text-sm text-muted-foreground mt-1">Analytical, financial. Atlas qualifies the principal, deal size, target cap rate, and surfaces matching assets.</p>
                <ul className="text-sm mt-3 space-y-1 text-stone-700">
                  <li>• Captures mandate &amp; firm details</li>
                  <li>• Tracks cap rate, NOI, sq ft, zoning</li>
                  <li>• Surfaces MOBs, ASCs, Class A office</li>
                </ul>
              </Card>
            </div>
          </section>
        </>
      )}

      {tab === 'admin' && (
        <section className="max-w-7xl mx-auto px-6 py-8">
          <div className="mb-6">
            <h1 className="text-2xl font-bold">Broker Dashboard</h1>
            <p className="text-muted-foreground text-sm">Monitor live conversations, override Atlas, manage your pipeline.</p>
          </div>
          <AdminDashboard />
        </section>
      )}

      <footer className="border-t bg-white mt-12">
        <div className="max-w-7xl mx-auto px-6 py-6 text-xs text-muted-foreground flex justify-between">
          <div>Atlas · AI Concierge-in-a-Box</div>
          <div>Powered by Claude Sonnet 4 · MongoDB · Next.js</div>
        </div>
      </footer>
    </div>
  )
}

export default App
