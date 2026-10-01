import { GuidePageLayout, GuideLink } from '@/components/GuidePageLayout'
import { GUIDES } from '@/lib/seo/guides'

export const metadata = {
  title: 'Palm Beach County Guides | Ask Hobson Luxury Concierge',
  description: 'Guides to living in Delray Beach, Boca Raton luxury homes, relocating to Palm Beach County, and waterfront vs inland — from Hobson and Paul Schafranick, VantaSure Realty. 561-255-7285.',
  alternates: { canonical: 'https://www.askhobson.homes/guides' }
}

export default function GuidesIndexPage() {
  return (
    <GuidePageLayout eyebrow="Guide" title="Palm Beach County Guides">
      <ul className="space-y-6 list-none p-0">
        {GUIDES.map((g) => (
          <li key={g.href}>
            <a href={g.href} className="text-xl text-[#F5EDE0] hover:text-[#D4AF37] transition" style={{ fontFamily: '"Cormorant Garamond", "Playfair Display", Georgia, serif', fontWeight: 500 }}>
              {g.label} →
            </a>
            <p className="mt-1">{g.blurb}</p>
          </li>
        ))}
      </ul>
      <p className="pt-4">
        Have a question first? See the <GuideLink href="/faq">FAQ</GuideLink>, or <GuideLink href="/">talk to Hobson</GuideLink>.
      </p>
    </GuidePageLayout>
  )
}
