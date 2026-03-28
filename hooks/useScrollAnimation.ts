'use client'

import { useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * Reusable scroll-triggered fromTo animation
 * @param selector - CSS selector for target elements
 * @param from - GSAP fromVars
 * @param to - GSAP toVars  
 * @param triggerOptions - ScrollTrigger options override
 */
export function useScrollAnimation(
  selector: string,
  from: gsap.TweenVars,
  to: gsap.TweenVars,
  triggerOptions: Partial<ScrollTrigger.Vars> = {}
) {
  useEffect(() => {
    const elements = document.querySelectorAll(selector)
    if (!elements.length) return

    const ctx = gsap.context(() => {
      elements.forEach((el) => {
        gsap.fromTo(el, from, {
          ...to,
          scrollTrigger: {
            trigger: el,
            start: 'top 82%',
            ...triggerOptions,
          },
        })
      })
    })

    return () => ctx.revert()
  }, [selector])
}

/**
 * Batch reveal — staggered fromTo on a container's children
 */
export function useBatchReveal(
  containerSelector: string,
  childSelector: string,
  from: gsap.TweenVars = { opacity: 0, y: 40 },
  to: gsap.TweenVars = { opacity: 1, y: 0, stagger: 0.1, duration: 0.9, ease: 'expo.out' }
) {
  useEffect(() => {
    const containers = document.querySelectorAll(containerSelector)
    if (!containers.length) return

    const ctx = gsap.context(() => {
      containers.forEach((container) => {
        const children = container.querySelectorAll(childSelector)
        if (!children.length) return

        gsap.fromTo(children, from, {
          ...to,
          scrollTrigger: { trigger: container, start: 'top 80%' },
        })
      })
    })

    return () => ctx.revert()
  }, [containerSelector, childSelector])
}
