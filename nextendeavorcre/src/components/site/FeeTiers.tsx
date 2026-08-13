const tiers = [
  {
    tier: "Full Marketing Suite",
    title: "La Maison",
    value: "$1M – $2M",
    fee: "Standard",
    label: "Listing Rate",
  },
  {
    tier: "Enhanced Marketing",
    title: "Le Château",
    value: "$2M – $3M",
    fee: "Preferred",
    label: "Listing Rate",
  },
  {
    tier: "Premium Marketing",
    title: "Le Palais",
    value: "$3M – $5M",
    fee: "Reduced",
    label: "Listing Rate",
  },
  {
    tier: "White-Glove Service",
    title: "La Propriété",
    value: "$5M+",
    fee: "By Private\nArrangement",
    label: "",
  },
];

export function FeeTiers() {
  return (
    <section className="border-y border-gold/15 bg-ink py-12 text-ivory lg:py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="border-t border-ivory/10 pt-8 text-center">
          <p className="eyebrow text-gold">The Anasa Tiers</p>
          <h2 className="mt-5 font-display text-4xl leading-none text-ivory sm:text-6xl">
            How We Structure Luxury Listings
          </h2>
        </div>

        <div className="mt-14 grid gap-px border border-ivory/14 bg-ivory/14 md:grid-cols-2 lg:grid-cols-4">
          {tiers.map((tier) => (
            <article
              key={tier.tier}
              className="relative flex min-h-[22rem] flex-col items-center justify-start bg-ink px-8 py-12 text-center"
            >
              <div className="absolute left-1/2 top-0 h-1 w-10 -translate-x-1/2 bg-gold" />
              <p className="eyebrow text-gold">{tier.tier}</p>
              <h3 className="mt-7 whitespace-pre-line font-display text-[2rem] leading-[1.15] text-ivory">
                {tier.title}
              </h3>
              <p className="mt-6 font-display text-[2rem] leading-none text-ivory/90">
                {tier.value}
              </p>
              <div className="mt-12">
                <p className="whitespace-pre-line font-display text-[2.6rem] leading-[0.95] text-gold">
                  {tier.fee}
                </p>
                {tier.label ? (
                  <p className="mt-3 text-[10px] uppercase tracking-[0.28em] text-ivory/60">
                    {tier.label}
                  </p>
                ) : null}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}