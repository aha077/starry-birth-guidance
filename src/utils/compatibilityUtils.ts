
import { ZodiacSign } from './zodiacUtils';

// Types of compatibility
export type CompatibilityType = 'excellent' | 'good' | 'neutral' | 'challenging';

// Compatibility score types
export type CompatibilityScore = {
  overall: number;
  romance: number;
  friendship: number;
  communication: number;
  type: CompatibilityType;
  description: string;
};

// Element compatibility - simplified
const elementCompatibility: {
  [key: string]: { [key: string]: number };
} = {
  'Огонь': { 'Огонь': 4, 'Воздух': 5, 'Земля': 2, 'Вода': 2 },
  'Земля': { 'Огонь': 2, 'Воздух': 2, 'Земля': 4, 'Вода': 5 },
  'Воздух': { 'Огонь': 5, 'Воздух': 4, 'Земля': 2, 'Вода': 3 },
  'Вода': { 'Огонь': 2, 'Воздух': 3, 'Земля': 5, 'Вода': 5 },
};

// Get compatible signs
export const getCompatibilityScore = (sign1: ZodiacSign, sign2: ZodiacSign): CompatibilityScore => {
  // Get base score from element compatibility
  const elementScore = elementCompatibility[sign1.element][sign2.element] || 3;
  
  // Get position difference (0-6 where 0 is same sign, 6 is opposite)
  const signs = ['Овен', 'Телец', 'Близнецы', 'Рак', 'Лев', 'Дева', 'Весы', 'Скорпион', 'Стрелец', 'Козерог', 'Водолей', 'Рыбы'];
  const position1 = signs.indexOf(sign1.name);
  const position2 = signs.indexOf(sign2.name);
  const positionDiff = Math.abs(position1 - position2);
  const oppositionScore = positionDiff === 6 ? 4 : positionDiff === 0 ? 3 : [3, 4, 9].includes(positionDiff) ? 5 : 2;
  
  // Overall score
  const overall = Math.round((elementScore + oppositionScore) / 2);
  
  // Determine compatibility type
  let type: CompatibilityType;
  let description: string;
  
  if (overall >= 5) {
    type = 'excellent';
    description = 'Отличная совместимость! У вас есть все шансы для создания гармоничных отношений.';
  } else if (overall === 4) {
    type = 'good';
    description = 'Хорошая совместимость. Ваши отношения имеют прочную основу.';
  } else if (overall === 3) {
    type = 'neutral';
    description = 'Нейтральная совместимость. Отношения требуют работы, но могут быть успешными.';
  } else {
    type = 'challenging';
    description = 'Сложная совместимость. Потребуется много усилий для преодоления различий.';
  }

  return {
    overall: overall,
    romance: Math.min(5, Math.max(1, overall + (Math.random() > 0.5 ? 1 : -1))),
    friendship: Math.min(5, Math.max(1, overall + (Math.random() > 0.5 ? 1 : 0))),
    communication: Math.min(5, Math.max(1, elementScore)),
    type,
    description
  };
};
