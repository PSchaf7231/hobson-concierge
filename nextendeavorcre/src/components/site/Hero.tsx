import heroImg from "@/assets/hero-estate.jpg";
import heroVideo from "../../../public/hero-estate.mp4.asset.json";
import { WordReveal } from "./WordReveal";

export function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen items-end overflow-hidden"
    >
      <video
        src={heroVideo.url}
        poster={heroImg}
        autoPlay
        muted
        playsInline
        preload="auto"
        onEnded={(e) => {
          const v = e.currentTarget;
          v.pause();
          v.currentTime = Math.max(0, v.duration - 0.05);
        }}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-ink/55 via-ink/35 to-ink/85" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-24 pt-40 lg:px-10 lg:pb-32">
        <div className="max-w-3xl text-ivory">
          <p className="eyebrow text-gold-soft">
            Commercial and Luxury Real Estate · South Florida
          </p>
          <WordReveal
            as="h1"
            text="Smart Commercial Investments. Luxury Homes Done Right."
            className="mt-6 font-display text-4xl leading-[1.05] sm:text-6xl lg:text-7xl"
            stagger={90}
          />
          <p className="mt-8 max-w-xl text-base leading-relaxed text-ivory/80 sm:text-lg">
            Two sides of South Florida real estate under one roof: triple-net
            medical properties for investors, and luxury homes for the people who
            own them. One person handling every detail, start to finish.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href="#commercial"
              className="group inline-flex items-center gap-3 border border-ivory/50 px-8 py-4 text-[11px] font-medium uppercase tracking-[0.28em] text-ivory transition-all hover:border-gold hover:text-gold"
            >
              Explore Commercial
            </a>
            <a
              href="#residential"
              className="group inline-flex items-center gap-3 bg-gold px-8 py-4 text-[11px] font-medium uppercase tracking-[0.28em] text-ink transition-all hover:bg-ivory"
            >
              Explore Residential
            </a>
          </div>
        </div>
      </div>

      <div className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 text-[10px] uppercase tracking-[0.4em] text-ivory/60">
        Scroll
      </div>
    </section>
  );
}