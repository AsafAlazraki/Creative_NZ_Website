'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

type NavItem = { label: string; href: string };

export function MobileNav({ nav, locale = 'en' }: { nav: NavItem[]; locale?: 'en' | 'mi' }) {
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        triggerRef.current?.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen(true)}
        aria-label={locale === 'mi' ? 'Huakina te tahua' : 'Open menu'}
        aria-expanded={open}
        aria-controls="mobile-nav"
        className="inline-flex h-10 w-10 items-center justify-center rounded-md hover:bg-paper-alt lg:hidden"
      >
        <Menu size={20} aria-hidden="true" />
      </button>

      {open && (
        <>
          <div
            className="fixed inset-0 z-40 bg-ink/50"
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />
          <div
            ref={panelRef}
            id="mobile-nav"
            role="dialog"
            aria-modal="true"
            aria-label={locale === 'mi' ? 'Tahua matua' : 'Primary navigation'}
            className="fixed inset-y-0 left-0 z-50 w-[min(20rem,90vw)] overflow-y-auto bg-paper p-6 shadow-xl"
          >
            <div className="flex items-center justify-between">
              <span className="font-serif text-lg font-semibold">Creative NZ</span>
              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  triggerRef.current?.focus();
                }}
                aria-label={locale === 'mi' ? 'Kati' : 'Close menu'}
                className="inline-flex h-10 w-10 items-center justify-center rounded-md hover:bg-paper-alt"
              >
                <X size={20} aria-hidden="true" />
              </button>
            </div>
            <nav aria-label="Primary" className="mt-6">
              <ul className="flex flex-col divide-y divide-border">
                {nav.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="block py-3 no-underline"
                      onClick={() => setOpen(false)}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
                <li>
                  <a
                    href="https://portal.creativenz.govt.nz/"
                    className="block py-3 no-underline"
                  >
                    {locale === 'mi' ? 'Takiuru' : 'Sign in to the portal'} →
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </>
      )}
    </>
  );
}
