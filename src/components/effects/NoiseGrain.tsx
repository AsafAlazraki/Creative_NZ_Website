import { CSSProperties } from 'react'

interface NoiseGrainProps {
  opacity?: number
  blendMode?: 'multiply' | 'overlay' | 'soft-light' | 'normal'
  style?: CSSProperties
  fixed?: boolean
}

/**
 * SVG fractal-noise overlay for organic grain texture.
 * Stack on top of any section to add filmic warmth.
 */
export function NoiseGrain({
  opacity = 0.06,
  blendMode = 'multiply',
  style,
  fixed = false,
}: NoiseGrainProps) {
  return (
    <div
      aria-hidden="true"
      style={{
        position: fixed ? 'fixed' : 'absolute',
        inset: 0,
        pointerEvents: 'none',
        opacity,
        mixBlendMode: blendMode,
        zIndex: 1,
        ...style,
      }}
    >
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <filter id="cnz-grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" stitchTiles="stitch" />
          <feColorMatrix values="0 0 0 0 0.1  0 0 0 0 0.08  0 0 0 0 0.05  0 0 0 1 0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#cnz-grain)" />
      </svg>
    </div>
  )
}
