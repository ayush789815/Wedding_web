'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import PrimaryLink from '@/components/ui/PrimaryLink'

gsap.registerPlugin(ScrollTrigger)

const sections = [
  {
    number: '01',
    en: 'Wedding\nSection',
    ja: 'Wedding Business',
    sub: '[Photography / Albums / Videography]',
    href: '/wedding',
    image: '/images/wedding-reception-06.jpg',
  },
  {
    number: '02',
    en: 'Creation\nSection',
    ja: 'Creative Production',
    sub: '[Studio / Film Production / Events]',
    href: '/creation',
    image: '/images/pexels-alexander-mass-748453803-33815179.jpg',
  },
]

function SectionItem({ section }: { section: (typeof sections)[0] }) {
  const itemRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const metaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = itemRef.current
    if (!el) return

    const tl = gsap.timeline({
      scrollTrigger: { trigger: el, start: 'top 70%', once: true },
    })

    const chars = titleRef.current?.querySelectorAll('.char')
    if (chars) {
      tl.fromTo(
        chars,
        { y: '110%', rotateX: 100 },
        { y: '0%', rotateX: 0, stagger: 0.03, duration: 0.9, ease: 'expo.out' }
      )
    }

    tl.fromTo(
      imageRef.current,
      { clipPath: 'inset(100% 0 0 0)' },
      { clipPath: 'inset(0% 0 0 0)', duration: 1.1, ease: 'expo.out' },
      '-=0.6'
    )

    tl.fromTo(
      metaRef.current,
      { opacity: 0, y: 16 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'expo.out' },
      '-=0.5'
    )
  }, [])

  return (
    <article
      ref={itemRef}
      className="grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-8 lg:gap-16 py-20 lg:py-32 border-t border-white/10"
    >
      <div className="lg:sticky lg:top-32 self-start">
        <div className="flex items-center gap-3">
          <span className="w-2 h-2 rounded-full border border-white/40 block" />
          <span className="font-poppins text-xs tracking-[0.25em] text-white/50 uppercase">
            Section [{section.number}]
          </span>
        </div>
      </div>

      <div className="space-y-10">
        <div className="overflow-hidden" style={{ perspective: '800px' }}>
          <h4
            ref={titleRef}
            className="font-poppins text-[clamp(3rem,8vw,7rem)] font-light leading-[1.05] tracking-tight text-white"
          >
            {section.en.split('\n').map((line, li) => (
              <span key={li} className="block">
                {line.split('').map((char, ci) => (
                  <span key={ci} className="char inline-block">
                    {char === ' ' ? '\u00A0' : char}
                  </span>
                ))}
              </span>
            ))}
          </h4>
        </div>

        {/* Section image */}
        <div
          ref={imageRef}
          className="relative w-full aspect-video overflow-hidden rounded-sm bg-white/5"
          style={{ clipPath: 'inset(100% 0 0 0)' }}
        >
          <Image
            src={section.image}
            alt={section.ja}
            fill
            className="object-cover transition-transform duration-700 hover:scale-105"
            sizes="(max-width: 1024px) 100vw, 75vw"
          />
          {/* Subtle dark overlay for text legibility on hover */}
          <div className="absolute inset-0 bg-black/20 hover:bg-black/10 transition-colors duration-500" />
        </div>

        <div ref={metaRef} className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 opacity-0">
          <div>
            <p className="text-white/60 text-sm mb-1">{section.ja}</p>
            <p className="text-white/30 text-xs font-poppins tracking-widest">{section.sub}</p>
          </div>
          <PrimaryLink href={section.href} label="Learn more" />
        </div>
      </div>
    </article>
  )
}

export default function OurSections() {
  const headRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!headRef.current) return
    const chars = headRef.current.querySelectorAll('.h-char')
    gsap.fromTo(
      chars,
      { y: '110%' },
      {
        y: '0%',
        stagger: 0.04,
        duration: 1,
        ease: 'expo.out',
        scrollTrigger: { trigger: headRef.current, start: 'top 80%', once: true },
      }
    )
  }, [])

  return (
    <section className="bg-black px-6 lg:px-16 xl:px-24 py-16">
      <div className="overflow-hidden mb-4">
        <div ref={headRef} style={{ perspective: '800px' }}>
          <h2 className="font-poppins text-[clamp(2.5rem,6vw,5rem)] font-light text-white">
            {'Our Two Sections'.split('').map((char, i) => (
              <span key={i} className="h-char inline-block">
                {char === ' ' ? '\u00A0' : char}
              </span>
            ))}
          </h2>
        </div>
      </div>
      {sections.map((s) => (
        <SectionItem key={s.number} section={s} />
      ))}
    </section>
  )
}
