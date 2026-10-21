import { fetchLiveMLS } from '@/lib/spark'
import { listingSlug } from '@/lib/listings'

export const revalidate = 3600

export async function GET() {
  const listings = await fetchLiveMLS({ limit: 5000 })
  // null means the feed errored: don't publish (and cache) an empty sitemap over a real one.
  if (listings === null) {
    return new Response('Listings feed unavailable', { status: 503, headers: { 'Cache-Control': 'no-store' } })
  }
  const urls = listings.map((l) => {
    const lastmod = l.modifiedAt ? `<lastmod>${new Date(l.modifiedAt).toISOString()}</lastmod>` : ''
    return `  <url><loc>https://www.askhobson.homes/listings/${listingSlug(l)}</loc>${lastmod}</url>`
  })
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>\n`
  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } })
}
