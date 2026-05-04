import { CSSProperties } from 'react'

/**
 * Lightweight shimmer skeletons used by the lazy-route Suspense fallback
 * and any component-level loading states.
 *
 * Animation respects prefers-reduced-motion via the global stylesheet.
 */

const baseShimmer: CSSProperties = {
  background:
    'linear-gradient(90deg, var(--paper-2) 0%, var(--line) 50%, var(--paper-2) 100%)',
  backgroundSize: '200% 100%',
  animation: 'cnzShimmer 1.6s linear infinite',
  borderRadius: 'var(--r-sm)',
}

export function SkeletonLine({ w = '100%', h = 14, style }: { w?: string | number; h?: number; style?: CSSProperties }) {
  return <div style={{ ...baseShimmer, width: w, height: h, ...style }} aria-hidden="true" />
}

export function SkeletonHero() {
  return (
    <section style={{ padding: '120px 40px 60px', minHeight: '60vh' }} aria-label="Loading">
      <div style={{ maxWidth: 'var(--maxw)', margin: '0 auto' }}>
        <SkeletonLine w={120} h={12} style={{ marginBottom: 24 }} />
        <SkeletonLine w="65%" h={48} style={{ marginBottom: 16 }} />
        <SkeletonLine w="55%" h={48} style={{ marginBottom: 32 }} />
        <SkeletonLine w="45%" h={20} style={{ marginBottom: 40 }} />
        <div style={{ display: 'flex', gap: 12 }}>
          <SkeletonLine w={160} h={48} style={{ borderRadius: 999 }} />
          <SkeletonLine w={120} h={48} style={{ borderRadius: 999 }} />
        </div>
      </div>
    </section>
  )
}

export function SkeletonCard() {
  return (
    <div style={{ background: 'var(--card)', border: '1px solid var(--line)', borderRadius: 'var(--r-md)', overflow: 'hidden' }} aria-hidden="true">
      <div style={{ ...baseShimmer, aspectRatio: '16/10', borderRadius: 0 }} />
      <div style={{ padding: 28, display: 'flex', flexDirection: 'column', gap: 10 }}>
        <SkeletonLine w={80} h={10} />
        <SkeletonLine w="80%" h={20} />
        <SkeletonLine w="100%" h={14} />
        <SkeletonLine w="60%" h={14} />
      </div>
    </div>
  )
}

export function SkeletonOpportunityRow() {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: '60px 2.4fr 2fr 1fr 1fr 48px',
      gap: 24, padding: '26px 12px', borderBottom: '1px solid var(--line)',
    }} aria-hidden="true">
      <SkeletonLine w={42} h={12} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        <SkeletonLine w="80%" h={20} />
        <SkeletonLine w={60} h={12} />
      </div>
      <SkeletonLine w="100%" h={14} />
      <SkeletonLine w="60%" h={16} />
      <SkeletonLine w="50%" h={14} />
      <SkeletonLine w={20} h={14} />
    </div>
  )
}
