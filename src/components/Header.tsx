import Link from 'next/link';
import { LanguageSwitcher } from './LanguageSwitcher';
import { CalendarClock } from 'lucide-react';
import { ThemeSwitcher } from './ThemeSwitcher';
import { AuthButton } from './AuthButton';

export function Header() {
  return (
    <header className="py-4 border-b border-border/50 sticky top-0 bg-background/80 backdrop-blur-sm z-20">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2">
          <CalendarClock className="w-6 h-6 text-primary" />
          <h1 className="text-xl font-bold tracking-tight">
            Festival Countdown
          </h1>
        </Link>
        <div className="flex items-center gap-4">
          <LanguageSwitcher />
          <ThemeSwitcher />
          <AuthButton />
        </div>
      </div>
    </header>
  );
}
