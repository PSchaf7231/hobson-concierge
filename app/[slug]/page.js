import { notFound } from 'next/navigation'
import { GuidePageLayout, GuideH2, GuideLink } from '@/components/GuidePageLayout'
import { PUBLISHED, loadGuide, inlineParts, isLiveHref } from '@/lib/guide-content'
import { articleSchema } from '@/lib/seo/article-schema'

export const dynamicParams = false

export function generateStaticParams() {
  return PUBLISHED.map((slug) => ({ slug }))
}

export function generateMetadata({ params }) {
  const g = loadGuide(params.slug)
  if (!g) return {}
  return {
    title: g.meta.title_tag,
    description: g.meta.meta_description,
    alternates: { canonical: `https://www.askhobson.homes/${params.slug}` }
  }
}

function Inline({ text }) {
  return inlineParts(text, isLiveHref).map((p, i) => {
    if (p.t === 'b') return <strong key={i}>{p.text}</strong>
    if (p.t === 'i') return <em key={i}>{p.text}</em>
    if (p.t === 'a') return <GuideLink key={i} href={p.href}>{p.text}</GuideLink>
    return <span key={i}>{p.text}</span>
  })
}

export default function CommunityGuidePage({ params }) {
  const g = loadGuide(params.slug)
  if (!g) notFound()
  const title = g.blocks.find((b) => b.type === 'title')?.text || g.meta.title_tag
  const schema = articleSchema({
    headline: title,
    description: g.meta.meta_description,
    path: `/${params.slug}`,
    datePublished: g.meta.date_published || '2026-10-21'
  })
  return (
    <GuidePageLayout eyebrow="Guide" title={title}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      {g.blocks.filter((b) => b.type !== 'title').map((b, i) => {
        if (b.type === 'h2') return <GuideH2 key={i}>{b.text}</GuideH2>
        if (b.type === 'ul') return (
          <ul key={i} className="list-disc pl-5 space-y-1">
            {b.items.map((it, j) => <li key={j}><Inline text={it} /></li>)}
          </ul>
        )
        return <p key={i}><Inline text={b.text} /></p>
      })}
    </GuidePageLayout>
  )
}
