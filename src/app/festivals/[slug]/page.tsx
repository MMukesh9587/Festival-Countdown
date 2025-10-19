
"use client";

import { getFestivalBySlug } from '@/lib/festivals';
import { notFound } from 'next/navigation';
import { FestivalClientPage } from './FestivalClientPage';
import { useCustomEvents } from '@/hooks/use-custom-events';
import { useEffect, useState } from 'react';
import type { FestivalWithDate } from '@/lib/types';
import { Frown } from 'lucide-react';

export default function FestivalPage({ params }: { params: { slug: string } }) {
  const { customEvents } = useCustomEvents();
  const [festival, setFestival] = useState<FestivalWithDate | null | undefined>(undefined);

  useEffect(() => {
    // This code runs only on the client
    const foundFestival = getFestivalBySlug(params.slug, customEvents);
    setFestival(foundFestival);
  }, [params.slug, customEvents]);

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
