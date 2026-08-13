export function PropertySearch() {
  return (
    <section id="search" className="bg-ink py-12 text-ivory lg:py-16">
      <div className="mx-auto max-w-7xl px-6 text-center lg:px-10">
        <p className="eyebrow text-gold">Search Live Listings</p>
        <h2 className="mt-5 font-display text-3xl leading-[1.05] sm:text-5xl">
          Explore What&apos;s
          <span className="block text-gold">Available Now</span>
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-[15px] leading-[1.9] text-silver/85">
          Browse current listings across Palm Beach County, updated in real time.
        </p>

        <div className="mx-auto mt-10 max-w-sm rounded-xl border border-gold/30 bg-ink-deep p-1 shadow-elegant">
          <div className="relative flex min-h-[320px] items-center justify-center rounded-lg border border-gold/20 bg-ink p-6">
            <iframe
              title="Property Search"
              style={{ width: "280px", height: "680px", border: 0 }}
              src="https://paulschafranick.vantasurerealty.com/embed.php"
              allowTransparency
            />
          </div>
        </div>
      </div>
    </section>
  );
}
