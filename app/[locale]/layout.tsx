// These styles apply to every route in the application
import '@/styles/globals.css'
import { Metadata, ResolvingMetadata, Viewport } from 'next'
import { getTranslations } from 'next-intl/server'
import { Inter } from 'next/font/google'
import { Toaster } from 'react-hot-toast'
import AuthStatus from '@/components/auth-status'
import { Suspense } from 'react'

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
})

type Props = {
  params: { locale: string }
}

export async function generateMetadata({
  params: { locale },
}: Props): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'Metadata' })

  return {
    title: t('title'),
    description: t('description'),
    twitter: {
      card: 'summary_large_image',
      title: t('title'),
      description: t('description'),
    },
    metadataBase: new URL('https://nextjs-postgres-auth.vercel.app'),
  }
}

export const viewport: Viewport = {
  themeColor: '#FFF',
}

export default async function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  return (
    <html lang={locale}>
      <body className={inter.variable}>
        <Toaster />
        <Suspense fallback='Chargement...'>
          <AuthStatus />
        </Suspense>
        {children}
      </body>
    </html>
  )
}
