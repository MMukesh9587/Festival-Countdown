"use client";

import { Countdown } from '@/components/Countdown';
import type { FestivalWithDate } from '@/lib/types';
import Link from 'next/link';

export function FestivalEmbedClientPage({ festival }: { festival: FestivalWithDate }) {
    const name = typeof festival.name === 'string' ? festival.name : (festival.name['en'] || Object.values(festival.name)[0]);

    return (
        <div className="h-full w-full flex flex-col items-center justify-center p-2 bg-card rounded-lg text-center">
            <h3 className="font-headline text-lg text-primary truncate">{name}</h3>
            <div className="my-2">
                <Countdown targetDate={festival.targetDate} size="small" />
            </div>
            <Link href={`/festivals/${festival.slug}`} target="_blank" className="text-xs text-muted-foreground hover:text-primary transition-colors">
                View on site
            </Link>
        </div>
    );
}
