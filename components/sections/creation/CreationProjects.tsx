'use client'

import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const projects = [
  { title: 'Brand Film — Luxury Fashion', type: 'CM', year: '2025' },
  { title: 'Music Video — J-Pop Artist', type: 'MV', year: '2025' },
  { title: 'Corporate Event — Tech Summit', type: 'Event', year: '2024' },
  { title: 'Documentary — Artisans of Kyoto', type: 'Documentary', year: '2024' },
  { title: 'Product Launch — Global Brand', type: 'CM', year: '2024' },
]

export default function CreationProjects() {
  const listRef = useRef<HTMLUListElement>(null)

  useEffect(() => {
    const items = listRef.current?.querySelectorAll('li')
    if (!items) return
    gsap.fromTo(items,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, stagger: 0.08, duration: 0.8, ease: 'expo.out',
        scrollTrigger: { trigger: listRef.current, start: 'top 80%' } }
    )
  }, [])

  return (
    <section className="bg-[#080808] py-32 px-8 md:px-16">
      <div className="flex items-end justify-between mb-16">
        <div>
          <p className="font-poppins text-xs tracking-[0.4em] text-white/25 uppercase mb-4">Selected Work</p>
          <h2 className="font-poppins font-extralight text-white text-5xl md:text-6xl">Projects</h2>
        </div>
      </div>

      <ul ref={listRef} className="space-y-0">
        {projects.map((p, i) => (
          <li key={i} className="group flex items-center justify-between py-6 border-t border-white/5 hover:border-white/15 cursor-pointer transition-colors duration-300 opacity-0">
            <div className="flex items-center gap-8">
              <span className="font-poppins text-xs text-white/20 tracking-widest w-8">{String(i + 1).padStart(2, '0')}</span>
              <p className="text-white text-lg md:text-xl font-light group-hover:opacity-60 transition-opacity">{p.title}</p>
            </div>
            <div className="flex items-center gap-6">
              <span className="font-poppins text-xs tracking-widest border border-white/10 px-3 py-1 text-white/30 hidden md:block">{p.type}</span>
              <span className="font-poppins text-xs text-white/20">{p.year}</span>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="opacity-0 group-hover:opacity-40 transition-opacity -translate-x-2 group-hover:translate-x-0 transform duration-300">
                <path d="M1 0V6C1 7 1.1 8.5 3.5 8.5H11.5" stroke="white"/>
                <path d="M8 4L12.5 8.5L8 13" stroke="white"/>
              </svg>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}
