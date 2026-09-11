import Script from 'next/script'
import './globals.css'
import { Providers } from './providers'

export const metadata = {
  title: 'Hobson — The Anasa Collection × Next Endeavor CRE',
  description: 'Hobson, your AI concierge. Bespoke real estate advisory for luxury residential and commercial acquisition.',
  icons: {
    icon: '/anasa.png',
    shortcut: '/anasa.png',
    apple: '/anasa.png'
  }
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head />
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
