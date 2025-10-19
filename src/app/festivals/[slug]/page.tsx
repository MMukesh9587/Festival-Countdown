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
  // We can't use the useCustomEvents hook here as this is a server function.
  // We will assume for metadata generation, we only care about the built-in festivals.
  const festival = getFestivalBySlug(slug);

  // if no festival, we can return default metadata or notFound()
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

  return {
    title: `${name} | Festival Countdown Central`,
    description: `Countdown to ${name}. ${description}`,
    openGraph: {
      title: `${name} Countdown`,
      description: description as string,
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
      title: `${name} Countdown`,
      description: description as string,
      images: [ogImage],
    },
  }
}


export default function FestivalPage({ params }: Props) {
  const slug = params.slug;

  // We fetch the default festival data on the server.
  // Custom events will be checked on the client.
  const festival = getFestivalBySlug(slug);

  // If the festival doesn't exist in the static list, it might be a custom one.
  // We'll pass the slug to the client component to handle it.
  if (!festival) {
    return <FestivalClientPage festival={null} slug={slug} />;
  }

  return <FestivalClientPage festival={festival} slug={slug} />;
}
