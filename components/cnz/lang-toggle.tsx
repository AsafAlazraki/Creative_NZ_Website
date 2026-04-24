'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function LangToggle({ currentLocale = 'en' }: { currentLocale?: 'en' | 'mi' }) {
  const pathname = usePathname() ?? '/';
  const isMi = pathname === '/mi' || pathname.startsWith('/mi/');
  const activeLocale: 'en' | 'mi' = isMi ? 'mi' : currentLocale;

  const targetHref = (() => {
    if (activeLocale === 'mi') {
      const stripped = pathname.replace(/^\/mi/, '') || '/';
      return stripped;
    }
    return pathname === '/' ? '/mi' : `/mi${pathname}`;
  })();

  const nextLocaleLabel = activeLocale === 'mi' ? 'English' : 'Te reo Māori';
  const nextLocaleShort = activeLocale === 'mi' ? 'EN' : 'Mi';

  return (
    <Link
      href={targetHref}
      lang={activeLocale === 'mi' ? 'en' : 'mi'}
      aria-label={`Switch to ${nextLocaleLabel}`}
      className="inline-flex h-10 items-center rounded-md border border-ink/20 px-3 text-sm no-underline hover:bg-paper-alt"
    >
      <span aria-hidden="true">{nextLocaleShort}</span>
      <span className="sr-only">Switch to {nextLocaleLabel}</span>
    </Link>
  );
}
