"use client";

import { useState, useEffect } from 'react';
import { getTimeRemaining } from '@/lib/date-utils';
import { useLanguage } from '@/context/LanguageContext';

interface CountdownProps {
  targetDate: Date;
  className?: string;
  size?: 'small' | 'medium' | 'large';
}

export function Countdown({ targetDate, className, size = 'medium' }: CountdownProps) {
  const [remaining, setRemaining] = useState(() => getTimeRemaining(targetDate));
  const { t } = useLanguage();

  useEffect(() => {
    if (remaining.expired) return;

    const interval = setInterval(() => {
      const newRemaining = getTimeRemaining(targetDate);
      setRemaining(newRemaining);
      if (newRemaining.expired) {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate, remaining.expired]);

  const sizeClasses = {
    small: {
      wrapper: 'gap-2',
      time: 'text-2xl',
      label: 'text-xs'
    },
    medium: {
      wrapper: 'gap-4 md:gap-6',
      time: 'text-4xl md:text-5xl font-bold',
      label: 'text-sm md:text-base'
    },
    large: {
      wrapper: 'gap-4 md:gap-8',
      time: 'text-6xl md:text-8xl font-bold font-headline text-primary',
      label: 'text-base md:text-lg text-muted-foreground'
    }
  }
  
  const currentSize = sizeClasses[size];

  if (remaining.expired) {
    return (
      <div className={`text-center ${className}`}>
        <h2 className={`font-headline text-4xl md:text-6xl text-accent`}>{t('happening_now')}</h2>
      </div>
    );
  }

  return (
    <div className={`flex justify-center ${currentSize.wrapper} text-center ${className}`}>
      <div>
        <div className={currentSize.time}>{String(remaining.days).padStart(2, '0')}</div>
        <div className={currentSize.label}>{t('days')}</div>
      </div>
      <div>
        <div className={currentSize.time}>{String(remaining.hours).padStart(2, '0')}</div>
        <div className={currentSize.label}>{t('hours')}</div>
      </div>
      <div>
        <div className={currentSize.time}>{String(remaining.minutes).padStart(2, '0')}</div>
        <div className={currentSize.label}>{t('minutes')}</div>
      </div>
      <div>
        <div className={currentSize.time}>{String(remaining.seconds).padStart(2, '0')}</div>
        <div className={currentSize.label}>{t('seconds')}</div>
      </div>
    </div>
  );
}
