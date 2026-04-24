'use client';

import { useState } from 'react';
import { X } from 'lucide-react';
import { cn } from '@/lib/cn';

type Props = {
  enabled?: boolean;
  message?: { en?: string; mi?: string };
  linkUrl?: string;
  linkText?: { en?: string; mi?: string };
  severity?: 'info' | 'warning' | 'critical';
  dismissible?: boolean;
  locale?: 'en' | 'mi';
};

const severityClass: Record<NonNullable<Props['severity']>, string> = {
  info: 'bg-info text-paper',
  warning: 'bg-warning text-paper',
  critical: 'bg-error text-paper',
};

export function AnnouncementBanner({
  message,
  linkUrl,
  linkText,
  severity = 'info',
  dismissible = true,
  locale = 'en',
}: Props) {
  const [dismissed, setDismissed] = useState(false);
  if (dismissed) return null;

  const msg = message?.[locale] ?? message?.en;
  const link = linkText?.[locale] ?? linkText?.en;

  if (!msg) return null;

  return (
    <div role="status" aria-live="polite" className={cn(severityClass[severity])}>
      <div className="mx-auto flex max-w-container items-center gap-4 px-6 py-2 text-sm md:px-8">
        <p className="flex-1">
          {msg}
          {linkUrl && link && (
            <>
              {' '}
              <a href={linkUrl} className="underline">
                {link}
              </a>
            </>
          )}
        </p>
        {dismissible && (
          <button
            type="button"
            onClick={() => setDismissed(true)}
            className="shrink-0 rounded-sm p-1 hover:bg-black/10"
            aria-label={locale === 'mi' ? 'Kati' : 'Dismiss announcement'}
          >
            <X size={16} aria-hidden="true" />
          </button>
        )}
      </div>
    </div>
  );
}
