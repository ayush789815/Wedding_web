import type { Metadata } from 'next'
import { Poppins, Noto_Sans_JP } from 'next/font/google'
import './globals.css'
import SmoothScrollProvider from '@/components/ui/SmoothScrollProvider'
import CustomCursor from '@/components/ui/CustomCursor'
import ScrollProgress from '@/components/ui/ScrollProgress'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-poppins',
  display: 'swap',
})

const noto = Noto_Sans_JP({
  subsets: ['latin'],
  weight: ['100', '300', '400', '500', '700', '900'],
  variable: '--font-noto',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'YK PRODUCE Inc.',
  description: 'YK Produce Inc. — Wedding photography, videography, album production, studio rental, and creative event planning based in Minami-Aoyama, Tokyo.',
  openGraph: {
    title: 'YK PRODUCE Inc.',
    description: 'YK Produce Inc. — Wedding photography, videography, album production, studio rental, and creative event planning based in Minami-Aoyama, Tokyo.',
    type: 'website',
    locale: 'ja_JP',
    images: [{ url: '/images/ogp.png', width: 1200, height: 630 }],
  },
  twitter: { card: 'summary_large_image' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja" className={`${poppins.variable} ${noto.variable}`}>
      <body>
        <ScrollProgress />
        <CustomCursor />
        <SmoothScrollProvider>
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  )
}
