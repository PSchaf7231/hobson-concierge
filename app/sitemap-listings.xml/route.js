import { fetchLiveMLS } from '@/lib/spark'
import { listingSlug, isPalmBeachCounty } from '@/lib/listings'

// Loaded on request (not at build time): walking the whole feed is slow, and a
// slow build would block every deploy. The CDN caches the result for an hour.
export const dynamic = 'force-dynamic'
export const maxDuration = 60

export async function GET() {
  const listings = await fetchLiveMLS({ prefs: { lean: true }, limit: 5000 })
  // null means the feed errored: don't publish (and cache) an empty sitemap over a real one.
  if (listings === null) {
    return new Response('Listings feed unavailable', { status: 503, headers: { 'Cache-Control': 'no-store' } })
  }
  const urls = listings.filter(isPalmBeachCounty).map((l) => {
    const lastmod = l.modifiedAt ? `<lastmod>${new Date(l.modifiedAt).toISOString()}</lastmod>` : ''
    return `  <url><loc>https://www.askhobson.homes/listings/${listingSlug(l)}</loc>${lastmod}</url>`
  })
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>\n`
  return new Response(xml, { headers: {
    'Content-Type': 'application/xml; charset=utf-8',
    'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400'
  } })
}
