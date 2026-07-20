'use client'

import { useEffect, useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

// Custom icons: gold pin = residential (Anasa), navy pin = commercial (Next Endeavor).
// Both get a light outline so they stay visible against the dark basemap.
function pinIcon(color) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="44" viewBox="0 0 32 44">
    <path d="M16 0C7.2 0 0 7.2 0 16c0 11 16 28 16 28s16-17 16-28C32 7.2 24.8 0 16 0z" fill="${color}" stroke="#F5EDE0" stroke-width="1.25"/>
    <circle cx="16" cy="16" r="6" fill="#F5EDE0"/>
  </svg>`
  return L.divIcon({
    html: svg,
    className: 'atlas-pin',
    iconSize: [32, 44],
    iconAnchor: [16, 44],
    popupAnchor: [0, -36]
  })
}

const PIN_RESIDENTIAL = pinIcon('#D4AF37')
const PIN_COMMERCIAL = pinIcon('#3D6B8C')

// Default map region — swap this one constant to re-target the whole map at a
// different market (e.g. when the site is licensed to an agent elsewhere).
const DEFAULT_REGION = { center: [26.7153, -80.0534], zoom: 10 } // Palm Beach County, FL

function FitToBounds({ properties }) {
  const map = useMap()
  useEffect(() => {
    const pts = properties.filter(p => p.lat && p.lng).map(p => [p.lat, p.lng])
    if (pts.length === 0) {
      map.setView(DEFAULT_REGION.center, DEFAULT_REGION.zoom)
    } else if (pts.length === 1) {
      map.setView(pts[0], 13)
    } else {
      map.fitBounds(pts, { padding: [40, 40] })
    }
  }, [properties, map])
  return null
}

export default function PropertyMap({ properties, filterType }) {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  if (!mounted) return null

  const filtered = filterType === 'all' ? properties : properties.filter(p => p.type === filterType)
  const withCoords = filtered.filter(p => p.lat && p.lng)

  return (
    <div className="h-[640px] w-full rounded overflow-hidden border border-[#D4AF37]/30 bg-[#0A1628]">
      {/* CARTO's dark tiles render almost pure black/gray on their own — tint just the
          tile layer (not pins/popups/controls) to the site's actual navy via a blend
          overlay confined to Leaflet's own tile pane. */}
      <style>{`
        .leaflet-tile-pane { position: relative; }
        .leaflet-tile-pane::after {
          content: '';
          position: absolute;
          inset: 0;
          background: #0A1628;
          mix-blend-mode: color;
          pointer-events: none;
        }
      `}</style>
      <MapContainer
        center={DEFAULT_REGION.center}
        zoom={DEFAULT_REGION.zoom}
        style={{ height: '100%', width: '100%' }}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          subdomains="abcd"
          maxZoom={20}
        />
        <FitToBounds properties={withCoords} />
        {withCoords.map(p => (
          <Marker
            key={p.id}
            position={[p.lat, p.lng]}
            icon={p.type === 'commercial' ? PIN_COMMERCIAL : PIN_RESIDENTIAL}
          >
            <Popup>
              <div className="text-xs" style={{ minWidth: 200 }}>
                <img src={p.image} alt={p.title} style={{ width: '100%', height: 100, objectFit: 'cover', borderRadius: 4, marginBottom: 6 }} />
                <div style={{ fontWeight: 600, fontFamily: 'Playfair Display, serif', color: '#1B3A4F', fontSize: 14 }}>{p.title}</div>
                <div style={{ color: '#6B7280', marginTop: 2 }}>{p.city}, {p.state}</div>
                <div style={{ color: '#C9A867', fontWeight: 700, fontSize: 16, marginTop: 4 }}>${p.price.toLocaleString()}</div>
                <div style={{ marginTop: 6, color: '#1B3A4F' }}>
                  {p.beds > 0 && <span>{p.beds}bd · </span>}
                  {p.baths > 0 && <span>{p.baths}ba · </span>}
                  <span>{p.sqft.toLocaleString()} sqft</span>
                  {p.capRate && <span> · {p.capRate}% cap</span>}
                </div>
                <a href={`/brief/${p.id}`} target="_blank" style={{ display: 'inline-block', marginTop: 8, color: '#C9A867', fontWeight: 600 }}>Open full brief →</a>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  )
}
