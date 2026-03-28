'use client'

import { useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface TextRevealOptions {
  stagger?: number
  duration?: number
  delay?: number
  start?: string
  ease?: string
}

/**
 * Animates all `.char` elements inside the trigger element into view.
 * Wrap each character in <span className="char"> with translateY(110%) inline style.
 */
export function useTextReveal(
  triggerSelector: string,
  options: TextRevealOptions = {}
) {
  const {
    stagger = 0.03,
    duration = 0.9,
    delay = 0,
    start = 'top 80%',
    ease = 'expo.out',
  } = options

  useEffect(() => {
    const triggers = document.querySelectorAll(triggerSelector)
    if (!triggers.length) return

    const ctx = gsap.context(() => {
      triggers.forEach((trigger) => {
        const chars = trigger.querySelectorAll('.char')
        if (!chars.length) return

        gsap.fromTo(
          chars,
          { y: '110%', opacity: 1 },
          {
            y: '0%',
            stagger,
            duration,
            delay,
            ease,
            scrollTrigger: {
              trigger,
              start,
            },
          }
        )
      })
    })

    return () => ctx.revert()
  }, [triggerSelector, stagger, duration, delay, start, ease])
}

/**
 * Helper: splits a string into span.char elements for animation
 */
export function splitChars(text: string, className = '') {
  return text.split('').map((char, i) => (
    <span
      key={i}
      className={`char inline-block ${className}`}
      style={{ transform: 'translateY(110%)', display: 'inline-block' }}
      aria-hidden="true"
    >
      {char === ' ' ? '\u00A0' : char}
    </span>
  ))
}
