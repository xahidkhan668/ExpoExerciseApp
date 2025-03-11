import { Exercise } from '../types/exercise';

export const exercises: Exercise[] = [
  {
    id: 'inclined-bench-press',
    name: 'Inclined Bench Press',
    equipment: 'Dumbbell',
    illustration: require('../assets/exercises/inclined-bench-press.png'), // You'll need to add this image
    instructions: [
      'Set up an incline bench at a 30-45 degree angle',
      'Sit on the bench and lift the dumbbells to your shoulders',
      'Lie back and position the dumbbells at the sides of your chest',
      'Press the weights up until your arms are fully extended',
      'Lower the weights back down with control'
    ],
    warmUp: [
      'Arm circles: 10 forward, 10 backward',
      'Push-ups: 10 reps',
      'Band pull-aparts: 15 reps',
      'Light dumbbell presses: 12 reps'
    ],
    faq: [
      {
        question: 'What muscles does this exercise target?',
        answer: 'The incline bench press primarily targets the upper chest (clavicular head of the pectoralis major), front deltoids, and triceps.'
      },
      {
        question: "What's the proper incline angle?",
        answer: 'For optimal upper chest activation, set the bench between 30-45 degrees. Going too high (above 45°) shifts focus to the front deltoids.'
      },
      {
        question: 'How do I prevent shoulder pain?',
        answer: 'Keep your elbows at about a 45-degree angle to your torso, not flared out at 90 degrees. This reduces shoulder stress.'
      }
    ]
  }
  // Add more exercises here
]; 