'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

export default function WeddingCta() {
  return (
    <section className="bg-[#080808] py-40 px-8 md:px-16 border-t border-white/5 text-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        viewport={{ once: true }}
      >
        <p className="font-poppins text-xs tracking-[0.5em] text-white/20 uppercase mb-8">Get in touch</p>
        <h2 className="font-poppins font-extralight text-white mb-6"
          style={{ fontSize: 'clamp(36px, 5vw, 72px)', lineHeight: 1.2 }}>
          Ready to Capture<br />Your Perfect Day?
        </h2>
        <p className="text-white/40 text-sm leading-relaxed max-w-md mx-auto mb-14">
          Let our dedicated photographers and videographers preserve every precious moment of your wedding day with care, artistry, and a timeless eye for beauty.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/contact" className="inline-flex items-center gap-3 font-poppins text-xs tracking-widest text-white border border-white/20 px-10 py-4 hover:bg-white hover:text-black transition-all duration-500">
            Contact Us
            <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
              <path d="M1 0V6C1 7 1.1 8.5 3.5 8.5H11.5" stroke="currentColor"/>
              <path d="M8 4L12.5 8.5L8 13" stroke="currentColor"/>
            </svg>
          </Link>
          <a href="tel:0354136538" className="inline-flex items-center gap-3 font-poppins text-xs tracking-widest text-white/40 border border-white/10 px-10 py-4 hover:text-white hover:border-white/30 transition-all duration-500">
            03-5413-6538
          </a>
        </div>
      </motion.div>
    </section>
  )
}
