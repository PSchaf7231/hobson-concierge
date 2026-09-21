'use client'

import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion'
import { FAQS } from '@/lib/seo/faq-data'

const GOLD = '#D4AF37'
const NAVY = '#0A1628'

const GUIDES = [
  { href: '/living-in-delray-beach', label: 'Living in Delray Beach' },
  { href: '/boca-raton-luxury-homes', label: 'Boca Raton Luxury Homes' },
  { href: '/palm-beach-county-homes', label: 'Palm Beach County Homes' },
  { href: '/relocating-to-palm-beach-county', label: 'Relocating to Palm Beach County' },
  { href: '/palm-beach-waterfront-vs-inland', label: 'Waterfront vs Inland' }
]

export function GuidePanel({ open, onOpenChange }) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full sm:max-w-md overflow-y-auto" style={{ background: NAVY, borderColor: `${GOLD}30` }}>
        <SheetHeader>
          <SheetTitle style={{ color: GOLD, fontWeight: 500 }}>Guide &amp; FAQ</SheetTitle>
        </SheetHeader>

        <div className="mt-4">
          <p className="text-[10px] uppercase tracking-[0.22em] mb-2" style={{ color: `${GOLD}CC` }}>Guides</p>
          <div className="flex flex-col gap-1 mb-6">
            {GUIDES.map((g) => (
              <a
                key={g.href}
                href={g.href}
                className="text-sm text-[#F5EDE0]/85 hover:text-[#D4AF37] transition py-1"
              >
                {g.label} →
              </a>
            ))}
          </div>

          <p className="text-[10px] uppercase tracking-[0.22em] mb-2" style={{ color: `${GOLD}CC` }}>Frequently Asked</p>
          <Accordion type="single" collapsible className="w-full">
            {FAQS.map((item, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="border-[#D4AF37]/15">
                <AccordionTrigger className="text-left text-sm text-[#F5EDE0] hover:text-[#D4AF37] hover:no-underline">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="text-sm text-[#F5EDE0]/70 leading-relaxed">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </SheetContent>
    </Sheet>
  )
}

export default GuidePanel
