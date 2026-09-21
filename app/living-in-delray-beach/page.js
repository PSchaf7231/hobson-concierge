import { GuidePageLayout, GuideH2, GuideLink } from '@/components/GuidePageLayout'

export const metadata = {
  title: 'Living in Delray Beach | Ask Hobson Luxury Concierge',
  description: 'Relocating to Delray Beach? Hobson helps you shortlist $1M+ homes and lifestyle fits from Atlantic Ave to the Intracoastal. Paul Schafranick · VantaSure · 561-255-7285.',
  alternates: { canonical: 'https://www.askhobson.homes/living-in-delray-beach' }
}

export default function LivingInDelrayBeachPage() {
  return (
    <GuidePageLayout eyebrow="Guide" title="Living in Delray Beach">
      <p>
        Delray Beach is not a brochure. It is mornings on or near the sand, evenings that can walk to dinner
        on Atlantic Avenue, and a pace that still feels like a town — even as Palm Beach County keeps growing
        around it.
      </p>
      <p>
        If you are relocating, buying a second home, or trading up into the <strong>$1M+</strong> band, the
        question is rarely "Is Delray nice?" It is: which Delray do you want to wake up in?
      </p>

      <GuideH2>Who this guide is for</GuideH2>
      <ul className="list-disc pl-5 space-y-1">
        <li>Relocators who want coastal Florida without losing a walkable center</li>
        <li>Second-home buyers weighing Delray against Boca or points north</li>
        <li>Anasa Collection clients who care how a house lives, not only how it lists</li>
      </ul>
      <p>No invented comps. No volume brags. Just orientation — then a concierge, then a person.</p>

      <GuideH2>Neighborhood texture</GuideH2>
      <p>
        <strong>Downtown &amp; Atlantic Avenue.</strong> Energy, dining, galleries, people-watching. Ideal if
        you want the social pulse outside your door — and you are honest about sound, parking, and seasonality.
      </p>
      <p>
        <strong>Beach &amp; barrier-island living.</strong> Salt air, sunrise routines, a shorter path to the
        water. Inventory is finite; taste and timing matter more than refreshing a feed.
      </p>
      <p>
        <strong>Intracoastal &amp; water-oriented pockets.</strong> Softer evenings, boat culture, a different
        light at dusk. Ask what "water" means to you — view, dock, or simply the feeling of being near it.
      </p>
      <p>
        <strong>East of the highway vs. polished inland.</strong> Many buyers start east for lifestyle, then
        discover a gated or golf-adjacent pocket that fits family, privacy, or space. Hobson can help you name
        the tradeoffs before you burn weekends on the wrong tours.
      </p>

      <GuideH2>How Hobson helps</GuideH2>
      <p>
        Hobson is the AI concierge for The Anasa Collection and Next Endeavor CRE. Tell him what the right home
        feels like — light, privacy, walkability, guest flow, budget band. He helps you shortlist. When you are
        ready to tour or negotiate, Paul Schafranick at VantaSure Realty picks up: <strong>561-255-7285</strong>.
      </p>
      <p>
        Start on the <GuideLink href="/">Ask Hobson</GuideLink> chat, skim the guide FAQ, or call when the
        shortlist is real.
      </p>

      <GuideH2>Soft next step</GuideH2>
      <p>Living in Delray well is a lifestyle decision first. Let Hobson sharpen the brief. Let Paul handle the doors.</p>
      <p>
        <GuideLink href="/palm-beach-county-homes">Palm Beach County hub</GuideLink> ·{' '}
        <GuideLink href="/boca-raton-luxury-homes">Boca Raton luxury</GuideLink> ·{' '}
        <GuideLink href="/relocating-to-palm-beach-county">Relocating to Palm Beach County</GuideLink> ·{' '}
        <GuideLink href="/palm-beach-waterfront-vs-inland">Waterfront vs inland</GuideLink> ·{' '}
        <a href="https://www.nextendeavorcre.com/" className="text-[#D4AF37] hover:text-[#F5EDE0] transition underline underline-offset-2">Next Endeavor CRE (commercial depth)</a>
      </p>
    </GuidePageLayout>
  )
}
