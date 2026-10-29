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
    alt: 'An old laced ball in churned mud and a modern ball on striped turf sit either side of a halfway line, seen from above',
    caption: 'Original illustration contrasting two eras of football.',
    width: 1600,
    height: 900,
  },
  'leeds-newcastle': {
    src: new URL(
      '../assets/news/leeds-newcastle-house-d-day.jpg',
      import.meta.url,
    ).href,
    alt: 'A soaked magpie sulks beside a striped scarf in an empty away end while the home side celebrates below',
    caption: 'Original illustration of a magpie in an empty away end.',
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
    alt: 'A cockerel crows from a plain corner pole against an amber sunset above a thin dark band of pitch',
    caption: 'Original illustration of a cockerel at sunset.',
    width: 1600,
    height: 900,
  },
  'arsenal-tone': {
    src: new URL('../assets/news/arsenal-tone.jpg', import.meta.url).href,
    alt: 'An amber desk lamp lights a brass balance scale with six plain trophies in its lower pan and one in its raised pan',
    caption: 'Original illustration of a comparison weighed on a balance scale.',
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
    alt: 'A chalked goal and muddy ball marks cover a garden brick wall, with one ball below and a plain white shirt on a washing line above',
    caption: 'Original illustration of target practice in a back garden.',
    width: 1600,
    height: 900,
  },
};
