"use client";

import { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Button } from './ui/button';
import { Check, Copy, Code2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';

interface EmbedCodeProps {
  slug: string;
}

export function EmbedCode({ slug }: EmbedCodeProps) {
  const { t } = useLanguage();
  const [copied, setCopied] = useState(false);

  // Use a placeholder for the domain, it should be replaced with the actual domain in production
  const domain = typeof window !== 'undefined' ? window.location.origin : 'https://your-domain.com';
  const embedCode = `<iframe src="${domain}/embed/${slug}" width="320" height="150" style="border:none; border-radius: 0.5rem; overflow:hidden;" title="${slug} countdown"></iframe>`;

  const handleCopy = () => {
    navigator.clipboard.writeText(embedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline"><Code2 className='mr-2 h-4 w-4' />{t('embed_countdown')}</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t('embed_countdown')}</DialogTitle>
          <DialogDescription>
            Copy this code to embed the countdown on your website.
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4 bg-muted p-4 rounded-md font-code text-sm break-all relative">
          <pre><code>{embedCode}</code></pre>
          <Button
            size="icon"
            variant="ghost"
            className="absolute top-2 right-2 h-8 w-8"
            onClick={handleCopy}
          >
            {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
