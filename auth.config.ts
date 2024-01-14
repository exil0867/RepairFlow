import type { NextAuthConfig } from 'next-auth'
import { NextResponse } from 'next/server'

export const authConfig = {
  pages: {
    signIn: '/login',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl, url } }) {
      if (nextUrl.pathname === '/')
        return NextResponse.redirect(new URL('/login', url))
      const isLoggedIn = !!auth?.user
      const root = nextUrl.pathname.startsWith('/dashboard')
      if (root) {
        if (isLoggedIn) return true
        return false // Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        return true
      }
      return true
    },
  },
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig
