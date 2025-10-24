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

// Function to fetch image as a blob and create an object URL
async function getCORSImage(src: string): Promise<string> {
    try {
        const response = await fetch(src);
        if (!response.ok) {
            throw new Error(`Failed to fetch image: ${response.statusText}`);
        }
        const blob = await response.blob();
        return URL.createObjectURL(blob);
    } catch (error) {
        console.error("CORS Image fetch error:", error);
        // Return original src as fallback, which might fail on canvas but is better than nothing
        return src;
    }
}


export function ShareCanvas({ festival, customMessage, onImageGenerated }: ShareCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { language, t } = useLanguage();

  const draw = async () => {
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
    
    let imageUrl: string;
    if (festival.custom && festival.image.startsWith('http')) {
        imageUrl = festival.image;
    } else {
        imageUrl = imagePlaceholder?.imageUrl || "https://picsum.photos/seed/default/1200/630";
    }

    const drawContent = (bgImage?: HTMLImageElement) => {
        // Clear canvas and set background
        ctx.fillStyle = '#222222'; // fallback background
        ctx.fillRect(0, 0, width, height);

        if (bgImage) {
            ctx.drawImage(bgImage, 0, 0, width, height);
            // Overlay
            ctx.fillStyle = 'rgba(0, 0, 0, 0.6)';
            ctx.fillRect(0, 0, width, height);
        }

        // Festival Name
        ctx.fillStyle = '#FFD700'; // primary
        ctx.font = 'bold 96px "Playfair Display", serif';
        ctx.textAlign = 'center';
        ctx.fillText(name || '', width / 2, 180);

        // Countdown
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
            ctx.fillText(`"${customMessage}"`, width / 2, 520);
        }
        
        // Footer
        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        ctx.font = '28px "PT Sans", sans-serif';
        ctx.fillText('festivalcountdown.netlify.app', width / 2, 590);

        onImageGenerated(canvas.toDataURL('image/png'));
    };

    // Background Image
    const bg = new Image();
    // IMPORTANT: No need for crossOrigin attribute when using a blob URL
    // bg.crossOrigin = "anonymous"; 
    
    bg.onload = () => {
        drawContent(bg);
        // Clean up the blob URL after drawing
        if (bg.src.startsWith('blob:')) {
            URL.revokeObjectURL(bg.src);
        }
    };
    bg.onerror = () => {
        console.error("Failed to load image for canvas.");
        drawContent(); // Draw with fallback background
         if (bg.src.startsWith('blob:')) {
            URL.revokeObjectURL(bg.src);
        }
    };
    
    // Fetch image as a blob to bypass CORS issues for canvas.
    const imageSrc = await getCORSImage(imageUrl);
    bg.src = imageSrc;
  };

  useEffect(() => {
    // We need to make sure the fonts are loaded before drawing
    document.fonts.ready.then(() => {
        draw();
    });
  }, [festival, customMessage, language]);

  return (
    <div>
        <canvas ref={canvasRef} className="w-full rounded-lg border border-border" />
    </div>
  );
}