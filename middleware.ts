import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(req: NextRequest) {
  const { nextUrl } = req
  const { pathname } = nextUrl

  // Allow Next internals, API routes, and requests for static assets (files with extensions)
  const hasExtension = pathname.match(/\.[^/]+$/)
  if (
    pathname === '/404' ||
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/static') ||
    hasExtension
  ) {
    return NextResponse.next()
  }

  // Redirect all other navigation to /404
  const url = req.nextUrl.clone()
  url.pathname = '/404'
  return NextResponse.redirect(url)
}
