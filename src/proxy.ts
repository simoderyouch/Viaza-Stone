import { NextResponse, type NextRequest } from 'next/server'
import { isLocale, type Locale } from '@/i18n/config'

const defaultLocale: Locale = 'en'

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  const [firstSegment, ...rest] = pathname.split('/').filter(Boolean)

  if (isLocale(firstSegment)) {
    const requestHeaders = new Headers(request.headers)
    requestHeaders.set('x-viaza-locale', firstSegment)
    const rewriteUrl = request.nextUrl.clone()
    rewriteUrl.pathname = `/${rest.join('/')}`
    const response = NextResponse.rewrite(rewriteUrl, { request: { headers: requestHeaders } })
    response.cookies.set('viaza-locale', firstSegment, { path: '/', maxAge: 60 * 60 * 24 * 365, sameSite: 'lax' })
    return response
  }

  const preferredLocale = request.cookies.get('viaza-locale')?.value
  const locale = isLocale(preferredLocale) ? preferredLocale : defaultLocale
  const redirectUrl = request.nextUrl.clone()
  redirectUrl.pathname = `/${locale}${pathname === '/' ? '' : pathname}`
  return NextResponse.redirect(redirectUrl)
}

export const config = {
  matcher: ['/((?!_next|api|favicon.ico|robots.txt|sitemap.xml|.*\\..*).*)'],
}
