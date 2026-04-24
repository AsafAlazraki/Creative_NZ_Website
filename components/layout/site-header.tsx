import Link from 'next/link';
import { Search } from 'lucide-react';
import { Container } from './container';
import { LangToggle } from '@/components/cnz/lang-toggle';
import { MobileNav } from './mobile-nav';

type Props = { settings?: any; locale?: 'en' | 'mi' };

const FALLBACK_NAV = [
  { label: 'Funding & support', href: '/funding-and-support' },
  { label: 'Advocating for the arts', href: '/advocating-for-the-arts' },
  { label: 'Development & resources', href: '/development-and-resources' },
  { label: 'About', href: '/about-creative-nz' },
  { label: 'News', href: '/news-and-blog' },
];

export function SiteHeader({ settings, locale = 'en' }: Props) {
  const nav =
    settings?.primaryNav?.map((n: any) => ({
      label: n.label?.[locale] ?? n.label?.en,
      href: n.href,
    })) ?? FALLBACK_NAV;

  return (
    <header className="sticky top-0 z-40 bg-paper/95 backdrop-blur supports-[backdrop-filter]:bg-paper/80 border-b border-border">
      <Container className="flex h-16 items-center gap-6 lg:h-20">
        <Link href="/" className="no-underline" aria-label="Creative New Zealand — home">
          <span className="font-serif text-lg font-semibold">
            Creative New Zealand <span lang="mi" className="text-muted">Toi Aotearoa</span>
          </span>
        </Link>

        <nav aria-label="Primary" className="ml-auto hidden lg:block">
          <ul className="flex items-center gap-6 text-sm">
            {nav.map((item: any) => (
              <li key={item.href}>
                <Link href={item.href} className="no-underline hover:underline">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="ml-auto flex items-center gap-2 lg:ml-0">
          <Link
            href="/search"
            aria-label={locale === 'mi' ? 'Rapu' : 'Search'}
            className="inline-flex h-10 w-10 items-center justify-center rounded-md hover:bg-paper-alt"
          >
            <Search size={18} aria-hidden="true" />
          </Link>
          <LangToggle currentLocale={locale} />
          <a
            href="https://portal.creativenz.govt.nz/"
            className="hidden rounded-md border border-ink px-4 py-2 text-sm no-underline hover:bg-ink hover:text-paper lg:inline-block"
          >
            {locale === 'mi' ? 'Takiuru' : 'Sign in'}
          </a>
          <MobileNav nav={nav} locale={locale} />
        </div>
      </Container>
    </header>
  );
}
