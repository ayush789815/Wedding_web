import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import MobileMenu from '@/components/layout/MobileMenu'
import PageHero from '@/components/sections/PageHero'
import ContactForm from '@/components/sections/contact/ContactForm'
import ContactInfo from '@/components/sections/contact/ContactInfo'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact | YK PRODUCE Inc.',
  description: 'Contact Us — Get in touch with YK PRODUCE Inc. for wedding photography, videography, studio rental, and creative production inquiries.',
}

export default function ContactPage() {
  return (
    <>
      <Header />
      <MobileMenu />
      <main>
        <PageHero
          eyebrow="Get in touch"
          titleEn="Contact"
          titleJa="Get In Touch"
          description="Consultations and estimates are free of charge. We'd love to hear about your project — please feel free to reach out at any time."
          breadcrumb={[{ label: 'Contact', href: '/contact' }]}
        />
        <div className="bg-[#080808]">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-0 min-h-screen">
            <ContactForm />
            <ContactInfo />
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
