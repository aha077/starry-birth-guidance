
import { ZodiacSign } from './zodiacUtils';

type ForecastCategory = 'love' | 'career' | 'health' | 'general';

export type Forecast = {
  daily: { [key in ForecastCategory]: string };
  weekly: { [key in ForecastCategory]: string };
  lucky: {
    numbers: number[];
    day: string;
    color: string;
  };
};

// Sample forecasts for each sign
const forecasts: { [key: string]: string[] } = {
  'Овен': [
    'Сегодня ваша энергия на высоте. Используйте этот день для важных начинаний.',
    'Хорошее время для новых деловых контактов и расширения рабочих горизонтов.',
    'Обратите внимание на физическую активность, она принесет вам удовлетворение.',
    'Романтические встречи могут привести к началу нового яркого периода в личной жизни.'
  ],
  'Телец': [
    'День благоприятен для финансовых решений и планирования бюджета.',
    'В рабочих отношениях проявите свою надежность и последовательность.',
    'Хорошее время для уделения внимания здоровому питанию и режиму дня.',
    'В отношениях с партнером ищите гармонии и стабильности.'
  ],
  'Близнецы': [
    'Велика вероятность интересных знакомств и новых социальных связей.',
    'Ваша коммуникабельность поможет в решении рабочих вопросов.',
    'Обратите внимание на нервную систему, избегайте стрессов.',
    'Легкое общение и флирт могут сделать этот день приятным.'
  ],
  'Рак': [
    'Прислушайтесь к интуиции, она подскажет правильное решение.',
    'На работе проявите заботу о коллегах, это укрепит вашу позицию.',
    'Уделите внимание эмоциональному здоровью и отдыху.',
    'В любовных отношениях будьте открыты и чувственны.'
  ],
  'Лев': [
    'Ваша харизма сегодня особенно сильна, используйте это преимущество.',
    'Время для демонстрации лидерских качеств на работе.',
    'Энергия бьет ключом, направьте ее на физическую активность.',
    'В любви будьте щедры на внимание и комплименты.'
  ],
  'Дева': [
    'День благоприятен для наведения порядка и планирования.',
    'Ваша внимательность к деталям высоко ценится в рабочих проектах.',
    'Обратите внимание на пищеварительную систему.',
    'В отношениях избегайте чрезмерной критики.'
  ],
  'Весы': [
    'Стремитесь к гармонии в окружающем пространстве и отношениях.',
    'Умение находить компромиссы поможет в деловых переговорах.',
    'Поддерживайте баланс работы и отдыха для хорошего самочувствия.',
    'В любви ищите равновесия и взаимопонимания.'
  ],
  'Скорпион': [
    'Доверьтесь своей интуиции в принятии важных решений.',
    'Ваша целеустремленность поможет достичь поставленных целей.',
    'Уделите внимание репродуктивному здоровью.',
    'В отношениях проявится глубина чувств и страсть.'
  ],
  'Стрелец': [
    'Расширяйте горизонты, изучайте что-то новое.',
    'На работе ищите возможности для роста и развития.',
    'Активный отдых принесет пользу вашему здоровью.',
    'В любви будьте честны и оптимистичны.'
  ],
  'Козерог': [
    'Время для построения долгосрочных планов и стратегий.',
    'Ваша ответственность будет отмечена руководством.',
    'Обратите внимание на опорно-двигательную систему.',
    'В отношениях проявляйте надежность и постоянство.'
  ],
  'Водолей': [
    'Прислушайтесь к нестандартным идеям и решениям.',
    'Ваша оригинальность мышления поможет в рабочих проектах.',
    'Уделите внимание нервной системе.',
    'В любви будьте открыты для нового опыта.'
  ],
  'Рыбы': [
    'Доверьтесь течению жизни, оно приведет к нужному берегу.',
    'Используйте творческий подход в решении рабочих задач.',
    'Уделите внимание психическому здоровью и отдыху.',
    'В отношениях проявляйте чувственность и понимание.'
  ]
};

// Helper to randomly select items from an array
const getRandomItems = <T>(arr: T[], count: number): T[] => {
  const result = [];
  const arrCopy = [...arr];
  for (let i = 0; i < count; i++) {
    if (arrCopy.length === 0) break;
    const randomIndex = Math.floor(Math.random() * arrCopy.length);
    result.push(arrCopy[randomIndex]);
    arrCopy.splice(randomIndex, 1);
  }
  return result;
};

// Generate lucky numbers
const generateLuckyNumbers = (): number[] => {
  const numbers = [];
  while (numbers.length < 3) {
    const num = Math.floor(Math.random() * 100);
    if (!numbers.includes(num)) {
      numbers.push(num);
    }
  }
  return numbers.sort((a, b) => a - b);
};

// Get day of week in Russian
const getDayOfWeekRussian = (dayIndex: number): string => {
  const days = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
  return days[dayIndex];
};

// Get lucky color
const getLuckyColor = (): string => {
  const colors = ['красный', 'синий', 'зеленый', 'фиолетовый', 'оранжевый', 'золотой', 'серебряный', 'бирюзовый', 'розовый', 'желтый'];
  return colors[Math.floor(Math.random() * colors.length)];
};

// Generate forecast based on sign
export const generateForecast = (sign: ZodiacSign): Forecast => {
  // Get forecast messages from the pool
  const signForecasts = forecasts[sign.name] || forecasts['Овен'];
  
  // Generate a forecast for each category
  return {
    daily: {
      general: signForecasts[0],
      career: signForecasts[1],
      health: signForecasts[2],
      love: signForecasts[3]
    },
    weekly: {
      general: 'В течение недели обратите внимание на изменения вокруг вас. Они подскажут новые возможности.',
      career: 'Предстоящая неделя благоприятна для профессионального роста и новых проектов.',
      health: 'На этой неделе звезды советуют больше внимания уделять своему здоровью и режиму дня.',
      love: 'Неделя принесет новые эмоции и возможности для укрепления существующих отношений.'
    },
    lucky: {
      numbers: generateLuckyNumbers(),
      day: getDayOfWeekRussian(Math.floor(Math.random() * 7)),
      color: getLuckyColor()
    }
  };
};

// Generate couple forecast
export const generateCoupleForecast = (sign1: ZodiacSign, sign2: ZodiacSign): Forecast => {
  // Combine aspects of both signs for a couple forecast
  return {
    daily: {
      general: 'Сегодняшний день благоприятен для совместных планов и решений.',
      career: 'Поддерживайте профессиональные амбиции друг друга. Вместе вы можете достичь большего.',
      health: 'Обратите внимание на совместные оздоровительные практики. Они укрепят не только тело, но и взаимопонимание.',
      love: 'День подходит для романтического времяпровождения и укрепления эмоциональной связи.'
    },
    weekly: {
      general: 'Эта неделя может принести важные события, которые повлияют на ваши совместные планы.',
      career: 'Поддерживайте друг друга в карьерных начинаниях. Обсуждайте рабочие моменты, это поможет найти новые решения.',
      health: 'Начните совместную здоровую привычку на этой неделе. Она принесет пользу обоим.',
      love: 'Неделя благоприятна для решения накопившихся вопросов и укрепления отношений.'
    },
    lucky: {
      numbers: generateLuckyNumbers(),
      day: getDayOfWeekRussian(Math.floor(Math.random() * 7)),
      color: getLuckyColor()
    }
  };
};
