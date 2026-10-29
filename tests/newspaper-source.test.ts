import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFileSync, statSync } from 'node:fs';
import ts from 'typescript';
import { newsArt } from '../data/news-art.ts';

type Pin = { sha256: string; paragraphs: number; credit: string };
const fixture = JSON.parse(
  readFileSync(
    new URL('./fixtures/writing-audit.json', import.meta.url),
    'utf8',
  ),
) as { archive: Record<string, Pin>; history: Record<string, Pin> };
const source = readFileSync(
  new URL('../data/learning-history.ts', import.meta.url),
  'utf8',
);
const ast = ts.createSourceFile(
  'writing.ts',
  source,
  ts.ScriptTarget.Latest,
  true,
);
const declarations = ast.statements.flatMap((statement) =>
  ts.isVariableStatement(statement)
    ? [...statement.declarationList.declarations]
    : [],
);
function array(name: string) {
  const value = declarations.find(
    (item) => item.name.getText(ast) === name,
  )?.initializer;
  assert(value && ts.isArrayLiteralExpression(value));
  return value;
}
function field(item: ts.ObjectLiteralExpression, key: string) {
  const value = item.properties.find(
    (property) =>
      ts.isPropertyAssignment(property) && property.name.getText(ast) === key,
  );
  assert(value && ts.isPropertyAssignment(value));
  return value.initializer;
}
function text(value: ts.Expression) {
  assert(ts.isStringLiteralLike(value));
  return value.text;
}
function entries(name: string) {
  return array(name).elements.map((value) => {
    assert(ts.isObjectLiteralExpression(value));
    return value;
  });
}
const history = entries('historicalCalls');
const archive = entries('archiveWriting');
function body(item: ts.ObjectLiteralExpression) {
  const value = field(item, 'excerpt');
  if (ts.isStringLiteralLike(value)) return value.text;
  const match = value.getText(ast).match(/^historicalCalls\[(\d+)\]\.excerpt$/);
  assert(match);
  return text(field(history[Number(match[1])], 'excerpt'));
}

void test('all published pieces and recorded calls preserve the audited full text and credits', () => {
  for (const [items, pins, credit] of [
    [archive, fixture.archive, 'credit'],
    [history, fixture.history, 'author'],
  ] as const) {
    assert.equal(items.length, Object.keys(pins).length);
    for (const item of items) {
      const id = text(field(item, 'id'));
      const original = body(item);
      assert(pins[id], `Audit the source before adding ${id}`);
      assert.equal(
        createHash('sha256').update(original).digest('hex'),
        pins[id].sha256,
        `${id}: text changed or was truncated`,
      );
      assert.equal(original.split('\n\n').length, pins[id].paragraphs, id);
      assert.equal(text(field(item, credit)), pins[id].credit, `${id}: credit`);
    }
  }
});

void test('full pieces have honest labels and the October final report metadata', () => {
  for (const item of archive) {
    assert(!/excerpt|selected passages/i.test(text(field(item, 'note'))));
  }
  const hydration = archive.find(
    (item) => text(field(item, 'id')) === 'hydration',
  );
  assert(hydration);
  assert(!body(hydration).includes('These changes are completely destructive'));
  assert.match(
    text(field(hydration, 'note')),
    /Josh supported its more formal expression/,
  );
  const report = archive.find(
    (item) => text(field(item, 'id')) === 'leeds-newcastle',
  );
  assert(report);
  assert.equal(text(field(report, 'title')), 'The Battering of the Geordies');
  assert.equal(text(field(report, 'source')), 'English session, October 2026');
  assert.equal(
    text(field(report, 'note')),
    "Harry's final version, revised with Josh after the first draft in Aaron's session",
  );
  const component = readFileSync(
    new URL('../components/journalism-library.tsx', import.meta.url),
    'utf8',
  );
  assert(!/format:\s*['"][^'"]*excerpt/i.test(component));
  assert(
    component.includes('Monday 14th of September · Leeds 4 – 1 Newcastle'),
  );
  assert(component.includes("a.id === 'hydration'"));
});

void test('every complete newspaper story has an illustration on disk', () => {
  const compare = (a: string, b: string) => a.localeCompare(b);
  assert.deepEqual(
    Object.keys(newsArt).sort(compare),
    archive.map((item) => text(field(item, 'id'))).sort(compare),
  );
  for (const art of Object.values(newsArt)) {
    assert(statSync(new URL(art.src)).isFile(), art.src);
    assert(art.alt.length > 0);
  }
});
