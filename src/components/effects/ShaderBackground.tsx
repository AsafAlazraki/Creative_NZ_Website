import { MeshGradient } from '@paper-design/shaders-react'
import { CSSProperties, useMemo } from 'react'

/**
 * Phoenix-style WebGL mesh-gradient background.
 * Three CNZ-tuned palettes drift slowly behind hero content.
 *
 * `intensity` controls visibility:
 *   - 'hero'      → full impact (homepage hero)
 *   - 'medium'    → page-head shaders on Toi Māori / Pasifika
 *   - 'subtle'    → ambient wash behind inner page-heads
 */
export type ShaderPalette = 'aotearoa' | 'maori' | 'pasifika' | 'paper' | 'ink' | 'nightsky'

const PALETTES: Record<ShaderPalette, string[]> = {
  // Sun-on-water — warm Aotearoa morning. Kowhai gold flowing through paper.
  aotearoa: ['#fbf9f3', '#E8A317', '#F5D88E', '#1E5F74', '#C8463C'],
  // Bush + earth + kowhai — Ngā Toi Māori, deep and grounded.
  maori:    ['#1a1612', '#3F5E3A', '#E8A317', '#6B4423', '#1a1612'],
  // Te Moana-nui-a-Kiwa — Pacific ocean currents, deep moana with pohutukawa sunset.
  pasifika: ['#0a3f50', '#1E5F74', '#67A9C6', '#E8A317', '#C8463C'],
  // Editorial cream — barely-there breathing on a paper backdrop.
  paper:    ['#fffdf7', '#fbf9f3', '#f5f0e3', '#fbf3dc', '#eef4f6'],
  // Dark ambient for dark sections — adds a warm kowhai breath and a deep
  // moana shadow so the tonal variance reads as motion, not flat black.
  ink:      ['#0e0c08', '#1a1612', '#3a342c', '#5a3d12', '#0e1a20'],
  // Deep-space nebula — near-black with hints of indigo, deep moana,
  // a whisper of kowhai aurora and pohutukawa nebula bloom. For the
  // Pacific Strategy constellation.
  nightsky: ['#020410', '#050d20', '#0a1a3a', '#1a2855', '#3a1830'],
}

interface ShaderBackgroundProps {
  palette?: ShaderPalette
  intensity?: 'hero' | 'medium' | 'subtle'
  speed?: number
  className?: string
  style?: CSSProperties
}

const PRESETS = {
  hero:    { distortion: 0.85, swirl: 0.6,  grainMixer: 0.2,  grainOverlay: 0.08, speed: 0.18 },
  medium:  { distortion: 0.6,  swirl: 0.4,  grainMixer: 0.15, grainOverlay: 0.05, speed: 0.14 },
  subtle:  { distortion: 0.7,  swirl: 0.5,  grainMixer: 0.10, grainOverlay: 0.04, speed: 0.07 },
}

export function ShaderBackground({
  palette = 'aotearoa',
  intensity = 'hero',
  speed,
  className,
  style,
}: ShaderBackgroundProps) {
  const colors = PALETTES[palette]
  const preset = PRESETS[intensity]
  const computedSpeed = speed ?? preset.speed

  const wrapStyle: CSSProperties = useMemo(() => ({
    position: 'absolute',
    inset: 0,
    pointerEvents: 'none',
    overflow: 'hidden',
    zIndex: 0,
    ...style,
  }), [style])

  const reducedMotion = typeof window !== 'undefined'
    && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

  return (
    <div className={className} style={wrapStyle} aria-hidden="true">
      <MeshGradient
        colors={colors}
        distortion={preset.distortion}
        swirl={preset.swirl}
        grainMixer={preset.grainMixer}
        grainOverlay={preset.grainOverlay}
        speed={reducedMotion ? 0 : computedSpeed}
        style={{ width: '100%', height: '100%' }}
      />
      {/* soft fade-to-content at bottom so type stays readable.
          Lighter for paper palette (already pale), heavier for vivid ones.
          Skipped entirely for dark palettes (ink, nightsky) so the night-sky
          mood survives. */}
      {palette !== 'paper' && palette !== 'ink' && palette !== 'nightsky' && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: intensity === 'hero'
              ? 'linear-gradient(to bottom, rgba(255,253,247,0.0) 0%, rgba(255,253,247,0.20) 70%, rgba(255,253,247,0.45) 100%)'
              : 'linear-gradient(to bottom, rgba(255,253,247,0.12) 0%, rgba(255,253,247,0.32) 100%)',
            pointerEvents: 'none',
          }}
        />
      )}
    </div>
  )
}
