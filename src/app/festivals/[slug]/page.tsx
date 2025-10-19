
import type { Metadata, ResolvingMetadata } from 'next';
import { getFestivalBySlug } from '@/lib/festivals';
import { FestivalClientPage } from './FestivalClientPage';
import { useCustomEvents } from '@/hooks/use-custom-events';
import { useEffect, useState } from 'react';
import type { FestivalWithDate } from '@/lib/types';
import { Frown } from 'lucide-react';
import { useParams } from 'next/navigation';
import placeholderImages from '@/lib/placeholder-images.json';
import { notFound } from 'next/navigation';

type Props = {
  params: { slug: string }
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
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || new URL('https://festival-countdown-central.com');
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


export default function FestivalPage() {
  const params = useParams();
  const slug = typeof params.slug === 'string' ? params.slug : '';

  const { customEvents } = useCustomEvents();
  const [festival, setFestival] = useState<FestivalWithDate | null | undefined>(undefined);

  useEffect(() => {
    if (slug) {
      // This code runs only on the client
      const foundFestival = getFestivalBySlug(slug, customEvents);
      setFestival(foundFestival);
    }
  }, [slug, customEvents]);

  // Loading state
  if (festival === undefined) {
    return (
        <div className="container mx-auto px-4 py-20 text-center">
            <p>Loading...</p>
        </div>
    );
  }

  // Not found state
  if (!festival) {
    return (
        <div className="container mx-auto px-4 py-20 text-center">
          <Frown className="mx-auto h-24 w-24 text-primary" />
          <h1 className="mt-8 font-headline text-5xl text-primary">404 - Not Found</h1>
          <p className="mt-4 text-lg text-muted-foreground">The festival or page you are looking for does not exist.</p>
        </div>
      );
  }

  // Render the page once the festival is found
  return <FestivalClientPage festival={festival} />;
}

