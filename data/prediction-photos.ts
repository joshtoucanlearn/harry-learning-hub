// Photos from the linked official match reports. See assets/matches/SOURCES.md.
export const MATCH_PHOTOS = {
  norwayEngland: {
    src: new URL('../assets/matches/norway-england-2026.jpg', import.meta.url)
      .href,
    alt: 'Jude Bellingham celebrates with England teammates after equalising against Norway.',
    credit: 'England Football',
    sourceUrl:
      'https://www.englandfootball.com/england/mens-senior-team/fixtures-results/2025-26/world-cup/norway-england-fifa-world-cup-quarter-final-saturday-11-july-2026-match-centre',
  },
  spainFrance: {
    src: new URL('../assets/matches/spain-france-2026.webp', import.meta.url)
      .href,
    alt: 'Spain and France flags on the pitch at Dallas Stadium before their World Cup semifinal.',
    credit: 'Ryan Pierse / FIFA / Getty',
    sourceUrl:
      'https://inside.fifa.com/organisation/news/dallas-stadium-messi-haaland-unai-simon-record-spain-france',
  },
  englandArgentina: {
    src: new URL(
      '../assets/matches/england-argentina-2026.jpg',
      import.meta.url,
    ).href,
    alt: 'Jude Bellingham carries the ball past an Argentina player during the World Cup semifinal.',
    credit: 'England Football',
    sourceUrl:
      'https://www.englandfootball.com/england/mens-senior-team/fixtures-results/2025-26/World-Cup/england-argentina-fifa-world-cup-quarter-final-wednesday-15-july-2026-match-centre',
  },
  leedsFinale: {
    src: new URL('../assets/matches/leeds-west-ham-2026.webp', import.meta.url)
      .href,
    alt: 'Jayden Bogle in Leeds United\u2019s blue away kit during the final match of the 2025/26 season at West Ham.',
    credit: 'Leeds United',
    sourceUrl:
      'https://www.leedsunited.com/en/news/jayden-bogle-its-a-learning-curve',
  },
} as const;
