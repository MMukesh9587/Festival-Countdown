
export type Language = 'en' | 'hi' | 'bn' | 'mr' | 'te';

export type LocalizedString = {
  [key in Language]?: string;
};

export interface FAQItem {
  question: LocalizedString;
  answer: LocalizedString;
}

export interface Festival {
  id: string;
  name: LocalizedString | string;
  description?: LocalizedString | string;
  date_rule: string;
  is_fixed: boolean;
  image: string;
  slug: string;
  custom?: boolean;
  blog?: {
    [key in Language]?: string;
  };
  faq?: FAQItem[];
  schema?: object; // For Schema.org markup
  tags?: string[];
}

export interface FestivalWithDate extends Festival {
  targetDate: Date;
}

    