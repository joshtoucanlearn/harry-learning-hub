type NewsArt = {
  src: string;
  alt: string;
  readerAlt?: string;
  caption: string;
  width: number;
  height: number;
};

export const newsArt: Record<string, NewsArt> = {
  hydration: {
    src: new URL('../assets/hydration-editorial.jpg', import.meta.url).href,
    alt: 'Editorial illustration of water bottles beside a floodlit football pitch',
    readerAlt: 'Water bottles on the touchline of a floodlit football ground',
    caption: 'Hydration breaks and the rhythm of a match.',
    width: 1536,
    height: 1024,
  },
  'leeds-analysis': {
    src: new URL('../assets/news/leeds-analysis.jpg', import.meta.url).href,
    alt: 'A lone defender seen from behind beside an open flank under floodlights',
    caption: 'Original illustration of a defensive gap.',
    width: 1600,
    height: 900,
  },
  'football-evolution': {
    src: new URL('../assets/news/football-evolution.jpg', import.meta.url).href,
    alt: 'An old leather ball on a muddy pitch with distant players and vintage stands',
    caption: 'Original illustration inspired by football in the 1970s.',
    width: 1600,
    height: 900,
  },
  'leeds-newcastle': {
    src: new URL('../assets/news/leeds-newcastle.jpg', import.meta.url).href,
    alt: 'A white-shirted striker celebrates as a striped defender slumps beside a rain-soaked goal',
    caption: 'Original illustration of a striker celebrating in the rain.',
    width: 1600,
    height: 900,
  },
  'norway-preview': {
    src: new URL('../assets/news/norway-preview.jpg', import.meta.url).href,
    alt: 'Players in plain white and red shirts seen from behind in a stadium tunnel',
    caption: 'Original illustration of the moments before kick-off.',
    width: 1600,
    height: 900,
  },
  'france-preview': {
    src: new URL('../assets/news/france-preview.jpg', import.meta.url).href,
    alt: 'A ball near a goal net under floodlights, with distant players beyond',
    caption: 'Original illustration of a possible late winner.',
    width: 1600,
    height: 900,
  },
  'arsenal-tone': {
    src: new URL('../assets/news/arsenal-tone.jpg', import.meta.url).href,
    alt: 'An unbranded microphone and an empty press-room chair beside a stadium window',
    caption: 'Original illustration of a space for football opinions.',
    width: 1600,
    height: 900,
  },
  'football-hooliganism': {
    src: new URL('../assets/news/football-hooliganism.jpg', import.meta.url)
      .href,
    alt: 'An orderly police line and distant crowd outside a stadium at dusk',
    caption: 'Original illustration of crowds outside a football ground.',
    width: 1600,
    height: 900,
  },
  'social-media': {
    src: new URL('../assets/news/social-media.jpg', import.meta.url).href,
    alt: 'A glowing phone with abstract comment bubbles on an empty stadium seat',
    caption: 'Original illustration of football conversation online.',
    width: 1600,
    height: 900,
  },
  'england-world-cup': {
    src: new URL('../assets/news/england-world-cup.jpg', import.meta.url).href,
    alt: 'A football beside a corner flag, with distant players awaiting a set piece under floodlights',
    caption: 'Original illustration of an attacking set piece.',
    width: 1600,
    height: 900,
  },
};
