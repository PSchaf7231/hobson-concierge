import Script from 'next/script'
import { GuidePageLayout, GuideH2, GuideLink } from '@/components/GuidePageLayout'
import { articleSchema } from '@/lib/seo/article-schema'

export const metadata = {
  title: 'Relocating to Palm Beach County | Ask Hobson Concierge',
  description: 'Moving to Palm Beach County? A calm brief on lifestyle fit, Delray vs Boca vs further north, and how Hobson plus Paul Schafranick help you shortlist without the portal noise. 561-255-7285.',
  alternates: { canonical: 'https://www.askhobson.homes/relocating-to-palm-beach-county' }
}

const schema = articleSchema({
  headline: 'Relocating to Palm Beach County — a calm starting brief',
  description: 'Moving to Palm Beach County? A calm brief on lifestyle fit, Delray vs Boca vs further north, and how Hobson plus Paul Schafranick help you shortlist without the portal noise.',
  path: '/relocating-to-palm-beach-county',
  datePublished: '2026-09-23'
})

export default function RelocatingToPalmBeachCountyPage() {
  return (
    <>
      <Script
        id="schema-article-relocating-to-palm-beach-county"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <GuidePageLayout eyebrow="Guide" title="Relocating to Palm Beach County — start with how you live">
        <p>
          Most relocators do not fail because they cannot find listings. They fail because they pick a zip
          code before they pick a rhythm: beach mornings vs Avenue nights, golf community vs downtown walk,
          full-time vs snowbird months.
        </p>

        <GuideH2>Questions worth answering before you tour</GuideH2>
        <ul className="list-disc pl-5 space-y-1">
          <li>How many months a year will you actually be here?</li>
          <li>Do you want to walk to dinner, or is a short drive fine?</li>
          <li>Guests, aging parents, remote work — what does the house need to <em>do</em>?</li>
          <li>Flood, insurance, and HOA tolerance — get local advice early, not after you fall in love with a kitchen.</li>
        </ul>

        <GuideH2>Delray vs Boca vs "further up" (simple)</GuideH2>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>Delray:</strong> town energy, Atlantic Avenue, compact coastal living.</li>
          <li><strong>Boca:</strong> polish, clubs, east-west variety, strong luxury inventory.</li>
          <li><strong>Palm Beach / northern pockets:</strong> different social and price texture — say the word to Hobson if that is your lane.</li>
        </ul>

        <GuideH2>How we work</GuideH2>
        <ol className="list-decimal pl-5 space-y-1">
          <li>Talk to Hobson — describe the feeling, not only bedrooms.</li>
          <li>Shortlist without fake urgency.</li>
          <li>Paul Schafranick (VantaSure Realty) on <strong>561-255-7285</strong> when you want a human plan.</li>
        </ol>
        <p>
          Investment property or medical NNN while you move? Start at{' '}
          <a href="https://www.nextendeavorcre.com/" className="text-[#D4AF37] hover:text-[#F5EDE0] transition underline underline-offset-2">nextendeavorcre.com</a>.
        </p>

        <GuideH2>Soft next step</GuideH2>
        <p>Pick the rhythm first. Let Hobson sharpen the brief, then let Paul handle the doors.</p>
        <p>
          <GuideLink href="/palm-beach-county-homes">Palm Beach County hub</GuideLink> ·{' '}
          <GuideLink href="/living-in-delray-beach">Living in Delray Beach</GuideLink> ·{' '}
          <GuideLink href="/boca-raton-luxury-homes">Boca Raton luxury homes</GuideLink> ·{' '}
          <GuideLink href="/palm-beach-waterfront-vs-inland">Waterfront vs inland</GuideLink> ·{' '}
          <GuideLink href="/faq">FAQ</GuideLink>
        </p>
      </GuidePageLayout>
    </>
  )
}
