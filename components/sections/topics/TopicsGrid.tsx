'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { motion, AnimatePresence } from 'framer-motion'
import type { Topic } from '@/lib/topics'
import { CurveArrow } from '@/components/ui/Arrows'

gsap.registerPlugin(ScrollTrigger)

const TAGS = ['All', 'News', 'Media', 'Works'] as const
type TagFilter = (typeof TAGS)[number]

export default function TopicsGrid({ topics }: { topics: Topic[] }) {
  const [active, setActive] = useState<TagFilter>('All')
  const gridRef = useRef<HTMLDivElement>(null)

  const filtered = active === 'All' ? topics : topics.filter(t => t.tag === active)

  return (
    <section className="bg-[#080808] py-24 px-8 md:px-16">
      {/* Filter tabs */}
      <div className="flex items-center gap-0 mb-16 border border-white/10 w-fit">
        {TAGS.map(tag => (
          <button
            key={tag}
            onClick={() => setActive(tag)}
            className={`font-poppins text-xs tracking-[0.25em] px-8 py-3 uppercase transition-all duration-300 ${
              active === tag
                ? 'bg-white text-black'
                : 'text-white/30 hover:text-white'
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5">
        <AnimatePresence mode="popLayout">
          {filtered.map((topic, i) => (
            <motion.div
              key={topic.slug}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: i * 0.05 }}
            >
              <Link
                href={`/topics/${topic.slug}`}
                className="group block bg-[#080808] hover:bg-white/[0.02] transition-colors duration-500"
              >
                {/* Image */}
                <div className="relative aspect-[16/10] overflow-hidden bg-white/5">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent" />
                  {/* Placeholder label — replace with <Image> when assets added */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="font-poppins text-[10px] tracking-widest text-white/10 uppercase">
                      {topic.category || 'YK PRODUCE'}
                    </span>
                  </div>
                  {/* Scale on hover */}
                  <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>

                {/* Content */}
                <div className="p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="font-poppins text-[10px] tracking-widest text-white/30">
                      {topic.dateFormatted}
                    </span>
                    <span className="font-poppins text-[10px] tracking-widest border border-white/10 px-2 py-0.5 text-white/25">
                      {topic.tag}
                    </span>
                    {topic.category && (
                      <span className="text-[11px] text-white/20">{topic.category}</span>
                    )}
                  </div>

                  <h3 className="text-white text-base leading-relaxed mb-6 group-hover:opacity-60 transition-opacity duration-300 line-clamp-2">
                    {topic.title}
                  </h3>

                  <p className="text-white/35 text-sm leading-relaxed mb-8 line-clamp-2">
                    {topic.excerpt}
                  </p>

                  <div className="flex items-center gap-2 font-poppins text-[10px] tracking-widest text-white/25 uppercase group-hover:text-white/50 transition-colors">
                    <span>Read more</span>
                    <span className="transition-transform duration-300 group-hover:translate-x-1">
                      <CurveArrow color="rgba(255,255,255,0.3)" />
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {filtered.length === 0 && (
        <div className="py-32 text-center">
          <p className="font-poppins text-xs tracking-widest text-white/20 uppercase">No posts found</p>
        </div>
      )}
    </section>
  )
}
