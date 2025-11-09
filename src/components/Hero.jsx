import React from 'react'
import Spline from '@splinetool/react-spline'
import { motion } from 'framer-motion'

export default function Hero({ title, description, hero }) {
  const heading = hero || title || 'Portfolio'
  const sub = description || 'Modern, playful, and interactive tech portfolio'

  return (
    <section className="relative min-h-[80vh] w-full overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-indigo-900 to-purple-900">
      <div className="absolute inset-0">
        <Spline
          scene="https://prod.spline.design/VJLoxp84lCdVfdZu/scene.splinecode"
          style={{ width: '100%', height: '100%' }}
        />
      </div>

      {/* soft gradient sheen */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-slate-900/60" />

      <div className="relative z-10 mx-auto flex max-w-6xl flex-col items-start gap-6 px-6 py-24 md:py-36">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-4xl font-extrabold tracking-tight text-white drop-shadow md:text-6xl"
        >
          {heading}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="max-w-2xl text-base leading-relaxed text-indigo-100 md:text-lg"
        >
          {sub}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-2 flex flex-wrap items-center gap-3"
        >
          <a
            href="#projects"
            className="group inline-flex items-center rounded-full bg-white/90 px-5 py-2 text-sm font-semibold text-slate-900 backdrop-blur transition hover:bg-white"
          >
            View Projects
            <svg className="ml-2 h-4 w-4 transition group-hover:translate-x-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5l7 7-7 7"/></svg>
          </a>
          <a
            href="#about"
            className="inline-flex items-center rounded-full border border-white/30 bg-white/10 px-5 py-2 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/20"
          >
            About Me
          </a>
        </motion.div>
      </div>
    </section>
  )
}
