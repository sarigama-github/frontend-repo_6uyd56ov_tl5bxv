import React from 'react'
import { Github, Linkedin, Twitter } from 'lucide-react'

const iconMap = {
  github: Github,
  linkedin: Linkedin,
  twitter: Twitter,
}

export default function Footer({ socials = [], source }) {
  const normalized = socials.map(s => {
    const key = s.platform?.toLowerCase().includes('github') ? 'github'
      : s.platform?.toLowerCase().includes('linkedin') ? 'linkedin'
      : 'twitter'
    return { ...s, key }
  })

  return (
    <footer className="border-t bg-white">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm text-slate-600">
              Data auto-synced from
              {' '}<a className="font-semibold text-slate-900 underline decoration-indigo-400 decoration-2 underline-offset-4" href={source} target="_blank" rel="noreferrer">the original site</a>.
            </p>
            <p className="mt-1 text-sm text-slate-500">Built with a modern, animated experience.</p>
          </div>

          <div className="flex items-center gap-3">
            {normalized.slice(0, 5).map((s, i) => {
              const Icon = iconMap[s.key] || Twitter
              return (
                <a
                  key={s.url + i}
                  href={s.url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-700 transition hover:border-indigo-300 hover:text-indigo-600"
                >
                  <Icon size={18} />
                </a>
              )
            })}
          </div>
        </div>
      </div>
    </footer>
  )
}
