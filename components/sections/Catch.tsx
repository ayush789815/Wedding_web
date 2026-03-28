'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const lines = ['Your story,', 'beautifully told.']

export default function Catch() {
  const sectionRef = useRef<HTMLElement>(null)
  const linesRef = useRef<HTMLParagraphElement[]>([])
  const bgRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    // Background color transition: black → white → black
    gsap.fromTo(
      bgRef.current,
      { opacity: 0 },
      {
        opacity: 1,
        scrollTrigger: {
          trigger: section,
          start: 'top 60%',
          end: 'top 20%',
          scrub: true,
        },
      }
    )

    // Line-by-line reveal with color shift
    linesRef.current.forEach((line, i) => {
      const chars = line.querySelectorAll('.c-char')
      gsap.fromTo(
        chars,
        { y: '110%', rotateX: 90 },
        {
          y: '0%',
          rotateX: 0,
          stagger: 0.04,
          duration: 1.1,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 65%',
            once: true,
          },
          delay: i * 0.25,
        }
      )
    })
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black"
    >
      {/* Animated gradient background */}
      <div
        ref={bgRef}
        className="absolute inset-0 opacity-0"
        style={{
          background: 'radial-gradient(ellipse at 50% 50%, rgba(255,255,255,0.05) 0%, transparent 70%)',
        }}
      />

      {/* Large decorative text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
        <p
          className="font-poppins font-bold text-white/[0.03] whitespace-nowrap"
          style={{ fontSize: 'clamp(6rem, 20vw, 18rem)' }}
        >
          PLAYFUL
        </p>
      </div>

      {/* Main catch copy */}
      <div className="relative z-10 text-center px-6">
        <h1 className="space-y-2" style={{ perspective: '1000px' }}>
          {lines.map((line, li) => (
            <p
              key={li}
              ref={(el) => { if (el) linesRef.current[li] = el }}
              className="block overflow-hidden"
            >
              <span className="block font-noto text-[clamp(2.5rem,8vw,7rem)] font-light text-white leading-tight">
                {line.split('').map((char, ci) => (
                  <span
                    key={ci}
                    className="c-char inline-block"
                    style={{ transformOrigin: 'center bottom' }}
                  >
                    {char}
                  </span>
                ))}
              </span>
            </p>
          ))}
        </h1>

        <div className="mt-12 flex justify-center">
          <div className="w-px h-16 bg-white/20 relative overflow-hidden">
            <div
              className="absolute top-0 left-0 w-full h-1/2 bg-white"
              style={{ animation: 'slideDown 1.8s ease-in-out infinite' }}
            />
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideDown {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(200%); }
        }
      `}</style>
    </section>
  )
}
