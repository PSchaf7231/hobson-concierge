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

function fullMoney(n) {
  if (!n) return '—'
  return `$${n.toLocaleString()}`
}

function statusPill(p) {
  if (p.source === 'MLS') return 'Live MLS'
  if (p.status) return p.status
  if (p.type === 'commercial') return 'Commercial'
  return 'New Listing'
}

function PropertyCard({ p, index = 0 }) {
  return (
    <div
      className="card group relative rounded-[14px] overflow-hidden cursor-pointer transition-all duration-500"
      style={{
        background: '#101D33',
        boxShadow: '0 18px 45px rgba(0, 0, 0, .45)',
        animation: 'dealIn 700ms cubic-bezier(0.22, 0.9, 0.3, 1.05) both',
        animationDelay: `${index * 850}ms`
      }}
    >
      {/* Photo — wider aspect so overall card ends up nicely portrait */}
      <div className="relative overflow-hidden" style={{ aspectRatio: '16/10' }}>
        <img
          src={p.heroImage || p.images?.[0] || IDLE_IMAGES[index % IDLE_IMAGES.length]}
          alt={p.address || p.title || 'Property'}
          className="w-full h-full object-cover transition-all duration-[3500ms] ease-out group-hover:scale-105"
          style={{ filter: 'brightness(.92)' }}
          loading="lazy"
        />
      </div>

      {/* Gold hairline divider */}
      <div
        className="h-px"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(201, 162, 39, .55) 18%, rgba(201, 162, 39, .55) 82%, transparent)'
        }}
      />

      {/* Body */}
      <div className="px-5 pt-4 pb-4">
        <div
          className="text-[#C9A227] leading-none"
          style={{
            fontFamily: '"Cormorant Garamond", "Playfair Display", Georgia, serif',
            fontWeight: 600,
            fontSize: '1.75rem',
            letterSpacing: '.02em'
          }}
        >
          {fullMoney(p.price)}
        </div>
        <div className="text-[#95A3B8] text-[0.78rem] mt-2 truncate" style={{ letterSpacing: '.03em' }}>
          {p.address || `Address available upon request · ${p.city || 'Palm Beach County'}, ${p.state || 'FL'}`}
        </div>

        {/* Specs */}
        <div className="flex items-center justify-between gap-2 mt-3.5 text-[0.72rem] text-[#95A3B8]" style={{ fontWeight: 400 }}>
          <span className="flex items-center gap-1.5">
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="#C9A227" strokeWidth="1.4" opacity="0.9">
              <path d="M3 18v-6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v6M3 18h18M6 10V7a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v3"/>
            </svg>
            <b className="text-[#EDF1F7] font-medium">{p.beds || '—'}</b>&nbsp;Beds
          </span>
          <span className="flex items-center gap-1.5">
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="#C9A227" strokeWidth="1.4" opacity="0.9">
              <path d="M4 12h16M6 12V6a2 2 0 0 1 2-2h1M4 12l1.5 6h13L20 12"/>
            </svg>
            <b className="text-[#EDF1F7] font-medium">{p.baths || '—'}</b>&nbsp;Baths
          </span>
          <span className="flex items-center gap-1.5">
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="#C9A227" strokeWidth="1.4" opacity="0.9">
              <rect x="4" y="4" width="16" height="16" rx="1"/>
              <path d="M4 15h5v5"/>
            </svg>
            <b className="text-[#EDF1F7] font-medium">{p.sqft ? p.sqft.toLocaleString() : '—'}</b>&nbsp;SqFt
          </span>
        </div>
      </div>

      {/* Design this home CTA — subtle bottom strip */}
      <button
        type="button"
        className="w-full py-2 text-[10px] uppercase tracking-[0.28em] text-[#C9A227] transition-colors font-medium border-t"
        style={{ background: 'rgba(11, 21, 38, 0.5)', borderColor: 'rgba(201, 162, 39, 0.15)' }}
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
    <div
      className="relative h-full overflow-hidden"
      style={{
        background: 'radial-gradient(1200px 700px at 85% -10%, rgba(212, 175, 55, .06), transparent 60%), transparent'
      }}
    >
      <style jsx global>{`
        @keyframes dealIn {
          0% { opacity: 0; transform: translateY(-34px) scale(.97); }
          60% { opacity: 1; }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        .card:hover {
          transform: translateY(-6px);
          box-shadow: 0 28px 60px rgba(0, 0, 0, .6) !important;
        }
      `}</style>

      {/* Header */}
      <div className="relative z-10 pt-8 px-8 pb-4">
        <div className="flex items-end justify-between gap-4 flex-wrap">
          <div>
            <h1
              className="text-[#EDF1F7]"
              style={{
                fontFamily: '"Bodoni Moda", "Playfair Display", Georgia, serif',
                fontWeight: 500,
                fontSize: '1.55rem',
                letterSpacing: '.04em'
              }}
            >
              Curated Residences
            </h1>
            <div
              className="text-[#95A3B8] mt-1.5 uppercase"
              style={{ fontSize: '.72rem', letterSpacing: '.28em' }}
            >
              {hasProps
                ? `Palm Beach County · ${properties.length} result${properties.length === 1 ? '' : 's'}`
                : 'Awaiting Criteria'}
            </div>
          </div>
        </div>
      </div>

      {/* IDLE state — crossfading luxury imagery */}
      {!hasProps && (
        <div className="absolute inset-0 pt-24">
          {IDLE_IMAGES.map((src, i) => (
            <img
              key={src}
              src={src}
              alt=""
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-[2000ms] ${i === imgIdx ? 'opacity-25' : 'opacity-0'}`}
            />
          ))}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B1526] via-transparent to-[#0B1526]/80" />
          <div className="relative h-full flex items-center justify-center text-center px-10">
            <div>
              <div
                className="text-[#E2C285] italic mb-4"
                style={{ fontFamily: '"Cormorant Garamond", Georgia, serif', fontSize: '2.25rem', fontWeight: 500 }}
              >
                Awaiting your criteria
              </div>
              <div className="text-[#F5EDE0]/70 text-sm max-w-md mx-auto leading-relaxed">
                Tell Hobson what you're looking for. He will deal in a curated set of listings, right here, one card at a time.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ACTIVE state — 2-column grid, 80% width, centered, cards deal-in cascade */}
      {hasProps && (
        <div className="relative pb-8">
          <div
            className="mx-auto overflow-y-auto scroll-smooth px-2 hobson-scroll"
            style={{
              width: '98%',
              maxWidth: '100%',
              maxHeight: 'calc(100vh - 200px)',
              scrollbarWidth: 'thin'
            }}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
              {properties.map((p, i) => (
                <PropertyCard key={p.id || p.listingId || i} p={p} index={i} />
              ))}
            </div>
          </div>
          {properties.length > 4 && (
            <div className="absolute bottom-3 left-0 right-0 flex justify-center pointer-events-none z-20">
              <div
                className="px-4 py-1.5 rounded-full bg-[#0B1526]/90 border border-[#C9A227]/40 text-[10px] uppercase text-[#E2C285] font-medium animate-pulse shadow-lg"
                style={{ letterSpacing: '0.28em' }}
              >
                {properties.length - 4} more listings ↓
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
