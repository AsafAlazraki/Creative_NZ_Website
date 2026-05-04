import { motion, MotionValue, useScroll, useTransform, useInView } from 'framer-motion'
import { useRef } from 'react'
import { FOUNDATION_STRIP } from '@/data/strategy'
import { ShaderBackground } from './ShaderBackground'

// ────────────────────────────────────────────────────────────────────
// Pillar data — the heart of the Pacific Arts Strategy as scrollable
// typographic moments. Each pillar gets its own viewport-height section.
// ────────────────────────────────────────────────────────────────────

interface Pillar {
  id: string
  number: string
  reo: string
  english: string
  quote: string
  body: string
}

const PILLARS: Pillar[] = [
  {
    id: 'vaka',
    number: '01',
    reo: 'Vaka',
    english: 'Organisations',
    quote: 'Pacific arts groups, collectives and organisations are supported to lead and grow Pacific arts in Aotearoa.',
    body: 'Vaka — the canoe — carries the people forward. We invest in Pacific-led organisations as the vessels that hold and propel the wider arts community across generations.',
  },
  {
    id: 'tagata',
    number: '02',
    reo: 'Tagata',
    english: 'People',
    quote: 'Pasifika artists and arts practitioners are resourced to develop their practice and deliver outstanding work.',
    body: 'Tagata — the people. From master tā moko artists to first-time directors, our investment is in the artists themselves, recognising the diversity of practice across all Pacific nations represented in Aotearoa.',
  },
  {
    id: 'moana',
    number: '03',
    reo: 'Moana',
    english: 'Connections',
    quote: 'Meaningful connections, across Aotearoa, Oceania and globally, ensure Pacific arts are further enriched.',
    body: 'Moana — the great ocean. Pacific arts have always travelled — from village to village, island to island, and now across continents. We support the relationships that keep these flows alive.',
  },
  {
    id: 'va',
    number: '04',
    reo: 'Vā',
    english: 'Environment',
    quote: 'An innovative and networked Pacific arts environment exists, so Pacific arts are strengthened for future success.',
    body: 'Vā — the relational space between things. The strategy attends not just to what is made, but to the conditions that make making possible: spaces, systems, networks, mentorship, and sustained presence.',
  },
  {
    id: 'vision',
    number: '★',
    reo: 'Mata Aliʻi',
    english: 'The eyes of the chief',
    quote: 'Dynamic and resilient New Zealand arts, valued in Aotearoa and internationally.',
    body: 'Mata Aliʻi watches and learns. We measure our impact not just in dollars but in how Pacific arts are seen, supported and felt across the country and the wider Pacific.',
  },
]

// ────────────────────────────────────────────────────────────────────
// Shooting stars — occasional streak across the sky
// ────────────────────────────────────────────────────────────────────

function ShootingStars() {
  // Three streaks, each on its own staggered loop
  const streaks = [
    { delay: 2, duration: 1.6, top: '12%', repeatDelay: 14 },
    { delay: 7, duration: 1.4, top: '38%', repeatDelay: 18 },
    { delay: 11, duration: 1.8, top: '64%', repeatDelay: 22 },
  ]
  return (
    <div aria-hidden="true" style={{
      position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden', zIndex: 2,
    }}>
      {streaks.map((s, i) => (
        <motion.div
          key={i}
          initial={{ x: '-10%', opacity: 0 }}
          animate={{ x: '110%', opacity: [0, 1, 1, 0] }}
          transition={{
            duration: s.duration,
            ease: 'easeOut',
            delay: s.delay,
            repeat: Infinity,
            repeatDelay: s.repeatDelay,
          }}
          style={{
            position: 'absolute',
            top: s.top,
            left: 0,
            width: 240,
            height: 2,
            background: 'linear-gradient(to right, transparent 0%, rgba(255,217,107,0) 0%, rgba(255,217,107,0.85) 70%, #fff 100%)',
            borderRadius: 999,
            transform: 'rotate(-12deg)',
            filter: 'drop-shadow(0 0 6px rgba(255,217,107,0.9))',
          }}
        />
      ))}
    </div>
  )
}

// ────────────────────────────────────────────────────────────────────
// Foundation strip — bottom dark band
// ────────────────────────────────────────────────────────────────────

function FoundationStrip() {
  return (
    <div className="strategy-foundation">
      <div className="container">
        <div className="strategy-foundation-grid">
          {FOUNDATION_STRIP.map((col, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: i * 0.06 }}
            >
              <div className="strategy-foundation-eyebrow">{col.eyebrow}</div>
              <h4 className="strategy-foundation-title">{col.title}</h4>
              {Array.isArray(col.body) ? (
                <ul className="strategy-foundation-list">
                  {col.body.map((b, j) => <li key={j}>{b}</li>)}
                </ul>
              ) : (
                <p className="strategy-foundation-body">{col.body}</p>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ────────────────────────────────────────────────────────────────────
// Main component
// ────────────────────────────────────────────────────────────────────

// ────────────────────────────────────────────────────────────────────
// Pillar — full-viewport-height section that fades in as it enters view
// ────────────────────────────────────────────────────────────────────

function Pillar({ pillar, index }: { pillar: Pillar; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: false, margin: '-30% 0px -30% 0px' })

  return (
    <section ref={ref} className="strategy-pillar" data-pillar={pillar.id}>
      <div className="container strategy-pillar-inner">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          className="strategy-pillar-text"
        >
          <span className="strategy-pillar-eyebrow">
            {pillar.reo} <span style={{ opacity: 0.55 }}>· {pillar.english}</span>
          </span>
          <h3 className="strategy-pillar-quote">
            {pillar.quote}
          </h3>
          <p className="strategy-pillar-body">{pillar.body}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 40 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
          aria-hidden="true"
          className="strategy-pillar-number"
        >
          {pillar.number}
        </motion.div>
      </div>
    </section>
  )
}

// ────────────────────────────────────────────────────────────────────
// NebulaLayer — three drifting blobs that translate with scroll
// ────────────────────────────────────────────────────────────────────

function NebulaLayer({ scrollProgress }: { scrollProgress: MotionValue<number> }) {
  const moanaY      = useTransform(scrollProgress, [0, 1], ['-10%', '20%'])
  const pohutukawaY = useTransform(scrollProgress, [0, 1], ['10%', '-15%'])
  const kowhaiX     = useTransform(scrollProgress, [0, 1], ['0%', '12%'])

  return (
    <div className="strategy-nebula" aria-hidden="true">
      <motion.div className="strategy-nebula-blob strategy-nebula-blob--moana"      style={{ y: moanaY }} />
      <motion.div className="strategy-nebula-blob strategy-nebula-blob--pohutukawa" style={{ y: pohutukawaY }} />
      <motion.div className="strategy-nebula-blob strategy-nebula-blob--kowhai"     style={{ x: kowhaiX }} />
    </div>
  )
}

export function PacificStrategyConstellation() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  return (
    <>
      <section className="strategy-section" aria-labelledby="strategy-heading">
        {/* Intro */}
        <div className="strategy-intro container">
          <motion.span
            className="eyebrow"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            style={{ color: 'var(--kowhai)' }}
          >
            Pacific Arts Strategy · Mata Aliʻi
          </motion.span>
          <motion.h2
            id="strategy-heading"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.06, ease: [0.16, 1, 0.3, 1] }}
            style={{ color: '#fff', maxWidth: 780, marginTop: 16 }}
          >
            Navigating by stars — our strategy as a constellation.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, delay: 0.14 }}
            style={{ color: 'rgba(255,255,255,0.7)', fontSize: 17, lineHeight: 1.6, maxWidth: 640, marginTop: 16 }}
          >
            Like Pasifika voyagers reading the night sky, we navigate by guiding stars.
            Scroll down to draw the constellation. Click any star to read its meaning.
          </motion.p>
        </div>

        {/* §07: scroll-driven typographic narrative replaces the interactive
            star canvas. Background ambient layers (shader, nebula, stars,
            shooting stars) stay — they're the cosmic mood — but content is
            now language-led, not interaction-led. */}
        <div ref={sectionRef} className="strategy-pillars-wrap">
          {/* Layered ambient background (fixed within section) */}
          <div className="strategy-bg">
            <ShaderBackground palette="nightsky" intensity="subtle" speed={0.04} />
            <NebulaLayer scrollProgress={scrollYProgress} />
            <svg className="strategy-stars-bg" viewBox="0 0 1600 1000" preserveAspectRatio="xMidYMid slice">
              {Array.from({ length: 250 }).map((_, i) => {
                const x = ((i * 211) % 1600)
                const y = ((i * 367) % 1000)
                const tier = i % 11
                const r = tier === 0 ? 1.8 : tier < 3 ? 1.2 : 0.6
                const opacity = tier === 0 ? 0.95 : tier < 3 ? 0.65 : 0.32
                return <circle key={i} cx={x} cy={y} r={r} fill="#fff" opacity={opacity} />
              })}
              {Array.from({ length: 18 }).map((_, i) => {
                const x = ((i * 467) % 1600)
                const y = ((i * 277) % 1000)
                return (
                  <motion.circle
                    key={`tw-${i}`}
                    cx={x} cy={y} r={1.4}
                    fill="#fff"
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 2 + (i % 5), repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
                  />
                )
              })}
            </svg>
            <ShootingStars />
          </div>

          {/* Pillar narrative — five viewport-height sections */}
          <div className="strategy-pillars">
            {PILLARS.map((p, i) => (
              <Pillar key={p.id} pillar={p} index={i} />
            ))}
          </div>

          {/* Closing kowhai CTA band */}
          <div className="strategy-cta-band">
            <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 32, flexWrap: 'wrap' }}>
              <h3 style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(28px, 3.4vw, 48px)',
                fontStyle: 'italic',
                fontVariationSettings: "'wght' 300, 'opsz' 72",
                color: 'var(--accent-ink)',
                margin: 0,
              }}>
                Read the full strategy →
              </h3>
              <a href="#" onClick={(e) => e.preventDefault()} className="btn btn-primary" style={{ background: 'var(--ink)', color: 'var(--bg)' }}>
                Download PDF
              </a>
            </div>
          </div>
        </div>
      </section>

      <FoundationStrip />
    </>
  )
}
