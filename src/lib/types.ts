export type Language = 'en' | 'hi';

export type LocalizedString = {
  [key in Language]: string;
};

export interface Festival {
  id: string;
  name: LocalizedString | string;
  description?: LocalizedString | string;
  date_rule: string;
  is_fixed: boolean;
  image: string;
  slug: string;
  custom?: boolean;
}

export interface FestivalWithDate extends Festival {
  targetDate: Date;
}
