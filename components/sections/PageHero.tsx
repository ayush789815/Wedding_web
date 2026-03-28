'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { gsap } from 'gsap'
import Link from 'next/link'

interface PageHeroProps {
  eyebrow: string
  titleEn: string
  titleJa: string
  description?: string
  breadcrumb?: { label: string; href: string }[]
  heroImage?: string
}

export default function PageHero({ eyebrow, titleEn, titleJa, description, breadcrumb = [], heroImage }: PageHeroProps) {
  const titleRef = useRef<HTMLDivElement>(null)
  const descRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.3 })
    tl.fromTo(
      titleRef.current?.querySelectorAll('.ph-char') ?? [],
      { y: '110%' },
      { y: '0%', stagger: 0.025, duration: 1, ease: 'expo.out' }
    )
    if (descRef.current) {
      tl.fromTo(descRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.9, ease: 'expo.out' }, '-=0.5')
    }
  }, [])

  return (
    <section className="relative pt-40 pb-24 px-8 md:px-16 bg-[#080808] overflow-hidden border-b border-white/5">
      {/* Hero background image (optional) */}
      {heroImage && (
        <>
          <Image
            src={heroImage}
            alt={titleEn}
            fill
            className="object-cover opacity-20"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#080808]/60 via-transparent to-[#080808]" />
        </>
      )}
      {/* Subtle grid bg */}
      {!heroImage && (
        <div className="absolute inset-0 pointer-events-none opacity-[0.025]" style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }} />
      )}

      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 font-poppins text-xs tracking-widest text-white/25 mb-16 relative z-10">
        <Link href="/" className="hover:text-white/60 transition-colors">Home</Link>
        {breadcrumb.map((b, i) => (
          <>
            <span key={`sep-${i}`} className="text-white/15">/</span>
            <Link key={b.href} href={b.href} className="hover:text-white/60 transition-colors">{b.label}</Link>
          </>
        ))}
      </nav>

      {/* Title block */}
      <div ref={titleRef} className="relative z-10">
        <p className="font-poppins text-xs tracking-[0.4em] text-white/25 uppercase mb-6 overflow-hidden">
          <span className="ph-char inline-block" style={{ transform: 'translateY(110%)' }}>{eyebrow}</span>
        </p>

        <h1 className="overflow-hidden mb-4" style={{ lineHeight: 1 }}>
          {titleEn.split('').map((ch, i) => (
            <span key={i} className="ph-char inline-block font-poppins font-extralight text-white"
              style={{ fontSize: 'clamp(52px, 8vw, 112px)', letterSpacing: '-0.02em', transform: 'translateY(110%)' }}>
              {ch === ' ' ? '\u00A0' : ch}
            </span>
          ))}
        </h1>

        <p className="font-poppins text-sm tracking-[0.15em] text-white/25 overflow-hidden">
          <span className="ph-char inline-block" style={{ transform: 'translateY(110%)' }}>{titleJa}</span>
        </p>
      </div>

      {description && (
        <p ref={descRef} className="relative z-10 mt-12 max-w-xl text-white/50 text-base leading-relaxed opacity-0">
          {description}
        </p>
      )}

      {/* Decorative line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </section>
  )
}
