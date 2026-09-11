export function PropertySearch() {
  return (
    <section id="search" className="bg-ink py-12 text-ivory lg:py-16">
      <div className="mx-auto max-w-7xl px-6 text-center lg:px-10">
        <p className="eyebrow text-gold">Available Listings</p>
        <h2 className="mt-5 font-display text-3xl leading-[1.05] sm:text-5xl">
          Explore What&apos;s
          <span className="block text-gold">Available Now</span>
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-[15px] leading-[1.9] text-silver/85">
          Palm Beach County commercial and residential inventory, curated directly by Paul.
        </p>

        <div className="mx-auto mt-10 max-w-sm rounded-xl border border-gold/30 bg-ink-deep p-1 shadow-elegant">
          <div className="relative flex min-h-[320px] flex-col items-center justify-center gap-6 rounded-lg border border-gold/20 bg-ink p-8 text-center">
            <p className="text-[15px] leading-[1.9] text-silver/85">
              For current availability and off-market opportunities, reach out directly — Paul answers his own phone.
            </p>
            <a
              href="tel:5612557285"
              className="rounded-full border border-gold/60 px-6 py-3 text-sm font-medium tracking-wide text-gold transition hover:bg-gold hover:text-ink"
            >
              (561) 255-7285
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
