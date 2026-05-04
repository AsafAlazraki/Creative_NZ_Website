import { useMemo } from 'react'

/**
 * Editorial illustrated portrait — used in place of stock photos for
 * Council members and Advisers. Each person gets a brand-coloured
 * "card" with a large koru watermark, big italic initials bottom-left,
 * and a subtle radial highlight that gives it a printed-poster feel.
 *
 * This reads as intentional design rather than a wireframe placeholder.
 */

const PALETTES: Array<{ bg: string; deeper: string; ink: string; mark: string }> = [
  { bg: '#1E5F74', deeper: '#0e3a48', ink: '#fff7e0', mark: '#FFD96B' },   // moana / kowhai
  { bg: '#C8463C', deeper: '#7d2620', ink: '#fff7e0', mark: '#FFE9A8' },   // pohutukawa / cream
  { bg: '#3F5E3A', deeper: '#1f3a1c', ink: '#fff7e0', mark: '#FFD96B' },   // bush / kowhai
  { bg: '#E8A317', deeper: '#9c6a08', ink: '#1a1208', mark: '#1a1208' },   // kowhai / ink
  { bg: '#6B4423', deeper: '#3d2612', ink: '#fff7e0', mark: '#E8A317' },   // siapo / kowhai
  { bg: '#0a3f50', deeper: '#031e28', ink: '#fff7e0', mark: '#67A9C6' },   // deep moana / soft moana
  { bg: '#B87C0A', deeper: '#6d4504', ink: '#fff7e0', mark: '#FFE9A8' },   // deep kowhai / cream
  { bg: '#2c3e2a', deeper: '#152217', ink: '#fff7e0', mark: '#E8A317' },   // forest / kowhai
]

interface PersonPortraitProps {
  name: string
  /** Used to deterministically pick a palette so the same name always gets the same card */
  index?: number
  /** Aspect ratio of the portrait */
  aspectRatio?: string
  /** Optional accent label rendered in the bottom-right (e.g. iwi, region, role tag) */
  accent?: string
}

export function PersonPortrait({
  name,
  index = 0,
  aspectRatio = '4/5',
  accent,
}: PersonPortraitProps) {
  const palette = PALETTES[index % PALETTES.length]
  const initials = useMemo(
    () => name.split(' ').filter(Boolean).slice(0, 2).map(w => w[0]?.toUpperCase() ?? '').join(''),
    [name]
  )

  // Per-instance koru position so the watermark doesn't sit identically on every card
  const seed = (name.charCodeAt(0) * 31) + (name.charCodeAt(1) || 0)
  const koruRotate = (seed * 13) % 360
  const koruOffsetX = ((seed * 7) % 30) - 15      // -15% to +15%
  const koruOffsetY = ((seed * 11) % 24) - 12     // -12% to +12%

  return (
    <div
      className="person-portrait"
      style={{
        position: 'relative',
        width: '100%',
        aspectRatio,
        overflow: 'hidden',
        borderRadius: 'var(--r-md)',
        background: `linear-gradient(155deg, ${palette.bg} 0%, ${palette.deeper} 100%)`,
        color: palette.ink,
      }}
      role="img"
      aria-label={`Portrait of ${name}`}
    >
      {/* Koru watermark */}
      <svg
        viewBox="0 0 120 120"
        style={{
          position: 'absolute',
          inset: 0,
          width: '160%',
          height: '160%',
          left: `${-30 + koruOffsetX}%`,
          top: `${-30 + koruOffsetY}%`,
          transform: `rotate(${koruRotate}deg)`,
          opacity: 0.18,
          mixBlendMode: 'overlay',
          pointerEvents: 'none',
        }}
        aria-hidden="true"
      >
        <path
          d="M 60 100 C 60 100 24 92 24 58 C 24 32 42 20 60 20 C 78 20 90 32 90 50 C 90 68 78 76 66 76 C 54 76 46 68 46 60 C 46 52 54 48 58 48 C 62 48 66 52 66 56"
          fill="none"
          stroke={palette.mark}
          strokeWidth="3"
          strokeLinecap="round"
        />
        <circle cx="66" cy="56" r="5" fill={palette.mark} />
      </svg>

      {/* Soft radial highlight (top-left) */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse at 18% 22%, rgba(255,255,255,0.18) 0%, transparent 55%)',
          pointerEvents: 'none',
        }}
      />

      {/* Subtle film grain */}
      <svg
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          opacity: 0.18,
          mixBlendMode: 'overlay',
          pointerEvents: 'none',
        }}
        aria-hidden="true"
      >
        <filter id={`portrait-grain-${index}`}>
          <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" stitchTiles="stitch" />
          <feColorMatrix values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.7 0" />
        </filter>
        <rect width="100%" height="100%" filter={`url(#portrait-grain-${index})`} />
      </svg>

      {/* Initials — bottom-left, display italic */}
      <div
        style={{
          position: 'absolute',
          left: '6%',
          bottom: '6%',
          fontFamily: 'var(--font-display)',
          fontStyle: 'italic',
          fontWeight: 400,
          fontSize: 'clamp(56px, 14vw, 120px)',
          lineHeight: 0.85,
          color: palette.ink,
          letterSpacing: '-0.04em',
          mixBlendMode: 'soft-light',
          textShadow: '0 2px 12px rgba(0,0,0,0.18)',
        }}
      >
        {initials}
      </div>

      {/* Small accent label — top-right */}
      {accent && (
        <div
          style={{
            position: 'absolute',
            top: '8%',
            right: '8%',
            fontFamily: 'var(--font-mono)',
            fontSize: 10,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: palette.mark,
            opacity: 0.85,
            fontWeight: 600,
          }}
        >
          {accent}
        </div>
      )}

      {/* Bottom kowhai accent line — only on darker palettes */}
      {palette.bg !== '#E8A317' && (
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            height: 3,
            width: '32%',
            background: palette.mark,
          }}
        />
      )}
    </div>
  )
}
