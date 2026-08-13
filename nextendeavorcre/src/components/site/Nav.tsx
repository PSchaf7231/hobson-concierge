import { useState } from "react";
import { Menu, X } from "lucide-react";
import anasaLogo from "@/assets/logo-anasa.png";
import neLogo from "@/assets/logo-ne.png";

const links = [
  { href: "#home", label: "Home" },
  { href: "#commercial", label: "Commercial" },
  { href: "#residential", label: "Luxury Residential" },
  { href: "#team", label: "The Team" },
  { href: "#contact", label: "Contact" },
];

export function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="absolute inset-x-0 top-0 z-50 bg-transparent">

      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 pt-1 pb-3 md:px-10">
        <a href="#home" className="flex flex-col gap-1 overflow-visible drop-shadow-[0_2px_8px_color-mix(in_oklab,var(--ink)_70%,transparent)]">
          <span className="flex items-center gap-5">
            <img
              src={anasaLogo}
              alt="The Anasa Collection"
              className="h-12 w-auto shrink-0 object-contain sm:h-14"
            />
            <span className="hidden h-8 w-px bg-ivory/30 sm:block" />
            <img
              src={neLogo}
              alt="Next Endeavor CRE"
              className="h-12 w-auto shrink-0 object-contain sm:h-14"
            />
          </span>
          <span className="font-display uppercase tracking-[0.1em] text-ivory text-3xl leading-none sm:text-4xl">
            <span className="text-4xl sm:text-5xl">V</span>anta<span className="text-4xl sm:text-5xl">S</span>ure Realty
          </span>
        </a>


        <nav className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="group relative text-[12px] font-medium uppercase tracking-[0.22em] text-ivory/85 transition-colors hover:text-ivory"
            >
              {l.label}
              <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-gold transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-ivory"
          aria-label="Menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="border-t border-ivory/10 bg-ink md:hidden">
          <div className="flex flex-col px-6 py-4">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="py-3 text-sm uppercase tracking-[0.22em] text-ivory/85"
              >
                {l.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}