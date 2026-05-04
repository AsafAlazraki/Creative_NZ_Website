import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { IMAGES, OPPORTUNITIES } from '@/data'
import { KoruCorner, ScrollReveal, MagneticHover } from '@/components/motif/KoruMotifs'
import { NoiseGrain } from '@/components/effects/NoiseGrain'
import { DriftingKoru } from '@/components/effects/DriftingKoru'
import { OceanWaves } from '@/components/effects/OceanWaves'
import { SiapoPattern } from '@/components/effects/SiapoPattern'
import Breadcrumbs from '@/components/ui/Breadcrumbs'

const MAORI_OPPS = OPPORTUNITIES.filter(o => o.tier === 'maori' || o.id === 'banff')

const PILLARS = [
  {
    reo: 'Mātauranga',
    en: 'Knowledge',
    body: 'Supporting the preservation and transmission of mātauranga toi — the knowledge systems, practices and protocols that underpin ngā toi Māori — to current and future generations.',
  },
  {
    reo: 'Auahatanga',
    en: 'Innovation',
    body: 'Investing in ngā toi Māori artists who are pushing their practices forward — working within and across artform boundaries, engaging with new technologies, and reaching new audiences.',
  },
  {
    reo: 'Hapori',
    en: 'Community',
    body: 'Strengthening the connections between toi Māori and the hapū, iwi and communities that these arts traditions belong to and draw from.',
  },
  {
    reo: 'Aotūroa',
    en: 'International',
    body: 'Supporting ngā toi Māori to be seen, heard and respected on the world stage — as a living, dynamic artistic tradition that is distinct from and equal to any in the world.',
  },
]

export default function ToiMaoriPage() {
  return (
    <div className="toi-maori-page">
      <Breadcrumbs trail={[{ label: 'Home', path: '/' }, { label: 'Ngā Toi Māori' }]} />

      {/* Page head — deep pōuri (dark earth) with restrained kowhai glow,
          big drifting koru watermarks, no overpowering shader blob */}
      <section className="hero hero--maori" style={{ minHeight: 540 }}>
        <DriftingKoru parallax={true} color="var(--kowhai)" />
        <NoiseGrain opacity={0.10} blendMode="overlay" />
        <KoruCorner position="tr" size={420} color="var(--kowhai)" opacity={0.08} />

        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div className="hero-grid">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}
              >
                <span style={{
                  display: 'inline-block',
                  background: 'var(--kowhai)',
                  color: 'var(--accent-ink)',
                  fontSize: 10.5,
                  letterSpacing: '0.16em',
                  textTransform: 'uppercase',
                  fontWeight: 700,
                  padding: '6px 14px',
                  borderRadius: 'var(--r-pill)',
                }}>
                  Ngā Toi Māori
                </span>
                <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)', letterSpacing: '0.1em' }}>
                  Toi Aotearoa
                </span>
              </motion.div>
              <motion.h1
                style={{ marginBottom: 24, color: '#fff', maxWidth: 720 }}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.04 }}
              >
                Te Hā o ngā Toi —{' '}
                <span style={{ color: 'var(--kowhai)', fontStyle: 'italic' }}>the breath of the arts.</span>
              </motion.h1>
              <motion.p
                className="lede"
                style={{ color: 'rgba(255,255,255,0.78)', maxWidth: 580, marginBottom: 32 }}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                Ngā toi Māori are the arts traditions of tangata whenua. Creative New Zealand has a dedicated Māori arts board, dedicated funding, and a long-term strategy for nurturing ngā toi Māori as living, evolving expressions of Māori identity and knowledge.
              </motion.p>
              <motion.div
                style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.16 }}
              >
                <MagneticHover strength={0.2}>
                  <Link to="/funding/opportunities" className="btn btn-accent">Find funding →</Link>
                </MagneticHover>
                <Link to="/resources" className="btn-link" style={{ color: 'rgba(255,255,255,0.85)', borderBottomColor: 'var(--kowhai)' }}>
                  Te Hā o ngā Toi strategy →
                </Link>
              </motion.div>
            </div>

            {/* Right column — Māori arts hero image */}
            <motion.div
              className="hero-img"
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
              style={{ aspectRatio: '4/5' }}
            >
              <img src={IMAGES.carving} alt="Ngā toi Māori — wood carving" loading="eager" />
              <span className="credit">Whakairo · Toi Māori</span>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Main content — Te Hā narrative + image */}
      <section className="section">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }}>
            <ScrollReveal direction="left">
              <div style={{ aspectRatio: '4/5', borderRadius: 'var(--r-md)', overflow: 'hidden', background: 'var(--paper-2)' }}>
                <img
                  src={IMAGES.carving}
                  alt="Ngā toi Māori — carving and cultural arts"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
            </ScrollReveal>
            <ScrollReveal direction="right" delay={0.1}>
              <span className="eyebrow" style={{ marginBottom: 20, display: 'block' }}>Te Hā o ngā Toi</span>
              <h2 style={{ marginBottom: 24 }}>Our long-term strategy for Māori arts</h2>
              <p style={{ fontSize: 16, lineHeight: 1.75, color: 'var(--ink-2)', marginBottom: 20 }}>
                Te Hā o ngā Toi — named for the breath that gives life — is Creative New Zealand's long-term strategy for ngā toi Māori. It sets our direction for how we invest in, advocate for and support the development of Māori arts across Aotearoa over the coming decade.
              </p>
              <p style={{ fontSize: 16, lineHeight: 1.75, color: 'var(--ink-2)', marginBottom: 20 }}>
                The strategy was developed in close consultation with ngā toi Māori artists, knowledge-holders, iwi and hapū. It recognises that ngā toi Māori are not one thing — they encompass hundreds of distinct traditions, artforms and practices, from whakairo and kapa haka to contemporary painting, literature, music and film.
              </p>
              <p style={{ fontSize: 16, lineHeight: 1.75, color: 'var(--ink-2)', marginBottom: 32 }}>
                Guided by Te Kāhui Toi Māori — our Māori arts board — we invest directly in ngā toi Māori artists and organisations, support the transmission of traditional knowledge, and advocate for Māori arts to be seen and respected at home and internationally.
              </p>
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <MagneticHover strength={0.2}>
                  <Link to="/resources" className="btn btn-primary">Read the strategy →</Link>
                </MagneticHover>
                <MagneticHover strength={0.2}>
                  <Link to="/about/council" className="btn btn-ghost">Te Kāhui Toi Māori</Link>
                </MagneticHover>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Four pillars */}
      <section className="section" style={{ background: 'var(--paper)', borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)' }}>
        <div className="container">
          <ScrollReveal>
            <div className="section-head">
              <div>
                <span className="eyebrow">Ngā tūāpeka · The pillars</span>
                <h2 style={{ marginTop: 16 }}>Four priorities guide our work with ngā toi Māori</h2>
              </div>
            </div>
          </ScrollReveal>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24 }}>
            {PILLARS.map((pillar, i) => (
              <motion.div
                key={pillar.reo}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1], delay: i * 0.09 }}
                style={{
                  padding: 28,
                  background: 'var(--card)',
                  border: '1px solid var(--line)',
                  borderRadius: 'var(--r-md)',
                  borderTop: '3px solid var(--kowhai)',
                }}
              >
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 500, marginBottom: 4 }}>{pillar.reo}</div>
                <div style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 16, letterSpacing: '0.06em', textTransform: 'uppercase', fontWeight: 500 }}>{pillar.en}</div>
                <p style={{ fontSize: 14, lineHeight: 1.7, color: 'var(--ink-2)', margin: 0 }}>{pillar.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Funding opportunities */}
      {MAORI_OPPS.length > 0 && (
        <section className="section">
          <div className="container">
            <ScrollReveal>
              <div className="section-head">
                <div>
                  <span className="eyebrow">Pūtea tautoko</span>
                  <h2 style={{ marginTop: 16 }}>Funding for ngā toi Māori artists</h2>
                </div>
                <Link to="/funding/opportunities" className="btn-link">All opportunities →</Link>
              </div>
            </ScrollReveal>
            <div className="opp-list" style={{ borderTop: '1px solid var(--line)' }}>
              {MAORI_OPPS.map((opp, i) => (
                <motion.div
                  key={opp.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: i * 0.07 }}
                >
                  <Link to={`/funding/opportunity/${opp.id}`} className="opp-row">
                    <div className="code">{opp.code}</div>
                    <div className="title-cell">
                      <h4><span className="title-text">{opp.title}</span><span className={`status-badge ${opp.status}`}>{opp.status}</span></h4>
                      {opp.kupu && <span className="kupu">{opp.kupu}</span>}
                    </div>
                    <div className="desc">{opp.desc}</div>
                    <div className="amt">{opp.amount}</div>
                    <div className="when"><span className="lbl">Next</span>{opp.next}</div>
                    <div className="arrow">→</div>
                  </Link>
                </motion.div>
              ))}
            </div>
            <ScrollReveal delay={0.2}>
              <div style={{ marginTop: 24, textAlign: 'center' }}>
                <Link to="/funding/opportunities" className="btn btn-primary">View all funding opportunities →</Link>
              </div>
            </ScrollReveal>
          </div>
        </section>
      )}

      {/* Whakataukī / closing CTA */}
      <ScrollReveal>
        <section style={{
          background: 'var(--ink)',
          color: 'var(--bg)',
          padding: 'calc(72px * var(--density)) 0',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}>
          <KoruCorner position="tr" size={280} color="var(--kowhai)" opacity={0.06} />
          <KoruCorner position="bl" size={240} color="var(--kowhai)" opacity={0.04} />
          <div className="container">
            <div style={{ maxWidth: 680, margin: '0 auto' }}>
              <div style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 'clamp(20px, 2.5vw, 30px)', lineHeight: 1.5, marginBottom: 16, color: 'var(--kowhai)' }}>
                "Ko te toi whakairo, ka haea te pō."
              </div>
              <div style={{ fontSize: 15, color: 'rgba(255,255,255,0.6)', marginBottom: 36 }}>
                Through the art of carving, the darkness is pierced.
              </div>
              <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
                <Link to="/funding/opportunities" className="btn btn-accent">Apply for funding →</Link>
                <Link to="/news" className="btn btn-ghost" style={{ borderColor: 'rgba(255,255,255,0.28)', color: 'var(--bg)' }}>
                  Māori arts news
                </Link>
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>
    </div>
  )
}
