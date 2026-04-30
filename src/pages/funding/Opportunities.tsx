import { Link, useSearchParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useState, useMemo } from 'react'
import { OPPORTUNITIES, loadDrafts } from '@/data'
import { ScrollReveal } from '@/components/motif/KoruMotifs'
import Breadcrumbs from '@/components/ui/Breadcrumbs'
import SubNav from '@/components/ui/SubNav'

const SUB_ITEMS = [
  { label: 'Overview', path: '/funding' },
  { label: 'All opportunities', path: '/funding/opportunities' },
  { label: 'Calendar', path: '/funding/calendar' },
  { label: 'Advice', path: '/funding/advice' },
  { label: 'Results', path: '/funding/results' },
  { label: 'Awards', path: '/funding/awards' },
]

const STATUS_LABELS: Record<string, string> = {
  all: 'All',
  open: 'Open now',
  upcoming: 'Upcoming',
  closed: 'Closed',
}

export default function Opportunities() {
  const [searchParams] = useSearchParams()
  const initialStatus = searchParams.get('status') ?? 'all'
  const initialTier = searchParams.get('tier') ?? 'all'

  const [status, setStatus] = useState(initialStatus)
  const [tierFilter, setTierFilter] = useState(initialTier)
  const [q, setQ] = useState('')

  const drafts = loadDrafts()

  const allTiers = Array.from(new Set(OPPORTUNITIES.map(o => o.tier))).sort()

  const filtered = useMemo(() => {
    return OPPORTUNITIES.filter(o => {
      const matchStatus = status === 'all' || o.status === status
      const matchTier = tierFilter === 'all' || o.tier === tierFilter
      const matchQ =
        !q.trim() ||
        o.title.toLowerCase().includes(q.toLowerCase()) ||
        o.desc.toLowerCase().includes(q.toLowerCase()) ||
        (o.kupu ?? '').toLowerCase().includes(q.toLowerCase()) ||
        o.code.toLowerCase().includes(q.toLowerCase())
      return matchStatus && matchTier && matchQ
    })
  }, [status, tierFilter, q])

  return (
    <>
      <SubNav items={SUB_ITEMS} />
      <Breadcrumbs
        trail={[
          { label: 'Home', path: '/' },
          { label: 'Funding & support', path: '/funding' },
          { label: 'All opportunities' },
        ]}
      />

      <div className="page-head">
        <div className="container">
          <motion.span
            className="eyebrow"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          >
            Ngā āheinga
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.07 }}
          >
            All opportunities
          </motion.h1>
          <motion.p
            className="lede"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1], delay: 0.14 }}
          >
            All current and upcoming funding opportunities from Creative New Zealand.
          </motion.p>
        </div>
      </div>

      <section className="section-tight">
        <div className="container">
          {/* Search */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            style={{ marginBottom: 20 }}
          >
            <div className="searchbar">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" style={{ color: 'var(--muted)', flexShrink: 0 }}>
                <circle cx="8" cy="8" r="5.5" stroke="currentColor" strokeWidth="1.5" />
                <path d="M12 12 L16 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
              <input
                value={q}
                onChange={e => setQ(e.target.value)}
                placeholder="Search by name, keyword or artform…"
              />
              {q && (
                <button className="pill" style={{ fontSize: 11 }} onClick={() => setQ('')}>
                  clear
                </button>
              )}
            </div>
          </motion.div>

          {/* Status filter pills */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.25 }}
            style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 12 }}
          >
            {(['all', 'open', 'upcoming', 'closed'] as const).map(s => (
              <button
                key={s}
                className={`pill${status === s ? ' on' : ''}`}
                onClick={() => setStatus(s)}
              >
                {STATUS_LABELS[s]}
                {s !== 'all' && (
                  <span style={{ marginLeft: 6, opacity: 0.6, fontSize: 11 }}>
                    ({OPPORTUNITIES.filter(o => o.status === s).length})
                  </span>
                )}
              </button>
            ))}
            <span style={{ width: 1, background: 'var(--line)', margin: '2px 4px' }} />
            {(['all', ...allTiers] as string[]).map(t => (
              <button
                key={t}
                className={`pill${tierFilter === t ? ' on' : ''}`}
                onClick={() => setTierFilter(t)}
                style={{ textTransform: 'capitalize' }}
              >
                {t === 'all' ? 'All tiers' : t}
              </button>
            ))}
          </motion.div>

          {/* Result count */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            style={{ color: 'var(--muted)', fontSize: 14, marginBottom: 8 }}
          >
            {filtered.length} result{filtered.length !== 1 ? 's' : ''}
          </motion.div>

          {/* Opportunity list */}
          <div className="opp-list" style={{ borderTop: '1px solid var(--line)' }}>
            <AnimatePresence mode="popLayout">
              {filtered.length === 0 ? (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  style={{
                    padding: '48px 0',
                    textAlign: 'center',
                    color: 'var(--muted)',
                  }}
                >
                  <p style={{ marginBottom: 16 }}>No opportunities match your filters.</p>
                  <button
                    className="btn btn-ghost"
                    onClick={() => { setStatus('all'); setTierFilter('all'); setQ('') }}
                  >
                    Clear filters
                  </button>
                </motion.div>
              ) : (
                filtered.map((o, i) => {
                  const hasDraft = !!drafts[o.id]
                  return (
                    <motion.div
                      key={o.id}
                      layout
                      initial={{ opacity: 0, x: -18 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 12 }}
                      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: i * 0.04 }}
                    >
                      <Link to={`/funding/opportunity/${o.id}`} className="opp-row">
                        <div className="code">{o.code}</div>
                        <div className="title-cell">
                          <h4>
                            <span className="title-text">
                              {o.title}
                              {hasDraft && (
                                <span className="draft-badge" style={{ marginLeft: 8 }}>
                                  <span className="dot" />
                                  Draft saved
                                </span>
                              )}
                            </span>
                            <span className={`status-badge ${o.status}`}>{o.status}</span>
                          </h4>
                          {o.kupu && <span className="kupu">{o.kupu}</span>}
                        </div>
                        <div className="desc">{o.desc}</div>
                        <div className="amt">{o.amount}</div>
                        <div className="when">
                          <span className="lbl">Next</span>
                          {o.next}
                        </div>
                        <div className="arrow">→</div>
                      </Link>
                    </motion.div>
                  )
                })
              )}
            </AnimatePresence>
          </div>

          {/* CTA */}
          <ScrollReveal delay={0.1}>
            <div
              style={{
                marginTop: 48,
                padding: 32,
                background: 'var(--surface)',
                borderRadius: 'var(--r)',
                border: '1px solid var(--line)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 24,
                flexWrap: 'wrap',
              }}
            >
              <div>
                <h3 style={{ margin: '0 0 6px', fontSize: 20 }}>Not sure which fund to apply to?</h3>
                <p style={{ margin: 0, color: 'var(--muted)', fontSize: 15 }}>
                  Our kaiāwhina can help you find the right fund and give feedback on your application.
                </p>
              </div>
              <Link to="/funding/adviser" className="btn btn-primary" style={{ flexShrink: 0 }}>
                Book a kōrero →
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  )
}
