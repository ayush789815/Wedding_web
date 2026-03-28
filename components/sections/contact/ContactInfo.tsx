'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { BlankArrow } from '@/components/ui/Arrows'

const info = [
  {
    label: 'Tel',
    value: '03-5413-6538',
    sub: 'Weekdays / Weekends  11:00 – 18:00',
    href: 'tel:0354136538',
  },
  {
    label: 'Email',
    value: 'info@ykproduce.co.jp',
    sub: 'We reply within 2 business days',
    href: 'mailto:info@ykproduce.co.jp',
  },
  {
    label: 'Address',
    value: 'Minami-Aoyama, Minato-ku, Tokyo',
    sub: 'Tokyo, Japan 107-0062',
    href: null,
  },
]

const socials = [
  { label: 'Instagram @ykproduce_inc', href: 'https://instagram.com/ykproduce_inc' },
  { label: 'Instagram @kyogare', href: 'https://instagram.com/kyogare' },
  { label: 'Facebook YKProduce Inc.', href: 'https://facebook.com/ykproduceinc' },
]

export default function ContactInfo() {
  return (
    <aside className="bg-[#080808] px-10 py-24 border-t border-white/5 lg:border-t-0">
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
        className="space-y-14 sticky top-32"
      >
        {/* Tagline */}
        <div className="border-b border-white/5 pb-12">
          <p className="font-poppins text-[10px] tracking-[0.4em] text-white/20 uppercase mb-6">Our promise</p>
          <p className="text-white/50 text-sm leading-relaxed">
            We respond to every inquiry with care and dedication. Whether you're planning a wedding or a creative project, we're here to help bring your vision to life.
          </p>
        </div>

        {/* Contact info */}
        <div className="space-y-8">
          <p className="font-poppins text-[10px] tracking-[0.4em] text-white/20 uppercase">Info</p>
          {info.map(item => (
            <div key={item.label}>
              <p className="font-poppins text-[9px] tracking-widest text-white/20 uppercase mb-2">{item.label}</p>
              {item.href ? (
                <a href={item.href} className="text-white/60 text-sm hover:text-white transition-colors duration-300 block">
                  {item.value}
                </a>
              ) : (
                <p className="text-white/60 text-sm">{item.value}</p>
              )}
              <p className="text-white/20 text-xs mt-1">{item.sub}</p>
            </div>
          ))}
        </div>

        {/* Business hours */}
        <div className="border border-white/5 p-6">
          <p className="font-poppins text-[9px] tracking-widest text-white/20 uppercase mb-4">Business Hours</p>
          <div className="space-y-2 text-xs font-poppins">
            {[
              { day: 'Mon', time: '11:00 – 18:00' },
              { day: 'Tue', time: 'Closed' },
              { day: 'Wed – Fri', time: '11:00 – 18:00' },
              { day: 'Sat – Sun', time: '11:00 – 18:00' },
            ].map(row => (
              <div key={row.day} className="flex justify-between">
                <span className="text-white/25 tracking-widest">{row.day}</span>
                <span className={row.time === 'Closed' ? 'text-white/15' : 'text-white/40'}>{row.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Socials */}
        <div>
          <p className="font-poppins text-[9px] tracking-widest text-white/20 uppercase mb-5">Follow Us</p>
          <ul className="space-y-3">
            {socials.map(s => (
              <li key={s.href}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 font-poppins text-xs text-white/25 hover:text-white/60 transition-colors duration-300"
                >
                  <span>{s.label}</span>
                  <BlankArrow color="currentColor" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Privacy link */}
        <div className="pt-6 border-t border-white/5">
          <Link
            href="/privacy"
            className="font-poppins text-[10px] tracking-widest text-white/15 hover:text-white/30 transition-colors"
          >
            Privacy Policy
          </Link>
        </div>
      </motion.div>
    </aside>
  )
}
