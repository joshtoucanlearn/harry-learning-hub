import { MATCH_PHOTOS } from './prediction-photos';

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
  photo: {
    src: string;
    alt: string;
    credit: string;
    sourceUrl: string;
    position?: string;
  };
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
    photo: MATCH_PHOTOS.norwayEngland,
    title: 'England v Norway',
    date: '7 July 2026',
    author: 'Harry',
    call: '3–1 England',
    excerpt:
      'No pen england is going to score first\n\nHarry kane, jude bellingham, anthony gordon, haaland odegaard\n\n3-1 due to norways dreadful defence in tight situations. Specifically harry kane is going to run through the defence cross one over to jude bellingham and he will score an easy tap in even harry maguire would score.',
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
    photo: MATCH_PHOTOS.spainFrance,
    title: 'Spain v France',
    date: '14 July 2026',
    author: 'Harry',
    call: 'France to win',
    excerpt:
      'France will score first, and Mbappe will be the one to score it. Spain will get a lucky goal to make it 1-1, then last minute, Ousmane Dembele is going to score and get France over the line and it’s gonna be a very calm and less dirty game.\n\nMbappe because he has the attacking capability, Yamal because he has a wonder kid style of play which opens up the game, Dembele because of his assisting capabilities.\n\nI think it’s going to be a pretty even game, with both sides having strong defences, it will be a chill but technical game.',
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
    photo: MATCH_PHOTOS.spainFrance,
    title: 'Spain v France',
    date: '14 July 2026',
    author: 'Josh',
    call: '1–1, then penalties',
    excerpt:
      'I think this will be a non-feisty game due to the higher technical abilities of each team. I think France will have more cards due to establishing more physical intensity, and Spain more possession.\n\nMbappe obviously for his goal and attacking prowess, Rabiot because of his Pogba-like play, Yamal, Merino(?) because I’m an Arsenal fan and MM9 is real\n\n1-1 to pens, I think both teams will play non-risky due to Spain’s playstyle',
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
    photo: MATCH_PHOTOS.englandArgentina,
    title: 'England v Argentina',
    date: '14 July 2026',
    author: 'Harry',
    call: '3–1 England',
    excerpt:
      'England will not score first. Messi will be the one to score it, FIFA will play a big part of trying to let Argentina “win”. Then Jude Bellingham will score a diving header and put it past Martinez to make it 1-1, then Jude Bellingham is gonna score again and make it 2-1. One of Argentina’s defenders will snap Eze and then we will be given a penalty in which sir Harry Kane will score bottom left.\n\n3-1 england in normal time',
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
    photo: MATCH_PHOTOS.leedsFinale,
    title: 'Where will Leeds finish?',
    date: '12 May 2026',
    author: 'Harry',
    call: '13th',
    excerpt:
      'I think that Leeds United will finish 13th next season, I think this because over the summer transfer window Leeds will get a 65 million pound for staying up in the Premier League. This means that we will sign some really good players and become a proper premier league side. For example Leeds struggle mostly defending on the left. I think that we should sign some left backs, this will help Leeds to not concede as many goals in the premier league which will result in having a better goal difference, which I think will make the difference next season. Realistically someone from a relegation scrap side like wolves, this will help because we will have a left back with premier league quality .',
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
    photo: MATCH_PHOTOS.englandArgentina,
    title: 'England’s World Cup chances',
    date: '30 June – 2 July 2026',
    author: 'Harry',
    call: '20% estimate',
    excerpt:
      'In my opinion I think that England have a good chance of winning the World Cup. I think this because we have a really good attacking team for example we have Harry Kane, Madueke, Declan Rice and Jude Bellingham. I believe that Declan Rice will play a huge part this world cup due to his really good set piece play, which England have relied on heavily for goals in this tournament. The set pieces are especially dangerous with Harry Kane, due to his fantastic goal scoring ability and ariel prowess.',
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
    note: 'The full learner piece, with original wording. Harry supplied the core argument; Josh supported its more formal expression.',
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
      'I think that Leeds United will finish 13th next season, I think this because over the summer transfer window Leeds will get a 65 million pound for staying up in the Premier League. This means that we will sign some really good players and become a proper premier league side. For example Leeds struggle mostly defending on the left. I think that we should sign some left backs, this will help Leeds to not concede as many goals in the premier league which will result in having a better goal difference, which I think will make the difference next season. Realistically someone from a relegation scrap side like wolves, this will help because we will have a left back with premier league quality .',
    note: 'The full paragraph from the original Leeds prediction, with original wording, spelling and punctuation. The heading here is an archive label. The piece was revisited in June.',
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
    note: 'Harry’s complete pre-match response from session 10: event call, key players and score scenario. Original wording is preserved.',
    challenge:
      'Use the sourced result in The Record to write the follow-up. Distinguish normal time from extra time and explain which part of the call worked.',
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
    note: 'Harry’s complete response from session 11, separately credited from Josh’s model. Original classroom prediction, with original wording.',
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
      'One way football has evolved over the years, is that it is less dirty and its an equal game. For example, in the 1970’s FA Cup Final highlights, a Chelsea player at the 0:44 mark was shown doing a highfoot on one of the Leeds players in the back of the head. In the modern game this is almost a guaranteed red card. However, in the 1970s, fouls like that were seen as fair and normal which demonstrates one way in which football has significantly evolved over the years.',
    note: 'The full paragraph from a response to a video clip, in original wording. The historical interpretation remains a claim to examine.',
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
      'The hate towards Arsenal in the UK is deserved because of the disgraceful opinions of their fans. For example, on a social media post on TikTok, an Arsenal fan stated that "Bukayo Saka is better than David Beckham", which blew up and attracted a lot of negative feedback and discourse from online football fans. This statement is a subjective opinion, but objectively wrong in many ways. Measuring their two careers highlights the ignorance of the claim; David Beckham has won many trophies in his career. For example he has won 6 Premier Leagues with Manchester United whilst Saka has only won 1 Premier League with Arsenal. It is easy to make this type of comparison across all domains of their careers.',
    note: 'The full jointly developed debate paragraph; its first line was a joint model point. The June follow-up records Harry noticing how changing “disgraceful” to “controversial” changes the tone.',
    challenge:
      'Check the quotation and trophy claims. Separate opinion from evidence, then write an opinion opening and a neutral report opening.',
    brief: 'The big debate',
  },
  {
    id: 'football-hooliganism',
    title:
      'What is football hooliganism and is it a necessary part of football culture?',
    category: 'Opinion',
    date: '9 June 2026',
    credit: 'Harry · developed with Josh',
    source: 'Harry session 6',
    excerpt:
      'Football hooliganism is when football fans feel a strong hatred toward the opposing team. Attributive behaviours include violence, intoxication and general discounduct.\n\nIt is a necessary part of the culture because it breeds rivalries and creates healthy competition. Teams such Leeds United and Manchester United have such competition and rival spirit. In a way, this brings fans together as they have a shared goal and a shared rival. In another sense, it cultivates a lot of buzz and news around football, hyping up the biggest rival games and whatnot. It is necessary because it creates a lot of tension between teams - which makes football culture not boring (exciting)',
    note: 'The full two-paragraph classroom debate response, developed with Josh. Original wording and spelling are preserved; its claims are for critical discussion.',
    challenge:
      'Distinguish rivalry from violence. Test whether shared identity and excitement require hooliganism, and consider the effect on other fans.',
    brief: 'The big debate',
  },
  {
    id: 'social-media',
    title: 'Does social media make football better?',
    category: 'Debate plan',
    date: '25 June 2026',
    credit: 'Harry · own plan and conclusion',
    source: 'English session 8',
    excerpt:
      'Question: "Social media has made football culture worse. Fans are now more interested in arguments, attention and online drama than actually enjoying the sport."\n\nIntro: Yes more agree\n\nArgument 1: Misinformation spreads online which creates false perceptions of what is happening in football, giving football a bad reputation, and creating conflict/tension\n\nArgument 2: The social media culture of football has been seen to promote racism and other discriminatory behaviours\n\nCounterargument: Social media makes team news and general engagement more accessible to fans, which is a general net positive for football fans as they can get info easier, and also introducing new audiences to the sport\n\nConclusion: In my opinion, social media has been a negative to football culture due to the way it is employed by both the fans and sometimes the players / clubs. Overall, social media can be a positive unless used incorrectly and future considerations can be made to resolve this problem.',
    note: 'Harry’s own plan and conclusion from English session 8, verbatim. The working title is new.',
    challenge:
      'Turn the plan into a column. Use one checked example for each main argument and give the counterargument a full paragraph.',
    brief: 'The big debate',
  },
  {
    id: 'england-world-cup',
    title: 'England’s World Cup chances',
    category: 'Preview',
    date: '30 June 2026',
    credit: 'Harry · lesson writing',
    source: 'English session 9',
    excerpt: historicalCalls[5].excerpt,
    note: 'Harry’s full World Cup prediction paragraph from session 9, in original wording. The later 20% maths estimate is recorded separately in The Record.',
    challenge:
      'Separate attacking quality from tournament probability. Check the set-piece claims and explain what would change the forecast.',
    brief: 'The match preview',
  },
  {
    id: 'leeds-newcastle',
    title: 'The Battering of the Geordies',
    category: 'Match report',
    date: 'October 2026',
    credit: 'Harry · lesson writing',
    source: 'English session, October 2026',
    excerpt:
      "Leeds United faced off mid table team Newcastle at Elland Road. After a Leeds United defeat against Chelsea in third round of the Carabao Cup, people were doubting Leeds and saying that they aren't good enough for The Premier League.\n\nAs kick off struck at 8pm, The Mighty Whites had a tremendous amount of possession in the first 25 minutes. Then at the 33 minute mark, Ao Tanaka struck the ball from outside the box and it deflected off an unlucky Lewis Miley and went in the bottom right corner to make it 1-0 to The Mighty Whites. Elland Road erupted. Not only did Leeds score, but they also scored another 2 afterwards in the same half. The morale of the team sky rocketed and the first half came to a close with the score line 3-0.\n\nAs the 2nd half kicked off, it was 50/50 for about 10 minutes. Newcastle wanted a goal to give their fans a bit of hope that they can come-back and get a draw. As the minutes relentlessly ticked towards the 55th minute, Noah Okafor scored a volley from outside the box to make it 4-0 at Elland Road. This destroyed Newcastle’s ambition and any hope of winning the game. Then without warning, a Newcastle player scored a tap in due to lackluster defending at the back which lead to 4-1 at Elland Road. Despite their goal, it was too late. The game was over and The Mighty Whites took the 3 points off Newcastle at Elland Road.\n\nOverall, it was a one-sided game mostly due to the fact that Leeds scored 3 in the first 45 minutes. It was an emphatic win to finish off for 3 weeks because of the international break and it also puts The Mighty Whites in 5th place, but it’s a bad way for Newcastle to end it. They got no points from this match and will have 3 weeks to sort it out or else they will be in relegation trouble.",
    note: "Harry's final version, revised with Josh after the first draft in Aaron's session",
    challenge:
      'Keep the match narrative. Check the scorers, timings and table position against a match source, then support the final judgement with evidence.',
    brief: 'The final-whistle report',
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
