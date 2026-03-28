'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const services = [
  {
    index: '01',
    en: 'Photo',
    ja: 'Photography',
    description: 'Every fleeting moment of your wedding day — captured with care and artistry by our skilled photographers. From natural expressions to grand ceremonies, we preserve the emotions that words cannot describe.',
    tags: ['Pre-Wedding', 'Day-Of Shoot', 'Photo Album'],
  },
  {
    index: '02',
    en: 'Album',
    ja: 'Album Production',
    description: 'We transform your favourite wedding photographs into a beautifully crafted keepsake album. From design layout to custom binding, each album is a one-of-a-kind treasure built around your story.',
    tags: ['Digital', 'Fine Art Print', 'Custom Binding'],
  },
  {
    index: '03',
    en: 'Movie',
    ja: 'Videography',
    description: 'Relive the emotion and joy of your wedding day through cinematic film. Our videographers capture every detail — from the quiet moments to the grand celebration — in stunning, timeless quality.',
    tags: ['Highlight Reel', 'Full Film', 'Drone Footage'],
  },
]

export default function WeddingServices() {
  const sectionRef = useRef<HTMLElement>(null)
  const cardsRef = useRef<HTMLDivElement[]>([])

  useEffect(() => {
    cardsRef.current.forEach((card, i) => {
      gsap.fromTo(card,
        { opacity: 0, y: 50 },
        {
          opacity: 1, y: 0, duration: 1, ease: 'expo.out', delay: i * 0.1,
          scrollTrigger: { trigger: card, start: 'top 80%' },
        }
      )
    })
  }, [])

  return (
    <section ref={sectionRef} className="bg-[#080808] py-32 px-8 md:px-16">
      <div className="mb-16">
        <p className="font-poppins text-xs tracking-[0.4em] text-white/25 uppercase mb-4">Our Services</p>
        <h2 className="font-poppins font-extralight text-white text-5xl md:text-6xl">What we do</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/5">
        {services.map((s, i) => (
          <div
            key={s.index}
            ref={el => { if (el) cardsRef.current[i] = el }}
            className="bg-[#080808] p-10 md:p-12 group hover:bg-white/[0.02] transition-colors duration-500 opacity-0"
          >
            <div className="flex items-start justify-between mb-12">
              <span className="font-poppins text-xs tracking-[0.3em] text-white/20">[{s.index}]</span>
              <div className="w-8 h-8 border border-white/10 rounded-full flex items-center justify-center group-hover:border-white/30 transition-colors">
                <svg width="10" height="10" viewBox="0 0 14 14" fill="none">
                  <path d="M1 0V6C1 7 1.1 8.5 3.5 8.5H11.5" stroke="rgba(255,255,255,0.4)" strokeWidth="1"/>
                  <path d="M8 4L12.5 8.5L8 13" stroke="rgba(255,255,255,0.4)" strokeWidth="1"/>
                </svg>
              </div>
            </div>

            <h3 className="font-poppins font-extralight text-white text-5xl md:text-6xl mb-2 leading-none">{s.en}</h3>
            <p className="text-white/30 text-sm mb-8">{s.ja}</p>
            <p className="text-white/50 text-sm leading-relaxed mb-10">{s.description}</p>

            <div className="flex flex-wrap gap-2">
              {s.tags.map(tag => (
                <span key={tag} className="font-poppins text-[10px] tracking-widest border border-white/10 px-3 py-1 text-white/30 group-hover:border-white/20 transition-colors">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
