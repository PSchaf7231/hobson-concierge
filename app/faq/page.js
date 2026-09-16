import { GuidePageLayout } from '@/components/GuidePageLayout'
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion'
import { FAQS } from '@/lib/seo/faq-data'

export const metadata = {
  title: 'FAQ | Ask Hobson Luxury Concierge | Palm Beach County',
  description: 'Answers on Hobson, The Anasa Collection, relocating to Delray Beach or Boca Raton, and when to call Paul Schafranick at VantaSure Realty. 561-255-7285.',
  alternates: { canonical: 'https://www.askhobson.homes/faq' }
}

export default function FaqPage() {
  return (
    <GuidePageLayout eyebrow="Guide" title="Frequently Asked">
      <Accordion type="single" collapsible className="w-full">
        {FAQS.map((item, i) => (
          <AccordionItem key={i} value={`item-${i}`} className="border-[#D4AF37]/15">
            <AccordionTrigger className="text-left text-[#F5EDE0] hover:text-[#D4AF37] hover:no-underline">
              {item.q}
            </AccordionTrigger>
            <AccordionContent className="text-[#F5EDE0]/70 leading-relaxed">
              {item.a}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </GuidePageLayout>
  )
}
