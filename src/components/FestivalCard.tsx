
"use client";

import Link from 'next/link';
import type { FestivalWithDate } from '@/lib/types';
import { useLanguage } from '@/context/LanguageContext';
import { Countdown } from './Countdown';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { ArrowRight, Heart, Trash2 } from 'lucide-react';
import Image from 'next/image';
import placeholderImagesData from '@/lib/placeholder-images.json';
import { useFavorites } from '@/hooks/use-favorites';
import { Badge } from './ui/badge';
import { useEffect, useState } from 'react';

interface FestivalCardProps {
  festival: FestivalWithDate;
  onDelete?: (id: string) => void;
}

export function FestivalCard({ festival, onDelete }: FestivalCardProps) {
  const { language, t } = useLanguage();
  const { isFavorite, toggleFavorite } = useFavorites();
  const name = typeof festival.name === 'string' ? festival.name : festival.name[language];
  
  const [isClient, setIsClient] = useState(false);
  
  useEffect(() => {
    setIsClient(true);
  }, []);

  const isFav = isClient && isFavorite(festival.id);
  
  let imageUrl: string;
  let imageHint: string | undefined;

  const imagePlaceholder = placeholderImagesData.placeholderImages.find(p => p.id === festival.image);

  if (festival.custom && festival.image.startsWith('http')) {
      imageUrl = festival.image;
      imageHint = 'custom event';
  } else if (imagePlaceholder) {
      imageUrl = imagePlaceholder.imageUrl;
      imageHint = imagePlaceholder.imageHint;
  } else {
      const defaultImage = placeholderImagesData.placeholderImages.find(p => p.id === 'event-default');
      imageUrl = defaultImage?.imageUrl || "https://picsum.photos/seed/default/600/400";
      imageHint = defaultImage?.imageHint;
  }


  return (
    <Card className="flex flex-col h-full overflow-hidden transition-all duration-300 hover:shadow-primary/20 hover:shadow-lg hover:-translate-y-1">
      <CardHeader className="p-0">
        <div className="relative h-48">
            <Image
            src={imageUrl}
            alt={name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            data-ai-hint={imageHint}
            />
           <div className="absolute top-3 right-3 flex gap-2">
             {festival.custom && onDelete && (
                <Button
                    variant={'destructive'}
                    size="icon"
                    onClick={(e) => {
                      e.preventDefault();
                      onDelete(festival.id);
                    }}
                    aria-label={'Delete event'}
                    className='rounded-full h-9 w-9 bg-black/50 hover:bg-black/70 border-none'
                >
                    <Trash2 className="h-5 w-5 text-white" />
                </Button>
             )}
             <Button
                variant={isFav ? 'destructive' : 'secondary'}
                size="icon"
                onClick={(e) => {
                  e.preventDefault();
                  toggleFavorite(festival.id);
                }}
                aria-label={isFav ? t('remove_from_favorites') : t('add_to_favorites')}
                className='rounded-full h-9 w-9 bg-black/50 hover:bg-black/70 border-none'
              >
                <Heart className={`h-5 w-5 ${isFav ? 'fill-red-500 text-red-500' : 'text-white'}`} />
              </Button>
           </div>
           {festival.custom && <Badge className="absolute top-3 left-3 bg-accent text-accent-foreground">{t('custom_event')}</Badge>}
        </div>
      </CardHeader>
      <CardContent className="flex-grow pt-6">
        <CardTitle className="font-headline text-2xl mb-4 truncate">{name}</CardTitle>
        <Countdown targetDate={festival.targetDate} size="medium" />
      </CardContent>
      <CardFooter>
        <Button asChild variant="link" className="p-0">
          <Link href={`/festivals/${festival.slug}`}>
            View Details <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
