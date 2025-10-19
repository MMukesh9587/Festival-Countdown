
"use client";

import { getFestivalBySlug } from '@/lib/festivals';
import { FestivalClientPage } from './FestivalClientPage';
import { useCustomEvents } from '@/hooks/use-custom-events';
import { useEffect, useState } from 'react';
import type { FestivalWithDate } from '@/lib/types';
import { Frown } from 'lucide-react';
import { useParams } from 'next/navigation';

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
