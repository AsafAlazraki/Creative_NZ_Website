import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { IMAGES, OPPORTUNITIES, STORIES } from '@/data'
import { KoruCorner, KoruBand, ScrollReveal, MagneticHover } from '@/components/motif/KoruMotifs'
import { ShaderBackground } from '@/components/effects/ShaderBackground'
import { NoiseGrain } from '@/components/effects/NoiseGrain'
import { OceanWaves } from '@/components/effects/OceanWaves'
import { SiapoPattern, SiapoDivider } from '@/components/effects/SiapoPattern'
import Breadcrumbs from '@/components/ui/Breadcrumbs'

const PASIFIKA_OPPS = OPPORTUNITIES.filter(o => o.tier === 'pasifika')

const PASIFIKA_STORIES = STORIES.filter(s =>
  s.cat.toLowerCase().includes('pacific') || s.id === 'pasifika-awards-2026'
)

const NATIONS = [
  { name: 'Sāmoa', flag: '🇼🇸' },
  { name: 'Tonga', flag: '🇹🇴' },
  { name: 'Fiji', flag: '🇫🇯' },
  { name: 'Cook Islands', flag: '🇨🇰' },
  { name: 'Niue', flag: '🇳🇺' },
  { name: 'Tokelau', flag: '🇹🇰' },
  { name: 'Tuvalu', flag: '🇹🇻' },
  { name: 'Kiribati', flag: '🇰🇮' },
]

const STRATEGY_PILLARS = [
  {
    title: 'Tuku iho — Heritage',
    body: 'Protecting, celebrating and transmitting the rich artistic and cultural heritage of Pacific peoples to future generations, across all Pacific nations represented in Aotearoa.',
  },
  {
    title: 'Auahatanga — Innovation',
    body: 'Supporting Pacific artists to evolve their practice — fusing traditional knowledge with new forms, media and contexts, while maintaining cultural integrity and community connection.',
  },
  {
    title: 'Hāpori — Community',
    body: 'Strengthening the role of Pacific arts in Pacific communities across Aotearoa, including recognition of the diverse Pacific nations, languages and artistic traditions that make up our community.',
  },
  {
    title: 'Tāwāhi — International',
    body: 'Elevating Pacific arts to a global stage, supporting Pacific artists to tour internationally and building the profile of Pacific art forms in Aotearoa and across Te Moana-nui-a-Kiwa.',
  },
]

export default function ToiPasifikaPage() {
  return (
    <>
      <Breadcrumbs trail={[{ label: 'Home', path: '/' }, { label: 'Toi Pasifika' }]} />

      {/* Page head — moana shader, deep Pacific currents */}
      <section style={{
        background: 'var(--moana)',
        color: '#fff',
        padding: 'calc(72px * var(--density)) 0 calc(56px * var(--density))',
        position: 'relative',
        overflow: 'hidden',
        minHeight: 480,
      }}>
        <ShaderBackground palette="pasifika" intensity="hero" speed={0.14} />
        <NoiseGrain opacity={0.10} blendMode="overlay" />
        <SiapoPattern variant="rays" color="#fff" opacity={0.04} size={64} />
        <KoruCorner position="tr" size={420} color="#fff" opacity={0.06} />
        <KoruCorner position="bl" size={300} color="var(--pohutukawa)" opacity={0.12} />
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65 }}
            style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}
          >
            <span style={{
              display: 'inline-block',
              background: 'rgba(255,255,255,0.2)',
              color: '#fff',
              fontSize: 10.5,
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              fontWeight: 700,
              padding: '5px 14px',
              borderRadius: 'var(--r-pill)',
              backdropFilter: 'blur(8px)',
            }}>
              Toi Pasifika
            </span>
            <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', letterSpacing: '0.1em' }}>
              Te Moana-nui-a-Kiwa
            </span>
          </motion.div>
          <motion.h1
            style={{ color: '#fff', marginBottom: 24, maxWidth: 800 }}
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.06 }}
          >
            The living arts of the{' '}
            <span style={{ fontStyle: 'italic', color: 'rgba(255,255,255,0.82)' }}>Pacific.</span>
          </motion.h1>
          <motion.p
            style={{ fontSize: 19, lineHeight: 1.62, color: 'rgba(255,255,255,0.78)', maxWidth: 720, marginBottom: 40 }}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.12 }}
          >
            Pacific arts are woven into the identity of Aotearoa. Creative New Zealand has a dedicated Pacific arts board, dedicated funding streams, and a refreshed strategy for ensuring Pacific artists and communities can flourish.
          </motion.p>
          <motion.div
            style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.2 }}
          >
            <MagneticHover strength={0.2}>
              <Link to="/funding/opportunities" className="btn btn-primary" style={{ background: '#fff', color: 'var(--moana)' }}>
                Find funding →
              </Link>
            </MagneticHover>
            <MagneticHover strength={0.2}>
              <Link to="/resources" className="btn btn-ghost" style={{ borderColor: 'rgba(255,255,255,0.35)', color: '#fff' }}>
                Pacific Arts Strategy
              </Link>
            </MagneticHover>
          </motion.div>
        </div>
      </section>

      {/* Wave transition out of moana hero */}
      <div style={{ background: 'var(--moana)' }}>
        <OceanWaves color="#fff" opacity={0.5} height={100} speed={0.6} lines={4} />
      </div>

      {/* Main content — strategy + image */}
      <section className="section">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }}>
            <ScrollReveal direction="left">
              <div style={{ aspectRatio: '4/5', borderRadius: 'var(--r-md)', overflow: 'hidden', background: 'var(--paper-2)' }}>
                <img
                  src={IMAGES.pasifika}
                  alt="Pacific arts performance"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
            </ScrollReveal>
            <ScrollReveal direction="right" delay={0.1}>
              <span className="eyebrow" style={{ marginBottom: 20, display: 'block' }}>Pacific Arts Strategy</span>
              <h2 style={{ marginBottom: 24 }}>A renewed strategy for Pacific arts in Aotearoa</h2>
              <p style={{ fontSize: 16, lineHeight: 1.75, color: 'var(--ink-2)', marginBottom: 20 }}>
                In 2024, Creative New Zealand published a refreshed Pacific Arts Strategy — developed through extensive engagement with Pacific artists, communities, cultural custodians and iwi Māori across Aotearoa.
              </p>
              <p style={{ fontSize: 16, lineHeight: 1.75, color: 'var(--ink-2)', marginBottom: 20 }}>
                The strategy recognises that Pacific arts in Aotearoa are diverse and dynamic. They include deeply traditional forms — sāmoan slit-drum music, Tongan lakalaka, Cook Islands te maeva — alongside contemporary Pacific voices in visual arts, literature, film, music and theatre.
              </p>
              <p style={{ fontSize: 16, lineHeight: 1.75, color: 'var(--ink-2)', marginBottom: 32 }}>
                Te Kāhui Toi Pasifika — our Pacific arts board — guides our investment decisions and ensures that Pacific communities have genuine input into how resources are allocated and how our work is done.
              </p>
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <MagneticHover strength={0.2}>
                  <Link to="/resources" className="btn btn-primary">Read the strategy →</Link>
                </MagneticHover>
                <MagneticHover strength={0.2}>
                  <Link to="/about/council" className="btn btn-ghost">Te Kāhui Toi Pasifika</Link>
                </MagneticHover>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Strategy pillars */}
      <section className="section" style={{ background: 'var(--paper)', borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)' }}>
        <div className="container">
          <ScrollReveal>
            <div className="section-head">
              <div>
                <span className="eyebrow">Ngā ara · The pathways</span>
                <h2 style={{ marginTop: 16 }}>Four strategic priorities for Pacific arts</h2>
              </div>
            </div>
          </ScrollReveal>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 24 }}>
            {STRATEGY_PILLARS.map((pillar, i) => (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1], delay: i * 0.09 }}
                style={{
                  padding: 32,
                  background: 'var(--card)',
                  border: '1px solid var(--line)',
                  borderRadius: 'var(--r-md)',
                  borderLeft: '4px solid var(--moana)',
                }}
              >
                <h3 style={{ fontSize: 20, marginBottom: 14 }}>{pillar.title}</h3>
                <p style={{ fontSize: 14.5, lineHeight: 1.72, color: 'var(--ink-2)', margin: 0 }}>{pillar.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pacific nations */}
      <section className="section-tight" style={{ borderBottom: '1px solid var(--line)' }}>
        <div className="container">
          <ScrollReveal>
            <div style={{ textAlign: 'center', marginBottom: 32 }}>
              <span className="eyebrow" style={{ marginBottom: 12, display: 'block' }}>Pacific nations in Aotearoa</span>
              <p style={{ fontSize: 16, color: 'var(--muted)', maxWidth: 560, margin: '0 auto' }}>
                Our work recognises and respects the distinct cultures, languages and artistic traditions of all Pacific nations represented in Aotearoa.
              </p>
            </div>
          </ScrollReveal>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center' }}>
            {NATIONS.map((nation, i) => (
              <motion.div
                key={nation.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '10px 18px',
                  border: '1.5px solid var(--line)',
                  borderRadius: 'var(--r-pill)',
                  fontSize: 14,
                  fontWeight: 500,
                  background: 'var(--card)',
                }}
              >
                <span style={{ fontSize: 18 }}>{nation.flag}</span>
                {nation.name}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Motif band */}
      <KoruBand color="var(--moana)" opacity={0.1} />

      {/* Open opportunities */}
      {PASIFIKA_OPPS.length > 0 && (
        <section className="section">
          <div className="container">
            <ScrollReveal>
              <div className="section-head">
                <div>
                  <span className="eyebrow">Pūtea tautoko</span>
                  <h2 style={{ marginTop: 16 }}>Funding for Pacific artists & communities</h2>
                </div>
                <Link to="/funding/opportunities" className="btn-link">All opportunities →</Link>
              </div>
            </ScrollReveal>
            <div className="opp-list" style={{ borderTop: '1px solid var(--line)' }}>
              {PASIFIKA_OPPS.map((o, i) => (
                <motion.div
                  key={o.id}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: i * 0.07 }}
                >
                  <Link to={`/funding/opportunity/${o.id}`} className="opp-row">
                    <div className="code">{o.code}</div>
                    <div className="title-cell">
                      <h4><span className="title-text">{o.title}</span><span className={`status-badge ${o.status}`}>{o.status}</span></h4>
                      {o.kupu && <span className="kupu">{o.kupu}</span>}
                    </div>
                    <div className="desc">{o.desc}</div>
                    <div className="amt">{o.amount}</div>
                    <div className="when"><span className="lbl">Next</span>{o.next}</div>
                    <div className="arrow">→</div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Related news */}
      {PASIFIKA_STORIES.length > 0 && (
        <section className="section" style={{ background: 'var(--paper)', borderTop: '1px solid var(--line)' }}>
          <div className="container">
            <ScrollReveal>
              <div className="section-head">
                <div>
                  <span className="eyebrow">Pitopito kōrero</span>
                  <h2 style={{ marginTop: 16 }}>Pacific arts news</h2>
                </div>
                <Link to="/news" className="btn-link">All news →</Link>
              </div>
            </ScrollReveal>
            <div className="news-grid">
              {PASIFIKA_STORIES.slice(0, 3).map((s, i) => (
                <motion.div
                  key={s.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: i * 0.08 }}
                >
                  <Link to={`/news/${s.id}`} className="ncard">
                    <div className="ncard-img"><img src={s.img} alt={s.title} /></div>
                    <div className="cat">{s.cat}</div>
                    <h3>{s.title}</h3>
                    <div className="date">{s.date} · {s.read} read</div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Closing CTA */}
      <ScrollReveal>
        <section style={{
          background: 'var(--moana)',
          color: '#fff',
          padding: 'calc(72px * var(--density)) 0',
          position: 'relative',
          overflow: 'hidden',
          textAlign: 'center',
        }}>
          <KoruCorner position="tr" size={300} color="#fff" opacity={0.05} />
          <KoruCorner position="bl" size={260} color="#fff" opacity={0.04} />
          <div className="container">
            <div style={{ maxWidth: 640, margin: '0 auto' }}>
              <div style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 'clamp(18px, 2.2vw, 26px)', lineHeight: 1.55, marginBottom: 14, color: 'rgba(255,255,255,0.88)' }}>
                "E ala mai ana ngā toi Pasifika — Pacific arts are rising."
              </div>
              <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.62)', marginBottom: 36 }}>
                Apply for funding, explore resources, or get in touch with our Pacific arts team.
              </p>
              <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
                <Link to="/funding/opportunities" className="btn btn-primary" style={{ background: '#fff', color: 'var(--moana)' }}>
                  Apply for funding →
                </Link>
                <Link to="/about/contact" className="btn btn-ghost" style={{ borderColor: 'rgba(255,255,255,0.3)', color: '#fff' }}>
                  Contact us
                </Link>
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>
    </>
  )
}
