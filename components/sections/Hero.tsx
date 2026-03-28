'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import { gsap } from 'gsap'

const HeroThree = dynamic(() => import('@/components/three/HeroThree'), { ssr: false })

export default function Hero() {
  const contentRef = useRef<HTMLDivElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const tl = gsap.timeline({ delay: 1.8 })
    tl.fromTo(
      contentRef.current?.querySelectorAll('.hero-line') ?? [],
      { y: 60, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.15, duration: 1.2, ease: 'expo.out' }
    )
    .fromTo(subtitleRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, ease: 'expo.out' }, '-=0.5')
    .fromTo(scrollRef.current, { opacity: 0 }, { opacity: 1, duration: 0.7 }, '-=0.4')
  }, [])

  return (
    <section className="relative w-full h-screen overflow-hidden bg-[#080808]">

      {/* Background wedding photo — base layer */}
      <Image
        src="/images/pexels-thevisionaryvows-32994468.jpg"
        alt="YK Produce — Wedding Photography"
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
        style={{ zIndex: 0, opacity: 0.28 }}
      />

      {/* Deep dark overlay so photo doesn't overpower the Three.js */}
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(to bottom, rgba(8,8,8,0.55) 0%, rgba(8,8,8,0.3) 50%, rgba(8,8,8,0.7) 100%)', zIndex: 1 }}
      />

      {/* Three.js animation layer on top */}
      <div className="absolute inset-0" style={{ zIndex: 2, mixBlendMode: 'screen' }}>
        <HeroThree />
      </div>

      {/* Vignette */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 80% 80% at 50% 50%, transparent 20%, rgba(8,8,8,0.70) 100%)', zIndex: 4 }} />
      <div className="absolute bottom-0 left-0 right-0 h-56 pointer-events-none" style={{ background: 'linear-gradient(to top, #080808, transparent)', zIndex: 4 }} />

      {/* Content */}
      <div ref={contentRef} className="absolute inset-0 flex flex-col items-center justify-center text-center px-6" style={{ zIndex: 5 }}>
        <div className="hero-line opacity-0 mb-8">
          <span className="font-poppins text-[10px] tracking-[0.5em] text-white/30 uppercase">YK PRODUCE Inc.</span>
        </div>

        <div className="hero-line opacity-0">
          <h1 className="font-poppins font-extralight text-white leading-none" style={{ fontSize: 'clamp(48px, 8.5vw, 120px)', letterSpacing: '-0.02em' }}>
            Vision Into Form.
          </h1>
        </div>
        <div className="hero-line opacity-0 mt-2">
          <h1 className="font-poppins font-extralight text-white/60 leading-none" style={{ fontSize: 'clamp(48px, 8.5vw, 120px)', letterSpacing: '-0.02em' }}>
            Form Into Play.
          </h1>
        </div>

        <p ref={subtitleRef} className="opacity-0 font-poppins text-[10px] tracking-[0.35em] text-white/25 uppercase mt-12">
          Wedding · Creation · Playful Minds
        </p>
      </div>

      {/* Scroll */}
      <div ref={scrollRef} className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 opacity-0" style={{ zIndex: 5 }}>
        <div className="w-px h-14 relative overflow-hidden bg-white/10">
          <div className="absolute top-0 left-0 w-full bg-white" style={{ height: '40%', animation: 'scrollDown 1.6s cubic-bezier(.4,0,.2,1) infinite' }} />
        </div>
        <p className="font-poppins text-[9px] tracking-[0.4em] text-white/30 uppercase">Scroll</p>
      </div>

      <style>{`@keyframes scrollDown { 0%{transform:translateY(-100%)} 100%{transform:translateY(280%)} }`}</style>
    </section>
  )
}
