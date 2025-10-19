import { getFestivalBySlug, festivals } from '@/lib/festivals';
import { notFound } from 'next/navigation';
import { Countdown } from '@/components/Countdown';
import { FestivalEmbedClientPage } from './FestivalEmbedClientPage';

// No need for generateStaticParams if we want to support custom events in embeds eventually.
// It will be server-rendered on-demand.

export default function FestivalEmbedPage({ params }: { params: { slug: string } }) {
  const festival = getFestivalBySlug(params.slug);

  if (!festival) {
    // For an embed, we can just show a simple error instead of a full 404 page
    return (
        <div className="h-screen w-screen flex items-center justify-center bg-background text-foreground p-4">
            <p>Countdown not found.</p>
        </div>
    );
  }

  return (
    <html lang="en" className="dark">
        <head>
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
            <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=PT+Sans:wght@400;700&display=swap" rel="stylesheet" />
            <style>{`
                @tailwind base;
                @tailwind components;
                @tailwind utilities;

                @layer base {
                  :root {
                    --background: 0 0% 13%;
                    --foreground: 0 0% 98%;
                    --card: 0 0% 15%;
                    --card-foreground: 0 0% 98%;
                    --primary: 51 100% 50%;
                    --primary-foreground: 0 0% 9%;
                    --accent: 33 100% 50%;
                    --accent-foreground: 0 0% 9%;
                    --border: 0 0% 20%;
                  }
                }

                @layer base {
                  * { @apply border-border; }
                  body { @apply bg-background text-foreground font-body; }
                }
            `}</style>
        </head>
        <body className="font-body antialiased">
            <FestivalEmbedClientPage festival={festival} />
        </body>
    </html>
  );
}
