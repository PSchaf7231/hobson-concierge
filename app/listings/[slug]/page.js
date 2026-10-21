import { notFound } from 'next/navigation'
import { GuidePageLayout, GuideLink } from '@/components/GuidePageLayout'
import { fetchLiveMLS } from '@/lib/spark'
import { listingKeyFromSlug, listingSlug, money } from '@/lib/listings'

export const revalidate = 3600
export const dynamicParams = true

// Pages are built on first visit (or when the sitemap is crawled), then refreshed hourly.
export function generateStaticParams() {
  return []
}

async function getListing(slug) {
  const key = listingKeyFromSlug(slug)
  if (!key) return null
  const rows = await fetchLiveMLS({ prefs: { listingKey: key }, limit: 1 })
  return rows?.[0] || null
}

export async function generateMetadata({ params }) {
  const l = await getListing(params.slug)
  if (!l) return { robots: { index: false } }
  const facts = [l.beds && `${l.beds} bed`, l.baths && `${l.baths} bath`, l.sqft && `${l.sqft.toLocaleString('en-US')} sq ft`].filter(Boolean).join(', ')
  const title = `${l.address} | ${money(l.price)} | Ask Hobson`
  const description = `${l.address}${facts ? `: ${facts}` : ''}, listed at ${money(l.price)}. Talk to Hobson or call Paul Schafranick, VantaSure Realty, 561-255-7285.`
  const url = `https://www.askhobson.homes/listings/${listingSlug(l)}`
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url, images: l.heroImage?.startsWith('http') ? [l.heroImage] : undefined }
  }
}

export default async function ListingPage({ params }) {
  const l = await getListing(params.slug)
  if (!l) notFound()
  const url = `https://www.askhobson.homes/listings/${listingSlug(l)}`
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'RealEstateListing',
    name: l.address,
    url,
    description: l.description?.slice(0, 500) || undefined,
    image: l.images.filter((i) => i.startsWith('http')),
    datePosted: l.modifiedAt || undefined,
    offers: { '@type': 'Offer', price: l.price, priceCurrency: 'USD' },
    about: {
      '@type': 'SingleFamilyResidence',
      address: { '@type': 'PostalAddress', streetAddress: l.address.split(',')[0], addressLocality: l.city, addressRegion: l.state, postalCode: l.zip, addressCountry: 'US' },
      numberOfBedrooms: l.beds || undefined,
      numberOfBathroomsTotal: l.baths || undefined,
      floorSize: l.sqft ? { '@type': 'QuantitativeValue', value: l.sqft, unitCode: 'FTK' } : undefined,
      yearBuilt: l.yearBuilt || undefined,
      geo: l.lat && l.lng ? { '@type': 'GeoCoordinates', latitude: l.lat, longitude: l.lng } : undefined
    }
  }
  const facts = [
    l.beds ? `${l.beds} bed` : null,
    l.baths ? `${l.baths} bath` : null,
    l.sqft ? `${l.sqft.toLocaleString('en-US')} sq ft` : null,
    l.yearBuilt ? `Built ${l.yearBuilt}` : null
  ].filter(Boolean)
  const photos = l.images.filter((i) => i.startsWith('http'))
  return (
    <GuidePageLayout eyebrow={money(l.price)} title={l.address}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      {photos[0] && <img src={photos[0]} alt={`${l.address}`} className="w-full rounded-xl" />}
      {photos.length > 1 && (
        <div className="grid grid-cols-3 gap-2">
          {photos.slice(1, 7).map((src, i) => (
            <img key={i} src={src} alt={`${l.address} photo ${i + 2}`} loading="lazy" className="w-full aspect-[4/3] object-cover rounded-lg" />
          ))}
        </div>
      )}
      {facts.length > 0 && <p className="text-[#F5EDE0]">{facts.join(' · ')}</p>}
      {l.description && <p>{l.description}</p>}
      <p>
        Want this one on your shortlist? <GuideLink href="/">Ask Hobson</GuideLink> to compare it with similar homes,
        or call Paul Schafranick at <GuideLink href="tel:+15612557285">561-255-7285</GuideLink>.
      </p>
      {l.office && <p className="text-[12px] text-[#F5EDE0]/40">Listing courtesy of {l.office}.</p>}
    </GuidePageLayout>
  )
}
