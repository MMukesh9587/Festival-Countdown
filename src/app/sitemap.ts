import type { MetadataRoute } from 'next'
import { getFestivalsWithTargetDate } from '@/lib/festivals';
 
export default function sitemap(): MetadataRoute.Sitemap {
  const { allFestivalsWithDates } = getFestivalsWithTargetDate();
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://festival-countdown-central.com';

  const festivalUrls = allFestivalsWithDates.map((festival) => ({
    url: `${siteUrl}/festivals/${festival.slug}`,
    lastModified: new Date(),
  }));
 
  return [
    {
      url: siteUrl,
      lastModified: new Date(),
    },
    ...festivalUrls
  ]
}