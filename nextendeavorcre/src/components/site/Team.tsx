import { Phone, Mail, MapPin } from "lucide-react";
import paulPortrait from "@/assets/paul-portrait.png";

export function Team() {
  return (
    <section id="team" className="bg-ink py-14 lg:py-20">
      <div className="mx-auto grid max-w-7xl gap-16 px-6 lg:grid-cols-12 lg:px-10">
        <div className="lg:col-span-7">
          <p className="eyebrow">The Team</p>
          <h2 className="mt-5 font-display text-3xl leading-[1.1] text-ivory sm:text-5xl">
            One advisor for your{" "}
            <em className="not-italic text-gold">commercial investments</em> and your{" "}
            <em className="not-italic text-gold">luxury home</em>.
          </h2>
          <div className="mt-8 h-px w-16 bg-gold/70" />

          <div className="mt-10 space-y-6 text-[15px] leading-[1.9] text-silver/85">
            <p>
              Paul Robert Schafranick is a Palm Beach County real estate advisor.
              Through Next Endeavor CRE and The Anasa Collection, he works with
              investors, doctors, family offices, and luxury homeowners who want
              one person they can trust to handle the whole thing, start to finish.
            </p>
            <p>
              His business runs on relationships, not volume. Every client starts
              with a real conversation and gets a plan built around what they
              actually want. Whether it is finding an off-market medical property
              or selling a waterfront estate, Paul handles it personally from the
              first call to the closing table.
            </p>
            <p>
              The result is a business built almost entirely on repeat clients and
              referrals, and a reputation for doing right by people in some of
              South Florida's biggest deals.
            </p>
          </div>
        </div>

        <aside className="lg:col-span-5">
          <div className="border border-gold/30 bg-ink-elevated p-8 text-ivory shadow-elegant lg:sticky lg:top-28">
            <img
              src={paulPortrait}
              alt="Portrait of Paul Robert Schafranick"
              className="mx-auto aspect-[4/5] w-full max-w-[260px] border-2 border-gold/70 object-cover"
            />

            <p className="mt-6 font-display text-3xl text-ivory">Paul Robert Schafranick</p>
            <div className="mt-6 h-px w-12 bg-gold" />
            <ul className="mt-8 space-y-6 text-sm">
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