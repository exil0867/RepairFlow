import createMiddleware from 'next-intl/middleware'
import NextAuth from 'next-auth'
import { authConfig } from './auth.config'
import { NextRequest, NextResponse } from 'next/server'
import { localePrefix, locales } from './config'

interface AppRouteHandlerFnContext {
  params?: Record<string, string | string[]>
}

const i18nMiddleware = createMiddleware({
  locales,
  localePrefix,
  defaultLocale: 'en',
})

export const middleware = (
  request: NextRequest,
  event: AppRouteHandlerFnContext,
): NextResponse => {
  return NextAuth(authConfig).auth(() => {
    return i18nMiddleware(request)
  })(request, event) as NextResponse
}

export const config = {
  matcher: ['/', '/(en|fr)/:path*', '/((?!_next|_vercel|.*\\..*).*)'],
}
