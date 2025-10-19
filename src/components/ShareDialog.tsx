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
import { Share2 } from 'lucide-react';

interface ShareDialogProps {
  festival: FestivalWithDate;
}

export function ShareDialog({ festival }: ShareDialogProps) {
  const { t } = useLanguage();
  const [customMessage, setCustomMessage] = useState('');
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline"><Share2 className='mr-2 h-4 w-4'/>{t('share_countdown')}</Button>
      </DialogTrigger>
      <DialogContent className="max-w-md md:max-w-xl">
        <DialogHeader>
          <DialogTitle>{t('share_countdown')}</DialogTitle>
          <DialogDescription>
            Generate a shareable image for your countdown.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
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
