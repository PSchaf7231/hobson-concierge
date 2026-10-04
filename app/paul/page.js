import { ShareButton } from './ShareButton'

const PHONE_DISPLAY = '(561) 255-7285'
const PHONE_HREF = 'tel:+15612557285'
const SMS_HREF = 'sms:+15612557285'
const EMAIL = 'Paul@askhobson.homes'
const BROKERAGE_LINE = 'Paul Robert Schafranick is a licensed real estate professional with VantaSure Realty.'

const SERIF = '"Cormorant Garamond", "Playfair Display", Georgia, serif'
const GOLD = '#C9A227'

export const metadata = {
  title: 'Paul Schafranick | Palm Beach Real Estate',
  description: 'Residential and commercial real estate in Palm Beach County, plus AI websites and follow-up systems for local businesses. Call or text (561) 255-7285.',
  alternates: { canonical: 'https://paul.askhobson.homes' },
  openGraph: {
    type: 'profile',
    url: 'https://paul.askhobson.homes',
    title: 'Paul Schafranick | Palm Beach Real Estate',
    description: 'Residential and commercial real estate in Palm Beach County. Save my contact, call, or text.',
    images: ['/paul/og.jpg']
  }
}

// Clawd, the Claude Code mascot, as pixel art on a 14x11 grid.
function Clawd() {
  const C = '#CC785C'
  const px = (x, y, w = 1, h = 1, fill = C) => <rect key={`${x}-${y}-${fill}`} x={x} y={y} width={w} height={h} fill={fill} />
  return (
    <svg width="18" height="15" viewBox="0 0 14 11" shapeRendering="crispEdges" aria-hidden="true">
      {/* head bump */}
      {px(5, 0, 4, 1)}
      {px(4, 1, 6, 1)}
      {/* body block */}
      {px(1, 2, 12, 6)}
      {/* eyes */}
      {px(4, 4, 1, 2, '#2A1711')}
      {px(9, 4, 1, 2, '#2A1711')}
      {/* legs */}
      {px(2, 8, 2, 2)}
      {px(6, 8, 2, 2)}
      {px(10, 8, 2, 2)}
    </svg>
  )
}

function Eyebrow({ children, color = GOLD }) {
  return (
    <p className="text-center text-[11px] font-semibold uppercase tracking-[0.32em]" style={{ color }}>
      {children}
    </p>
  )
}

function OutlineLink({ href, children, className = '' }) {
  return (
    <a
      href={href}
      className={`block w-full rounded-full border py-3.5 text-center text-[15px] font-medium transition ${className}`}
    >
      {children}
    </a>
  )
}

export default function PaulCard() {
  return (
    <div
      className="min-h-screen sm:py-10"
      style={{ background: 'radial-gradient(900px 600px at 50% -10%, rgba(201,162,39,0.14), transparent 60%), #070F1D' }}
    >
      <main className="mx-auto max-w-[460px] overflow-hidden sm:rounded-[28px] sm:shadow-[0_30px_80px_rgba(0,0,0,0.55)] sm:ring-1 sm:ring-[#C9A227]/20">

        {/* Hero */}
        <section className="bg-[#F7F3EA] px-6 pb-8 pt-10 text-center">
          <div className="mx-auto h-28 w-28 rounded-full p-[3px]" style={{ background: 'linear-gradient(140deg, #E6C878, #A88418)' }}>
            <img src="/paul/headshot.jpg" alt="Paul Schafranick" className="h-full w-full rounded-full border-[3px] border-[#F7F3EA] object-cover" />
          </div>
          <h1 className="mt-5 text-[2.1rem] leading-tight text-[#0A1628]" style={{ fontFamily: SERIF, fontWeight: 600 }}>
            Paul Schafranick
          </h1>
          <p className="mx-auto mt-2 max-w-[300px] text-[14px] leading-relaxed text-[#4A5568]">
            Real estate in Palm Beach. AI websites and follow-up systems for local businesses.
          </p>

          <a
            href="/paul/vcard"
            className="mt-7 block w-full rounded-full bg-[#0A1628] py-4 text-[13px] font-semibold uppercase tracking-[0.26em] text-[#E6C878] shadow-md transition hover:bg-[#122340]"
          >
            Save my contact
          </a>
          <div className="mt-3 grid grid-cols-3 gap-2.5">
            {[
              { label: 'Call', href: PHONE_HREF },
              { label: 'Text', href: SMS_HREF },
              { label: 'Email', href: `mailto:${EMAIL}` }
            ].map((b) => (
              <a
                key={b.label}
                href={b.href}
                className="rounded-full border border-[#C9A227]/60 bg-white/60 py-3 text-[14px] font-medium text-[#0A1628] transition hover:border-[#C9A227] hover:bg-white"
              >
                {b.label}
              </a>
            ))}
          </div>
        </section>

        {/* Residential */}
        <section className="bg-[#0A1628] px-6 py-10">
          <Eyebrow>Residential Real Estate</Eyebrow>
          <figure className="mt-5">
            <img src="/paul/team.jpg" alt="Paul with Hobson, Madison, and the team" className="w-full rounded-2xl ring-1 ring-[#C9A227]/25" />
            <figcaption className="mt-2.5 text-center text-[12px] italic text-[#F5EDE0]/45">
              The team. Only one of us needs coffee.
            </figcaption>
          </figure>
          <h2 className="mt-6 text-center text-[1.75rem] text-[#F5EDE0]" style={{ fontFamily: SERIF, fontWeight: 500 }}>
            Palm Beach Real Estate Pros
          </h2>
          <p className="mt-1.5 text-center text-[14px] leading-relaxed text-[#F5EDE0]/65">
            Buying, selling, and renting across Palm Beach County.
          </p>
          <div className="mt-6 space-y-3">
            <a
              href="https://www.askhobson.homes"
              className="block w-full rounded-full py-3.5 text-center text-[15px] font-semibold text-[#2A1F08] shadow-md transition hover:brightness-110"
              style={{ background: 'linear-gradient(to bottom, #E6C878 0%, #C9A227 60%, #A88418 100%)' }}
            >
              Talk to Hobson
            </a>
            <OutlineLink href="https://palmbeachrentalpros.vercel.app" className="border-[#C9A227]/45 text-[#F5EDE0] hover:bg-[#C9A227]/10">
              Current Rentals
            </OutlineLink>
          </div>
        </section>

        {/* Commercial */}
        <section className="bg-[#111318] px-6 py-10 text-center">
          <Eyebrow>Commercial Real Estate</Eyebrow>
          <h2 className="mt-4 text-[1.75rem] text-[#F5EDE0]" style={{ fontFamily: SERIF, fontWeight: 500 }}>
            Next Endeavor CRE
          </h2>
          <p className="mt-1.5 text-[14px] leading-relaxed text-[#F5EDE0]/65">
            Medical and NNN investment properties, sourced nationwide.
          </p>
          <p className="mx-auto mt-4 max-w-[320px] rounded-xl border border-[#C9A227]/25 px-4 py-3 text-[13px] leading-relaxed text-[#E6C878]">
            $15,000 toward your legal fees on qualifying purchases over $3M.
          </p>
          <div className="mt-6">
            <OutlineLink href="https://www.nextendeavorcre.com" className="border-[#C9A227]/45 text-[#F5EDE0] hover:bg-[#C9A227]/10">
              Visit Next Endeavor CRE
            </OutlineLink>
          </div>
        </section>

        {/* Set & Forget Media */}
        <section className="bg-[#FAF9F6] px-6 py-10 text-center">
          <Eyebrow color="#6D28D9">Set &amp; Forget Media</Eyebrow>
          <h2 className="mt-4 text-[1.75rem] leading-snug text-[#4C1D95]" style={{ fontFamily: SERIF, fontWeight: 600 }}>
            Websites that bring customers back.
          </h2>
          <p className="mx-auto mt-2 max-w-[320px] text-[14px] leading-relaxed text-[#6B6082]">
            Your site, follow-up, and reviews, built and run for you on autopilot.
          </p>
          <div className="mt-6 space-y-3 text-left">
            {[
              { name: 'Set & Forget Media', sub: 'setandforgetmedia.com', href: 'https://setandforgetmedia.com' },
              { name: 'Heaven Lounge', sub: 'Sample site', href: 'https://heaven.setandforgetmedia.com' }
            ].map((s) => (
              <a
                key={s.name}
                href={s.href}
                className="flex items-center justify-between rounded-xl border border-[#6D28D9]/15 border-l-[3px] border-l-[#6D28D9] bg-white px-4 py-3.5 transition hover:border-[#6D28D9]/35 hover:shadow-sm"
              >
                <span>
                  <span className="block text-[17px] text-[#3F3358]" style={{ fontFamily: SERIF, fontWeight: 600 }}>{s.name}</span>
                  <span className="block text-[12px] text-[#6B6082]">{s.sub}</span>
                </span>
                <span className="text-[#6D28D9]" aria-hidden="true">→</span>
              </a>
            ))}
          </div>
          <a
            href={PHONE_HREF}
            className="mt-6 block w-full rounded-full bg-[#6D28D9] py-3.5 text-[15px] font-semibold text-white shadow-md transition hover:bg-[#5B21B6]"
          >
            Want one? Call Paul at {PHONE_DISPLAY}
          </a>
          <div className="mt-4 flex items-center justify-center gap-2 text-[11px] tracking-wide text-[#6B6082]/70">
            <Clawd />
            <span>Built with Claude Code and Grok</span>
          </div>
        </section>

        {/* Share */}
        <footer className="bg-[#070B12] px-6 pb-10 pt-9 text-center">
          <ShareButton />
          <div className="mt-6 grid grid-cols-2 gap-2.5">
            {[
              { label: 'Instagram', href: 'https://www.instagram.com/paulschafranick_realtor/' },
              { label: 'YouTube', href: 'https://www.youtube.com/@palmbeachrealestatepros' },
              { label: 'Facebook', href: 'https://www.facebook.com/PSchafranick/' },
              { label: 'LinkedIn', href: 'https://www.linkedin.com/in/paul-schafranick-ab8087237' }
            ].map((s) => (
              <a
                key={s.label}
                href={s.href}
                className="rounded-full border border-white/15 py-2.5 text-[13px] text-[#F5EDE0]/80 transition hover:border-white/35"
              >
                {s.label}
              </a>
            ))}
          </div>
          <div className="mx-auto mt-7 w-32 rounded-xl bg-white p-2.5">
            <img src="/paul/qr.svg" alt="QR code for paul.askhobson.homes" className="h-full w-full" />
          </div>
          <p className="mt-3 text-[10px] uppercase tracking-[0.3em] text-[#F5EDE0]/40">Scan to share this card</p>
          <p className="mx-auto mt-8 max-w-[320px] text-[10px] leading-relaxed text-[#F5EDE0]/30">{BROKERAGE_LINE}</p>
        </footer>
      </main>
    </div>
  )
}
