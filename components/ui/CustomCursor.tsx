'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const pos = useRef({ x: 0, y: 0 })
  const mouse = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const cursor = cursorRef.current
    if (!cursor) return

    const onMouseMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX
      mouse.current.y = e.clientY
    }

    const onMouseEnterLink = () => cursor.classList.add('hover')
    const onMouseLeaveLink = () => cursor.classList.remove('hover')

    document.addEventListener('mousemove', onMouseMove)

    document.querySelectorAll('a, button').forEach((el) => {
      el.addEventListener('mouseenter', onMouseEnterLink)
      el.addEventListener('mouseleave', onMouseLeaveLink)
    })

    gsap.ticker.add(() => {
      pos.current.x += (mouse.current.x - pos.current.x) * 0.12
      pos.current.y += (mouse.current.y - pos.current.y) * 0.12
      gsap.set(cursor, { x: pos.current.x, y: pos.current.y })
    })

    return () => {
      document.removeEventListener('mousemove', onMouseMove)
    }
  }, [])

  return <div ref={cursorRef} className="cursor" aria-hidden="true" />
}
