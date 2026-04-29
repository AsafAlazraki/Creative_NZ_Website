import { motion } from 'framer-motion'
import { CSSProperties } from 'react'

interface OceanWavesProps {
  color?: string
  opacity?: number
  height?: number
  speed?: number
  lines?: number
  style?: CSSProperties
}

/**
 * Animated horizontal SVG wave-lines flowing slowly. Pacific ocean current feel.
 * Use as section divider or ambient band.
 */
export function OceanWaves({
  color = 'var(--moana)',
  opacity = 0.4,
  height = 120,
  speed = 1,
  lines = 4,
  style,
}: OceanWavesProps) {
  // Scale wave height down on smaller screens via CSS clamp
  const responsiveHeight = `clamp(${Math.round(height * 0.5)}px, ${height / 8}vw, ${height}px)`
  const lineSet = Array.from({ length: lines }, (_, i) => ({
    yOffset: (i / lines) * height,
    amplitude: 8 + i * 4,
    duration: (28 + i * 6) / speed,
    direction: i % 2 === 0 ? 1 : -1,
    strokeOpacity: 0.4 + (i / lines) * 0.6,
  }))

  return (
    <div
      aria-hidden="true"
      style={{
        width: '100%',
        height: responsiveHeight,
        overflow: 'hidden',
        position: 'relative',
        opacity,
        ...style,
      }}
    >
      <svg
        width="100%"
        height="100%"
        viewBox={`0 0 1440 ${height}`}
        preserveAspectRatio="none"
        style={{ display: 'block', position: 'absolute', inset: 0 }}
      >
        {lineSet.map((l, i) => {
          const path = buildWavePath(1440 * 2, l.yOffset, l.amplitude, height)
          return (
            <motion.path
              key={i}
              d={path}
              fill="none"
              stroke={color}
              strokeWidth="1"
              strokeOpacity={l.strokeOpacity}
              animate={{ x: l.direction === 1 ? [-1440, 0] : [0, -1440] }}
              transition={{ duration: l.duration, ease: 'linear', repeat: Infinity }}
            />
          )
        })}
      </svg>
    </div>
  )
}

function buildWavePath(totalWidth: number, yOffset: number, amplitude: number, totalHeight: number) {
  const cy = (totalHeight - yOffset / 2) + Math.sin(yOffset) * 4
  const segments = 16
  const segmentWidth = totalWidth / segments
  let d = `M 0 ${cy}`
  for (let i = 0; i < segments; i++) {
    const x1 = segmentWidth * i + segmentWidth * 0.25
    const y1 = cy + (i % 2 === 0 ? -amplitude : amplitude)
    const x2 = segmentWidth * i + segmentWidth * 0.75
    const y2 = cy + (i % 2 === 0 ? amplitude : -amplitude)
    const x = segmentWidth * (i + 1)
    d += ` C ${x1} ${y1}, ${x2} ${y2}, ${x} ${cy}`
  }
  return d
}
