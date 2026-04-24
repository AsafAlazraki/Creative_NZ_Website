import Link from 'next/link';

export type BreadcrumbItem = { label: string; href?: string };

export function Breadcrumb({ items, locale = 'en' }: { items: BreadcrumbItem[]; locale?: 'en' | 'mi' }) {
  if (items.length === 0) return null;
  const ariaLabel = locale === 'mi' ? 'Ara kōpara' : 'Breadcrumb';
  return (
    <nav aria-label={ariaLabel} className="border-b border-border bg-paper-alt">
      <ol className="mx-auto flex max-w-container flex-wrap items-center gap-2 px-6 py-3 text-sm md:px-8">
        {items.map((item, i) => (
          <li key={i} className="flex items-center gap-2">
            {i > 0 && <span aria-hidden="true" className="text-muted">/</span>}
            {item.href ? (
              <Link href={item.href} className="no-underline hover:underline">
                {item.label}
              </Link>
            ) : (
              <span aria-current="page" className="text-muted">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
