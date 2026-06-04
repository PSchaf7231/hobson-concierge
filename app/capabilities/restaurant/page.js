'use client'

import { Button } from '@/components/ui/button'
import { Printer, Phone, Mail, Globe, ChefHat, MapPin, DollarSign, TrendingUp } from 'lucide-react'

export default function RestaurantCapabilityPage() {
  return (
    <div className="min-h-screen bg-[#F5EDE0] print:bg-white">
      <div className="print:hidden bg-[#1B3A4F] text-white">
        <div className="max-w-4xl mx-auto px-6 py-3 flex items-center justify-between">
          <div className="text-xs uppercase tracking-[0.25em] text-[#C8CCD1]/70">Restaurant Capability Statement</div>
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
              <ChefHat className="h-3.5 w-3.5" />Restaurant Practice
            </div>
          </div>
        </div>

        {/* Headline */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <div className="h-px w-12 bg-[#C9A867]" />
            <span className="text-[#1B3A4F]/60 text-xs uppercase tracking-[0.3em]">Restaurant Real Estate</span>
          </div>
          <h1 className="font-serif text-4xl text-[#1B3A4F] leading-tight">
            Real estate that fits <span className="italic text-[#C9A867]">how your concept actually operates.</span>
          </h1>
        </div>

        {/* Lede */}
        <p className="text-[#1B3A4F]/85 text-lg leading-relaxed mb-8">
          From ground-lease pad sites and end-cap conversions to second-generation build-outs and full-service ground-up, Next Endeavor CRE represents restaurant operators, franchisees, and multi-unit groups on the real estate decisions that make or break a unit's economics. We think in covers, daypart, drive-thru throughput, and trade-area saturation — not just square footage.
        </p>

        {/* Two-column: What We Do / Asset Types */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-[#F5EDE0] border border-[#C9A867]/30 rounded p-5">
            <div className="text-xs uppercase tracking-[0.25em] text-[#1B3A4F]/60 mb-3">What We Do</div>
            <ul className="space-y-2 text-sm text-[#1B3A4F]/85">
              <li className="flex gap-2"><span className="text-[#C9A867]">◆</span>Tenant representation — lease vs. buy modeling</li>
              <li className="flex gap-2"><span className="text-[#C9A867]">◆</span>Site selection &amp; trade-area analysis</li>
              <li className="flex gap-2"><span className="text-[#C9A867]">◆</span>Second-generation restaurant acquisitions</li>
              <li className="flex gap-2"><span className="text-[#C9A867]">◆</span>Ground-lease &amp; build-to-suit pad development</li>
              <li className="flex gap-2"><span className="text-[#C9A867]">◆</span>End-cap, in-line, and freestanding conversions</li>
              <li className="flex gap-2"><span className="text-[#C9A867]">◆</span>Lease renewals, renegotiations &amp; relocations</li>
              <li className="flex gap-2"><span className="text-[#C9A867]">◆</span>Sale-leaseback advisory for owner-operators</li>
              <li className="flex gap-2"><span className="text-[#C9A867]">◆</span>Multi-unit portfolio strategy &amp; rollout</li>
            </ul>
          </div>
          <div className="bg-[#F5EDE0] border border-[#C9A867]/30 rounded p-5">
            <div className="text-xs uppercase tracking-[0.25em] text-[#1B3A4F]/60 mb-3">Concepts We Serve</div>
            <ul className="space-y-2 text-sm text-[#1B3A4F]/85">
              <li className="flex gap-2"><span className="text-[#C9A867]">◆</span>QSR &amp; fast-casual (drive-thru and walk-up)</li>
              <li className="flex gap-2"><span className="text-[#C9A867]">◆</span>Full-service casual &amp; fine dining</li>
              <li className="flex gap-2"><span className="text-[#C9A867]">◆</span>Coffee, juice, smoothie &amp; ice-cream</li>
              <li className="flex gap-2"><span className="text-[#C9A867]">◆</span>Ghost kitchens &amp; commissary build-outs</li>
              <li className="flex gap-2"><span className="text-[#C9A867]">◆</span>Bars, lounges &amp; entertainment venues</li>
              <li className="flex gap-2"><span className="text-[#C9A867]">◆</span>Hotel F&amp;B and mixed-use anchor restaurants</li>
              <li className="flex gap-2"><span className="text-[#C9A867]">◆</span>Franchise rollouts &amp; emerging brands</li>
              <li className="flex gap-2"><span className="text-[#C9A867]">◆</span>Independent chef-driven concepts</li>
            </ul>
          </div>
        </div>

        {/* Differentiators */}
        <div className="mb-8">
          <div className="text-xs uppercase tracking-[0.25em] text-[#1B3A4F]/60 mb-3">How We Underwrite a Site</div>
          <div className="grid grid-cols-3 gap-4">
            <div className="border-l-2 border-[#C9A867] pl-3">
              <MapPin className="h-5 w-5 text-[#C9A867] mb-1" />
              <div className="font-semibold text-[#1B3A4F]">Trade Area Fit</div>
              <div className="text-xs text-[#1B3A4F]/70 mt-1">Demographics, daypart traffic, household income, competition density, co-tenancy strength.</div>
            </div>
            <div className="border-l-2 border-[#C9A867] pl-3">
              <DollarSign className="h-5 w-5 text-[#C9A867] mb-1" />
              <div className="font-semibold text-[#1B3A4F]">Unit Economics</div>
              <div className="text-xs text-[#1B3A4F]/70 mt-1">Occupancy cost as % of projected sales, build-out CapEx vs. TI dollars, breakeven covers per daypart.</div>
            </div>
            <div className="border-l-2 border-[#C9A867] pl-3">
              <TrendingUp className="h-5 w-5 text-[#C9A867] mb-1" />
              <div className="font-semibold text-[#1B3A4F]">Operational Reality</div>
              <div className="text-xs text-[#1B3A4F]/70 mt-1">Hood/grease infrastructure, gas service, parking ratios, drive-thru stacking, patio &amp; signage rights, hours of operation.</div>
            </div>
          </div>
        </div>

        {/* Value statement */}
        <div className="bg-[#1B3A4F] text-white rounded p-6 mb-8 print:break-inside-avoid">
          <div className="text-xs uppercase tracking-[0.25em] text-[#E2C285]/80 mb-2">Why Operators Work With Us</div>
          <p className="text-[#F5EDE0] leading-relaxed">
            A restaurant's rent number is the only line on the P&amp;L that's fixed for ten years. We treat the lease the way you treat the menu — with precision, intentionality, and an eye on the long game. Our advisory is grounded in the same economics that operators run their business on, not generic commercial brokerage instincts.
          </p>
        </div>

        {/* Contact footer */}
        <div className="mt-10 pt-6 border-t border-[#C9A867]/40 grid grid-cols-2 items-end gap-6">
          <div>
            <img src="/next-endeavor.png" alt="" className="h-14 w-14 object-contain mb-2" />
            <div className="font-serif text-xl text-[#1B3A4F]">Next Endeavor CRE</div>
            <div className="text-[10px] uppercase tracking-[0.25em] text-[#1B3A4F]/50 mt-1">Restaurant Practice</div>
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
