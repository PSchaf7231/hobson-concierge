import fs from 'fs'
import path from 'path'

// Community guides live as markdown in content/guides. Only slugs listed in
// PUBLISHED are live (page, Guide panel, /guides index, sitemap). Add a slug
// here, plus its GUIDES entry and sitemap line, to publish the next one.
export const PUBLISHED = ['royal-palm-yacht-country-club', 'boca-bridges', 'lotus']

const DIR = path.join(process.cwd(), 'content', 'guides')

export function loadGuide(slug) {
  if (!PUBLISHED.includes(slug)) return null
  const raw = fs.readFileSync(path.join(DIR, `${slug}.md`), 'utf8')
  const m = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/)
  if (!m) return null
  const meta = {}
  for (const line of m[1].split('\n')) {
    const i = line.indexOf(':')
    if (i < 0) continue
    meta[line.slice(0, i).trim()] = line.slice(i + 1).trim().replace(/^"(.*)"$/, '$1')
  }
  return { meta, blocks: parseBlocks(m[2], slug) }
}

// Minimal markdown: # title, ## h2, bullets, paragraphs, **bold**, *italic*,
// [links](/internal). Links to guides that are not published yet are dropped.
function parseBlocks(body, slug) {
  const blocks = []
  let list = null
  for (const para of body.split(/\n{2,}/)) {
    const lines = para.split('\n')
    const t = para.trim()
    if (!t || t === 'Guide') continue
    if (t.startsWith('# ')) { blocks.push({ type: 'title', text: t.slice(2) }); continue }
    if (t.startsWith('## ')) { blocks.push({ type: 'h2', text: t.slice(3) }); continue }
    if (lines.every((l) => l.startsWith('- '))) {
      blocks.push({ type: 'ul', items: lines.map((l) => l.slice(2)) })
      continue
    }
    blocks.push({ type: 'p', text: lines.join(' ') })
  }
  return blocks
}

export function inlineParts(text, isLive) {
  // Returns [{t:'text'|'b'|'i'|'a', text, href}]
  const parts = []
  const re = /\*\*([^*]+)\*\*|\*([^*]+)\*|\[([^\]]+)\]\(([^)]+)\)/g
  let last = 0, m
  while ((m = re.exec(text))) {
    if (m.index > last) parts.push({ t: 'text', text: text.slice(last, m.index) })
    if (m[1]) parts.push({ t: 'b', text: m[1] })
    else if (m[2]) parts.push({ t: 'i', text: m[2] })
    else if (isLive(m[4])) parts.push({ t: 'a', text: m[3], href: m[4] })
    last = re.lastIndex
  }
  if (last < text.length) parts.push({ t: 'text', text: text.slice(last) })
  // Drop " · " separators that no longer sit between two links.
  return parts.filter((p, i) => p.t !== 'text' || p.text.trim() !== '·' ||
    (parts[i - 1]?.t === 'a' && parts.slice(i + 1).some((q) => q.t === 'a')))
}

const ALL = fs.readdirSync(DIR).filter((f) => f.endsWith('.md')).map((f) => f.replace(/\.md$/, ''))
export const isLiveHref = (href) => {
  const slug = href.replace(/^\//, '')
  return !ALL.includes(slug) || PUBLISHED.includes(slug)
}
