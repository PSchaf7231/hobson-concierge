'use client'
import { useEffect, useState } from 'react'

// Luxury idle imagery — rotates every 5s when no property recs are active
const IDLE_IMAGES = [
  'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=1200&q=80',
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80',
  'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80',
  'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80',
  'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&q=80'
]

function money(n) {
  if (!n) return '—'
  if (n >= 1_000_000) return `$${(n/1_000_000).toFixed(n >= 10_000_000 ? 1 : 2)}M`
  if (n >= 1_000) return `$${Math.round(n/1000)}K`
  return `$${n}`
}

function PropertyCard({ p, index = 0 }) {
  return (
    <div
      className="group relative rounded-xl overflow-hidden bg-white/95 shadow-xl border border-[#C9A867]/20 hover:border-[#C9A867]/60 hover:shadow-2xl transition-all"
      style={{
        animation: `dealIn 700ms cubic-bezier(0.4, 0, 0.2, 1) both`,
        animationDelay: `${index * 850}ms`
      }}
    >
      <div className="aspect-[16/10] bg-slate-200 overflow-hidden">
        <img
          src={p.heroImage || p.images?.[0]}
          alt={p.address || 'Property'}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          loading="lazy"
        />
        {p.source === 'MLS' && (
          <div className="absolute top-2 left-2 px-2 py-0.5 bg-[#C9A867] text-[#0B1526] text-[9px] font-bold uppercase tracking-widest rounded">
            LIVE MLS
          </div>
        )}
      </div>
      <div className="p-3">
        <div className="font-serif text-xl text-[#C9A867] leading-none">{money(p.price)}</div>
        <div className="text-[11px] text-[#0B1526]/70 mt-1 truncate">{p.address || p.city || 'Address on request'}</div>
        <div className="flex items-center gap-3 text-[11px] text-[#0B1526]/80 mt-2 pt-2 border-t border-[#C9A867]/15">
          <span><b className="text-[#0B1526]">{p.beds || '—'}</b> bd</span>
          <span><b className="text-[#0B1526]">{p.baths || '—'}</b> ba</span>
          <span><b className="text-[#0B1526]">{p.sqft ? p.sqft.toLocaleString() : '—'}</b> sqft</span>
        </div>
      </div>
      {/* Future: virtual staging trigger — bottom strip */}
      <button
        type="button"
        className="w-full py-1.5 text-[9px] uppercase tracking-[0.2em] text-[#C9A867] bg-[#0B1526]/95 hover:bg-[#0B1526] transition font-medium"
        title="Virtual staging (coming soon)"
      >
        Design this home →
      </button>
    </div>
  )
}

export default function PropertyShowcase({ properties = [] }) {
  const [imgIdx, setImgIdx] = useState(0)
  const hasProps = properties.length > 0
  const shown = properties.slice(0, 4)

  useEffect(() => {
    if (hasProps) return
    const t = setInterval(() => setImgIdx(i => (i + 1) % IDLE_IMAGES.length), 5000)
    return () => clearInterval(t)
  }, [hasProps])

  return (
    <div className="relative h-full min-h-[560px] rounded-lg overflow-hidden bg-gradient-to-b from-[#0B1526] to-[#0f1e35] border border-[#C9A867]/15">
      <style jsx global>{`
        @keyframes dealIn {
          0% { opacity: 0; transform: translateY(-30px) scale(0.95); }
          60% { transform: translateY(4px) scale(1.01); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes fadeInOut {
          0%, 100% { opacity: 0; }
          20%, 80% { opacity: 1; }
        }
      `}</style>

      {/* Header space — room for text */}
      <div className="relative pt-6 pb-3 px-6 z-10">
        <div className="text-[10px] uppercase tracking-[0.32em] text-[#C9A867]/70 font-medium">
          {hasProps ? `Curated · ${properties.length} listing${properties.length === 1 ? '' : 's'}` : 'Featured Homes'}
        </div>
        <div className="h-px bg-gradient-to-r from-[#C9A867]/40 to-transparent mt-3" />
      </div>

      {/* IDLE state — crossfading luxury imagery */}
      {!hasProps && (
        <div className="absolute inset-0 pt-16">
          {IDLE_IMAGES.map((src, i) => (
            <img
              key={src}
              src={src}
              alt=""
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-[2000ms] ${i === imgIdx ? 'opacity-30' : 'opacity-0'}`}
            />
          ))}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B1526] via-transparent to-[#0B1526]/80" />
          <div className="relative h-full flex items-center justify-center text-center px-8">
            <div>
              <div className="font-serif text-[#E2C285] text-3xl italic mb-3">Awaiting your criteria</div>
              <div className="text-[#F5EDE0]/70 text-sm max-w-sm mx-auto leading-relaxed">
                Tell Hobson what you're looking for.  He will present listings tailored to your taste, right here.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ACTIVE state — cards cascade top-to-bottom, first 4 dead-center visible, rest below with scroll pip */}
      {hasProps && (
        <div className="relative">
          <div className="px-5 pb-6 max-h-[600px] overflow-y-auto scroll-smooth" style={{ scrollbarWidth: 'thin' }}>
            <div className="grid grid-cols-2 gap-4 w-full max-w-[520px] mx-auto pt-4">
              {properties.map((p, i) => <PropertyCard key={p.id} p={p} index={i} />)}
            </div>
          </div>
          {properties.length > 4 && (
            <div className="absolute bottom-3 left-0 right-0 flex justify-center pointer-events-none z-20">
              <div className="px-4 py-1.5 rounded-full bg-[#0B1526]/90 border border-[#C9A867]/40 text-[10px] uppercase tracking-[0.28em] text-[#E2C285] font-medium animate-pulse shadow-lg">
                {properties.length - 4} more listings ↓
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
