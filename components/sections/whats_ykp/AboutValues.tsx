'use client'

import { motion } from 'framer-motion'

const values = [
  { word: 'Playful', ja: 'Playfulness', desc: 'We break the mold and constantly explore new forms of expression, keeping every project fresh and unexpected.' },
  { word: 'Sincere', ja: 'Sincerity', desc: 'We listen carefully to each client and bring deep commitment to every job — always going beyond what is expected.' },
  { word: 'Craft', ja: 'Craftsmanship', desc: 'A relentless attention to detail and refined technical skill drive us to pursue the highest quality in everything we create.' },
  { word: 'Story', ja: 'Storytelling', desc: 'Every piece of work we produce carries a story that moves people — because we believe great visuals must have a soul.' },
]

export default function AboutValues() {
  return (
    <section className="bg-[#080808] py-32 px-8 md:px-16">
      <div className="mb-20">
        <p className="font-poppins text-xs tracking-[0.4em] text-white/25 uppercase mb-4">Our Values</p>
        <h2 className="font-poppins font-extralight text-white text-5xl md:text-6xl">What drives us</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/5">
        {values.map((v, i) => (
          <motion.div
            key={v.word}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: i * 0.1 }}
            viewport={{ once: true }}
            className="bg-[#080808] p-10 hover:bg-white/[0.025] transition-colors duration-500"
          >
            <p className="font-poppins text-xs tracking-widest text-white/20 mb-8">{String(i + 1).padStart(2, '0')}</p>
            <h3 className="font-poppins font-extralight text-white text-4xl mb-2 leading-none">{v.word}</h3>
            <p className="text-white/30 text-sm mb-6">{v.ja}</p>
            <p className="text-white/45 text-sm leading-relaxed">{v.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
