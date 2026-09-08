// Selected learner work only. The private collection and original document links
// live outside this repository. Dates below are lesson dates, not fixture dates.
export type HistoricalCall = {
  id: string;
  title: string;
  date: string;
  author: 'Harry' | 'Josh';
  call: string;
  excerpt: string;
  source: string;
  context: string;
  result: {
    label: string;
    date: string;
    detail: string;
    verdict: string;
    sources: { label: string; url: string }[];
  };
  events: {
    call: string;
    result: 'correct' | 'missed' | 'unrecorded';
    evidence?: string;
  }[];
};
export const historicalCalls: HistoricalCall[] = [
  {
    id: 'england-norway',
    title: 'England v Norway',
    date: '7 July 2026',
    author: 'Harry',
    call: '3–1 England',
    excerpt:
      '3-1 due to norways dreadful defence in tight situations. Specifically harry kane is going to run through the defence cross one over to jude bellingham and he will score an easy tap in even harry maguire would score.',
    source: 'English sessions 10 & 11 · 7 & 14 July',
    context:
      'The prediction did not specify whether extra time counted. The comparison shows both the 90-minute score and the final outcome.',
    result: {
      label: 'England 2–1 Norway',
      date: '11 July 2026 · World Cup quarter-final',
      detail:
        'After extra time. At 90 minutes: England 1–1 Norway. Schjelderup scored first; Bellingham equalised and scored the extra-time winner.',
      verdict:
        'England went through, as Harry expected. The 3–1 score missed; a 90-minute win would also have missed.',
      sources: [
        {
          label: 'England Football · score & goals',
          url: 'https://www.englandfootball.com/england/mens-senior-team/fixtures-results/2025-26/world-cup/norway-england-fifa-world-cup-quarter-final-saturday-11-july-2026-match-centre',
        },
      ],
    },
    events: [
      {
        call: 'No penalty',
        result: 'correct',
        evidence: 'Recorded as “no pen” in the 14 July lesson review.',
      },
      {
        call: 'England score first',
        result: 'missed',
        evidence: 'Norway’s Andreas Schjelderup scored first.',
      },
    ],
  },
  {
    id: 'spain-france-harry',
    title: 'Spain v France',
    date: '14 July 2026',
    author: 'Harry',
    call: 'France to win',
    excerpt:
      'France will score first, and Mbappe will be the one to score it. Spain will get a lucky goal to make it 1-1, then last minute, Ousmane Dembele is going to score and get France over the line and it’s gonna be a very calm and less dirty game.',
    source: 'English session 11 · Harry’s response',
    context:
      'Harry’s narrative implies France winning 2–1. That score is inferred from the sequence in his writing, rather than a separate numeric entry.',
    result: {
      label: 'Spain 2–0 France',
      date: '14 July 2026 · World Cup semi-final',
      detail:
        'Oyarzabal scored a penalty in the 22nd minute; Pedro Porro added the second in the 58th. France did not score.',
      verdict:
        'Winner missed. The first-scorer and late-winner calls missed too.',
      sources: [
        {
          label: 'FIFA · match outcome',
          url: 'https://inside.fifa.com/organisation/news/dallas-stadium-messi-haaland-unai-simon-record-spain-france',
        },
        {
          label: 'Europa Press · goals & statistics',
          url: 'https://www.europapress.es/deportes/estadisticas-deportivas/noticia-francia-espana-resumen-goles-resultado-partido-hoy-20260714230256.html',
        },
      ],
    },
    events: [
      {
        call: 'France score first',
        result: 'missed',
        evidence: 'Spain scored first through Oyarzabal.',
      },
      {
        call: 'Mbappé scores first',
        result: 'missed',
        evidence: 'Oyarzabal was the first scorer; Mbappé did not score.',
      },
      {
        call: 'Dembélé scores a late winner',
        result: 'missed',
        evidence: 'Dembélé did not score; Spain won 2–0.',
      },
    ],
  },
  {
    id: 'spain-france-josh',
    title: 'Spain v France',
    date: '14 July 2026',
    author: 'Josh',
    call: '1–1, then penalties',
    excerpt:
      'I think this will be a non-feisty game due to the higher technical abilities of each team. I think France will have more cards due to establishing more physical intensity, and Spain more possession.',
    source: 'English session 11 · explicitly labelled “josh”',
    context:
      'Josh’s own model, kept beside Harry’s call. “Non-feisty” is subjective, so it is not treated as a scored event.',
    result: {
      label: 'Spain 2–0 France',
      date: '14 July 2026 · World Cup semi-final',
      detail:
        'Finished in normal time. France received two yellow cards and Spain one; reported possession was Spain 51%, France 49%.',
      verdict:
        'Score and shoot-out missed. Both measurable event calls were correct.',
      sources: [
        {
          label: 'FIFA · match outcome',
          url: 'https://inside.fifa.com/organisation/news/dallas-stadium-messi-haaland-unai-simon-record-spain-france',
        },
        {
          label: 'Europa Press · cards & possession',
          url: 'https://www.europapress.es/deportes/estadisticas-deportivas/noticia-francia-espana-resumen-goles-resultado-partido-hoy-20260714230256.html',
        },
      ],
    },
    events: [
      {
        call: 'France receive more cards',
        result: 'correct',
        evidence: 'Yellow cards: France 2, Spain 1. No red cards.',
      },
      {
        call: 'Spain have more possession',
        result: 'correct',
        evidence:
          'Spain 51%, France 49% (Europa Press; also reported by Eurosport).',
      },
    ],
  },
  {
    id: 'england-argentina',
    title: 'England v Argentina',
    date: '14 July 2026',
    author: 'Harry',
    call: '3–1 England',
    excerpt: '3-1 england in normal time',
    source: 'English session 11',
    context:
      'The longer prediction describes Messi scoring first, two Bellingham goals and a Kane penalty. Those calls are checked below.',
    result: {
      label: 'England 1–2 Argentina',
      date: '15 July 2026 · World Cup semi-final',
      detail:
        'Gordon opened the scoring for England. Fernández equalised and Lautaro Martínez scored the winner in stoppage time. No extra time.',
      verdict: 'The predicted winner and exact score both missed.',
      sources: [
        {
          label: 'England Football · score & scorers',
          url: 'https://www.englandfootball.com/england/mens-senior-team/fixtures-results/2025-26/World-Cup/england-argentina-fifa-world-cup-quarter-final-wednesday-15-july-2026-match-centre',
        },
      ],
    },
    events: [
      {
        call: 'Messi scores first',
        result: 'missed',
        evidence: 'Anthony Gordon scored first. Messi did not score.',
      },
      {
        call: 'Bellingham scores twice',
        result: 'missed',
        evidence: 'Gordon scored England’s only goal.',
      },
      {
        call: 'Kane scores a penalty',
        result: 'missed',
        evidence: 'Kane did not score.',
      },
    ],
  },
  {
    id: 'leeds-finish',
    title: 'Where will Leeds finish?',
    date: '12 May 2026',
    author: 'Harry',
    call: '13th',
    excerpt: 'I think that Leeds United will finish 13th next season',
    source: 'Harry session 3 · revisited in session 6',
    context:
      'The draft says “next season” without a year. Its May 2026 date could mean 2026/27. The completed 2025/26 season is shown for reference, without silently changing the prediction’s target.',
    result: {
      label: '2025/26: 14th',
      date: 'Premier League · final table, 24 May 2026',
      detail: 'Leeds finished with 47 points. That is one position below 13th.',
      verdict:
        'Target season needs confirming before grading this forecast. If it meant 2025/26, it was one place out.',
      sources: [
        {
          label: 'Leeds United · final position',
          url: 'https://www.leedsunited.com/en/news/daniel-farke-it-was-one-of-those-days',
        },
      ],
    },
    events: [],
  },
  {
    id: 'england-world-cup',
    title: 'England’s World Cup chances',
    date: '30 June – 2 July 2026',
    author: 'Harry',
    call: '20% estimate',
    excerpt:
      'In my opinion I think that England have a good chance of winning the World Cup.',
    source: 'English session 9 · World Cup Maths, 2 July',
    context:
      'Harry’s argument focused on the attack and set pieces. The 20% figure was his starting estimate in maths; it was not a categorical promise of an England win.',
    result: {
      label: 'England: semi-final exit',
      date: 'World Cup 2026 · tournament completed 19 July',
      detail:
        'Argentina knocked England out of title contention. Spain won the tournament, beating Argentina 1–0 after extra time in the final.',
      verdict:
        'England did not win. One tournament cannot establish whether a 20% probability estimate was well calibrated.',
      sources: [
        {
          label: 'England Football · semi-final',
          url: 'https://www.englandfootball.com/england/mens-senior-team/fixtures-results/2025-26/World-Cup/england-argentina-fifa-world-cup-quarter-final-wednesday-15-july-2026-match-centre',
        },
        {
          label: 'FIFA · tournament winner',
          url: 'https://inside.fifa.com/organisation/media-releases/spain-unprecedented-global-double-new-milestones-historic-world-cup-2026',
        },
      ],
    },
    events: [],
  },
];

export type ArchiveWriting = {
  id: string;
  title: string;
  category: string;
  date: string;
  credit: string;
  source: string;
  excerpt: string;
  note: string;
  challenge: string;
  brief: string;
};
export const archiveWriting: ArchiveWriting[] = [
  {
    id: 'hydration',
    title: 'Hydration disaster',
    category: 'Opinion',
    date: 'June–July 2026',
    credit: 'Harry · developed with Josh',
    source: 'English sessions 9–11',
    excerpt:
      'These hydration breaks need to stop. It ruins the flow of the games and disrupts the tempo. It also gives teams that are struggling in the game an advantage to reset.\n\nThe tempo of games is crucial in how they are played and the outcome. Football operates with two halves of the game played, and introducing mandatory breaks in the middle of these halves, it ruins the excitement for proper football fans across the world. With the breaks, all the tension that was building up is released anticlimactically for fans.',
    note: 'Selected passages from the classroom opinion draft, with original wording. Harry supplied the core argument; Josh supported its more formal expression. Factual claims in the full draft were not verified.',
    challenge:
      'Keep the strong view. Add a sourced example of a break changing a game, then answer the player-welfare argument fairly.',
    brief: 'The big debate',
  },
  {
    id: 'leeds-analysis',
    title: 'Leeds: a case for 13th',
    category: 'Analysis',
    date: '12 May 2026',
    credit: 'Harry · lesson writing',
    source: 'Harry session 3',
    excerpt:
      'For example Leeds struggle mostly defending on the left. I think that we should sign some left backs, this will help Leeds to not concede as many goals in the premier league which will result in having a better goal difference, which I think will make the difference next season.',
    note: 'An excerpt from the original Leeds prediction. The heading here is an archive label. The full piece was revisited in June.',
    challenge:
      'Find evidence for the left-side weakness. Explain why that evidence supports 13th place specifically.',
    brief: 'The match preview',
  },
  {
    id: 'norway-preview',
    title: 'England v Norway: the original call',
    category: 'Preview',
    date: '7 July 2026',
    credit: 'Harry · lesson writing',
    source: 'English sessions 10 & 11',
    excerpt: historicalCalls[0].excerpt,
    note: 'Original wording. The Notebook now pairs this call with the verified match result: England won 2–1 after extra time, following a 1–1 draw at 90 minutes.',
    challenge:
      'Use the sourced result in the Notebook to write the follow-up. Distinguish normal time from extra time and explain which part of the call worked.',
    brief: 'The final-whistle report',
  },
  {
    id: 'france-preview',
    title: 'A late winner for France?',
    category: 'Preview',
    date: '14 July 2026',
    credit: 'Harry · lesson writing',
    source: 'English session 11',
    excerpt: historicalCalls[1].excerpt,
    note: 'Original classroom prediction, rather than a report of events that happened.',
    challenge:
      'Separate the result prediction from the evidence. Replace “lucky” with a precise description of how Spain might create a chance.',
    brief: 'The match preview',
  },
  {
    id: 'football-evolution',
    title: 'How football has changed',
    category: 'Analysis',
    date: '12 May 2026',
    credit: 'Harry · lesson writing',
    source: 'Harry session 3',
    excerpt:
      'One way football has evolved over the years, is that it is less dirty and its an equal game. For example, in the 1970’s FA Cup Final highlights, a Chelsea player at the 0:44 mark was shown doing a highfoot on one of the Leeds players in the back of the head.',
    note: 'Excerpt from a response to a video clip. The historical interpretation in the draft remains a claim to examine.',
    challenge:
      'Can one clip support a claim about a whole era? Compare another example and distinguish the rule from how it was enforced.',
    brief: 'The analysis column',
  },
  {
    id: 'arsenal-tone',
    title: 'When a strong opinion needs editing',
    category: 'Editing',
    date: '2–9 June 2026',
    credit: 'Harry & Josh · shared paragraph',
    source: 'Harry 5 · English session 6',
    excerpt:
      'The hate towards Arsenal in the UK is deserved because of the disgraceful opinions of their fans.',
    note: 'The opening sentence of a jointly developed debate paragraph. The June follow-up records Harry noticing how changing “disgraceful” to “controversial” changes the tone.',
    challenge:
      'Write two openings: one opinion column and one neutral report. Avoid treating an entire fan base as if everyone shares one view.',
    brief: 'The big debate',
  },
  {
    id: 'social-media',
    title: 'Does social media make football better?',
    category: 'Debate plan',
    date: '25 June 2026',
    credit: 'Harry · plan summarised from the lesson',
    source: 'English session 8',
    excerpt:
      'Position: mostly agree that social media has worsened football culture.\n\nArguments: misinformation can shape false perceptions and conflict; discrimination can spread.\n\nCounterargument: fans can find team news more easily, and new audiences can get involved.\n\nVerdict: it can be positive, depending on how it is used.',
    note: 'A faithful summary of Harry’s plan, not a verbatim article. The working title is new.',
    challenge:
      'Turn the plan into a column. Use one checked example for each main argument and give the counterargument a full paragraph.',
    brief: 'The big debate',
  },
];
export type Lesson = {
  date: string;
  tutor: 'Josh' | 'Aaron';
  subject: 'English' | 'Maths';
  title: string;
  work: string;
  topic: string;
};
export const lessons: Lesson[] = [
  [
    '28 Apr',
    'Josh',
    'English',
    'Finding a voice',
    'Football, reading and first analytical responses.',
    'objective-analysis',
  ],
  [
    '30 Apr',
    'Aaron',
    'Maths',
    'The starting point',
    'Diagnostic work on number, percentages, units and coordinates.',
    'units',
  ],
  [
    '5 May',
    'Josh',
    'English',
    'Opinion and character',
    'Article discussion and Mr Birling in An Inspector Calls.',
    'objective-analysis',
  ],
  [
    '7 May',
    'Aaron',
    'Maths',
    'Fractions meet percentages',
    'Converting and finding amounts.',
    'percentages',
  ],
  [
    '12 May',
    'Josh',
    'English',
    'Leeds and changing football',
    'The 13th-place prediction and analysis of a 1970 final clip.',
    'evidence-tone',
  ],
  [
    '14 May',
    'Aaron',
    'Maths',
    'Working backwards',
    'Reverse fractions and percentages.',
    'reverse-percentages',
  ],
  [
    '19 May',
    'Aaron',
    'English',
    'The cover lesson',
    'PEEL, football rivalry and Macbeth’s imagined dagger.',
    'macbeth',
  ],
  [
    '21 May',
    'Aaron',
    'Maths',
    'Long multiplication and division',
    'Breaking larger calculations into manageable steps.',
    'arithmetic',
  ],
  [
    '2 Jun',
    'Josh',
    'English',
    'Building the Arsenal argument',
    'A shared paragraph; evidence, consensus and subjectivity.',
    'evidence-tone',
  ],
  [
    '4 Jun',
    'Aaron',
    'Maths',
    'Mixed-paper refresher',
    'Recognising the method before calculating.',
    'fractions',
  ],
  [
    '9 Jun',
    'Josh',
    'English',
    'The second draft',
    'Reviewing Leeds writing, vocabulary, objective tone and a video idea.',
    'evidence-tone',
  ],
  [
    '11 Jun',
    'Aaron',
    'Maths',
    'Time, speed and fractions',
    'Time problems, speed–distance–time and mixed fractions.',
    'speed-time',
  ],
  [
    '16 Jun',
    'Josh',
    'English',
    'Macbeth and persuasive structure',
    'The play’s progression, PEEL/PREE and football-and-politics arguments.',
    'persuasion',
  ],
  [
    '18 Jun',
    'Aaron',
    'Maths',
    'Choosing an entry point',
    'Past-paper work: start with a question you can access.',
    'arithmetic',
  ],
  [
    '23 Jun',
    'Josh',
    'English',
    'Literature preparation',
    'Character, evidence and a clear line of argument.',
    'peel',
  ],
  [
    '23 Jun',
    'Aaron',
    'Maths',
    'Mixed-paper methods',
    'More past-paper work with structural prompts.',
    'fractions',
  ],
  [
    '25 Jun',
    'Josh',
    'English',
    'A whole argument',
    'Social media in football, phones in schools and counterarguments.',
    'persuasion',
  ],
  [
    '30 Jun',
    'Josh',
    'English',
    'A journalist’s angle',
    'England’s chances and the start of Hydration disaster.',
    'evidence-tone',
  ],
  [
    '2 Jul',
    'Aaron',
    'Maths',
    'World Cup probability',
    'Starting estimates and combining chances under stated assumptions.',
    'probability',
  ],
  [
    '7 Jul',
    'Josh',
    'English',
    'Hydration and the Norway preview',
    'Developing the article and recording score and event calls.',
    'persuasion',
  ],
  [
    '9 Jul',
    'Aaron',
    'Maths',
    'Ratings become statistics',
    'Mean, median, mode and range using player ratings.',
    'averages',
  ],
  [
    '14 Jul',
    'Josh',
    'English',
    'Review, compare, predict',
    'Norway event review; Spain–France calls and England–Argentina scenario.',
    'evidence-tone',
  ],
  [
    '16 Jul',
    'Aaron',
    'Maths',
    'The geometry of a shot',
    'Pythagoras and an introduction to angles in a penalty scenario.',
    'pythagoras',
  ],
  [
    '28 Jul',
    'Aaron',
    'Maths',
    'Spot the pattern',
    'Vocabulary warm-up and number sequences.',
    'sequences',
  ],
  [
    '30 Jul',
    'Aaron',
    'Maths',
    'Harder patterns',
    'Continuing sequence work. Indices were a planned next step.',
    'sequences',
  ],
  [
    'Early Sep',
    'Aaron',
    'Maths',
    'Back to the essentials',
    'Conversions, decimal order, units, expressions and multiples.',
    'expressions',
  ],
].map(([date, tutor, subject, title, work, topic]) => ({
  date,
  tutor: tutor as Lesson['tutor'],
  subject: subject as Lesson['subject'],
  title,
  work,
  topic,
}));
