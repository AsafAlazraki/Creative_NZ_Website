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

// Decorative koru spirals removed for production launch — components kept as
// no-ops so existing call sites compile without churn.
export function KoruSpiral(_: KoruSpiralProps) { return null }

interface KoruCornerProps {
  position?: 'tr' | 'tl' | 'br' | 'bl'
  size?: number
  color?: string
  opacity?: number
}

export function KoruCorner(_: KoruCornerProps) { return null }

interface KoruBandProps {
  count?: number
  color?: string
  opacity?: number
  height?: number
  className?: string
}

export function KoruBand(_: KoruBandProps) { return null }

export function AnimatedKoru(_: { size?: number; color?: string; opacity?: number; delay?: number }) { return null }

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
