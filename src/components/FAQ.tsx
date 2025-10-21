
"use client";

import { useLanguage } from '@/context/LanguageContext';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { FAQItem } from '@/lib/types';

interface FAQProps {
  faqs: FAQItem[];
}

export function FAQ({ faqs }: FAQProps) {
  const { language } = useLanguage();

  return (
    <div className="mt-16">
      <h2 className="font-headline text-4xl text-primary mb-8 text-center">Frequently Asked Questions</h2>
      <Accordion type="single" collapsible className="w-full max-w-3xl mx-auto">
        {faqs.map((faq, index) => (
          <AccordionItem value={`item-${index}`} key={index}>
            <AccordionTrigger className="text-left">
              {faq.question[language] || faq.question['en']}
            </AccordionTrigger>
            <AccordionContent>
              {faq.answer[language] || faq.answer['en']}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
