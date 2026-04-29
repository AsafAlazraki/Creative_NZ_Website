import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
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

const TOPICS = [
  {
    t: 'Eligibility',
    d: 'Are you eligible? Read the criteria carefully. Most funds are for individuals or organisations based in Aotearoa, but each fund has its own specifics.',
    links: [
      { label: 'Browse all opportunities', to: '/funding/opportunities' },
      { label: 'Early career criteria', to: '/funding/early-career' },
      { label: 'Organisation criteria', to: '/funding/organisations' },
    ],
  },
  {
    t: 'Evidence of work',
    d: 'We need to see what you make. Provide links to recordings, photos, scripts, exhibition documentation — whatever shows your practice.',
    links: [
      { label: 'See recently funded projects', to: '/funding/results' },
      { label: 'Speak with an adviser', to: '/funding/adviser' },
    ],
  },
  {
    t: 'Budgets',
    d: 'Be realistic. Include artist fees, production costs, materials, marketing, contingency. Underbudgeting is one of the most common reasons for declined applications.',
    links: [
      { label: 'Sustainable careers resources', to: '/resources' },
      { label: 'Donations Toolkit', to: '/resources' },
      { label: 'Book a budget kōrero', to: '/funding/adviser' },
    ],
  },
  {
    t: 'Letters of support',
    d: 'Letters from collaborators, presenters, mentors, or community partners help us understand the wider context of your work.',
    links: [
      { label: 'Volunteer Management Toolkit', to: '/resources' },
      { label: 'Get advice from an adviser', to: '/funding/adviser' },
    ],
  },
  {
    t: 'Te Tiriti & cultural protocols',
    d: "If your project engages with Māori or Pacific communities, knowledge or imagery, tell us how you're working with the right people in the right way.",
    links: [
      { label: 'Ngā Toi Māori', to: '/toi-maori' },
      { label: 'Toi Pasifika', to: '/toi-pasifika' },
      { label: 'Speak with a kaitohutohu', to: '/funding/adviser' },
    ],
  },
  {
    t: 'Accessibility',
    d: "Tell us how you're thinking about access for d/Deaf, disabled, neurodivergent or otherwise underserved audiences.",
    links: [
      { label: 'Research & reports', to: '/resources' },
      { label: 'Discuss your access plan', to: '/funding/adviser' },
    ],
  },
]

export default function FundingAdvice() {
  return (
    <>
      <SubNav items={SUB_ITEMS} />
      <Breadcrumbs
        trail={[
          { label: 'Home', path: '/' },
          { label: 'Funding', path: '/funding' },
          { label: 'Advice' },
        ]}
      />

      <div className="page-head" style={{ position: 'relative', overflow: 'hidden' }}>
        <KoruCorner position="tr" size={280} color="var(--kowhai)" opacity={0.07} />
        <div className="container">
          <motion.span
            className="eyebrow"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          >
            Tohutohu
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.08 }}
          >
            Advice & support
          </motion.h1>
          <motion.p
            className="lede"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1], delay: 0.14 }}
          >
            Things worth knowing before you put pen to application — with somewhere to go for each one.
          </motion.p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 24 }}>
            {TOPICS.map(({ t, d, links }, i) => (
              <motion.div
                key={t}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-32px' }}
                transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1], delay: i * 0.06 }}
                style={{
                  padding: 32,
                  background: 'var(--surface)',
                  borderRadius: 'var(--r)',
                  border: '1px solid var(--line)',
                  display: 'flex', flexDirection: 'column',
                }}
              >
                <h3 style={{ fontSize: 22, marginBottom: 12 }}>{t}</h3>
                <p style={{ color: 'var(--muted)', margin: 0, lineHeight: 1.65, marginBottom: 20, flexGrow: 1 }}>{d}</p>
                <div style={{ paddingTop: 20, borderTop: '1px solid var(--line)', display: 'flex', flexDirection: 'column', gap: 10 }}>
                  <div style={{ fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--muted)', fontWeight: 600, marginBottom: 4 }}>
                    Where to next
                  </div>
                  {links.map((l, j) => (
                    <Link key={j} to={l.to} className="btn-link" style={{ alignSelf: 'flex-start' }}>
                      {l.label} →
                    </Link>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Book a kōrero CTA */}
      <section
        className="section-tight"
        style={{ background: 'var(--ink)', color: 'var(--bg)', position: 'relative', overflow: 'hidden' }}
      >
        <KoruCorner position="tr" size={280} color="#fff" opacity={0.04} />
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 48, alignItems: 'center' }}>
            <ScrollReveal>
              <span className="eyebrow" style={{ color: 'var(--kowhai)' }}>Kanohi ki te kanohi</span>
              <h2 style={{ marginTop: 14, marginBottom: 14, color: 'var(--bg)' }}>
                Still have questions? Book an in-person kōrero.
              </h2>
              <p style={{ margin: 0, opacity: 0.75, fontSize: 17, lineHeight: 1.65, maxWidth: 560 }}>
                Our funding advisers offer free 30-minute conversations — kanohi ki te kanohi at one of our offices, online, or by phone. They can talk through your project, your budget, your eligibility, and what would strengthen your application.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.12}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <MagneticHover strength={0.2}>
                  <Link to="/funding/adviser" className="btn btn-accent" style={{ justifyContent: 'center', display: 'flex' }}>
                    Book a kōrero with an adviser →
                  </Link>
                </MagneticHover>
                <Link
                  to="/about/contact"
                  className="btn btn-ghost"
                  style={{ justifyContent: 'center', display: 'flex', borderColor: 'rgba(255,255,255,0.28)', color: 'var(--bg)' }}
                >
                  Other ways to get in touch →
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </>
  )
}
