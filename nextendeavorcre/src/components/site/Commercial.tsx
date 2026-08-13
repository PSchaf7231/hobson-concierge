import commercialImg from "@/assets/commercial-medical.jpg";

const priorities = [
  {
    title: "We Only Work for the Buyer",
    body: "We don't list commercial properties, so we're never on both sides of a deal. When you hire us, we work for you and no one else.",
  },
  {
    title: "Truly Passive Income",
    body: "We focus on triple-net (NNN) leases, where the tenant pays the taxes, insurance, and upkeep. You own the building and collect the rent. That is it.",
  },
  {
    title: "Deals You Won't Find Online",
    body: "A lot of the best medical properties never hit the open market. Our relationships with national operators and private owners get you in early.",
  },
];

export function Commercial() {
  return (
    <section id="commercial" className="relative overflow-hidden bg-ink text-ivory">
      <div className="mx-auto max-w-7xl px-6 pb-2 pt-12 lg:px-10 lg:pt-16">
        <div className="max-w-3xl">
          <p className="eyebrow">Next Endeavor CRE · Commercial Division</p>
          <h2 className="mt-6 font-display text-4xl leading-[1.08] text-ivory sm:text-5xl lg:text-[3.4rem]">
            Medical Properties Built for Steady, Passive Income.
            <span className="block text-gold-soft">Backed by Tenants Like DaVita and Fresenius.</span>
          </h2>
          <div className="mt-8 h-px w-16 bg-gold/70" />
          <div className="mt-8 space-y-5 text-[15px] leading-[1.9] text-silver/90">
            <p>
              Next Endeavor CRE helps investors buy medical buildings that pay
              steady, predictable income. We work only for the buyer, whether
              you are a private investor, a doctor, or a family office looking
              for a safe place to put your money to work.
            </p>
            <p>
              We focus on triple-net medical properties in the $3M to $20M range:
              dialysis clinics and ambulatory surgery centers leased to names
              like DaVita and Fresenius. These are stable, long-term tenants, so
              your income stays passive and your money stays protected. On every
              purchase over $3M, we also put $15,000 back toward your legal and
              closing costs.
            </p>
          </div>
          <a
            href="#contact"
            className="mt-10 inline-flex items-center gap-3 border border-gold/70 px-7 py-4 text-[11px] uppercase tracking-[0.28em] text-gold transition-all hover:bg-gold hover:text-ink"
          >
            Schedule a Consultation
          </a>
        </div>
      </div>

      {/* Full-bleed medical building image with navy bleed at top/bottom */}
      <div className="relative left-1/2 w-screen -translate-x-1/2">
        <img
          src={commercialImg}
          alt="Triple-net leased medical office building"
          loading="lazy"
          className="block h-screen min-h-[680px] w-full object-cover"
        />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-ink to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-ink to-transparent" />
      </div>

      <div className="mx-auto max-w-7xl px-6 py-10 lg:px-10 lg:py-12">
        <div className="grid gap-6 md:grid-cols-3">
          {priorities.map((item) => (
            <article
              key={item.title}
              className="relative flex flex-col border border-gold/60 bg-ink-elevated px-8 pb-10 pt-10"
            >
              <p className="eyebrow text-gold">What You Get</p>
              <h3 className="mt-4 font-display text-2xl leading-snug text-ivory">
                {item.title}
              </h3>
              <p className="mt-5 text-[14.5px] leading-[1.85] text-silver/90">
                {item.body}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}