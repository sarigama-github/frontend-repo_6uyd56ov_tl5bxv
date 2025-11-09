import React from 'react'
import { motion } from 'framer-motion'
import { Briefcase } from 'lucide-react'

// Normalize various possible scraped shapes into a consistent array
// of { role, company, period, description } objects
function normalizeExperiences(sections = []) {
  if (!Array.isArray(sections)) return []

  // try to locate an experience-like section
  const expSection = sections.find(s => /experience|work|career|employment/i.test(`${s?.id || ''} ${s?.class || ''} ${s?.title || ''}`)) || sections.find(s => Array.isArray(s?.entries) && s.entries.length)

  if (!expSection) return []

  // case 1: explicit entries
  if (Array.isArray(expSection.entries)) {
    return expSection.entries.map((e) => ({
      role: e.role || e.title || e.position || 'Role',
      company: e.company || e.org || e.organization || '',
      period: e.period || e.date || e.duration || '',
      description: e.description || e.summary || e.details || '',
      link: e.link || e.url || '',
    }))
  }

  // case 2: items as strings (bulleted lines)
  if (Array.isArray(expSection.items)) {
    return expSection.items.map((line) => ({
      role: inferRoleFromLine(line),
      company: inferCompanyFromLine(line),
      period: inferPeriodFromLine(line),
      description: line,
      link: '',
    }))
  }

  // case 3: split the text into bullet-like lines
  const text = [expSection.text, ...(Array.isArray(expSection.paragraphs) ? expSection.paragraphs : [])]
    .filter(Boolean)
    .join('\n')

  const lines = text
    .split(/\n|•|-\s|\u2022/g)
    .map(s => s.trim())
    .filter(Boolean)

  return lines.slice(0, 12).map((line) => ({
    role: inferRoleFromLine(line),
    company: inferCompanyFromLine(line),
    period: inferPeriodFromLine(line),
    description: line,
    link: '',
  }))
}

function inferRoleFromLine(line = '') {
  const match = line.match(/(engineer|developer|designer|manager|lead|intern|consultant|architect)/i)
  return match ? capitalize(match[0]) : 'Experience'
}

function inferCompanyFromLine(line = '') {
  const atMatch = line.match(/@\s*([A-Za-z0-9 &._-]+)/)
  if (atMatch) return atMatch[1]
  const ofMatch = line.match(/ at ([A-Za-z0-9 &._-]+)/i)
  if (ofMatch) return ofMatch[1]
  return ''
}

function inferPeriodFromLine(line = '') {
  const m = line.match(/(\b\d{4}\b)(\s*[-–—]\s*(?:Present|Now|\b\d{4}\b))?/i)
  return m ? m[0] : ''
}

function capitalize(s = '') { return s.charAt(0).toUpperCase() + s.slice(1) }

export default function Experiences({ sections = [] }) {
  const experiences = normalizeExperiences(sections)

  return (
    <section id="experience" className="mx-auto max-w-5xl px-6 py-16">
      <div className="mb-8 flex items-end justify-between">
        <div>
          <h2 className="flex items-center gap-2 text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
            <Briefcase className="h-7 w-7 text-indigo-600" /> Work Experience
          </h2>
          <p className="mt-2 text-slate-600">Auto-fetched from the original site and formatted for readability.</p>
        </div>
      </div>

      {experiences.length === 0 ? (
        <div className="rounded-xl border border-dashed border-slate-300 p-10 text-center text-slate-500">
          No experience details detected yet.
        </div>
      ) : (
        <div className="relative">
          <div className="absolute left-5 top-0 hidden h-full w-px bg-slate-200 md:block" />
          <ul className="space-y-6">
            {experiences.map((e, i) => (
              <motion.li
                key={(e.role || 'exp') + i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.4, delay: i * 0.03 }}
                className="relative rounded-xl bg-white p-5 shadow-sm ring-1 ring-slate-200 md:pl-16"
              >
                <div className="hidden md:block">
                  <span className="absolute left-3 top-6 h-3 w-3 -translate-x-1/2 rounded-full border-2 border-white bg-indigo-500 shadow" />
                </div>
                <div className="flex flex-col gap-1 md:flex-row md:items-baseline md:justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900">
                      {e.role}{e.company ? <span className="text-slate-500"> @ {e.company}</span> : null}
                    </h3>
                    {e.period && <p className="text-sm text-slate-500">{e.period}</p>}
                  </div>
                  {e.link && (
                    <a href={e.link} target="_blank" rel="noreferrer" className="text-sm font-medium text-indigo-600 hover:underline">
                      View
                    </a>
                  )}
                </div>
                {e.description && (
                  <p className="mt-3 text-slate-700">
                    {e.description}
                  </p>
                )}
              </motion.li>
            ))}
          </ul>
        </div>
      )}
    </section>
  )
}
