import Link from 'next/link';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-6 mt-12 border-t border-border/50">
      <div className="container mx-auto px-4 text-center text-muted-foreground">
        <p>&copy; {currentYear} Festival Countdown Central. All Rights Reserved.</p>
      </div>
    </footer>
  );
}
