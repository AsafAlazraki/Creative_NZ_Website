'use client';

import { useEffect, useRef, useState } from 'react';

type Result = { url: string; meta: { title: string }; excerpt: string };

export function SearchUI() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Result[]>([]);
  const [loading, setLoading] = useState(false);
  const pagefindRef = useRef<any>(null);

  useEffect(() => {
    (async () => {
      try {
        // @ts-expect-error — runtime import from /public/_pagefind
        const mod = await import(/* webpackIgnore: true */ '/_pagefind/pagefind.js');
        pagefindRef.current = mod;
      } catch {
        pagefindRef.current = null;
      }
    })();
  }, []);

  useEffect(() => {
    const q = query.trim();
    if (!q) {
      setResults([]);
      return;
    }
    if (!pagefindRef.current) return;
    setLoading(true);
    let cancelled = false;
    (async () => {
      const search = await pagefindRef.current.search(q);
      const data: Result[] = await Promise.all(search.results.slice(0, 10).map((r: any) => r.data()));
      if (!cancelled) {
        setResults(data);
        setLoading(false);
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
        {loading
          ? 'Searching…'
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
