'use client'

import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { YKSymbol } from '@/components/ui/YKSymbol'

gsap.registerPlugin(ScrollTrigger)

export default function AboutMission() {
  const symRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.to(symRef.current, { rotation: 360, duration: 40, repeat: -1, ease: 'none' })
    gsap.fromTo(textRef.current?.querySelectorAll('.mission-line') ?? [],
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, stagger: 0.15, duration: 1.2, ease: 'expo.out',
        scrollTrigger: { trigger: textRef.current, start: 'top 75%' } }
    )
  }, [])

  return (
    <section className="bg-[#080808] py-32 px-8 md:px-16 border-b border-white/5">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
        {/* Symbol */}
        <div className="flex justify-center lg:justify-start">
          <div ref={symRef} className="relative">
            <YKSymbol className="w-64 h-64 md:w-80 md:h-80 text-white opacity-10" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <p className="font-poppins text-xs tracking-[0.5em] text-white/30 uppercase">Since</p>
                <p className="font-poppins text-4xl font-extralight text-white/40">2015</p>
              </div>
            </div>
          </div>
        </div>

        {/* Text */}
        <div ref={textRef}>
          <p className="mission-line font-poppins text-xs tracking-[0.4em] text-white/25 uppercase mb-10 opacity-0">Our Mission</p>
          <h2 className="mission-line font-poppins font-extralight text-white mb-8 opacity-0" style={{ fontSize: 'clamp(28px, 4vw, 52px)', lineHeight: 1.4 }}>
            Shaping Stories,<br />Inspiring Lives.
          </h2>
          <p className="mission-line text-white/50 text-base leading-relaxed mb-6 opacity-0">
            YK Produce is a creative production company dedicated to transforming ideas into compelling visual experiences that leave a lasting impression.
          </p>
          <p className="mission-line text-white/35 text-sm leading-relaxed opacity-0">
            Since 2015, we have partnered with hundreds of couples and brands across Japan — delivering wedding photography, videography, studio services, and event production of the highest caliber.
          </p>
        </div>
      </div>
    </section>
  )
}
