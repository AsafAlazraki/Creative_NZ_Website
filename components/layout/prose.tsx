import { cn } from '@/lib/cn';

export function Prose({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn('prose prose-neutral max-w-content', className)}>
      {children}
    </div>
  );
}
