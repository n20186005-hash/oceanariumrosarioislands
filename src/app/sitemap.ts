import { MetadataRoute } from 'next';
import { routing } from '@/i18n/routing';
import { TOPIC_ORDER, TOPIC_SLUGS } from '@/lib/topics';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.oceanariumrosarioislands.com';
  const locales = routing.locales;
  const routes = ['', '/privacy-policy', '/terms-of-service', '/cookie-settings'];

  const sitemap: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const route of routes) {
      sitemap.push({
        url: `${baseUrl}/${locale}${route}`,
        lastModified: new Date(),
        changeFrequency: route === '' ? 'weekly' : 'monthly',
        priority: route === '' ? 1 : 0.5,
      });
    }
    for (const key of TOPIC_ORDER) {
      sitemap.push({
        url: `${baseUrl}/${locale}/${TOPIC_SLUGS[key][locale]}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.7,
      });
    }
  }

  return sitemap;
}
