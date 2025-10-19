
import type { MetadataRoute } from 'next'
import { getFestivalsWithTargetDate } from '@/lib/festivals';
 
export default function sitemap(): MetadataRoute.Sitemap {
  const { allFestivalsWithDates } = getFestivalsWithTargetDate();
  const siteUrl = "https://festivalcountdown.netlify.app/";

  const festivalUrls = allFestivalsWithDates.map((festival) => ({
    url: `${siteUrl}festivals/${festival.slug}`,
    changeFrequency: 'daily' as 'daily',
  }));

  const staticUrls = [
    {
      url: siteUrl,
      changeFrequency: 'daily' as 'daily',
    },
    {
      url: `${siteUrl}about`,
      changeFrequency: 'daily' as 'daily',
    },
    {
        url: `${siteUrl}privacy-policy`,
        changeFrequency: 'daily' as 'daily',
    },
    {
        url: `${siteUrl}terms-and-conditions`,
        changeFrequency: 'daily' as 'daily',
    }
  ];
 
  return [
    ...staticUrls,
    ...festivalUrls
  ]
}
