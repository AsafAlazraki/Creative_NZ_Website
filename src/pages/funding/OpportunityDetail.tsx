import { Link, useParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { Bell } from 'lucide-react'
import { Helmet } from 'react-helmet-async'
import { OPPORTUNITIES, getDraft } from '@/data'
import { KoruCorner, ScrollReveal, MagneticHover } from '@/components/motif/KoruMotifs'
import Breadcrumbs from '@/components/ui/Breadcrumbs'
import SubNav from '@/components/ui/SubNav'

/**
 * Alert sign-up — shown on upcoming opportunities so users can be
 * notified when applications open. Posts to a Netlify Form
 * (see netlify.toml / public _form-name handling). Renders inline
 * with success state when submitted.
 */
function AlertSignup({ oppTitle, oppDate }: { oppTitle: string; oppDate: string }) {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [open, setOpen] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim()) return
    // In production this would POST to Netlify Forms or a lightweight
    // serverless function. For the demo we just acknowledge locally.
    setSubmitted(true)
  }

  if (!open) {
    return (
      <button
        className="btn btn-ghost"
        style={{ width: '100%', justifyContent: 'center', display: 'flex' }}
        onClick={() => setOpen(true)}
      >
        <Bell size={14} aria-hidden="true" /> Notify me when open
      </button>
    )
  }
  return (
    <div className="alert-signup">
      <AnimatePresence mode="wait">
        {submitted ? (
          <motion.div
            key="ok"
            initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            className="alert-signup-ok"
            role="status"
            aria-live="polite"
          >
            <span className="alert-signup-ok-tick">✓</span>
            We'll email <strong>{email}</strong> when this round opens.
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            onSubmit={handleSubmit}
            name="funding-alert"
          >
            <input type="hidden" name="form-name" value="funding-alert" />
            <input type="hidden" name="opportunity" value={oppTitle} />
            <p className="alert-signup-meta">
              <Bell size={13} aria-hidden="true" /> Opens {oppDate}. We'll email you when applications open.
            </p>
            <div className="alert-signup-row">
              <input
                type="email"
                name="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="your@email.com"
                aria-label="Your email address for funding round alerts"
              />
              <button type="submit" className="btn btn-accent">Notify me</button>
            </div>
            <button
              type="button"
              className="btn-link"
              onClick={() => setOpen(false)}
              style={{ fontSize: 12, marginTop: 8 }}
            >
              Cancel
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  )
}

const SUB_ITEMS = [
  { label: 'Overview', path: '/funding' },
  { label: 'All opportunities', path: '/funding/opportunities' },
  { label: 'Calendar', path: '/funding/calendar' },
  { label: 'Advice', path: '/funding/advice' },
  { label: 'Results', path: '/funding/results' },
  { label: 'Awards', path: '/funding/awards' },
]

const STATUS_STYLE: Record<string, { bg: string; color: string }> = {
  open: { bg: 'rgba(63,94,58,0.12)', color: 'var(--bush)' },
  upcoming: { bg: 'rgba(232,163,23,0.18)', color: 'var(--kowhai-deep)' },
  closed: { bg: 'rgba(0,0,0,0.06)', color: 'var(--muted)' },
}

export default function OpportunityDetail() {
  const { oppId } = useParams<{ oppId: string }>()
  const o = OPPORTUNITIES.find(x => x.id === oppId)

  if (!o) {
    return (
      <div className="container section" style={{ textAlign: 'center', padding: '100px 0' }}>
        <span className="eyebrow">404</span>
        <h2 style={{ marginTop: 16 }}>Opportunity not found</h2>
        <Link to="/funding/opportunities" className="btn btn-primary" style={{ marginTop: 24, display: 'inline-flex' }}>
          Browse all opportunities →
        </Link>
      </div>
    )
  }

  const hasDraft = !!getDraft(o.id)
  const ss = STATUS_STYLE[o.status] ?? STATUS_STYLE.closed

  return (
    <>
      <Helmet>
        <title>{o.title} · Creative New Zealand</title>
        <meta name="description" content={o.desc} />
        <meta property="og:title" content={`${o.title} · Creative New Zealand`} />
        <meta property="og:description" content={o.desc} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`https://creativenz.netlify.app/funding/opportunity/${o.id}`} />
        <meta name="twitter:title" content={`${o.title} · Creative New Zealand`} />
        <meta name="twitter:description" content={o.desc} />
      </Helmet>
      <SubNav items={SUB_ITEMS} />
      <Breadcrumbs
        trail={[
          { label: 'Home', path: '/' },
          { label: 'Funding', path: '/funding' },
          { label: 'Opportunities', path: '/funding/opportunities' },
          { label: o.title },
        ]}
      />

      {/* Page head */}
      <div className="page-head" style={{ position: 'relative', overflow: 'hidden' }}>
        <KoruCorner position="tr" size={300} color="var(--kowhai)" opacity={0.07} />
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 20 }}
          >
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--muted)', letterSpacing: '0.08em' }}>
              {o.code}
            </span>
            <span style={{
              padding: '4px 12px',
              borderRadius: 'var(--r-pill)',
              fontSize: 11,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              fontWeight: 600,
              background: ss.bg,
              color: ss.color,
            }}>
              {o.status}
            </span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1], delay: 0.07 }}
          >
            {o.title}
          </motion.h1>
          {o.kupu && (
            <motion.p
              className="kupu"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.12 }}
              style={{ fontSize: 18, marginTop: 8 }}
            >
              {o.kupu}
            </motion.p>
          )}
          <motion.p
            className="lede"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.16 }}
          >
            {o.desc}
          </motion.p>
        </div>
      </div>

      {/* Main content */}
      <section className="section">
        <div className="container" style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 64, alignItems: 'start' }}>
          {/* Left: full description */}
          <div>
            <ScrollReveal>
              <h2 style={{ marginBottom: 20 }}>About this fund</h2>
              <p style={{ fontSize: 17, lineHeight: 1.7, color: 'var(--ink-2)', marginBottom: 24 }}>
                {o.desc} The fund supports projects that demonstrate clear artistic vision, a meaningful relationship with audiences or community, and the practical capacity to deliver.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <h3 style={{ marginTop: 48, marginBottom: 16 }}>Who can apply</h3>
              <ul style={{ margin: 0, paddingLeft: 20, color: 'var(--ink-2)', lineHeight: 1.8 }}>
                <li>Individual artists, ringatoi or arts practitioners</li>
                <li>Groups, collectives or unincorporated organisations</li>
                <li>Registered arts organisations</li>
                <li>Applicants whose work is grounded in or for communities in Aotearoa New Zealand</li>
              </ul>
            </ScrollReveal>

            <ScrollReveal delay={0.15}>
              <h3 style={{ marginTop: 48, marginBottom: 16 }}>What we'll fund</h3>
              <ul style={{ margin: 0, paddingLeft: 20, color: 'var(--ink-2)', lineHeight: 1.8 }}>
                <li>Artist fees and time</li>
                <li>Materials, production and technical costs</li>
                <li>Marketing, audience and presentation costs</li>
                <li>Mentorship, professional development and travel</li>
              </ul>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <h3 style={{ marginTop: 48, marginBottom: 16 }}>Assessment criteria</h3>
              <p style={{ color: 'var(--ink-2)', lineHeight: 1.7, margin: 0 }}>
                Peer assessors review your application against the published criteria. We weight artistic merit, public value and capacity to deliver. Strong applications clearly explain the work, who it's for, and why Creative NZ funding makes it possible.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.25}>
              <div style={{ marginTop: 48, padding: 28, background: 'var(--surface)', borderRadius: 'var(--r)', border: '1px solid var(--line)' }}>
                <h4 style={{ marginBottom: 10, fontSize: 18 }}>Read our application advice</h4>
                <p style={{ color: 'var(--muted)', fontSize: 15, margin: '0 0 16px' }}>
                  Tips on eligibility, evidence of work, budgets and letters of support.
                </p>
                <Link to="/funding/advice" className="btn-link">Go to advice →</Link>
              </div>
            </ScrollReveal>
          </div>

          {/* Right: sticky sidebar */}
          <motion.aside
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            style={{
              position: 'sticky',
              top: 120,
              padding: 32,
              background: 'var(--surface)',
              border: '1px solid var(--line)',
              borderRadius: 'var(--r)',
            }}
          >
            {[
              { label: 'Funding', value: o.amount },
              { label: 'Next round', value: o.next },
              { label: 'Decision timeline', value: 'Within 8 weeks of close' },
            ].map((row, i) => (
              <div key={row.label} style={{ paddingBottom: 20, borderBottom: '1px solid var(--line)', marginBottom: 20 }}>
                <div style={{ fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 8, fontWeight: 600 }}>
                  {row.label}
                </div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: i === 0 ? 28 : 18, fontStyle: i === 0 ? 'italic' : 'normal' }}>
                  {row.value}
                </div>
              </div>
            ))}

            {o.status === 'open' ? (
              <MagneticHover strength={0.2}>
                <Link
                  to={`/funding/apply?opp=${o.id}`}
                  className="btn btn-primary"
                  style={{ width: '100%', justifyContent: 'center', display: 'flex' }}
                >
                  {hasDraft ? 'Resume draft →' : 'Start application →'}
                </Link>
              </MagneticHover>
            ) : o.status === 'upcoming' ? (
              <AlertSignup oppTitle={o.title} oppDate={o.next} />
            ) : (
              <button className="btn btn-ghost" disabled style={{ width: '100%', justifyContent: 'center', opacity: 0.5 }}>
                Round closed
              </button>
            )}

            <Link
              to="/funding/adviser"
              className="btn btn-ghost"
              style={{ marginTop: 12, width: '100%', justifyContent: 'center', display: 'flex' }}
            >
              Speak with an adviser →
            </Link>
          </motion.aside>
        </div>
      </section>
    </>
  )
}
