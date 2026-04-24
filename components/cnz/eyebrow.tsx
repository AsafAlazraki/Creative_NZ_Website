import { cn } from '@/lib/cn';

export function Eyebrow({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={cn('font-sans text-xs font-semibold uppercase tracking-[0.12em] text-muted', className)}>
      {children}
    </p>
  );
}
