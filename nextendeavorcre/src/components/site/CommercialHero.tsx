import commercialImg from "@/assets/commercial-medical.jpg";

export function CommercialHero() {
  return (
    <section className="bg-background">
      <div className="mx-auto grid max-w-7xl gap-0 lg:grid-cols-2 lg:items-stretch">
        <div className="flex flex-col justify-center px-6 py-20 lg:px-14 lg:py-28">
          <p className="eyebrow">Next Endeavor CRE · Commercial Division</p>
          <h2 className="mt-6 font-display text-4xl leading-[1.1] sm:text-5xl">
            Triple-Net Medical Properties for Investors Who Think Long Term.
          </h2>
          <div className="mt-8 h-px w-16 bg-gold/70" />
          <p className="mt-8 max-w-xl text-[15px] leading-[1.9] text-foreground/70">
            Buying commercial real estate takes more than knowing the market. It
            takes someone who is truly on your side. Next Endeavor CRE works only
            for buyers, so you never have to wonder whose interest comes first.
          </p>
          <a
            href="#contact"
            className="mt-10 inline-flex w-fit items-center gap-3 bg-foreground px-7 py-4 text-[11px] uppercase tracking-[0.28em] text-background transition-all hover:bg-gold hover:text-ink"
          >
            Schedule a Consultation
          </a>
        </div>
        <div className="relative min-h-[480px] lg:min-h-full">
          <img
            src={commercialImg}
            alt="Modern medical office building"
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}