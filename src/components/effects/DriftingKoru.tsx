// Decorative koru spirals removed for production launch — kept as a no-op
// so existing call sites continue to compile.
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

interface DriftingKoruProps {
  koru?: KoruInstance[]
  color?: string
  parallax?: boolean
}

export function DriftingKoru(_: DriftingKoruProps) { return null }
