import type { Metadata, ResolvingMetadata } from 'next';
import { getFestivalBySlug, getFestivalsWithTargetDate } from '@/lib/festivals';
import { FestivalClientPage } from './FestivalClientPage';
import type { FestivalWithDate } from '@/lib/types';
import { Frown } from 'lucide-react';
import placeholderImages from '@/lib/placeholder-images.json';
import { notFound } from 'next/navigation';

type Props = {
  params: { slug: string }
}

export async function generateStaticParams() {
    const { allFestivalsWithDates } = getFestivalsWithTargetDate();
    return allFestivalsWithDates.map((festival) => ({
      slug: festival.slug,
    }));
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const slug = params.slug;
  const festival = getFestivalBySlug(slug);

  if (!festival) {
    return {
      title: 'Festival Not Found',
      description: 'The festival you are looking for does not exist.',
    }
  }

  const name = typeof festival.name === 'string' ? festival.name : festival.name['en'];
  const description = (typeof festival.description === 'string' ? festival.description : festival.description?.['en']) || (await parent).description;
  const imagePlaceholder = placeholderImages.placeholderImages.find(p => p.id === festival.image);
  const siteUrl = "https://festivalcountdown.netlify.app/";
  const ogImage = imagePlaceholder ? imagePlaceholder.imageUrl : `${siteUrl}/og-image.png`;

  const keywords = [
    name,
    `${name} countdown`,
    `${name} date`,
    `when is ${name}`,
    'Indian festivals',
    'Hindu festivals',
    ...(festival.tags || [])
  ];

  return {
    title: `${name} ${new Date().getFullYear()} Countdown | Festival Countdown Central`,
    description: `Countdown to ${name} ${new Date().getFullYear()}. ${description}. Get live countdown, date, and details.`,
    keywords: keywords,
    openGraph: {
      title: `${name} ${new Date().getFullYear()} Countdown`,
      description: `Live countdown and details for ${name}.`,
      url: `${siteUrl}/festivals/${slug}`,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: `Countdown image for ${name}`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${name} ${new Date().getFullYear()} Countdown`,
      description: `Live countdown and details for ${name}.`,
      images: [ogImage],
    },
  }
}


export default function FestivalPage({ params }: Props) {
  const slug = params.slug;

  const festival = getFestivalBySlug(slug);

  if (!festival) {
    return <FestivalClientPage festival={null} slug={slug} />;
  }

  return <FestivalClientPage festival={festival} slug={slug} />;
}
