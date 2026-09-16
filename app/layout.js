import Script from 'next/script'
import './globals.css'
import { Providers } from './providers'
import schemaLocalBusiness from '@/lib/seo/schema-localbusiness.json'

const siteUrl = 'https://www.askhobson.homes'

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: 'Ask Hobson | Palm Beach Luxury Homes & Concierge | Delray–Boca',
  description: 'Talk to Hobson — the Anasa Collection × Next Endeavor CRE concierge for Palm Beach County. Luxury homes $1M+ and medical NNN advisory with Paul Schafranick, VantaSure Realty. Call 561-255-7285.',
  alternates: { canonical: siteUrl },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    siteName: 'Ask Hobson',
    title: 'Ask Hobson | Palm Beach Luxury Concierge',
    description: 'Talk to Hobson — the Anasa Collection × Next Endeavor CRE concierge for Palm Beach County. Luxury homes $1M+ and medical NNN advisory with Paul Schafranick, VantaSure Realty.'
  },
  icons: {
    icon: '/anasa.png',
    shortcut: '/anasa.png',
    apple: '/anasa.png'
  }
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <Script
          id="schema-localbusiness"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaLocalBusiness) }}
        />
      </head>
      <body className="bg-background text-foreground antialiased">
        {process.env.NEXT_PUBLIC_CLARITY_ID && (
          <Script id="ms-clarity" strategy="afterInteractive">
            {`(function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "${process.env.NEXT_PUBLIC_CLARITY_ID}");`}
          </Script>
        )}
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
