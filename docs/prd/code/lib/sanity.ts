import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
 
export const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production',
  apiVersion: '2024-12-01',
  useCdn: true,
  perspective: 'published',
});
 
const builder = imageUrlBuilder(sanityClient);
export const urlFor = (source: any) => builder.image(source);
 
// Typed global settings fetch
export async function getGlobalSettings() {
  return sanityClient.fetch(`*[_type == "globalSettings"][0]`);
}
 
// GROQ query for content page
export async function getPage(slug: string, locale: 'en' | 'mi' = 'en') {
  return sanityClient.fetch(
    `*[_type == "page" && slug.current == $slug && locale == $locale][0]{
      _id, title, eyebrow, intro, blocks,
      "section": parentSection->{
        title, slug,
        "parent": parent->{ title, slug }
      },
      seo, lastUpdated
    }`,
    { slug, locale }
  );
}
 
export async function getFund(slug: string) {
  return sanityClient.fetch(
    `*[_type == "fund" && slug.current == $slug][0]{
      ...,
      "audience": audience[]->{ name, slug },
      "artforms": artforms[]->{ name, slug, colorToken },
      "relatedFunds": relatedFunds[]->{ name, slug, "status": rounds[0].status }
    }`,
    { slug }
  );
}
 
export async function getOpenFunds() {
  return sanityClient.fetch(`
    *[_type == "fund" && count(rounds[closeDate > now()]) > 0]{
      slug, name, category,
      "audience": audience[]->name,
      "artforms": artforms[]->name,
      amount,
      "nextRound": rounds[closeDate > now()] | order(closeDate asc)[0]
    } | order(nextRound.closeDate asc)
  `);
}
 
export async function getUpcomingDeadlines(days: number = 45) {
  return sanityClient.fetch(`
    *[_type == "fund" && count(rounds[closeDate > now() && closeDate < now() + $days * 24 * 60 * 60]) > 0]{
      slug, name,
      "audience": audience[0]->name,
      amount,
      "closeDate": rounds[closeDate > now()] | order(closeDate asc)[0].closeDate
    } | order(closeDate asc)[0...3]
  `, { days });
}
 
export async function getLatestNews(limit: number = 3) {
  return sanityClient.fetch(`
    *[_type == "newsArticle" && !(_id in path('drafts.**'))]
      | order(publishedAt desc)[0...$limit]{
      _id, title, slug, standfirst, publishedAt,
      "category": categories[0]->name,
      featuredImage
    }
  `, { limit });
}
