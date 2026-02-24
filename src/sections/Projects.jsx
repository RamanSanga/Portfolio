import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { fetchProjects } from '../lib/api.js'
import { Container, Section, SectionHeader } from '../components/layout/LayoutPrimitives.jsx'
import { TiltCard } from '../components/cinematic/TiltCard.jsx'

const EASE = [0.22, 1, 0.36, 1]

function normaliseProject(p) {
  return {
    id: p?._id || p?.id || p?.slug || p?.title || String(Math.random()),
    title: p?.title || p?.name || 'Project',
    description: p?.description || p?.summary || '',
    stack: Array.isArray(p?.stack) ? p.stack : Array.isArray(p?.tech) ? p.tech : [],
    liveUrl: p?.liveUrl || p?.demoUrl || p?.live || p?.url || '',
    repoUrl: p?.repoUrl || p?.githubUrl || p?.github || '',
  }
}

export function ProjectsSection() {
  const [state, setState] = useState({ status: 'idle', projects: [], error: null })

  useEffect(() => {
    let alive = true
    setState({ status: 'loading', projects: [], error: null })
    fetchProjects()
      .then((projects) => {
        if (!alive) return
        setState({ status: 'success', projects, error: null })
      })
      .catch((err) => {
        if (!alive) return
        setState({ status: 'error', projects: [], error: err?.message || 'Failed to load projects' })
      })
    return () => {
      alive = false
    }
  }, [])

  const projects = useMemo(() => state.projects.map(normaliseProject), [state.projects])

  return (
    <Section id="projects" className="c-projects">
      <Container>
        <SectionHeader
          eyebrow="Projects"
          title="High-impact builds with real backend muscle."
          description="Live MERN projects pulled from your backend API. Hover for depth, glow, and cinematic motion."
        />

        {state.status === 'error' ? (
          <div className="c-inlineError">{state.error}</div>
        ) : null}

        <div className="c-projectGrid">
          {state.status === 'loading'
            ? Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="c-skeletonCard" aria-hidden="true" />
              ))
            : projects.map((p, idx) => (
                <motion.div
                  key={p.id}
                  initial={{ y: 90, rotateX: 12, opacity: 0 }}
                  whileInView={{ y: 0, rotateX: 0, opacity: 1 }}
                  viewport={{ once: true, margin: '-15% 0px -15% 0px' }}
                  transition={{ duration: 1.0, ease: EASE, delay: Math.min(0.18, idx * 0.04) }}
                >
                  <TiltCard className="c-projectCard">
                    <div className="c-projectCard__top">
                      <h3 className="c-h3">{p.title}</h3>
                      <div className="c-projectCard__links">
                        {p.repoUrl ? (
                          <a className="c-link" href={p.repoUrl} target="_blank" rel="noreferrer">
                            Repo
                          </a>
                        ) : null}
                        {p.liveUrl ? (
                          <a className="c-link c-link--hot" href={p.liveUrl} target="_blank" rel="noreferrer">
                            Live
                          </a>
                        ) : null}
                      </div>
                    </div>

                    {p.description ? <p className="c-projectCard__desc">{p.description}</p> : null}

                    {p.stack?.length ? (
                      <ul className="c-tags" aria-label="Project stack">
                        {p.stack.slice(0, 8).map((t) => (
                          <li key={t} className="c-tag">
                            {t}
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </TiltCard>
                </motion.div>
              ))}
        </div>
      </Container>
    </Section>
  )
}

