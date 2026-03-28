'use client'

import { motion } from 'framer-motion'

const team = [
  { name: 'Yusuke K.', role: 'Founder / Director', initial: 'YK' },
  { name: 'Akira M.', role: 'Lead Photographer', initial: 'AM' },
  { name: 'Saki T.', role: 'Film Director', initial: 'ST' },
  { name: 'Ren O.', role: 'Creative Director', initial: 'RO' },
]

export default function AboutTeam() {
  return (
    <section className="bg-[#080808] py-32 px-8 md:px-16 border-t border-white/5">
      <div className="mb-20">
        <p className="font-poppins text-xs tracking-[0.4em] text-white/25 uppercase mb-4">The People</p>
        <h2 className="font-poppins font-extralight text-white text-5xl md:text-6xl">Our Team</h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/5">
        {team.map((member, i) => (
          <motion.div
            key={member.name}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: i * 0.1 }}
            viewport={{ once: true }}
            className="bg-[#080808] p-8 group hover:bg-white/[0.02] transition-colors duration-500"
          >
            {/* Avatar placeholder */}
            <div className="w-16 h-16 border border-white/10 rounded-full flex items-center justify-center mb-6 group-hover:border-white/25 transition-colors">
              <span className="font-poppins text-xs tracking-widest text-white/30">{member.initial}</span>
            </div>
            <p className="text-white font-light text-lg mb-1">{member.name}</p>
            <p className="font-poppins text-xs tracking-widest text-white/30">{member.role}</p>
          </motion.div>
        ))}
      </div>

      {/* Company info */}
      <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-px bg-white/5">
        {[
          { label: 'Founded', value: '2015' },
          { label: 'Location', value: 'Aoyama, Tokyo' },
          { label: 'Tel', value: '03-5413-6538' },
        ].map(item => (
          <div key={item.label} className="bg-[#080808] p-8">
            <p className="font-poppins text-xs tracking-widest text-white/20 uppercase mb-3">{item.label}</p>
            <p className="font-poppins text-xl font-light text-white/60">{item.value}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
