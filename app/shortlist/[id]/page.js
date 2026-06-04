'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { MapPin, BedDouble, Bath, Maximize, TrendingUp, Heart, Sparkles, Printer, Phone, Mail } from 'lucide-react'

const LOGOS = {
  residential: '/anasa.png',
  commercial: '/next-endeavor.png'
}

export default function ShortlistPage() {
  const params = useParams()
  const id = params?.id
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!id) return
    fetch(`/api/shortlist/${id}`)
      .then(r => r.json())
      .then(d => { if (d.error) setError(d.error); else setData(d) })
      .catch(e => setError(e.message))
  }, [id])

  if (error) return <div className="min-h-screen flex items-center justify-center bg-[#F5EDE0] text-[#1B3A4F]">Shortlist not found.</div>
  if (!data) return <div className="min-h-screen flex items-center justify-center bg-[#F5EDE0] text-[#1B3A4F]">Loading…</div>

  const all = [...(data.favorites || []), ...(data.recommended || []).filter(r => !(data.favorites||[]).some(f => f.id === r.id))]
  const logo = LOGOS[data.persona] || LOGOS.residential

  return (
    <div className="min-h-screen bg-[#F5EDE0]">
      <header className="bg-[#1B3A4F] text-white">
        <div className="max-w-5xl mx-auto px-6 py-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={logo} alt={data.brand} className="h-12 w-12 object-contain" />
            <div>
              <div className="text-[10px] uppercase tracking-[0.25em] text-[#C8CCD1]/70">A curated shortlist by</div>
              <div className="font-serif text-[#E2C285] text-xl">{data.brand}</div>
            </div>
          </div>
          <Button onClick={() => window.print()} variant="outline" className="border-[#C9A867] text-[#E2C285] hover:bg-[#C9A867]/10 print:hidden">
            <Printer className="h-4 w-4 mr-2" />Print / Save PDF
          </Button>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-10">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="h-px w-12 bg-[#C9A867]" />
            <span className="text-[#1B3A4F]/60 text-xs uppercase tracking-[0.3em]">Curated for {data.leadName || 'you'}</span>
          </div>
          <h1 className="font-serif text-4xl text-[#1B3A4F]">Your <span className="italic text-[#C9A867]">Atlas</span> Shortlist</h1>
          <p className="text-[#1B3A4F]/70 mt-2 max-w-2xl">A hand-picked collection of properties curated by Atlas based on your conversation—saved exclusively for {data.leadName || 'you'}.</p>
        </div>

        {all.length === 0 && (
          <Card className="p-10 text-center text-[#1B3A4F]/60 border-[#C9A867]/30 bg-white">
            No properties shortlisted yet. Continue chatting with Atlas to build your collection.
          </Card>
        )}

        <div className="grid sm:grid-cols-2 gap-6">
          {all.map(p => (
            <Card key={p.id} className="overflow-hidden border-[#C9A867]/30 bg-white shadow-sm hover:shadow-xl transition">
              <div className="h-52 relative overflow-hidden">
                <img src={p.image} alt={p.title} className="w-full h-full object-cover" />
                <Badge className="absolute top-3 left-3 bg-[#1B3A4F]/95 text-[#E2C285] border-0">{p.type === 'residential' ? 'The Anasa Collection' : 'Next Endeavor CRE'}</Badge>
                {(data.favorites || []).some(f => f.id === p.id) && (
                  <Badge className="absolute top-3 right-3 bg-[#C9A867] text-[#1B3A4F] border-0"><Heart className="h-3 w-3 mr-1 fill-current" />Favorited</Badge>
                )}
              </div>
              <div className="p-5 space-y-2">
                <div className="font-serif text-xl text-[#1B3A4F]">{p.title}</div>
                <div className="text-xs text-[#1B3A4F]/60 flex items-center gap-1"><MapPin className="h-3 w-3" />{p.address}</div>
                <div className="text-2xl font-bold text-[#C9A867]">${p.price.toLocaleString()}</div>
                <div className="flex flex-wrap gap-3 text-xs text-[#1B3A4F]/70 pt-1">
                  {p.beds > 0 && <span className="flex items-center gap-1"><BedDouble className="h-3 w-3" />{p.beds} bd</span>}
                  {p.baths > 0 && <span className="flex items-center gap-1"><Bath className="h-3 w-3" />{p.baths} ba</span>}
                  <span className="flex items-center gap-1"><Maximize className="h-3 w-3" />{p.sqft.toLocaleString()} sqft</span>
                  {p.capRate && <span className="flex items-center gap-1 font-semibold text-emerald-700"><TrendingUp className="h-3 w-3" />{p.capRate}% cap</span>}
                </div>
                {p.description && <p className="text-sm text-[#1B3A4F]/80 leading-relaxed pt-1">{p.description}</p>}
                <div className="flex flex-wrap gap-1 pt-2">
                  {(p.amenities || []).slice(0, 6).map(a => (
                    <span key={a} className="text-[10px] px-2 py-0.5 rounded-full bg-[#F5EDE0] text-[#1B3A4F]/70 border border-[#C8CCD1]/40 capitalize">{a}</span>
                  ))}
                </div>
                <div className="pt-3 mt-2 border-t border-[#C8CCD1]/40 flex justify-between items-center text-xs">
                  <span className="text-[#1B3A4F]/50">Listing {p.id.toUpperCase()}</span>
                  <a href={`/brief/${p.id}`} target="_blank" className="text-[#C9A867] hover:underline font-medium">Full brief →</a>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </main>

      <footer className="bg-[#1B3A4F] text-[#C8CCD1] mt-12">
        <div className="max-w-5xl mx-auto px-6 py-8 text-center space-y-3">
          <img src={logo} alt="" className="h-12 w-12 object-contain mx-auto" />
          <div className="font-serif text-[#E2C285]">{data.brand}</div>
          <div className="text-[10px] uppercase tracking-[0.25em] text-[#C8CCD1]/60">Curated by Atlas AI · Bespoke Real Estate Advisory</div>
          <div className="flex justify-center gap-6 text-xs pt-2">
            <span className="flex items-center gap-1"><Mail className="h-3 w-3" />info@nextendeavorcre.com</span>
          </div>
        </div>
      </footer>
    </div>
  )
}
