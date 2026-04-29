import { useRef, useEffect } from 'react'
import { motion, useInView, useMotionValue, useSpring } from 'framer-motion'

interface KoruSpiralProps {
  size?: number
  color?: string
  opacity?: number
  strokeWidth?: number
  className?: string
  style?: React.CSSProperties
  animate?: boolean
}

export function KoruSpiral({ size = 60, color = 'currentColor', opacity = 0.12, strokeWidth = 1.5, className = '', style = {}, animate = false }: KoruSpiralProps) {
  const ref = useRef<SVGPathElement>(null)
  const isInView = useInView({ current: ref.current ? { current: ref.current.ownerSVGElement } : { current: null } } as any)

  return (
    <svg viewBox="0 0 60 60" width={size} height={size} className={`koru-spiral ${className}`} style={{ display: 'block', ...style }} aria-hidden="true">
      <motion.path
        ref={ref}
        d="M 30 52 C 30 52 12 48 12 30 C 12 16 22 10 30 10 C 38 10 44 16 44 24 C 44 32 38 36 32 36 C 26 36 22 32 22 28 C 22 24 26 22 28 22 C 30 22 32 24 32 26"
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        opacity={opacity}
        initial={animate ? { pathLength: 0 } : undefined}
        animate={animate ? { pathLength: 1 } : undefined}
        transition={animate ? { duration: 2.5, ease: 'easeInOut' } : undefined}
      />
    </svg>
  )
}

interface KoruCornerProps {
  position?: 'tr' | 'tl' | 'br' | 'bl'
  size?: number
  color?: string
  opacity?: number
}

export function KoruCorner({ position = 'tr', size = 180, color = 'currentColor', opacity = 0.06 }: KoruCornerProps) {
  const positions = {
    tr: { top: 0, right: 0, transform: '' },
    tl: { top: 0, left: 0, transform: 'scaleX(-1)' },
    br: { bottom: 0, right: 0, transform: 'scaleY(-1)' },
    bl: { bottom: 0, left: 0, transform: 'scale(-1)' },
  }
  const pos = positions[position]
  return (
    <div style={{ position: 'absolute', ...pos, width: size, height: size, opacity, pointerEvents: 'none' }}>
      <svg viewBox="0 0 180 180" fill="none" stroke={color} strokeWidth="1.2" strokeLinecap="round" style={{ width: '100%', height: '100%' }}>
        <path d="M 140 160 C 140 160 100 150 100 110 C 100 80 118 65 138 65 C 155 65 165 78 165 92 C 165 106 155 114 145 114 C 135 114 128 106 128 98 C 128 90 134 86 140 86" />
        <path d="M 60 130 C 60 130 40 125 40 100 C 40 82 50 74 60 74 C 70 74 76 82 76 90 C 76 98 70 102 66 102 C 62 102 58 98 58 94" />
        <circle cx="30" cy="150" r="2.5" fill={color} />
        <circle cx="45" cy="155" r="2" fill={color} />
        <circle cx="35" cy="165" r="1.5" fill={color} />
        <path d="M 80 45 Q 100 25 120 45 Q 140 25 160 45" />
      </svg>
    </div>
  )
}

interface KoruBandProps {
  count?: number
  color?: string
  opacity?: number
  height?: number
  className?: string
}

export function KoruBand({ count = 16, color = 'var(--accent)', opacity = 0.15, height = 36, className = '' }: KoruBandProps) {
  const w = count * 52
  return (
    <svg viewBox={`0 0 ${w} 40`} preserveAspectRatio="xMidYMid slice" style={{ width: '100%', height, display: 'block' }} className={`koru-band ${className}`} aria-hidden="true">
      {Array.from({ length: count }).map((_, i) => (
        <g key={i} transform={`translate(${i * 52}, 0)`}>
          <path
            d="M 26 34 C 26 34 10 31 10 18 C 10 9 17 5 24 5 C 31 5 36 10 36 17 C 36 24 31 27 27 27 C 23 27 20 24 20 21 C 20 18 23 17 24 17 C 25 17 26 18 26 19"
            fill="none"
            stroke={color}
            strokeWidth="1.2"
            strokeLinecap="round"
            opacity={opacity}
          />
          <path d="M 26 36 L 26 40" stroke={color} strokeWidth="1.2" opacity={opacity * 0.5} />
        </g>
      ))}
    </svg>
  )
}

// Animated drawing koru for hero sections
export function AnimatedKoru({ size = 120, color = 'currentColor', opacity = 0.15, delay = 0 }: { size?: number; color?: string; opacity?: number; delay?: number }) {
  const ref = useRef<SVGSVGElement>(null)
  const isInView = useInView(ref, { once: true })

  return (
    <svg ref={ref} viewBox="0 0 120 120" width={size} height={size} aria-hidden="true" style={{ display: 'block' }}>
      <motion.path
        d="M 60 100 C 60 100 24 92 24 58 C 24 32 42 20 60 20 C 78 20 90 32 90 50 C 90 68 78 76 66 76 C 54 76 46 68 46 60 C 46 52 54 48 58 48 C 62 48 66 52 66 56"
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        opacity={opacity}
        initial={{ pathLength: 0 }}
        animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
        transition={{ duration: 3, ease: [0.16, 1, 0.3, 1], delay }}
      />
      <motion.circle
        cx="66"
        cy="56"
        r="3"
        fill={color}
        opacity={opacity}
        initial={{ scale: 0 }}
        animate={isInView ? { scale: 1 } : { scale: 0 }}
        transition={{ duration: 0.4, delay: delay + 2.8 }}
      />
    </svg>
  )
}

// Magnetic hover wrapper
export function MagneticHover({ children, strength = 0.3, className = '' }: { children: React.ReactNode; strength?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 200, damping: 20 })
  const springY = useSpring(y, { stiffness: 200, damping: 20 })

  const onMove = (e: React.MouseEvent) => {
    if (!ref.current) return
    const r = ref.current.getBoundingClientRect()
    x.set((e.clientX - r.left - r.width / 2) * strength)
    y.set((e.clientY - r.top - r.height / 2) * strength)
  }
  const onLeave = () => { x.set(0); y.set(0) }

  return (
    <motion.div ref={ref} className={className} style={{ x: springX, y: springY }} onMouseMove={onMove} onMouseLeave={onLeave}>
      {children}
    </motion.div>
  )
}

// Scroll reveal wrapper
export function ScrollReveal({ children, delay = 0, direction = 'up', distance = 32, className = '', style = {} }: {
  children: React.ReactNode
  delay?: number
  direction?: 'up' | 'down' | 'left' | 'right' | 'none'
  distance?: number
  className?: string
  style?: React.CSSProperties
}) {
  const directions = {
    up: { y: distance },
    down: { y: -distance },
    left: { x: distance },
    right: { x: -distance },
    none: {},
  }

  return (
    <motion.div
      className={className}
      style={style}
      initial={{ opacity: 0, ...directions[direction] }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1], delay }}
    >
      {children}
    </motion.div>
  )
}

// Staggered children
export function StaggerReveal({ children, stagger = 0.08, className = '' }: { children: React.ReactNode; stagger?: number; className?: string }) {
  const items = Array.isArray(children) ? children : [children]
  return (
    <div className={className}>
      {items.map((child, i) => (
        <ScrollReveal key={i} delay={i * stagger}>
          {child}
        </ScrollReveal>
      ))}
    </div>
  )
}

// Parallax image wrapper
export function ParallaxImage({ src, alt, speed = 0.15, style = {} }: { src: string; alt: string; speed?: number; style?: React.CSSProperties }) {
  const ref = useRef<HTMLDivElement>(null)
  const y = useMotionValue(0)

  useEffect(() => {
    const onScroll = () => {
      if (!ref.current) return
      const r = ref.current.getBoundingClientRect()
      const center = r.top + r.height / 2
      const viewCenter = window.innerHeight / 2
      y.set((center - viewCenter) * speed)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [speed, y])

  return (
    <div ref={ref} style={{ position: 'relative', overflow: 'hidden', ...style }}>
      <motion.img
        src={src}
        alt={alt}
        style={{ y, width: '100%', height: '115%', objectFit: 'cover', display: 'block', willChange: 'transform', marginTop: '-7.5%' }}
      />
    </div>
  )
}

// Animated counter
export function AnimatedCounter({ to, prefix = '', suffix = '', duration = 1800, className = '' }: {
  to: number; prefix?: string; suffix?: string; duration?: number; className?: string
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-40px' })
  const motionValue = useMotionValue(0)

  useEffect(() => {
    if (!isInView) return
    const startTime = performance.now()
    const tick = (now: number) => {
      const p = Math.min(1, (now - startTime) / duration)
      const eased = 1 - Math.pow(1 - p, 3)
      motionValue.set(to * eased)
      if (p < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [isInView, to, duration, motionValue])

  const springValue = useSpring(motionValue, { stiffness: 100, damping: 30 })

  return (
    <motion.span ref={ref} className={className}>
      {prefix}
      <motion.span>
        {springValue.get().toFixed(Number.isInteger(to) ? 0 : 1).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
      </motion.span>
      {suffix}
    </motion.span>
  )
}

// Page transition wrapper
export function PageTransition({ children, routeKey }: { children: React.ReactNode; routeKey: string }) {
  return (
    <motion.div
      key={routeKey}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  )
}
