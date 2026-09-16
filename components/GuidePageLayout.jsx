const NAVY = '#0A1628'
const GOLD = '#D4AF37'
const SERIF = '"Cormorant Garamond", "Playfair Display", Georgia, serif'

export function GuidePageLayout({ eyebrow, title, children }) {
  return (
    <div className="min-h-screen" style={{ background: NAVY }}>
      <header className="border-b border-[#D4AF37]/20">
        <div className="max-w-3xl mx-auto px-6 py-4 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2">
            <img src="/anasa.png" alt="Anasa Collection" className="h-8 w-11 object-contain" />
            <span className="text-[#F5EDE0] text-lg" style={{ fontFamily: SERIF, fontWeight: 500 }}>Ask Hobson</span>
          </a>
          <a href="/" className="text-[10px] uppercase tracking-[0.22em] text-[#D4AF37] hover:text-[#F5EDE0] transition">
            ← Talk to Hobson
          </a>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-14">
        <p className="text-[10px] uppercase tracking-[0.28em] mb-3" style={{ color: `${GOLD}CC` }}>{eyebrow}</p>
        <h1 className="text-3xl sm:text-4xl text-[#F5EDE0] mb-8" style={{ fontFamily: SERIF, fontWeight: 500 }}>{title}</h1>
        <div className="prose-guide text-[#F5EDE0]/80 leading-[1.8] space-y-5 text-[15px]">
          {children}
        </div>
      </main>

      <footer className="border-t border-[#D4AF37]/15 py-6">
        <div className="max-w-3xl mx-auto px-6 text-[11px] text-[#F5EDE0]/40">
          <p className="text-[#F5EDE0]/60">Paul Schafranick · VantaSure Realty</p>
          <p>32 SE 2nd Ave Ste 339, Delray Beach, FL 33444 · <a href="tel:+15612557285" className="hover:text-[#D4AF37] transition">561-255-7285</a></p>
        </div>
      </footer>
    </div>
  )
}

export function GuideH2({ children }) {
  return <h2 className="text-xl text-[#F5EDE0] mt-8 mb-2" style={{ fontFamily: SERIF, fontWeight: 500 }}>{children}</h2>
}

export function GuideLink({ href, children }) {
  return <a href={href} className="text-[#D4AF37] hover:text-[#F5EDE0] transition underline underline-offset-2">{children}</a>
}

export default GuidePageLayout
