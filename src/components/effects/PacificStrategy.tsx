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
      {/* §6 — Selection glow ring (shows when this node is the active one).
         Two pulsing rings + a soft kowhai-tinted bloom replace the bare
         <rect> outline of earlier iterations. */}
      {isActive && (
        <g aria-hidden="true">
          <circle cx={star.x} cy={star.y} r={r + 28} fill="rgba(232,163,23,0.06)" />
          <circle cx={star.x} cy={star.y} r={r + 10} fill="none"
                  stroke="var(--kowhai)" strokeWidth={1} opacity={0.4} />
          <motion.circle
            cx={star.x} cy={star.y} r={r + 18} fill="none"
            stroke="var(--kowhai)" strokeWidth={1.4}
            initial={{ opacity: 0.65 }}
            animate={{ opacity: [0.65, 0.18, 0.65], scale: [1, 1.18, 1] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
            style={{ transformOrigin: `${star.x}px ${star.y}px` }}
          />
        </g>
      )}
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
      {/* §5 — Sonar pulse on guiding stars only (drives discovery without
         drowning the canvas). Staggered per-star via star.id char code. */}
      {star.kind === 'guiding' && (
        <motion.circle
          cx={star.x} cy={star.y} r={r + 4}
          fill="none" stroke={color}
          strokeWidth={1}
          initial={{ opacity: 0 }}
          animate={{ scale: [1, 2.6, 2.6], opacity: [0.55, 0, 0] }}
          transition={{
            duration: 2.4,
            repeat: Infinity,
            ease: 'easeOut',
            delay: (star.id.charCodeAt(0) % 7) * 0.4,
          }}
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
// TriangleFramework (§2) — visual pyramid drawn over the right-side
// stars (vision / purpose-values / focus-areas / strategies-policies /
// mata-alii). The five existing stars become the layer markers; this
// component traces the pyramid outline + horizontal divider lines
// + labels each layer with its strategic role.
// ────────────────────────────────────────────────────────────────────

function TriangleFramework({ drawn }: { drawn: boolean }) {
  // Apex at vision (1380, 200), base spanning strategies-policies
  // (1080, 720) → te-waka-toi (1430, 700). Build the outline + 4 cross
  // dividers (one per layer).
  const apex = { x: 1380, y: 160 }
  const baseL = { x: 980,  y: 760 }
  const baseR = { x: 1520, y: 760 }
  const dividers = [
    { y: 360, label: 'Purpose & values', sub: 'Including Mana Pasifika' },
    { y: 510, label: 'Strategic focus', sub: 'Resilience · Access · Wellbeing' },
    { y: 640, label: 'Te Waka Toi Pātaka', sub: 'Mātauranga Māori framework' },
  ]

  // Linear interp along each side of the triangle to find x for a given y
  const lerpX = (y: number, side: 'l' | 'r') => {
    const target = side === 'l' ? baseL : baseR
    const t = (y - apex.y) / (target.y - apex.y)
    return apex.x + (target.x - apex.x) * t
  }

  // Path lengths control the draw-in animation
  const sideLen = Math.hypot(apex.x - baseL.x, apex.y - baseL.y)
  return (
    <g aria-hidden="true">
      {/* Triangle outline */}
      <g style={{ opacity: drawn ? 1 : 0, transition: 'opacity 0.8s 0.4s ease' }}>
        <path
          d={`M ${apex.x} ${apex.y} L ${baseL.x} ${baseL.y} L ${baseR.x} ${baseR.y} Z`}
          fill="none"
          stroke="#FFD96B"
          strokeOpacity={0.18}
          strokeWidth={1.2}
          strokeDasharray="2 6"
          style={{
            strokeDashoffset: drawn ? 0 : sideLen * 3,
            transition: 'stroke-dashoffset 1.8s 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        />
        {/* Horizontal layer dividers */}
        {dividers.map((d, i) => {
          const lx = lerpX(d.y, 'l')
          const rx = lerpX(d.y, 'r')
          return (
            <g key={i}>
              <line
                x1={lx} y1={d.y} x2={rx} y2={d.y}
                stroke="#FFD96B"
                strokeOpacity={0.12}
                strokeWidth={0.8}
                strokeDasharray="2 5"
              />
              <foreignObject x={rx + 12} y={d.y - 18} width={220} height={42} pointerEvents="none">
                <div style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 9.5,
                  letterSpacing: '0.16em',
                  textTransform: 'uppercase',
                  color: 'rgba(255,217,107,0.7)',
                  fontWeight: 600,
                  whiteSpace: 'nowrap',
                  textShadow: '0 1px 8px rgba(0,0,0,0.8)',
                }}>
                  {d.label}
                </div>
                <div style={{
                  fontFamily: 'var(--font-display)',
                  fontStyle: 'italic',
                  fontSize: 11.5,
                  color: 'rgba(255,255,255,0.55)',
                  whiteSpace: 'nowrap',
                  marginTop: 2,
                  textShadow: '0 1px 6px rgba(0,0,0,0.7)',
                }}>
                  {d.sub}
                </div>
              </foreignObject>
            </g>
          )
        })}
        {/* Apex label */}
        <foreignObject x={apex.x - 80} y={apex.y - 56} width={160} height={50} pointerEvents="none">
          <div style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 9.5,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: 'rgba(255,217,107,0.85)',
            fontWeight: 700,
            textAlign: 'center',
            textShadow: '0 1px 8px rgba(0,0,0,0.8)',
          }}>
            Apex · Vision
          </div>
        </foreignObject>
      </g>
    </g>
  )
}

// ────────────────────────────────────────────────────────────────────
// CulturalContext (§9) — (i) icon + popover explaining the Pasifika
// wayfinding metaphor, so the star navigation makes sense to all users.
// ────────────────────────────────────────────────────────────────────

function CulturalContext() {
  const [open, setOpen] = useState(false)
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])
  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        aria-label={open ? 'Close cultural context' : 'About this metaphor'}
        aria-expanded={open}
        className="strategy-info-btn"
      >
        <Info size={14} aria-hidden="true" />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            role="dialog"
            aria-modal="false"
            aria-labelledby="strategy-context-title"
            initial={{ opacity: 0, y: -8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.96 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="strategy-info-panel"
          >
            <button
              onClick={() => setOpen(false)}
              aria-label="Close"
              className="strategy-info-panel-close"
            >
              <X size={14} />
            </button>
            <h4 id="strategy-context-title" className="strategy-info-panel-title">
              Navigating by the stars
            </h4>
            <p>
              Pacific peoples have navigated Te Moana-nui-a-Kiwa — the vast
              Pacific Ocean — by reading the stars for thousands of years.
            </p>
            <p>
              This strategy map uses that metaphor: the stars are our
              aspirations, the constellation of concepts is our vessel, and
              the connections between them chart our course.
            </p>
            <p className="strategy-info-source">
              Inspired by the Pacific Arts Strategy — Creative New Zealand · Toi Aotearoa
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

// ────────────────────────────────────────────────────────────────────
// PromptCard (§5) — top-left discovery affordance
// ────────────────────────────────────────────────────────────────────

const PROMPT_DISMISSED_KEY = 'cnz.strategyPromptDismissed'

function PromptCard({ onDismiss }: { onDismiss: () => void }) {
  return (
    <motion.div
      className="strategy-prompt"
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      role="status"
      aria-live="polite"
    >
      <span className="strategy-prompt-icon">✦</span>
      <span className="strategy-prompt-text">Tap any star to explore the strategy</span>
      <button onClick={onDismiss} aria-label="Dismiss" className="strategy-prompt-close">
        <X size={14} />
      </button>
    </motion.div>
  )
}

// Extended content per node — adds meaning, initiatives, whakataukī kupu
// and a related-funding link beyond the short `description` in STARS.
// Only the four guiding stars + vision get the full treatment; others
// fall back to just the description.
const NODE_EXTENDED: Record<string, {
  meaning?: string
  initiatives?: string[]
  kupu?: string
  fundingLink?: { label: string; href: string }
}> = {
  vaka: {
    meaning: 'Strong organisations are the vaka — the canoes — that navigate Pacific arts into the future across generations.',
    initiatives: [
      'Multi-year investment for Pacific arts organisations',
      'Governance and capability building',
      'Pacific festival infrastructure',
    ],
    kupu: 'He waka eke noa — we are all in this canoe together',
    fundingLink: { label: 'Organisations funding →', href: '/funding/organisations' },
  },
  tagata: {
    meaning: 'Every initiative starts with people — artists, ringatoi, rangatahi and kaumātua. Tagata is the heart of every pillar.',
    initiatives: [
      'Leadership pathways for emerging Pasifika artists',
      'Intergenerational knowledge transfer programmes',
      'Community arts hubs in Pacific communities',
    ],
    kupu: 'Ko te tangata te puna o te ora',
    fundingLink: { label: 'All Pasifika opportunities →', href: '/funding/opportunities?tier=pasifika' },
  },
  moana: {
    meaning: 'Moana is about relationships — with the Pacific diaspora, artists across the region, audiences worldwide.',
    initiatives: [
      'Pacific arts exchange programmes',
      'International touring support',
      'Digital platforms for Pacific arts',
    ],
    kupu: 'Tērā te Moana-nui-a-Kiwa — there lies the great ocean',
    fundingLink: { label: 'International opportunities →', href: '/funding/opportunities' },
  },
  va: {
    meaning: 'Vā is the relational space between people, communities and the environment — the conditions that make practice possible.',
    initiatives: [
      'Kaupapa Pasifika policy frameworks',
      'Pacific arts infrastructure investment',
      'Mana Pasifika in decision-making',
    ],
    kupu: 'Va fealoaloaʻi — the relational space',
    fundingLink: { label: 'Advice & support →', href: '/funding/advice' },
  },
  vision: {
    meaning: 'Our overarching kaupapa for Toi Aotearoa: a flourishing arts sector that contributes to the cultural, social and economic wellbeing of all New Zealanders.',
    initiatives: [
      'Resilient & adaptable Pacific arts ecosystem',
      'Equitable access to participate and create',
      'Global recognition for New Zealand arts',
    ],
    kupu: 'Mā te toi e ora ai te wairua — through art, the spirit lives',
    fundingLink: { label: 'About Creative NZ →', href: '/about' },
  },
}

function NodePanel({ star, onClose }: { star: Star; onClose: () => void }) {
  const accent = NODE_ACCENT[star.id] ?? STAR_COLOR[star.kind]
  const ext = NODE_EXTENDED[star.id]
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
    >
      <span className="strategy-node-panel-accent" style={{ background: accent }} aria-hidden="true" />
      <button onClick={onClose} aria-label="Close" className="strategy-node-panel-close">
        <X size={18} />
      </button>
      <header style={{ padding: '40px 36px 24px', position: 'relative' }}>
        {star.sublabel && (
          <div className="strategy-node-panel-eyebrow" style={{ color: 'var(--kowhai)' }}>
            {star.sublabel}
          </div>
        )}
        <h3 id={`node-panel-${star.id}-title`} className="strategy-node-panel-title">
          {star.label}
        </h3>
      </header>
      <div className="strategy-node-panel-body-wrap">
        <p className="strategy-node-panel-body">{star.description}</p>

        {ext?.meaning && (
          <section className="strategy-node-panel-section">
            <h4>What this means</h4>
            <p>{ext.meaning}</p>
          </section>
        )}

        {ext?.initiatives && ext.initiatives.length > 0 && (
          <section className="strategy-node-panel-section">
            <h4>Key initiatives</h4>
            <ul className="strategy-node-panel-list">
              {ext.initiatives.map((it, i) => <li key={i}>{it}</li>)}
            </ul>
          </section>
        )}

        {ext?.fundingLink && (
          <a href={ext.fundingLink.href} className="strategy-node-panel-cta">
            {ext.fundingLink.label}
          </a>
        )}
      </div>
      {ext?.kupu && (
        <footer className="strategy-node-panel-footer">
          <span className="strategy-node-panel-kupu">{ext.kupu}</span>
        </footer>
      )}
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

  // §5 — Prompt card: dismissed flag persisted across the session
  const [promptDismissed, setPromptDismissed] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false
    return sessionStorage.getItem(PROMPT_DISMISSED_KEY) === '1'
  })
  const dismissPrompt = () => {
    setPromptDismissed(true)
    try { sessionStorage.setItem(PROMPT_DISMISSED_KEY, '1') } catch {}
  }

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
            {/* §5 — Discovery prompt card, top-left, dismissible */}
            <AnimatePresence>
              {!promptDismissed && drawn && (
                <PromptCard onDismiss={dismissPrompt} />
              )}
            </AnimatePresence>

            {/* §9 — Cultural context (i) tooltip, top-right */}
            <CulturalContext />

            <svg
              className="strategy-canvas"
              viewBox="0 0 1600 1000"
              preserveAspectRatio="xMidYMid meet"
              role="img"
              aria-label="Pacific Arts Strategy constellation. Tap any star to open its description."
            >
              {/* §2 — Triangle framework outlining the right-side cluster */}
              <TriangleFramework drawn={drawn} />
              {/* §1 — Curved dotted connections */}
              {LINES.map((l, i) => (
                <ConnectionLine key={i} fromId={l.from} toId={l.to} weight={l.weight} drawn={drawn} />
              ))}
              {/* Stars (interactive) */}
              {STARS.map(star => (
                <StarNode
                  key={star.id}
                  star={star}
                  drawn={drawn}
                  onClick={(id) => { setSelectedId(id); dismissPrompt() }}
                  isActive={selectedId === star.id}
                />
              ))}
            </svg>

            {/* Keyboard nav hint for screen readers */}
            <span className="sr-only">
              Use Tab to move between strategy elements, Enter or Space to expand a star, Escape to close.
            </span>
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
