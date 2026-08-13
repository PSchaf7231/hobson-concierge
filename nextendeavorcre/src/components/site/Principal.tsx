import { Phone, Mail, MapPin } from "lucide-react";

export function Principal() {
  return (
    <section id="firm" className="bg-background py-28 lg:py-36">
      <div className="mx-auto grid max-w-7xl gap-16 px-6 lg:grid-cols-12 lg:px-10">
        <div className="lg:col-span-7">
          <p className="eyebrow">The Principal</p>
          <h2 className="mt-5 font-display text-3xl leading-[1.1] sm:text-5xl">
            One advisor for your{" "}
            <em className="not-italic text-gold">commercial investments</em> and your{" "}
            <em className="not-italic text-gold">luxury home</em>.
          </h2>

          <div className="mt-10 space-y-6 text-[15px] leading-[1.85] text-foreground/80">
            <p>
              Paul Schafranick is a Palm Beach County real estate advisor who
              works in two areas: triple-net medical properties through Next
              Endeavor CRE, and luxury homes through The Anasa Collection.
              Whether you are investing in a medical building or selling a
              high-end home, you work directly with Paul, not a chain of handoffs.
            </p>
            <p>
              Paul has built his business on long-term relationships and repeat
              clients, not cold calls and volume. He would rather sit across the
              table and walk you through a plan that fits your goals than hand
              you a one-size-fits-all pitch. That is true whether it is a medical
              building or a waterfront estate.
            </p>
          </div>
        </div>

        <aside className="lg:col-span-5">
          <div className="bg-ink p-8 text-ivory shadow-card lg:sticky lg:top-28">
            <p className="eyebrow text-gold">Principal</p>
            <p className="mt-4 font-display text-3xl">Paul Schafranick</p>
            <div className="mt-6 h-px w-12 bg-gold" />
            <ul className="mt-8 space-y-5 text-sm">
              <li>
                <p className="eyebrow text-ivory/55">Direct Line</p>
                <a href="tel:5612557285" className="mt-2 flex items-center gap-3 text-ivory hover:text-gold">
                  <Phone size={16} className="text-gold" />
                  561-255-7285
                </a>
              </li>
              <li>
                <p className="eyebrow text-ivory/55">Email</p>
                <a href="mailto:15000@nextendeavorcre.com" className="mt-2 flex items-center gap-3 break-all text-ivory hover:text-gold">
                  <Mail size={16} className="shrink-0 text-gold" />
                  15000@nextendeavorcre.com
                </a>
              </li>
              <li>
                <p className="eyebrow text-ivory/55">Location</p>
                <p className="mt-2 flex items-center gap-3 text-ivory">
                  <MapPin size={16} className="text-gold" />
                  Palm Beach County, Florida
                </p>
              </li>
            </ul>
          </div>
        </aside>
      </div>
    </section>
  );
}