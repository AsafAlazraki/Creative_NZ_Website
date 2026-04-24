import type { MetadataRoute } from 'next';
import { sanityClient } from '@/lib/sanity';
 
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = 'https://creativenz.govt.nz';
 
  // Utility pages
  const utility = ['', '/search', '/site-map', '/privacy', '/accessibility', '/copyright'].map(
    (p) => ({
      url: `${base}${p}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: p === '' ? 1.0 : 0.5,
    })
  );
 
  // CMS pages
  const pages = await sanityClient.fetch<{ slug: string; updatedAt: string }[]>(`
    *[_type == "page" && !(_id in path('drafts.**'))]{
      "slug": slug.current,
      "updatedAt": _updatedAt
    }
  `);
 
  const funds = await sanityClient.fetch<{ slug: string; updatedAt: string }[]>(`
    *[_type == "fund" && !(_id in path('drafts.**'))]{
      "slug": slug.current,
      "updatedAt": _updatedAt
    }
  `);
 
  const news = await sanityClient.fetch<{ slug: string; publishedAt: string }[]>(`
    *[_type == "newsArticle" && !(_id in path('drafts.**'))]{
      "slug": slug.current,
      publishedAt
    }
  `);
 
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
