import { Link } from "@tanstack/react-router";
import anasaLogo from "@/assets/logo-anasa.png";
import neLogo from "@/assets/logo-ne.png";

export function Footer() {
  return (
    <footer className="border-t border-gold/20 bg-ink py-14 text-ivory/70">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-8 px-6 text-center lg:px-10">
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-6">
          <img src={anasaLogo} alt="The Anasa Collection" className="h-16 w-auto sm:h-20" />
          <span className="hidden h-12 w-px bg-ivory/20 sm:block" />
          <img src={neLogo} alt="Next Endeavor CRE" className="h-16 w-auto sm:h-20" />
        </div>

        <p className="max-w-2xl font-display text-sm italic text-ivory/80 sm:text-base">
          <span className="text-ivory/60">Next Endeavor CRE</span>
          <span className="mx-1 text-ivory/40">and</span>
          <span className="text-ivory/60">The Anasa Collection</span>
          <span className="mx-1 text-ivory/40">brokered by</span>
        </p>

        <div className="inline-flex items-center gap-3 border-y border-gold/60 px-6 py-3">
          <span className="font-display text-3xl tracking-wide text-ivory sm:text-4xl">
            VantaSure
          </span>
          <span className="font-display text-3xl italic tracking-wide text-ivory sm:text-4xl">
            Realty
          </span>
        </div>

        <div className="mt-2 flex flex-col gap-2 text-[11px] uppercase tracking-[0.28em] text-ivory/55 sm:flex-row sm:items-center sm:gap-6">
          <p>© {new Date().getFullYear()} Next Endeavor CRE · The Anasa Collection</p>
          <span className="hidden h-1 w-1 rounded-full bg-ivory/30 sm:block" />
          <p>Palm Beach County, Florida · By Appointment</p>
        </div>

        <p className="mt-4 max-w-3xl text-[11px] leading-relaxed text-ivory/45">
          Paul Robert Schafranick is a licensed real estate professional with VantaSure Realty.
        </p>

        <Link
          to="/login"
          className="mt-2 text-[10px] uppercase tracking-[0.32em] text-ivory/40 transition hover:text-gold"
        >
          Client Portal
        </Link>
      </div>
    </footer>
  );
}
