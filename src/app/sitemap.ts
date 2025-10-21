
import type { MetadataRoute } from 'next'
import { getFestivalsWithTargetDate } from '@/lib/festivals';
 
export default function sitemap(): MetadataRoute.Sitemap {
  const { allFestivalsWithDates } = getFestivalsWithTargetDate();
  const siteUrl = "https://festivalcountdown.netlify.app/";
  const now = new Date();

  const festivalUrls = allFestivalsWithDates.map((festival) => ({
    url: `${siteUrl}festivals/${festival.slug}`,
    lastModified: now,
    changeFrequency: 'daily' as 'daily',
  }));

  const staticUrls = [
    {
      url: siteUrl,
      lastModified: now,
      changeFrequency: 'daily' as 'daily',
    },
    {
      url: `${siteUrl}about`,
      lastModified: now,
      changeFrequency: 'monthly' as 'monthly',
    },
    {
        url: `${siteUrl}privacy-policy`,
        lastModified: now,
        changeFrequency: 'monthly' as 'monthly',
    },
    {
        url: `${siteUrl}terms-and-conditions`,
        lastModified: now,
        changeFrequency: 'monthly' as 'monthly',
    }
  ];
 
  return [
    ...staticUrls,
    ...festivalUrls
  ]
}
