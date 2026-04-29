import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { IMAGES } from '@/data'
import { KoruCorner, ScrollReveal, MagneticHover } from '@/components/motif/KoruMotifs'
import Breadcrumbs from '@/components/ui/Breadcrumbs'
import SubNav from '@/components/ui/SubNav'

const SUBNAV = [
  { label: 'Why the arts matter', path: '/advocacy' },
  { label: 'Our positions', path: '/advocacy/positions' },
  { label: 'Research & evidence', path: '/advocacy/research' },
  { label: 'Tools & toolkits', path: '/resources' },
]

interface StatCardProps {
  value: string
  label: string
  kupu?: string
  delay?: number
}

function StatCard({ value, label, kupu, delay = 0 }: StatCardProps) {
  return (
    <motion.div
      className="stat"
      style={{
        padding: 0,
      }}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1], delay }}
    >
      {kupu && <div className="kupu">{kupu}</div>}
      <div className="num" style={{ fontSize: 'clamp(52px, 6vw, 80px)' }}>{value}</div>
      <div className="lbl">{label}</div>
    </motion.div>
  )
}

const ADVOCACY_AREAS = [
  {
    icon: '🎭',
    title: 'Arts funding policy',
    body: 'We advocate for sustained, evidence-based public investment in the arts — at central and local government level. The arts generate economic returns, support wellbeing and build social cohesion.',
  },
  {
    icon: '🌏',
    title: 'International presence',
    body: 'New Zealand artists bring our stories and our voice to the world. We advocate for government support for international touring, residencies and export of New Zealand creative work.',
  },
  {
    icon: '🏫',
    title: 'Arts in education',
    body: 'Quality arts education builds creative, resilient, empathetic citizens. We advocate for arts subjects to receive equitable time and resource in the curriculum from early childhood through to tertiary education.',
  },
  {
    icon: '🏘️',
    title: 'Community access',
    body: 'The arts should be available to everyone — regardless of location, income or background. We advocate for investment in community arts and for reduced barriers to participation.',
  },
]

export default function AdvocacyPage() {
  return (
    <>
      <Breadcrumbs trail={[{ label: 'Home', path: '/' }, { label: 'Advocacy' }]} />

      <section className="page-head" style={{ position: 'relative', overflow: 'hidden' }}>
        <KoruCorner position="tr" size={380} color="var(--pohutukawa)" opacity={0.07} />
        <KoruCorner position="bl" size={280} color="var(--kowhai)" opacity={0.05} />
        <div className="container">
          <motion.span
            className="eyebrow"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Tautoko · Advocacy
          </motion.span>
          <motion.h1
            style={{ marginTop: 18, marginBottom: 22, maxWidth: 760 }}
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.06 }}
          >
            Advocating for the arts.
          </motion.h1>
          <motion.p
            className="lede"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.12 }}
          >
            The arts are central to who we are as New Zealanders. Creative New Zealand makes the case — grounded in evidence — that investment in the arts delivers real returns for our communities, our economy, and our national identity.
          </motion.p>
          <motion.div
            style={{ display: 'flex', gap: 12, marginTop: 32, flexWrap: 'wrap' }}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.2 }}
          >
            <MagneticHover strength={0.2}>
              <Link to="/advocacy/research" className="btn btn-primary">See the research →</Link>
            </MagneticHover>
            <MagneticHover strength={0.2}>
              <Link to="/resources" className="btn btn-ghost">Tools & toolkits</Link>
            </MagneticHover>
          </motion.div>
        </div>
      </section>

      <SubNav items={SUBNAV} />

      {/* Hero content section */}
      <section className="section">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }}>
            <ScrollReveal direction="left">
              <span className="eyebrow" style={{ marginBottom: 18, display: 'block' }}>He aha te take</span>
              <h2 style={{ marginBottom: 24 }}>Why the arts matter — in numbers and in stories.</h2>
              <p style={{ fontSize: 16, lineHeight: 1.72, color: 'var(--ink-2)', marginBottom: 20 }}>
                Creative New Zealand regularly commissions and publishes research that demonstrates the value of the arts to Aotearoa New Zealand. Our flagship study, New Zealanders & the Arts, is conducted every three years and tracks participation, attitudes and economic contribution.
              </p>
              <p style={{ fontSize: 16, lineHeight: 1.72, color: 'var(--ink-2)', marginBottom: 28 }}>
                The 2026 study confirms what we've long known: New Zealanders love the arts, participate widely, and believe the arts are important to our identity as a nation. That belief — and the evidence behind it — is the foundation of everything we advocate for.
              </p>
              <Link to="/resources" className="btn btn-accent">Explore tools & toolkits →</Link>
            </ScrollReveal>
            <ScrollReveal direction="right" delay={0.1}>
              <div style={{
                aspectRatio: '4/3',
                borderRadius: 'var(--r-md)',
                overflow: 'hidden',
                background: 'var(--paper-2)',
              }}>
                <img
                  src={IMAGES.gallery}
                  alt="New Zealanders engaging with the arts"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Stats band */}
      <section className="stats-band" style={{ position: 'relative' }}>
        <KoruCorner position="bl" size={400} color="#fff" opacity={0.03} />
        <KoruCorner position="tr" size={320} color="#fff" opacity={0.025} />
        <div className="stats-band-inner">
          <ScrollReveal>
            <span className="eyebrow" style={{ color: 'var(--kowhai)' }}>Ko Aotearoa me ōna Toi · 2026</span>
            <h2 style={{ marginTop: 24 }}>The arts are an economic force — and a social one.</h2>
          </ScrollReveal>
          <div className="stats-grid">
            <StatCard
              value="$4.1B"
              label="Contributed to GDP by the arts and cultural sector annually"
              kupu="ohaoha"
              delay={0}
            />
            <StatCard
              value="48,000"
              label="People employed in the arts and cultural sector across Aotearoa"
              kupu="mahi"
              delay={0.1}
            />
            <StatCard
              value="88%"
              label="Of New Zealanders say arts contribute positively to our national identity"
              kupu="tuakiri"
              delay={0.2}
            />
            <StatCard
              value="73%"
              label="Of adults attended at least one arts event or activity in the past 12 months"
              kupu="haerenga"
              delay={0.3}
            />
          </div>
          <ScrollReveal delay={0.4}>
            <div style={{ marginTop: 56, paddingTop: 40, borderTop: '1px solid rgba(255,255,255,0.1)' }}>
              <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)', marginBottom: 16 }}>
                Source: New Zealanders and the Arts 2026, Creative New Zealand. GDP and employment figures sourced from Statistics New Zealand Cultural and Creative Industries Satellite Account 2025.
              </p>
              <Link to="/resources" className="btn btn-ghost" style={{ borderColor: 'rgba(255,255,255,0.3)', color: 'var(--bg)' }}>
                Read the full report →
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Advocacy areas */}
      <section className="section">
        <div className="container">
          <ScrollReveal>
            <div className="section-head">
              <div>
                <span className="eyebrow">Ā mātou tūāpeka</span>
                <h2 style={{ marginTop: 16 }}>Our advocacy priorities</h2>
              </div>
            </div>
          </ScrollReveal>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 28 }}>
            {ADVOCACY_AREAS.map((area, i) => (
              <motion.div
                key={area.title}
                className="card card-body"
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1], delay: i * 0.09 }}
              >
                <div style={{ fontSize: 28, marginBottom: 16 }}>{area.icon}</div>
                <h3 style={{ fontSize: 22, marginBottom: 12 }}>{area.title}</h3>
                <p style={{ fontSize: 15, lineHeight: 1.7, color: 'var(--ink-2)' }}>{area.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA band */}
      <ScrollReveal>
        <section style={{
          background: 'var(--paper)',
          borderTop: '1px solid var(--line)',
          borderBottom: '1px solid var(--line)',
          padding: 'calc(72px * var(--density)) 0',
        }}>
          <div className="container">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }}>
              <div>
                <span className="eyebrow" style={{ marginBottom: 18, display: 'block' }}>Make the case</span>
                <h2 style={{ marginBottom: 20 }}>Use our tools to advocate in your community.</h2>
                <p style={{ fontSize: 16, lineHeight: 1.7, color: 'var(--ink-2)', marginBottom: 28 }}>
                  Our advocacy toolkit gives arts organisations, local councils and community groups the evidence and messaging they need to make the case for arts investment in their region.
                </p>
                <MagneticHover strength={0.2}>
                  <Link to="/resources" className="btn btn-primary">Explore tools & toolkits →</Link>
                </MagneticHover>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {[
                  { title: 'Advocacy Toolkit', desc: 'Evidence, messaging and templates for making the case locally.' },
                  { title: 'New Zealanders & the Arts 2026', desc: 'Our flagship triennial study on participation and attitudes.' },
                  { title: 'Economic Value of the Arts', desc: 'Figures on GDP contribution, employment and export earnings.' },
                ].map((res, i) => (
                  <motion.div
                    key={res.title}
                    initial={{ opacity: 0, x: 24 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.09 }}
                    style={{
                      display: 'flex',
                      gap: 16,
                      padding: '18px 20px',
                      background: 'var(--card)',
                      border: '1px solid var(--line)',
                      borderRadius: 'var(--r-md)',
                      alignItems: 'center',
                    }}
                  >
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 500, marginBottom: 3 }}>{res.title}</div>
                      <div style={{ fontSize: 13, color: 'var(--muted)' }}>{res.desc}</div>
                    </div>
                    <Link to="/resources" className="btn-link" style={{ flexShrink: 0 }}>Download →</Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>
    </>
  )
}
