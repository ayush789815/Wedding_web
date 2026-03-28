'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Image from 'next/image'

gsap.registerPlugin(ScrollTrigger)

const works = [
  { id: 1, label: 'Wedding Couple', type: 'Photo', aspect: 'aspect-[3/4]', src: '/images/wedding-couple-01.jpg' },
  { id: 2, label: 'Limo Entrance', type: 'Photo', aspect: 'aspect-[3/4]', src: '/images/wedding-limousine-02.jpg' },
  { id: 3, label: 'Grand Hall', type: 'Photo', aspect: 'aspect-[3/4]', src: '/images/wedding-hall-03.jpg' },
  { id: 4, label: 'Classic Car Portrait', type: 'Photo', aspect: 'aspect-[4/3]', src: '/images/wedding-car-04.jpg' },
  { id: 5, label: 'Floral Decor', type: 'Design', aspect: 'aspect-[4/3]', src: '/images/wedding-decor-05.jpg' },
  { id: 6, label: 'Reception Styling', type: 'Design', aspect: 'aspect-[3/4]', src: '/images/wedding-reception-06.jpg' },
  { id: 7, label: 'Ceremony Stage', type: 'Design', aspect: 'aspect-[4/3]', src: '/images/wedding-stage-07.jpg' },
]

export default function WeddingWorks() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const cards = sectionRef.current?.querySelectorAll('.work-card')
    if (!cards) return
    cards.forEach((card, i) => {
      gsap.fromTo(card,
        { opacity: 0, y: 40, clipPath: 'inset(100% 0 0 0)' },
        {
          opacity: 1, y: 0, clipPath: 'inset(0% 0 0 0)',
          duration: 1.2, ease: 'expo.out', delay: (i % 3) * 0.1,
          scrollTrigger: { trigger: card, start: 'top 85%' },
        }
      )
    })
  }, [])

  return (
    <section ref={sectionRef} className="bg-[#080808] py-32 px-8 md:px-16 border-t border-white/5">
      <div className="flex items-end justify-between mb-16">
        <div>
          <p className="font-poppins text-xs tracking-[0.4em] text-white/25 uppercase mb-4">Portfolio</p>
          <h2 className="font-poppins font-extralight text-white text-5xl md:text-6xl">Our Works</h2>
        </div>
        <button className="font-poppins text-xs tracking-widest text-white/30 hover:text-white transition-colors pb-1 border-b border-white/10 hover:border-white/40">
          View All
        </button>
      </div>

      <div className="columns-2 md:columns-3 gap-3">
        {works.map((w) => (
          <div key={w.id} className={`work-card relative overflow-hidden mb-3 group cursor-pointer opacity-0 bg-white/5 ${w.aspect}`}>
            <Image
              src={w.src}
              alt={w.label}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 768px) 50vw, 33vw"
            />
            <div className="absolute inset-0 flex items-end p-5 z-10">
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <p className="font-poppins text-[10px] tracking-widest text-white/70 uppercase">{w.type}</p>
                <p className="text-white text-sm mt-1">{w.label}</p>
              </div>
            </div>
            {/* Hover overlay */}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
          </div>
        ))}
      </div>
    </section>
  )
}
