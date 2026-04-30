import { Link, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FUNDING_TIERS, OPPORTUNITIES } from '@/data'
import { KoruCorner, ScrollReveal, MagneticHover } from '@/components/motif/KoruMotifs'
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

const STEPS = [
  {
    num: '01',
    title: 'Check eligibility',
    desc: 'Read the guidelines and use our eligibility checker to confirm this fund is right for you and your project.',
  },
  {
    num: '02',
    title: 'Talk to an adviser',
    desc: 'Our kaiāwhina can help you decide which fund to apply to and give feedback on your draft application.',
  },
  {
    num: '03',
    title: 'Prepare your application',
    desc: 'Gather your project details, budget, CV and any supporting material. Use our application advice to write clearly.',
  },
  {
    num: '04',
    title: 'Submit before the deadline',
    desc: 'Applications must be submitted online through our portal before 5pm on the closing date (New Zealand time).',
  },
]

export default function FundingTier() {
  const { tierId } = useParams<{ tierId: string }>()

  const tier = FUNDING_TIERS.find(
    t => t.id === tierId || t.path === `/funding/${tierId}`
  ) ?? FUNDING_TIERS[0]

  const tierOpps = OPPORTUNITIES.filter(o => o.tier === tier.id)

  return (
    <>
      <SubNav items={SUB_ITEMS} />
      <Breadcrumbs
        trail={[
          { label: 'Home', path: '/' },
          { label: 'Funding & support', path: '/funding' },
          { label: tier.label },
        ]}
      />

      {/* Page head */}
      <div className="page-head" style={{ position: 'relative', overflow: 'hidden' }}>
        <KoruCorner position="tr" size={280} color="var(--kowhai)" opacity={0.07} />
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr auto',
              gap: 48,
              alignItems: 'start',
            }}
          >
            <div>
              <motion.span
                className="eyebrow"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              >
                {tier.kupu}
              </motion.span>
              <motion.h1
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1], delay: 0.07 }}
              >
                {tier.label}
              </motion.h1>
              <motion.p
                className="lede"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.14 }}
              >
                {tier.blurb}
              </motion.p>
              <motion.div
                style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 28 }}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
              >
                <MagneticHover strength={0.25}>
                  <Link
                    to={`/funding/apply?opp=${tierOpps[0]?.id ?? ''}`}
                    className="btn btn-primary"
                  >
                    Start application →
                  </Link>
                </MagneticHover>
                <Link to="/funding/adviser" className="btn btn-ghost">
                  Talk to an adviser
                </Link>
              </motion.div>
            </div>

            {/* Meta panel */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.12 }}
              style={{
                background: 'var(--surface)',
                border: '1px solid var(--line)',
                borderRadius: 'var(--r)',
                padding: 28,
                minWidth: 240,
              }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                <div>
                  <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 4 }}>
                    Amount available
                  </div>
                  <div style={{ fontSize: 20, fontWeight: 700 }}>{tier.amount}</div>
                </div>
                <div style={{ borderTop: '1px solid var(--line)', paddingTop: 18 }}>
                  <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 4 }}>
                    Next round
                  </div>
                  <div style={{ fontSize: 18, fontWeight: 600 }}>{tier.next}</div>
                </div>
                <div style={{ borderTop: '1px solid var(--line)', paddingTop: 18 }}>
                  <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>
                    Opportunities
                  </div>
                  <div style={{ fontSize: 15, fontWeight: 500, color: 'var(--ink)' }}>
                    {tierOpps.length} fund{tierOpps.length !== 1 ? 's' : ''} in this tier
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Hero image */}
      <div className="container" style={{ marginTop: 0 }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          style={{
            borderRadius: 'var(--r-lg)',
            overflow: 'hidden',
            aspectRatio: '21/7',
          }}
        >
          <img
            src={tier.img}
            alt={tier.label}
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
        </motion.div>
      </div>

      {/* How it works */}
      <section className="section">
        <div className="container">
          <ScrollReveal>
            <span className="eyebrow">Te ara tono</span>
            <h2 style={{ marginTop: 16, maxWidth: 500 }}>How it works</h2>
          </ScrollReveal>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: 'var(--gap)',
              marginTop: 40,
            }}
          >
            {STEPS.map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: i * 0.1 }}
                style={{
                  padding: 28,
                  background: 'var(--surface)',
                  borderRadius: 'var(--r)',
                  border: '1px solid var(--line)',
                  position: 'relative',
                }}
              >
                <div
                  style={{
                    fontSize: 13,
                    fontWeight: 700,
                    color: 'var(--accent)',
                    letterSpacing: '0.1em',
                    marginBottom: 14,
                    fontFamily: 'var(--font-mono, monospace)',
                  }}
                >
                  {step.num}
                </div>
                <h4 style={{ margin: '0 0 10px' }}>{step.title}</h4>
                <p style={{ color: 'var(--muted)', margin: 0, fontSize: 15 }}>{step.desc}</p>
              </motion.div>
            ))}
          </div>

          <ScrollReveal delay={0.2}>
            <div style={{ marginTop: 32 }}>
              <Link to="/funding/advice" className="btn btn-ghost">
                Read full application advice →
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Available opportunities in tier */}
      <section className="section" style={{ background: 'var(--surface)', borderTop: '1px solid var(--line)' }}>
        <div className="container">
          <ScrollReveal>
            <div className="section-head">
              <div>
                <span className="eyebrow">Ngā āheinga</span>
                <h2 style={{ marginTop: 16 }}>Available in this tier</h2>
              </div>
              <Link to="/funding/opportunities" className="btn-link">All opportunities →</Link>
            </div>
          </ScrollReveal>

          {tierOpps.length === 0 ? (
            <ScrollReveal>
              <div
                style={{
                  padding: 48,
                  textAlign: 'center',
                  color: 'var(--muted)',
                  background: 'var(--bg)',
                  borderRadius: 'var(--r)',
                  border: '1px solid var(--line)',
                }}
              >
                <p>No specific opportunities listed in this tier right now.</p>
                <Link to="/funding/opportunities" className="btn btn-ghost" style={{ marginTop: 16 }}>
                  Browse all opportunities →
                </Link>
              </div>
            </ScrollReveal>
          ) : (
            <div className="opp-list" style={{ borderTop: '1px solid var(--line)' }}>
              {tierOpps.map((o, i) => (
                <motion.div
                  key={o.id}
                  initial={{ opacity: 0, x: -18 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-20px' }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: i * 0.07 }}
                >
                  <Link to={`/funding/opportunity/${o.id}`} className="opp-row">
                    <div className="code">{o.code}</div>
                    <div className="title-cell">
                      <h4>
                        <span className="title-text">{o.title}</span>
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
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Bottom CTA */}
      <section
        className="section-tight"
        style={{
          background: 'var(--ink)',
          color: 'var(--bg)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <KoruCorner position="tr" size={260} color="#fff" opacity={0.04} />
        <div className="container" style={{ textAlign: 'center' }}>
          <ScrollReveal>
            <span className="eyebrow" style={{ color: 'var(--kowhai)' }}>Kei te hiahia āwhina?</span>
            <h2 style={{ color: '#fff', marginTop: 16, marginBottom: 12 }}>
              Not sure if this fund is right for you?
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.7)', maxWidth: 520, margin: '0 auto 28px' }}>
              Our kaiāwhina are here to help. Book a free confidential call — available in te reo Māori.
            </p>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to="/funding/adviser" className="btn btn-accent">Book a kōrero →</Link>
              <Link to="/funding/advice" className="btn btn-ghost" style={{ color: '#fff', borderColor: 'rgba(255,255,255,0.25)' }}>
                Read advice
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  )
}
