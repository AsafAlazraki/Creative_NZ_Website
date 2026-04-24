import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Container } from '@/components/layout/container';
import { Breadcrumb } from '@/components/layout/breadcrumb';
import { Eyebrow } from '@/components/cnz/eyebrow';
import { Prose } from '@/components/layout/prose';
import { PortableText } from '@portabletext/react';
import { getNewsArticle } from '@/lib/sanity';

export const revalidate = 60;

type Params = { year: string; slug: string };

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const article = await getNewsArticle(slug);
  if (!article) return { title: slug };
  return {
    title: article.title?.en ?? slug,
    description: article.standfirst?.en,
  };
}

export default async function ArticlePage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const article = await getNewsArticle(slug);
  if (!article) notFound();

  return (
    <>
      <Breadcrumb
        items={[
          { label: 'Home', href: '/' },
          { label: 'News and blog', href: '/news-and-blog' },
          { label: article.title?.en ?? '' },
        ]}
      />
      <Container className="py-12 lg:py-16">
        <article>
          <header className="max-w-3xl">
            <div className="flex flex-wrap items-center gap-3 text-xs">
              {article.categories?.[0]?.name?.en && (
                <Eyebrow>{article.categories[0].name.en}</Eyebrow>
              )}
              {article.publishedAt && (
                <time dateTime={article.publishedAt} className="text-muted">
                  {new Date(article.publishedAt).toLocaleDateString('en-NZ', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })}
                </time>
              )}
            </div>
            <h1 className="mt-3 font-serif text-4xl font-semibold md:text-5xl">
              {article.title?.en}
            </h1>
            {article.standfirst?.en && (
              <p className="mt-4 text-lg text-ink/80">{article.standfirst.en}</p>
            )}
            {(article.author?.name || article.authorOverride) && (
              <p className="mt-4 text-sm text-muted">
                By {article.authorOverride ?? article.author?.name}
              </p>
            )}
          </header>

          {article.featuredImage && (
            <figure className="mt-8">
              <div className="aspect-[2/1] rounded-lg bg-paper-alt" />
              {article.featuredImage.caption?.en && (
                <figcaption className="mt-2 text-sm text-muted">
                  {article.featuredImage.caption.en}
                </figcaption>
              )}
            </figure>
          )}

          {article.body && (
            <div className="mt-10">
              <Prose>
                <PortableText value={article.body} />
              </Prose>
            </div>
          )}
        </article>
      </Container>
    </>
  );
}
