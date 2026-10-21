// Spark RESO Web API (OData) access, shared by the chat API and listing pages.
export async function fetchLiveMLS({ prefs = {}, limit = 5000 } = {}) {
  const base = process.env.SPARK_API_BASE || 'https://replication.sparkapi.com/Version/3/Reso/OData'
  const token = process.env.SPARK_API_TOKEN
  if (!token) return null

  // Exclude leases/rentals — we only want SALE listings. Also enforce a sane
  // minimum ListPrice (>= 500k) to catch any rentals that slip past the type filter.
  const filters = [
    "StandardStatus eq 'Active'",
    "PropertyType ne 'Residential Lease'",
    "PropertyType ne 'Commercial Lease'",
    "ListPrice ge 500000"
  ]
  if (prefs.listingKey) filters.push(`ListingKey eq '${String(prefs.listingKey).replace(/'/g, "''")}'`)
  if (prefs.county) filters.push(`CountyOrParish eq '${String(prefs.county).replace(/'/g, "''")}'`)
  if (prefs.city) filters.push(`City eq '${String(prefs.city).replace(/'/g, "''")}'`)
  if (prefs.budgetMin) filters.push(`ListPrice ge ${Number(prefs.budgetMin)}`)
  if (prefs.budgetMax) filters.push(`ListPrice le ${Number(prefs.budgetMax)}`)
  if (prefs.beds) filters.push(`BedroomsTotal ge ${Number(prefs.beds)}`)
  if (prefs.baths) filters.push(`BathroomsTotalInteger ge ${Number(prefs.baths)}`)
  const filter = encodeURIComponent(filters.join(' and '))
  // NOTE (Emergent Support fix): "Media" cannot appear in $select — it must be
  // requested via $expand=Media. Including it in $select causes a 400 error
  // from Spark RESO which used to drop us back to the Boca demo seed.
  const select = encodeURIComponent([
    'ListingKey','ListingId','ListPrice','StandardStatus',
    'BedroomsTotal','BathroomsTotalInteger','LivingArea',
    'CountyOrParish','StreetNumber','StreetName','StreetSuffix','UnitNumber','City','StateOrProvince','PostalCode',
    'PublicRemarks','PropertyType','PropertySubType','YearBuilt','LotSizeAcres',
    'ListAgentFirstName','ListAgentLastName','ListOfficeName',
    'Latitude','Longitude','VirtualTourURLUnbranded','PhotosCount','ModificationTimestamp'
  ].join(','))
  // Secondary sort key (ListingKey) keeps page boundaries stable — without it,
  // ties on ModificationTimestamp can cause a record to be skipped or repeated
  // across pages.
  const pageSize = 200 // Spark's max per-page size
  let url = `${base}/Property?$top=${pageSize}&$filter=${filter}&$select=${select}&${prefs.lean ? '' : '$expand=Media&'}$orderby=ModificationTimestamp desc,ListingKey desc`

  const records = []
  let fetchedAnyPage = false
  while (url && records.length < limit) {
    const res = await fetch(url, {
      headers: { 'Authorization': `Bearer ${token}`, 'Accept': 'application/json' }
    })
    if (!res.ok) {
      console.error('[SparkAPI] failed:', res.status, await res.text().catch(() => ''))
      break
    }
    fetchedAnyPage = true
    const data = await res.json()
    const page = data.value || []
    records.push(...page)
    // Follow Spark's own next-page link rather than computing $skip ourselves.
    url = page.length === pageSize ? (data['@odata.nextLink'] || null) : null
  }
  // Preserve null (feed error, not even the first page succeeded) vs [] (feed
  // worked, genuinely zero matches) — callers rely on this distinction.
  if (!fetchedAnyPage) return null
  return records.slice(0, limit).map(mapResoToHobson).filter(Boolean)
}

export function mapResoToHobson(r) {
  if (!r?.ListingKey) return null
  const street = [r.StreetNumber, r.StreetName, r.StreetSuffix, r.UnitNumber ? `#${r.UnitNumber}` : null].filter(Boolean).join(' ').trim()
  const address = [street, r.City, r.StateOrProvince, r.PostalCode].filter(Boolean).join(', ')
  const images = Array.isArray(r.Media)
    ? r.Media.filter(m => m?.MediaURL).slice(0, 8).map(m => m.MediaURL)
    : []
  const type = /commercial|office|retail|industrial|medical/i.test(`${r.PropertyType} ${r.PropertySubType}`) ? 'commercial' : 'residential'
  return {
    id: `mls_${r.ListingKey}`,
    listingId: r.ListingId || r.ListingKey,
    type,
    title: r.PublicRemarks ? r.PublicRemarks.slice(0, 60) + (r.PublicRemarks.length > 60 ? '…' : '') : (street || 'Listing'),
    address,
    city: r.City || '',
    county: r.CountyOrParish || '',
    state: r.StateOrProvince || '',
    zip: r.PostalCode || '',
    price: r.ListPrice || 0,
    beds: r.BedroomsTotal || 0,
    baths: r.BathroomsTotalInteger || 0,
    sqft: r.LivingArea || 0,
    yearBuilt: r.YearBuilt || null,
    lotAcres: r.LotSizeAcres || null,
    description: r.PublicRemarks || '',
    images: images.length ? images : ['/hobson-homes/home-1.jpg'],
    heroImage: images[0] || '/hobson-homes/home-1.jpg',
    lat: r.Latitude || null,
    lng: r.Longitude || null,
    location: (r.Latitude && r.Longitude) ? { type: 'Point', coordinates: [r.Longitude, r.Latitude] } : null,
    amenities: [],
    virtualTour: r.VirtualTourURLUnbranded || null,
    photosCount: r.PhotosCount || images.length,
    agent: [r.ListAgentFirstName, r.ListAgentLastName].filter(Boolean).join(' ') || null,
    office: r.ListOfficeName || null,
    source: 'MLS',
    modifiedAt: r.ModificationTimestamp || null
  }
}
