import Link from 'next/link';
import { StatusPill, deriveStatus } from './status-pill';
import { Eyebrow } from './eyebrow';

export type FundCardProps = {
  slug: string;
  name: string;
  category?: string;
  audience?: string;
  amount?: { min?: number; max?: number; currency?: string } | null;
  closeDate?: string;
  artforms?: string[];
};

export function FundCard({ slug, name, category, audience, amount, closeDate, artforms }: FundCardProps) {
  const status = deriveStatus(closeDate);
  const daysLeft = closeDate
    ? Math.max(0, Math.ceil((new Date(closeDate).getTime() - Date.now()) / 86_400_000))
    : 0;
  const statusLabel =
    status === 'open' ? 'Open'
    : status === 'closing' ? `Closing in ${daysLeft} days`
    : status === 'upcoming' ? 'Upcoming'
    : 'Closed';

  return (
    <article className="rounded-lg border border-border bg-paper p-6">
      <div className="flex flex-wrap items-center gap-3">
        <StatusPill status={status} label={statusLabel} />
        {category && <Eyebrow>{category}</Eyebrow>}
      </div>
      <h3 className="mt-3 font-serif text-xl font-semibold leading-tight">
        <Link href={`/funding-and-support/${slug}`} className="no-underline hover:underline">
          {name}
        </Link>
      </h3>
      <p className="mt-2 text-sm text-muted">
        {amount?.max && <>Up to ${amount.max.toLocaleString()} • </>}
        {audience}
        {artforms?.length ? ` • ${artforms.join(', ')}` : null}
      </p>
      {closeDate && (
        <p className="mt-2 text-sm">
          <span className="text-muted">Closes </span>
          <time dateTime={closeDate}>
            {new Date(closeDate).toLocaleDateString('en-NZ', {
              day: 'numeric',
              month: 'short',
              year: 'numeric',
            })}{' '}
            5pm NZT
          </time>
        </p>
      )}
      <div className="mt-4 text-right">
        <Link href={`/funding-and-support/${slug}`} className="text-sm font-medium underline underline-offset-4">
          See details →
        </Link>
      </div>
    </article>
  );
}
