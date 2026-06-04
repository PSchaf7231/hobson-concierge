'use client'

import { useEffect, useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

// Custom icons: gold pin = residential (Anasa), navy pin = commercial (Next Endeavor)
function pinIcon(color) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="44" viewBox="0 0 32 44">
    <path d="M16 0C7.2 0 0 7.2 0 16c0 11 16 28 16 28s16-17 16-28C32 7.2 24.8 0 16 0z" fill="${color}"/>
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

const PIN_RESIDENTIAL = pinIcon('#C9A867')
const PIN_COMMERCIAL = pinIcon('#1B3A4F')

function FitToBounds({ properties }) {
  const map = useMap()
  useEffect(() => {
    const pts = properties.filter(p => p.lat && p.lng).map(p => [p.lat, p.lng])
    if (pts.length === 0) return
    if (pts.length === 1) {
      map.setView(pts[0], 10)
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
    <div className="h-[640px] w-full rounded overflow-hidden border border-[#C9A867]/30 bg-[#F5EDE0]">
      <MapContainer
        center={[39.5, -98.35]}
        zoom={4}
        style={{ height: '100%', width: '100%' }}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
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
