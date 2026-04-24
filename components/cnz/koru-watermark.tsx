import { cn } from '@/lib/cn';

type Colour = 'orange' | 'cyan' | 'lime' | 'coral' | 'plum';

const colourClass: Record<Colour, string> = {
  orange: 'text-orange',
  cyan: 'text-cyan',
  lime: 'text-lime',
  coral: 'text-coral',
  plum: 'text-plum',
};

export function KoruWatermark({
  colour = 'orange',
  className,
  size = 320,
}: {
  colour?: Colour;
  className?: string;
  size?: number;
}) {
  return (
    <svg
      viewBox="0 0 200 200"
      width={size}
      height={size}
      aria-hidden="true"
      focusable="false"
      className={cn('pointer-events-none select-none', colourClass[colour], className)}
    >
      <g fill="currentColor" opacity="0.9">
        <path d="M100 10 C45 10 10 45 10 100 C10 130 35 155 65 155 C85 155 100 140 100 120 C100 108 92 100 80 100 C73 100 68 105 68 112 C68 117 71 120 75 120" stroke="currentColor" strokeWidth="6" fill="none" strokeLinecap="round" />
        <circle cx="75" cy="120" r="8" />
      </g>
    </svg>
  );
}
