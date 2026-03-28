'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import PrimaryLink from '@/components/ui/PrimaryLink'
import { CurveArrow } from '@/components/ui/Arrows'

gsap.registerPlugin(ScrollTrigger)

interface Topic {
  href: string
  image: string
  date: string
  tag: string
  category: string
  title: string
}

export default function Topics({ topics }: { topics: Topic[] }) {
  const sectionRef = useRef<HTMLElement>(null)
  const headRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Head animation
    const chars = headRef.current?.querySelectorAll('.t-char')
    if (chars) {
      gsap.fromTo(
        chars,
        { y: '110%' },
        {
          y: '0%',
          stagger: 0.03,
          duration: 0.9,
          ease: 'expo.out',
          scrollTrigger: { trigger: headRef.current, start: 'top 80%', once: true },
        }
      )
    }

    // Cards stagger
    const cards = cardsRef.current?.querySelectorAll('.topic-card-item')
    if (cards) {
      gsap.fromTo(
        cards,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.12,
          duration: 0.9,
          ease: 'expo.out',
          scrollTrigger: { trigger: cardsRef.current, start: 'top 70%', once: true },
        }
      )
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      className="bg-white text-black px-6 lg:px-16 xl:px-24 py-24 lg:py-40"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-16">
        <div className="overflow-hidden">
          <div ref={headRef} style={{ perspective: '600px' }}>
            <h2 className="font-poppins text-[clamp(2.5rem,6vw,5rem)] font-light text-black">
              {'Topics'.split('').map((char, i) => (
                <span key={i} className="t-char inline-block">{char}</span>
              ))}
              <span className="text-[0.4em] text-black/40 ml-4 align-middle font-normal tracking-[0.1em]">
                (All Section)
              </span>
            </h2>
          </div>
        </div>
        <PrimaryLink href="/topics" label="View More" dark />
      </div>

      {/* Cards */}
      <div ref={cardsRef} className="space-y-0 divide-y divide-black/10">
        {topics.map((topic) => (
          <Link
            key={topic.href}
            href={topic.href}
            className="topic-card-item group flex flex-col sm:flex-row gap-6 py-8 opacity-0 hover:opacity-70 transition-opacity duration-300"
          >
            {/* Image */}
            <div className="relative sm:w-48 lg:w-64 shrink-0 aspect-[4/3] overflow-hidden rounded-sm bg-black/5">
              <Image
                src={topic.image}
                alt={topic.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 192px, 256px"
              />
            </div>

            {/* Content */}
            <div className="flex flex-col justify-between flex-1 py-1">
              <div className="space-y-3">
                <div className="flex items-center gap-4 flex-wrap">
                  <span className="font-poppins text-xs text-black/40 tracking-widest">
                    {topic.date}
                  </span>
                  <span className="font-poppins text-[10px] tracking-[0.2em] border border-black/20 text-black/60 px-2 py-0.5 uppercase">
                    {topic.tag}
                  </span>
                  {topic.category && (
                    <span className="text-xs text-black/40">{topic.category}</span>
                  )}
                </div>
                <h3 className="text-black text-base lg:text-lg font-normal leading-relaxed">
                  {topic.title}
                </h3>
              </div>
              <div className="flex items-center gap-2 mt-4">
                <span className="font-poppins text-xs tracking-[0.2em] text-black/40 uppercase group-hover:text-black transition-colors">
                  Read more
                </span>
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  <CurveArrow color="#111" />
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
