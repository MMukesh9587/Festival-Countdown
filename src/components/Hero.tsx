"use client";

import type { FestivalWithDate } from '@/lib/types';
import { useLanguage } from '@/context/LanguageContext';
import { Countdown } from './Countdown';
import Image from 'next/image';
import placeholderImages from '@/lib/placeholder-images.json';
import Link from 'next/link';
import { Button } from './ui/button';
import { ArrowRight } from 'lucide-react';

interface HeroProps {
  festival: FestivalWithDate;
}

export function Hero({ festival }: HeroProps) {
  const { language, t } = useLanguage();
  const name = typeof festival.name === 'string' ? festival.name : festival.name[language];
  const imagePlaceholder = placeholderImages.placeholderImages.find(p => p.id === festival.image);

  return (
    <section className="relative rounded-xl overflow-hidden text-center py-20 md:py-32 flex items-center justify-center min-h-[60vh] bg-card shadow-lg">
      {imagePlaceholder && (
        <Image
          src={imagePlaceholder.imageUrl}
          alt={name}
          fill
          className="object-cover"
          priority
          data-ai-hint={imagePlaceholder.imageHint}
        />
      )}
      <div className="absolute inset-0 bg-black/60"></div>
      <div className="relative z-10 text-white max-w-4xl mx-auto px-4">
        <p className="text-lg md:text-xl font-semibold text-primary mb-2">{t('next_festival')}</p>
        <h2 className="font-headline text-5xl md:text-7xl mb-6">{name}</h2>
        <Countdown targetDate={festival.targetDate} size="large" className="mb-8" />
        <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
          <Link href={`/festivals/${festival.slug}`}>
            View Details <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </Button>
      </div>
    </section>
  );
}
