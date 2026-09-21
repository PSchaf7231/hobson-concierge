import { GuidePageLayout, GuideH2, GuideLink } from '@/components/GuidePageLayout'

export const metadata = {
  title: 'Boca Raton Luxury Homes | Ask Hobson Concierge',
  description: 'Boca Raton luxury and waterfront search with Hobson, your AI concierge for The Anasa Collection. Local advisor Paul Schafranick. Call 561-255-7285.',
  alternates: { canonical: 'https://www.askhobson.homes/boca-raton-luxury-homes' }
}

export default function BocaRatonLuxuryHomesPage() {
  return (
    <GuidePageLayout eyebrow="Guide" title="Boca Raton Luxury Homes — A Concierge, Not a Feed">
      <p>
        Boca Raton luxury is broad on purpose: east-side water and country-club polish, gated calm west of the
        highway, estates that read as private resorts. The mistake is treating it like one ZIP code with one
        personality.
      </p>
      <p>
        The Anasa Collection focuses on homes generally <strong>$1M and above</strong> — marketing and
        representation with discretion. Hobson, your AI concierge, helps you articulate the brief before you
        drown in listings.
      </p>

      <GuideH2>What "luxury" usually means here</GuideH2>
      <p>Not a slogan — a set of tradeoffs:</p>
      <ul className="list-disc pl-5 space-y-1">
        <li><strong>East Boca &amp; water-oriented.</strong> Intracoastal access, ocean-adjacent living, established streets with a coastal posture. Scarcity is real; clarity of brief matters.</li>
        <li><strong>Country club &amp; amenity-forward.</strong> Golf, tennis, social calendars, gated rhythms. Ideal when lifestyle programming is part of the purchase, not an afterthought.</li>
        <li><strong>West Boca scale.</strong> Often more land, newer construction pockets, and a different commute story. Still "Boca" on paper — a different morning in practice.</li>
      </ul>
      <p>Hobson will not invent sold prices or neighborhood rankings. He will help you say, clearly: water vs. acreage, social vs. private, primary vs. seasonal.</p>

      <GuideH2>Relocating or moving up</GuideH2>
      <p>
        If you are coming from another metro, Boca's brand is familiar; the micro-decisions are not. School
        calendars, club waitlists, flood and insurance conversations, and how you actually use weekends — those
        shape the shortlist more than a pretty hero image. If you already live in Palm Beach County and are
        trading up, Anasa's job is quieter: protect equity, market with taste, and keep the process discreet.
      </p>
      <p>
        Compare notes with <GuideLink href="/living-in-delray-beach">Living in Delray Beach</GuideLink> if you
        want a more walkable downtown pulse, or the <GuideLink href="/palm-beach-county-homes">Palm Beach County hub</GuideLink> if you are still choosing a town.
      </p>

      <GuideH2>How to search without the noise</GuideH2>
      <ol className="list-decimal pl-5 space-y-1">
        <li>Open <GuideLink href="/">Ask Hobson</GuideLink> and describe the feeling of the right house.</li>
        <li>Use filters and Save Search as a thinking tool — not a substitute for taste.</li>
        <li>When you want doors unlocked or a private inventory conversation, call Paul Schafranick at <strong>561-255-7285</strong>.</li>
      </ol>

      <GuideH2>Residential here; commercial next door</GuideH2>
      <p>
        Buying or selling a Boca residence under Anasa does not require you to ignore the investment side of
        your life. Buyer-side medical NNN and related CRE live with Next Endeavor — full depth on{' '}
        <a href="https://www.nextendeavorcre.com/" className="text-[#D4AF37] hover:text-[#F5EDE0] transition underline underline-offset-2">nextendeavorcre.com</a>. Hobson can bridge; Paul handles both conversations when that is useful.
      </p>

      <GuideH2>Soft next step</GuideH2>
      <p>Boca rewards a sharp brief. Start with Hobson. Finish with Paul.</p>
      <p>
        <GuideLink href="/living-in-delray-beach">Living in Delray Beach</GuideLink> ·{' '}
        <GuideLink href="/palm-beach-county-homes">Palm Beach County homes</GuideLink> ·{' '}
        <GuideLink href="/relocating-to-palm-beach-county">Relocating to Palm Beach County</GuideLink> ·{' '}
        <GuideLink href="/palm-beach-waterfront-vs-inland">Waterfront vs inland</GuideLink> ·{' '}
        <GuideLink href="/faq">FAQ</GuideLink>
      </p>
    </GuidePageLayout>
  )
}
