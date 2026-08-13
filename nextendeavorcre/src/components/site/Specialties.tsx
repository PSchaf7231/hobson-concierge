const items = [
  {
    title: "NNN Medical Specialists",
    body: "We focus only on triple-net leased medical properties. That focus means better deals, better tenants, and a broker who knows this kind of building inside and out.",
  },
  {
    title: "Passive. Predictable. Protected.",
    body: "NNN leases put the taxes, insurance, and maintenance entirely on the tenant. Your job is simply to collect the check. That is what real passive income looks like.",
  },
  {
    title: "Medical Real Estate Focus",
    body: "We specialize in finding and securing dialysis clinics and ambulatory surgery centers leased to established operators like DaVita and Fresenius.",
  },
];

export function Specialties() {
  return (
    <section className="bg-secondary py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="text-center">
          <p className="eyebrow">Key Specialties</p>
          <h2 className="mt-5 font-display text-4xl sm:text-5xl">
            Why <em className="not-italic">NNN Medical?</em>
          </h2>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {items.map((item) => (
            <article
              key={item.title}
              className="group relative bg-card px-8 pb-10 pt-12 shadow-card transition-shadow duration-500 hover:shadow-elegant"
            >
              <div className="absolute left-8 right-8 top-0 h-px bg-gold/70" />
              <h3 className="font-display text-2xl leading-snug text-foreground">
                {item.title}
              </h3>
              <p className="mt-6 text-[14.5px] leading-[1.85] text-foreground/70">
                {item.body}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}