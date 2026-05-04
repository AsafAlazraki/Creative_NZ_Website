import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { STORIES } from '@/data'
import { KoruCorner, ScrollReveal } from '@/components/motif/KoruMotifs'
import Breadcrumbs from '@/components/ui/Breadcrumbs'

const CATS = ['All', ...Array.from(new Set(STORIES.map(s => s.cat)))]

export default function NewsIndex() {
  const [active, setActive] = useState('All')

  const filtered = active === 'All' ? STORIES : STORIES.filter(s => s.cat === active)
  const [feature, ...rest] = filtered

  return (
    <>
      <Breadcrumbs trail={[{ label: 'Home', path: '/' }, { label: 'News & stories' }]} />

      <section className="page-head" style={{ position: 'relative', overflow: 'hidden' }}>
        <KoruCorner position="tr" size={320} color="var(--kowhai)" opacity={0.07} />
        <div className="container">
          <motion.span
            className="eyebrow"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            Pitopito kōrero
          </motion.span>
          <motion.h1
            style={{ marginTop: 18, marginBottom: 16 }}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1], delay: 0.06 }}
          >
            News & stories
          </motion.h1>
          <motion.p
            className="lede"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.12 }}
          >
            Stories from our artists, communities and the wider arts sector across Aotearoa.
          </motion.p>
        </div>
      </section>

      {/* Category filter pills */}
      <div style={{ background: 'var(--paper)', borderBottom: '1px solid var(--line)', padding: '20px 0' }}>
        <div className="container">
          <motion.div
            style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {CATS.map(cat => (
              <button
                key={cat}
                className={`pill${active === cat ? ' on' : ''}`}
                onClick={() => setActive(cat)}
              >
                {cat}
                {cat !== 'All' && (
                  <span style={{ opacity: 0.55, fontSize: 11 }}>
                    {STORIES.filter(s => s.cat === cat).length}
                  </span>
                )}
              </button>
            ))}
          </motion.div>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Feature story — magazine-lede dark card */}
              {feature && (
                <ScrollReveal>
                  <Link to={`/news/${feature.id}`} className="ncard news-feature">
                    <div className="ncard-img">
                      <img src={feature.img} alt={feature.title} />
                    </div>
                    <div>
                      <div className="cat">{feature.cat}{feature.kupu ? ` · ${feature.kupu}` : ''}</div>
                      <h3>{feature.title}</h3>
                      <p>{feature.excerpt}</p>
                      <div className="date">{feature.date} · {feature.read} read</div>
                      <div style={{ marginTop: 18 }}>
                        <span className="btn btn-accent" style={{ display: 'inline-flex' }}>Read story →</span>
                      </div>
                    </div>
                  </Link>
                </ScrollReveal>
              )}

              {/* Remaining stories grid */}
              {rest.length > 0 && (
                <div className="news-grid">
                  {rest.map((s, i) => (
                    <motion.div
                      key={s.id}
                      initial={{ opacity: 0, y: 28 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: '-32px' }}
                      transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1], delay: i * 0.07 }}
                    >
                      <Link to={`/news/${s.id}`} className="ncard">
                        <div className="ncard-img">
                          <img src={s.img} alt={s.title} />
                        </div>
                        <div className="cat">{s.cat}{s.kupu ? ` · ${s.kupu}` : ''}</div>
                        <h3>{s.title}</h3>
                        <p style={{ marginBottom: 10, marginTop: 8 }}>{s.excerpt}</p>
                        <div className="date">{s.date} · {s.read} read</div>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              )}

              {filtered.length === 0 && (
                <div style={{ textAlign: 'center', padding: '80px 0', color: 'var(--muted)' }}>
                  <p style={{ fontSize: 18 }}>No stories in this category yet.</p>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>
    </>
  )
}
