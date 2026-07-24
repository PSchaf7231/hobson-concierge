'use client'

import { useEffect, useState, useRef, useMemo } from 'react'
import Map, { Marker, Popup, NavigationControl } from 'react-map-gl/mapbox'
import 'mapbox-gl/dist/mapbox-gl.css'

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN

// Default map region — swap this one constant to re-target the whole map at a
// different market (e.g. when the site is licensed to an agent elsewhere).
const DEFAULT_REGION = { longitude: -80.095, latitude: 26.415, zoom: 11 } // Boca Raton / Delray Beach, FL

function formatPrice(n) {
  if (!n) return '—'
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(n % 1_000_000 === 0 ? 0 : 1)}M`
  if (n >= 1_000) return `$${Math.round(n / 1000)}K`
  return `$${n}`
}

// Price-bubble marker — the familiar Zillow/Redfin-style convention people
// already know how to read on a real estate map, rather than a plain pin.
// Gold border on the residential ones keeps a touch of Hobson's branding.
function PriceBubble({ price, commercial }) {
  return (
    <div
      style={{
        background: commercial ? '#1B3A4F' : '#F5EDE0',
        color: commercial ? '#F5EDE0' : '#1B3A4F',
        border: `1.5px solid ${commercial ? '#3D6B8C' : '#D4AF37'}`,
        borderRadius: 999,
        padding: '4px 9px',
        fontSize: 12,
        fontWeight: 700,
        whiteSpace: 'nowrap',
        cursor: 'pointer',
        boxShadow: '0 2px 6px rgba(0,0,0,.35)'
      }}
    >
      {formatPrice(price)}
    </div>
  )
}

export default function PropertyMap({ properties, filterType }) {
  const [mounted, setMounted] = useState(false)
  const [popupInfo, setPopupInfo] = useState(null)
  const mapRef = useRef(null)
  useEffect(() => setMounted(true), [])

  const filtered = filterType === 'all' ? properties : properties.filter(p => p.type === filterType)
  const withCoords = useMemo(() => filtered.filter(p => p.lat && p.lng), [filtered])

  // Fit to the results' bounds, or fall back to the default region when there
  // are none (idle state) or none with usable coordinates.
  useEffect(() => {
    const map = mapRef.current?.getMap && mapRef.current.getMap()
    if (!map) return
    if (withCoords.length === 0) {
      map.flyTo({ center: [DEFAULT_REGION.longitude, DEFAULT_REGION.latitude], zoom: DEFAULT_REGION.zoom, duration: 800 })
    } else if (withCoords.length === 1) {
      map.flyTo({ center: [withCoords[0].lng, withCoords[0].lat], zoom: 13, duration: 800 })
    } else {
      const lngs = withCoords.map(p => p.lng)
      const lats = withCoords.map(p => p.lat)
      map.fitBounds(
        [[Math.min(...lngs), Math.min(...lats)], [Math.max(...lngs), Math.max(...lats)]],
        { padding: 60, duration: 800 }
      )
    }
  }, [withCoords])

  if (!mounted) return null

  if (!MAPBOX_TOKEN) {
    return (
      <div className="h-[640px] w-full rounded overflow-hidden border border-[#D4AF37]/30 bg-[#0A1628] flex items-center justify-center text-[#D4AF37]/60 text-sm text-center px-6">
        Map unavailable — Mapbox isn't configured yet.
      </div>
    )
  }

  return (
    <div className="h-[640px] w-full rounded overflow-hidden border border-[#D4AF37]/30">
      <Map
        ref={mapRef}
        mapboxAccessToken={MAPBOX_TOKEN}
        initialViewState={{ longitude: DEFAULT_REGION.longitude, latitude: DEFAULT_REGION.latitude, zoom: DEFAULT_REGION.zoom }}
        style={{ width: '100%', height: '100%' }}
        mapStyle="mapbox://styles/mapbox/streets-v12"
      >
        <NavigationControl position="bottom-right" />
        {withCoords.map(p => (
          <Marker
            key={p.id}
            longitude={p.lng}
            latitude={p.lat}
            anchor="bottom"
            onClick={(e) => { e.originalEvent.stopPropagation(); setPopupInfo(p) }}
          >
            <PriceBubble price={p.price} commercial={p.type === 'commercial'} />
          </Marker>
        ))}
        {popupInfo && (
          <Popup
            longitude={popupInfo.lng}
            latitude={popupInfo.lat}
            anchor="top"
            onClose={() => setPopupInfo(null)}
            closeOnClick={false}
          >
            <div className="text-xs" style={{ minWidth: 200 }}>
              <img src={popupInfo.heroImage || popupInfo.images?.[0] || '/hobson-homes/home-1.jpg'} alt={popupInfo.title} style={{ width: '100%', height: 100, objectFit: 'cover', borderRadius: 4, marginBottom: 6 }} />
              <div style={{ fontWeight: 600, fontFamily: 'Playfair Display, serif', color: '#1B3A4F', fontSize: 14 }}>{popupInfo.title}</div>
              <div style={{ color: '#6B7280', marginTop: 2 }}>{popupInfo.city}, {popupInfo.state}</div>
              <div style={{ color: '#C9A867', fontWeight: 700, fontSize: 16, marginTop: 4 }}>${popupInfo.price.toLocaleString()}</div>
              <div style={{ marginTop: 6, color: '#1B3A4F' }}>
                {popupInfo.beds > 0 && <span>{popupInfo.beds}bd · </span>}
                {popupInfo.baths > 0 && <span>{popupInfo.baths}ba · </span>}
                <span>{popupInfo.sqft.toLocaleString()} sqft</span>
                {popupInfo.capRate && <span> · {popupInfo.capRate}% cap</span>}
              </div>
              <a href={`/brief/${popupInfo.id}`} target="_blank" style={{ display: 'inline-block', marginTop: 8, color: '#C9A867', fontWeight: 600 }}>Open full brief →</a>
            </div>
          </Popup>
        )}
      </Map>
    </div>
  )
}
