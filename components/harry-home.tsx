import type { CSSProperties } from 'react';
import type React from 'react';
import { ArrowUpRight, BookOpen, ChevronRight, Newspaper, Target, Trophy } from 'lucide-react';
import { BrandIdentity } from './brand-mark';

export const DARTY_URL = 'https://joshtoucanlearn.github.io/darty/';

export type HomeTile = 'Football Journalism' | 'Matchday' | 'Review' | 'The Record';

const newsPreview = new URL('../assets/news/england-world-cup.jpg', import.meta.url).href;
const matchPreview = new URL('../assets/matches/england-argentina-2026.jpg', import.meta.url).href;

// Owner, 11 Nov: every tile gets a preview picture, like DARTY's pitch.
const tiles: { tab: HomeTile; title: string; line: string; icon: typeof Target; preview: () => React.ReactNode }[] = [
  { tab: 'Football Journalism', title: 'Newspaper', line: 'Your football writing.', icon: Newspaper,
    preview: () => <img className="tile-preview" src={newsPreview} alt="" loading="lazy" decoding="async" /> },
  { tab: 'Matchday', title: 'Matchday', line: 'Call the score before kick-off.', icon: Target,
    preview: () => <img className="tile-preview" src={matchPreview} alt="" loading="lazy" decoding="async" /> },
  { tab: 'Review', title: 'Review', line: 'Maths practice, topic by topic.', icon: BookOpen, preview: () => <PixelBoard /> },
  { tab: 'The Record', title: 'The Record', line: 'Past calls and lesson notes.', icon: Trophy, preview: () => <PixelRecord /> },
];

const order = (i: number) => ({ '--i': i }) as CSSProperties;

export function HarryHome({
  open,
  intro,
}: {
  open: (tab: HomeTile) => void;
  intro: 'off' | 'hold' | 'leave';
}) {
  return (
    <section className={`harry-home intro-${intro}`}>
      <h1 className="harry-home-brand home-reveal" style={order(0)}>
        <BrandIdentity className="harry-home-identity" />
      </h1>
      <div className="harry-home-grid">
        <a
          className="home-tile darty-tile home-reveal"
          style={order(1)}
          href={DARTY_URL}
          target="_blank"
          rel="noopener noreferrer"
        >
          <PixelPitch />
          <span className="tile-copy">
            <span className="tile-eyebrow">Your project</span>
            <span className="tile-title">DARTY</span>
            <span className="tile-line">A football game you’re building.</span>
          </span>
          <span className="tile-go">
            Play DARTY <ArrowUpRight size={16} aria-hidden="true" />
          </span>
        </a>
        {tiles.map(({ tab, title, line, preview }, i) => (
          <button
            key={tab}
            type="button"
            className="home-tile home-reveal"
            style={order(i + 2)}
            onClick={() => open(tab)}
          >
            <span className="tile-preview-frame" aria-hidden="true">{preview()}</span>
            <span className="tile-copy">
              <span className="tile-title">{title}</span>
              <span className="tile-line">{line}</span>
            </span>
            <ChevronRight className="tile-arrow" size={18} aria-hidden="true" />
          </button>
        ))}
      </div>
    </section>
  );
}

// A small hand-placed pixel pitch: no external media.
function PixelPitch() {
  const stripes = Array.from({ length: 10 }, (_, i) => (
    <rect key={i} x={i * 8} y={0} width={8} height={32} fill={i % 2 ? '#2c6f38' : '#327d3f'} />
  ));
  const players: [number, number, string, string][] = [
    [22, 8, '#f4f1e8', '#1f3f8f'],
    [30, 18, '#f4f1e8', '#1f3f8f'],
    [17, 22, '#f4f1e8', '#1f3f8f'],
    [8, 15, '#e4be78', '#1b1b1b'],
    [51, 10, '#d8433b', '#f4f1e8'],
    [57, 20, '#d8433b', '#f4f1e8'],
    [46, 23, '#d8433b', '#f4f1e8'],
    [70, 15, '#7bc96f', '#1b1b1b'],
  ];
  return (
    <svg
      className="pixel-pitch"
      viewBox="0 0 80 32"
      shapeRendering="crispEdges"
      aria-hidden="true"
      focusable="false"
    >
      {stripes}
      <g fill="none" stroke="#e9f1e4" strokeWidth={1}>
        <rect x={3.5} y={3.5} width={73} height={25} />
        <line x1={40} y1={3.5} x2={40} y2={28.5} />
        <rect x={3.5} y={9.5} width={8} height={13} />
        <rect x={68.5} y={9.5} width={8} height={13} />
      </g>
      <g fill="#e9f1e4">
        <rect x={37} y={11} width={6} height={1} />
        <rect x={37} y={20} width={6} height={1} />
        <rect x={36} y={12} width={1} height={1} />
        <rect x={43} y={12} width={1} height={1} />
        <rect x={36} y={19} width={1} height={1} />
        <rect x={43} y={19} width={1} height={1} />
        <rect x={35} y={13} width={1} height={6} />
        <rect x={44} y={13} width={1} height={6} />
        <rect x={1} y={13} width={2} height={6} />
        <rect x={77} y={13} width={2} height={6} />
      </g>
      {players.map(([x, y, shirt, shorts]) => (
        <g key={`${x}-${y}`}>
          <rect x={x} y={y} width={2} height={1} fill="#f1c9a0" />
          <rect x={x} y={y + 1} width={2} height={2} fill={shirt} />
          <rect x={x} y={y + 3} width={2} height={1} fill={shorts} />
        </g>
      ))}
      <rect x={53} y={15} width={2} height={2} fill="#ffffff" />
      <rect x={54} y={16} width={1} height={1} fill="#1b1b1b" />
      <rect x={55} y={17} width={2} height={1} fill="#1d5a2a" />
    </svg>
  );
}

// Review: a chalkboard with a sum, in the same pixel style as the pitch.
function PixelBoard() {
  const px = (cells: string, x0: number, y0: number, fill: string) =>
    cells.split('|').flatMap((row, y) =>
      [...row].map((c, x) => (c === '#' ? <rect key={`${x0}-${x}-${y}`} x={x0 + x} y={y0 + y} width={1} height={1} fill={fill} /> : null)),
    );
  return (
    <svg className="tile-preview pixel-art" viewBox="0 0 80 30" shapeRendering="crispEdges" aria-hidden="true" focusable="false">
      <rect width={80} height={30} fill="#7a5233" />
      <rect x={2} y={2} width={76} height={24} fill="#1f4d3a" />
      <rect x={2} y={26} width={76} height={2} fill="#5c3c24" />
      <rect x={60} y={25} width={6} height={2} fill="#f4f1e8" />
      {px('###.|..#.|.##.|..#.|###.', 8, 8, '#f4f1e8')}
      {px('.#.|###|.#.', 14, 9, '#e4be78')}
      {px('#.#|#.#|###|..#|..#', 19, 8, '#f4f1e8')}
      {px('###|...|###', 25, 9, '#e4be78')}
      {px('###|..#|..#|.#.|.#.', 31, 8, '#f4f1e8')}
      {px('#.....#|.#...#.|..#.#..|...#...', 40, 8, '#7bc96f')}
      {px('#####.#####.####', 8, 17, '#9fb7a8')}
      {px('########.#####', 8, 21, '#9fb7a8')}
    </svg>
  );
}

// The Record: a trophy beside a rising bar chart.
function PixelRecord() {
  const bars: [number, number][] = [[42, 6], [49, 9], [56, 7], [63, 12], [70, 15]];
  return (
    <svg className="tile-preview pixel-art" viewBox="0 0 80 30" shapeRendering="crispEdges" aria-hidden="true" focusable="false">
      <rect width={80} height={30} fill="#162433" />
      <rect x={38} y={25} width={38} height={1} fill="#46607a" />
      {bars.map(([x, h]) => (
        <rect key={x} x={x} y={25 - h} width={5} height={h} fill={h === 15 ? '#e4be78' : '#3f7fa8'} />
      ))}
      <g fill="#e4be78">
        <rect x={10} y={5} width={14} height={2} />
        <rect x={11} y={7} width={12} height={4} />
        <rect x={12} y={11} width={10} height={2} />
        <rect x={14} y={13} width={6} height={2} />
        <rect x={16} y={15} width={2} height={4} />
        <rect x={13} y={19} width={8} height={2} />
        <rect x={11} y={21} width={12} height={4} />
        <rect x={7} y={7} width={3} height={1} />
        <rect x={7} y={8} width={1} height={3} />
        <rect x={7} y={10} width={4} height={1} />
        <rect x={24} y={7} width={3} height={1} />
        <rect x={26} y={8} width={1} height={3} />
        <rect x={23} y={10} width={4} height={1} />
      </g>
      <rect x={12} y={7} width={2} height={3} fill="#fff4cf" />
      <rect x={13} y={22} width={8} height={2} fill="#8a6a2c" />
    </svg>
  );
}
