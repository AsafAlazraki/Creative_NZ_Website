import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useState, useMemo } from 'react'
import { OPPORTUNITIES, STORIES, TOOLKITS } from '@/data'
import { KoruCorner, ScrollReveal } from '@/components/motif/KoruMotifs'
import Breadcrumbs from '@/components/ui/Breadcrumbs'

type ResultTab = 'all' | 'funding' | 'news'

function highlight(text: string, query: string): React.ReactNode {
  if (!query.trim()) return text
  const escaped = query.trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const parts = text.split(new RegExp(`(${escaped})`, 'gi'))
  return parts.map((part, i) =>
    part.toLowerCase() === query.trim().toLowerCase()
      ? <mark key={i} style={{ background: 'var(--kowhai)', color: 'var(--accent-ink)', borderRadius: 2, padding: '0 2px' }}>{part}</mark>
      : part
  )
}

const SUGGESTED = [
  'Arts Grants', 'Toi Pasifika', 'Ngā Toi Māori', 'Residency', 'Fellowship', 'Early career',
  'Community', 'Menton', 'Literature',
]

export default function SearchPage() {
  const [query, setQuery] = useState('')
  const [tab, setTab] = useState<ResultTab>('all')

  const ql = query.toLowerCase().trim()

  const matchedOpps = useMemo(() => {
    if (!ql) return []
    return OPPORTUNITIES.filter(o =>
      (o.title + o.desc + (o.kupu ?? '') + o.code + o.tier).toLowerCase().includes(ql)
    )
  }, [ql])

  const matchedStories = useMemo(() => {
    if (!ql) return []
    return STORIES.filter(s =>
      (s.title + s.excerpt + s.cat + (s.kupu ?? '')).toLowerCase().includes(ql)
    )
  }, [ql])

  const matchedToolkits = useMemo(() => {
    if (!ql) return []
    return TOOLKITS.filter(t =>
      (t.title + t.desc + (t.kupu ?? '')).toLowerCase().includes(ql)
    )
  }, [ql])

  const hasQuery = query.trim().length > 0
  const totalResults = matchedOpps.length + matchedStories.length + matchedToolkits.length
  const hasResults = totalResults > 0

  const visibleOpps = tab === 'news' ? [] : matchedOpps
  const visibleStories = tab === 'funding' ? [] : matchedStories

  return (
    <>
      <Breadcrumbs trail={[{ label: 'Home', path: '/' }, { label: 'Search' }]} />

      {/* Search hero */}
      <section className="page-head" style={{ position: 'relative', overflow: 'hidden' }}>
        <KoruCorner position="tr" size={320} color="var(--kowhai)" opacity={0.07} />
        <div className="container">
          <motion.span
            className="eyebrow"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
          >
            Rapunga · Search
          </motion.span>
          <motion.h1
            style={{ marginTop: 18, marginBottom: 32, maxWidth: 680 }}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.06 }}
          >
            Search Creative New Zealand
          </motion.h1>

          {/* Search bar */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.12 }}
            style={{ maxWidth: 680 }}
          >
            <div className="searchbar" style={{ padding: '18px 24px', fontSize: 18 }}>
              <svg width="22" height="22" viewBox="0 0 18 18" fill="none" style={{ color: 'var(--muted)', flexShrink: 0 }}>
                <circle cx="8" cy="8" r="5.5" stroke="currentColor" strokeWidth="1.5" />
                <path d="M12 12 L16 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
              <input
                autoFocus
                value={query}
                onChange={e => { setQuery(e.target.value); setTab('all') }}
                placeholder="Search for funding, news, artforms…"
                style={{ fontSize: 18 }}
                aria-label="Search Creative New Zealand"
              />
              {query && (
                <button
                  className="pill"
                  style={{ fontSize: 11, padding: '5px 10px' }}
                  onClick={() => { setQuery(''); setTab('all') }}
                >
                  Clear
                </button>
              )}
            </div>

            {/* Suggestions */}
            {!hasQuery && (
              <div style={{ marginTop: 20 }}>
                <div style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 10, letterSpacing: '0.06em', textTransform: 'uppercase', fontWeight: 600 }}>
                  Try searching for
                </div>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  {SUGGESTED.map(s => (
                    <button key={s} className="pill" onClick={() => setQuery(s)} style={{ fontSize: 13 }}>
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Results section */}
      <section className="section">
        <div className="container">
          <AnimatePresence mode="wait">
            {hasQuery ? (
              <motion.div
                key="results"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35 }}
              >
                {/* Result count + tab filters */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32, flexWrap: 'wrap', gap: 16 }}>
                  <div>
                    {hasResults ? (
                      <span style={{ fontSize: 15, color: 'var(--muted)' }}>
                        <strong style={{ color: 'var(--ink)', fontSize: 17 }}>{totalResults}</strong>{' '}
                        result{totalResults !== 1 ? 's' : ''} for{' '}
                        <strong style={{ color: 'var(--ink)' }}>"{query.trim()}"</strong>
                      </span>
                    ) : (
                      <span style={{ fontSize: 15, color: 'var(--muted)' }}>
                        No results for <strong style={{ color: 'var(--ink)' }}>"{query.trim()}"</strong>
                      </span>
                    )}
                  </div>
                  {hasResults && (
                    <div style={{ display: 'flex', gap: 6 }}>
                      {([
                        { key: 'all', label: `All (${totalResults})` },
                        { key: 'funding', label: `Funding (${matchedOpps.length})` },
                        { key: 'news', label: `News (${matchedStories.length})` },
                      ] as { key: ResultTab; label: string }[]).map(t => (
                        <button
                          key={t.key}
                          className={`pill${tab === t.key ? ' on' : ''}`}
                          onClick={() => setTab(t.key)}
                          style={{ fontSize: 12 }}
                        >
                          {t.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Funding opportunities */}
                {visibleOpps.length > 0 && (
                  <div style={{ marginBottom: 56 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 20, paddingBottom: 14, borderBottom: '1px solid var(--line)' }}>
                      <span className="eyebrow">Funding opportunities</span>
                      <span style={{ fontSize: 12, background: 'var(--paper-2)', padding: '3px 10px', borderRadius: 'var(--r-pill)', color: 'var(--muted)' }}>
                        {visibleOpps.length}
                      </span>
                    </div>
                    <div className="opp-list" style={{ borderTop: '1px solid var(--line)' }}>
                      {visibleOpps.map((opp, i) => (
                        <motion.div
                          key={opp.id}
                          initial={{ opacity: 0, x: -16 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: i * 0.06 }}
                        >
                          <Link to={`/funding/opportunity/${opp.id}`} className="opp-row">
                            <div className="code">{opp.code}</div>
                            <div className="title-cell">
                              <h4>
                                {highlight(opp.title, query.trim())}
                                {' '}
                                <span className={`status-badge ${opp.status}`}>{opp.status}</span>
                              </h4>
                              {opp.kupu && <span className="kupu">{opp.kupu}</span>}
                            </div>
                            <div className="desc" style={{ fontSize: 13, color: 'var(--muted)' }}>
                              {highlight(opp.desc, query.trim())}
                            </div>
                            <div className="amt">{opp.amount}</div>
                            <div className="when"><span className="lbl">Next</span>{opp.next}</div>
                            <div className="arrow">→</div>
                          </Link>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}

                {/* News stories */}
                {visibleStories.length > 0 && (
                  <div style={{ marginBottom: 56 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 28, paddingBottom: 14, borderBottom: '1px solid var(--line)' }}>
                      <span className="eyebrow">News & stories</span>
                      <span style={{ fontSize: 12, background: 'var(--paper-2)', padding: '3px 10px', borderRadius: 'var(--r-pill)', color: 'var(--muted)' }}>
                        {visibleStories.length}
                      </span>
                    </div>
                    <div className="news-grid">
                      {visibleStories.map((story, i) => (
                        <motion.div
                          key={story.id}
                          initial={{ opacity: 0, y: 24 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: i * 0.07 }}
                        >
                          <Link to={`/news/${story.id}`} className="ncard">
                            <div className="ncard-img">
                              <img src={story.img} alt={story.title} />
                            </div>
                            <div className="cat">{story.cat}</div>
                            <h3>{highlight(story.title, query.trim())}</h3>
                            <p style={{ marginTop: 8, marginBottom: 10 }}>
                              {highlight(story.excerpt, query.trim())}
                            </p>
                            <div className="date">{story.date} · {story.read} read</div>
                          </Link>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Resources (shown under 'all' tab only) */}
                {tab === 'all' && matchedToolkits.length > 0 && (
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 20, paddingBottom: 14, borderBottom: '1px solid var(--line)' }}>
                      <span className="eyebrow">Resources</span>
                      <span style={{ fontSize: 12, background: 'var(--paper-2)', padding: '3px 10px', borderRadius: 'var(--r-pill)', color: 'var(--muted)' }}>
                        {matchedToolkits.length}
                      </span>
                    </div>
                    {matchedToolkits.map(t => (
                      <Link key={t.id} to="/resources" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 16, padding: '18px 0', borderBottom: '1px solid var(--line)' }}>
                        <div>
                          <div style={{ fontFamily: 'var(--font-display)', fontSize: 20, marginBottom: 4 }}>
                            {highlight(t.title, query.trim())}
                          </div>
                          <div style={{ color: 'var(--muted)', fontSize: 14 }}>{t.desc}</div>
                        </div>
                        <div style={{ color: 'var(--accent-2)', flexShrink: 0 }}>→</div>
                      </Link>
                    ))}
                  </div>
                )}

                {/* No results state */}
                {!hasResults && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{ textAlign: 'center', padding: '64px 0' }}
                  >
                    <div style={{ fontSize: 40, marginBottom: 20 }}>🔍</div>
                    <h3 style={{ marginBottom: 16, fontWeight: 400 }}>No results found</h3>
                    <p style={{ color: 'var(--muted)', fontSize: 16, marginBottom: 32, maxWidth: 440, margin: '0 auto 32px' }}>
                      Try different keywords, or browse our funding opportunities and news directly.
                    </p>
                    <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
                      <Link to="/funding/opportunities" className="btn btn-primary">Browse funding →</Link>
                      <Link to="/news" className="btn btn-ghost">Browse news</Link>
                    </div>
                    <div style={{ marginTop: 40 }}>
                      <div style={{ fontSize: 13, color: 'var(--muted)', marginBottom: 12 }}>Try one of these instead</div>
                      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'center' }}>
                        {SUGGESTED.slice(0, 6).map(s => (
                          <button key={s} className="pill" onClick={() => setQuery(s)} style={{ fontSize: 13 }}>{s}</button>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            ) : (
              /* Empty state — no query */
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <ScrollReveal delay={0.1}>
                  <div style={{ marginBottom: 40, paddingBottom: 32, borderBottom: '1px solid var(--line)' }}>
                    <h3 style={{ fontSize: 18, marginBottom: 16 }}>Browse by section</h3>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 10 }}>
                      {[
                        { label: 'Funding & support', to: '/funding' },
                        { label: 'All opportunities', to: '/funding/opportunities' },
                        { label: 'News & stories', to: '/news' },
                        { label: 'Resources', to: '/resources' },
                        { label: 'Ngā Toi Māori', to: '/toi-maori' },
                        { label: 'Toi Pasifika', to: '/toi-pasifika' },
                        { label: 'Advocacy', to: '/advocacy' },
                        { label: 'About us', to: '/about' },
                      ].map(l => (
                        <Link
                          key={l.to}
                          to={l.to}
                          style={{
                            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                            padding: '14px 18px',
                            background: 'var(--paper)', borderRadius: 'var(--r-md)', border: '1px solid var(--line)',
                            fontWeight: 500, fontSize: 14,
                          }}
                        >
                          <span>{l.label}</span>
                          <span style={{ color: 'var(--muted)' }}>→</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                </ScrollReveal>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40 }}>
                  {/* Open opportunities */}
                  <ScrollReveal>
                    <div style={{ padding: 32, background: 'var(--paper)', border: '1px solid var(--line)', borderRadius: 'var(--r-lg)' }}>
                      <span className="eyebrow" style={{ marginBottom: 16, display: 'block' }}>Open now</span>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 20 }}>
                        {OPPORTUNITIES.filter(o => o.status === 'open').slice(0, 4).map(opp => (
                          <Link
                            key={opp.id}
                            to={`/funding/opportunity/${opp.id}`}
                            style={{
                              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                              padding: '12px 16px', background: 'var(--card)', border: '1px solid var(--line)',
                              borderRadius: 'var(--r-md)', gap: 12,
                            }}
                          >
                            <div>
                              <div style={{ fontWeight: 500, fontSize: 14 }}>{opp.title}</div>
                              <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 2 }}>{opp.amount} · {opp.next}</div>
                            </div>
                            <span className={`status-badge ${opp.status}`}>{opp.status}</span>
                          </Link>
                        ))}
                      </div>
                      <Link to="/funding/opportunities" className="btn-link" style={{ fontSize: 13 }}>All opportunities →</Link>
                    </div>
                  </ScrollReveal>

                  {/* Latest news */}
                  <ScrollReveal delay={0.1}>
                    <div style={{ padding: 32, background: 'var(--paper)', border: '1px solid var(--line)', borderRadius: 'var(--r-lg)' }}>
                      <span className="eyebrow" style={{ marginBottom: 16, display: 'block' }}>Latest news</span>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 20 }}>
                        {STORIES.slice(0, 4).map(story => (
                          <Link
                            key={story.id}
                            to={`/news/${story.id}`}
                            style={{
                              display: 'flex', gap: 14, padding: '12px 16px', background: 'var(--card)',
                              border: '1px solid var(--line)', borderRadius: 'var(--r-md)', alignItems: 'center',
                            }}
                          >
                            <div style={{ width: 44, height: 44, borderRadius: 'var(--r-sm)', overflow: 'hidden', flexShrink: 0, background: 'var(--paper-2)' }}>
                              <img src={story.img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            </div>
                            <div style={{ minWidth: 0 }}>
                              <div style={{ fontWeight: 500, fontSize: 13.5, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{story.title}</div>
                              <div style={{ fontSize: 11.5, color: 'var(--muted)', marginTop: 2 }}>{story.cat} · {story.date}</div>
                            </div>
                          </Link>
                        ))}
                      </div>
                      <Link to="/news" className="btn-link" style={{ fontSize: 13 }}>All news →</Link>
                    </div>
                  </ScrollReveal>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </>
  )
}
