import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Frown } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-20 text-center">
      <Frown className="mx-auto h-24 w-24 text-primary" />
      <h1 className="mt-8 font-headline text-5xl text-primary">404 - Not Found</h1>
      <p className="mt-4 text-lg text-muted-foreground">The festival or page you are looking for does not exist.</p>
      <Button asChild className="mt-8">
        <Link href="/">Go to Homepage</Link>
      </Button>
    </div>
  );
}
