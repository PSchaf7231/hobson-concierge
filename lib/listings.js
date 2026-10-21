// One crawlable URL per MLS listing: /listings/<address-words>-<ListingKey>.
// The key at the end is what we look the listing up by; the words are for people and search.
export function listingSlug(l) {
  const words = String(l.address || 'listing')
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80)
    .replace(/-+$/, '')
  const key = String(l.id).replace(/^mls_/, '')
  return `${words}-${key}`
}

export function listingKeyFromSlug(slug) {
  const m = /-([A-Za-z0-9]+)$/.exec(slug || '')
  return m ? m[1] : null
}

export const money = (n) => '$' + Number(n).toLocaleString('en-US')
