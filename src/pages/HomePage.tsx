import { useState, useMemo, useRef, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { FUNDING_TIERS, OPPORTUNITIES, STATS, STORIES, IMAGES, isClosingSoon } from '@/data'
import { KoruCorner, KoruBand, KoruSpiral, MagneticHover, ScrollReveal, AnimatedKoru, ParallaxImage } from '@/components/motif/KoruMotifs'
import { ShaderBackground } from '@/components/effects/ShaderBackground'
import { NoiseGrain } from '@/components/effects/NoiseGrain'
import { DriftingKoru } from '@/components/effects/DriftingKoru'
import { KineticType } from '@/components/effects/KineticType'
import { OceanWaves } from '@/components/effects/OceanWaves'
import { SiapoDivider } from '@/components/effects/SiapoPattern'
import CountUp from './CountUp'

const HERO_VERBS = ['give life', 'give breath', 'give voice', 'give meaning']

// Animated stat number
function StatNumber({ value, prefix = '', suffix = '' }: { value: number; prefix?: string; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const [count, setCount] = useState(0)
  const [triggered, setTriggered] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !triggered) {
        setTriggered(true)
        const start = performance.now()
        const duration = 2000
        const tick = (t: number) => {
          const p = Math.min(1, (t - start) / duration)
          const eased = 1 - Math.pow(1 - p, 3)
          setCount(value * eased)
          if (p < 1) requestAnimationFrame(tick)
        }
        requestAnimationFrame(tick)
      }
    }, { threshold: 0.3 })
    io.observe(el)
    return () => io.disconnect()
  }, [value, triggered])

  const formatted = Number.isInteger(value)
    ? Math.round(count).toLocaleString()
    : count.toFixed(1)

  return <span ref={ref}>{prefix}{formatted}{suffix}</span>
}

export default function HomePage() {
  const [q, setQ] = useState('')
  const navigate = useNavigate()

  const results = useMemo(() => {
    if (!q.trim()) return []
    const ql = q.toLowerCase()
    return OPPORTUNITIES.filter(o =>
      o.title.toLowerCase().includes(ql) || o.desc.toLowerCase().includes(ql) || (o.kupu || '').toLowerCase().includes(ql)
    ).slice(0, 5)
  }, [q])

  const featuredOpps = OPPORTUNITIES.filter(o => o.status === 'open').slice(0, 4)

  const heroRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])

  return (
    <>
      {/* Banner */}
      <div className="banner">
        Round two of the Creative Communities Scheme opens 14 May.{' '}
        <Link to="/funding/opportunities">View all opportunities →</Link>
      </div>

      {/* Hero — editorial cream with very subtle motion */}
      <section ref={heroRef} className="hero" style={{ overflow: 'hidden', background: 'var(--bg)' }}>
        {/* Subtle paper-tone shader, very low intensity */}
        <ShaderBackground palette="paper" intensity="subtle" speed={0.06} />
        {/* Drifting koru: more visible since shader is restrained */}
        <DriftingKoru parallax={true} color="var(--kowhai)" />
        {/* Original corner motif on top */}
        <div style={{ position: 'relative', zIndex: 2 }}>
          <KoruCorner position="tr" size={400} color="var(--kowhai)" opacity={0.08} />
        </div>

        {/* Oversized italic "Toi" watermark behind the headline (§01) */}
        <span aria-hidden="true" className="hero-watermark">Toi</span>

        <div className="container" style={{ position: 'relative', zIndex: 3 }}>
          <div className="hero-grid">
            {/* Left: text */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              >
                <span className="eyebrow">Toi Aotearoa · Funding · Advocacy · Development</span>
              </motion.div>

              <motion.h1
                style={{ marginTop: 24 }}
                initial={{ opacity: 0, y: 32 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.08 }}
              >
                <span className="light">The arts </span>
                <KineticType words={HERO_VERBS} variant="inline" interval={2800} />
                <span className="light"> to the spirit, the spirit gives life to the people.</span>
              </motion.h1>

              <motion.p
                className="lede"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.18 }}
              >
                We invest in artists, ringatoi and arts organisations across Aotearoa — championing toi as part of who we are, and growing the conditions for the arts to thrive.
              </motion.p>

              <motion.div
                style={{ display: 'flex', alignItems: 'center', gap: 24, flexWrap: 'wrap', marginTop: 36 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.28 }}
              >
                <MagneticHover strength={0.25}>
                  <Link to="/funding" className="btn btn-primary">Find funding →</Link>
                </MagneticHover>
                <Link to="/about" className="btn-link">Learn how we work →</Link>
              </motion.div>
            </div>

            {/* Right: image with parallax */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            >
              <div className="hero-img">
                <motion.div style={{ y: heroY, height: '115%', marginTop: '-7.5%' }}>
                  <img src={IMAGES.performance} alt="A performer on stage" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </motion.div>
                <span className="credit">Photo: Unsplash · Demo asset</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Funding tiers */}
      <section className="section">
        <div className="container">
          <ScrollReveal>
            <div className="section-head">
              <div>
                <span className="eyebrow">Pūtea tautoko</span>
                <h2 style={{ marginTop: 16, maxWidth: 640 }}>Funding designed for where you are in your practice.</h2>
              </div>
              <Link to="/funding/opportunities" className="btn-link">All opportunities ({OPPORTUNITIES.length}) →</Link>
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
                    <div className="tier-card-img"><img src={t.img} alt={t.label} /></div>
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

      {/* Stats band */}
      <section className="stats-band" style={{ position: 'relative', overflow: 'hidden' }}>
        <ShaderBackground palette="ink" intensity="subtle" speed={0.05} />
        <KoruCorner position="bl" size={480} color="var(--kowhai)" opacity={0.04} />
        <KoruCorner position="tr" size={360} color="#fff" opacity={0.025} />
        <div className="stats-band-inner" style={{ position: 'relative', zIndex: 2 }}>
          <ScrollReveal>
            <span className="eyebrow" style={{ color: 'var(--kowhai)' }}>Ko Aotearoa me ōna Toi · 2026</span>
            <h2 style={{ marginTop: 24 }}>The arts shape who we are — and they're made in every corner of Aotearoa.</h2>
          </ScrollReveal>
          <div className="stats-grid">
            {STATS.map((s, i) => (
              <motion.div
                key={i}
                className="stat"
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1], delay: i * 0.1 }}
              >
                {s.kupu && <div className="kupu">{s.kupu}</div>}
                <div className="num">
                  <StatNumber value={s.value} prefix={s.prefix} suffix={s.suffix} />
                </div>
                <div className="lbl">{s.label}</div>
              </motion.div>
            ))}
          </div>

          {/* Source citation */}
          <ScrollReveal delay={0.15}>
            <p style={{
              marginTop: 48,
              fontSize: 11.5,
              color: 'rgba(255,255,255,0.45)',
              letterSpacing: '0.06em',
              maxWidth: 760,
              lineHeight: 1.6,
              fontStyle: 'italic',
              fontFamily: 'var(--font-display)',
            }}>
              Source: New Zealanders &amp; the Arts 2026 (Creative NZ). Investment figure
              from CNZ Annual Report 2024–25. GDP &amp; employment data: Stats NZ
              Cultural and Creative Industries Satellite Account 2025.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Open opportunities */}
      <section className="section">
        <div className="container">
          <ScrollReveal>
            <div className="section-head">
              <div>
                <span className="eyebrow">Open now</span>
                <h2 style={{ marginTop: 16 }}>Opportunities accepting applications.</h2>
              </div>
              <Link to="/funding/opportunities" className="btn-link">View all →</Link>
            </div>
          </ScrollReveal>

          {/* Featured opportunity — horizontal kowhai card (§03) */}
          {featuredOpps[0] && (() => {
            const f = featuredOpps[0]
            return (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              >
                <Link to={`/funding/opportunity/${f.id}`} className="featured-opp">
                  <div className="featured-opp-text">
                    <span className="featured-opp-eyebrow">Featured opportunity</span>
                    <h3>{f.title}</h3>
                    {f.kupu && <span className="kupu">{f.kupu}</span>}
                    <p className="desc">{f.desc}</p>
                  </div>
                  <div className="featured-opp-meta">
                    <div className="amt">{f.amount}</div>
                    <div className="when"><span className="lbl">Closes</span>{f.next}</div>
                    <span className="btn btn-primary featured-opp-cta">Apply now →</span>
                  </div>
                </Link>
              </motion.div>
            )
          })()}

          <div className="opp-list" style={{ borderTop: '1px solid var(--line)', marginTop: 32 }}>
            {featuredOpps.slice(1).map((o, i) => (
              <motion.div
                key={o.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-20px' }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: i * 0.07 }}
              >
                <Link to={`/funding/opportunity/${o.id}`} className="opp-row">
                  <div className="code">{o.code}</div>
                  <div className="title-cell">
                    <h4>
                      <span className="title-text">{o.title}</span>
                      <span className="badge-stack">
                        {isClosingSoon(o.next) && <span className="closing-soon-badge">Closing soon</span>}
                        <span className={`status-badge ${o.status}`}>{o.status}</span>
                      </span>
                    </h4>
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

      {/* Pasifika & Māori — clean dark band, restrained moana shader behind headline only */}
      <section className="pasifika-band" style={{ position: 'relative', overflow: 'hidden' }}>
        <KoruCorner position="tl" size={360} color="var(--moana)" opacity={0.10} />
        <KoruCorner position="br" size={320} color="var(--pohutukawa)" opacity={0.08} />
        <div className="pasifika-band-inner" style={{ position: 'relative', zIndex: 2 }}>
          <ScrollReveal>
            <div>
              <span className="eyebrow">Ngā Toi Māori · Toi Pasifika</span>
              <h2 style={{ marginTop: 18 }}>Honouring the artistic traditions of Aotearoa and Te Moana-nui-a-Kiwa.</h2>
              <p>Dedicated kāhui, dedicated funding, and dedicated advocacy for Māori and Pacific artists, knowledge-holders and communities.</p>
              <div style={{ display: 'flex', gap: 12, marginTop: 28 }}>
                <MagneticHover strength={0.15}>
                  <Link to="/toi-maori" className="btn btn-ghost">Ngā Toi Māori →</Link>
                </MagneticHover>
                <MagneticHover strength={0.15}>
                  <Link to="/toi-pasifika" className="btn btn-ghost">Toi Pasifika →</Link>
                </MagneticHover>
              </div>
            </div>
          </ScrollReveal>
          <div className="pasifika-tiles">
            {[
              { to: '/funding/opportunity/pacific-heritage', h: 'Pacific Heritage Fund', k: 'Tuku iho Pasifika', p: 'Practice, transmission and revitalisation of Pacific heritage arts.', a: 'Apply →' },
              { to: '/funding/awards', h: 'Arts Pasifika Awards', k: 'Ngā tohu', p: 'Honouring excellence and contribution across the Pacific arts.', a: '2026 winners →' },
              { to: '/funding/opportunity/banff', h: 'Banff Indigenous Arts', k: 'Karahipi', p: 'Residencies for Māori artists at Banff Centre, Canada.', a: 'Learn more →' },
              { to: '/resources/reports', h: 'Te Hā o ngā Toi', k: 'Rautaki', p: 'Our long-term strategy for ngā toi Māori.', a: 'Read strategy →' },
            ].map((tile, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: i * 0.09 }}
              >
                <Link to={tile.to} className="pasifika-tile">
                  <KoruSpiral size={28} color="var(--moana)" opacity={0.18} style={{ position: 'absolute', top: 12, right: 12 }} />
                  <h4>{tile.h}</h4>
                  <span className="kupu">{tile.k}</span>
                  <p>{tile.p}</p>
                  <span className="arrow">{tile.a}</span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* News */}
      <section className="section">
        <div className="container">
          <ScrollReveal>
            <div className="section-head">
              <div>
                <span className="eyebrow">Pitopito kōrero</span>
                <h2 style={{ marginTop: 16 }}>News & stories from the sector.</h2>
              </div>
              <Link to="/news" className="btn-link">All news →</Link>
            </div>
          </ScrollReveal>
          {/* Featured lede — magazine-style first story */}
          {STORIES[0] && (() => {
            const f = STORIES[0]
            return (
              <motion.div
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
                style={{ marginBottom: 56 }}
              >
                <Link to={`/news/${f.id}`} className="ncard ncard--feature">
                  <div className="ncard-img"><img src={f.img} alt="" /></div>
                  <div className="ncard--feature-body">
                    <div className="cat">{f.cat}{f.kupu ? ` · ${f.kupu}` : ''}</div>
                    <h3>{f.title}</h3>
                    <p className="excerpt">{f.excerpt}</p>
                    <div className="date">{f.date} · {f.read} read</div>
                    <span className="btn-link" style={{ marginTop: 8 }}>Read full story →</span>
                  </div>
                </Link>
              </motion.div>
            )
          })()}

          <div className="news-grid news-grid--3">
            {STORIES.slice(1, 4).map((s, i) => (
              <motion.div
                key={s.id}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: i * 0.08 }}
              >
                <Link to={`/news/${s.id}`} className="ncard">
                  <div className="ncard-img"><img src={s.img} alt="" /></div>
                  <div className="cat">{s.cat}</div>
                  <h3>{s.title}</h3>
                  <div className="date">{s.date} · {s.read} read</div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
