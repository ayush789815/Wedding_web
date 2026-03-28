import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import MobileMenu from '@/components/layout/MobileMenu'
import Loading from '@/components/ui/Loading'
import Hero from '@/components/sections/Hero'
import OurSections from '@/components/sections/OurSections'
import WhatsYKP from '@/components/sections/WhatsYKP'
import VideoCopy from '@/components/sections/VideoCopy'
import Topics from '@/components/sections/Topics'
import Catch from '@/components/sections/Catch'

const topics = [
  {
    href: '/topics/20260326',
    image: '/images/pexels-alexander-mass-748453803-33815179.jpg',
    date: '2026.03.26',
    tag: 'Media',
    category: 'Feature',
    title: "YK Produce Featured on ABEMA TV",
  },
  {
    href: '/topics/20260227',
    image: '/images/pexels-juliano-goncalves-1623825-32995149.jpg',
    date: '2026.02.27',
    tag: 'News',
    category: 'Award',
    title: 'Asia Wedding Photo Awards 2025 Winner',
  },
  {
    href: '/topics/20260101',
    image: '/images/wedding-couple-01.jpg',
    date: '2026.01.01',
    tag: 'News',
    category: '',
    title: 'HAPPY NEW YEAR 2026',
  },
]

export default function Home() {
  return (
    <>
      <Loading />
      <Header />
      <MobileMenu />
      <main>
        <Hero />
        <OurSections />
        <WhatsYKP />
        <VideoCopy />
        <Topics topics={topics} />
        <Catch />
      </main>
      <Footer />
    </>
  )
}
