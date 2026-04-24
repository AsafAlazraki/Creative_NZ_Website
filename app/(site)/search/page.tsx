import type { Metadata } from 'next';
import { Container } from '@/components/layout/container';
import { Breadcrumb } from '@/components/layout/breadcrumb';
import { Eyebrow } from '@/components/cnz/eyebrow';
import { SearchUI } from '@/components/cnz/search-ui';

export const metadata: Metadata = {
  title: 'Search',
  description: 'Search the Creative New Zealand website.',
  robots: { index: false, follow: true },
};

export default function SearchPage() {
  return (
    <>
      <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Search' }]} />
      <Container className="py-12 lg:py-16">
        <header className="max-w-3xl">
          <Eyebrow>Search</Eyebrow>
          <h1 className="mt-3 font-serif text-4xl font-semibold md:text-5xl">
            Search the Creative NZ website
          </h1>
          <p className="mt-4 text-lg text-ink/80">
            Try a fund name, an artform, a place, or a team name.
          </p>
        </header>
        <div className="mt-10 max-w-2xl">
          <SearchUI />
        </div>
      </Container>
    </>
  );
}
