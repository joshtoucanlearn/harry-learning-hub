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
  subject: 'Maths' | 'English';
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
  {
    id: 'peel',
    subject: 'English',
    title: 'Build a PEEL paragraph',
    source: 'English Literature preparation · June lesson',
    summary: 'Turn a point into a supported explanation.',
    cards: [
      {
        heading: 'Point → Evidence',
        body: 'Make a point that answers the question. Then choose a relevant quotation or precise reference to the text.',
      },
      {
        heading: 'Explanation → Link',
        body: 'Explain how the evidence supports your point. Link the paragraph back to the question or your overall argument.',
      },
      {
        heading: 'Quality over a fixed recipe',
        body: 'PEEL is a planning aid from the lesson. Use the task and marks to guide the depth; there is no universal number of paragraphs for every exam question.',
      },
    ],
    questions: [
      {
        id: 'peel-evidence',
        prompt: 'Which step supports your point with something from the text?',
        choices: ['Link', 'Evidence', 'Conclusion'],
        answer: 1,
        explanation:
          'Evidence gives a quotation or specific textual detail that supports the point.',
      },
      {
        id: 'peel-explain',
        prompt: 'You have added a quotation. What should you do next?',
        choices: [
          'Add another quotation without comment',
          'Repeat the question',
          'Explain how its words support your point',
        ],
        answer: 2,
        explanation:
          'The explanation does the thinking: show how the evidence supports your interpretation.',
      },
      {
        id: 'peel-link',
        prompt: 'What does the Link in PEEL do?',
        choices: [
          'Connects the paragraph back to the question or argument',
          'Adds a website address',
          'Introduces an unrelated idea',
        ],
        answer: 0,
        explanation:
          'A link keeps the paragraph focused on what the question asks and your overall argument.',
      },
    ],
  },
  {
    id: 'thesis',
    subject: 'English',
    title: 'Thesis & essay shape',
    source: 'English Literature preparation · June lesson',
    summary: 'Give an essay a clear argument and direction.',
    cards: [
      {
        heading: 'A thesis is an argument',
        body: 'A thesis gives your overall interpretation. For example: Shakespeare presents unchecked ambition as destructive in Macbeth.',
      },
      {
        heading: 'Plan connected paragraphs',
        body: 'Use the introduction to establish your argument. Develop it through supported paragraphs, then bring the ideas together in a conclusion.',
      },
      {
        heading: 'Conclude with a judgement',
        body: 'A conclusion returns to the main argument and shows what the discussion has established. Avoid introducing a completely new line of argument.',
      },
    ],
    questions: [
      {
        id: 'thesis-choice',
        prompt:
          'Which is the strongest thesis for an essay about ambition in Macbeth?',
        choices: [
          'This essay is about a play.',
          'Shakespeare presents unchecked ambition as a force that destroys Macbeth.',
          'Macbeth has several characters.',
        ],
        answer: 1,
        explanation:
          'It offers a focused interpretation that the essay can support with evidence.',
      },
      {
        id: 'essay-order',
        prompt: 'Which plan gives the clearest essay structure?',
        choices: [
          'Conclusion → unrelated examples → title',
          'Quotations only',
          'Introduction and thesis → supported paragraphs → conclusion',
        ],
        answer: 2,
        explanation:
          'Start with a position, develop it using evidence, then draw the argument together.',
      },
      {
        id: 'conclusion-role',
        prompt: 'What should a conclusion mainly do?',
        choices: [
          'Bring the argument together into an overall judgement',
          'Introduce several new themes',
          'Repeat every quotation',
        ],
        answer: 0,
        explanation:
          'It should synthesise what you have shown and return to the thesis.',
      },
    ],
  },
  {
    id: 'objective-analysis',
    subject: 'English',
    title: 'Objective literary analysis',
    source: 'English Literature preparation · June lesson',
    summary: 'Replace unsupported reactions with textual reasoning.',
    cards: [
      {
        heading: 'Interpret, then support',
        body: 'Literary analysis makes an interpretation and explains its textual basis. It can be thoughtful and debatable while remaining precise.',
      },
      {
        heading: 'Use analytical phrasing',
        body: 'Instead of “I hate Macbeth”, try a claim about how Shakespeare presents Macbeth, followed by evidence and explanation.',
      },
      {
        heading: 'Match your purpose',
        body: 'A persuasive sports article and a literature response have different aims. In literature, focus on the text, the writer’s choices and their effects.',
      },
    ],
    questions: [
      {
        id: 'objective-sentence',
        prompt: 'Which sentence is best suited to literary analysis?',
        choices: [
          'Macbeth is the worst and everyone must agree.',
          'Shakespeare presents Macbeth’s ambition as increasingly destructive.',
          'This play is so annoying!',
        ],
        answer: 1,
        explanation:
          'This makes an analytical claim about the writer’s presentation, ready to support with evidence.',
      },
      {
        id: 'objective-support',
        prompt: 'What best strengthens an interpretation?',
        choices: [
          'Saying it more forcefully',
          'A relevant textual detail and an explanation of its effect',
          'Calling other interpretations stupid',
        ],
        answer: 1,
        explanation:
          'Evidence and explanation make the reasoning clear and assessable.',
      },
      {
        id: 'objective-purpose',
        prompt: 'What is the main focus of a literature response?',
        choices: [
          'Selling the reader a football opinion',
          'Retelling every event without analysis',
          'Explaining how the text creates meaning',
        ],
        answer: 2,
        explanation:
          'Focus on the text, the writer’s choices and how they shape meaning.',
      },
    ],
  },
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
