import { cn } from '@/lib/cn';

export type FundStatus = 'open' | 'closing' | 'closed' | 'upcoming';

const statusStyles: Record<FundStatus, string> = {
  open: 'bg-success/15 text-success border-success/30',
  closing: 'bg-warning/15 text-warning border-warning/30',
  closed: 'bg-muted/15 text-muted border-muted/30',
  upcoming: 'bg-info/15 text-info border-info/30',
};

export function StatusPill({
  status,
  label,
  className,
}: {
  status: FundStatus;
  label: string;
  className?: string;
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wide',
        statusStyles[status],
        className
      )}
    >
      {label}
    </span>
  );
}

export function deriveStatus(closeDate?: string | Date, openDate?: string | Date): FundStatus {
  if (!closeDate) return 'closed';
  const now = Date.now();
  const close = new Date(closeDate).getTime();
  const open = openDate ? new Date(openDate).getTime() : undefined;
  if (open && open > now) return 'upcoming';
  if (close < now) return 'closed';
  const daysLeft = Math.ceil((close - now) / (1000 * 60 * 60 * 24));
  if (daysLeft <= 14) return 'closing';
  return 'open';
}
