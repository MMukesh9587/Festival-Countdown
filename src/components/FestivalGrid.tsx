"use client";

import { useState, useMemo } from 'react';
import { FestivalCard } from './FestivalCard';
import type { FestivalWithDate } from '@/lib/types';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { PlusCircle, Search } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { AddEventDialog } from './AddEventDialog';
import { useCustomEvents } from '@/hooks/use-custom-events';
import { getNextOccurrence } from '@/lib/date-utils';
import { useFavorites } from '@/hooks/use-favorites';
import { Label } from './ui/label';
import { Switch } from './ui/switch';

interface FestivalGridProps {
  initialFestivals: FestivalWithDate[];
}

export function FestivalGrid({ initialFestivals }: FestivalGridProps) {
  const { t } = useLanguage();
  const { customEvents, addCustomEvent } = useCustomEvents();
  const [searchQuery, setSearchQuery] = useState('');
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const { favorites } = useFavorites();
  const { language } = useLanguage();

  const allFestivals = useMemo(() => {
    const customEventsWithDates = customEvents.map(event => ({
      ...event,
      targetDate: getNextOccurrence(event.date_rule),
    }));
    return [...initialFestivals, ...customEventsWithDates].sort((a,b) => a.targetDate.getTime() - b.targetDate.getTime());
  }, [initialFestivals, customEvents]);


  const filteredFestivals = useMemo(() => {
    return allFestivals.filter(festival => {
      const name = typeof festival.name === 'string' ? festival.name : festival.name[language];
      const matchesSearch = name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesFavorites = !showFavoritesOnly || favorites.includes(festival.id);
      return matchesSearch && matchesFavorites;
    });
  }, [allFestivals, searchQuery, language, showFavoritesOnly, favorites]);

  return (
    <div className='@container'>
      <div className="flex flex-col @md:flex-row justify-between items-center mb-8 gap-4">
        <h3 className="font-headline text-4xl text-primary">{t('all_festivals')}</h3>
        <div className='flex flex-col @md:flex-row items-center gap-4 w-full @md:w-auto'>
            <div className="relative w-full @md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder={t('search_festivals')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex items-center space-x-2">
                <Switch 
                    id="favorites-only"
                    checked={showFavoritesOnly}
                    onCheckedChange={setShowFavoritesOnly}
                />
                <Label htmlFor="favorites-only">{t('show_favorites')}</Label>
            </div>
            <AddEventDialog onAddEvent={addCustomEvent}>
              <Button className="w-full @md:w-auto bg-accent hover:bg-accent/90">
                <PlusCircle className="mr-2 h-5 w-5" />
                {t('add_custom_event')}
              </Button>
            </AddEventDialog>
        </div>
      </div>
      {filteredFestivals.length > 0 ? (
        <div className="grid grid-cols-1 @lg:grid-cols-2 @4xl:grid-cols-3 gap-6">
          {filteredFestivals.map(festival => (
            <FestivalCard key={festival.id} festival={festival} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 text-muted-foreground">
          <p>No festivals match your criteria.</p>
        </div>
      )}
    </div>
  );
}
