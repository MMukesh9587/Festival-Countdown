import Image from 'next/image';
import { BadgeCheck, Twitter, Linkedin, Globe } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function AboutPage() {
  const founder = {
    name: 'Mukesh Kumar Yogi',
    imageUrl: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEg_BXmz0vq7Ke0_UTIVGnKxrlFUXzOU9jyv-EDwrtzR8Ib06sqbdm6D3BQMjOv4LHWhDjSi1G_9ELzDPOpGjm3U2GRNnRLc9-m4Sa_I-ByjJkXpuSHnaVwEWKCWRAS1vSdigM4mnvaEJttvytp-Anlb2-bndXVuhsTEXS3k94F-47EgnQVggQMtk_PYmmyB/s320/Mukesh%20Kumar%20Yogi.jpg',
    bio: "Mukesh is the visionary founder behind Festival Countdown Central. With a passion for technology and culture, he created this platform to help people connect with and celebrate the events that matter most to them. His goal is to bring the excitement of anticipation to everyone, everywhere.",
    socials: [
        { name: 'Twitter', url: 'https://twitter.com/mukeshyogi', Icon: Twitter },
        { name: 'LinkedIn', url: 'https://linkedin.com/in/mukeshyogi', Icon: Linkedin },
        { name: 'Website', url: 'https://mukeshyogi.com', Icon: Globe },
    ]
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <article className="prose prose-invert max-w-none">
        <h1>About Festival Countdown Central</h1>
        <p>
          Welcome to Festival Countdown Central, your ultimate destination for tracking the most anticipated festivals and events from around the world. Our mission is to build excitement and help you never miss a moment of celebration.
        </p>

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

        <h2>Our Story</h2>
        <p>
          Born from a passion for cultural events and the shared joy of anticipation, Festival Countdown Central was created to be a simple, beautiful, and functional tool for everyone. Whether it's a world-renowned music festival, a traditional cultural celebration, or a personal event you're looking forward to, our platform is here to help you count down every second.
        </p>
        <h2>What We Offer</h2>
        <ul>
          <li><strong>Live Countdowns:</strong> Real-time clocks ticking down to major festivals and holidays.</li>
          <li><strong>Custom Events:</strong> Add your own personal events—birthdays, anniversaries, or private parties—and create your own countdowns.</li>
          <li><strong>Shareable Content:</strong> Share countdowns with friends and family via social media or a direct link. You can even generate a custom image to share!</li>
          <li><strong>Embeddable Widgets:</strong> Add a live countdown widget directly to your own website or blog with a simple copy-paste.</li>
        </ul>
        <p>
          We are constantly working to add new features and improve your experience. Thank you for being a part of our community!
        </p>
      </article>
    </div>
  );
}
