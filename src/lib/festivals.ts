
import { Festival, FestivalWithDate } from './types';
import { getNextOccurrence } from './date-utils';

// This is now the master list of festivals with minimal data.
export const festivals: Omit<Festival, 'blog' | 'faq'>[] = [
  {
    id: 'diwali',
    name: { en: 'Diwali', hi: 'दिवाली', bn: 'দীপাবলি', mr: 'दिवाळी', te: 'దీపావళి' },
    description: { en: 'Symbolizing the victory of good over evil, it is celebrated with lamps, fireworks, and sweets across India and by Hindus worldwide.', hi: 'बुराई पर अच्छाई की जीत का प्रतीक, यह पूरे भारत में और दुनिया भर में हिंदुओं द्वारा दीयों, आतिशबाजी और मिठाइयों के साथ मनाया जाता है।', bn: 'অশুভের ওপর শুভর বিজয়কে চিহ্নিত করে, এটি সারা ভারত এবং বিশ্বজুড়ে হিন্দুদের দ্বারা প্রদীপ, আতশবাজি এবং মিষ্টি দিয়ে উদযাপিত হয়।', mr: 'वाईटावर चांगल्याच्या विजयाचे प्रतीक म्हणून, हा सण दिवे, फटाके आणि मिठाईने भारतभर आणि जगभरातील हिंदूंद्वारे साजरा केला जातो।', te: 'చెడుపై మంచి సాధించిన విజయానికి ప్రతీకగా, దీనిని భారతదేశమంతటా మరియు ప్రపంచవ్యాప్తంగా హిందువులు దీపాలు, బాణాసంచా మరియు స్వీట్లతో జరుపుకుంటారు।' },
    date_rule: '2026-11-06',
    is_fixed: false,
    image: 'diwali',
    slug: 'diwali-countdown',
    tags: ['hindu', 'india', 'festival of lights'],
  },
  {
    id: 'holi',
    name: { en: 'Holi', hi: 'होली', bn: 'হোলি', mr: 'होळी', te: 'హోలీ' },
    description: { en: 'Festival of colours', hi: 'रंगों का त्योहार', bn: 'রঙের উৎসব', mr: 'रंगांचा सण', te: 'రంగుల పండుగ' },
    date_rule: '2026-03-04',
    is_fixed: false,
    image: 'holi',
    slug: 'holi-countdown',
    tags: ['hindu', 'india', 'festival of colors'],
  },
  {
    id: 'eid-al-fitr-2026',
    name: { en: 'Eid al-Fitr', hi: 'ईद उल-फ़ित्र', bn: 'ঈদ উল-ফিতর', mr: 'ईद उल-फित्र', te: 'ఈద్ అల్-ఫితర్' },
    description: { en: 'Marks the end of Ramadan', hi: 'रमजान के अंत का प्रतीक', bn: 'রমজানের সমাপ্তি চিহ্নিত করে', mr: 'रमजानच्या समाप्तीचे प्रतीक', te: 'రంజాన్ ముగింపును సూచిస్తుంది' },
    date_rule: '2026-03-19',
    is_fixed: false,
    image: 'eid',
    slug: 'eid-al-fitr-2026-countdown',
    tags: ['muslim', 'islamic', 'ramadan'],
  },
  {
    id: 'raksha-bandhan',
    name: { en: 'Raksha Bandhan', hi: 'रक्षा बंधन', bn: 'রাখি বন্ধন', mr: 'रक्षा बंधन', te: 'రక్షా బంధన్' },
    description: { en: 'Festival of siblings', hi: 'भाई-बहन का त्योहार', bn: 'ভাই-বোনের উৎসব', mr: 'भावंडांचा सण', te: 'సోదర సోదరీమణుల పండుగ' },
    date_rule: '2026-08-28',
    is_fixed: false,
    image: 'raksha-bandhan',
    slug: 'raksha-bandhan-countdown',
    tags: ['hindu', 'india', 'siblings'],
  },
  {
    id: 'navratri',
    name: { en: 'Navratri', hi: 'नवरात्रि', bn: 'নবরাত্রি', mr: 'नवरात्री', te: 'నవరాత్రి' },
    description: { en: 'Nine nights of festivity', hi: 'उत्सव की नौ रातें', bn: 'নয় রাতের উৎসব', mr: 'नऊ रात्रींचा उत्सव', te: 'తొమ్మిది రాత్రుల పండుగ' },
    date_rule: '2026-03-19',
    is_fixed: false,
    image: 'navratri',
    slug: 'navratri-countdown',
    tags: ['hindu', 'india', 'durga puja'],
  },
  {
    id: 'dussehra',
    name: { en: 'Dussehra', hi: 'दशहरा', bn: 'দশেরা', mr: 'दसरा', te: 'దసరా' },
    description: { en: 'Victory of good over evil', hi: 'बुराई पर अच्छाई की विजय', bn: 'অশুভের ওপর শুভর বিজয়', mr: 'वाईटावर चांगल्याचा विजय', te: 'చెడుపై మంచి సాధించిన విజయం' },
    date_rule: '2026-10-20',
    is_fixed: false,
    image: 'dussehra',
    slug: 'dussehra-countdown',
    tags: ['hindu', 'india', 'vijayadashami'],
  },
  {
    id: 'ganesh-chaturthi',
    name: { en: 'Ganesh Chaturthi', hi: 'गणेश चतुर्थी', bn: 'গণেশ চতুর্থী', mr: 'गणेश चतुर्थी', te: 'గణేష్ చతుర్థి' },
    description: { en: 'Birth of Lord Ganesha', hi: 'भगवान गणेश का जन्मदिन', bn: 'ভগবান গণেশের জন্মদিন', mr: 'गणेश देवाचा वाढदिवस', te: 'గణేశుడి పుట్టినరోజు' },
    date_rule: '2026-08-28',
    is_fixed: false,
    image: 'ganesh-chaturthi',
    slug: 'ganesh-chaturthi-countdown',
    tags: ['hindu', 'india', 'ganesha'],
  },
  {
    id: 'guru-nanak-jayanti',
    name: { en: 'Guru Nanak Jayanti', hi: 'गुरु नानक जयंती', bn: 'গুরু নানক জয়ন্তী', mr: 'गुरु नानक जयंती', te: 'గురు నానక్ జయంతి' },
    description: { en: 'Birth of the first Sikh Guru', hi: 'पहले सिख गुरु का जन्मदिन', bn: 'প্রথম শিখ গুরুর জন্মদিন', mr: 'पहिल्या शीख गुरूंचा वाढदिवस', te: 'మొదటి సిక్కు గురువు పుట్టినరోజు' },
    date_rule: '2025-11-05',
    is_fixed: false,
    image: 'guru-nanak-jayanti',
    slug: 'guru-nanak-jayanti-countdown',
    tags: ['sikh', 'india', 'gurpurab'],
  },
  {
    id: 'christmas',
    name: { en: 'Christmas', hi: 'क्रिसमस', bn: 'ক্রিসমাস', mr: 'ख्रिसमस', te: 'క్రిస్మస్' },
    description: { en: 'Birth of Jesus Christ', hi: 'यीशु का जन्मदिन', bn: 'যিশু খ্রিস্টের জন্মদিন', mr: 'येशू ख्रिस्ताचा वाढदिवस', te: 'ఏసుక్రీస్తు పుట్టినరోజు' },
    date_rule: '12-25',
    is_fixed: true,
    image: 'christmas',
    slug: 'christmas-countdown',
    tags: ['christian', 'global'],
  },
  {
    id: 'new-year',
    name: { en: "New Year's Day", hi: 'नव वर्ष दिवस', bn: 'নববর্ষের দিন', mr: 'नवीन वर्षाचा दिवस', te: 'నూతన సంవత్సర దినం' },
    description: { en: 'First day of the year', hi: 'वर्ष का पहला दिन', bn: 'বছরের প্রথম দিন', mr: 'वर्षाचा पहिला दिवस', te: 'సంవత్సరంలో మొదటి రోజు' },
    date_rule: '01-01',
    is_fixed: true,
    image: 'new-year',
    slug: 'new-year-countdown',
    tags: ['global', 'celebration'],
  },
  {
    id: 'pongal',
    name: { en: 'Pongal', hi: 'पोंगल', bn: 'পোঙ্গল', mr: 'पोंगल', te: 'పొంగల్' },
    description: { en: 'Tamil harvest festival', hi: 'तमिल फसल उत्सव', bn: 'তামিল ফসল উৎসব', mr: 'तामिळ कापणीचा सण', te: 'తమిళ పంటల పండుగ' },
    date_rule: '01-14',
    is_fixed: true,
    image: 'pongal',
    slug: 'pongal-countdown',
    tags: ['hindu', 'tamil', 'harvest'],
  },
  {
    id: 'onam',
    name: { en: 'Onam', hi: 'ओणम', bn: 'ওনাম', mr: 'ओणम', te: 'ఓనం' },
    description: { en: 'Harvest festival of Kerala', hi: 'केरल का फसल उत्सव', bn: 'কেরালার ফসল উৎসব', mr: 'केरळचा कापणीचा सण', te: 'కేరళ పంటల పండుగ' },
    date_rule: '2026-08-16',
    is_fixed: false,
    image: 'onam',
    slug: 'onam-countdown',
    tags: ['hindu', 'kerala', 'harvest'],
  },
   {
    id: 'ram-navami',
    name: { en: 'Ram Navami', hi: 'राम नवमी', bn: 'রাম নবমী', mr: 'राम नवमी', te: 'శ్రీరామ నవమి' },
    description: { en: 'Birth of Lord Rama', hi: 'भगवान राम का जन्मदिन', bn: 'ভগবান রামের জন্মদিন', mr: 'भगवान रामाचा वाढदिवस', te: 'శ్రీరాముని పుట్టినరోజు' },
    date_rule: '2026-03-26',
    is_fixed: false,
    image: 'ram-navami',
    slug: 'ram-navami-countdown',
    tags: ['hindu', 'india', 'rama'],
  },
   {
    id: 'krishna-janmashtami',
    name: { en: 'Krishna Janmashtami', hi: 'कृष्ण जन्माष्टमी', bn: 'কৃষ্ণ জন্মাষ্টমী', mr: 'कृष्ण जन्माष्टमी', te: 'కృష్ణాష్టమి' },
    description: { en: 'Birth of Lord Krishna', hi: 'भगवान कृष्ण का जन्मदिन', bn: 'ভগবান কৃষ্ণের জন্মদিন', mr: 'भगवान कृष्णाचा वाढदिवस', te: 'శ్రీకృష్ణుని పుట్టినరోజు' },
    date_rule: '2026-08-16',
    is_fixed: false,
    image: 'krishna-janmashtami',
    slug: 'krishna-janmashtami-countdown',
    tags: ['hindu', 'india', 'krishna'],
  },
  {
    id: 'bhai-dooj',
    name: { en: 'Bhai Dooj', hi: 'भाई दूज', bn: 'ভাইফোঁটা', mr: 'भाऊबीज', te: 'భాయ్ దూజ్' },
    description: { en: 'Festival celebrating the bond between brother and sister', hi: 'भाई-बहन के बंधन का उत्सव', bn: 'ভাই ও বোনের মধ্যে বন্ধন উদযাপনকারী উৎসব', mr: 'भाऊ-बहिणीच्या नात्याचा उत्सव साजरा करणारा सण', te: 'సోదరుడు మరియు సోదరి మధ్య బంధాన్ని జరుపుకునే పండుగ' },
    date_rule: '2026-11-11',
    is_fixed: false,
    image: 'bhai-dooj',
    slug: 'bhai-dooj-countdown',
    tags: ['hindu', 'india', 'siblings'],
  },
  {
    id: 'makar-sankranti',
    name: { en: 'Makar Sankranti', hi: 'मकर संक्रांति', bn: 'মকর সংক্রান্তি', mr: 'मकर संक्रांती', te: 'మకర సంక్రాంతి' },
    description: { en: 'Hindu harvest festival and kite festival', hi: 'हिंदू फसल उत्सव और पतंग महोत्सव', bn: 'হিন্দু ফসল উৎসব এবং ঘুড়ি উৎসব', mr: 'हिंदू कापणीचा सण आणि पतंग महोत्सव', te: 'హిందూ పంటల పండుగ మరియు గాలిపటాల పండుగ' },
    date_rule: '01-14',
    is_fixed: true,
    image: 'makar-sankranti',
    slug: 'makar-sankranti-countdown',
    tags: ['hindu', 'india', 'harvest', 'kites'],
  },
  {
    id: 'karwa-chauth',
    name: { en: 'Karwa Chauth', hi: 'करवा चौथ' },
    description: { en: 'A fast kept by married Hindu women for the longevity of their husbands.', hi: 'विवाहित हिंदू महिलाओं द्वारा अपने पति की लंबी उम्र के लिए रखा जाने वाला व्रत।' },
    date_rule: '2026-10-29',
    is_fixed: false,
    image: 'karwa-chauth',
    slug: 'karwa-chauth-countdown',
    tags: ['hindu', 'india', 'fasting', 'women'],
  },
  {
    id: 'shravan-somwar',
    name: { "en": "Shravan Somwar", "hi": "श्रावण सोमवार" },
    description: { "en": "A day of fasting and worship dedicated to Lord Shiva during the month of Shravan.", "hi": "श्रावण महीने के दौरान भगवान शिव को समर्पित उपवास और पूजा का दिन।" },
    date_rule: "2026-08-03",
    is_fixed: false,
    image: "shravan-somwar",
    slug: "shravan-somwar-countdown",
    tags: ["hindu", "india", "shiva", "fasting"]
  },
  {
    id: 'hanuman-jayanti',
    name: { "en": "Hanuman Jayanti", "hi": "हनुमान जयंती" },
    description: { "en": "Celebrates the birth of Lord Hanuman.", "hi": "भगवान हनुमान के जन्म का उत्सव।" },
    date_rule: "2026-04-02",
    is_fixed: false,
    image: "hanuman-jayanti",
    slug: "hanuman-jayanti-countdown",
    tags: ["hindu", "india", "hanuman"]
  },
  {
    id: 'good-friday',
    name: { en: 'Good Friday', hi: 'गुड फ्राइडे' },
    description: { en: 'Commemorates the crucifixion of Jesus Christ.', hi: 'ईसा मसीह के सूली पर चढ़ने की याद में।' },
    date_rule: '2026-04-03',
    is_fixed: false,
    image: 'good-friday',
    slug: 'good-friday-countdown',
    tags: ['christian', 'global', 'easter'],
  },
  {
    id: 'baisakhi',
    name: { en: 'Baisakhi', hi: 'बैसाखी' },
    description: { en: 'Sikh New Year and harvest festival.', hi: 'सिख नव वर्ष और फसल उत्सव।' },
    date_rule: '04-14',
    is_fixed: true,
    image: 'baisakhi',
    slug: 'baisakhi-countdown',
    tags: ['sikh', 'hindu', 'india', 'harvest', 'new year'],
  },
  {
    id: 'amarnath-yatra',
    name: { en: 'Amarnath Yatra', hi: 'अमरनाथ यात्रा' },
    description: { en: 'Annual pilgrimage to the Amarnath cave.', hi: 'अमरनाथ गुफा की वार्षिक तीर्थयात्रा।' },
    date_rule: '2026-07-01',
    is_fixed: false,
    image: 'amarnath-yatra',
    slug: 'amarnath-yatra-countdown',
    tags: ['hindu', 'pilgrimage', 'himalayas', 'shiva'],
  },
  {
    id: 'chhath-puja',
    name: { en: 'Chhath Puja', hi: 'छठ पूजा' },
    description: { en: 'An ancient Hindu festival dedicated to the Sun God.', hi: 'सूर्य देव को समर्पित एक प्राचीन हिंदू त्योहार।' },
    date_rule: '2025-10-25',
    is_fixed: false,
    image: 'chhath-puja',
    slug: 'chhath-puja-countdown',
    tags: ['hindu', 'india', 'sun god', 'bihar'],
  }
];


export function getFestivalsWithTargetDate(customEvents: Festival[] = []) {
  const allFestivals: Omit<Festival, 'blog' | 'faq'>[] = [...festivals, ...customEvents];
  
  const allFestivalsWithDates = allFestivals
    .map(f => ({ ...f, targetDate: getNextOccurrence(f.date_rule) }))
    .sort((a, b) => a.targetDate.getTime() - b.targetDate.getTime());

  const upcomingFestivals = allFestivalsWithDates.filter(f => f.targetDate.getTime() >= new Date().getTime());

  return { upcomingFestivals, allFestivalsWithDates };
}


// This version of getFestivalBySlug is intended to be used on the client-side.
// It doesn't load blog/faq content.
export function getFestivalBySlug(slug: string, customEvents: Festival[] = []): FestivalWithDate | null {
  const allFestivals = [...festivals, ...customEvents];
  const festivalInfo = allFestivals.find(f => f.slug === slug);
  
  if (!festivalInfo) return null;

  return {
    ...(festivalInfo as Festival),
    targetDate: getNextOccurrence(festivalInfo.date_rule),
  };
}

    
