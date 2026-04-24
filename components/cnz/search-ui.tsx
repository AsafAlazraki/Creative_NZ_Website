'use client';

import { useEffect, useRef, useState } from 'react';

type Result = { url: string; meta?: { title?: string }; excerpt: string };

type PagefindAPI = {
  search: (q: string) => Promise<{ results: Array<{ data: () => Promise<Result> }> }>;
};

declare global {
  interface Window {
    pagefind?: PagefindAPI;
  }
}

export function SearchUI() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Result[]>([]);
  const [status, setStatus] = useState<'idle' | 'loading' | 'ready' | 'unavailable'>('idle');
  const pagefindRef = useRef<PagefindAPI | null>(null);

  useEffect(() => {
    // Load Pagefind at runtime via a script tag. Opaque to the bundler.
    const script = document.createElement('script');
    script.type = 'module';
    script.innerHTML = `
      try {
        const mod = await import('/_pagefind/pagefind.js');
        window.pagefind = mod;
        window.dispatchEvent(new Event('pagefind-ready'));
      } catch (e) {
        window.dispatchEvent(new Event('pagefind-unavailable'));
      }
    `;
    document.head.appendChild(script);
    const onReady = () => {
      pagefindRef.current = window.pagefind ?? null;
      setStatus('ready');
    };
    const onUnavailable = () => setStatus('unavailable');
    window.addEventListener('pagefind-ready', onReady);
    window.addEventListener('pagefind-unavailable', onUnavailable);
    return () => {
      window.removeEventListener('pagefind-ready', onReady);
      window.removeEventListener('pagefind-unavailable', onUnavailable);
    };
  }, []);

  useEffect(() => {
    const q = query.trim();
    if (!q || !pagefindRef.current) {
      setResults([]);
      return;
    }
    setStatus('loading');
    let cancelled = false;
    (async () => {
      const search = await pagefindRef.current!.search(q);
      const data = await Promise.all(search.results.slice(0, 10).map((r) => r.data()));
      if (!cancelled) {
        setResults(data);
        setStatus('ready');
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [query]);

  return (
    <div>
      <label className="block">
        <span className="sr-only">Search</span>
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search…"
          autoFocus
          className="h-14 w-full rounded-md border border-border bg-paper px-4 text-lg"
        />
      </label>
      <p aria-live="polite" className="mt-3 text-sm text-muted">
        {status === 'loading'
          ? 'Searching…'
          : status === 'unavailable'
            ? 'Search index is being generated. Try again in a moment.'
            : results.length > 0
              ? `${results.length} result${results.length === 1 ? '' : 's'}`
              : query
                ? 'No results.'
                : ''}
      </p>
      <ul className="mt-6 space-y-6">
        {results.map((r) => (
          <li key={r.url}>
            <a href={r.url} className="font-serif text-lg font-semibold">
              {r.meta?.title ?? r.url}
            </a>
            <p className="mt-1 text-sm text-ink/80" dangerouslySetInnerHTML={{ __html: r.excerpt }} />
          </li>
        ))}
      </ul>
    </div>
  );
}
