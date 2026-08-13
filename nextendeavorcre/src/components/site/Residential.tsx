import residentialImg from "@/assets/residential-luxury.jpg";

export function Residential() {
  return (
    <section id="residential" className="overflow-hidden bg-ink-deep text-ivory">
      <div className="mx-auto max-w-7xl px-6 pb-2 pt-12 lg:px-10 lg:pt-16">
        <div className="max-w-3xl">
          <p className="eyebrow">The Anasa Collection • Residential Division</p>
          <h2 className="mt-5 font-display text-3xl leading-[1.05] sm:text-5xl">
            The Anasa Collection
            <span className="block text-gold">Luxury Homes, Done Differently</span>
          </h2>

          <p className="mt-8 font-display text-2xl italic text-ivory/85">
            The art of living well.
          </p>

          <div className="mt-6 space-y-5 text-[15px] leading-[1.9] text-silver/85">
            <p>
              The Anasa Collection is our luxury home division, for properties
              priced <strong className="text-ivory">$1M and above</strong>. We
              do not just list your home and wait. We treat it like the valuable
              asset it is and market it to the right buyers, the right way.
            </p>
            <p>
              You get white-glove service, serious marketing exposure, and
              complete discretion from start to finish. The goal is simple: get
              you top dollar, keep more of your equity in your pocket, and make
              the whole move feel easy.
            </p>
          </div>

          <a
            href="#contact"
            className="mt-10 inline-flex items-center gap-3 border border-gold/70 px-7 py-4 text-[11px] uppercase tracking-[0.28em] text-gold transition-all hover:bg-gold hover:text-ink"
          >
            Request a Private Introduction
            <span>→</span>
          </a>
        </div>
      </div>

      <div className="relative left-1/2 w-screen -translate-x-1/2">
        <img
          src={residentialImg}
          alt="Luxury Palm Beach mansion interior"
          loading="lazy"
          width={1600}
          height={1100}
          className="block h-screen min-h-[680px] w-full object-cover shadow-elegant"
        />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-ink-deep to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink-deep to-transparent" />
        <div className="absolute bottom-8 left-6 border border-gold/70 bg-ink/95 px-8 py-6 lg:left-10">
          <p className="eyebrow text-gold">Reserved For</p>
          <p className="mt-2 font-display text-3xl text-ivory">$1M +</p>
        </div>
      </div>
    </section>
  );
}