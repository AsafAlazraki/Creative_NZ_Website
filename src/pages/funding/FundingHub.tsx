import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FUNDING_TIERS, OPPORTUNITIES } from '@/data'
import { KoruCorner, ScrollReveal, MagneticHover } from '@/components/motif/KoruMotifs'
import SubNav from '@/components/ui/SubNav'

const SUB_ITEMS = [
  { label: 'Overview', path: '/funding' },
  { label: 'All opportunities', path: '/funding/opportunities' },
  { label: 'Calendar', path: '/funding/calendar' },
  { label: 'Advice', path: '/funding/advice' },
  { label: 'Results', path: '/funding/results' },
  { label: 'Awards', path: '/funding/awards' },
]

export default function FundingHub() {
  const openCount = OPPORTUNITIES.filter(o => o.status === 'open').length

  return (
    <>
      <SubNav items={SUB_ITEMS} />

      <div className="page-head page-head--moana" style={{ position: 'relative', overflow: 'hidden' }}>
        <KoruCorner position="tr" size={320} color="var(--kowhai)" opacity={0.10} />
        <div className="container">
          <motion.span
            className="eyebrow"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            Pūtea tautoko
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1], delay: 0.08 }}
          >
            Funding &amp; support
          </motion.h1>
          <motion.p
            className="lede"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.16 }}
          >
            We invest in artists, ringatoi, arts organisations and communities across Aotearoa.
            Find the right fund for where you are in your practice.
          </motion.p>
          <motion.div
            style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 28 }}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.24 }}
          >
            <MagneticHover strength={0.25}>
              <Link to="/funding/opportunities" className="btn btn-primary">
                View all opportunities ({OPPORTUNITIES.length}) →
              </Link>
            </MagneticHover>
            <MagneticHover strength={0.2}>
              <Link to="/funding/adviser" className="btn btn-ghost">
                Talk to an adviser
              </Link>
            </MagneticHover>
          </motion.div>
        </div>
      </div>

      {/* Open now pill */}
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.32 }}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 12,
            background: 'color-mix(in srgb, var(--bush) 8%, var(--bg))',
            border: '1px solid color-mix(in srgb, var(--bush) 22%, transparent)',
            borderRadius: 'var(--r)',
            padding: '12px 18px',
            marginBottom: 0,
          }}
        >
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 7, fontWeight: 600, fontSize: 14, color: 'var(--bush)' }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--bush)', display: 'inline-block' }} />
            {openCount} opportunities open now
          </span>
          <Link to="/funding/opportunities?status=open" className="btn-link" style={{ fontSize: 14 }}>
            View open →
          </Link>
        </motion.div>
      </div>

      {/* Funding tiers */}
      <section className="section">
        <div className="container">
          <ScrollReveal>
            <div className="section-head">
              <div>
                <span className="eyebrow">Ngā taumata</span>
                <h2 style={{ marginTop: 16, maxWidth: 560 }}>Find funding for your stage of practice.</h2>
              </div>
              <Link to="/funding/opportunities" className="btn-link">All opportunities →</Link>
            </div>
          </ScrollReveal>

          <div className="tier-grid">
            {FUNDING_TIERS.map((t, i) => (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1], delay: i * 0.1 }}
              >
                <motion.div whileHover={{ y: -6, transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] } }}>
                  <Link to={t.path} className="tier-card">
                    <div className="tier-card-img">
                      <img src={t.img} alt={t.label} />
                    </div>
                    <div className="tier-card-body">
                      <h3>{t.label}</h3>
                      <span className="kupu">{t.kupu}</span>
                      <p>{t.blurb}</p>
                      <div className="meta-row">
                        <div>Funding<strong>{t.amount}</strong></div>
                        <div>Next round<strong>{t.next}</strong></div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Three-column CTA */}
      <section
        className="section-tight"
        style={{
          background: 'var(--surface)',
          borderTop: '1px solid var(--line)',
          borderBottom: '1px solid var(--line)',
        }}
      >
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: 'var(--gap)',
            }}
          >
            {[
              {
                eyebrow: 'Kōrero',
                title: 'Book a kōrero',
                desc: 'Talk with one of our funding advisers before you apply. Free, confidential, and available in te reo Māori.',
                cta: 'Book now →',
                to: '/funding/adviser',
              },
              {
                eyebrow: 'Tohutohu',
                title: 'Read advice',
                desc: "Tips, guides and real examples to help you write a strong application — whatever you're applying for.",
                cta: 'Read advice →',
                to: '/funding/advice',
              },
              {
                eyebrow: 'Hua',
                title: 'View results',
                desc: 'See who received funding in our latest rounds and investment decisions across Aotearoa.',
                cta: 'View results →',
                to: '/funding/results',
              },
            ].map((item, i) => (
              <ScrollReveal key={item.to} delay={i * 0.1}>
                <div
                  style={{
                    padding: 32,
                    background: 'var(--bg)',
                    borderRadius: 'var(--r)',
                    border: '1px solid var(--line)',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 12,
                  }}
                >
                  <span className="eyebrow">{item.eyebrow}</span>
                  <h3 style={{ fontSize: 22, margin: 0 }}>{item.title}</h3>
                  <p style={{ color: 'var(--muted)', flexGrow: 1, margin: 0 }}>{item.desc}</p>
                  <div>
                    <Link to={item.to} className="btn btn-ghost">
                      {item.cta}
                    </Link>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Quick links */}
      <section className="section-tight">
        <div className="container">
          <ScrollReveal>
            <div className="section-head" style={{ marginBottom: 24 }}>
              <div>
                <span className="eyebrow">Ngā hononga tere</span>
                <h2 style={{ marginTop: 12 }}>Quick links</h2>
              </div>
            </div>
          </ScrollReveal>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 10 }}>
            {[
              { label: 'How to apply', to: '/funding/advice' },
              { label: 'Upcoming deadlines', to: '/funding/calendar' },
              { label: 'Awards & prizes', to: '/funding/awards' },
              { label: 'International opportunities', to: '/funding/opportunities' },
              { label: 'Pasifika funding', to: '/funding/opportunities?tier=pasifika' },
              { label: 'Māori arts funding', to: '/funding/opportunities?tier=maori' },
            ].map((l, i) => (
              <motion.div
                key={l.to}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: i * 0.06 }}
              >
                <Link
                  to={l.to}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '16px 20px',
                    background: 'var(--surface)',
                    borderRadius: 'var(--r)',
                    border: '1px solid var(--line)',
                    fontWeight: 500,
                    color: 'var(--ink)',
                    textDecoration: 'none',
                  }}
                >
                  {l.label}
                  <span style={{ color: 'var(--muted)' }}>→</span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
