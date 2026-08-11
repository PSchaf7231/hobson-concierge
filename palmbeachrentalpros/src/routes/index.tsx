import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Phone,
  Mail,
  MapPin,
  Home,
  Building2,
  Star,
  ArrowRight,
  Shield,
  Key,
  Clock,
  Users,
  Search,
  DollarSign,
  Calendar,
  ExternalLink,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Palm Beach Rental Pros | Luxury Residential Rentals" },
      {
        name: "description",
        content:
          "Luxury rentals in Palm Beach County with Paul Schafranick — waterfront estates, gated communities, and high-rise living.",
      },
      {
        property: "og:title",
        content: "Palm Beach Rental Pros | Luxury Residential Rentals",
      },
      {
        property: "og:description",
        content:
          "Luxury rentals in Palm Beach County — waterfront estates, gated communities, and high-rise living.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://palmbeachrentalpros.lovable.app/" },
      { property: "og:site_name", content: "Palm Beach Rental Pros" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Palm Beach Rental Pros | Luxury Residential Rentals" },
      {
        name: "twitter:description",
        content:
          "Luxury rentals in Palm Beach County — waterfront estates, gated communities, and high-rise living.",
      },
    ],
    links: [
      { rel: "canonical", href: "https://palmbeachrentalpros.lovable.app/" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "RealEstateAgent",
          name: "Palm Beach Rental Pros",
          description:
            "Boutique luxury residential rental consultancy serving Palm Beach County.",
          telephone: "+1-561-255-7285",
          url: "https://palmbeachrentalpros.lovable.app/",
          areaServed: "Palm Beach County, FL",
          employee: {
            "@type": "Person",
            name: "Paul Schafranick",
            telephone: "+1-561-255-7285",
          },
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "Palm Beach Rental Pros",
          url: "https://palmbeachrentalpros.lovable.app/",
        }),
      },
    ],
  }),
  component: Index,
});

const communities = [
  { name: "Two City Plaza", type: "Luxury High Rise", url: "https://twocityplazapb.com" },
  { name: "Water Club", type: "Waterfront Condo", url: "https://waterclublivingpb.com" },
  { name: "Alton", type: "Gated Community", url: "https://altonpb.com" },
  { name: "Vista Blue", type: "Oceanfront Condo", url: "https://vistabluepb.com" },
  { name: "Seven Bridges", type: "Gated Community", url: "https://sevenbridgespb.com" },
  { name: "Boca Bridges", type: "Gated Community", url: "https://bocabridgespb.com" },
  { name: "The Bristol", type: "Luxury High-Rise", url: "https://thebristolpb.com" },
];

const AGENT_NAME = "Paul Schafranick";
const AGENT_PHONE_DISPLAY = "561-255-7285";
const AGENT_PHONE_TEL = "5612557285";

function Index() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    budget: "",
    moveIn: "",
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => setFormSubmitted(false), 4000);
    setFormData({ name: "", phone: "", email: "", budget: "", moveIn: "" });
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-body">
      <main>
      {/* Top Brand Bar — sole identifier, no nav */}
      <div className="w-full border-b border-gold/20 bg-navy/95 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
          <div className="flex items-center gap-2">
            <Building2 className="h-6 w-6 text-gold" />
            <span className="font-display text-lg sm:text-xl font-semibold tracking-wide">
              Palm Beach <span className="text-gold">Rental</span> Pros
            </span>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-4 text-sm">
            <span className="text-foreground/80 font-medium">{AGENT_NAME}</span>
            <a
              href={`tel:${AGENT_PHONE_TEL}`}
              className="inline-flex items-center gap-1.5 text-gold hover:text-gold-light font-semibold transition-colors"
            >
              <Phone className="h-4 w-4" />
              {AGENT_PHONE_DISPLAY}
            </a>
          </div>
        </div>
      </div>

      {/* Hero */}
      <section className="relative flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-navy via-navy-light to-navy" />
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&q=80')] bg-cover bg-center opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 w-full">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="animate-fade-in-up">
              <div className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-4 py-1.5 mb-4">
                <Star className="h-3.5 w-3.5 text-gold" />
                <span className="text-xs font-semibold text-gold uppercase tracking-wider">
                  Palm Beach County&apos;s Elite Rental Specialists
                </span>
              </div>
              <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-foreground leading-[1.1] mb-4">
                Luxury Living
                <br />
                <span className="text-gold">Redefined</span> in Palm Beach
              </h1>
              <p className="text-base sm:text-lg text-foreground/70 max-w-lg mb-6 leading-relaxed">
                Exclusive access to the finest waterfront estates, gated
                communities, and premier high-rise residences.
              </p>
              <div className="flex flex-wrap gap-3">
                <a
                  href="#listings"
                  className="inline-flex items-center gap-2 rounded-md bg-gold px-5 py-2.5 text-sm font-semibold text-navy transition-all duration-200 hover:bg-gold-light hover:shadow-lg hover:shadow-gold/25"
                >
                  <Search className="h-4 w-4" />
                  Browse Listings
                  <ArrowRight className="h-4 w-4" />
                </a>
                <a
                  href={`tel:${AGENT_PHONE_TEL}`}
                  className="inline-flex items-center gap-2 rounded-md border border-gold/40 px-5 py-2.5 text-sm font-semibold text-gold transition-all duration-200 hover:bg-gold/10"
                >
                  <Phone className="h-4 w-4" />
                  Call {AGENT_PHONE_DISPLAY}
                </a>
              </div>
              <div className="mt-6 flex items-center gap-4">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="h-8 w-8 rounded-full border-2 border-navy bg-gradient-to-br from-gold/40 to-gold/10 flex items-center justify-center text-[10px] font-bold text-gold"
                    >
                      {String.fromCharCode(64 + i)}
                    </div>
                  ))}
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">500+ Happy Clients</p>
                  <p className="text-xs text-foreground/50">Trusted across Palm Beach County</p>
                </div>
              </div>
            </div>

            {/* Lead Capture Form */}
            <div className="animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
              <div className="rounded-xl border border-gold/20 bg-card/80 backdrop-blur-sm p-5 sm:p-6 shadow-2xl shadow-black/30">
                <h2 className="font-display text-xl sm:text-2xl font-bold text-foreground mb-1">
                  Find Your <span className="text-gold">Dream Home</span>
                </h2>
                <p className="text-xs text-muted-foreground mb-4">
                  {AGENT_NAME} will curate listings just for you.
                </p>
                {formSubmitted ? (
                  <div className="text-center py-6">
                    <div className="mx-auto h-12 w-12 rounded-full bg-gold/20 flex items-center justify-center mb-3">
                      <Star className="h-6 w-6 text-gold" />
                    </div>
                    <h3 className="font-display text-lg font-bold text-foreground mb-1">
                      Request Received!
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      {AGENT_NAME} will contact you within 24 hours.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleFormSubmit} className="space-y-3">
                    <div>
                      <label className="block text-xs font-medium text-foreground/80 mb-1">
                        Full Name
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full rounded-md border border-gold/20 bg-background/50 px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold/30 transition-colors"
                        placeholder="John Smith"
                      />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-medium text-foreground/80 mb-1">
                          Phone
                        </label>
                        <input
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full rounded-md border border-gold/20 bg-background/50 px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold/30 transition-colors"
                          placeholder="(561) 555-0123"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-foreground/80 mb-1">
                          Email
                        </label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full rounded-md border border-gold/20 bg-background/50 px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold/30 transition-colors"
                          placeholder="john@example.com"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-medium text-foreground/80 mb-1">
                          Monthly Budget
                        </label>
                        <div className="relative">
                          <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                          <input
                            type="text"
                            required
                            value={formData.budget}
                            onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                            className="w-full rounded-md border border-gold/20 bg-background/50 pl-8 pr-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold/30 transition-colors"
                            placeholder="5,000+"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-foreground/80 mb-1">
                          Move-in Date
                        </label>
                        <div className="relative">
                          <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                          <input
                            type="date"
                            required
                            value={formData.moveIn}
                            onChange={(e) => setFormData({ ...formData, moveIn: e.target.value })}
                            className="w-full rounded-md border border-gold/20 bg-background/50 pl-8 pr-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold/30 transition-colors"
                          />
                        </div>
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="w-full rounded-md bg-gold px-5 py-2.5 text-sm font-bold text-navy transition-all duration-200 hover:bg-gold-light hover:shadow-lg hover:shadow-gold/25 flex items-center justify-center gap-2"
                    >
                      <Search className="h-4 w-4" />
                      Get Personalized Listings
                    </button>
                    <p className="text-[10px] text-center text-muted-foreground">
                      Your information is secure. We respect your privacy.
                    </p>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* IDX Embed Placeholder */}
      <section id="listings" className="py-8 sm:py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-6">
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-foreground mb-2">
              Featured <span className="text-gold">Listings</span>
            </h2>
            <p className="text-sm text-muted-foreground max-w-xl mx-auto">
              Browse our curated selection of luxury rentals, updated in real-time.
            </p>
          </div>
          <div className="rounded-xl border border-gold/30 bg-card p-1 shadow-lg shadow-black/20">
            <div className="relative rounded-lg border border-gold/20 bg-navy/50 min-h-[320px] flex items-center justify-center p-6">
              <iframe
                title="Property Search"
                style={{ width: '280px', height: '680px', border: 0 }}
                src="https://paulschafranick.vantasurerealty.com/embed.php"
                allowTransparency
              />
            </div>
          </div>
        </div>
      </section>

      {/* Communities Section */}
      <section id="communities" className="py-8 sm:py-10 bg-navy-light/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-6">
            <span className="text-xs font-semibold text-gold uppercase tracking-widest mb-2 block">
              Neighborhood Expertise
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-foreground mb-2">
              Communities We <span className="text-gold">Serve</span>
            </h2>
            <p className="text-sm text-muted-foreground max-w-xl mx-auto">
              Deep local knowledge of Palm Beach County&apos;s most prestigious communities.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {communities.map((community) => (
              <a
                key={community.name}
                href={community.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative rounded-lg border border-gold/15 bg-card p-4 transition-all duration-300 hover:border-gold/40 hover:bg-card/80 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-gold/5"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="h-8 w-8 rounded-md bg-gold/10 flex items-center justify-center group-hover:bg-gold/20 transition-colors">
                    <Home className="h-4 w-4 text-gold" />
                  </div>
                  <ExternalLink className="h-3.5 w-3.5 text-gold/40 group-hover:text-gold transition-all" />
                </div>
                <h3 className="font-display text-sm font-semibold text-foreground mb-0.5">
                  {community.name}
                </h3>
                <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">
                  {community.type}
                </p>
                <p className="text-[10px] text-gold/70 font-medium truncate">
                  {community.url.replace("https://", "")}
                </p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section id="about" className="py-8 sm:py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <div>
              <span className="text-xs font-semibold text-gold uppercase tracking-widest mb-2 block">
                About {AGENT_NAME}
              </span>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-foreground mb-4">
                Your Trusted Partner in <span className="text-gold">Luxury Rentals</span>
              </h2>
              <p className="text-sm text-foreground/70 mb-3 leading-relaxed">
                Palm Beach Rental Pros is a boutique luxury rental consultancy
                specializing in the most sought-after residential communities
                across Palm Beach County. From waterfront estates in Boca Raton
                to premier high-rise living in West Palm Beach, {AGENT_NAME}
                connects discerning clients with exceptional properties.
              </p>
              <p className="text-sm text-foreground/70 mb-4 leading-relaxed">
                White-glove service includes personalized property tours, lease
                negotiation, and ongoing tenant advocacy.
              </p>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { icon: Shield, label: "Licensed & Insured" },
                  { icon: Key, label: "Exclusive Access" },
                  { icon: Clock, label: "24/7 Support" },
                  { icon: MapPin, label: "Local Experts" },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-2">
                    <div className="h-7 w-7 rounded-md bg-gold/10 flex items-center justify-center flex-shrink-0">
                      <item.icon className="h-3.5 w-3.5 text-gold" />
                    </div>
                    <span className="text-xs font-medium text-foreground/80">
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Property Management Section */}
      <section id="management" className="py-8 sm:py-10 bg-navy-light/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-6">
            <span className="text-xs font-semibold text-gold uppercase tracking-widest mb-2 block">
              Full-Service Solutions
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-foreground mb-2">
              Property <span className="text-gold">Management</span>
            </h2>
            <p className="text-sm text-muted-foreground max-w-xl mx-auto">
              Comprehensive management services for property owners.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                icon: Search,
                title: "Tenant Placement",
                desc: "Rigorous screening and vetting to secure qualified, long-term tenants.",
              },
              {
                icon: Shield,
                title: "Asset Protection",
                desc: "Proactive maintenance and compliance to preserve property value.",
              },
              {
                icon: DollarSign,
                title: "Revenue Optimization",
                desc: "Dynamic pricing and lease structuring to maximize rental income.",
              },
            ].map((service) => (
              <div
                key={service.title}
                className="rounded-lg border border-gold/15 bg-card p-5 transition-all duration-300 hover:border-gold/30 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-gold/5"
              >
                <div className="h-9 w-9 rounded-lg bg-gold/10 flex items-center justify-center mb-3">
                  <service.icon className="h-5 w-5 text-gold" />
                </div>
                <h3 className="font-display text-base font-semibold text-foreground mb-1.5">
                  {service.title}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {service.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-8 sm:py-10 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-gold/10 via-transparent to-gold/5" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-3">
            Ready to Find Your <span className="text-gold">Perfect Home</span>?
          </h2>
          <p className="text-sm text-muted-foreground max-w-xl mx-auto mb-6">
            {AGENT_NAME} is standing by to help you discover the finest
            properties Palm Beach County has to offer.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a
              href={`tel:${AGENT_PHONE_TEL}`}
              className="inline-flex items-center gap-2 rounded-md bg-gold px-6 py-2.5 text-sm font-bold text-navy transition-all duration-200 hover:bg-gold-light hover:shadow-lg hover:shadow-gold/25"
            >
              <Phone className="h-4 w-4" />
              Call {AGENT_PHONE_DISPLAY}
            </a>
            <a
              href="mailto:paul@palmbeachrentalpros.com"
              className="inline-flex items-center gap-2 rounded-md border border-gold/40 px-6 py-2.5 text-sm font-semibold text-gold transition-all duration-200 hover:bg-gold/10"
            >
              <Mail className="h-4 w-4" />
              Email Paul
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gold/10 bg-navy-light/20 pt-10 pb-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-2 mb-3">
                <Building2 className="h-5 w-5 text-gold" />
                <span className="font-display text-base font-semibold text-foreground">
                  Palm Beach <span className="text-gold">Rental</span> Pros
                </span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed mb-3">
                Palm Beach County&apos;s premier luxury rental specialists.
              </p>
            </div>
            <div>
              <h4 className="font-display text-xs font-semibold text-foreground uppercase tracking-wider mb-3">
                Communities
              </h4>
              <ul className="space-y-1.5">
                {communities.map((c) => (
                  <li key={c.name}>
                    <a
                      href={c.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-muted-foreground hover:text-gold transition-colors"
                    >
                      {c.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-display text-xs font-semibold text-foreground uppercase tracking-wider mb-3">
                Services
              </h4>
              <ul className="space-y-1.5">
                {[
                  "Luxury Rentals",
                  "Property Management",
                  "Tenant Placement",
                  "Investment Consulting",
                  "Market Analysis",
                ].map((s) => (
                  <li key={s}>
                    <span className="text-xs text-muted-foreground">{s}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-display text-xs font-semibold text-foreground uppercase tracking-wider mb-3">
                Contact
              </h4>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <Users className="h-3.5 w-3.5 text-gold mt-0.5 flex-shrink-0" />
                  <span className="text-xs text-muted-foreground">{AGENT_NAME}</span>
                </li>
                <li className="flex items-start gap-2">
                  <Phone className="h-3.5 w-3.5 text-gold mt-0.5 flex-shrink-0" />
                  <a
                    href={`tel:${AGENT_PHONE_TEL}`}
                    className="text-xs text-muted-foreground hover:text-gold transition-colors"
                  >
                    {AGENT_PHONE_DISPLAY}
                  </a>
                </li>
                <li className="flex items-start gap-2">
                  <MapPin className="h-3.5 w-3.5 text-gold mt-0.5 flex-shrink-0" />
                  <span className="text-xs text-muted-foreground">
                    Palm Beach County, FL
                  </span>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gold/10 pt-5 flex flex-col sm:flex-row items-center justify-between gap-2">
            <p className="text-[10px] text-muted-foreground">
              &copy; {new Date().getFullYear()} Palm Beach Rental Pros. All rights reserved.
            </p>
            <p className="text-[10px] text-muted-foreground">
              Licensed Real Estate Professional in the State of Florida
            </p>
          </div>
        </div>
      </footer>
      </main>
    </div>
  );
}
