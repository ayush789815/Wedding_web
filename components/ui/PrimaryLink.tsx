'use client'

import Link from 'next/link'
import { CurveArrow } from './Arrows'
import { motion } from 'framer-motion'

interface PrimaryLinkProps {
  href: string
  label: string
  dark?: boolean
  external?: boolean
}

export default function PrimaryLink({ href, label, dark = false, external = false }: PrimaryLinkProps) {
  const color = dark ? '#111111' : '#ffffff'
  const textColor = dark ? 'text-black' : 'text-white'
  const borderColor = dark ? 'border-black/20' : 'border-white/20'

  return (
    <motion.div whileHover="hover" className="inline-block">
      <Link
        href={href}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
        className={`group inline-flex items-center gap-4 font-poppins text-xs tracking-[0.2em] uppercase ${textColor} relative py-4`}
      >
        <span className="relative">
          <span>{label}</span>
          <motion.span
            className={`absolute left-0 bottom-0 w-full h-px ${dark ? 'bg-black' : 'bg-white'} origin-left`}
            initial={{ scaleX: 0 }}
            variants={{ hover: { scaleX: 1 } }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          />
        </span>
        <motion.span
          variants={{ hover: { x: 4 } }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          <CurveArrow color={color} />
        </motion.span>
      </Link>
    </motion.div>
  )
}
