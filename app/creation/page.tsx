import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import MobileMenu from '@/components/layout/MobileMenu'
import PageHero from '@/components/sections/PageHero'
import CreationServices from '@/components/sections/creation/CreationServices'
import CreationProjects from '@/components/sections/creation/CreationProjects'
import WeddingCta from '@/components/sections/wedding/WeddingCta'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Creation | YK PRODUCE Inc.',
  description: 'Creative Production — Studio Operations, Video Production & Event Planning by YK Produce Inc.',
}

export default function CreationPage() {
  return (
    <>
      <Header />
      <MobileMenu />
      <main>
        <PageHero
          eyebrow="Section [02]"
          titleEn="Creation"
          titleJa="Creative Production"
          description="From studio operations to video production and event planning — our talented team of creatives turns your vision into a reality that resonates and endures."
          heroImage="/images/pexels-alexander-mass-748453803-35495418.jpg"
          breadcrumb={[{ label: 'Creation', href: '/creation' }]}
        />
        <CreationServices />
        <CreationProjects />
        <WeddingCta />
      </main>
      <Footer />
    </>
  )
}
