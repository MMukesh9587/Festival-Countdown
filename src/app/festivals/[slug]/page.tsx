
import type { Metadata, ResolvingMetadata } from 'next';
import { festivals, getFestivalBySlug as getFestivalInfoBySlug } from '@/lib/festivals';
import { FestivalClientPage } from './FestivalClientPage';
import type { Festival, FestivalWithDate } from '@/lib/types';
import { Frown } from 'lucide-react';
import placeholderImages from '@/lib/placeholder-images.json';
import { notFound } from 'next/navigation';
import fs from 'fs';
import path from 'path';
import { getNextOccurrence } from '@/lib/date-utils';

type Props = {
  params: { slug: string }
}

// Function to read detailed festival data from JSON files.
function getFestivalDetails(festivalId: string): Pick<Festival, 'blog' | 'faq' | 'schema'> | null {
  const filePath = path.join(process.cwd(), 'src', 'lib', 'data', `${festivalId}.json`);
  try {
    if (fs.existsSync(filePath)) {
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      return JSON.parse(fileContent);
    }
  } catch (error) {
    console.error(`Error reading or parsing festival details for ${festivalId}:`, error);
  }
  return { blog: {}, faq: [], schema: {} };
}


function getFestivalBySlug(slug: string): FestivalWithDate | null {
  const festivalInfo = festivals.find(f => f.slug === slug);
  if (!festivalInfo) return null;

  const details = getFestivalDetails(festivalInfo.id);

  return {
    ...festivalInfo,
    ...details, // This will add 'blog', 'faq', and 'schema' properties
    targetDate: getNextOccurrence(festivalInfo.date_rule),
  };
}


export async function generateStaticParams() {
    return festivals.map((festival) => ({
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

  // We fetch server-side data here, including blog/faq
  const festival = getFestivalBySlug(slug);

  // If a static festival isn't found, we'll let the client page handle it
  // This allows the client to check for custom events from local storage.
  if (!festival) {
    return <FestivalClientPage festival={null} slug={slug} />;
  }

  return <FestivalClientPage festival={festival} slug={slug} />;
}

    