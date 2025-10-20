"use client";

import { useEffect, useRef } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { getTimeRemaining } from '@/lib/date-utils';
import type { FestivalWithDate } from '@/lib/types';
import placeholderImagesData from '@/lib/placeholder-images.json';
import { Button } from './ui/button';

interface ShareCanvasProps {
  festival: FestivalWithDate;
  customMessage: string;
  onImageGenerated: (dataUrl: string) => void;
}

export function ShareCanvas({ festival, customMessage, onImageGenerated }: ShareCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { language, t } = useLanguage();

  const draw = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = 1200;
    const height = 630;
    canvas.width = width;
    canvas.height = height;

    const name = typeof festival.name === 'string' ? festival.name : (festival.name[language] || festival.name['en']);
    const remaining = getTimeRemaining(festival.targetDate);
    const imagePlaceholder = placeholderImagesData.placeholderImages.find(p => p.id === festival.image);

    // Background
    const bg = new Image();
    bg.crossOrigin = "anonymous";
    bg.src = imagePlaceholder?.imageUrl || "https://picsum.photos/seed/default/1200/630";
    
    bg.onload = () => {
      ctx.drawImage(bg, 0, 0, width, height);
      // Overlay
      ctx.fillStyle = 'rgba(0, 0, 0, 0.6)';
      ctx.fillRect(0, 0, width, height);

      // Festival Name
      ctx.fillStyle = '#FFD700'; // primary
      ctx.font = 'bold 96px "Playfair Display", serif';
      ctx.textAlign = 'center';
      ctx.fillText(name || '', width / 2, 180);

      // Countdown Days
      if (!remaining.expired) {
        ctx.fillStyle = '#FFFFFF';
        ctx.font = 'bold 180px "PT Sans", sans-serif';
        ctx.fillText(String(remaining.days), width / 2, 380);
        ctx.font = '48px "PT Sans", sans-serif';
        ctx.fillText(t('days'), width / 2, 450);
      } else {
        ctx.fillStyle = '#FF8C00'; // accent
        ctx.font = 'bold 96px "PT Sans", sans-serif';
        ctx.fillText(t('happening_now'), width / 2, 380);
      }

      // Custom Message
      if (customMessage) {
        ctx.fillStyle = '#FFFFFF';
        ctx.font = 'italic 36px "PT Sans", sans-serif';
        ctx.fillText(customMessage, width / 2, 520);
      }
      
      // Footer
      ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
      ctx.font = '28px "PT Sans", sans-serif';
      ctx.fillText('FestivalCountdown.com', width / 2, 590);

      onImageGenerated(canvas.toDataURL('image/png'));
    };
    bg.onerror = () => {
        // Fallback drawing if image fails
        ctx.fillStyle = '#222222';
        ctx.fillRect(0, 0, width, height);
        // ... draw text as above
        ctx.fillStyle = '#FFD700';
        ctx.font = 'bold 96px "Playfair Display", serif';
        ctx.textAlign = 'center';
        ctx.fillText(name || '', width / 2, 180);
        //... and so on
        onImageGenerated(canvas.toDataURL('image/png'));
    }
  };

  useEffect(() => {
    draw();
  }, [festival, customMessage, language]);

  return (
    <div>
        <canvas ref={canvasRef} className="w-full rounded-lg border border-border" />
    </div>
  );
}
