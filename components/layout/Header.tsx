'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { YKSymbol } from '@/components/ui/YKSymbol'
import ScaleLines from '@/components/ui/ScaleLines'

gsap.registerPlugin(ScrollTrigger)

const navLinks = [
  { href: '/', label: 'Home', width: 36 },
  { href: '/wedding', label: 'Wedding', width: 60 },
  { href: '/creation', label: 'Creation', width: 60 },
  { href: '/whats_ykp', label: "What's YKP", width: 75 },
  { href: '/topics', label: 'Topics', width: 45 },
  { href: '/contact', label: 'Contact', width: 57 },
]

export default function Header() {
  const headerRef = useRef<HTMLElement>(null)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      ref={headerRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'bg-black/80 backdrop-blur-md' : 'bg-transparent'
      }`}
    >
      <div className="flex items-center justify-between px-8 py-5">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <YKSymbol className="w-8 h-8 text-white transition-transform duration-500 group-hover:rotate-45" />
          <span className="font-poppins text-xs tracking-[0.3em] text-white uppercase hidden md:block">
            YK PRODUCE
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="relative font-poppins text-[11px] tracking-[0.2em] text-white uppercase group overflow-hidden"
            >
              <span className="relative inline-block transition-transform duration-300 group-hover:-translate-y-full">
                {link.label}
              </span>
              <span className="absolute top-full left-0 inline-block transition-transform duration-300 group-hover:-translate-y-full">
                {link.label}
              </span>
            </Link>
          ))}
        </nav>

        {/* Hamburger - mobile */}
        <button
          id="menu-toggle"
          className="lg:hidden flex flex-col gap-[5px] p-2"
          aria-label="Open menu"
        >
          <span className="w-6 h-px bg-white block" />
          <span className="w-4 h-px bg-white block" />
          <span className="w-6 h-px bg-white block" />
        </button>
      </div>

      {/* Scale lines decoration */}
      <div className="px-8 pb-1 hidden lg:block">
        <ScaleLines count={120} color="rgba(255,255,255,0.25)" />
      </div>
    </header>
  )
}
