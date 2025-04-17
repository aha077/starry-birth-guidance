
// Zodiac sign determination based on birth date
export type ZodiacSign = {
  name: string;
  element: string;
  planet: string;
  dates: string;
  symbol: string;
  traits: string[];
};

export const getZodiacSign = (month: number, day: number): ZodiacSign => {
  if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) {
    return zodiacSigns[0]; // Aries
  } else if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) {
    return zodiacSigns[1]; // Taurus
  } else if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) {
    return zodiacSigns[2]; // Gemini
  } else if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) {
    return zodiacSigns[3]; // Cancer
  } else if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) {
    return zodiacSigns[4]; // Leo
  } else if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) {
    return zodiacSigns[5]; // Virgo
  } else if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) {
    return zodiacSigns[6]; // Libra
  } else if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) {
    return zodiacSigns[7]; // Scorpio
  } else if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) {
    return zodiacSigns[8]; // Sagittarius
  } else if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) {
    return zodiacSigns[9]; // Capricorn
  } else if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) {
    return zodiacSigns[10]; // Aquarius
  } else {
    return zodiacSigns[11]; // Pisces
  }
};

export const zodiacSigns: ZodiacSign[] = [
  {
    name: 'Овен',
    element: 'Огонь',
    planet: 'Марс',
    dates: '21 марта - 19 апреля',
    symbol: '♈',
    traits: ['Энергичный', 'Смелый', 'Импульсивный', 'Лидер']
  },
  {
    name: 'Телец',
    element: 'Земля',
    planet: 'Венера',
    dates: '20 апреля - 20 мая',
    symbol: '♉',
    traits: ['Надежный', 'Терпеливый', 'Практичный', 'Преданный']
  },
  {
    name: 'Близнецы',
    element: 'Воздух',
    planet: 'Меркурий',
    dates: '21 мая - 20 июня',
    symbol: '♊',
    traits: ['Общительный', 'Любознательный', 'Адаптивный', 'Интеллектуальный']
  },
  {
    name: 'Рак',
    element: 'Вода',
    planet: 'Луна',
    dates: '21 июня - 22 июля',
    symbol: '♋',
    traits: ['Заботливый', 'Интуитивный', 'Эмоциональный', 'Защитник']
  },
  {
    name: 'Лев',
    element: 'Огонь',
    planet: 'Солнце',
    dates: '23 июля - 22 августа',
    symbol: '♌',
    traits: ['Креативный', 'Страстный', 'Щедрый', 'Харизматичный']
  },
  {
    name: 'Дева',
    element: 'Земля',
    planet: 'Меркурий',
    dates: '23 августа - 22 сентября',
    symbol: '♍',
    traits: ['Аналитический', 'Скромный', 'Практичный', 'Трудолюбивый']
  },
  {
    name: 'Весы',
    element: 'Воздух',
    planet: 'Венера',
    dates: '23 сентября - 22 октября',
    symbol: '♎',
    traits: ['Дипломатичный', 'Справедливый', 'Идеалистичный', 'Партнерский']
  },
  {
    name: 'Скорпион',
    element: 'Вода',
    planet: 'Плутон',
    dates: '23 октября - 21 ноября',
    symbol: '♏',
    traits: ['Страстный', 'Решительный', 'Загадочный', 'Стратегический']
  },
  {
    name: 'Стрелец',
    element: 'Огонь',
    planet: 'Юпитер',
    dates: '22 ноября - 21 декабря',
    symbol: '♐',
    traits: ['Оптимистичный', 'Любитель приключений', 'Философский', 'Прямой']
  },
  {
    name: 'Козерог',
    element: 'Земля',
    planet: 'Сатурн',
    dates: '22 декабря - 19 января',
    symbol: '♑',
    traits: ['Дисциплинированный', 'Ответственный', 'Амбициозный', 'Прагматичный']
  },
  {
    name: 'Водолей',
    element: 'Воздух',
    planet: 'Уран',
    dates: '20 января - 18 февраля',
    symbol: '♒',
    traits: ['Оригинальный', 'Независимый', 'Гуманистический', 'Новаторский']
  },
  {
    name: 'Рыбы',
    element: 'Вода',
    planet: 'Нептун',
    dates: '19 февраля - 20 марта',
    symbol: '♓',
    traits: ['Сострадательный', 'Творческий', 'Чувствительный', 'Мечтательный']
  }
];

// Element colors
export const elementColors = {
  'Огонь': 'bg-gradient-to-r from-amber-500 to-red-500',
  'Земля': 'bg-gradient-to-r from-emerald-600 to-amber-700',
  'Воздух': 'bg-gradient-to-r from-sky-400 to-indigo-400',
  'Вода': 'bg-gradient-to-r from-cyan-500 to-blue-600'
};

// Get element color gradient class based on sign
export const getElementColorClass = (sign: ZodiacSign): string => {
  return elementColors[sign.element as keyof typeof elementColors];
};
