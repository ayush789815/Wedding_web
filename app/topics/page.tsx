import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import MobileMenu from '@/components/layout/MobileMenu'
import PageHero from '@/components/sections/PageHero'
import TopicsGrid from '@/components/sections/topics/TopicsGrid'
import { topics } from '@/lib/topics'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Topics | YK PRODUCE Inc.',
  description: 'Topics — Latest news, award announcements, and project updates from YK PRODUCE Inc.',
}

export default function TopicsPage() {
  return (
    <>
      <Header />
      <MobileMenu />
      <main>
        <PageHero
          eyebrow="Latest Updates"
          titleEn="Topics"
          titleJa="News & Updates"
          description="Stay up to date with the latest news, award announcements, and project highlights from the YK Produce team."
          breadcrumb={[{ label: 'Topics', href: '/topics' }]}
        />
        <TopicsGrid topics={topics} />
      </main>
      <Footer />
    </>
  )
}
