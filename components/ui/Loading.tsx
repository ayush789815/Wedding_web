'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { YKSymbol } from '@/components/ui/YKSymbol'

export default function Loading() {
  const overlayRef = useRef<HTMLDivElement>(null)
  const symbolRef = useRef<HTMLDivElement>(null)
  const progressRef = useRef<HTMLSpanElement>(null)
  const [count, setCount] = useState(0)

  useEffect(() => {
    const tl = gsap.timeline()

    // Count up
    let n = 0
    const interval = setInterval(() => {
      n += Math.floor(Math.random() * 8) + 3
      if (n >= 100) {
        n = 100
        clearInterval(interval)
      }
      setCount(n)
    }, 40)

    // Animate symbol in
    tl.fromTo(
      symbolRef.current,
      { opacity: 0, scale: 0.4, rotation: 20 },
      { opacity: 1, scale: 1, rotation: 0, duration: 0.9, ease: 'expo.out' }
    )

    // After load: fade out
    tl.to(
      symbolRef.current,
      { opacity: 0, scale: 1.2, duration: 0.5, ease: 'expo.in', delay: 0.8 }
    )
    tl.to(
      overlayRef.current,
      { yPercent: -100, duration: 0.9, ease: 'expo.inOut' },
      '-=0.2'
    )
    tl.set(overlayRef.current, { display: 'none' })

    return () => clearInterval(interval)
  }, [])

  return (
    <div
      ref={overlayRef}
      className="loading-overlay flex-col gap-8"
    >
      <div ref={symbolRef} className="opacity-0">
        <YKSymbol className="w-24 h-24 text-white" />
      </div>
      <div className="flex items-center gap-3">
        <span
          ref={progressRef}
          className="font-poppins text-sm tracking-widest text-white/60"
        >
          {String(count).padStart(3, '0')}
        </span>
        <div className="w-32 h-px bg-white/20 relative overflow-hidden">
          <div
            className="absolute inset-y-0 left-0 bg-white transition-all duration-100"
            style={{ width: `${count}%` }}
          />
        </div>
      </div>
    </div>
  )
}
