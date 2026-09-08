import { recoveredTopics } from './recovered-topics';
// Public-safe teaching material, adapted from existing lesson topics.
// Keep stable topic/question IDs. To change the meaning of a question, give it a new ID.
export type Question = {
  id: string;
  prompt: string;
  choices: string[];
  answer: number;
  explanation: string;
};
export type Topic = {
  id: string;
  subject: 'Maths';
  title: string;
  source: string;
  summary: string;
  cards: { heading: string; body: string }[];
  questions: Question[];
};
export const topics: Topic[] = [
  {
    id: 'percentages',
    subject: 'Maths',
    title: 'Percentages & discounts',
    source: 'Fractions & Percentages · Session 3',
    summary: 'Connect percentages, decimals and amounts.',
    cards: [
      {
        heading: 'Out of 100',
        body: '40% means 40 out of 100. As a decimal it is 0.4; as a simplified fraction it is 2/5.',
      },
      {
        heading: 'Find the amount',
        body: 'Multiply by the decimal. 40% of 5 = 0.4 × 5 = 2.',
      },
      {
        heading: 'After a discount',
        body: 'A 20% discount leaves 80% to pay. A £25 item becomes 25 × 0.8 = £20.',
      },
    ],
    questions: [
      {
        id: 'percent-decimal',
        prompt: 'What is 40% as a decimal?',
        choices: ['4', '0.04', '0.4'],
        answer: 2,
        explanation: 'Divide by 100: 40 ÷ 100 = 0.4.',
      },
      {
        id: 'percent-amount',
        prompt: 'What is 40% of 5?',
        choices: ['2', '20', '0.2'],
        answer: 0,
        explanation: '5 × 0.4 = 2.',
      },
      {
        id: 'discount-25',
        prompt: 'A £25 item has 20% off. What do you pay?',
        choices: ['£5', '£20', '£30'],
        answer: 1,
        explanation:
          'The discount is £5, so £25 − £5 = £20. Or multiply £25 by 0.8.',
      },
    ],
  },
  {
    id: 'reverse-percentages',
    subject: 'Maths',
    title: 'Reverse percentages',
    source: 'Fractions & Percentages · Session 3',
    summary: 'Work backwards to find the original amount.',
    cards: [
      {
        heading: 'Start with what remains',
        body: 'After a 25% discount, 75% of the original price remains. Divide the new price by 0.75.',
      },
      {
        heading: 'Worked example',
        body: 'A TV costs £120 after 25% off. Original price = 120 ÷ 0.75 = £160. Check: 25% of £160 is £40, leaving £120.',
      },
      {
        heading: 'Avoid the trap',
        body: 'Adding 25% to the reduced price does not undo a 25% discount: the percentages use different starting amounts.',
      },
    ],
    questions: [
      {
        id: 'reverse-tv-corrected',
        prompt:
          'A TV costs £120 after a 25% discount. What was its original price?',
        choices: ['£150', '£480', '£160'],
        answer: 2,
        explanation:
          '£120 is 75% of the original. 120 ÷ 0.75 = 160. Check by taking 25% off £160.',
      },
      {
        id: 'reverse-shoes',
        prompt: 'Shoes cost £10 after 80% off. What was the original price?',
        choices: ['£50', '£18', '£12.50'],
        answer: 0,
        explanation: '20% remains. 10 ÷ 0.2 = £50.',
      },
      {
        id: 'reverse-membership',
        prompt: 'You pay £60 with a 25% discount. How much did you save?',
        choices: ['£15', '£20', '£25'],
        answer: 1,
        explanation: 'Original = 60 ÷ 0.75 = £80. Saving = £80 − £60 = £20.',
      },
    ],
  },
  {
    id: 'fractions',
    subject: 'Maths',
    title: 'Fractions & missing wholes',
    source: 'Fractions & Percentages · Session 3',
    summary: 'Simplify fractions and recover the whole.',
    cards: [
      {
        heading: 'Simplify both parts',
        body: 'Divide numerator and denominator by the same common factor. 12/15 becomes 4/5 when both are divided by 3.',
      },
      {
        heading: 'Find the whole',
        body: 'If 12 is 3/5 of a class, one fifth is 12 ÷ 3 = 4. The whole class is 4 × 5 = 20.',
      },
      {
        heading: 'Subtract the used fraction first',
        body: 'If one third of the eggs were eaten, two thirds remain. If 4 remain, the original number is 4 ÷ (2/3) = 6.',
      },
    ],
    questions: [
      {
        id: 'simplify-12-15',
        prompt: 'Simplify 12/15 fully.',
        choices: ['6/10', '4/5', '3/5'],
        answer: 1,
        explanation:
          'Divide 12 and 15 by 3: 4/5. The numerator and denominator have no larger common factor.',
      },
      {
        id: 'class-whole',
        prompt:
          '12 pupils are 3/5 of a class. How many pupils are in the whole class?',
        choices: ['15', '36', '20'],
        answer: 2,
        explanation: 'One fifth is 12 ÷ 3 = 4, so five fifths is 20.',
      },
      {
        id: 'eggs-whole',
        prompt:
          'You eat 1/3 of your eggs and have 4 left. How many did you start with?',
        choices: ['6', '12', '8'],
        answer: 0,
        explanation:
          'The 4 eggs are the remaining 2/3. One third is 2 eggs, so the whole is 6.',
      },
    ],
  },
  ...recoveredTopics,
];
export type ReviewProgress = Record<
  string,
  { attempts: number; correct: boolean; updatedAt: string }
>;
export function topicProgress(topic: Topic, progress: ReviewProgress) {
  return {
    total: topic.questions.length,
    checked: topic.questions.filter((q) => progress[q.id]).length,
    correct: topic.questions.filter((q) => progress[q.id]?.correct).length,
  };
}
