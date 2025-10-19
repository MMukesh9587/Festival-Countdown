import { Festival, FestivalWithDate } from './types';
import { getNextOccurrence } from './date-utils';

export const festivals: Festival[] = [
  {
    id: 'diwali',
    name: { en: 'Diwali', hi: 'दिवाली' },
    description: { en: 'Symbolizing the victory of good over evil, it is celebrated with lamps, fireworks, and sweets across India and by Hindus worldwide.', hi: 'बुराई पर अच्छाई की जीत का प्रतीक, यह पूरे भारत में और दुनिया भर में हिंदुओं द्वारा दीयों, आतिशबाजी और मिठाइयों के साथ मनाया जाता है।' },
    date_rule: '2025-10-21',
    is_fixed: false,
    image: 'diwali',
    slug: 'diwali-countdown',
    blog: {
        en: `
            <h1>The Story of Diwali: The Festival of Lights</h1>
            <p>Diwali, also known as Deepavali, is one of the most significant festivals in India and is celebrated by millions of Hindus, Jains, and Sikhs across the world. The name "Diwali" is derived from the Sanskrit term "Deepavali," which means "row of lighted lamps."</p>
            
            <h2>Why is Diwali Celebrated?</h2>
            <p>The festival spiritually signifies the victory of light over darkness, good over evil, and knowledge over ignorance. The most popular tradition associates Diwali with the return of Lord Rama to his kingdom of Ayodhya after defeating the demon king Ravana. The people of Ayodhya lit rows of clay lamps (diyas) to welcome him, an act that symbolizes the triumph of righteousness.</p>
            <h3>Other Regional Significance</h3>
            <p>In other parts of India, Diwali marks different historical events. In Southern India, it commemorates the day Lord Krishna defeated the demon Narakasura. For Sikhs, it is associated with Bandi Chhor Divas, marking the day Guru Hargobind was released from prison.</p>

            <h2>Where is Diwali Celebrated?</h2>
            <p>Diwali is a pan-Indian festival celebrated with great enthusiasm throughout the country. Major celebrations can be witnessed in cities like Ayodhya, Varanasi, Jaipur, and Delhi. It is also an official holiday in several other countries with large Indian diaspora populations, including Nepal, Sri Lanka, Singapore, Malaysia, and Fiji.</p>
        `,
        hi: `
            <h1>दिवाली की कहानी: रोशनी का त्योहार</h1>
            <p>दिवाली, जिसे दीपावली भी कहा जाता है, भारत के सबसे महत्वपूर्ण त्योहारों में से एक है और इसे दुनिया भर में लाखों हिंदू, जैन और सिख मनाते हैं। "दिवाली" नाम संस्कृत शब्द "दीपावली" से लिया गया है, जिसका अर्थ है "जले हुए दीयों की पंक्ति।"</p>
            
            <h2>दिवाली क्यों मनाई जाती है?</h2>
            <p>यह त्योहार आध्यात्मिक रूप से अंधकार पर प्रकाश की, बुराई पर अच्छाई की और अज्ञान पर ज्ञान की विजय का प्रतीक है। सबसे लोकप्रिय परंपरा दिवाली को राक्षस राजा रावण को हराने के बाद भगवान राम के अपने राज्य अयोध्या लौटने से जोड़ती है। अयोध्या के लोगों ने उनके स्वागत के लिए मिट्टी के दीयों की पंक्तियाँ जलाईं, यह एक ऐसा कार्य है जो धर्म की विजय का प्रतीक है।</p>
            <h3>अन्य क्षेत्रीय महत्व</h3>
            <p>भारत के अन्य भागों में, दिवाली अलग-अलग ऐतिहासिक घटनाओं का प्रतीक है। दक्षिण भारत में, यह उस दिन का स्मरण कराता है जब भगवान कृष्ण ने राक्षस नरकासुर का वध किया था। सिखों के लिए, यह बंदी छोड़ दिवस से जुड़ा है, जिस दिन गुरु हरगोबिंद को जेल से रिहा किया गया था।</p>

            <h2>दिवाली कहाँ मनाई जाती है?</h2>
            <p>दिवाली एक अखिल भारतीय त्योहार है जो पूरे देश में बड़े उत्साह के साथ मनाया जाता है। अयोध्या, वाराणसी, जयपुर और दिल्ली जैसे शहरों में प्रमुख उत्सव देखे जा सकते हैं। यह नेपाल, श्रीलंका, सिंगापुर, मलेशिया और फिजी सहित बड़ी भारतीय प्रवासी आबादी वाले कई अन्य देशों में भी एक आधिकारिक अवकाश है।</p>
        `
    }
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
  },
  {
    id: 'bhai-dooj',
    name: { en: 'Bhai Dooj', hi: 'भाई दूज' },
    description: { en: 'Festival celebrating the bond between brother and sister', hi: 'भाई-बहन के बंधन का उत्सव' },
    date_rule: '2025-10-23',
    is_fixed: false,
    image: 'bhai-dooj',
    slug: 'bhai-dooj-countdown'
  }
];

export function getFestivalsWithTargetDate(customEvents: Festival[] = []) {
  const allFestivals = [...festivals, ...customEvents];
  
  const allFestivalsWithDates = allFestivals
    .map(f => ({ ...f, targetDate: getNextOccurrence(f.date_rule) }))
    .sort((a, b) => a.targetDate.getTime() - b.targetDate.getTime());

  const upcomingFestivals = allFestivalsWithDates.filter(f => f.targetDate.getTime() >= new Date().getTime());

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
