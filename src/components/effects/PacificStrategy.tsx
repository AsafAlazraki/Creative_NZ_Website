import { AnimatePresence, motion, MotionValue, useScroll, useTransform, useInView } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { X, Info } from 'lucide-react'
import { STARS, LINES, FOUNDATION_STRIP, type Star } from '@/data/strategy'
import { ShaderBackground } from './ShaderBackground'

// ────────────────────────────────────────────────────────────────────
// Pillar data — used as the mobile fallback (§6) and as fallback
// content when reduced-motion is preferred.
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
  { id: 'vaka',   number: '01', reo: 'Vaka',   english: 'Organisations',
    quote: 'Pacific arts groups, collectives and organisations are supported to lead and grow Pacific arts in Aotearoa.',
    body:  'Vaka — the canoe — carries the people forward. We invest in Pacific-led organisations as the vessels that hold and propel the wider arts community across generations.' },
  { id: 'tagata', number: '02', reo: 'Tagata', english: 'People',
    quote: 'Pasifika artists and arts practitioners are resourced to develop their practice and deliver outstanding work.',
    body:  'From master tā moko artists to first-time directors, our investment is in the artists themselves, recognising the diversity of practice across all Pacific nations represented in Aotearoa.' },
  { id: 'moana',  number: '03', reo: 'Moana',  english: 'Connections',
    quote: 'Meaningful connections, across Aotearoa, Oceania and globally, ensure Pacific arts are further enriched.',
    body:  'Moana — the great ocean. Pacific arts have always travelled — from village to village, island to island, and now across continents. We support the relationships that keep these flows alive.' },
  { id: 'va',     number: '04', reo: 'Vā',     english: 'Environment',
    quote: 'An innovative and networked Pacific arts environment exists, so Pacific arts are strengthened for future success.',
    body:  'Vā — the relational space between things. The strategy attends not just to what is made, but to the conditions that make making possible: spaces, systems, networks, mentorship, and sustained presence.' },
  { id: 'vision', number: '✦', reo: 'Mata Aliʻi', english: 'The eyes of the chief',
    quote: 'Dynamic and resilient New Zealand arts, valued in Aotearoa and internationally.',
    body:  'Mata Aliʻi watches and learns. We measure our impact not just in dollars but in how Pacific arts are seen, supported and felt across the country and the wider Pacific.' },
]

// ────────────────────────────────────────────────────────────────────
// Star rendering tokens
// ────────────────────────────────────────────────────────────────────

const STAR_RADIUS: Record<Star['kind'], number> = {
  guiding: 22, vision: 18, aspiration: 10, value: 12, support: 8,
}
const STAR_GLOW: Record<Star['kind'], number> = {
  guiding: 80, vision: 70, aspiration: 30, value: 40, support: 22,
}
const STAR_COLOR: Record<Star['kind'], string> = {
  guiding: '#FFD96B', vision: '#FFFFFF', aspiration: '#FFE9A8',
  value: '#A8D4F0', support: '#D8E5F2',
}
const NODE_ACCENT: Record<string, string> = {
  vaka: 'var(--pohutukawa)',
  tagata: 'var(--kowhai)',
  moana: 'var(--moana)',
  va: 'var(--bush)',
  'kaupapa-pasifika': 'var(--siapo)',
  'mana-pasifika': 'var(--kowhai)',
  'mata-alii': '#ffffff',
  vision: '#ffffff',
}

function lookupStar(id: string): Star | undefined {
  return STARS.find(s => s.id === id)
}

// ────────────────────────────────────────────────────────────────────
// ConnectionLine — curved bezier dotted path between two stars (§1)
// Path is drawn via stroke-dashoffset on first viewport entry.
// ────────────────────────────────────────────────────────────────────

function ConnectionLine({
  fromId, toId, weight = 'soft', drawn,
}: {
  fromId: string
  toId: string
  weight?: 'soft' | 'medium'
  drawn: boolean
}) {
  const from = lookupStar(fromId)
  const to = lookupStar(toId)
  if (!from || !to) return null

  // Cubic-bezier control points: arc the line slightly perpendicular to the
  // straight segment so the constellation feels organic rather than wireframe.
  const dx = to.x - from.x
  const dy = to.y - from.y
  const len = Math.sqrt(dx * dx + dy * dy)
  const nx = -dy / len
  const ny = dx / len
  const arcAmt = Math.min(60, len * 0.15)
  const c1x = from.x + dx * 0.35 + nx * arcAmt
  const c1y = from.y + dy * 0.35 + ny * arcAmt
  const c2x = from.x + dx * 0.65 + nx * arcAmt
  const c2y = from.y + dy * 0.65 + ny * arcAmt
  const d = `M ${from.x} ${from.y} C ${c1x} ${c1y}, ${c2x} ${c2y}, ${to.x} ${to.y}`

  const pathLen = len + arcAmt * 1.2

  return (
    <path
      d={d}
      stroke={weight === 'medium' ? '#FFD96B' : '#ffffff'}
      strokeOpacity={weight === 'medium' ? 0.55 : 0.32}
      strokeWidth={weight === 'medium' ? 1.4 : 1}
      strokeDasharray="4 8"
      fill="none"
      strokeLinecap="round"
      style={{
        strokeDashoffset: drawn ? 0 : pathLen,
        transition: 'stroke-dashoffset 1.6s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    />
  )
}

// ────────────────────────────────────────────────────────────────────
// StarNode — circle + glow + label + clickable hit area
// ────────────────────────────────────────────────────────────────────

function StarNode({
  star, drawn, onClick, isActive,
}: {
  star: Star
  drawn: boolean
  onClick: (id: string) => void
  isActive: boolean
}) {
  const r = STAR_RADIUS[star.kind]
  const glowR = STAR_GLOW[star.kind]
  const color = STAR_COLOR[star.kind]
  const isHero = star.kind === 'guiding' || star.kind === 'vision'

  return (
    <motion.g
      style={{ cursor: 'pointer' }}
      initial={{ opacity: 0 }}
      animate={drawn ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
      onClick={() => onClick(star.id)}
      role="button"
      aria-label={`${star.label} — open detail`}
      tabIndex={0}
      onKeyDown={e => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onClick(star.id)
        }
      }}
    >
      {/* Diffuse outer halo */}
      <motion.circle
        cx={star.x} cy={star.y} r={glowR}
        fill={color}
        opacity={isActive ? 0.32 : 0.14}
        animate={{ opacity: [isActive ? 0.20 : 0.08, isActive ? 0.4 : 0.18, isActive ? 0.20 : 0.08] }}
        transition={{ duration: 4 + (isHero ? 0 : 2), repeat: Infinity, ease: 'easeInOut' }}
        style={{ filter: 'blur(20px)' }}
      />
      {/* Mid glow */}
      <circle
        cx={star.x} cy={star.y} r={glowR * 0.55}
        fill={color}
        opacity={isHero ? 0.34 : 0.18}
        style={{ filter: 'blur(10px)' }}
      />
      {/* Halo ring on hero stars */}
      {isHero && (
        <motion.circle
          cx={star.x} cy={star.y} r={r + 12}
          fill="none" stroke={color} strokeOpacity={0.6} strokeWidth={1.2}
          animate={{ scale: [1, 1.45, 1], opacity: [0.7, 0, 0.7] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: 'easeOut' }}
          style={{ transformOrigin: `${star.x}px ${star.y}px` }}
        />
      )}
      {/* Core */}
      <circle
        cx={star.x} cy={star.y} r={r}
        fill={color}
        style={{ filter: `drop-shadow(0 0 ${isHero ? 14 : 6}px ${color})` }}
      />
      {/* Cross spikes for hero stars */}
      {isHero && (
        <g pointerEvents="none">
          <line x1={star.x - r * 3} y1={star.y} x2={star.x + r * 3} y2={star.y} stroke={color} strokeWidth={0.8} strokeOpacity={0.7} strokeLinecap="round" />
          <line x1={star.x} y1={star.y - r * 3} x2={star.x} y2={star.y + r * 3} stroke={color} strokeWidth={0.8} strokeOpacity={0.7} strokeLinecap="round" />
        </g>
      )}
      {/* Inner hot-spot (idle twinkle) */}
      <motion.circle
        cx={star.x} cy={star.y} r={r * 0.5}
        fill="#fff"
        animate={{ opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 2 + (star.id.charCodeAt(0) % 4) * 0.5, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Label */}
      <foreignObject
        x={star.x - 200}
        y={star.y + r + 14}
        width={400}
        height={90}
        pointerEvents="none"
      >
        <div style={{
          textAlign: 'center', color: '#fff',
          fontFamily: 'var(--font-display)',
          fontSize: isHero ? (star.kind === 'guiding' ? 30 : 22) : 14,
          fontWeight: isHero ? 500 : 400,
          letterSpacing: isHero ? '0.04em' : '0.01em',
          lineHeight: 1.18,
          textShadow: '0 2px 16px rgba(0,0,0,0.85)',
        }}>
          <div style={{
            fontStyle: isHero ? 'normal' : 'italic',
            textTransform: star.kind === 'guiding' ? 'uppercase' : 'none',
            color: star.kind === 'guiding' ? '#FFD96B' : '#fff',
          }}>
            {star.label}
          </div>
          {star.sublabel && (
            <div style={{
              fontSize: 10.5,
              opacity: 0.7,
              fontFamily: 'var(--font-mono)',
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              marginTop: 4,
              fontWeight: 600,
            }}>
              {star.sublabel}
            </div>
          )}
        </div>
      </foreignObject>

      {/* Bigger click hit-target */}
      <circle cx={star.x} cy={star.y} r={Math.max(r + 16, 28)} fill="transparent" />
    </motion.g>
  )
}

// ────────────────────────────────────────────────────────────────────
// NodePanel — slide-in from right when a star is clicked (§3)
// ────────────────────────────────────────────────────────────────────

function NodePanel({ star, onClose }: { star: Star; onClose: () => void }) {
  const accent = NODE_ACCENT[star.id] ?? STAR_COLOR[star.kind]
  // Escape closes
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])
  return (
    <motion.aside
      key={star.id}
      role="dialog"
      aria-modal="true"
      aria-labelledby={`node-panel-${star.id}-title`}
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
      className="strategy-node-panel"
      style={{ borderLeft: `3px solid ${accent}` }}
    >
      <button onClick={onClose} aria-label="Close" className="strategy-node-panel-close">
        <X size={18} />
      </button>
      {star.sublabel && (
        <div className="strategy-node-panel-eyebrow" style={{ color: accent }}>
          {star.sublabel}
        </div>
      )}
      <h3 id={`node-panel-${star.id}-title`} className="strategy-node-panel-title">
        {star.label}
      </h3>
      <p className="strategy-node-panel-body">{star.description}</p>
      {(star.kind === 'guiding' || star.kind === 'vision') && (
        <div className="strategy-node-panel-tag">
          {star.kind === 'guiding' ? 'A guiding star of the Pacific Arts Strategy' : 'Our vision for Toi Aotearoa'}
        </div>
      )}
    </motion.aside>
  )
}

// ────────────────────────────────────────────────────────────────────
// Mobile fallback (§6) — vertical pillar narrative for ≤768px
// ────────────────────────────────────────────────────────────────────

function MobilePillar({ pillar }: { pillar: Pillar }) {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-15% 0px -15% 0px' })
  return (
    <motion.section
      ref={ref}
      className="strategy-m-card"
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
    >
      <span className="strategy-m-num">{pillar.number}</span>
      <span className="strategy-m-eyebrow">{pillar.reo} · {pillar.english}</span>
      <h3 className="strategy-m-quote">{pillar.quote}</h3>
      <p className="strategy-m-body">{pillar.body}</p>
    </motion.section>
  )
}

// ────────────────────────────────────────────────────────────────────
// Shooting stars (kept from earlier work)
// ────────────────────────────────────────────────────────────────────

function ShootingStars() {
  const streaks = [
    { delay: 2,  duration: 1.6, top: '12%', repeatDelay: 14 },
    { delay: 7,  duration: 1.4, top: '38%', repeatDelay: 18 },
    { delay: 11, duration: 1.8, top: '64%', repeatDelay: 22 },
  ]
  return (
    <div aria-hidden="true" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden', zIndex: 2 }}>
      {streaks.map((s, i) => (
        <motion.div
          key={i}
          initial={{ x: '-10%', opacity: 0 }}
          animate={{ x: '110%', opacity: [0, 1, 1, 0] }}
          transition={{ duration: s.duration, ease: 'easeOut', delay: s.delay, repeat: Infinity, repeatDelay: s.repeatDelay }}
          style={{
            position: 'absolute', top: s.top, left: 0,
            width: 240, height: 2,
            background: 'linear-gradient(to right, rgba(255,217,107,0) 0%, rgba(255,217,107,0.85) 70%, #fff 100%)',
            borderRadius: 999, transform: 'rotate(-12deg)',
            filter: 'drop-shadow(0 0 6px rgba(255,217,107,0.9))',
          }}
        />
      ))}
    </div>
  )
}

// ────────────────────────────────────────────────────────────────────
// NebulaLayer — three drifting blobs that translate gently with scroll
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

// ────────────────────────────────────────────────────────────────────
// Foundation strip — six-column band below the constellation (§8 refinements)
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
              className={i === 0 ? 'strategy-foundation-col strategy-foundation-col--first' : 'strategy-foundation-col'}
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
        <div style={{ marginTop: 36, display: 'flex', justifyContent: 'flex-end' }}>
          <a href="#" onClick={e => e.preventDefault()} className="strategy-foundation-pdf">
            Download strategy PDF →
          </a>
        </div>
      </div>
    </div>
  )
}

// ────────────────────────────────────────────────────────────────────
// Main constellation component
// ────────────────────────────────────────────────────────────────────

export function PacificStrategyConstellation() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const canvasRef  = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  // Draw constellation lines + reveal stars on first viewport entry.
  // Per the user's preference: fade-in once and stay (no fade-out on scroll past).
  const drawn = useInView(canvasRef, { once: true, margin: '-15% 0px -15% 0px' })

  const [selectedId, setSelectedId] = useState<string | null>(null)
  const selected = selectedId ? lookupStar(selectedId) : null

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
            Tap any star on the map below to read its meaning.
          </motion.p>
        </div>

        {/* Desktop constellation */}
        <div ref={sectionRef} className="strategy-canvas-wrap" aria-hidden={false}>
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

          <div ref={canvasRef} className="strategy-canvas-inner">
            <svg
              className="strategy-canvas"
              viewBox="0 0 1600 1000"
              preserveAspectRatio="xMidYMid meet"
              role="img"
              aria-label="Pacific Arts Strategy constellation. Tap any star to open its description."
            >
              {/* Curved dotted connections (§1) */}
              {LINES.map((l, i) => (
                <ConnectionLine key={i} fromId={l.from} toId={l.to} weight={l.weight} drawn={drawn} />
              ))}
              {/* Stars (interactive) */}
              {STARS.map(star => (
                <StarNode
                  key={star.id}
                  star={star}
                  drawn={drawn}
                  onClick={setSelectedId}
                  isActive={selectedId === star.id}
                />
              ))}
            </svg>
          </div>
        </div>

        {/* Mobile fallback (§6) — pillar narrative */}
        <div className="strategy-mobile">
          <div className="container">
            <div className="strategy-m-vision">
              <span className="strategy-m-vision-icon">★</span>
              <h3>Powerful and resilient Pacific arts</h3>
              <p>led by passionate and enterprising Pasifika people, for Aotearoa, Te&nbsp;Moana-nui-a-Kiwa and the world.</p>
            </div>
            {PILLARS.slice(0, 4).map(p => <MobilePillar key={p.id} pillar={p} />)}
            <MobilePillar pillar={PILLARS[4]} />
          </div>
        </div>
      </section>

      <FoundationStrip />

      <AnimatePresence>
        {selected && <NodePanel star={selected} onClose={() => setSelectedId(null)} />}
      </AnimatePresence>
    </>
  )
}
