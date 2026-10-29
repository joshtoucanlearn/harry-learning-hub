// Serve website-final-pass on port 4206, then run from this repository:
// PLAYWRIGHT_MODULE=/path/to/playwright/index.mjs node tests/newspaper-browser.mjs
import assert from 'node:assert/strict';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import ts from 'typescript';

const { chromium } = await import(process.env.PLAYWRIGHT_MODULE || 'playwright');
const url = process.env.NEWSPAPER_URL || 'http://127.0.0.1:4206/projects/football-journalism/';
const output = path.resolve(process.env.NEWSPAPER_SCREENSHOTS || 'qa/newspaper');
const names = /\b(?:harry|joe|josh(?:ua)?|baker|gordon|jones|psychologist)\b/i;
const source = await readFile(new URL('../data/learning-history.ts', import.meta.url), 'utf8');
const ast = ts.createSourceFile('learning-history.ts', source, ts.ScriptTarget.Latest, true);
const declarations = ast.statements.flatMap(statement => ts.isVariableStatement(statement) ? [...statement.declarationList.declarations] : []);
const articles = declarations.find(item => item.name.getText(ast) === 'archiveWriting').initializer;
assert(ts.isArrayLiteralExpression(articles));
const expected = new Map(articles.elements.map(item => {
  const property = name => item.properties.find(value => ts.isPropertyAssignment(value) && value.name.getText(ast) === name).initializer;
  const excerpt = property('excerpt');
  return [property('id').text, ts.isStringLiteralLike(excerpt) ? excerpt.text.split('\n\n') : null];
}));
const restored = ['leeds-newcastle', 'leeds-analysis', 'social-media', 'arsenal-tone', 'football-hooliganism'];
const errors = [];
const results = [];
await mkdir(output, { recursive: true });
let browser;
try {
  browser = await chromium.launch({ channel: 'chrome', headless: true });
  for (const viewport of [{ width: 1440, height: 750 }, { width: 390, height: 844 }]) {
    for (const colorScheme of ['light', 'dark']) {
      const label = `${viewport.width}x${viewport.height}-${colorScheme}`;
      const context = await browser.newContext({ viewport, colorScheme, reducedMotion: 'reduce' });
      const page = await context.newPage();
      page.on('pageerror', error => errors.push(`${label}: ${error.message}`));
      page.on('console', message => { if (message.type() === 'error') errors.push(`${label}: ${message.text()}`); });
      page.on('response', response => { if (response.status() >= 400) errors.push(`${label}: HTTP ${response.status()} ${response.url()}`); });
      page.on('request', request => assert.equal(new URL(request.url()).origin, new URL(url).origin, 'External request'));
      await page.addInitScript(() => {
        window.newspaperCspViolations = [];
        document.addEventListener('securitypolicyviolation', event => window.newspaperCspViolations.push(event.violatedDirective));
      });
      await page.goto(url);
      await page.locator('.news-masthead').waitFor();
      assert.equal(await page.locator('.news-lead a').getAttribute('href'), '#football/hydration');
      const links = await page.locator('.news-story-link').evaluateAll(items => items.map(item => item.getAttribute('href')));
      const compare = (a, b) => a.localeCompare(b);
      assert.deepEqual([...links].sort(compare), [...expected.keys()].map(id => `#football/${id}`).sort(compare), 'Every story appears exactly once');
      assert.equal(await page.locator('.news-lead img').count(), 1, 'Original lead illustration is preserved');
      assert.equal(await page.locator('.news-lead h2').innerText(), 'Hydration disaster');
      await page.screenshot({ path: path.join(output, `${label}-front.png`), fullPage: true });
      for (const [section, count] of [['Opinion', 4], ['Analysis', 2], ['Match reports', 1], ['Match previews', 2], ['All stories', 9]]) {
        await page.getByRole('button', { name: section, exact: true }).click();
        assert.equal(await page.locator('.news-story').count(), count, section);
      }
      for (const [id, paragraphs] of expected) {
        await page.locator(`.news-story-link[href="#football/${id}"]`).click();
        await page.locator('.news-reader .news-reading-copy').waitFor();
        if (paragraphs) assert.deepEqual(await page.locator('.news-reading-copy p').allTextContents(), paragraphs, `Verbatim source: ${id}`);
        assert(!names.test(await page.locator('body').innerText()), `Private name in ${id}`);
        assert.equal(await page.locator('form, input, textarea, audio, video, .brand-crest').count(), 0);
        assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `${label}/${id}: horizontal overflow`);
        const routes = await page.locator('a').evaluateAll(items => items.map(item => item.getAttribute('href')));
        assert(routes.every(route => /^#football(?:\/[^/]+)?$/.test(route)), `Link leaves the newspaper: ${id}`);
        if (restored.includes(id)) await page.screenshot({ path: path.join(output, `${label}-${id}.png`), fullPage: true });
        await page.getByRole('link', { name: '← Back to Football', exact: true }).click();
        await page.locator('.news-masthead').waitFor();
      }
      await page.goto(`${url}#football/leeds-newcastle`);
      await page.locator('.news-reading-copy').waitFor();
      await page.reload();
      await page.locator('.news-reading-copy').waitFor();
      assert.deepEqual(await page.locator('.news-reading-copy p').allTextContents(), expected.get('leeds-newcastle'));
      assert.deepEqual(await page.evaluate(() => [localStorage.length, sessionStorage.length]), [0, 0]);
      assert.deepEqual(await page.evaluate(() => window.newspaperCspViolations), []);
      results.push({ label, articles: links.length, verbatim: restored });
      await context.close();
    }
  }
  assert.deepEqual(errors, []);
  await writeFile(path.join(output, 'checks.json'), JSON.stringify({ passed: true, results, errors }, null, 2));
  console.log('PASS: nine stories, original Hydration lead and illustration, exact source paragraphs, filters, direct links, privacy, CSP and no overflow at 1440×750 and 390×844 in light/dark.');
} catch (error) {
  await writeFile(path.join(output, 'checks.json'), JSON.stringify({ passed: false, results, errors, failure: error.stack }, null, 2));
  throw error;
} finally {
  await browser?.close();
}
