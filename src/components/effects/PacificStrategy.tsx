import { AnimatePresence, motion, MotionValue, useScroll, useTransform } from 'framer-motion'
import { useRef, useState } from 'react'
import { X } from 'lucide-react'
import { STARS, LINES, FOUNDATION_STRIP, type Star, type Line } from '@/data/strategy'
import { ShaderBackground } from './ShaderBackground'

// ────────────────────────────────────────────────────────────────────
// Star rendering helpers
// ────────────────────────────────────────────────────────────────────

const STAR_RADIUS: Record<Star['kind'], number> = {
  guiding: 22,
  vision: 26,
  aspiration: 12,
  value: 14,
  support: 10,
}
const STAR_GLOW: Record<Star['kind'], number> = {
  guiding: 80,
  vision: 95,
  aspiration: 38,
  value: 44,
  support: 28,
}
const STAR_COLOR: Record<Star['kind'], string> = {
  guiding: '#FFD96B',     // bright amber/kowhai
  vision: '#FFFFFF',
  aspiration: '#FFE9A8',
  value: '#A8D4F0',
  support: '#D8E5F2',
}

const REVEAL_RANGE = 0.05  // how long the fade-in lasts in scroll progress

function lookupStar(id: string): Star | undefined {
  return STARS.find(s => s.id === id)
}

// ────────────────────────────────────────────────────────────────────
// One star — circle + halo + label
// ────────────────────────────────────────────────────────────────────

function StarNode({
  star, scrollProgress, onClick, isActive,
}: {
  star: Star
  scrollProgress: MotionValue<number>
  onClick: (id: string) => void
  isActive: boolean
}) {
  const opacity = useTransform(scrollProgress, [star.revealAt, star.revealAt + REVEAL_RANGE], [0, 1])
  const scale   = useTransform(scrollProgress, [star.revealAt, star.revealAt + REVEAL_RANGE], [0.4, 1])

  const r = STAR_RADIUS[star.kind]
  const glowR = STAR_GLOW[star.kind]
  const color = STAR_COLOR[star.kind]
  const isHero = star.kind === 'guiding' || star.kind === 'vision'

  return (
    <motion.g
      style={{ opacity, scale, transformOrigin: `${star.x}px ${star.y}px`, cursor: 'pointer' }}
      onClick={() => onClick(star.id)}
      whileHover={{ scale: 1.08 }}
      transition={{ type: 'spring', stiffness: 220, damping: 22 }}
      role="button"
      aria-label={star.label}
      tabIndex={0}
      className="strategy-star-group"
    >
      {/* outermost diffuse halo */}
      <motion.circle
        cx={star.x}
        cy={star.y}
        r={glowR * 1.5}
        fill={color}
        opacity={isActive ? 0.18 : 0.08}
        animate={{ opacity: [isActive ? 0.18 : 0.06, isActive ? 0.32 : 0.14, isActive ? 0.18 : 0.06] }}
        transition={{ duration: 5 + (isHero ? 0 : 2), repeat: Infinity, ease: 'easeInOut' }}
        style={{ filter: 'blur(28px)' }}
      />
      {/* outer glow */}
      <motion.circle
        cx={star.x}
        cy={star.y}
        r={glowR}
        fill={color}
        opacity={isActive ? 0.45 : 0.22}
        animate={{
          opacity: [isActive ? 0.45 : 0.18, isActive ? 0.7 : 0.36, isActive ? 0.45 : 0.18],
        }}
        transition={{ duration: 4 + (isHero ? 0 : 2), repeat: Infinity, ease: 'easeInOut' }}
        style={{ filter: 'blur(14px)' }}
      />
      {/* halo ring (guiding stars + vision) */}
      {isHero && (
        <>
          <motion.circle
            cx={star.x}
            cy={star.y}
            r={r + 14}
            fill="none"
            stroke={color}
            strokeOpacity={0.8}
            strokeWidth={1.4}
            animate={{ scale: [1, 1.35, 1], opacity: [0.85, 0, 0.85] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: 'easeOut' }}
            style={{ transformOrigin: `${star.x}px ${star.y}px` }}
          />
          <motion.circle
            cx={star.x}
            cy={star.y}
            r={r + 10}
            fill="none"
            stroke={color}
            strokeOpacity={0.5}
            strokeWidth={1}
            animate={{ scale: [1, 1.55, 1], opacity: [0.55, 0, 0.55] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeOut', delay: 1.5 }}
            style={{ transformOrigin: `${star.x}px ${star.y}px` }}
          />
        </>
      )}
      {/* core (with cross-spike for hero stars) */}
      <circle
        cx={star.x}
        cy={star.y}
        r={r}
        fill={color}
        style={{ filter: `drop-shadow(0 0 ${isHero ? 16 : 8}px ${color})` }}
      />
      {isHero && (
        <g style={{ pointerEvents: 'none' }}>
          {/* 4-point starburst spikes */}
          <line x1={star.x - r * 3} y1={star.y} x2={star.x + r * 3} y2={star.y} stroke={color} strokeWidth={0.8} strokeOpacity={0.7} strokeLinecap="round" />
          <line x1={star.x} y1={star.y - r * 3} x2={star.x} y2={star.y + r * 3} stroke={color} strokeWidth={0.8} strokeOpacity={0.7} strokeLinecap="round" />
        </g>
      )}
      {/* bright core hot-spot */}
      <motion.circle
        cx={star.x}
        cy={star.y}
        r={r * 0.55}
        fill="#fff"
        animate={{ opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 2 + (star.id.charCodeAt(0) % 4) * 0.5, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* label */}
      <foreignObject
        x={star.x - 180}
        y={star.y + r + 14}
        width={360}
        height={100}
        style={{ pointerEvents: 'none' }}
      >
        <div
          style={{
            textAlign: 'center',
            color: '#fff',
            fontFamily: 'var(--font-display)',
            fontSize: isHero ? (star.kind === 'guiding' ? 32 : 28) : 16,
            fontWeight: isHero ? 500 : 400,
            letterSpacing: isHero ? '0.06em' : '0.01em',
            lineHeight: 1.18,
            textShadow: '0 2px 16px rgba(0,0,0,0.85), 0 0 32px rgba(0,0,0,0.6)',
          }}
        >
          <div style={{
            fontStyle: isHero ? 'normal' : 'italic',
            textTransform: star.kind === 'guiding' ? 'uppercase' : 'none',
            color: star.kind === 'guiding' ? '#FFD96B' : '#fff',
          }}>
            {star.label}
          </div>
          {star.sublabel && (
            <div style={{
              fontSize: isHero ? 11 : 10,
              opacity: 0.68,
              fontFamily: 'var(--font-mono)',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              marginTop: 6,
              fontWeight: 600,
            }}>
              {star.sublabel}
            </div>
          )}
        </div>
      </foreignObject>

      {/* clickable hit-target (bigger than glow for easier clicks) */}
      <circle
        cx={star.x}
        cy={star.y}
        r={Math.max(r + 14, 24)}
        fill="transparent"
        style={{ cursor: 'pointer' }}
      />
    </motion.g>
  )
}

// ────────────────────────────────────────────────────────────────────
// One connecting line — drawn via pathLength
// ────────────────────────────────────────────────────────────────────

function LineNode({
  line, scrollProgress,
}: {
  line: Line
  scrollProgress: MotionValue<number>
}) {
  const from = lookupStar(line.from)
  const to = lookupStar(line.to)
  if (!from || !to) return null

  const pathLength = useTransform(
    scrollProgress,
    [line.revealAt, line.revealAt + REVEAL_RANGE * 1.4],
    [0, 1]
  )
  const opacity = useTransform(
    scrollProgress,
    [line.revealAt, line.revealAt + REVEAL_RANGE],
    [0, line.weight === 'medium' ? 0.85 : 0.45]
  )

  const d = `M ${from.x} ${from.y} L ${to.x} ${to.y}`

  return (
    <>
      {/* Soft glow layer */}
      <motion.path
        d={d}
        stroke="#FFD96B"
        strokeWidth={line.weight === 'medium' ? 6 : 3}
        strokeLinecap="round"
        fill="none"
        style={{ pathLength, opacity, filter: 'blur(4px)' }}
      />
      {/* Crisp dashed line */}
      <motion.path
        d={d}
        stroke="#FFE9A8"
        strokeWidth={line.weight === 'medium' ? 1.6 : 1}
        strokeLinecap="round"
        strokeDasharray="3 6"
        fill="none"
        style={{ pathLength, opacity }}
      />
    </>
  )
}

// ────────────────────────────────────────────────────────────────────
// Detail panel — opens when a star is clicked
// ────────────────────────────────────────────────────────────────────

function DetailPanel({ star, onClose }: { star: Star; onClose: () => void }) {
  return (
    <motion.div
      key={star.id}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.28 }}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 220,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
        background: 'rgba(8, 16, 28, 0.55)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
      }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <motion.div
        initial={{ y: 32, opacity: 0, scale: 0.96 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 16, opacity: 0, scale: 0.97 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        onClick={e => e.stopPropagation()}
        style={{
          maxWidth: 520,
          width: '100%',
          background: 'linear-gradient(180deg, #0d2435 0%, #0a1c2a 100%)',
          color: '#fff',
          padding: '40px 36px 36px',
          borderRadius: 16,
          border: '1px solid rgba(255,255,255,0.1)',
          boxShadow: '0 32px 80px rgba(0,0,0,0.6), 0 0 80px rgba(232, 163, 23, 0.05) inset',
          position: 'relative',
        }}
      >
        <button
          onClick={onClose}
          aria-label="Close"
          style={{
            position: 'absolute', top: 14, right: 14,
            background: 'transparent', border: 'none', color: 'rgba(255,255,255,0.6)',
            cursor: 'pointer', padding: 6, display: 'flex',
          }}
        >
          <X size={18} />
        </button>

        {star.sublabel && (
          <div style={{
            fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.16em',
            textTransform: 'uppercase', color: STAR_COLOR[star.kind], marginBottom: 12,
          }}>
            {star.sublabel}
          </div>
        )}
        <h3 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 32,
          fontWeight: 500,
          color: '#fff',
          marginBottom: 18,
          lineHeight: 1.15,
        }}>
          {star.label}
        </h3>
        <p style={{
          fontSize: 16,
          lineHeight: 1.65,
          color: 'rgba(255,255,255,0.78)',
          margin: 0,
        }}>
          {star.description}
        </p>

        {(star.kind === 'guiding' || star.kind === 'vision') && (
          <div style={{
            marginTop: 28, paddingTop: 20, borderTop: '1px solid rgba(255,255,255,0.1)',
            fontSize: 12, color: 'rgba(255,255,255,0.5)', letterSpacing: '0.08em',
          }}>
            {star.kind === 'guiding' ? 'A guiding star of the Pacific Arts Strategy' : 'Our vision for Toi Aotearoa'}
          </div>
        )}
      </motion.div>
    </motion.div>
  )
}

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

export function PacificStrategyConstellation() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

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
            Scroll down to draw the constellation. Click any star to read its meaning.
          </motion.p>
        </div>

        {/* Sticky-scroll constellation */}
        <div ref={sectionRef} className="strategy-scroll">
          <div className="strategy-sticky">
            {/* Layer 1 — deep space shader (no paper fade in nightsky mode) */}
            <ShaderBackground palette="nightsky" intensity="subtle" speed={0.04} />

            {/* Layer 2 — nebula bloom radial gradients */}
            <div className="strategy-nebula" aria-hidden="true">
              <div className="strategy-nebula-blob strategy-nebula-blob--moana" />
              <div className="strategy-nebula-blob strategy-nebula-blob--pohutukawa" />
              <div className="strategy-nebula-blob strategy-nebula-blob--kowhai" />
            </div>

            {/* Layer 3 — dense star-field (250 stars, varying brightness) */}
            <svg className="strategy-stars-bg" viewBox="0 0 1600 1000" preserveAspectRatio="xMidYMid slice">
              {Array.from({ length: 250 }).map((_, i) => {
                const x = ((i * 211) % 1600)
                const y = ((i * 367) % 1000)
                const tier = i % 11
                const r = tier === 0 ? 1.8 : tier < 3 ? 1.2 : 0.6
                const opacity = tier === 0 ? 0.95 : tier < 3 ? 0.65 : 0.32
                return <circle key={i} cx={x} cy={y} r={r} fill="#fff" opacity={opacity} />
              })}
              {/* twinkling brighter stars */}
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

            {/* Layer 4 — shooting stars (occasional) */}
            <ShootingStars />

            {/* The constellation itself */}
            <svg
              className="strategy-canvas"
              viewBox="0 0 1600 1000"
              preserveAspectRatio="xMidYMid meet"
              role="img"
              aria-label="Pacific Arts Strategy constellation"
            >
              {LINES.map((line, i) => (
                <LineNode key={i} line={line} scrollProgress={scrollYProgress} />
              ))}
              {STARS.map(star => (
                <StarNode
                  key={star.id}
                  star={star}
                  scrollProgress={scrollYProgress}
                  onClick={setSelectedId}
                  isActive={selectedId === star.id}
                />
              ))}
            </svg>

            <div className="strategy-hint" aria-hidden="true">
              Scroll to draw the constellation · Click a star to explore
            </div>
          </div>
        </div>
      </section>

      <FoundationStrip />

      <AnimatePresence>
        {selected && <DetailPanel star={selected} onClose={() => setSelectedId(null)} />}
      </AnimatePresence>
    </>
  )
}
