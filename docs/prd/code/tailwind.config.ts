import type { Config } from 'tailwindcss';
import typography from '@tailwindcss/typography';
 
export default {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: 'var(--color-ink)',
        paper: {
          DEFAULT: 'var(--color-paper)',
          alt: 'var(--color-paper-alt)',
        },
        gold: {
          DEFAULT: 'var(--color-gold)',
          deep: 'var(--color-gold-deep)',
        },
        navy: 'var(--color-navy)',
        orange: 'var(--color-orange)',
        cyan: 'var(--color-cyan)',
        lime: 'var(--color-lime)',
        coral: 'var(--color-coral)',
        plum: 'var(--color-plum)',
        muted: 'var(--color-muted)',
        border: 'var(--color-border)',
        focus: 'var(--color-focus)',
        success: 'var(--color-success)',
        warning: 'var(--color-warning)',
        error: 'var(--color-error)',
        info: 'var(--color-info)',
      },
      fontFamily: {
        serif: ['"Source Serif 4"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      maxWidth: {
        container: '1280px',
        content: '680px',
      },
      borderRadius: {
        sm: '4px',
        md: '8px',
        lg: '16px',
      },
      spacing: {
        18: '4.5rem',
      },
      transitionTimingFunction: {
        entry: 'cubic-bezier(0.2, 0, 0, 1)',
        exit: 'cubic-bezier(0.4, 0, 1, 1)',
      },
      typography: ({ theme }: any) => ({
        DEFAULT: {
          css: {
            color: theme('colors.ink'),
            maxWidth: '68ch',
            a: {
              color: theme('colors.ink'),
              textDecoration: 'underline',
              textDecorationThickness: '1px',
              textUnderlineOffset: '3px',
              '&:hover': { textDecorationThickness: '2px' },
            },
            'h2, h3, h4': {
              fontFamily: theme('fontFamily.serif').join(','),
              fontWeight: '600',
            },
          },
        },
      }),
    },
  },
  plugins: [typography],
} satisfies Config;
