'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null)
  const linesRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Progress bar driven by scroll
    gsap.to(barRef.current, {
      scaleY: 1,
      ease: 'none',
      scrollTrigger: {
        trigger: document.body,
        start: 'top top',
        end: 'bottom bottom',
        scrub: true,
      },
    })

    // Animate side lines like the original
    const lines = linesRef.current?.querySelectorAll('.prog-line')
    if (!lines) return
    const len = lines.length

    const update = () => {
      const progress = window.scrollY / (document.body.scrollHeight - window.innerHeight)
      const peak = progress * len

      lines.forEach((line: Element, i: number) => {
        const dist = Math.abs(i - peak)
        const w = dist < 4 ? Math.max(4, 12 - dist * 2) : 4
        const op = dist < 4 ? Math.max(0.2, 1 - dist * 0.2) : 0.2
        ;(line as HTMLElement).style.width = `${w}px`
        ;(line as HTMLElement).style.opacity = String(op)
      })
    }

    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [])

  return (
    <div className="fixed right-4 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-end gap-[3px]">
      <div ref={linesRef} className="flex flex-col gap-[3px]">
        {Array.from({ length: 40 }).map((_, i) => (
          <span
            key={i}
            className="prog-line block h-px bg-white transition-all duration-150"
            style={{ width: '4px', opacity: 0.2 }}
          />
        ))}
      </div>
      {/* Thin vertical progress track */}
      <div className="absolute right-0 top-0 bottom-0 w-px bg-white/10">
        <div
          ref={barRef}
          className="w-full bg-white origin-top"
          style={{ height: '100%', transform: 'scaleY(0)' }}
        />
      </div>
    </div>
  )
}
