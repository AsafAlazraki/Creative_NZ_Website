import { CSSProperties, useId } from 'react'

interface SiapoPatternProps {
  variant?: 'diamonds' | 'triangles' | 'crosshatch' | 'rays'
  color?: string
  opacity?: number
  size?: number
  style?: CSSProperties
  className?: string
}

/**
 * Pacific tapa-cloth (siapo / ngatu) inspired SVG patterns.
 * Used as section dividers, hover textures, and ambient overlays.
 */
export function SiapoPattern({
  variant = 'diamonds',
  color = 'var(--ink)',
  opacity = 0.06,
  size = 48,
  style,
  className,
}: SiapoPatternProps) {
  const id = useId().replace(/[:]/g, '')
  const patternId = `siapo-${variant}-${id}`

  return (
    <div
      aria-hidden="true"
      className={className}
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        opacity,
        ...style,
      }}
    >
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id={patternId} x="0" y="0" width={size} height={size} patternUnits="userSpaceOnUse">
            {variant === 'diamonds' && (
              <>
                <path
                  d={`M ${size / 2} 4 L ${size - 4} ${size / 2} L ${size / 2} ${size - 4} L 4 ${size / 2} Z`}
                  fill="none"
                  stroke={color}
                  strokeWidth="1.2"
                />
                <circle cx={size / 2} cy={size / 2} r="2" fill={color} />
              </>
            )}
            {variant === 'triangles' && (
              <>
                <path d={`M 0 ${size} L ${size / 2} 0 L ${size} ${size} Z`} fill="none" stroke={color} strokeWidth="1" />
                <path d={`M ${size / 4} ${size} L ${size / 2} ${size / 2} L ${(size * 3) / 4} ${size} Z`} fill={color} fillOpacity="0.5" />
              </>
            )}
            {variant === 'crosshatch' && (
              <>
                <line x1="0" y1="0" x2={size} y2={size} stroke={color} strokeWidth="0.8" />
                <line x1={size} y1="0" x2="0" y2={size} stroke={color} strokeWidth="0.8" />
                <circle cx={size / 2} cy={size / 2} r="2.5" fill="none" stroke={color} strokeWidth="0.8" />
              </>
            )}
            {variant === 'rays' && (
              <>
                <circle cx={size / 2} cy={size / 2} r="3" fill={color} />
                {[0, 45, 90, 135, 180, 225, 270, 315].map(angle => (
                  <line
                    key={angle}
                    x1={size / 2}
                    y1={size / 2}
                    x2={size / 2 + Math.cos((angle * Math.PI) / 180) * (size / 2 - 4)}
                    y2={size / 2 + Math.sin((angle * Math.PI) / 180) * (size / 2 - 4)}
                    stroke={color}
                    strokeWidth="0.8"
                    opacity="0.7"
                  />
                ))}
              </>
            )}
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#${patternId})`} />
      </svg>
    </div>
  )
}

/**
 * Horizontal divider strip with tapa pattern + fade edges.
 */
export function SiapoDivider({
  variant = 'diamonds',
  color = 'var(--ink)',
  height = 56,
}: {
  variant?: SiapoPatternProps['variant']
  color?: string
  height?: number
}) {
  return (
    <div
      aria-hidden="true"
      style={{
        position: 'relative',
        height,
        overflow: 'hidden',
        WebkitMask: 'linear-gradient(to right, transparent, black 12%, black 88%, transparent)',
        mask: 'linear-gradient(to right, transparent, black 12%, black 88%, transparent)',
        margin: '0 auto',
      }}
    >
      <SiapoPattern variant={variant} color={color} opacity={0.18} size={height} />
    </div>
  )
}
