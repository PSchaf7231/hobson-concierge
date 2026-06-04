'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { MapPin, BedDouble, Bath, Maximize, TrendingUp, Printer, Building2 } from 'lucide-react'

const LOGOS = {
  residential: '/anasa.png',
  commercial: '/next-endeavor.png'
}

export default function BriefPage() {
  const params = useParams()
  const id = params?.id
  const [p, setP] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!id) return
    fetch(`/api/properties/${id}`)
      .then(r => r.json())
      .then(d => { if (d.error) setError(d.error); else setP(d) })
      .catch(e => setError(e.message))
  }, [id])

  if (error) return <div className="min-h-screen flex items-center justify-center text-[#1B3A4F]">Listing not found.</div>
  if (!p) return <div className="min-h-screen flex items-center justify-center text-[#1B3A4F]">Loading…</div>

  const brand = p.type === 'residential' ? 'The Anasa Collection' : 'Next Endeavor CRE'
  const logo = p.type === 'residential' ? LOGOS.residential : LOGOS.commercial
  const isCommercial = p.type === 'commercial'

  return (
    <div className="min-h-screen bg-[#F5EDE0] print:bg-white">
      <div className="print:hidden bg-[#1B3A4F] text-white">
        <div className="max-w-4xl mx-auto px-6 py-3 flex items-center justify-between">
          <div className="text-xs uppercase tracking-[0.25em] text-[#C8CCD1]/70">Property Brief</div>
          <Button onClick={() => window.print()} variant="outline" className="border-[#C9A867] text-[#E2C285] hover:bg-[#C9A867]/10">
            <Printer className="h-4 w-4 mr-2" />Save as PDF / Print
          </Button>
        </div>
      </div>

      <main className="max-w-4xl mx-auto p-8 print:p-6 print:max-w-full">
        {/* Brand header */}
        <div className="flex items-start justify-between border-b border-[#C9A867]/40 pb-5 mb-6">
          <div className="flex items-center gap-3">
            <img src={logo} alt={brand} className="h-16 w-16 object-contain" />
            <div>
              <div className="text-[10px] uppercase tracking-[0.25em] text-[#1B3A4F]/60">Property Brief</div>
              <div className="font-serif text-2xl text-[#1B3A4F]">{brand}</div>
            </div>
          </div>
          <div className="text-right text-xs text-[#1B3A4F]/60">
            <div>Listing ID</div>
            <div className="font-mono text-[#1B3A4F] font-semibold">{p.id.toUpperCase()}</div>
            <div className="mt-1">MLS# {p.mlsNumber || '—'}</div>
          </div>
        </div>

        {/* Hero */}
        <div className="relative rounded overflow-hidden mb-6">
          <img src={p.image} alt={p.title} className="w-full h-[360px] object-cover print:h-[280px]" />
        </div>

        {/* Title + price */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 className="font-serif text-4xl text-[#1B3A4F] leading-tight">{p.title}</h1>
            <div className="flex items-center gap-1 mt-2 text-[#1B3A4F]/60"><MapPin className="h-4 w-4" />{p.address}</div>
          </div>
          <div className="text-right">
            <div className="text-[10px] uppercase tracking-wider text-[#1B3A4F]/50">Offered at</div>
            <div className="text-3xl font-bold text-[#C9A867]">${p.price.toLocaleString()}</div>
            {p.capRate && (
              <div className="mt-1 text-sm text-emerald-700 font-semibold">{p.capRate}% Cap Rate</div>
            )}
          </div>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-4 gap-3 border-y border-[#C9A867]/40 py-5 mb-6">
          {p.beds > 0 && (
            <div className="text-center">
              <BedDouble className="h-5 w-5 text-[#C9A867] mx-auto" />
              <div className="text-2xl font-serif text-[#1B3A4F] mt-1">{p.beds}</div>
              <div className="text-[10px] uppercase tracking-wider text-[#1B3A4F]/60">Bedrooms</div>
            </div>
          )}
          {p.baths > 0 && (
            <div className="text-center">
              <Bath className="h-5 w-5 text-[#C9A867] mx-auto" />
              <div className="text-2xl font-serif text-[#1B3A4F] mt-1">{p.baths}</div>
              <div className="text-[10px] uppercase tracking-wider text-[#1B3A4F]/60">Bathrooms</div>
            </div>
          )}
          <div className="text-center">
            <Maximize className="h-5 w-5 text-[#C9A867] mx-auto" />
            <div className="text-2xl font-serif text-[#1B3A4F] mt-1">{p.sqft.toLocaleString()}</div>
            <div className="text-[10px] uppercase tracking-wider text-[#1B3A4F]/60">Square Feet</div>
          </div>
          {isCommercial && p.noi && (
            <div className="text-center">
              <TrendingUp className="h-5 w-5 text-[#C9A867] mx-auto" />
              <div className="text-2xl font-serif text-[#1B3A4F] mt-1">${(p.noi/1000).toFixed(0)}K</div>
              <div className="text-[10px] uppercase tracking-wider text-[#1B3A4F]/60">Annual NOI</div>
            </div>
          )}
          {(!isCommercial || !p.noi) && p.zoning && (
            <div className="text-center">
              <Building2 className="h-5 w-5 text-[#C9A867] mx-auto" />
              <div className="text-2xl font-serif text-[#1B3A4F] mt-1">{p.zoning}</div>
              <div className="text-[10px] uppercase tracking-wider text-[#1B3A4F]/60">Zoning</div>
            </div>
          )}
          {(!isCommercial || !p.noi) && !p.zoning && (
            <div className="text-center">
              <Building2 className="h-5 w-5 text-[#C9A867] mx-auto" />
              <div className="text-2xl font-serif text-[#1B3A4F] mt-1 capitalize">{p.subtype}</div>
              <div className="text-[10px] uppercase tracking-wider text-[#1B3A4F]/60">Type</div>
            </div>
          )}
        </div>

        {/* Description */}
        <div className="mb-6">
          <h2 className="text-xs uppercase tracking-[0.25em] text-[#1B3A4F]/60 mb-2">Property Description</h2>
          <p className="text-[#1B3A4F]/85 leading-relaxed">{p.description}</p>
        </div>

        {/* Amenities */}
        {p.amenities && p.amenities.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xs uppercase tracking-[0.25em] text-[#1B3A4F]/60 mb-2">Features &amp; Amenities</h2>
            <div className="grid grid-cols-3 gap-x-4 gap-y-1">
              {p.amenities.map(a => (
                <div key={a} className="text-sm text-[#1B3A4F]/80 flex items-center gap-2">
                  <span className="text-[#C9A867]">◆</span>
                  <span className="capitalize">{a}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Commercial fundamentals */}
        {isCommercial && (p.capRate || p.noi || p.zoning) && (
          <div className="mb-6 bg-white border border-[#C9A867]/30 rounded p-5">
            <h2 className="text-xs uppercase tracking-[0.25em] text-[#1B3A4F]/60 mb-3">Investment Fundamentals</h2>
            <div className="grid grid-cols-3 gap-4 text-sm">
              {p.capRate && <div><span className="text-[#1B3A4F]/60">Cap Rate</span><div className="text-lg font-semibold text-emerald-700">{p.capRate}%</div></div>}
              {p.noi && <div><span className="text-[#1B3A4F]/60">Annual NOI</span><div className="text-lg font-semibold text-[#1B3A4F]">${p.noi.toLocaleString()}</div></div>}
              {p.zoning && <div><span className="text-[#1B3A4F]/60">Zoning</span><div className="text-lg font-semibold text-[#1B3A4F]">{p.zoning}</div></div>}
            </div>
          </div>
        )}

        {/* Contact footer */}
        <div className="mt-10 pt-6 border-t border-[#C9A867]/40 text-center">
          <img src={logo} alt="" className="h-12 w-12 object-contain mx-auto mb-2" />
          <div className="font-serif text-[#1B3A4F] text-lg">{brand}</div>
          <div className="text-[10px] uppercase tracking-[0.25em] text-[#1B3A4F]/50 mt-1">Bespoke Real Estate Advisory · Curated by Atlas AI</div>
          <div className="text-xs text-[#1B3A4F]/60 mt-3">info@nextendeavorcre.com</div>
        </div>
      </main>

      <style jsx global>{`
        @media print {
          @page { size: letter; margin: 0.5in; }
          body { background: white !important; }
        }
      `}</style>
    </div>
  )
}
