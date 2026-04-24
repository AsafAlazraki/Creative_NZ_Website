import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Container } from '@/components/layout/container';
import { Breadcrumb } from '@/components/layout/breadcrumb';
import { Eyebrow } from '@/components/cnz/eyebrow';
import { Prose } from '@/components/layout/prose';
import { PortableText } from '@portabletext/react';
import { getPage } from '@/lib/sanity';

export const revalidate = 60;

type Params = { slug: string[] };

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const joined = slug.join('/');
  const page = await getPage(joined);
  if (!page) {
    return { title: joined };
  }
  return {
    title: page.seo?.title ?? page.title?.en ?? joined,
    description: page.seo?.description ?? page.intro?.en,
  };
}

export default async function ContentPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const joined = slug.join('/');
  const page = await getPage(joined);

  if (!page) {
    notFound();
  }

  const crumbs = [
    { label: 'Home', href: '/' },
    ...(page.section?.parent ? [{
      label: page.section.parent.title?.en ?? '',
      href: `/${page.section.parent.slug?.current ?? ''}`,
    }] : []),
    ...(page.section ? [{
      label: page.section.title?.en ?? '',
      href: `/${page.section.slug?.current ?? ''}`,
    }] : []),
    { label: page.title?.en ?? '' },
  ];

  return (
    <>
      <Breadcrumb items={crumbs} />
      <Container className="py-12 lg:py-16">
        <header className="max-w-3xl">
          {page.eyebrow?.en && <Eyebrow>{page.eyebrow.en}</Eyebrow>}
          <h1 className="mt-3 font-serif text-4xl font-semibold md:text-5xl">
            {page.title?.en}
          </h1>
          {page.intro?.en && <p className="mt-4 text-lg text-ink/80">{page.intro.en}</p>}
        </header>

        {page.blocks && (
          <div className="mt-10">
            <Prose>
              <PortableText value={page.blocks} />
            </Prose>
          </div>
        )}
      </Container>
    </>
  );
}
