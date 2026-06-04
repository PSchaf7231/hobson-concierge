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
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
