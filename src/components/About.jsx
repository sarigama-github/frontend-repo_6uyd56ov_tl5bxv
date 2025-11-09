import React from 'react'
import { motion } from 'framer-motion'

export default function About({ sections = [] }) {
  // Heuristic: pick the first section that looks like about
  const about = sections.find(s => /about|profile|bio/i.test((s.id || '') + ' ' + (s.class || ''))) || sections[0]
  const text = about?.text || 'A passionate developer crafting delightful digital experiences.'

  return (
    <section id="about" className="mx-auto max-w-4xl px-6 py-16">
      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl"
      >
        About
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="prose prose-slate mt-6 text-slate-700"
      >
        {text}
      </motion.p>
    </section>
  )
}
