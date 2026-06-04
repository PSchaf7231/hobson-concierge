import './globals.css'
import { Providers } from './providers'

export const metadata = {
  title: 'Atlas — AI Real Estate Concierge',
  description: 'Autonomous AI concierge for luxury residential & commercial/medical acquisition.'
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
