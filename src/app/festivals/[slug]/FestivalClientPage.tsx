

"use client";

import type { FestivalWithDate } from '@/lib/types';
import { useLanguage } from '@/context/LanguageContext';
import { Countdown } from '@/components/Countdown';
import Image from 'next/image';
import placeholderImages from '@/lib/placeholder-images.json';
import { Button } from '@/components/ui/button';
import { Heart, Trash2, Frown } from 'lucide-react';
import { useFavorites } from '@/hooks/use-favorites';
import { ShareDialog } from '@/components/ShareDialog';
import { EmbedCode } from '@/components/EmbedCode';
import { Badge } from '@/components/ui/badge';
import { useEffect, useState, useMemo } from 'react';
import { useCustomEvents } from '@/hooks/use-custom-events';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { getFestivalBySlug } from '@/lib/festivals';
import { RemindMeButton } from '@/components/RemindMeButton';
import { FounderBio } from '@/components/FounderBio';
import { FAQ } from '@/components/FAQ';
import Head from 'next/head';


interface FestivalClientPageProps {
    festival: FestivalWithDate | null;
    slug: string;
}

export function FestivalClientPage({ festival: initialFestival, slug }: FestivalClientPageProps) {
    const { language, t } = useLanguage();
    const { favorites, toggleFavorite } = useFavorites();
    const [isClient, setIsClient] = useState(false);
    const { customEvents, removeCustomEvent } = useCustomEvents();
    const router = useRouter();
    const { toast } = useToast();

    useEffect(() => {
        setIsClient(true);
    }, []);

    const festival = useMemo(() => {
        if (initialFestival) return initialFestival;
        if (!isClient) return null; // Wait for client to check custom events
        return getFestivalBySlug(slug, customEvents);
    }, [initialFestival, slug, customEvents, isClient]);

    // Loading state
    if (!isClient || festival === undefined) {
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
    
    const name = typeof festival.name === 'string' ? festival.name : (festival.name[language] || festival.name['en']);
    const description = typeof festival.description === 'string' ? festival.description : (festival.description?.[language] || festival.description?.['en']);

    const isFav = isClient && favorites.includes(festival.id);
    const formattedDate = festival.targetDate.toLocaleDateString(language, {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    const handleDelete = () => {
        if (festival.custom) {
            removeCustomEvent(festival.id);
            toast({
                title: 'Event Removed',
                description: 'The custom event has been deleted.',
            });
            router.push('/');
        }
    };

    const blogContent = festival.blog?.[language] || festival.blog?.['en'] || `
        <h1>${t('blog_title_1')}</h1>
        <p>${t('blog_p_1')}</p>
        <h2>${t('blog_title_2')}</h2>
        <p>${t('blog_p_2')}</p>
        <h3>${t('blog_title_3')}</h3>
        <p>${t('blog_p_3')}</p>
        <h2>${t('blog_title_4')}</h2>
        <p>${t('blog_p_4')}</p>
        <h3>${t('blog_title_5')}</h3>
        <p>${t('blog_p_5')}</p>
        <h2>${t('blog_title_6')}</h2>
        <p>${t('blog_p_6')}</p>
        <h3>${t('blog_title_7')}</h3>
        <p>${t('blog_p_7')}</p>
    `;
    
    let imageUrl: string;
    let imageHint: string | undefined;

    const imagePlaceholder = placeholderImages.placeholderImages.find(p => p.id === festival.image);

    if (festival.custom && festival.image.startsWith('http')) {
        imageUrl = festival.image;
        imageHint = 'custom event';
    } else if (imagePlaceholder) {
        imageUrl = imagePlaceholder.imageUrl;
        imageHint = imagePlaceholder.imageHint;
    } else {
        const defaultImage = placeholderImages.placeholderImages.find(p => p.id === 'event-default');
        imageUrl = defaultImage?.imageUrl || "https://picsum.photos/seed/default/1200/630";
        imageHint = defaultImage?.imageHint;
    }

    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": festival.faq?.map(item => ({
            "@type": "Question",
            "name": item.question[language] || item.question['en'],
            "acceptedAnswer": {
                "@type": "Answer",
                "text": item.answer[language] || item.answer['en']
            }
        }))
    };

    const howToSchema = {
        "@context": "https://schema.org",
        "@type": "HowTo",
        "name": `How to celebrate ${name}`,
        "step": [
            {
                "@type": "HowToStep",
                "name": "Visit a Gurdwara",
                "text": "Participate in prayers and listen to kirtan (devotional songs)."
            },
            {
                "@type": "HowToStep",
                "name": "Participate in Langar",
                "text": "Partake in the community meal served at Gurdwaras, symbolizing equality."
            },
            {
                "@type": "HowToStep",
                "name": "Light up your home",
                "text": "Decorate your home with lights and candles to mark the festive occasion."
            }
        ]
    };


    return (
        <>
            {festival.faq && (
                 <Head>
                    <script type="application/ld+json">
                        {JSON.stringify(faqSchema)}
                    </script>
                    <script type="application/ld+json">
                        {JSON.stringify(howToSchema)}
                    </script>
                </Head>
            )}
            <div className="container mx-auto px-4 py-8">
                <div className="relative rounded-xl overflow-hidden min-h-[40vh] md:min-h-[50vh] flex flex-col justify-end p-8 md:p-12 text-white bg-card">
                    <Image
                    src={imageUrl}
                    alt={name || ''}
                    fill
                    className="object-cover"
                    priority
                    data-ai-hint={imageHint}
                    />
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
                    <RemindMeButton festival={festival} />
                    <EmbedCode slug={festival.slug} />
                    {festival.custom && (
                        <Button
                            variant="destructive"
                            size="lg"
                            onClick={handleDelete}
                            aria-label="Delete event"
                        >
                            <Trash2 className="mr-2 h-5 w-5" />
                            Delete Event
                        </Button>
                    )}
                </div>

                <div 
                    className="mt-16 prose prose-invert max-w-none prose-headings:text-foreground prose-h1:text-primary prose-h1:font-headline prose-p:text-muted-foreground prose-h2:text-foreground prose-h3:text-foreground"
                    dangerouslySetInnerHTML={{ __html: blogContent }}
                />
                
                {festival.faq && <FAQ faqs={festival.faq} />}
                {festival.blog && <FounderBio />}
            </div>
        </>
    );
}
