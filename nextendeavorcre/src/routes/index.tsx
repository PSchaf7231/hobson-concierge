import { createFileRoute } from "@tanstack/react-router";
import { Toaster } from "sonner";
import { Nav } from "@/components/site/Nav";
import { Hero } from "@/components/site/Hero";

import { Commercial } from "@/components/site/Commercial";
import { Residential } from "@/components/site/Residential";
import { PropertySearch } from "@/components/site/PropertySearch";
import { Team } from "@/components/site/Team";
import { FeeTiers } from "@/components/site/FeeTiers";
import { Contact } from "@/components/site/Contact";
import { Footer } from "@/components/site/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Next Endeavor CRE · South Florida Commercial and Luxury Real Estate" },
      {
        name: "description",
        content:
          "South Florida real estate: triple-net medical properties for investors and luxury homes priced $1M and up. Led by Paul Schafranick in Palm Beach County.",
      },
      { property: "og:title", content: "Next Endeavor CRE · The Anasa Collection" },
      {
        property: "og:description",
        content:
          "Triple-net medical properties for investors. Luxury homes for sellers and buyers. Palm Beach County real estate with Paul Schafranick.",
      },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "Next Endeavor CRE",
          description:
            "South Florida real estate: triple-net medical properties for investors and luxury homes priced $1M and up.",
          areaServed: { "@type": "AdministrativeArea", name: "Palm Beach County, Florida" },
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ProfessionalService",
          name: "Next Endeavor CRE",
          description:
            "Triple-net medical property advisory for investors and luxury home representation for properties $1M and up.",
          areaServed: { "@type": "AdministrativeArea", name: "Palm Beach County, Florida" },
          serviceType: ["Commercial Real Estate Advisory", "Luxury Residential Representation"],
        }),
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="bg-background text-foreground">
      <Nav />
      <Hero />
      <PropertySearch />
      <Commercial />
      <Residential />
      <FeeTiers />
      <Team />
      <Contact />
      <Footer />
      <Toaster theme="dark" position="bottom-right" />
    </main>
  );
}