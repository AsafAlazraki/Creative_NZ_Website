import { motion, useScroll, useTransform } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

interface KoruInstance {
  size: number
  top: string
  left: string
  rotate: number
  opacity: number
  duration: number
  direction: 1 | -1
  parallaxStrength: number
}

const DEFAULT_KORU: KoruInstance[] = [
  { size: 520, top: '-12%', left: '-8%',  rotate: -15, opacity: 0.09, duration: 80,  direction:  1, parallaxStrength: 80  },
  { size: 380, top: '38%',  left: '76%',  rotate:  35, opacity: 0.07, duration: 100, direction: -1, parallaxStrength: 140 },
  { size: 300, top: '70%',  left: '8%',   rotate: 110, opacity: 0.08, duration: 90,  direction:  1, parallaxStrength: 100 },
  { size: 240, top: '12%',  left: '52%',  rotate:  -50, opacity: 0.05, duration: 120, direction: -1, parallaxStrength: 60  },
]

function useResponsiveScale() {
  const [scale, setScale] = useState(1)
  useEffect(() => {
    const update = () => {
      const w = window.innerWidth
      if (w < 480) setScale(0.45)
      else if (w < 768) setScale(0.6)
      else if (w < 1024) setScale(0.8)
      else setScale(1)
    }
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])
  return scale
}

interface DriftingKoruProps {
  koru?: KoruInstance[]
  color?: string
  /** parallax-link to nearest scroll container; pass false to disable */
  parallax?: boolean
}

export function DriftingKoru({ koru = DEFAULT_KORU, color = 'var(--kowhai)', parallax = true }: DriftingKoruProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll(parallax ? { target: containerRef, offset: ['start end', 'end start'] } : {})
  const scale = useResponsiveScale()

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
        zIndex: 0,
      }}
    >
      {koru.map((k, i) => (
        <DriftSpiral
          key={i}
          k={{ ...k, size: Math.round(k.size * scale) }}
          color={color}
          scrollYProgress={scrollYProgress}
          parallax={parallax}
        />
      ))}
    </div>
  )
}

function DriftSpiral({
  k, color, scrollYProgress, parallax,
}: {
  k: KoruInstance
  color: string
  scrollYProgress: ReturnType<typeof useScroll>['scrollYProgress']
  parallax: boolean
}) {
  const y = useTransform(scrollYProgress, [0, 1], parallax ? [0, -k.parallaxStrength] : [0, 0])

  return (
    <motion.div
      style={{
        position: 'absolute',
        top: k.top,
        left: k.left,
        width: k.size,
        height: k.size,
        opacity: k.opacity,
        y,
      }}
    >
      <motion.svg
        viewBox="0 0 120 120"
        width={k.size}
        height={k.size}
        animate={{ rotate: k.rotate + 360 * k.direction }}
        transition={{ duration: k.duration, ease: 'linear', repeat: Infinity }}
        style={{ display: 'block' }}
      >
        <path
          d="M 60 100 C 60 100 24 92 24 58 C 24 32 42 20 60 20 C 78 20 90 32 90 50 C 90 68 78 76 66 76 C 54 76 46 68 46 60 C 46 52 54 48 58 48 C 62 48 66 52 66 56"
          fill="none"
          stroke={color}
          strokeWidth="1.4"
          strokeLinecap="round"
        />
        <circle cx="66" cy="56" r="2.5" fill={color} />
      </motion.svg>
    </motion.div>
  )
}
