import Link from 'next/link';
import { StatusPill, deriveStatus } from './status-pill';

export type Deadline = {
  slug: string;
  name: { en?: string; mi?: string } | string;
  audience?: string;
  amount?: { max?: number; currency?: string } | null;
  closeDate?: string;
};

export function DeadlineStrip({ items, locale = 'en' }: { items: Deadline[]; locale?: 'en' | 'mi' }) {
  if (!items.length) return null;

  return (
    <ul className="divide-y divide-border rounded-lg border border-border bg-paper-alt">
      {items.map((item) => {
        const name = typeof item.name === 'string' ? item.name : (item.name?.[locale] ?? item.name?.en ?? '');
        const status = deriveStatus(item.closeDate);
        const daysLeft = item.closeDate
          ? Math.max(0, Math.ceil((new Date(item.closeDate).getTime() - Date.now()) / 86_400_000))
          : 0;

        const pillLabel =
          status === 'open'
            ? locale === 'mi'
              ? 'Tuwhera'
              : 'Open'
            : status === 'closing'
              ? locale === 'mi'
                ? `E kati ana ā ${daysLeft} rā`
                : `Closes in ${daysLeft} day${daysLeft === 1 ? '' : 's'}`
              : status === 'upcoming'
                ? 'Upcoming'
                : 'Closed';

        return (
          <li key={item.slug} className="flex flex-col gap-3 p-5 md:flex-row md:items-center md:gap-6">
            <StatusPill status={status} label={pillLabel} />
            <div className="flex-1">
              <Link
                href={`/funding-and-support/${item.slug}`}
                className="font-serif text-lg font-semibold no-underline hover:underline"
              >
                {name}
              </Link>
              <p className="text-sm text-muted">
                {item.amount?.max && (
                  <>
                    {`Up to $${item.amount.max.toLocaleString()}`}
                    {' • '}
                  </>
                )}
                {item.audience}
              </p>
            </div>
            <Link
              href={`/funding-and-support/${item.slug}`}
              className="shrink-0 text-sm font-medium underline underline-offset-4"
            >
              See details →
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
