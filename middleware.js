import { NextResponse } from 'next/server'

// paul.askhobson.homes serves the business card at its root; everything else
// on that host (/paul/vcard, images, _next assets) resolves normally.
export function middleware(request) {
  const host = request.headers.get('host') || ''
  if (host.startsWith('paul.')) {
    const url = request.nextUrl.clone()
    url.pathname = '/paul'
    return NextResponse.rewrite(url)
  }
}

export const config = { matcher: '/' }
