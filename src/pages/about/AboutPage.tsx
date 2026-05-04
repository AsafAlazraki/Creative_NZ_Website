import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { IMAGES } from '@/data'
import { KoruCorner, ScrollReveal, MagneticHover } from '@/components/motif/KoruMotifs'
import { PacificStrategyConstellation } from '@/components/effects/PacificStrategy'
import Breadcrumbs from '@/components/ui/Breadcrumbs'
import SubNav from '@/components/ui/SubNav'

const SUBNAV = [
  { label: 'What we do', path: '/about' },
  { label: 'Vision & values', path: '/about/vision' },
  { label: 'Council', path: '/about/council' },
  { label: 'Team', path: '/about/team' },
  { label: 'Documents', path: '/about/documents' },
  { label: 'Careers', path: '/about/careers' },
  { label: 'Contact', path: '/about/contact' },
]

const STEPS = [
  {
    num: '01',
    title: 'Invest in artists & organisations',
    kupu: 'Haumi',
    body: 'We fund individual artists, ringatoi, arts groups and organisations across all artforms — from early-career grants to multi-year investment programmes. Each year we commit tens of millions of dollars to hundreds of projects, practices and organisations throughout Aotearoa.',
  },
  {
    num: '02',
    title: 'Advocate for the arts',
    kupu: 'Tautoko',
    body: 'We make the case for the arts to government, businesses, communities and the public. Grounded in evidence — including our triennial New Zealanders & the Arts study — we argue that the arts are essential to who we are as a nation, not optional extras.',
  },
  {
    num: '03',
    title: 'Develop the sector',
    kupu: 'Whakatipu',
    body: 'We build the capability of artists and arts organisations to sustain themselves over time. This means toolkits, professional development programmes, governance support, data and research, and connecting people with knowledge and opportunity across the sector.',
  },
  {
    num: '04',
    title: 'Honour te Tiriti',
    kupu: 'Tiriti',
    body: 'As a Crown entity, Creative New Zealand has obligations under te Tiriti o Waitangi. We fulfill these through dedicated Māori arts investment via Te Kāhui Toi Māori, through our Māori arts strategy Te Hā o ngā Toi, and by embedding te reo Māori and mātauranga Māori into how we work.',
  },
]

export default function AboutPage() {
  return (
    <>
      <Breadcrumbs trail={[{ label: 'Home', path: '/' }, { label: 'About us' }]} />

      <section className="page-head" style={{ position: 'relative', overflow: 'hidden' }}>
        <KoruCorner position="tr" size={380} color="var(--kowhai)" opacity={0.07} />
        <KoruCorner position="bl" size={240} color="var(--moana)" opacity={0.05} />
        <div className="container">
          <motion.span
            className="eyebrow"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            Toi Aotearoa · About us
          </motion.span>
          <motion.h1
            style={{ marginTop: 18, marginBottom: 20, maxWidth: 820 }}
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.06 }}
          >
            Toi Aotearoa is the arts council for New Zealand.
          </motion.h1>
          <motion.p
            className="lede"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.12 }}
          >
            We invest in, advocate for and develop the arts — so that artists can build their practices, communities can participate, and the arts remain central to the life of Aotearoa New Zealand.
          </motion.p>
          <motion.div
            style={{ display: 'flex', gap: 12, marginTop: 32, flexWrap: 'wrap' }}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          >
            <MagneticHover strength={0.2}>
              <Link to="/funding" className="btn btn-primary">Find funding →</Link>
            </MagneticHover>
            <MagneticHover strength={0.2}>
              <Link to="/about/council" className="btn btn-ghost">Meet the council</Link>
            </MagneticHover>
          </motion.div>
        </div>
      </section>

      <SubNav items={SUBNAV} />

      {/* What we do — numbered steps */}
      <section className="section">
        <div className="container">
          <ScrollReveal>
            <div className="section-head">
              <div>
                <span className="eyebrow">He aha tā mātou mahi</span>
                <h2 style={{ marginTop: 16, maxWidth: 560 }}>Four ways we support the arts in Aotearoa.</h2>
              </div>
            </div>
          </ScrollReveal>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {STEPS.map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: i * 0.08 }}
              >
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '80px 1fr',
                  gap: 40,
                  padding: '40px 0',
                  borderBottom: '1px solid var(--line)',
                  alignItems: 'start',
                }}>
                  <div style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(40px, 5vw, 64px)',
                    fontWeight: 300,
                    lineHeight: 1,
                    color: 'var(--line-2)',
                    letterSpacing: '-0.04em',
                    paddingTop: 6,
                  }}>
                    {step.num}
                  </div>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, marginBottom: 14, flexWrap: 'wrap' }}>
                      <h3 style={{ fontSize: 'clamp(20px, 2vw, 28px)' }}>{step.title}</h3>
                      <span className="kupu">{step.kupu}</span>
                    </div>
                    <p style={{ fontSize: 16, lineHeight: 1.72, color: 'var(--ink-2)', maxWidth: 680 }}>{step.body}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Quote band */}
      <ScrollReveal>
        <section style={{
          background: 'var(--ink)',
          color: 'var(--bg)',
          padding: 'calc(80px * var(--density)) 0',
          position: 'relative',
          overflow: 'hidden',
        }}>
          <KoruCorner position="tr" size={320} color="#fff" opacity={0.03} />
          <div className="container">
            <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>
              <div style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 'clamp(22px, 3vw, 36px)', lineHeight: 1.45, marginBottom: 24 }}>
                "Mā te toi e ora ai te wairua, mā te wairua e ora ai te tangata."
              </div>
              <div style={{ fontSize: 15, color: 'rgba(255,255,255,0.6)', marginBottom: 8 }}>
                The arts give life to the spirit; the spirit gives life to the people.
              </div>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                Whakataukī · Creative New Zealand
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* Snapshot / image + text */}
      <section className="section">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 72, alignItems: 'center' }}>
            <ScrollReveal direction="left">
              <div style={{ aspectRatio: '4/5', borderRadius: 'var(--r-md)', overflow: 'hidden', background: 'var(--paper-2)' }}>
                <img src={IMAGES.performance} alt="Performers on stage" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
            </ScrollReveal>
            <ScrollReveal direction="right" delay={0.1}>
              <span className="eyebrow">Who we are</span>
              <h2 style={{ marginTop: 18, marginBottom: 24 }}>A Crown entity, independent in our decisions.</h2>
              <p style={{ fontSize: 16, lineHeight: 1.72, color: 'var(--ink-2)', marginBottom: 20 }}>
                Creative New Zealand — Toi Aotearoa — is the national arts development agency of New Zealand. We receive funding from the Government and the New Zealand Lottery Grants Board, and we operate at arm's length from Government — meaning our funding decisions are made independently, free from political influence.
              </p>
              <p style={{ fontSize: 16, lineHeight: 1.72, color: 'var(--ink-2)', marginBottom: 32 }}>
                We are governed by an Arts Council of nine members appointed by the Minister for Arts, Culture and Heritage. Te Kāhui Toi Māori (our Māori arts board) and Te Kāhui Toi Pasifika (our Pacific arts board) provide dedicated expert oversight of our work with Māori and Pacific communities.
              </p>
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <Link to="/about/council" className="btn btn-ghost">Meet the council →</Link>
                <Link to="/about/documents" className="btn-link">Annual report →</Link>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Strategy as a constellation — interactive star-map of how the
          organisation's strategy fits together. Lives on /about because
          it's the structural framework, not Pasifika-specific. */}
      <PacificStrategyConstellation />
    </>
  )
}
