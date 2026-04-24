'use client';

import Link from 'next/link';
import { useState } from 'react';
import { cn } from '@/lib/cn';

type Props = {
  variant?: 'inline' | 'footer';
  locale?: 'en' | 'mi';
};

export function NewsletterSignup({ variant = 'inline', locale = 'en' }: Props) {
  const [email, setEmail] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const isFooter = variant === 'footer';

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage(null);
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, honeypot, consent: true }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error ?? 'submit_failed');
      }
      setStatus('success');
      setEmail('');
    } catch (err: any) {
      setStatus('error');
      setErrorMessage(err.message ?? 'submit_failed');
    }
  };

  if (status === 'success') {
    return (
      <div role="status" aria-live="polite" className={cn(isFooter && 'text-paper')}>
        {locale === 'mi'
          ? 'Ka mau te wehi! Tirohia tō īmēra hei whakatūturu.'
          : 'Thanks! Check your inbox to confirm your subscription.'}
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className={cn('flex flex-col gap-3', isFooter && 'text-paper')}
    >
      <div className="flex flex-col gap-2 md:flex-row md:items-start">
        <label className="flex-1">
          <span className="block text-sm font-medium">
            {locale === 'mi' ? 'Tō īmēra' : 'Email address'}
          </span>
          <input
            type="email"
            required
            autoComplete="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={cn(
              'mt-1 h-11 w-full rounded-md border px-3 text-ink',
              isFooter ? 'border-paper/30 bg-paper/10 text-paper placeholder:text-paper/60' : 'border-border bg-paper'
            )}
            placeholder="you@example.com"
          />
        </label>
        <input
          type="text"
          name="honeypot"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
          autoComplete="off"
          tabIndex={-1}
          aria-hidden="true"
          className="sr-only"
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          className={cn(
            'mt-0 h-11 shrink-0 rounded-md px-5 text-sm font-medium no-underline md:mt-[1.6rem]',
            isFooter ? 'bg-paper text-ink hover:bg-gold' : 'bg-ink text-paper hover:bg-navy',
            status === 'loading' && 'opacity-60'
          )}
        >
          {status === 'loading'
            ? locale === 'mi' ? 'E tuku ana…' : 'Submitting…'
            : locale === 'mi' ? 'Ohauru' : 'Subscribe'}
        </button>
      </div>
      <p className={cn('text-xs', isFooter ? 'text-paper/70' : 'text-muted')}>
        {locale === 'mi' ? (
          <>Mā tō ohautanga ka whakaae koe ki tā mātou <Link href="/mi/privacy" className="underline">kaupapa tūmataiti</Link>.</>
        ) : (
          <>By subscribing you agree to our <Link href="/privacy" className="underline">privacy policy</Link>.</>
        )}
      </p>
      {status === 'error' && (
        <p role="alert" className="text-sm text-error">
          {locale === 'mi'
            ? 'Aue, i rahua te tuku. Whakamātauria anō.'
            : 'Sorry, something went wrong. Please try again.'}
          {errorMessage === 'rate_limited' && ' (too many attempts)'}
        </p>
      )}
    </form>
  );
}
