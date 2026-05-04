import { AnimatePresence, motion, MotionValue, useScroll, useTransform } from 'framer-motion'
import { useRef, useState } from 'react'
import { X } from 'lucide-react'
import { STARS, LINES, FOUNDATION_STRIP, type Star, type Line } from '@/data/strategy'
import { ShaderBackground } from './ShaderBackground'

// ────────────────────────────────────────────────────────────────────
// Star rendering helpers
// ────────────────────────────────────────────────────────────────────

const STAR_RADIUS: Record<Star['kind'], number> = {
  guiding: 14,
  vision: 16,
  aspiration: 7,
  value: 8,
  support: 6,
}
const STAR_GLOW: Record<Star['kind'], number> = {
  guiding: 38,
  vision: 44,
  aspiration: 16,
  value: 18,
  support: 12,
}
const STAR_COLOR: Record<Star['kind'], string> = {
  guiding: '#FBE6A2',     // bright amber
  vision: '#FFFFFF',
  aspiration: '#E8E0B0',
  value: '#9DD0E8',
  support: '#C9D8E8',
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
      {/* outer glow */}
      <motion.circle
        cx={star.x}
        cy={star.y}
        r={glowR}
        fill={color}
        opacity={isActive ? 0.32 : 0.14}
        animate={{
          opacity: [isActive ? 0.34 : 0.12, isActive ? 0.5 : 0.22, isActive ? 0.34 : 0.12],
        }}
        transition={{ duration: 4 + (isHero ? 0 : 2), repeat: Infinity, ease: 'easeInOut' }}
        style={{ filter: 'blur(8px)' }}
      />
      {/* inner halo ring (guiding stars only) */}
      {isHero && (
        <motion.circle
          cx={star.x}
          cy={star.y}
          r={r + 8}
          fill="none"
          stroke={color}
          strokeOpacity={0.5}
          strokeWidth={1}
          animate={{ scale: [1, 1.18, 1], opacity: [0.6, 0.15, 0.6] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          style={{ transformOrigin: `${star.x}px ${star.y}px` }}
        />
      )}
      {/* core */}
      <circle
        cx={star.x}
        cy={star.y}
        r={r}
        fill={color}
        style={{ filter: isHero ? `drop-shadow(0 0 6px ${color})` : undefined }}
      />
      {/* idle twinkle */}
      <motion.circle
        cx={star.x}
        cy={star.y}
        r={r * 0.5}
        fill="#fff"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2 + Math.random() * 2, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* label */}
      <foreignObject
        x={star.x - 140}
        y={star.y + r + 10}
        width={280}
        height={70}
        style={{ pointerEvents: 'none' }}
      >
        <div
          style={{
            textAlign: 'center',
            color: '#fff',
            fontFamily: 'var(--font-display)',
            fontSize: isHero ? 18 : 13,
            fontWeight: isHero ? 500 : 400,
            letterSpacing: isHero ? '0.04em' : 0,
            lineHeight: 1.25,
            textShadow: '0 1px 8px rgba(0,0,0,0.5)',
          }}
        >
          <div style={{ fontStyle: isHero ? 'normal' : 'italic' }}>{star.label}</div>
          {star.sublabel && (
            <div style={{ fontSize: isHero ? 11 : 10, opacity: 0.6, fontFamily: 'var(--font-mono)', letterSpacing: '0.12em', textTransform: 'uppercase', marginTop: 2 }}>
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
    [0, line.weight === 'medium' ? 0.45 : 0.22]
  )

  const d = `M ${from.x} ${from.y} L ${to.x} ${to.y}`

  return (
    <motion.path
      d={d}
      stroke="#FBE6A2"
      strokeWidth={line.weight === 'medium' ? 1.4 : 0.8}
      strokeLinecap="round"
      strokeDasharray="2 4"
      fill="none"
      style={{ pathLength, opacity }}
    />
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
            <ShaderBackground palette="pasifika" intensity="subtle" speed={0.06} />
            {/* fixed star-field background — random tiny static stars */}
            <svg className="strategy-stars-bg" viewBox="0 0 1600 1000" preserveAspectRatio="xMidYMid slice">
              {Array.from({ length: 90 }).map((_, i) => {
                const x = Math.floor((i * 173) % 1600)
                const y = Math.floor((i * 263) % 1000)
                const r = (i % 5 === 0) ? 1.2 : 0.7
                return <circle key={i} cx={x} cy={y} r={r} fill="#fff" opacity={0.18} />
              })}
            </svg>

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
