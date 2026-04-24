import type { MetadataRoute } from 'next';
 
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/', disallow: ['/api/', '/_pagefind/'] },
    sitemap: 'https://creativenz.govt.nz/sitemap.xml',
  };
}
