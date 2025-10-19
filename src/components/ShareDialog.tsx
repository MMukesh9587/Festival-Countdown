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
import { Share2, Twitter, Facebook, Copy, Check, Send, MessageCircle } from 'lucide-react';

interface ShareDialogProps {
  festival: FestivalWithDate;
}

const WhatsAppIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
    </svg>
)

const RedditIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1.75 12.25c-.41 0-.75.34-.75.75s.34.75.75.75.75-.34.75-.75-.34-.75-.75-.75zm-3.5 0c-.41 0-.75.34-.75.75s.34.75.75.75.75-.34.75-.75-.34-.75-.75-.75z"/>
        <path d="M15.5 10.5c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5c0 .05.01.1.02.15C11.23 10.22 10 9.22 10 8c0-.49 1.5-2.5 4-2.5s4 2.01 4 2.5c0 1.22-1.23 2.22-2.52 2.65.01-.05.02-.1.02-.15zM8.5 10.5c0-.83-.67-1.5-1.5-1.5S5.5 9.67 5.5 10.5c0 .05.01.1.02.15C4.23 10.22 3 9.22 3 8c0-.49 1.5-2.5 4-2.5s4 2.01 4 2.5c0 1.22-1.23 2.22-2.52 2.65.01-.05.02-.1.02-.15z"/>
        <path d="M12 15c-2.76 0-5 2.24-5 5h10c0-2.76-2.24-5-5-5z"/>
    </svg>
);


export function ShareDialog({ festival }: ShareDialogProps) {
  const { t, language } = useLanguage();
  const [customMessage, setCustomMessage] = useState('');
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  
  const festivalUrl = `https://festivalcountdown.netlify.app/festivals/${festival.slug}`;
  const name = typeof festival.name === 'string' ? festival.name : festival.name[language];
  const shareText = `Check out the countdown for ${name}!`;

  const shareLinks = {
      whatsapp: `https://wa.me/?text=${encodeURIComponent(`${shareText} ${festivalUrl}`)}`,
      twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(festivalUrl)}&text=${encodeURIComponent(shareText)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(festivalUrl)}`,
      telegram: `https://t.me/share/url?url=${encodeURIComponent(festivalUrl)}&text=${encodeURIComponent(shareText)}`,
      reddit: `https://www.reddit.com/submit?url=${encodeURIComponent(festivalUrl)}&title=${encodeURIComponent(shareText)}`,
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(festivalUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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
                <div className="grid grid-cols-2 @sm:grid-cols-3 gap-2">
                    <Button asChild variant="outline">
                        <a href={shareLinks.whatsapp} target="_blank" rel="noopener noreferrer">
                            <WhatsAppIcon /> WhatsApp
                        </a>
                    </Button>
                    <Button asChild variant="outline">
                        <a href={shareLinks.twitter} target="_blank" rel="noopener noreferrer">
                            <Twitter className="h-5 w-5"/> Twitter
                        </a>
                    </Button>
                    <Button asChild variant="outline">
                        <a href={shareLinks.facebook} target="_blank" rel="noopener noreferrer">
                            <Facebook className="h-5 w-5"/> Facebook
                        </a>
                    </Button>
                    <Button asChild variant="outline">
                        <a href={shareLinks.telegram} target="_blank" rel="noopener noreferrer">
                            <Send className="h-5 w-5"/> Telegram
                        </a>
                    </Button>
                    <Button asChild variant="outline">
                        <a href={shareLinks.reddit} target="_blank" rel="noopener noreferrer">
                            <RedditIcon /> Reddit
                        </a>
                    </Button>
                    <Button variant="outline" onClick={handleCopy}>
                        {copied ? <Check className="h-5 w-5 text-green-500" /> : <Copy className="h-5 w-5" />}
                        {copied ? 'Copied' : 'Copy Link'}
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
