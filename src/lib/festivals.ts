import { Festival, FestivalWithDate } from './types';
import { getNextOccurrence } from './date-utils';

export const festivals: Festival[] = [
  {
    id: 'diwali',
    name: { en: 'Diwali', hi: 'दिवाली' },
    description: { en: 'Festival of lights', hi: 'दीयों का त्योहार' },
    date_rule: '2024-11-01',
    is_fixed: false,
    image: 'diwali',
    slug: 'diwali-countdown'
  },
   {
    id: 'holi',
    name: { en: 'Holi', hi: 'होली' },
    description: { en: 'Festival of colours', hi: 'रंगों का त्योहार' },
    date_rule: '2025-03-14',
    is_fixed: false,
    image: 'holi',
    slug: 'holi-countdown'
  },
  {
    id: 'eid-al-fitr-2025',
    name: { en: 'Eid al-Fitr', hi: 'ईद उल-फ़ित्र' },
    description: { en: 'Marks the end of Ramadan', hi: 'रमजान के अंत का प्रतीक' },
    date_rule: '2025-03-30',
    is_fixed: false,
    image: 'eid',
    slug: 'eid-al-fitr-2025-countdown'
  },
  {
    id: 'raksha-bandhan',
    name: { en: 'Raksha Bandhan', hi: 'रक्षा बंधन' },
    description: { en: 'Festival of siblings', hi: 'भाई-बहन का त्योहार' },
    date_rule: '2024-08-19',
    is_fixed: false,
    image: 'raksha-bandhan',
    slug: 'raksha-bandhan-countdown'
  },
  {
    id: 'navratri',
    name: { en: 'Navratri', hi: 'नवरात्रि' },
    description: { en: 'Nine nights of festivity', hi: 'उत्सव की नौ रातें' },
    date_rule: '2024-10-03',
    is_fixed: false,
    image: 'navratri',
    slug: 'navratri-countdown'
  },
  {
    id: 'dussehra',
    name: { en: 'Dussehra', hi: 'दशहरा' },
    description: { en: 'Victory of good over evil', hi: 'बुराई पर अच्छाई की विजय' },
    date_rule: '2024-10-12',
    is_fixed: false,
    image: 'dussehra',
    slug: 'dussehra-countdown'
  },
  {
    id: 'ganesh-chaturthi',
    name: { en: 'Ganesh Chaturthi', hi: 'गणेश चतुर्थी' },
    description: { en: 'Birth of Lord Ganesha', hi: 'भगवान गणेश का जन्मदिन' },
    date_rule: '2024-09-07',
    is_fixed: false,
    image: 'ganesh-chaturthi',
    slug: 'ganesh-chaturthi-countdown'
  },
  {
    id: 'guru-nanak-jayanti',
    name: { en: 'Guru Nanak Jayanti', hi: 'गुरु नानक जयंती' },
    description: { en: 'Birth of the first Sikh Guru', hi: 'पहले सिख गुरु का जन्मदिन' },
    date_rule: '2024-11-15',
    is_fixed: false,
    image: 'guru-nanak-jayanti',
    slug: 'guru-nanak-jayanti-countdown'
  },
  {
    id: 'christmas',
    name: { en: 'Christmas', hi: 'क्रिसमस' },
    description: { en: 'Birth of Jesus Christ', hi: 'यीशु का जन्मदिन' },
    date_rule: '12-25',
    is_fixed: true,
    image: 'christmas',
    slug: 'christmas-countdown'
  },
  {
    id: 'new-year',
    name: { en: "New Year's Day", hi: 'नव वर्ष दिवस' },
    description: { en: 'First day of the year', hi: 'वर्ष का पहला दिन' },
    date_rule: '01-01',
    is_fixed: true,
    image: 'new-year',
    slug: 'new-year-countdown'
  },
  {
    id: 'pongal',
    name: { en: 'Pongal', hi: 'पोंगल' },
    description: { en: 'Tamil harvest festival', hi: 'तमिल फसल उत्सव' },
    date_rule: '01-14',
    is_fixed: true,
    image: 'pongal',
    slug: 'pongal-countdown'
  },
  {
    id: 'onam',
    name: { en: 'Onam', hi: 'ओणम' },
    description: { en: 'Harvest festival of Kerala', hi: 'केरल का फसल उत्सव' },
    date_rule: '2024-09-15',
    is_fixed: false,
    image: 'onam',
    slug: 'onam-countdown'
  }
];

export function getFestivalsWithTargetDate(customEvents: Festival[] = []) {
  const now = new Date();
  const allFestivals = [...festivals, ...customEvents];
  
  const allFestivalsWithDates = allFestivals
    .map(f => ({ ...f, targetDate: getNextOccurrence(f.date_rule) }))
    .sort((a, b) => a.targetDate.getTime() - b.targetDate.getTime());

  const upcomingFestivals = allFestivalsWithDates.filter(f => f.targetDate.getTime() >= now.getTime());

  return { upcomingFestivals, allFestivalsWithDates };
}

export function getFestivalBySlug(slug: string, customEvents: Festival[] = []): FestivalWithDate | null {
  const allFestivals = [...festivals, ...customEvents];
  const festival = allFestivals.find(f => f.slug === slug);
  if (!festival) return null;

  return {
    ...festival,
    targetDate: getNextOccurrence(festival.date_rule),
  };
}
