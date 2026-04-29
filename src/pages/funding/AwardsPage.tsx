import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
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

const WINNERS = [
  {
    cat: 'Lifetime Achievement',
    name: 'Igelese Ete',
    kupu: 'Mōhiotanga',
    desc: 'Composer, conductor and educator — for decades of work shaping Pacific music in Aotearoa and beyond.',
    accent: 'var(--pohutukawa)',
  },
  {
    cat: 'Contemporary Pacific Art',
    name: 'Yuki Kihara',
    kupu: '',
    desc: "For continued international leadership in contemporary fa'afafine and Sāmoan visual practice.",
    accent: 'var(--moana)',
  },
  {
    cat: 'Senior Pacific Artist',
    name: 'Daren Kamali',
    kupu: '',
    desc: 'Fijian-Aotearoa poet and storyteller, recognised for sustained contribution to Pacific literature.',
    accent: 'var(--bush)',
  },
  {
    cat: 'Emerging Pacific Artist',
    name: 'Sēini Taumoepeau',
    kupu: '',
    desc: "Tongan-Sāmoan filmmaker whose first feature premiered to international acclaim at the 2025 NZIFF.",
    accent: 'var(--kowhai)',
  },
]

const PAST_AWARDS = [
  { name: 'Te Waka Toi Awards', desc: 'Annual awards honouring excellence in ngā toi Māori across all artforms.', to: '/toi-maori' },
  { name: 'Arts Pasifika Awards', desc: 'Recognising lifetime achievement, emerging talent and community contribution in Toi Pasifika.', to: '/toi-pasifika' },
  { name: 'Creative NZ Arts Leadership Award', desc: 'For outstanding leadership and contribution to the arts sector.', to: '/about' },
  { name: 'Arts Foundation Icons', desc: 'New Zealand\'s highest arts honour, awarded by the Arts Foundation.', to: '/advocacy' },
]

export default function AwardsPage() {
  return (
    <>
      <SubNav items={SUB_ITEMS} />
      <Breadcrumbs
        trail={[
          { label: 'Home', path: '/' },
          { label: 'Funding', path: '/funding' },
          { label: 'Awards' },
        ]}
      />

      <div className="page-head" style={{ position: 'relative', overflow: 'hidden' }}>
        <KoruCorner position="tr" size={300} color="var(--pohutukawa)" opacity={0.1} />
        <div className="container">
          <motion.span
            className="eyebrow"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          >
            Ngā tohu · 2026
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.08 }}
          >
            Arts Pasifika Awards 2026
          </motion.h1>
          <motion.p
            className="lede"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1], delay: 0.14 }}
          >
            Honouring twelve recipients across lifetime achievement, emerging talent and contribution to community.
          </motion.p>
        </div>
      </div>

      {/* Winners */}
      <section className="section">
        <div className="container">
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {WINNERS.map((w, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-32px' }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '200px 1fr 160px',
                  gap: 32,
                  padding: '48px 0',
                  borderTop: '1px solid var(--line)',
                  alignItems: 'start',
                }}
              >
                <div className="eyebrow" style={{ borderBottom: 'none', paddingTop: 8 }}>{w.cat}</div>
                <div>
                  <h2 style={{ fontSize: 'clamp(28px, 4vw, 44px)', marginBottom: 8 }}>{w.name}</h2>
                  {w.kupu && <p className="kupu" style={{ fontSize: 16, marginBottom: 16 }}>{w.kupu}</p>}
                  <p style={{ fontSize: 17, lineHeight: 1.65, color: 'var(--ink-2)', maxWidth: 620, margin: 0 }}>
                    {w.desc}
                  </p>
                </div>
                <div style={{
                  textAlign: 'right',
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(40px, 6vw, 64px)',
                  fontStyle: 'italic',
                  color: w.accent,
                  lineHeight: 1,
                }}>
                  {String(i + 1).padStart(2, '0')}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Other awards */}
      <section className="section" style={{ background: 'var(--surface)', borderTop: '1px solid var(--line)' }}>
        <div className="container">
          <ScrollReveal>
            <span className="eyebrow">Ngā tohu kē</span>
            <h2 style={{ marginTop: 16, marginBottom: 36 }}>Other awards & recognition</h2>
          </ScrollReveal>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
            {PAST_AWARDS.map((a, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: i * 0.07 }}
              >
                <Link to={a.to} style={{ display: 'block', padding: 28, background: 'var(--bg)', borderRadius: 'var(--r)', border: '1px solid var(--line)', textDecoration: 'none', height: '100%' }}>
                  <h4 style={{ marginBottom: 10 }}>{a.name}</h4>
                  <p style={{ color: 'var(--muted)', margin: '0 0 16px', fontSize: 14, lineHeight: 1.6 }}>{a.desc}</p>
                  <span className="btn-link" style={{ fontSize: 14 }}>Learn more →</span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
