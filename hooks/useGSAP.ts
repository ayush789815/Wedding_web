'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * Syncs GSAP ScrollTrigger with Lenis smooth scroll.
 * Call once at the root level (layout or page).
 */
export function useLenisGSAP() {
  useEffect(() => {
    // Wait for lenis to be available
    const check = setInterval(() => {
      const lenis = (window as any).lenis
      if (!lenis) return
      clearInterval(check)

      lenis.on('scroll', ScrollTrigger.update)

      gsap.ticker.add((time) => {
        lenis.raf(time * 1000)
      })
      gsap.ticker.lagSmoothing(0)
    }, 50)

    return () => clearInterval(check)
  }, [])
}

/**
 * Generic scroll-triggered fromTo animation.
 */
export function useScrollAnimation(
  ref: React.RefObject<Element | null>,
  from: gsap.TweenVars,
  to: gsap.TweenVars,
  triggerOptions?: ScrollTrigger.Vars
) {
  useEffect(() => {
    const el = ref.current
    if (!el) return

    const ctx = gsap.context(() => {
      gsap.fromTo(el, from, {
        ...to,
        scrollTrigger: {
          trigger: el,
          start: 'top 80%',
          ...triggerOptions,
        },
      })
    })

    return () => ctx.revert()
  }, [])
}
