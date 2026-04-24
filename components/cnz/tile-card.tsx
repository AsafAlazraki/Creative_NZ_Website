import Link from 'next/link';
import { cn } from '@/lib/cn';
import { KoruWatermark } from './koru-watermark';

type Colour = 'orange' | 'cyan' | 'lime' | 'coral' | 'plum';

const bgClass: Record<Colour, string> = {
  orange: 'bg-orange/10',
  cyan: 'bg-cyan/10',
  lime: 'bg-lime/15',
  coral: 'bg-coral/10',
  plum: 'bg-plum/10',
};

export function TileCard({
  href,
  title,
  description,
  cta = 'See what’s for you',
  colour = 'orange',
  className,
}: {
  href: string;
  title: string;
  description: string;
  cta?: string;
  colour?: Colour;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        'group relative flex h-full min-h-56 flex-col justify-between overflow-hidden rounded-lg border border-border p-6 no-underline transition-transform hover:-translate-y-0.5',
        bgClass[colour],
        className
      )}
    >
      <KoruWatermark
        colour={colour}
        size={160}
        className="absolute -right-6 -top-6 opacity-60 transition-transform group-hover:rotate-6"
      />
      <div className="relative">
        <h3 className="font-serif text-xl font-semibold leading-tight">{title}</h3>
        <p className="mt-3 text-sm text-ink/80">{description}</p>
      </div>
      <p className="relative mt-6 text-sm font-medium underline underline-offset-4">{cta} →</p>
    </Link>
  );
}
