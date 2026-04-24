import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

const rawProjectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const rawDataset = process.env.NEXT_PUBLIC_SANITY_DATASET;

// GitHub Actions exposes undefined secrets as empty strings, so use || not ??.
const projectId = rawProjectId || 'placeholder';
const dataset = rawDataset || 'production';

export const sanityConfigured = Boolean(rawProjectId);

export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion: '2024-12-01',
  useCdn: true,
  perspective: 'published',
});

const builder = imageUrlBuilder(sanityClient);
export const urlFor = (source: any) => builder.image(source);

async function safeFetch<T>(query: string, params: Record<string, unknown> = {}, fallback: T): Promise<T> {
  if (!sanityConfigured) return fallback;
  try {
    return await sanityClient.fetch<T>(query, params);
  } catch (err) {
    console.warn('[sanity] fetch failed', err);
    return fallback;
  }
}

export async function getGlobalSettings() {
  return safeFetch<any>(`*[_type == "globalSettings"][0]`, {}, null);
}

export async function getPage(slug: string, locale: 'en' | 'mi' = 'en') {
  return safeFetch<any>(
    `*[_type == "page" && slug.current == $slug && locale == $locale][0]{
      _id, title, eyebrow, intro, blocks,
      "section": parentSection->{
        title, slug,
        "parent": parent->{ title, slug }
      },
      seo, lastUpdated
    }`,
    { slug, locale },
    null,
  );
}

export async function getFund(slug: string) {
  return safeFetch<any>(
    `*[_type == "fund" && slug.current == $slug][0]{
      ...,
      "audience": audience[]->{ name, slug },
      "artforms": artforms[]->{ name, slug, colorToken },
      "relatedFunds": relatedFunds[]->{ name, slug, "status": rounds[0].status }
    }`,
    { slug },
    null,
  );
}

export async function getOpenFunds() {
  return safeFetch<any[]>(`
    *[_type == "fund" && count(rounds[closeDate > now()]) > 0]{
      slug, name, category,
      "audience": audience[]->name,
      "artforms": artforms[]->name,
      amount,
      "nextRound": rounds[closeDate > now()] | order(closeDate asc)[0]
    } | order(nextRound.closeDate asc)
  `, {}, []);
}

export async function getUpcomingDeadlines(days: number = 45) {
  return safeFetch<any[]>(`
    *[_type == "fund" && count(rounds[closeDate > now() && closeDate < now() + $days * 24 * 60 * 60]) > 0]{
      slug, name,
      "audience": audience[0]->name,
      amount,
      "closeDate": rounds[closeDate > now()] | order(closeDate asc)[0].closeDate
    } | order(closeDate asc)[0...3]
  `, { days }, []);
}

export async function getLatestNews(limit: number = 3) {
  return safeFetch<any[]>(`
    *[_type == "newsArticle" && !(_id in path('drafts.**'))]
      | order(publishedAt desc)[0...$limit]{
      _id, title, slug, standfirst, publishedAt,
      "category": categories[0]->name,
      featuredImage
    }
  `, { limit }, []);
}

export async function getNewsArticle(slug: string) {
  return safeFetch<any>(
    `*[_type == "newsArticle" && slug.current == $slug][0]{
      ...,
      "author": author->{ name, role },
      "categories": categories[]->{ name, slug }
    }`,
    { slug },
    null,
  );
}

export async function listNews(limit: number = 20) {
  return safeFetch<any[]>(`
    *[_type == "newsArticle" && !(_id in path('drafts.**'))]
      | order(publishedAt desc)[0...$limit]{
      _id, title, slug, standfirst, publishedAt,
      "category": categories[0]->name,
      featuredImage
    }
  `, { limit }, []);
}
