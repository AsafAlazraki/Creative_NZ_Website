'use client';

import { useMemo, useState } from 'react';
import { FundCard, type FundCardProps } from './fund-card';

type Status = 'all' | 'open' | 'closing' | 'upcoming';

type Props = {
  items: FundCardProps[];
};

export function FundingCalendar({ items }: Props) {
  const [status, setStatus] = useState<Status>('all');
  const [artform, setArtform] = useState<string>('all');

  const artforms = useMemo(() => {
    const set = new Set<string>();
    items.forEach((i) => (i.artforms ?? []).forEach((a) => set.add(a)));
    return Array.from(set).sort();
  }, [items]);

  const filtered = useMemo(() => {
    return items.filter((item) => {
      const close = item.closeDate ? new Date(item.closeDate).getTime() : null;
      const now = Date.now();
      const daysLeft = close ? Math.ceil((close - now) / 86_400_000) : Infinity;

      if (status === 'open' && !(close && close >= now)) return false;
      if (status === 'closing' && !(close && close >= now && daysLeft <= 14)) return false;
      if (status === 'upcoming' && !(close === null || close > now + 14 * 86_400_000)) return false;
      if (artform !== 'all' && !(item.artforms ?? []).includes(artform)) return false;
      return true;
    });
  }, [items, status, artform]);

  return (
    <div>
      <div className="rounded-lg border border-border bg-paper-alt p-5">
        <div className="flex flex-wrap items-start gap-6">
          <fieldset className="min-w-0 flex-1">
            <legend className="text-xs font-semibold uppercase tracking-wide text-muted">Status</legend>
            <div role="radiogroup" aria-label="Status filter" className="mt-2 flex flex-wrap gap-2">
              {(['all', 'open', 'closing', 'upcoming'] as const).map((s) => (
                <button
                  key={s}
                  type="button"
                  role="radio"
                  aria-checked={status === s}
                  onClick={() => setStatus(s)}
                  className={
                    'h-9 rounded-full border px-4 text-sm capitalize ' +
                    (status === s
                      ? 'border-ink bg-ink text-paper'
                      : 'border-border bg-paper hover:bg-paper-alt')
                  }
                >
                  {s === 'all' ? 'All' : s === 'closing' ? 'Closing soon' : s[0].toUpperCase() + s.slice(1)}
                </button>
              ))}
            </div>
          </fieldset>
          {artforms.length > 0 && (
            <label className="min-w-0 flex-1">
              <span className="text-xs font-semibold uppercase tracking-wide text-muted">Artform</span>
              <select
                value={artform}
                onChange={(e) => setArtform(e.target.value)}
                className="mt-2 h-9 w-full rounded-md border border-border bg-paper px-3 text-sm"
              >
                <option value="all">All artforms</option>
                {artforms.map((a) => (
                  <option key={a} value={a}>
                    {a}
                  </option>
                ))}
              </select>
            </label>
          )}
          <button
            type="button"
            onClick={() => {
              setStatus('all');
              setArtform('all');
            }}
            className="self-end text-sm underline underline-offset-4"
          >
            Reset
          </button>
        </div>
      </div>

      <p aria-live="polite" className="mt-4 text-sm text-muted">
        Showing {filtered.length} of {items.length} funding rounds
      </p>

      <div className="mt-6 grid gap-4">
        {filtered.length === 0 ? (
          <div className="rounded-lg border border-dashed border-border p-10 text-center">
            <p>No funding rounds match your filters.</p>
            <p className="mt-2 text-muted">
              Try removing an artform or switching status to “All”.
            </p>
          </div>
        ) : (
          filtered.map((item) => <FundCard key={item.slug} {...item} />)
        )}
      </div>
    </div>
  );
}
