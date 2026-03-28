'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { gsap } from 'gsap'
import { motion } from 'framer-motion'
import type { Topic } from '@/lib/topics'
import { CurveArrow } from '@/components/ui/Arrows'

interface Props {
  topic: Topic
  related: Topic[]
}

export default function TopicDetail({ topic, related }: Props) {
  const heroRef = useRef<HTMLDivElement>(null)
  const bodyRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.3 })
    tl.fromTo(
      heroRef.current?.querySelectorAll('.detail-in') ?? [],
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.12, duration: 1, ease: 'expo.out' }
    )
    gsap.fromTo(bodyRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1, delay: 0.8, ease: 'expo.out' }
    )
  }, [])

  return (
    <>
      {/* Hero */}
      <div ref={heroRef} className="pt-40 pb-20 px-8 md:px-16 bg-[#080808] border-b border-white/5 relative overflow-hidden">
        {/* Grid bg */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.025]" style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }} />

        {/* Breadcrumb */}
        <nav className="detail-in opacity-0 flex items-center gap-2 font-poppins text-xs tracking-widest text-white/20 mb-12">
          <Link href="/" className="hover:text-white/50 transition-colors">Home</Link>
          <span>/</span>
          <Link href="/topics" className="hover:text-white/50 transition-colors">Topics</Link>
          <span>/</span>
          <span className="text-white/40 truncate max-w-xs">{topic.title}</span>
        </nav>

        {/* Meta */}
        <div className="detail-in opacity-0 flex items-center gap-4 mb-8">
          <span className="font-poppins text-xs tracking-widest text-white/30">{topic.dateFormatted}</span>
          <span className="font-poppins text-[10px] tracking-widest border border-white/10 px-3 py-1 text-white/25">{topic.tag}</span>
          {topic.category && <span className="text-xs text-white/20">{topic.category}</span>}
        </div>

        {/* Title */}
        <h1 className="detail-in opacity-0 text-white font-light text-2xl md:text-4xl leading-relaxed max-w-3xl mb-8">
          {topic.title}
        </h1>

        {/* Hero image placeholder */}
        <div className="detail-in opacity-0 relative w-full aspect-[16/7] bg-white/5 overflow-hidden mt-12">
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent flex items-center justify-center">
            <span className="font-poppins text-xs tracking-widest text-white/10 uppercase">
              {topic.category || 'YK PRODUCE'}
            </span>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="bg-[#080808] px-8 md:px-16 py-24">
        <div className="max-w-2xl mx-auto">
          <div
            ref={bodyRef}
            className="opacity-0 text-white/60 text-base leading-[2] whitespace-pre-line"
          >
            {topic.body}
          </div>

          {/* Back link */}
          <div className="mt-20 pt-10 border-t border-white/5 flex items-center justify-between">
            <Link href="/topics" className="group flex items-center gap-3 font-poppins text-xs tracking-widest text-white/30 uppercase hover:text-white/60 transition-colors">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="rotate-180">
                <path d="M1 0V6C1 7 1.1 8.5 3.5 8.5H11.5" stroke="currentColor"/>
                <path d="M8 4L12.5 8.5L8 13" stroke="currentColor"/>
              </svg>
              Back to Topics
            </Link>
            <Link href="/contact" className="font-poppins text-xs tracking-widest text-white/30 uppercase hover:text-white/60 transition-colors">
              Get in Touch →
            </Link>
          </div>
        </div>
      </div>

      {/* Related posts */}
      {related.length > 0 && (
        <section className="bg-[#080808] py-24 px-8 md:px-16 border-t border-white/5">
          <p className="font-poppins text-xs tracking-[0.4em] text-white/20 uppercase mb-12">Related Posts</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/5">
            {related.map((r, i) => (
              <motion.div
                key={r.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: i * 0.08 }}
                viewport={{ once: true }}
              >
                <Link href={`/topics/${r.slug}`} className="group block bg-[#080808] p-8 hover:bg-white/[0.02] transition-colors duration-500">
                  <div className="relative aspect-[3/2] bg-white/5 mb-6 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent" />
                    <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                  <div className="flex items-center gap-3 mb-3">
                    <span className="font-poppins text-[10px] tracking-widest text-white/25">{r.dateFormatted}</span>
                    <span className="font-poppins text-[10px] border border-white/10 px-2 py-0.5 text-white/20">{r.tag}</span>
                  </div>
                  <p className="text-white/60 text-sm leading-relaxed line-clamp-2 group-hover:text-white/40 transition-colors">{r.title}</p>
                  <div className="mt-4 flex items-center gap-2 text-white/20 group-hover:text-white/40 transition-colors">
                    <span className="font-poppins text-[10px] tracking-widest uppercase">Read</span>
                    <CurveArrow color="currentColor" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>
      )}
    </>
  )
}
