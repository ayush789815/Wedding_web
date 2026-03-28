'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { BlankArrow, CurveArrow } from '@/components/ui/Arrows'
import ScaleLines from '@/components/ui/ScaleLines'

gsap.registerPlugin(ScrollTrigger)

const mainLinks = [
  { href: '/', label: 'Home' },
  { href: '/wedding', label: 'Wedding' },
  { href: '/creation', label: 'Creation' },
  { href: '/whats_ykp', label: "What's YKP" },
  { href: '/topics', label: 'Topics' },
  { href: '/recruit', label: 'Recruit', external: true },
]

const subLinks = {
  Group: [
    { href: 'https://ykagent.jp', label: 'YK Agent', external: true },
    { href: '#', label: 'KRK Produce', external: false },
  ],
  Instagram: [
    { href: 'https://instagram.com/ykproduce_inc', label: 'ykproduce_inc', external: true },
    { href: 'https://instagram.com/kyogare', label: 'kyogare', external: true },
  ],
  Facebook: [
    { href: 'https://facebook.com/ykproduceinc', label: 'YKProduce Inc.', external: true },
  ],
}

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null)
  const logoRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Logo path animation
    const paths = logoRef.current?.querySelectorAll('path, rect, line')
    if (paths) {
      gsap.fromTo(
        paths,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.04,
          duration: 0.7,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 80%',
            once: true,
          },
        }
      )
    }
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    const lenis = (window as any).lenis
    if (lenis) lenis.scrollTo(0)
  }

  return (
    <footer ref={footerRef} className="bg-black text-white relative overflow-hidden">
      {/* Background video */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <video
          src="/video/footer.mp4"
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
        />
      </div>

      <div className="relative z-10">
        {/* Breadcrumb + back to top */}
        <div className="flex items-center justify-between px-6 lg:px-16 xl:px-24 py-6 border-b border-white/10">
          <nav className="font-poppins text-xs tracking-[0.2em] text-white/40">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
          </nav>
          <button
            onClick={scrollToTop}
            className="font-poppins text-xs tracking-[0.2em] text-white/40 hover:text-white transition-colors flex items-center gap-2"
          >
            <span>[Back to Top]</span>
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
              <path d="M5 9V1M1 5L5 1L9 5" stroke="currentColor" strokeWidth="0.8"/>
            </svg>
          </button>
        </div>

        {/* Main footer content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 px-6 lg:px-16 xl:px-24 py-16 lg:py-24">

          {/* Left: contact info */}
          <div className="space-y-8">
            {/* Contact card */}
            <Link
              href="/contact"
              className="group block border border-white/20 p-8 hover:border-white/50 transition-colors duration-300 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]" />
              <div className="relative z-10">
                <h3 className="font-poppins text-2xl font-light text-white group-hover:text-black transition-colors duration-300">
                  Contact
                </h3>
                <p className="text-white/50 text-sm mt-2 group-hover:text-black/60 transition-colors duration-300">
                  Let&apos;s create something beautiful together.<br />We&apos;d love to hear from you.
                </p>
              </div>
              <div className="absolute bottom-6 right-6 z-10 transition-transform duration-300 group-hover:translate-x-1">
                <CurveArrow color="currentColor" />
              </div>
            </Link>

            {/* Phone */}
            <div className="flex items-center gap-4 px-2">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-white/40 shrink-0">
                <path d="M14.5 11.5L12 14C9 11 5 7 2 4L4.5 1.5L7 4.5L5.5 6C6.5 7.5 8.5 9.5 10 10.5L11.5 9L14.5 11.5Z" stroke="currentColor" strokeWidth="0.8"/>
              </svg>
              <div>
                <p className="font-poppins text-lg tracking-widest text-white">03-5413-6538</p>
                <p className="text-white/40 text-xs mt-1">Weekdays / Weekends  11:00 – 18:00</p>
              </div>
            </div>

            {/* Banner placeholder */}
            <div className="border border-white/10 p-4 flex items-center gap-4">
              <div className="w-12 h-12 bg-white/10 rounded" />
              <div>
                <p className="font-poppins text-sm text-white/60">K+ Wedding Studio</p>
                <p className="text-white/30 text-xs">k-plus.ykproduce.co.jp</p>
              </div>
            </div>
          </div>

          {/* Right: navigation */}
          <div className="space-y-10">
            {/* Main nav */}
            <nav>
              <ScaleLines count={60} color="rgba(255,255,255,0.2)" className="mb-4" />
              <ul className="space-y-1">
                {mainLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      target={link.external ? '_blank' : undefined}
                      rel={link.external ? 'noopener noreferrer' : undefined}
                      className="group flex items-center justify-between py-3 border-b border-white/10 hover:border-white/30 transition-colors"
                    >
                      <span className="font-poppins text-xl font-light text-white group-hover:translate-x-2 transition-transform duration-300 inline-block">
                        {link.label}
                      </span>
                      {link.external ? <BlankArrow /> : <CurveArrow />}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Sub links */}
            <div className="grid grid-cols-3 gap-6">
              {Object.entries(subLinks).map(([group, links]) => (
                <div key={group}>
                  <p className="font-poppins text-[10px] tracking-[0.2em] text-white/30 uppercase mb-3">
                    {group}:
                  </p>
                  <ul className="space-y-2">
                    {links.map((link) => (
                      <li key={link.href}>
                        <a
                          href={link.href}
                          target={link.external ? '_blank' : undefined}
                          rel={link.external ? 'noopener noreferrer' : undefined}
                          className="font-poppins text-xs text-white/50 hover:text-white transition-colors flex items-center gap-1"
                        >
                          <span>{link.label}</span>
                          {link.external && <BlankArrow />}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Large logo */}
        <div
          ref={logoRef}
          className="px-6 lg:px-16 xl:px-24 py-12 border-t border-white/10 overflow-hidden"
        >
          <svg
            viewBox="0 0 1306 117"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full text-white opacity-80"
          >
            <g fill="currentColor">
              <path d="M98.5858 0L58.9853 56.4481L58.4315 55.5986L19.5694 0H0L51.2314 72.4953V116.955H65.5392V72.4953L65.7238 72.3065L116.955 0H98.5858Z"/>
              <path d="M152.042 0H136.448V116.955H152.042V0Z"/>
              <path d="M224.642 0L167.636 58.4776L224.642 116.955H245.606L188.691 58.4776L245.606 0H224.642Z"/>
              <path d="M411.106 0H319.678V116.955H335.058V66.0764H411.201C429.524 66.0764 444.43 51.2564 444.43 33.0382C444.43 14.82 429.524 0 411.201 0H411.106ZM411.106 50.8788H335.818H334.963V15.3864H411.106C420.98 15.3864 429.05 23.4099 429.05 33.1326C429.05 42.8553 420.98 50.9732 411.106 50.9732V50.8788Z"/>
              <path d="M592.481 33.0382C592.481 14.82 578.041 0 560.29 0H471.719V116.955H486.619V15.1976H560.382C569.948 15.1976 577.765 23.2211 577.765 32.9438C577.765 42.6665 569.948 50.7844 560.382 50.7844H506.026L570.408 116.955H591.47L541.896 66.0764H560.382C578.133 66.0764 592.573 51.2564 592.573 33.0382H592.481Z"/>
              <path d="M699.881 0H649.002C630.784 0 615.964 14.82 615.964 33.0382V83.917C615.964 102.135 630.784 116.955 649.002 116.955H699.881C718.099 116.955 732.919 102.135 732.919 83.917V33.0382C732.919 14.82 718.099 0 699.881 0ZM717.722 83.917C717.722 93.7341 709.698 101.758 699.976 101.758H649.097C639.28 101.758 631.256 93.7341 631.256 83.917V33.0382C631.256 23.2211 639.28 15.292 649.097 15.292H699.976C709.793 15.292 717.722 23.3155 717.722 33.0382V83.917Z"/>
              <path d="M844.126 0H760.209V116.955H844.126C862.344 116.955 877.164 102.135 877.164 83.917V33.0382C877.164 14.82 862.344 0 844.126 0ZM861.967 83.917C861.967 93.7341 853.943 101.758 844.126 101.758H775.407V15.292H844.126C853.943 15.292 861.967 23.3155 861.967 33.1326V84.0114V83.917Z"/>
              <path d="M1006.31 84.0114C1006.31 93.8285 998.282 101.758 988.465 101.758H937.586C927.769 101.758 919.746 93.7341 919.746 83.917V0H904.454V83.917C904.454 102.135 919.274 116.955 937.492 116.955H988.371C1006.59 116.955 1021.41 102.135 1021.41 83.917V0H1006.12V83.917L1006.31 84.0114Z"/>
              <path d="M1077.84 15.1976H1128.72C1138.25 15.1976 1146.09 22.7492 1146.46 32.1886H1161.76C1161.28 14.348 1146.65 0 1128.72 0H1077.84C1059.62 0 1044.8 14.82 1044.8 33.0382V83.917C1044.8 102.135 1059.62 116.955 1077.84 116.955H1128.72C1146.65 116.955 1161.28 102.607 1161.76 84.7666H1146.46C1145.99 94.2061 1138.25 101.758 1128.72 101.758H1077.84C1068.02 101.758 1060.09 93.7341 1060.09 83.917V33.0382C1060.09 23.2211 1068.12 15.292 1077.84 15.292V15.1976Z"/>
              <path d="M1306 15.292V0H1189.04V116.955H1306V101.758H1204.34V66.1708H1289.1V50.8788H1205.19L1204.34 50.7844V15.292H1306Z"/>
            </g>
          </svg>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-6 lg:px-16 xl:px-24 py-6 border-t border-white/10">
          <small className="font-poppins text-xs text-white/30 tracking-widest">
            ©YK PRODUCE Inc.
          </small>
          <Link
            href="/privacy"
            className="font-poppins text-xs text-white/30 hover:text-white transition-colors tracking-widest"
          >
            Privacy Policy
          </Link>
        </div>
      </div>
    </footer>
  )
}
