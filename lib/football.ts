import type { ArchiveNotes } from '../components/learning-archive';
import type { ReviewProgress } from '../data/review-topics';
export type EventCall = {
  text: string;
  actual: 'pending' | 'yes' | 'no' | 'void';
};
export type Prediction = {
  id: string;
  home: string;
  away: string;
  kickoff: string;
  author: 'Harry' | 'Josh';
  homeGoals: number;
  awayGoals: number;
  confidence: number;
  reasoning: string;
  events: EventCall[];
  createdAt: string;
  result: null | {
    home: number;
    away: number;
    source: string;
    enteredAt: string;
  };
  reflection: string;
  teacherNote: string;
};
export type Article = {
  id: string;
  title: string;
  kind: string;
  original: string;
  revision: string;
  savedAt: string;
  context?: string;
  sourceNote?: string;
};
export type Data = {
  version: 1;
  predictions: Prediction[];
  articles: Article[];
  review?: ReviewProgress;
  archiveNotes?: ArchiveNotes;
};
export const EMPTY: Data = { version: 1, predictions: [], articles: [] };
export const STORAGE_KEY = 'harry-football-desk-v1';
export const outcome = (home: number, away: number) => Math.sign(home - away);
export function assess(p: Prediction) {
  const checked = p.events.filter(
    (e) => e.actual === 'yes' || e.actual === 'no',
  );
  const hits = checked.filter((e) => e.actual === 'yes').length;
  if (!p.result)
    return {
      exact: false,
      correctOutcome: false,
      scorePoints: 0,
      eventHits: hits,
      eventCount: checked.length,
      total: 0,
      possible: 0,
      pending: p.events.filter((e) => e.actual === 'pending').length,
    };
  const exact = p.homeGoals === p.result.home && p.awayGoals === p.result.away;
  const correctOutcome =
    outcome(p.homeGoals, p.awayGoals) === outcome(p.result.home, p.result.away);
  const scorePoints = exact ? 3 : correctOutcome ? 1 : 0;
  return {
    exact,
    correctOutcome,
    scorePoints,
    eventHits: hits,
    eventCount: checked.length,
    total: scorePoints + hits,
    possible: 3 + checked.length,
    pending: p.events.filter((e) => e.actual === 'pending').length,
  };
}
export function stats(predictions: Prediction[]) {
  const reviewed = predictions.filter((p) => p.result);
  const results = reviewed.map(assess);
  return {
    reviewed: reviewed.length,
    exact: results.filter((a) => a.exact).length,
    outcomes: results.filter((a) => a.correctOutcome).length,
    eventHits: results.reduce((n, a) => n + a.eventHits, 0),
    eventCount: results.reduce((n, a) => n + a.eventCount, 0),
  };
}
export const rate = (n: number, d: number) =>
  d ? `${Math.round((n / d) * 100)}%` : '—';
const text = (v: unknown, max: number) =>
  typeof v === 'string' && v.length <= max;
const score = (v: unknown) =>
  Number.isInteger(v) && Number(v) >= 0 && Number(v) <= 99;
const date = (v: unknown) =>
  typeof v === 'string' && Number.isFinite(Date.parse(v));
export function parseBackup(raw: string): Data {
  const d = JSON.parse(raw);
  if (
    !d ||
    d.version !== 1 ||
    !Array.isArray(d.predictions) ||
    !Array.isArray(d.articles) ||
    d.predictions.length > 3000 ||
    d.articles.length > 3000
  )
    throw Error('This is not a Football Desk backup.');
  for (const p of d.predictions) {
    if (
      !p ||
      !text(p.id, 100) ||
      !p.id ||
      !text(p.home, 80) ||
      !p.home.trim() ||
      !text(p.away, 80) ||
      !p.away.trim() ||
      p.home.toLowerCase().trim() === p.away.toLowerCase().trim() ||
      !text(p.kickoff, 40) ||
      (p.kickoff && !date(p.kickoff)) ||
      !['Harry', 'Josh'].includes(p.author) ||
      !score(p.homeGoals) ||
      !score(p.awayGoals) ||
      !Number.isInteger(p.confidence) ||
      p.confidence < 0 ||
      p.confidence > 100 ||
      !text(p.reasoning, 5000) ||
      !text(p.reflection, 5000) ||
      !text(p.teacherNote, 5000) ||
      !date(p.createdAt) ||
      !Array.isArray(p.events) ||
      p.events.length > 3
    )
      throw Error('A prediction in this backup is invalid.');
    for (const e of p.events)
      if (
        !e ||
        !text(e.text, 300) ||
        !e.text.trim() ||
        !['pending', 'yes', 'no', 'void'].includes(e.actual)
      )
        throw Error('An event in this backup is invalid.');
    if (
      p.result !== null &&
      (!p.result ||
        !score(p.result.home) ||
        !score(p.result.away) ||
        !text(p.result.source, 500) ||
        !date(p.result.enteredAt))
    )
      throw Error('A result in this backup is invalid.');
  }
  for (const a of d.articles)
    if (
      !a ||
      !text(a.id, 100) ||
      !a.id ||
      !text(a.title, 150) ||
      !text(a.kind, 80) ||
      !text(a.original, 12000) ||
      !text(a.revision, 12000) ||
      !date(a.savedAt) ||
      (a.context !== undefined && !text(a.context, 6000)) ||
      (a.sourceNote !== undefined && !text(a.sourceNote, 2000))
    )
      throw Error('An article in this backup is invalid.');
  if (
    new Set(d.predictions.map((p: Prediction) => p.id)).size !==
      d.predictions.length ||
    new Set(d.articles.map((a: Article) => a.id)).size !== d.articles.length
  )
    throw Error('This backup contains duplicate records.');
  if (d.review !== undefined) {
    if (
      !d.review ||
      typeof d.review !== 'object' ||
      Array.isArray(d.review) ||
      Object.keys(d.review).length > 1000
    )
      throw Error('Invalid review progress.');
    for (const [key, value] of Object.entries(d.review)) {
      const item = value as {
        attempts: number;
        correct: boolean;
        updatedAt: string;
      };
      if (
        !text(key, 100) ||
        !item ||
        !Number.isInteger(item.attempts) ||
        item.attempts < 1 ||
        typeof item.correct !== 'boolean' ||
        !date(item.updatedAt)
      )
        throw Error('Invalid review progress.');
    }
  }
  if (d.archiveNotes !== undefined) {
    if (
      !d.archiveNotes ||
      typeof d.archiveNotes !== 'object' ||
      Array.isArray(d.archiveNotes) ||
      Object.keys(d.archiveNotes).length > 1000
    )
      throw Error('Invalid archive notes.');
    for (const [key, value] of Object.entries(d.archiveNotes)) {
      const note = value as { result: string; reflection: string };
      if (
        !text(key, 100) ||
        !note ||
        !text(note.result, 3000) ||
        !text(note.reflection, 3000)
      )
        throw Error('Invalid archive notes.');
    }
  }
  return d;
}
