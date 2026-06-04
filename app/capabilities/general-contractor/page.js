'use client'

import { Button } from '@/components/ui/button'
import { Printer, Mail, Globe, Hammer, Warehouse, Truck, Zap } from 'lucide-react'

export default function GCCapabilityPage() {
  return (
    <div className="min-h-screen bg-[#F5EDE0] print:bg-white">
      <div className="print:hidden bg-[#1B3A4F] text-white">
        <div className="max-w-4xl mx-auto px-6 py-3 flex items-center justify-between">
          <div className="text-xs uppercase tracking-[0.25em] text-[#C8CCD1]/70">General Contractor Capability Statement</div>
          <Button onClick={() => window.print()} variant="outline" className="border-[#C9A867] text-[#E2C285] hover:bg-[#C9A867]/10">
            <Printer className="h-4 w-4 mr-2" />Save as PDF / Print
          </Button>
        </div>
      </div>

      <main className="max-w-4xl mx-auto p-10 print:p-8 print:max-w-full bg-white print:shadow-none shadow-sm">
        {/* Brand header */}
        <div className="flex items-start justify-between border-b border-[#C9A867]/40 pb-6 mb-8">
          <div className="flex items-center gap-4">
            <img src="/next-endeavor.png" alt="Next Endeavor CRE" className="h-20 w-20 object-contain" />
            <div>
              <div className="text-[10px] uppercase tracking-[0.3em] text-[#1B3A4F]/60">Capability Statement</div>
              <div className="font-serif text-3xl text-[#1B3A4F] leading-tight">Next Endeavor CRE</div>
              <div className="text-xs text-[#1B3A4F]/60 mt-1">Commercial Real Estate Solutions</div>
            </div>
          </div>
          <div className="text-right">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#1B3A4F] text-[#E2C285] text-xs font-medium">
              <Hammer className="h-3.5 w-3.5" />General Contractor Practice
            </div>
          </div>
        </div>

        {/* Headline */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <div className="h-px w-12 bg-[#C9A867]" />
            <span className="text-[#1B3A4F]/60 text-xs uppercase tracking-[0.3em]">Industrial &amp; Yard Real Estate</span>
          </div>
          <h1 className="font-serif text-4xl text-[#1B3A4F] leading-tight">
            Real estate built around <span className="italic text-[#C9A867]">how you actually run the work.</span>
          </h1>
        </div>

        {/* Lede */}
        <p className="text-[#1B3A4F]/85 text-lg leading-relaxed mb-8">
          From fenced contractor yards and industrial-flex shops to scaling shop-and-yard portfolios, Next Endeavor CRE represents general contractors, sub-trades, fabricators, and equipment-heavy operators on the real estate that powers their business. We think in clear height, drive-in doors, fenced acreage, three-phase power, and zoning compliance — not just rentable square footage.
        </p>

        {/* Two-column: What We Do / Who We Serve */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-[#F5EDE0] border border-[#C9A867]/30 rounded p-5">
            <div className="text-xs uppercase tracking-[0.25em] text-[#1B3A4F]/60 mb-3">What We Do</div>
            <ul className="space-y-2 text-sm text-[#1B3A4F]/85">
              <li className="flex gap-2"><span className="text-[#C9A867]">◆</span>Tenant &amp; buyer representation for shop/yard sites</li>
              <li className="flex gap-2"><span className="text-[#C9A867]">◆</span>Owner-occupied acquisition &amp; SBA-friendly underwriting</li>
              <li className="flex gap-2"><span className="text-[#C9A867]">◆</span>Industrial-flex, IOS (industrial outdoor storage) sourcing</li>
              <li className="flex gap-2"><span className="text-[#C9A867]">◆</span>Build-to-suit &amp; design-build advisory</li>
              <li className="flex gap-2"><span className="text-[#C9A867]">◆</span>Sale-leaseback for capital redeployment</li>
              <li className="flex gap-2"><span className="text-[#C9A867]">◆</span>Zoning, entitlement &amp; conditional-use guidance</li>
              <li className="flex gap-2"><span className="text-[#C9A867]">◆</span>Portfolio consolidation as you scale crews</li>
              <li className="flex gap-2"><span className="text-[#C9A867]">◆</span>Disposition of underutilized yards &amp; shops</li>
            </ul>
          </div>
          <div className="bg-[#F5EDE0] border border-[#C9A867]/30 rounded p-5">
            <div className="text-xs uppercase tracking-[0.25em] text-[#1B3A4F]/60 mb-3">Who We Serve</div>
            <ul className="space-y-2 text-sm text-[#1B3A4F]/85">
              <li className="flex gap-2"><span className="text-[#C9A867]">◆</span>General contractors (commercial &amp; residential)</li>
              <li className="flex gap-2"><span className="text-[#C9A867]">◆</span>Mechanical, electrical, plumbing &amp; HVAC contractors</li>
              <li className="flex gap-2"><span className="text-[#C9A867]">◆</span>Site/civil, paving, &amp; excavation contractors</li>
              <li className="flex gap-2"><span className="text-[#C9A867]">◆</span>Roofing, framing, glazing &amp; specialty trades</li>
              <li className="flex gap-2"><span className="text-[#C9A867]">◆</span>Steel fabricators &amp; metal-work shops</li>
              <li className="flex gap-2"><span className="text-[#C9A867]">◆</span>Equipment rental &amp; trucking fleets</li>
              <li className="flex gap-2"><span className="text-[#C9A867]">◆</span>Landscape, irrigation &amp; pool-build contractors</li>
              <li className="flex gap-2"><span className="text-[#C9A867]">◆</span>Modular &amp; pre-fab construction operators</li>
            </ul>
          </div>
        </div>

        {/* What we underwrite */}
        <div className="mb-8">
          <div className="text-xs uppercase tracking-[0.25em] text-[#1B3A4F]/60 mb-3">How We Underwrite a Shop or Yard</div>
          <div className="grid grid-cols-4 gap-3">
            <div className="border-l-2 border-[#C9A867] pl-3">
              <Warehouse className="h-5 w-5 text-[#C9A867] mb-1" />
              <div className="font-semibold text-[#1B3A4F] text-sm">Building Specs</div>
              <div className="text-[11px] text-[#1B3A4F]/70 mt-1">Clear height, drive-in / dock doors, column spacing, office ratio, ESFR sprinklers.</div>
            </div>
            <div className="border-l-2 border-[#C9A867] pl-3">
              <Truck className="h-5 w-5 text-[#C9A867] mb-1" />
              <div className="font-semibold text-[#1B3A4F] text-sm">Yard &amp; Access</div>
              <div className="text-[11px] text-[#1B3A4F]/70 mt-1">Fenced acreage, trailer parking, turning radius, paved vs. stabilized, gate &amp; security.</div>
            </div>
            <div className="border-l-2 border-[#C9A867] pl-3">
              <Zap className="h-5 w-5 text-[#C9A867] mb-1" />
              <div className="font-semibold text-[#1B3A4F] text-sm">Power &amp; Utilities</div>
              <div className="text-[11px] text-[#1B3A4F]/70 mt-1">Three-phase capacity, amperage, gas service, compressed air, water &amp; sewer load.</div>
            </div>
            <div className="border-l-2 border-[#C9A867] pl-3">
              <Hammer className="h-5 w-5 text-[#C9A867] mb-1" />
              <div className="font-semibold text-[#1B3A4F] text-sm">Zoning Fit</div>
              <div className="text-[11px] text-[#1B3A4F]/70 mt-1">M-1 / M-2 / IL / IH compliance, outdoor storage allowance, by-right vs. conditional use.</div>
            </div>
          </div>
        </div>

        {/* Value statement */}
        <div className="bg-[#1B3A4F] text-white rounded p-6 mb-8 print:break-inside-avoid">
          <div className="text-xs uppercase tracking-[0.25em] text-[#E2C285]/80 mb-2">Why Contractors Work With Us</div>
          <p className="text-[#F5EDE0] leading-relaxed">
            The wrong yard costs you twice — once on rent, and again every day in lost productivity. We source space the way you'd build it: with the truck flow, the crew schedule, the equipment list, and the load on the panel all in mind. Our advisory is grounded in operations, not in renderings.
          </p>
        </div>

        {/* Contact footer */}
        <div className="mt-10 pt-6 border-t border-[#C9A867]/40 grid grid-cols-2 items-end gap-6">
          <div>
            <img src="/next-endeavor.png" alt="" className="h-14 w-14 object-contain mb-2" />
            <div className="font-serif text-xl text-[#1B3A4F]">Next Endeavor CRE</div>
            <div className="text-[10px] uppercase tracking-[0.25em] text-[#1B3A4F]/50 mt-1">General Contractor Practice</div>
          </div>
          <div className="text-right text-sm text-[#1B3A4F]/80 space-y-1">
            <div className="flex items-center justify-end gap-2"><Globe className="h-3.5 w-3.5 text-[#C9A867]" />nextendeavorcre.com</div>
            <div className="flex items-center justify-end gap-2"><Mail className="h-3.5 w-3.5 text-[#C9A867]" />info@nextendeavorcre.com</div>
            <div className="text-[10px] uppercase tracking-[0.25em] text-[#1B3A4F]/50 mt-2">Curated by Atlas AI · Powered by Beaches MLS</div>
          </div>
        </div>
      </main>

      <style jsx global>{`
        @media print {
          @page { size: letter; margin: 0.4in; }
          body { background: white !important; }
        }
      `}</style>
    </div>
  )
}
