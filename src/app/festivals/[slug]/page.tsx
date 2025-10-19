import { getFestivalBySlug, festivals } from '@/lib/festivals';
import { notFound } from 'next/navigation';
import { Countdown } from '@/components/Countdown';
import { LanguageProvider, useLanguage } from '@/context/LanguageContext';
import { FestivalClientPage } from './FestivalClientPage';
import type { Metadata } from 'next';
import placeholderImagesData from '@/lib/placeholder-images.json';


export async function generateStaticParams() {
  return festivals.map((festival) => ({
    slug: festival.slug,
  }));
}

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const festival = getFestivalBySlug(params.slug);
  
  if (!festival) {
    return {
      title: 'Festival Not Found',
    }
  }
  
  const nameEn = typeof festival.name === 'string' ? festival.name : festival.name['en'];
  const descEn = typeof festival.description === 'string' ? festival.description : festival.description?.['en'] || `Countdown to ${nameEn}`;
  const imagePlaceholder = placeholderImagesData.placeholderImages.find(p => p.id === festival.image);

  return {
    title: `${nameEn} Countdown`,
    description: descEn,
    openGraph: {
      title: `${nameEn} Countdown`,
      description: descEn,
      images: imagePlaceholder ? [
        {
          url: imagePlaceholder.imageUrl,
          width: 1200,
          height: 630,
          alt: nameEn,
        }
      ] : [],
    }
  };
}


export default function FestivalPage({ params }: Props) {
  // We can't use hooks in Server Components, so we'll pass data to a client component
  const festival = getFestivalBySlug(params.slug);

  if (!festival) {
    notFound();
  }

  return <FestivalClientPage festival={festival} />;
}
