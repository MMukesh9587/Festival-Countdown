
import type { MetadataRoute } from 'next'
import { getFestivalsWithTargetDate } from '@/lib/festivals';
 
export default function sitemap(): MetadataRoute.Sitemap {
  const { allFestivalsWithDates } = getFestivalsWithTargetDate();
  const siteUrl = "https://festivalcountdown.netlify.app/";

  const festivalUrls = allFestivalsWithDates.map((festival) => ({
    url: `${siteUrl}festivals/${festival.slug}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as 'daily',
  }));

  const staticUrls = [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as 'daily',
    },
    {
      url: `${siteUrl}about`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as 'monthly',
    },
    {
        url: `${siteUrl}privacy-policy`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as 'monthly',
    },
    {
        url: `${siteUrl}terms-and-conditions`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as 'monthly',
    }
  ];
 
  return [
    ...staticUrls,
    ...festivalUrls
  ]
}
