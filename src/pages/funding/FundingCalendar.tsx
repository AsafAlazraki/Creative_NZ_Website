import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
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

// 9-month timeline window. We render a Gantt-style strip for each opportunity.
const MONTHS: { short: string; full: string; index: number }[] = [
  { short: 'May', full: 'May 2026',  index: 0 },
  { short: 'Jun', full: 'Jun 2026',  index: 1 },
  { short: 'Jul', full: 'Jul 2026',  index: 2 },
  { short: 'Aug', full: 'Aug 2026',  index: 3 },
  { short: 'Sep', full: 'Sep 2026',  index: 4 },
  { short: 'Oct', full: 'Oct 2026',  index: 5 },
  { short: 'Nov', full: 'Nov 2026',  index: 6 },
  { short: 'Dec', full: 'Dec 2026',  index: 7 },
  { short: 'Jan', full: 'Jan 2027',  index: 8 },
]

const TIER_COLOR: Record<string, string> = {
  community: 'var(--bush)',
  earlycareer: 'var(--moana)',
  artists: 'var(--pohutukawa)',
  organisations: 'var(--siapo)',
  pasifika: 'var(--moana)',
  maori: 'var(--kowhai-deep)',
  international: 'var(--accent-2)',
}

// Today as a fraction along the timeline (0..1). May 4 → ~0.13 of nine-month window.
const TODAY_FRACTION = 0.04

interface RoundBar {
  start: number    // month index 0..8
  end: number      // exclusive
  rolling: boolean // open year-round
}

/**
 * Parse `o.next` into a Gantt-bar position. Examples:
 *   "28 May 2026"        → bar at May 25 → Jun 5 (small spike)
 *   "14 May 2026"        → bar at May 11 → May 21
 *   "Open year-round"    → full strip with rolling pattern
 *   "Aug 2026"           → bar covers August
 *   "Open"               → full strip with rolling pattern
 *   "Closed"             → null (don't render)
 */
function parseRound(next: string): RoundBar | null {
  const t = next.trim()
  if (!t || t.toLowerCase() === 'closed') return null
  if (/year-round|rolling|^open$/i.test(t)) return { start: 0, end: MONTHS.length, rolling: true }

  // "28 May 2026" or "May 2026"
  const monthMatch = t.match(/(May|Jun|Jul|Aug|Sep|Oct|Nov|Dec|Jan)/i)
  if (!monthMatch) return null
  const m = MONTHS.findIndex(mm => mm.short.toLowerCase() === monthMatch[0].toLowerCase())
  if (m < 0) return null

  const dayMatch = t.match(/^(\d{1,2})\s+/)
  if (dayMatch) {
    // specific deadline → render a 0.6-month bar centred on that day
    const day = parseInt(dayMatch[1], 10)
    const dayFrac = day / 30
    const start = m + Math.max(0, dayFrac - 0.2)
    const end   = m + Math.min(1.2, dayFrac + 0.4)
    return { start, end, rolling: false }
  }
  // whole-month round
  return { start: m, end: m + 1, rolling: false }
}

export default function FundingCalendar() {
  const ROWS = OPPORTUNITIES
    .map(o => ({ opp: o, bar: parseRound(o.next) }))
    .filter((r): r is { opp: typeof OPPORTUNITIES[number]; bar: RoundBar } => r.bar !== null)

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
            Maramataka pūtea · Funding calendar
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.08 }}
          >
            Nine months of funding rounds, at a glance.
          </motion.h1>
          <motion.p
            className="lede"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1], delay: 0.14 }}
          >
            Bars show when each fund's round is open. Hover any bar for the
            opportunity title; click through to read full criteria.
          </motion.p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          {/* Legend */}
          <ScrollReveal>
            <div style={{ display: 'flex', gap: 18, flexWrap: 'wrap', marginBottom: 32, fontSize: 12, color: 'var(--muted)' }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                <span style={{ width: 18, height: 8, background: 'var(--bush)', borderRadius: 2 }} />
                Round window
              </span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                <span style={{
                  width: 18, height: 8,
                  background: 'repeating-linear-gradient(45deg, var(--moana), var(--moana) 4px, transparent 4px, transparent 8px)',
                  borderRadius: 2,
                }} />
                Open year-round
              </span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                <span style={{ width: 2, height: 14, background: 'var(--pohutukawa)' }} />
                Today
              </span>
            </div>
          </ScrollReveal>

          {/* Gantt timeline */}
          <div className="cal-gantt">
            {/* Month header row */}
            <div className="cal-row cal-row--head">
              <div className="cal-row-label" />
              <div className="cal-row-track">
                {MONTHS.map((m, i) => (
                  <div
                    key={m.full}
                    className={`cal-month${i === 0 ? ' cal-month--first' : ''}`}
                    style={{
                      gridColumn: `${i + 1} / span 1`,
                    }}
                  >
                    <div className="cal-month-short">{m.short}</div>
                    <div className="cal-month-year">{m.full.split(' ')[1]}</div>
                  </div>
                ))}
                {/* Today line */}
                <div
                  className="cal-today"
                  style={{ left: `${(TODAY_FRACTION * MONTHS.length / MONTHS.length) * 100}%` }}
                  aria-label="Today"
                >
                  <span>Today</span>
                </div>
              </div>
            </div>

            {/* One row per opportunity */}
            {ROWS.map(({ opp, bar }, i) => {
              const color = TIER_COLOR[opp.tier] ?? 'var(--bush)'
              const startPct = (bar.start / MONTHS.length) * 100
              const widthPct = ((bar.end - bar.start) / MONTHS.length) * 100

              return (
                <motion.div
                  key={opp.id}
                  className="cal-row"
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-12px' }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1], delay: i * 0.04 }}
                >
                  <Link to={`/funding/opportunity/${opp.id}`} className="cal-row-label" style={{ textDecoration: 'none', color: 'inherit' }}>
                    <div className="cal-row-code">{opp.code}</div>
                    <div className="cal-row-title">{opp.title}</div>
                    {opp.kupu && <div className="cal-row-kupu">{opp.kupu}</div>}
                  </Link>
                  <div className="cal-row-track">
                    {/* faint month-grid lines */}
                    {MONTHS.map((m, idx) => (
                      <div
                        key={m.full}
                        className="cal-grid-line"
                        style={{ left: `${(idx / MONTHS.length) * 100}%` }}
                      />
                    ))}

                    <Link
                      to={`/funding/opportunity/${opp.id}`}
                      className={`cal-bar${bar.rolling ? ' cal-bar--rolling' : ''}`}
                      title={`${opp.title} — ${opp.next}`}
                      style={{
                        left: `${startPct}%`,
                        width: `${widthPct}%`,
                        background: bar.rolling
                          ? `repeating-linear-gradient(45deg, ${color}, ${color} 6px, transparent 6px, transparent 12px), color-mix(in srgb, ${color} 18%, var(--bg))`
                          : color,
                        borderColor: color,
                      }}
                    >
                      <span className="cal-bar-amount">{opp.amount}</span>
                    </Link>
                  </div>
                </motion.div>
              )
            })}
          </div>

          <ScrollReveal delay={0.1}>
            <div style={{ marginTop: 48, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <Link to="/funding/opportunities" className="btn btn-primary">View all opportunities →</Link>
              <Link to="/funding/advice" className="btn btn-ghost">Application advice</Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  )
}
