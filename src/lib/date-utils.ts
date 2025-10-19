import { Festival } from './types';

export function getNextOccurrence(dateRule: string): Date {
  const now = new Date();
  
  // ISO string or custom event format 'YYYY-MM-DDTHH:mm'
  if (/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}/.test(dateRule)) {
    return new Date(dateRule);
  }

  // Fixed yearly date like '12-25'
  if (/^\d{2}-\d{2}$/.test(dateRule)) {
    const [month, day] = dateRule.split('-').map(Number);
    // Set to midnight in the current timezone
    let targetDate = new Date(now.getFullYear(), month - 1, day, 0, 0, 0);
    if (targetDate.getTime() < now.getTime()) {
      targetDate.setFullYear(now.getFullYear() + 1);
    }
    return targetDate;
  }
  
  // Specific date like '2024-11-01'
  if (/^\d{4}-\d{2}-\d{2}$/.test(dateRule)) {
    // This creates the date in the user's local timezone at midnight
    return new Date(dateRule + 'T00:00:00');
  }

  // Fallback for invalid formats
  return new Date();
}

export function getTimeRemaining(targetDate: Date) {
    const now = new Date();
    const diff = targetDate.getTime() - now.getTime();

    if (diff <= 0) {
        return { days: 0, hours: 0, minutes: 0, seconds: 0, expired: true };
    }

    const seconds = Math.floor((diff / 1000) % 60);
    const minutes = Math.floor((diff / 1000 / 60) % 60);
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    return { days, hours, minutes, seconds, expired: false };
}
