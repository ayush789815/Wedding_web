'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { gsap } from 'gsap'
import { BlankArrow, CurveArrow } from '@/components/ui/Arrows'

const mainLinks = [
  { href: '/whats_ykp', en: "What's YKP", ja: 'About YK Produce', external: false },
  { href: '/wedding', en: 'Wedding\nSection', ja: 'Wedding Services', external: false },
  { href: '/creation', en: 'Creation\nSection', ja: 'Creative Production', external: false },
  { href: '/topics', en: 'Topics', ja: 'News & Updates', external: false },
  { href: '/recruit', en: 'Recruit', ja: 'Join Our Team', external: true },
  { href: '/contact', en: 'Contact', ja: 'Get In Touch', external: false },
]

export default function MobileMenu() {
  const menuRef = useRef<HTMLDivElement>(null)
  const itemsRef = useRef<HTMLLIElement[]>([])
  const isOpen = useRef(false)

  useEffect(() => {
    const toggle = document.getElementById('menu-toggle')
    if (!toggle) return

    const open = () => {
      if (!menuRef.current) return
      isOpen.current = true
      gsap.set(menuRef.current, { display: 'flex' })
      gsap.fromTo(
        menuRef.current,
        { clipPath: 'inset(0 0 100% 0)' },
        { clipPath: 'inset(0 0 0% 0)', duration: 0.7, ease: 'expo.inOut' }
      )
      gsap.fromTo(
        itemsRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.06, delay: 0.3, ease: 'expo.out' }
      )
    }

    const close = () => {
      if (!menuRef.current) return
      isOpen.current = false
      gsap.to(menuRef.current, {
        clipPath: 'inset(0 0 100% 0)',
        duration: 0.6,
        ease: 'expo.inOut',
        onComplete: () => { gsap.set(menuRef.current, { display: 'none' }) },
      })
    }

    toggle.addEventListener('click', () => (isOpen.current ? close() : open()))
  }, [])

  return (
    <div
      ref={menuRef}
      className="fixed inset-0 z-40 bg-black hidden flex-col justify-center px-8 pt-24"
      style={{ clipPath: 'inset(0 0 100% 0)' }}
    >
      <ul className="space-y-2">
        {mainLinks.map((link, i) => (
          <li
            key={link.href}
            ref={(el) => { if (el) itemsRef.current[i] = el }}
          >
            <Link
              href={link.href}
              target={link.external ? '_blank' : undefined}
              className="flex items-center justify-between py-4 border-b border-white/10 group"
            >
              <div>
                <p className="font-poppins text-3xl font-light text-white whitespace-pre-line leading-tight">
                  {link.en}
                </p>
                <p className="text-white/40 text-sm mt-1">{link.ja}</p>
              </div>
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                {link.external
                  ? <BlankArrow color="white" />
                  : <CurveArrow color="white" />
                }
              </span>
            </Link>
          </li>
        ))}
      </ul>

      <div className="mt-12 flex gap-8 text-white/40 text-xs font-poppins tracking-widest">
        <a href="https://instagram.com/ykproduce_inc" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
          Instagram
        </a>
        <a href="https://facebook.com/ykproduceinc" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
          Facebook
        </a>
      </div>
    </div>
  )
}
