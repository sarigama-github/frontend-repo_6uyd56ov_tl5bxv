import React from 'react'
import { motion } from 'framer-motion'

export default function Projects({ projects = [] }) {
  const list = projects.slice(0, 8)

  return (
    <section id="projects" className="mx-auto max-w-6xl px-6 py-16">
      <div className="mb-8 flex items-end justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">Selected Projects</h2>
          <p className="mt-2 text-slate-600">Pulled automatically from the source portfolio.</p>
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {list.length === 0 && (
          <div className="col-span-full rounded-xl border border-dashed border-slate-300 p-10 text-center text-slate-500">
            No project links detected yet.
          </div>
        )}
        {list.map((p, i) => (
          <motion.a
            key={p.url + i}
            href={p.url}
            target="_blank"
            rel="noreferrer"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
            className="group relative overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-slate-200"
          >
            <div className="aspect-video bg-gradient-to-br from-indigo-100 to-purple-100" />
            <div className="p-4">
              <h3 className="line-clamp-1 text-lg font-semibold text-slate-900 group-hover:text-indigo-600">
                {p.label || 'Project'}
              </h3>
              <p className="mt-1 line-clamp-2 text-sm text-slate-600">{p.url}</p>
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  )
}
