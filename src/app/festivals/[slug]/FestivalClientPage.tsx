
"use client";

import type { FestivalWithDate } from '@/lib/types';
import { useLanguage } from '@/context/LanguageContext';
import { Countdown } from '@/components/Countdown';
import Image from 'next/image';
import placeholderImages from '@/lib/placeholder-images.json';
import { Button } from '@/components/ui/button';
import { Heart } from 'lucide-react';
import { useFavorites } from '@/hooks/use-favorites';
import { ShareDialog } from '@/components/ShareDialog';
import { EmbedCode } from '@/components/EmbedCode';
import { Badge } from '@/components/ui/badge';

interface FestivalClientPageProps {
    festival: FestivalWithDate;
}

export function FestivalClientPage({ festival }: FestivalClientPageProps) {
    const { language, t } = useLanguage();
    const { isFavorite, toggleFavorite } = useFavorites();
    
    const name = typeof festival.name === 'string' ? festival.name : festival.name[language];
    const description = typeof festival.description === 'string' ? festival.description : festival.description?.[language];
    const imagePlaceholder = placeholderImages.placeholderImages.find(p => p.id === festival.image);

    const isFav = isFavorite(festival.id);
    const formattedDate = festival.targetDate.toLocaleDateString(language, {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="relative rounded-xl overflow-hidden min-h-[40vh] md:min-h-[50vh] flex flex-col justify-end p-8 md:p-12 text-white bg-card">
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
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent"></div>
                <div className="relative z-10">
                    {festival.custom && <Badge className="mb-2 bg-accent text-accent-foreground">{t('custom_event')}</Badge>}
                    <h1 className="font-headline text-5xl md:text-7xl">{name}</h1>
                    <p className="mt-2 text-lg text-muted-foreground">{description}</p>
                    <p className="mt-1 font-semibold text-primary">{formattedDate}</p>
                </div>
            </div>

            <div className="my-12">
                <Countdown targetDate={festival.targetDate} size="large" />
            </div>

            <div className="flex justify-center items-center gap-4 flex-wrap">
                <Button
                    variant={isFav ? 'destructive' : 'outline'}
                    size="lg"
                    onClick={() => toggleFavorite(festival.id)}
                    aria-label={isFav ? t('remove_from_favorites') : t('add_to_favorites')}
                >
                    <Heart className={`mr-2 h-5 w-5 ${isFav ? 'fill-current' : ''}`} />
                    {isFav ? t('favorited') : t('add_to_favorites')}
                </Button>
                <ShareDialog festival={festival} />
                <EmbedCode slug={festival.slug} />
            </div>

            <div className="mt-16 prose prose-invert max-w-none prose-headings:text-foreground prose-h1:text-primary prose-h1:font-headline prose-p:text-muted-foreground">
                <h1>Never Miss a Moment</h1>
                <p>
                    Our countdown timer is more than just a clock. It&apos;s your personal portal to the celebrations that matter most. Here&apos;s how you can make the most of it.
                </p>

                <h2>Personalize Your Experience with Favorites</h2>
                <p>
                    Click the &quot;Add to Favorites&quot; button to save this countdown. Your favorite events are always just a click away, making it easy to keep track of multiple upcoming celebrations.
                </p>

                <h3>How it Works</h3>
                <p>
                    When you favorite an event, we save it in your browser. The next time you visit, you can filter to see just your favorited events, creating a personalized dashboard of anticipation.
                </p>

                <h2>Share the Excitement</h2>
                <p>
                    Anticipation is better when shared! Use the &quot;Share Countdown&quot; feature to spread the excitement with friends and family.
                </p>

                <h3>Share a Link or a Custom Image</h3>
                <p>
                    You can copy a direct link to this countdown page or generate a beautiful, shareable image with a custom message. It&apos;s perfect for social media, messaging apps, or anywhere you want to build hype.
                </p>

                <h2>Embed on Your Website</h2>
                <p>
                    Are you a blogger, event organizer, or just want to feature this countdown on your own site? The &quot;Embed Countdown&quot; feature gives you a simple snippet of code to do just that.
                </p>
                
                <h3>Simple and Customizable</h3>
                <p>
                    Just copy the provided HTML code and paste it into your website&apos;s editor. The embedded countdown is a lightweight, stylish, and live-updating widget that brings the energy of the countdown directly to your audience.
                </p>
            </div>
        </div>
    );
}
