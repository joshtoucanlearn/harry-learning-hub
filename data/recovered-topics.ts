import type { Topic } from './review-topics';
// Newly written recall activities based on recovered lesson topics. Original
// worked examples with incorrect answers have been recalculated here.
const make = (
  id: string,
  subject: Topic['subject'],
  title: string,
  source: string,
  summary: string,
  cards: [string, string][],
  qs: [string, string[], number, string][],
): Topic => ({
  id,
  subject,
  title,
  source,
  summary,
  cards: cards.map(([heading, body]) => ({ heading, body })),
  questions: qs.map(([prompt, choices, answer, explanation], i) => ({
    id: `${id}-recall-${i + 1}`,
    prompt,
    choices,
    answer,
    explanation,
  })),
});
export const recoveredTopics: Topic[] = [
  make(
    'units',
    'Maths',
    'Units & conversions',
    'Aaron · April diagnostic & early September',
    'Keep the amount; change the unit.',
    [
      [
        'Minutes and hours',
        'There are 60 minutes in an hour. Divide minutes by 60 to find hours. 90 minutes = 1.5 hours.',
      ],
      [
        'Metric steps',
        '1 litre = 1,000 millilitres. 1 centimetre = 10 millimetres. Write the unit with the answer.',
      ],
    ],
    [
      [
        'How many hours is 150 minutes?',
        ['1.5', '2.5', '15'],
        1,
        '150 ÷ 60 = 2.5 hours: two hours and thirty minutes.',
      ],
      [
        'How many millilitres is 0.75 litres?',
        ['75 ml', '7,500 ml', '750 ml'],
        2,
        '0.75 × 1,000 = 750 ml.',
      ],
      [
        'How many millimetres is 15 cm?',
        ['150 mm', '1.5 mm', '1,500 mm'],
        0,
        'There are 10 mm per cm, so 15 × 10 = 150.',
      ],
    ],
  ),
  make(
    'decimals',
    'Maths',
    'Decimals in order',
    'Aaron · early September',
    'Use place value, not the number of digits.',
    [
      [
        'Line up the decimal points',
        'Write 0.7 as 0.70 to compare it with 0.65. Seventy hundredths is greater than sixty-five hundredths.',
      ],
      [
        'One value, three forms',
        '0.25 = 25/100 = 1/4 = 25%. Multiplying a decimal by 100 expresses it as a percentage.',
      ],
    ],
    [
      ['Which is largest?', ['0.65', '0.7', '0.09'], 1, '0.70 > 0.65 > 0.09.'],
      [
        'Which list runs from smallest to largest?',
        ['0.4, 0.04, 0.44', '0.44, 0.4, 0.04', '0.04, 0.4, 0.44'],
        2,
        'Compare 0.04, 0.40 and 0.44 by hundredths.',
      ],
      [
        'What is 0.2 as a simplified fraction?',
        ['1/5', '1/2', '2/100'],
        0,
        '0.2 = 2/10 = 1/5.',
      ],
    ],
  ),
  make(
    'arithmetic',
    'Maths',
    'Bigger calculations',
    'Aaron · 21 May & June mixed papers',
    'Split the calculation and check its size.',
    [
      [
        'Multiplication in parts',
        '24 × 13 = 24 × 10 + 24 × 3 = 240 + 72 = 312.',
      ],
      [
        'Check division backwards',
        'If 156 ÷ 12 = 13, then 13 × 12 must equal 156. Estimation also catches answers that are much too large.',
      ],
    ],
    [
      ['What is 24 × 13?', ['288', '312', '242'], 1, '240 + 72 = 312.'],
      ['What is 156 ÷ 12?', ['12', '14', '13'], 2, '12 × 13 = 156.'],
      [
        'What is 35 × 20?',
        ['700', '70', '7,000'],
        0,
        '35 × 2 = 70; multiplying by 20 gives 700.',
      ],
    ],
  ),
  make(
    'speed-time',
    'Maths',
    'Speed, distance & time',
    'Aaron · 11 June',
    'Make the units agree before calculating.',
    [
      [
        'The three relationships',
        'Distance = speed × time. Speed = distance ÷ time. Time = distance ÷ speed.',
      ],
      [
        'Convert the time',
        'At 12 km/h for 30 minutes, time = 0.5 hours. Distance = 12 × 0.5 = 6 km.',
      ],
    ],
    [
      [
        'A cyclist travels at 12 km/h for 30 minutes. How far?',
        ['360 km', '6 km', '24 km'],
        1,
        'Use half an hour: 12 × 0.5 = 6 km.',
      ],
      [
        'A journey covers 90 km in 1.5 hours. Average speed?',
        ['60 km/h', '135 km/h', '91.5 km/h'],
        0,
        'Speed = 90 ÷ 1.5 = 60 km/h.',
      ],
      [
        'Training begins at 17:40 and lasts 55 minutes. Finish time?',
        ['18:25', '17:95', '18:35'],
        2,
        '20 minutes reaches 18:00, then 35 more reaches 18:35.',
      ],
    ],
  ),
  make(
    'probability',
    'Maths',
    'Probability: state the assumption',
    'World Cup Maths · 2 July',
    'Tell an estimate from a justified model.',
    [
      [
        'A chance is not a promise',
        '20% means 20 in 100 in the model. It does not mean an event must happen once in every five tries.',
      ],
      [
        'When multiplication works',
        'For independent events, P(A and B) = P(A) × P(B). If B depends on A, use the chance of B given A instead. Do not count the same stage twice.',
      ],
    ],
    [
      [
        'Assuming independence, A has a 70% chance and B has 40%. Chance both happen?',
        ['110%', '28%', '55%'],
        1,
        '0.7 × 0.4 = 0.28 = 28%. The independence assumption matters.',
      ],
      [
        'A classroom guess gives England a 20% chance. What can we conclude?',
        [
          'England will win one in every five tournaments',
          'This is verified bookmaker data',
          'It is an estimate that needs evidence',
        ],
        2,
        'A guess can start a discussion, but it is not independently verified odds.',
      ],
      [
        'If a later match depends on an earlier win, which chance belongs in the calculation?',
        [
          'The later chance given that earlier win',
          'The same earlier chance twice',
          'Always 50%',
        ],
        0,
        'Use the relevant conditional chance for the path.',
      ],
    ],
  ),
  make(
    'averages',
    'Maths',
    'The ratings desk',
    'World Cup Maths · 9 July',
    'Mean, median, mode and range.',
    [
      [
        'Four different questions',
        'Mean: total divided by count. Median: middle after sorting. Mode: most frequent. Range: largest minus smallest.',
      ],
      [
        'The recovered ratings',
        '7, 7, 7, 8, 7, 8, 7, 8, 8, 7, 7. There are eleven ratings: seven 7s and four 8s. Total 81; mean about 7.36; median 7; mode 7; range 1.',
      ],
    ],
    [
      [
        'For the eleven ratings in the notes, what is the median?',
        ['7.5', '7', '8'],
        1,
        'After sorting, the sixth value is 7. With eleven numbers there is one middle value.',
      ],
      [
        'The total is 81 across eleven players. Mean to two decimal places?',
        ['7.50', '8.10', '7.36'],
        2,
        '81 ÷ 11 = 7.3636… rounds to 7.36.',
      ],
      [
        'What is the range of 5, 5, 6, 6, 6, 6, 6, 6, 7, 8, 9?',
        ['4', '6', '9'],
        0,
        'Largest minus smallest: 9 − 5 = 4.',
      ],
    ],
  ),
  make(
    'pythagoras',
    'Maths',
    'The geometry of a shot',
    'Aaron · 16 July · introductory work',
    'Find the diagonal in a right-angled triangle.',
    [
      [
        'Name the longest side',
        'The hypotenuse lies opposite the right angle. For a right-angled triangle, a² + b² = c², where c is the hypotenuse.',
      ],
      [
        'Remember the square root',
        'For perpendicular lengths 3 and 4, c² = 9 + 16 = 25. So c = 5, not 25.',
      ],
    ],
    [
      [
        'A right-angled triangle has shorter sides 3 m and 4 m. Hypotenuse?',
        ['7 m', '25 m', '5 m'],
        2,
        '√(3² + 4²) = √25 = 5 m.',
      ],
      [
        'A model has perpendicular distances 12 yards and 4 yards. Diagonal, approximately?',
        ['16 yards', '12.65 yards', '8 yards'],
        1,
        '√(12² + 4²) = √160 ≈ 12.65 yards.',
      ],
      [
        'Where is the hypotenuse?',
        ['Opposite the right angle', 'Always horizontal', 'The shortest side'],
        0,
        'It is the longest side, opposite the right angle.',
      ],
    ],
  ),
  make(
    'sequences',
    'Maths',
    'Spot the pattern',
    'Aaron · 28 & 30 July',
    'Describe the rule and use it again.',
    [
      [
        'Look at the differences',
        'In 4, 7, 10, 13, the increase is always 3. The next term is 16.',
      ],
      [
        'Check a rule against several terms',
        'Not every sequence adds the same amount. 2, 4, 8, 16 doubles each time; its next term is 32.',
      ],
    ],
    [
      ['Continue 4, 7, 10, 13, …', ['15', '16', '17'], 1, 'Add 3 each time.'],
      [
        'Continue 2, 4, 8, 16, …',
        ['18', '24', '32'],
        2,
        'Each term is twice the previous one.',
      ],
      [
        'For the rule 3n + 1, what is the fifth term?',
        ['16', '15', '19'],
        0,
        'Put n = 5: 3 × 5 + 1 = 16.',
      ],
    ],
  ),
  make(
    'expressions',
    'Maths',
    'Like terms & multiples',
    'Aaron · early September',
    'Collect what matches; identify number patterns.',
    [
      [
        'Collect like terms',
        '3x + 2x = 5x. But 3x + 2 cannot become 5x: the constant has no x.',
      ],
      [
        'Multiples',
        'Multiples of 6 include 6, 12, 18, 24 and 30. Use the times table to find those in a given range.',
      ],
    ],
    [
      [
        'Simplify 3x + 2x − x.',
        ['4x', '5x', '4'],
        0,
        'The coefficients give 3 + 2 − 1 = 4, so 4x.',
      ],
      [
        'Which is a multiple of 6 between 20 and 25?',
        ['21', '24', '25'],
        1,
        '6 × 4 = 24.',
      ],
      [
        'Simplify 5a + 3 − 2a.',
        ['6a', '3a', '3a + 3'],
        2,
        '5a − 2a = 3a; the constant 3 remains.',
      ],
    ],
  ),
];
