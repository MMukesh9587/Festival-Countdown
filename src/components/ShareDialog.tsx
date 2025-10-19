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
import { Share2, Link as LinkIcon, Check } from 'lucide-react';

interface ShareDialogProps {
  festival: FestivalWithDate;
}

export function ShareDialog({ festival }: ShareDialogProps) {
  const { t } = useLanguage();
  const [customMessage, setCustomMessage] = useState('');
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const festivalUrl = typeof window !== 'undefined' ? `${window.location.origin}/festivals/${festival.slug}` : '';

  const handleCopyLink = () => {
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
            Share a link to this countdown or generate a custom image.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="share-link">Share Link</Label>
            <div className="flex gap-2">
              <Input id="share-link" value={festivalUrl} readOnly />
              <Button onClick={handleCopyLink} variant="outline" size="icon" aria-label="Copy link">
                {copied ? <Check className="h-4 w-4 text-green-500" /> : <LinkIcon className="h-4 w-4" />}
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
