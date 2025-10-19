"use client";

import { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Button } from './ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { ShareCanvas } from './ShareCanvas';
import type { FestivalWithDate } from '@/lib/types';
import { Share2, Twitter, Facebook } from 'lucide-react';

interface ShareDialogProps {
  festival: FestivalWithDate;
}

const WhatsAppIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2
 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
    </svg>
)

export function ShareDialog({ festival }: ShareDialogProps) {
  const { t, language } = useLanguage();
  const [customMessage, setCustomMessage] = useState('');
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  
  const festivalUrl = typeof window !== 'undefined' ? `${window.location.origin}/festivals/${festival.slug}` : '';
  const name = typeof festival.name === 'string' ? festival.name : festival.name[language];
  const shareText = `Check out the countdown for ${name}!`;

  const shareLinks = {
      whatsapp: `https://wa.me/?text=${encodeURIComponent(`${shareText} ${festivalUrl}`)}`,
      twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(festivalUrl)}&text=${encodeURIComponent(shareText)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(festivalUrl)}`,
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline"><Share2 className='mr-2 h-4 w-4'/>{t('share_countdown')}</Button>
      </DialogTrigger>
      <DialogContent className="max-w-md md:max-w-xl">
        <DialogHeader>
          <DialogTitle>{t('share_countdown')}</DialogTitle>
          <DialogDescription>
            Share this countdown on social media or create a custom image.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
            <div className="space-y-2">
                <Label>Share on Social Media</Label>
                <div className="flex gap-2">
                    <Button asChild variant="outline" className="flex-1" >
                        <a href={shareLinks.whatsapp} target="_blank" rel="noopener noreferrer">
                            <WhatsAppIcon /> WhatsApp
                        </a>
                    </Button>
                    <Button asChild variant="outline" className="flex-1" >
                        <a href={shareLinks.twitter} target="_blank" rel="noopener noreferrer">
                            <Twitter className="h-5 w-5"/> Twitter
                        </a>
                    </Button>
                    <Button asChild variant="outline" className="flex-1" >
                        <a href={shareLinks.facebook} target="_blank" rel="noopener noreferrer">
                            <Facebook className="h-5 w-5"/> Facebook
                        </a>
                    </Button>
                </div>
            </div>


          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or create an image
              </span>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="custom-message">{t('custom_message')}</Label>
            <Input
              id="custom-message"
              placeholder={t('custom_message_placeholder')}
              value={customMessage}
              onChange={(e) => setCustomMessage(e.target.value)}
            />
          </div>

          <ShareCanvas
            festival={festival}
            customMessage={customMessage}
            onImageGenerated={setGeneratedImage}
          />

          {generatedImage && (
            <Button asChild className="w-full">
              <a href={generatedImage} download={`${festival.slug}-countdown.png`}>
                {t('download_card')}
              </a>
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
