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

const ADVISERS = [
  {
    name: 'Hinemoa Tareha',
    region: 'Te Whanganui-a-Tara · Wellington',
    specialty: 'Ngā Toi Māori, theatre, dance',
    avail: 'Mon, Wed',
    bg: 'var(--bush)',
  },
  {
    name: 'Tomasi Ulufale',
    region: 'Tāmaki Makaurau · Auckland',
    specialty: 'Toi Pasifika, music, multi-disciplinary',
    avail: 'Tue, Thu',
    bg: 'var(--moana)',
  },
  {
    name: 'Sarah Mitchell',
    region: 'Ōtautahi · Christchurch',
    specialty: 'Visual arts, craft, literature',
    avail: 'Mon, Fri',
    bg: 'var(--pohutukawa)',
  },
  {
    name: 'Aroha Patterson',
    region: 'Remote / all regions',
    specialty: 'Early career, regional artists',
    avail: 'All week',
    bg: 'var(--kowhai)',
  },
]

const HOW_STEPS = [
  { n: '01', t: 'Choose an adviser', d: 'Select the adviser whose region and specialty best matches your needs, or choose Remote for a phone or video call.' },
  { n: '02', t: 'Book a time', d: 'Select a 30-minute slot from the adviser\'s calendar. Free, confidential, and available in te reo Māori.' },
  { n: '03', t: 'Prepare a few thoughts', d: 'No formal preparation needed — just have a sense of what fund you\'re interested in and a rough outline of your project.' },
  { n: '04', t: 'Kōrero', d: 'Your adviser can help you assess eligibility, strengthen your application, clarify the criteria, and answer any questions.' },
]

export default function AdviserPage() {
  return (
    <>
      <SubNav items={SUB_ITEMS} />
      <Breadcrumbs
        trail={[
          { label: 'Home', path: '/' },
          { label: 'Funding', path: '/funding' },
          { label: 'Speak with an adviser' },
        ]}
      />

      <div className="page-head" style={{ position: 'relative', overflow: 'hidden' }}>
        <KoruCorner position="tr" size={280} color="var(--kowhai)" opacity={0.08} />
        <div className="container" style={{ maxWidth: 880 }}>
          <motion.span
            className="eyebrow"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          >
            Free, 30-minute kōrero
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.08 }}
          >
            Speak with an adviser
          </motion.h1>
          <motion.p
            className="lede"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1], delay: 0.14 }}
          >
            Our funding advisers can help you understand if a fund is right for you, talk through your project, and answer questions about applying.
          </motion.p>
        </div>
      </div>

      {/* Advisers grid */}
      <section className="section">
        <div className="container">
          <ScrollReveal>
            <span className="eyebrow">Our kaiāwhina</span>
            <h2 style={{ marginTop: 16, marginBottom: 36 }}>Meet the team</h2>
          </ScrollReveal>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
            {ADVISERS.map((a, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-24px' }}
                transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1], delay: i * 0.08 }}
              >
                <motion.div
                  whileHover={{ y: -4, transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] } }}
                  className="card"
                  style={{ height: '100%' }}
                >
                  <div style={{
                    height: 80, background: a.bg,
                    borderRadius: 'var(--r) var(--r) 0 0',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <span style={{ color: '#fff', fontSize: 28, fontFamily: 'var(--font-display)', fontStyle: 'italic', opacity: 0.9 }}>
                      {a.name.split(' ').map(s => s[0]).join('')}
                    </span>
                  </div>
                  <div className="card-body">
                    <h3 style={{ fontSize: 20, marginBottom: 6 }}>{a.name}</h3>
                    <p style={{ fontSize: 13, color: 'var(--muted)', margin: '0 0 12px' }}>{a.region}</p>
                    <p style={{ fontSize: 14, color: 'var(--ink-2)', margin: '0 0 10px' }}>
                      <strong>Specialty:</strong> {a.specialty}
                    </p>
                    <p style={{ fontSize: 13, color: 'var(--muted)', margin: '0 0 20px' }}>Available {a.avail}</p>
                    <MagneticHover strength={0.15}>
                      <button className="btn btn-ghost">Book a kōrero →</button>
                    </MagneticHover>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="section" style={{ background: 'var(--surface)', borderTop: '1px solid var(--line)' }}>
        <div className="container">
          <ScrollReveal>
            <span className="eyebrow">Te ara</span>
            <h2 style={{ marginTop: 16, marginBottom: 36 }}>How it works</h2>
          </ScrollReveal>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 24 }}>
            {HOW_STEPS.map((s, i) => (
              <motion.div
                key={s.n}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: i * 0.07 }}
                style={{ padding: 28, background: 'var(--bg)', borderRadius: 'var(--r)', border: '1px solid var(--line)' }}
              >
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--accent)', fontWeight: 700, letterSpacing: '0.1em', marginBottom: 14 }}>
                  {s.n}
                </div>
                <h4 style={{ marginBottom: 10 }}>{s.t}</h4>
                <p style={{ color: 'var(--muted)', margin: 0, fontSize: 15, lineHeight: 1.6 }}>{s.d}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Other ways */}
      <section className="section-tight">
        <div className="container">
          <ScrollReveal>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 24 }}>
              <div>
                <span className="eyebrow">Ētahi atu ara</span>
                <h3 style={{ marginTop: 8, fontSize: 20 }}>Other ways to get in touch</h3>
                <p style={{ color: 'var(--muted)', margin: '6px 0 0', fontSize: 15 }}>
                  Phone, email, or visit us in Wellington, Auckland or Christchurch.
                </p>
              </div>
              <Link to="/about/contact" className="btn btn-primary">Contact us →</Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  )
}
