import Link from 'next/link'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#080808] flex items-center justify-center px-8">
        <div className="text-center">
          <p className="font-poppins text-[120px] md:text-[200px] font-extralight text-white/5 leading-none select-none">
            404
          </p>
          <div className="-mt-8 md:-mt-12">
            <h1 className="font-poppins font-extralight text-white text-2xl md:text-4xl mb-6">
              Page not found
            </h1>
            <p className="text-white/30 text-sm leading-relaxed mb-12">
              The page you&apos;re looking for doesn&apos;t exist or has been moved.<br />
              Please check the URL or return to the homepage.
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-3 font-poppins text-xs tracking-widest text-white border border-white/20 px-10 py-4 hover:bg-white hover:text-black transition-all duration-500"
            >
              Back to Home
              <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
                <path d="M1 0V6C1 7 1.1 8.5 3.5 8.5H11.5" stroke="currentColor"/>
                <path d="M8 4L12.5 8.5L8 13" stroke="currentColor"/>
              </svg>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
