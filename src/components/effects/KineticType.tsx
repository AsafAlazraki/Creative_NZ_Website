import { AnimatePresence, motion } from 'framer-motion'
import { CSSProperties, useEffect, useState } from 'react'

interface KineticTypeProps {
  /** Words to cycle through */
  words: string[]
  interval?: number
  /** Visual variant */
  variant?: 'inline' | 'stacked'
  style?: CSSProperties
  /** Color of the cycled word; inherits from parent if unset */
  color?: string
  /** Optional translation array, same length as words; only used in 'stacked' variant */
  translations?: string[]
  className?: string
}

/**
 * Cycles through Te Reo / English words inside hero copy.
 * 'inline' — replaces a single word inline (e.g. "The arts {give life} to the spirit")
 * 'stacked' — large reo word with mono-cap translation underneath
 */
export function KineticType({
  words,
  interval = 2800,
  variant = 'inline',
  style,
  color,
  translations,
  className,
}: KineticTypeProps) {
  const [i, setI] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setI(prev => (prev + 1) % words.length), interval)
    return () => clearInterval(id)
  }, [words.length, interval])

  const current = words[i]

  if (variant === 'stacked') {
    return (
      <span
        className={className}
        style={{
          position: 'relative',
          display: 'inline-flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          minWidth: 'min(40vw, 360px)',
          ...style,
        }}
      >
        <AnimatePresence mode="wait">
          <motion.span
            key={current}
            initial={{ y: 24, opacity: 0, filter: 'blur(8px)' }}
            animate={{ y: 0,  opacity: 1, filter: 'blur(0px)' }}
            exit   ={{ y: -16, opacity: 0, filter: 'blur(8px)' }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            style={{
              color: color ?? 'var(--accent-2)',
              fontStyle: 'italic',
              fontFamily: 'var(--font-display)',
              lineHeight: 1,
              display: 'inline-block',
            }}
          >
            {current}
          </motion.span>
        </AnimatePresence>
        {translations && (
          <AnimatePresence mode="wait">
            <motion.span
              key={translations[i]}
              initial={{ y: 8, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit   ={{ y: -6, opacity: 0 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.32em',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: 'var(--muted)',
                marginTop: '0.35em',
                fontWeight: 500,
              }}
            >
              / {translations[i]}
            </motion.span>
          </AnimatePresence>
        )}
      </span>
    )
  }

  // 'inline' variant — width-aware swap so surrounding text doesn't jump.
  return (
    <span
      className={className}
      style={{
        position: 'relative',
        display: 'inline-block',
        verticalAlign: 'baseline',
        color: color ?? 'var(--accent-2)',
        fontStyle: 'italic',
        ...style,
      }}
    >
      {/* Sizer: invisible widest word holds layout space */}
      <span style={{ visibility: 'hidden', whiteSpace: 'nowrap' }}>
        {words.reduce((longest, w) => (w.length > longest.length ? w : longest), '')}
      </span>
      <AnimatePresence mode="wait">
        <motion.span
          key={current}
          initial={{ y: 22, opacity: 0, filter: 'blur(6px)' }}
          animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
          exit={{ y: -16, opacity: 0, filter: 'blur(6px)' }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: 'absolute',
            inset: 0,
            display: 'inline-flex',
            alignItems: 'baseline',
            whiteSpace: 'nowrap',
          }}
        >
          {current}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}
