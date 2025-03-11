export interface Exercise {
  id: string;
  name: string;
  equipment: 'Dumbbell' | 'Barbell' | 'Machine' | 'Bodyweight';
  illustration: any;
  instructions: string[];
  warmUp: string[];
  faq: Array<{
    question: string;
    answer: string;
  }>;
} 