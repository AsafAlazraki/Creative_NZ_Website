import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Fragment } from 'react'
import { OPPORTUNITIES } from '@/data'
import { KoruCorner, ScrollReveal } from '@/components/motif/KoruMotifs'
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

const MONTHS = ['May 2026', 'Jun 2026', 'Jul 2026', 'Aug 2026', 'Sep 2026', 'Oct 2026']

function getOppsForMonth(monthStr: string, monthIndex: number) {
  const [m] = monthStr.split(' ')
  return OPPORTUNITIES.filter(o =>
    o.next.includes(m) || (monthIndex === 0 && (o.next === 'Open year-round' || o.next === 'Open' || o.next === 'Rolling'))
  )
}

export default function FundingCalendar() {
  return (
    <>
      <SubNav items={SUB_ITEMS} />
      <Breadcrumbs
        trail={[
          { label: 'Home', path: '/' },
          { label: 'Funding', path: '/funding' },
          { label: 'Calendar' },
        ]}
      />

      <div className="page-head" style={{ position: 'relative', overflow: 'hidden' }}>
        <KoruCorner position="tr" size={260} color="var(--moana)" opacity={0.07} />
        <div className="container">
          <motion.span
            className="eyebrow"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          >
            Maramataka pūtea
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.08 }}
          >
            Funding calendar
          </motion.h1>
          <motion.p
            className="lede"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1], delay: 0.14 }}
          >
            Plan ahead — every published round and deadline at a glance.
          </motion.p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr' }}>
            {MONTHS.map((m, mi) => {
              const opps = getOppsForMonth(m, mi)
              return (
                <Fragment key={m}>
                  <ScrollReveal delay={mi * 0.06}>
                    <div style={{
                      padding: '28px 16px 28px 0',
                      borderTop: '1px solid var(--line)',
                      borderRight: '1px solid var(--line)',
                      fontFamily: 'var(--font-display)',
                      fontSize: 24,
                      fontStyle: 'italic',
                    }}>
                      {m}
                    </div>
                  </ScrollReveal>

                  <div style={{ padding: '28px 0 28px 28px', borderTop: '1px solid var(--line)', display: 'flex', flexDirection: 'column', gap: 12 }}>
                    {opps.length === 0 && (
                      <span style={{ color: 'var(--muted)', fontSize: 14 }}>Nothing scheduled this month.</span>
                    )}
                    {opps.map((o, i) => (
                      <motion.div
                        key={o.id}
                        initial={{ opacity: 0, x: -12 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: '-16px' }}
                        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: i * 0.06 }}
                      >
                        <Link
                          to={`/funding/opportunity/${o.id}`}
                          style={{
                            display: 'flex', gap: 16, alignItems: 'center',
                            padding: '12px 16px', background: 'var(--surface)',
                            borderRadius: 'var(--r)', cursor: 'pointer',
                            textDecoration: 'none',
                            border: '1px solid var(--line)',
                          }}
                        >
                          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--muted)', width: 56, flexShrink: 0 }}>
                            {o.code}
                          </span>
                          <span style={{ fontWeight: 500, flex: 1, color: 'var(--ink)' }}>{o.title}</span>
                          <span style={{
                            fontSize: 11, padding: '3px 10px', borderRadius: 'var(--r-pill)',
                            background: o.status === 'open' ? 'rgba(63,94,58,0.12)' : 'rgba(232,163,23,0.18)',
                            color: o.status === 'open' ? 'var(--bush)' : 'var(--kowhai-deep)',
                            fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase',
                          }}>
                            {o.status}
                          </span>
                          <span style={{ fontSize: 13, color: 'var(--muted)', flexShrink: 0 }}>{o.next}</span>
                          <span style={{ color: 'var(--accent-2)' }}>→</span>
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </Fragment>
              )
            })}
          </div>

          <ScrollReveal delay={0.1}>
            <div style={{ marginTop: 48, display: 'flex', gap: 12 }}>
              <Link to="/funding/opportunities" className="btn btn-primary">View all opportunities →</Link>
              <Link to="/funding/advice" className="btn btn-ghost">Application advice</Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  )
}
