import { GuidePageLayout, GuideH2, GuideLink } from '@/components/GuidePageLayout'

export const metadata = {
  title: 'Palm Beach County Luxury Real Estate | Ask Hobson',
  description: 'Palm Beach County luxury residential and buyer-side commercial guidance under one roof — Anasa Collection and Next Endeavor CRE. Start with Hobson or call 561-255-7285.',
  alternates: { canonical: 'https://www.askhobson.homes/palm-beach-county-homes' }
}

export default function PalmBeachCountyHomesPage() {
  return (
    <GuidePageLayout eyebrow="Guide" title="Palm Beach County — One County, One Advisor, One Concierge">
      <p>
        Palm Beach County is a corridor of distinct towns that share light, water, and ambition — Delray Beach,
        Boca Raton, Palm Beach, West Palm Beach, and the communities between. Buyers who treat it as one
        interchangeable suburb usually overpay in time, if not in dollars.
      </p>
      <p>
        Ask Hobson is built for that orientation problem: an AI concierge for The Anasa Collection (luxury
        residential, generally $1M+) and Next Endeavor CRE (buyer-side commercial, especially medical NNN).
        Behind the product: Paul Schafranick, VantaSure Realty.
      </p>

      <GuideH2>How to think about the county</GuideH2>
      <ul className="list-disc pl-5 space-y-1">
        <li><strong>Coastal lifestyle towns</strong> (Delray, parts of Boca, barrier islands): walkability, beach access, Intracoastal culture. Start with <GuideLink href="/living-in-delray-beach">Living in Delray Beach</GuideLink> or <GuideLink href="/boca-raton-luxury-homes">Boca Raton luxury homes</GuideLink>.</li>
        <li><strong>Island &amp; legacy Palm Beach posture:</strong> discretion, provenance, a different social map — conversations that belong on the phone early.</li>
        <li><strong>West Palm &amp; northern corridors:</strong> urban energy, employment gravity, and residential pockets that serve primary living as much as leisure.</li>
        <li><strong>One advisor when life is dual-track:</strong> a home under Anasa and an income property under Next Endeavor. Commercial depth stays on{' '}
          <a href="https://www.nextendeavorcre.com/" className="text-[#D4AF37] hover:text-[#F5EDE0] transition underline underline-offset-2">nextendeavorcre.com</a> so Hobson remains sharp, not a duplicate essay.
        </li>
      </ul>

      <GuideH2>A practical way to start</GuideH2>
      <p>
        Most serious buyers do not need twenty blog posts. They need a clear brief, a short list, and a trusted
        local who answers the phone. Use Hobson to name constraints — budget band, water vs. quiet, primary vs.
        seasonal, timeline. Use the map and Save Search to pressure-test that brief. Then bring the shortlist to
        Paul before you spend a week on mismatched tours.
      </p>
      <p>
        Sellers in the Anasa band get the same posture in reverse: the house is an asset, marketing should feel
        intentional, and discretion is part of the service.
      </p>

      <GuideH2>What we will not do on this page</GuideH2>
      <p>
        We will not invent market statistics, sold counts, or testimonials. Palm Beach County moves; your brief
        is personal. Orientation first — then representation. We also will not paste the full Next Endeavor
        commercial essay here; that story has a proper home on nextendeavorcre.com.
      </p>

      <GuideH2>Working with Hobson, then Paul</GuideH2>
      <ol className="list-decimal pl-5 space-y-1">
        <li>Tell Hobson what "home" or "investment" should feel like.</li>
        <li>Shortlist on the main experience — chat, map, Save Search.</li>
        <li>Call Paul when you are ready to tour, list, or structure a commercial purchase: <strong>561-255-7285</strong>.</li>
      </ol>

      <GuideH2>Soft next step</GuideH2>
      <p>Palm Beach County is large. Your brief should not be. Ask Hobson to narrow it — then let Paul handle the rest.</p>
      <p>
        <GuideLink href="/faq">FAQ</GuideLink> · <GuideLink href="/">Ask Hobson</GuideLink> ·{' '}
        <a href="https://www.nextendeavorcre.com/" className="text-[#D4AF37] hover:text-[#F5EDE0] transition underline underline-offset-2">Next Endeavor CRE</a>
      </p>
    </GuidePageLayout>
  )
}
