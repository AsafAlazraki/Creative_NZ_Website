import type { Metadata } from 'next';
import { Container } from '@/components/layout/container';
import { Breadcrumb } from '@/components/layout/breadcrumb';
import { NewsCard } from '@/components/cnz/news-card';
import { Eyebrow } from '@/components/cnz/eyebrow';
import { listNews } from '@/lib/sanity';

export const metadata: Metadata = {
  title: 'News and blog',
  description: 'Arts news and stories from Creative New Zealand.',
};

export const revalidate = 60;

export default async function NewsListingPage() {
  const items = await listNews(24);

  return (
    <>
      <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'News and blog' }]} />
      <Container className="py-12 lg:py-16">
        <header className="max-w-3xl">
          <Eyebrow>News and blog</Eyebrow>
          <h1 className="mt-3 font-serif text-4xl font-semibold md:text-5xl">
            Stories from Creative <span lang="mi">Aotearoa</span>
          </h1>
          <p className="mt-4 text-lg text-ink/80">
            Funding news, artist stories, research, and updates.
          </p>
        </header>

        {items.length === 0 ? (
          <p className="mt-12 text-muted">No news yet.</p>
        ) : (
          <div className="mt-12 grid gap-10 md:grid-cols-2 lg:grid-cols-3">
            {items.map((item: any) => (
              <NewsCard
                key={item._id}
                slug={item.slug?.current ?? ''}
                title={item.title?.en ?? item.title ?? ''}
                standfirst={item.standfirst?.en}
                category={item.category?.en ?? item.category}
                publishedAt={item.publishedAt}
              />
            ))}
          </div>
        )}
      </Container>
    </>
  );
}
