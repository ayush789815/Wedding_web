import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import MobileMenu from '@/components/layout/MobileMenu'
import PageHero from '@/components/sections/PageHero'
import AboutMission from '@/components/sections/whats_ykp/AboutMission'
import AboutTeam from '@/components/sections/whats_ykp/AboutTeam'
import AboutValues from '@/components/sections/whats_ykp/AboutValues'
import WeddingCta from '@/components/sections/wedding/WeddingCta'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: "What's YKP | YK PRODUCE Inc.",
  description: "About YK Produce — Turning vision into art, and art into enduring memories since 2015.",
}

export default function WhatsYKPPage() {
  return (
    <>
      <Header />
      <MobileMenu />
      <main>
        <PageHero
          eyebrow="About Us"
          titleEn="What's YKP"
          titleJa="About YK Produce"
          description="We listen closely to every client's vision and craft one-of-a-kind experiences that go beyond expectations. We add playfulness to precision — leaving a lasting impression on every heart."
          breadcrumb={[{ label: "What's YKP", href: '/whats_ykp' }]}
        />
        <AboutMission />
        <AboutValues />
        <AboutTeam />
        <WeddingCta />
      </main>
      <Footer />
    </>
  )
}
