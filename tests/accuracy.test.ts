import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  assess,
  stats,
  parseBackup,
  type Prediction,
} from '../lib/football.ts';
const p: Prediction = {
  id: 'test',
  home: 'Home',
  away: 'Away',
  author: 'Harry',
  kickoff: '',
  homeGoals: 2,
  awayGoals: 1,
  confidence: 60,
  reasoning: 'Evidence',
  events: [
    { text: 'Home score first', actual: 'yes' },
    { text: 'A penalty', actual: 'no' },
    { text: 'A red card', actual: 'pending' },
  ],
  createdAt: '2026-09-06T00:00:00Z',
  result: {
    home: 2,
    away: 1,
    source: 'Test',
    enteredAt: '2026-09-06T00:00:00Z',
  },
  reflection: '',
  teacherNote: '',
};
test('exact score is three points, not added to outcome point', () => {
  assert.equal(assess(p).scorePoints, 3);
  assert.equal(assess(p).total, 4);
  assert.equal(assess(p).possible, 5);
  assert.equal(assess(p).pending, 1);
});
test('different score same outcome earns one; opposite result earns zero', () => {
  assert.equal(
    assess({ ...p, result: { ...p.result!, home: 3, away: 0 } }).scorePoints,
    1,
  );
  assert.equal(
    assess({ ...p, result: { ...p.result!, home: 0, away: 1 } }).scorePoints,
    0,
  );
});
test('draw prediction distinguishes exact and different draw', () => {
  const draw = { ...p, homeGoals: 1, awayGoals: 1 };
  assert.equal(
    assess({ ...draw, result: { ...p.result!, home: 0, away: 0 } }).scorePoints,
    1,
  );
  assert.equal(
    assess({ ...draw, result: { ...p.result!, home: 1, away: 1 } }).scorePoints,
    3,
  );
});
test('pending and void events do not inflate denominator', () => {
  const result = assess({
    ...p,
    events: [
      { text: 'An event', actual: 'void' },
      { text: 'Another', actual: 'pending' },
    ],
  });
  assert.equal(result.possible, 3);
  assert.equal(result.eventCount, 0);
});
test('unreviewed matches never count toward accuracy', () => {
  assert.equal(
    stats([p, { ...p, id: 'unreviewed', result: null }]).reviewed,
    1,
  );
  assert.equal(stats([]).eventCount, 0);
});
test('backups round-trip and reject corruption', () => {
  const data = { version: 1, predictions: [p], articles: [] };
  assert.deepEqual(parseBackup(JSON.stringify(data)), data);
  assert.throws(() => parseBackup('{"version":2}'));
  assert.throws(() =>
    parseBackup(JSON.stringify({ ...data, predictions: [p, p] })),
  );
  assert.throws(() =>
    parseBackup(
      JSON.stringify({ ...data, predictions: [{ ...p, homeGoals: -1 }] }),
    ),
  );
  assert.throws(() =>
    parseBackup(
      JSON.stringify({
        ...data,
        predictions: [{ ...p, events: [{ text: 'x', actual: 'anything' }] }],
      }),
    ),
  );
});

test('review progress survives backup and rejects invalid attempts', () => {
  const data = {
    version: 1,
    predictions: [],
    articles: [],
    review: {
      'percent-decimal': {
        attempts: 2,
        correct: true,
        updatedAt: '2026-09-06T00:00:00Z',
      },
    },
  };
  assert.deepEqual(parseBackup(JSON.stringify(data)), data);
  assert.throws(() =>
    parseBackup(
      JSON.stringify({
        ...data,
        review: {
          bad: {
            attempts: -1,
            correct: true,
            updatedAt: '2026-09-06T00:00:00Z',
          },
        },
      }),
    ),
  );
});

test('archive notes and article provenance round-trip without entering scoring', () => {
  const data = {
    version: 1,
    predictions: [],
    articles: [
      {
        id: 'rewrite',
        title: 'Second take',
        kind: 'The big debate',
        original: 'Source excerpt',
        revision: 'My revision',
        sourceNote: 'Harry with tutor support',
        context: 'Check the claim',
        savedAt: '2026-09-09T00:00:00Z',
      },
    ],
    archiveNotes: {
      norway: { result: 'Score unknown', reflection: 'Check the fixture' },
    },
  };
  const restored = parseBackup(JSON.stringify(data));
  assert.deepEqual(restored, data);
  assert.equal(stats(restored.predictions).reviewed, 0);
  assert.throws(() =>
    parseBackup(
      JSON.stringify({
        ...data,
        archiveNotes: { norway: { result: 12, reflection: '' } },
      }),
    ),
  );
  assert.throws(() =>
    parseBackup(
      JSON.stringify({
        ...data,
        articles: [{ ...data.articles[0], sourceNote: { bad: true } }],
      }),
    ),
  );
});
