import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import MobileMenu from '@/components/layout/MobileMenu'
import PageHero from '@/components/sections/PageHero'
import WeddingServices from '@/components/sections/wedding/WeddingServices'
import WeddingWorks from '@/components/sections/wedding/WeddingWorks'
import WeddingCta from '@/components/sections/wedding/WeddingCta'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Wedding | YK PRODUCE Inc.',
  description: 'Wedding Services — Photography, Album Production & Videography by YK Produce Inc.',
}

export default function WeddingPage() {
  return (
    <>
      <Header />
      <MobileMenu />
      <main>
        <PageHero
          eyebrow="Section [01]"
          titleEn="Wedding"
          titleJa="Wedding Business"
          description="We preserve the most important day of your life as a timeless record. Through photography, album production, and videography, we turn your emotions into art."
          heroImage="/images/wedding-couple-01.jpg"
          breadcrumb={[{ label: 'Wedding', href: '/wedding' }]}
        />
        <WeddingServices />
        <WeddingWorks />
        <WeddingCta />
      </main>
      <Footer />
    </>
  )
}
