'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

interface ScaleLinesProps {
  count?: number
  className?: string
  color?: string
}

export default function ScaleLines({
  count = 100,
  className = '',
  color = 'rgba(255,255,255,0.4)',
}: ScaleLinesProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const lines = container.querySelectorAll('.scale-line-tick')
    const center = Math.floor(count / 2)
    const radius = 5

    const updateLines = () => {
      // Animate a "pulse" peak that moves
      const t = Date.now() / 1000
      lines.forEach((line: Element, i: number) => {
        const dist = Math.abs(i - ((t * 20) % count))
        const wrappedDist = Math.min(dist, count - dist)
        const scale = wrappedDist < radius
          ? 1 + (1 - wrappedDist / radius) * 2.5
          : 1
        const opacity = wrappedDist < radius
          ? 0.3 + (1 - wrappedDist / radius) * 0.7
          : 0.3
        ;(line as HTMLElement).style.height = `${3 * scale}px`
        ;(line as HTMLElement).style.opacity = String(opacity)
      })
    }

    const ticker = gsap.ticker.add(updateLines)
    return () => gsap.ticker.remove(updateLines)
  }, [count])

  return (
    <div
      ref={containerRef}
      className={`relative flex items-end gap-[5px] h-4 ${className}`}
    >
      {Array.from({ length: count }).map((_, i) => (
        <span
          key={i}
          className="scale-line-tick inline-block w-px bg-current"
          style={{
            height: '3px',
            opacity: 0.3,
            color,
            backgroundColor: color,
          }}
        />
      ))}
    </div>
  )
}
