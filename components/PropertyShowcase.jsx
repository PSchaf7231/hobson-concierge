'use client'
import { useEffect, useState, useRef } from 'react'
import { createPortal } from 'react-dom'

// Renders children at document.body instead of in place. Needed because these
// cards have a CSS animation that ends on a non-'none' transform (dealIn's
// 100% keyframe), and any ancestor with an active transform creates a new
// containing block for position:fixed descendants — without this, "fixed"
// modals get trapped inside the card's own box instead of covering the screen.
function BodyPortal({ children }) {
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [])
  if (!mounted) return null
  return createPortal(children, document.body)
}

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

function PropertyCard({ p, index = 0, isFavorite = false, onToggleFavorite }) {
  const [showContact, setShowContact] = useState(false)
  const [showDetail, setShowDetail] = useState(false)
  return (
    <div
      className="card group relative rounded-[14px] overflow-hidden cursor-pointer transition-all duration-500"
      onClick={() => setShowDetail(true)}
      style={{
        background: '#101D33',
        boxShadow: '0 18px 45px rgba(0, 0, 0, .45)',
        animation: 'dealIn 700ms cubic-bezier(0.22, 0.9, 0.3, 1.05) both',
        animationDelay: `${index * 850}ms`
      }}
    >
      {/* Photo — wider aspect so overall card ends up nicely portrait */}
      <div className="relative overflow-hidden" style={{ aspectRatio: '16/9' }}>
        <img
          src={p.heroImage || p.images?.[0] || IDLE_IMAGES[index % IDLE_IMAGES.length]}
          alt={p.address || p.title || 'Property'}
          className="w-full h-full object-cover transition-all duration-[3500ms] ease-out group-hover:scale-105"
          style={{ filter: 'brightness(.92)' }}
          loading="lazy"
        />
        {onToggleFavorite && (
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); onToggleFavorite(p.id) }}
            aria-label={isFavorite ? 'Remove from favorites' : 'Save to favorites'}
            title={isFavorite ? 'Remove from favorites' : 'Save to favorites'}
            className="absolute top-2.5 right-2.5 h-8 w-8 rounded-full flex items-center justify-center bg-[#0A1628]/70 hover:bg-[#0A1628]/90 backdrop-blur-sm border border-[#D4AF37]/30 transition"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill={isFavorite ? '#D4AF37' : 'none'} stroke="#D4AF37" strokeWidth="1.8">
              <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z" />
            </svg>
          </button>
        )}
      </div>

      {/* Gold hairline divider */}
      <div
        className="h-px"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(201, 162, 39, .55) 18%, rgba(201, 162, 39, .55) 82%, transparent)'
        }}
      />

      {/* Body */}
      <div className="px-4 pt-3 pb-3">
        <div
          className="text-[#C9A227] leading-none"
          style={{
            fontFamily: '"Cormorant Garamond", "Playfair Display", Georgia, serif',
            fontWeight: 600,
            fontSize: '1.4rem',
            letterSpacing: '.02em'
          }}
        >
          {fullMoney(p.price)}
        </div>
        <div className="text-[#95A3B8] text-[0.72rem] mt-1.5 truncate" style={{ letterSpacing: '.03em' }}>
          {p.address || `Address available upon request · ${p.city || 'Palm Beach County'}, ${p.state || 'FL'}`}
        </div>

        {/* Specs */}
        <div className="flex items-center justify-between gap-2 mt-2.5 text-[0.68rem] text-[#95A3B8]" style={{ fontWeight: 400 }}>
          <span className="flex items-center gap-1.5">
            <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="#C9A227" strokeWidth="1.4" opacity="0.9">
              <path d="M3 18v-6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v6M3 18h18M6 10V7a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v3"/>
            </svg>
            <b className="text-[#EDF1F7] font-medium">{p.beds || '—'}</b>&nbsp;Beds
          </span>
          <span className="flex items-center gap-1.5">
            <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="#C9A227" strokeWidth="1.4" opacity="0.9">
              <path d="M4 12h16M6 12V6a2 2 0 0 1 2-2h1M4 12l1.5 6h13L20 12"/>
            </svg>
            <b className="text-[#EDF1F7] font-medium">{p.baths || '—'}</b>&nbsp;Baths
          </span>
          <span className="flex items-center gap-1.5">
            <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="#C9A227" strokeWidth="1.4" opacity="0.9">
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
        onClick={(e) => { e.stopPropagation(); setShowContact(true) }}
        className="w-full py-1.5 text-[9px] uppercase tracking-[0.24em] text-[#C9A227] hover:bg-[#C9A227]/10 transition-colors font-medium border-t"
        style={{ background: 'rgba(11, 21, 38, 0.5)', borderColor: 'rgba(201, 162, 39, 0.15)' }}
      >
        Design this home →
      </button>

      {/* Virtual staging contact card — placeholder until the real staging build ships */}
      {showContact && (
        <BodyPortal>
          <div
            className="fixed inset-0 z-[100] flex items-center justify-center px-4"
            style={{ background: 'rgba(10, 22, 40, 0.75)' }}
            onClick={(e) => { e.stopPropagation(); setShowContact(false) }}
          >
            <div
              className="max-w-sm w-full rounded-xl border border-[#D4AF37]/30 p-6 text-center"
              style={{ background: '#0B1526' }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-[10px] uppercase tracking-[0.3em] text-[#D4AF37] mb-3">Virtual Staging</div>
              <p className="text-[#F5EDE0] text-sm leading-relaxed mb-5">
                Interested in seeing this home fully designed and furnished? Reach out directly and we'll take care of it.
              </p>
              <div className="text-[#F5EDE0] font-medium">Paul Schafranick</div>
              <a href="tel:+15612557285" className="text-[#D4AF37] text-lg font-semibold block mt-1 hover:brightness-110">561-255-7285</a>
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); setShowContact(false) }}
                className="mt-5 text-[10px] uppercase tracking-[0.22em] text-[#F5EDE0]/50 hover:text-[#F5EDE0]/80 transition"
              >
                Close
              </button>
            </div>
          </div>
        </BodyPortal>
      )}

      {showDetail && (
        <BodyPortal>
          <PropertyDetailModal p={p} index={index} onClose={() => setShowDetail(false)} />
        </BodyPortal>
      )}
    </div>
  )
}

// Short spoken intro for a property — the sentence Hobson says out loud
// the moment someone clicks into a listing, not a full read of every field.
function buildBlurb(p) {
  const addr = p.address || `this home in ${p.city || 'Palm Beach County'}, ${p.state || 'FL'}`
  const specs = []
  if (p.beds) specs.push(`${p.beds} bed${p.beds === 1 ? '' : 's'}`)
  if (p.baths) specs.push(`${p.baths} bath${p.baths === 1 ? '' : 's'}`)
  const specLine = specs.length ? ` It's a ${specs.join(', ')}` + (p.sqft ? `, just over ${Math.round(p.sqft / 100) * 100} square feet.` : '.') : ''
  const price = p.price ? ` Listed at ${fullMoney(p.price)}.` : ''
  const teaser = p.description ? ` ${p.description.split('.')[0].trim()}.` : ''
  return `Here's ${addr}.${price}${specLine}${teaser}`
}

function PropertyDetailModal({ p, index = 0, onClose }) {
  const gallery = (p.images && p.images.length ? p.images : [p.heroImage || p.image]).filter(Boolean)
  const photos = gallery.length ? gallery : [IDLE_IMAGES[index % IDLE_IMAGES.length]]
  const [photoIdx, setPhotoIdx] = useState(0)
  const [speaking, setSpeaking] = useState(false)
  const audioRef = useRef(null)

  // Trigger: clicking into a property is what makes Hobson talk about it —
  // no separate voice-search step needed for this.
  useEffect(() => {
    let cancelled = false
    async function speak() {
      try {
        const res = await fetch('/api/voice', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text: buildBlurb(p) })
        })
        if (!res.ok || cancelled) return
        const blob = await res.blob()
        if (cancelled) return
        const url = URL.createObjectURL(blob)
        const audio = new Audio(url)
        audioRef.current = audio
        audio.onplay = () => { if (!cancelled) setSpeaking(true) }
        audio.onended = () => { setSpeaking(false); URL.revokeObjectURL(url) }
        audio.onerror = () => setSpeaking(false)
        await audio.play()
      } catch (e) { setSpeaking(false) }
    }
    speak()
    return () => {
      cancelled = true
      try { audioRef.current?.pause() } catch (e) {}
      audioRef.current = null
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [p.id || p.listingId])

  useEffect(() => {
    function onKey(e) {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') setPhotoIdx(i => (i + 1) % photos.length)
      if (e.key === 'ArrowLeft') setPhotoIdx(i => (i - 1 + photos.length) % photos.length)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [photos.length, onClose])

  const specs = [
    { label: 'Beds', value: p.beds || '—' },
    { label: 'Baths', value: p.baths || '—' },
    { label: 'SqFt', value: p.sqft ? p.sqft.toLocaleString() : '—' },
    { label: 'Year Built', value: p.yearBuilt || '—' },
    { label: 'Lot', value: p.lotAcres ? `${p.lotAcres} ac` : '—' }
  ].filter(s => s.value !== '—' || ['Beds', 'Baths', 'SqFt'].includes(s.label))

  const isCommercial = p.type === 'commercial'
  const agentLine = [p.agent, p.office].filter(Boolean).join(' · ')

  return (
    <div
      className="fixed inset-0 z-[110] flex items-center justify-center p-3 sm:p-6"
      style={{ background: 'rgba(6, 13, 24, 0.85)' }}
      onClick={(e) => { e.stopPropagation(); onClose() }}
    >
      <div
        className="w-full max-w-3xl max-h-[92vh] overflow-y-auto rounded-2xl border border-[#D4AF37]/30 hobson-scroll"
        style={{ background: '#0B1526' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Gallery */}
        <div className="relative" style={{ aspectRatio: '16/9', background: '#101D33' }}>
          <img
            src={photos[photoIdx]}
            alt={p.address || p.title || 'Property'}
            className="w-full h-full object-cover"
          />
          {speaking && (
            <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#0A1628]/80 border border-[#D4AF37]/40 text-[#D4AF37] text-[9px] uppercase tracking-[0.24em] backdrop-blur-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-[#D4AF37] animate-pulse" />
              Hobson speaking
            </div>
          )}
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); onClose() }}
            className="absolute top-3 right-3 h-9 w-9 rounded-full flex items-center justify-center bg-[#0A1628]/80 hover:bg-[#0A1628] border border-[#D4AF37]/40 text-[#D4AF37] backdrop-blur-sm transition"
            aria-label="Close"
          >
            ✕
          </button>
          {photos.length > 1 && (
            <>
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); setPhotoIdx(i => (i - 1 + photos.length) % photos.length) }}
                className="absolute left-3 top-1/2 -translate-y-1/2 h-9 w-9 rounded-full flex items-center justify-center bg-[#0A1628]/70 hover:bg-[#0A1628] border border-[#D4AF37]/30 text-[#D4AF37] backdrop-blur-sm transition"
                aria-label="Previous photo"
              >
                ‹
              </button>
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); setPhotoIdx(i => (i + 1) % photos.length) }}
                className="absolute right-3 top-1/2 -translate-y-1/2 h-9 w-9 rounded-full flex items-center justify-center bg-[#0A1628]/70 hover:bg-[#0A1628] border border-[#D4AF37]/30 text-[#D4AF37] backdrop-blur-sm transition"
                aria-label="Next photo"
              >
                ›
              </button>
              <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-full bg-[#0A1628]/80 border border-[#D4AF37]/30 text-[#D4AF37] text-[10px] uppercase tracking-widest backdrop-blur-sm">
                {photoIdx + 1} / {photos.length}
              </div>
            </>
          )}
        </div>

        {/* Body */}
        <div className="px-6 sm:px-8 py-6">
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div>
              <div
                className="text-[#C9A227] leading-none"
                style={{ fontFamily: '"Cormorant Garamond", "Playfair Display", Georgia, serif', fontWeight: 600, fontSize: '2.25rem' }}
              >
                {fullMoney(p.price)}
              </div>
              <div className="text-[#EDF1F7] text-sm mt-2">
                {p.address || `Address available upon request · ${p.city || 'Palm Beach County'}, ${p.state || 'FL'}`}
              </div>
            </div>
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#C9A227] border border-[#D4AF37]/30 rounded-full px-3 py-1.5 whitespace-nowrap">
              {statusPill(p)}
            </span>
          </div>

          {/* Specs */}
          <div className="flex flex-wrap gap-x-6 gap-y-2 mt-5 pt-5 border-t border-[#D4AF37]/15 text-[0.8rem] text-[#95A3B8]">
            {specs.map(s => (
              <span key={s.label}>
                <b className="text-[#EDF1F7] font-medium">{s.value}</b>&nbsp;{s.label}
              </span>
            ))}
            {isCommercial && p.capRate != null && (
              <span><b className="text-[#EDF1F7] font-medium">{p.capRate}%</b>&nbsp;Cap Rate</span>
            )}
            {isCommercial && p.zoning && (
              <span><b className="text-[#EDF1F7] font-medium">{p.zoning}</b>&nbsp;Zoning</span>
            )}
          </div>

          {/* Description */}
          {p.description && (
            <p className="text-[#C8CCD1] text-sm leading-relaxed mt-5">{p.description}</p>
          )}

          {/* Amenities */}
          {Array.isArray(p.amenities) && p.amenities.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-5">
              {p.amenities.map(a => (
                <span key={a} className="text-[10px] uppercase tracking-wider text-[#D4AF37]/80 border border-[#D4AF37]/25 rounded-full px-2.5 py-1">
                  {a}
                </span>
              ))}
            </div>
          )}

          {/* Contact */}
          <div className="mt-6 pt-5 border-t border-[#D4AF37]/15 flex items-center justify-between flex-wrap gap-3">
            <div className="text-[#95A3B8] text-xs">
              {agentLine || 'Listed by Paul Schafranick'}
            </div>
            <a
              href="tel:+15612557285"
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-[10px] uppercase tracking-[0.28em] font-semibold text-[#3a2a10] transition shadow-md hover:brightness-110"
              style={{ background: 'linear-gradient(to bottom, #E6C878 0%, #C9A227 55%, #A88418 100%)', border: '1px solid #8a6b2a' }}
            >
              Contact Paul · 561-255-7285
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function PropertyShowcase({ properties = [], favIds, onToggleFavorite, sessionId, favoritesCount = 0 }) {
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
      <div className="relative z-10 pt-4 px-6 pb-2">
        <div className="flex items-end justify-between gap-4 flex-wrap">
          <div>
            <h1
              className="text-[#EDF1F7]"
              style={{
                fontFamily: '"Bodoni Moda", "Playfair Display", Georgia, serif',
                fontWeight: 500,
                fontSize: '1.3rem',
                letterSpacing: '.04em'
              }}
            >
              Curated Residences
            </h1>
            <div
              className="text-[#95A3B8] mt-1 uppercase"
              style={{ fontSize: '.68rem', letterSpacing: '.24em' }}
            >
              {hasProps
                ? `Palm Beach County · ${properties.length} result${properties.length === 1 ? '' : 's'}`
                : 'Awaiting Criteria'}
            </div>
          </div>
          {sessionId && favoritesCount > 0 && (
            <a
              href={`/shortlist/${sessionId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.22em] text-[#D4AF37] hover:text-[#E6C878] transition"
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="#D4AF37" stroke="#D4AF37" strokeWidth="1.5"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z"/></svg>
              {favoritesCount} Saved →
            </a>
          )}
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
              maxHeight: 'calc(100vh - 120px)',
              scrollbarWidth: 'thin'
            }}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 pt-2">
              {properties.map((p, i) => (
                <PropertyCard key={p.id || p.listingId || i} p={p} index={i} isFavorite={favIds ? favIds.has(p.id) : false} onToggleFavorite={onToggleFavorite} />
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
