'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const services = [
  {
    index: '01', en: 'Studio', ja: 'Studio Operations',
    description: 'Our Minami-Aoyama production studio is equipped with state-of-the-art gear and a comfortable creative environment. The perfect space for photo shoots, video productions, and any creative project you have in mind.',
    tags: ['Photo Studio', 'Video Studio', 'Studio Rental'],
  },
  {
    index: '02', en: 'Video', ja: 'Video Production',
    description: 'From commercials and music videos to documentaries and brand films — we breathe life into stories through expert cinematography, editing, and post-production that resonates with audiences.',
    tags: ['Commercials', 'Music Videos', 'Documentary', 'Drone'],
  },
  {
    index: '03', en: 'Event', ja: 'Event Planning',
    description: 'We handle every aspect of corporate events, exhibitions, and live performances — from concept and logistics to on-the-day execution and live streaming — so you can focus on the experience.',
    tags: ['Corporate Events', 'Exhibitions', 'Live Streaming'],
  },
]

export default function CreationServices() {
  const cardsRef = useRef<HTMLDivElement[]>([])

  useEffect(() => {
    cardsRef.current.forEach((card, i) => {
      gsap.fromTo(card,
        { opacity: 0, x: -30 },
        { opacity: 1, x: 0, duration: 1, ease: 'expo.out', delay: i * 0.12,
          scrollTrigger: { trigger: card, start: 'top 80%' } }
      )
    })
  }, [])

  return (
    <section className="bg-[#080808] py-32 px-8 md:px-16 border-b border-white/5">
      <div className="mb-16">
        <p className="font-poppins text-xs tracking-[0.4em] text-white/25 uppercase mb-4">What we offer</p>
        <h2 className="font-poppins font-extralight text-white text-5xl md:text-6xl">Services</h2>
      </div>

      <div className="space-y-px">
        {services.map((s, i) => (
          <div
            key={s.index}
            ref={el => { if (el) cardsRef.current[i] = el }}
            className="group grid grid-cols-1 md:grid-cols-[120px_1fr_1fr] gap-0 border border-white/5 hover:border-white/10 transition-colors duration-500 opacity-0"
          >
            <div className="p-8 md:p-10 border-r border-white/5 flex items-start">
              <span className="font-poppins text-xs tracking-widest text-white/20">[{s.index}]</span>
            </div>
            <div className="p-8 md:p-10 border-r border-white/5">
              <h3 className="font-poppins font-extralight text-white text-4xl md:text-5xl mb-2 leading-none">{s.en}</h3>
              <p className="text-white/25 text-sm">{s.ja}</p>
            </div>
            <div className="p-8 md:p-10">
              <p className="text-white/50 text-sm leading-relaxed mb-6">{s.description}</p>
              <div className="flex flex-wrap gap-2">
                {s.tags.map(tag => (
                  <span key={tag} className="font-poppins text-[10px] tracking-widest border border-white/10 px-3 py-1 text-white/25">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
