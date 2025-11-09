import React, { useEffect, useState } from 'react'
import Hero from './components/Hero'
import Projects from './components/Projects'
import About from './components/About'
import Footer from './components/Footer'

function App() {
  const [data, setData] = useState({
    title: '',
    description: '',
    hero: '',
    sections: [],
    projects: [],
    socials: [],
    source: '',
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const load = async () => {
      try {
        const base = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
        const res = await fetch(`${base}/api/portfolio`)
        if (!res.ok) throw new Error('Failed to load portfolio data')
        const json = await res.json()
        setData(json)
      } catch (e) {
        setError(e.message)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50 text-slate-900">
      <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <a href="#" className="text-lg font-extrabold tracking-tight">
            {data.title || 'Portfolio'}
          </a>
          <nav className="hidden gap-6 text-sm font-semibold text-slate-700 md:flex">
            <a href="#projects" className="hover:text-indigo-600">Projects</a>
            <a href="#about" className="hover:text-indigo-600">About</a>
            {data.source && (
              <a href={data.source} target="_blank" rel="noreferrer" className="hover:text-indigo-600">Source</a>
            )}
          </nav>
        </div>
      </header>

      {loading ? (
        <div className="mx-auto max-w-6xl px-6 py-32 text-center">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-2 border-indigo-500 border-t-transparent" />
          <p className="mt-4 text-slate-600">Loading portfolio...</p>
        </div>
      ) : error ? (
        <div className="mx-auto max-w-2xl px-6 py-24 text-center">
          <h2 className="text-2xl font-bold">Couldn\'t fetch data</h2>
          <p className="mt-2 text-slate-600">{error}</p>
        </div>
      ) : (
        <>
          <div className="px-6 pt-6">
            <Hero title={data.title} description={data.description} hero={data.hero} />
          </div>
          <Projects projects={data.projects} />
          <About sections={data.sections} />
          <Footer socials={data.socials} source={data.source} />
        </>
      )}
    </div>
  )
}

export default App
