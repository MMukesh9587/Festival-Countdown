import Image from 'next/image';
import { BadgeCheck, Twitter, Linkedin, Globe } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export function FounderBio() {
    const founder = {
        name: 'Mukesh Kumar Yogi',
        imageUrl: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEg_BXmz0vq7Ke0_UTIVGnKxrlFUXzOU9jyv-EDwrtzR8Ib06sqbdm6D3BQMjOv4LHWhDjSi1G_9ELzDPOpGjm3U2GRNnRLc9-m4Sa_I-ByjJkXpuSHnaVwEWKCWRAS1vSdigM4mnvaEJttvytp-Anlb2-bndXVuhsTEXS3k94F-47EgnQVggQMtk_PYmmyB/s320/Mukesh%20Kumar%20Yogi.jpg',
        bio: "Mukesh is the visionary founder behind Festival Countdown Central. With a passion for technology and culture, he created this platform to help people connect with and celebrate the events that matter most to them.",
        socials: [
            { name: 'Twitter', url: 'https://x.com/BajTimes', Icon: Twitter },
            { name: 'LinkedIn', url: 'https://linkedin.com/in/mukeshyogi', Icon: Linkedin },
            { name: 'Website', url: 'https://www.bajtimes.com', Icon: Globe },
        ]
    };

    return (
        <div className="not-prose my-16 flex flex-col items-center gap-8 rounded-xl border border-border bg-card p-8 text-center shadow-lg md:flex-row md:text-left">
            <div className="relative h-32 w-32 flex-shrink-0">
                <Image
                    src={founder.imageUrl}
                    alt={founder.name}
                    width={128}
                    height={128}
                    className="rounded-full object-cover ring-4 ring-primary"
                />
            </div>
            <div>
                <div className="flex items-center justify-center gap-2 md:justify-start">
                    <h2 className="m-0 font-headline text-3xl text-primary">{founder.name}</h2>
                    <BadgeCheck className="h-7 w-7 text-blue-500" />
                </div>
                <p className="mt-1 text-sm font-semibold text-muted-foreground">Founder</p>
                <p className="mt-4 text-card-foreground">{founder.bio}</p>
                <div className="mt-4 flex justify-center gap-2 md:justify-start">
                    {founder.socials.map((social) => (
                        <Button asChild key={social.name} variant="outline" size="icon">
                            <Link href={social.url} target="_blank" rel="noopener noreferrer" aria-label={social.name}>
                                <social.Icon className="h-5 w-5" />
                            </Link>
                        </Button>
                    ))}
                </div>
            </div>
        </div>
    );
}
