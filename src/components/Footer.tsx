import Link from 'next/link';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-8 mt-16 border-t border-border/50">
      <div className="container mx-auto px-4 text-center text-muted-foreground">
        <div className="flex justify-center gap-4 md:gap-6 mb-4">
          <Link href="/about" className="text-sm hover:text-primary transition-colors">
            About Us
          </Link>
          <Link href="/privacy-policy" className="text-sm hover:text-primary transition-colors">
            Privacy Policy
          </Link>
          <Link href="/terms-and-conditions" className="text-sm hover:text-primary transition-colors">
            Terms &amp;amp; Conditions
          </Link>
        </div>
        <p>&copy; {currentYear} Festival Countdown Central. All Rights Reserved.</p>
      </div>
    </footer>
  );
}
