import type { MetadataRoute } from 'next';
import { sanityClient } from '@/lib/sanity';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://creativenz.govt.nz';

  const utility = ['', '/search', '/site-map', '/privacy', '/accessibility', '/copyright'].map(
    (p) => ({
      url: `${base}${p}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: p === '' ? 1.0 : 0.5,
    })
  );

  let pages: { slug: string; updatedAt: string }[] = [];
  let funds: { slug: string; updatedAt: string }[] = [];
  let news: { slug: string; publishedAt: string }[] = [];

  try {
    pages = await sanityClient.fetch(`
      *[_type == "page" && !(_id in path('drafts.**'))]{
        "slug": slug.current,
        "updatedAt": _updatedAt
      }
    `);
    funds = await sanityClient.fetch(`
      *[_type == "fund" && !(_id in path('drafts.**'))]{
        "slug": slug.current,
        "updatedAt": _updatedAt
      }
    `);
    news = await sanityClient.fetch(`
      *[_type == "newsArticle" && !(_id in path('drafts.**'))]{
        "slug": slug.current,
        publishedAt
      }
    `);
  } catch {
    // Sanity not configured — return utility only
  }

  return [
    ...utility,
    ...pages.map((p) => ({
      url: `${base}/${p.slug}`,
      lastModified: new Date(p.updatedAt),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    })),
    ...funds.map((f) => ({
      url: `${base}/funding-and-support/${f.slug}`,
      lastModified: new Date(f.updatedAt),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    })),
    ...news.map((n) => ({
      url: `${base}/news/${n.slug}`,
      lastModified: new Date(n.publishedAt),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
  ];
}
