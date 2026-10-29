import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { readFileSync } from 'node:fs';
import { fileURLToPath, URL } from 'node:url';
import ts from 'typescript';

const hub = fileURLToPath(new URL('.', import.meta.url));
const anonymise = (source: string) => source
  .replace(/\bharry (?=kane|maguire)/gi, '')
  .replace(/Harry Baker MEDIA/g, 'Football')
  .replace(/\bHarry(?: Baker)?\b/gi, 'Learner')
  .replace(/\bJoe\b/gi, 'Learner')
  .replace(/\bBaker\b/gi, '')
  .replace(/\bJosh\b/g, 'Tutor');

export default defineConfig({
  root: fileURLToPath(new URL('./showcase', import.meta.url)),
  base: './',
  publicDir: false,
  plugins: [
    {
      name: 'journalism-showcase-only',
      enforce: 'pre',
      resolveId(id) { if (id === 'showcase-news.css') return '\0showcase-news.css'; },
      load(id) {
        if (id !== '\0showcase-news.css') return;
        // Reuse the newspaper's actual CSS, without the hub layout, fonts or assets.
        const css = readFileSync(new URL('./app/globals.css', import.meta.url), 'utf8');
        const start = css.indexOf('.football-press {');
        const end = css.indexOf('/* Navigation stays tucked away;', start);
        if (start < 0 || end < 0) throw new Error('Newspaper CSS boundaries changed; review showcase extraction.');
        return css.slice(start, end)
          .replace(/\bmain\s*\{[^}]*\}/g, '')
          .replace(/\bnav\s*\{[^}]*\}/g, '')
          .replace(/max-width: 700px/g, 'max-width: 460px');
      },
      transform(source, id) {
        if (id === `${hub}data/learning-history.ts`) {
          // Export only the real article array. Resolve its two borrowed excerpts at
          // build time so prediction records, photos and lesson history never ship.
          const ast = ts.createSourceFile(id, source, ts.ScriptTarget.Latest, true);
          const declarations = ast.statements.flatMap(statement => ts.isVariableStatement(statement) ? [...statement.declarationList.declarations] : []);
          const findArray = (name: string) => {
            const value = declarations.find(declaration => declaration.name.getText(ast) === name)?.initializer;
            if (!value || !ts.isArrayLiteralExpression(value)) throw new Error(`Review article source: ${name} must be an array.`);
            return value;
          };
          const calls = findArray('historicalCalls');
          const articles = findArray('archiveWriting').getText(ast).replace(/historicalCalls\[(\d+)\]\.excerpt/g, (_match, index) => {
            const call = calls.elements[Number(index)];
            const excerpt = ts.isObjectLiteralExpression(call) && call.properties.find(property => ts.isPropertyAssignment(property) && property.name.getText(ast) === 'excerpt');
            if (!excerpt || !ts.isPropertyAssignment(excerpt) || !ts.isStringLiteralLike(excerpt.initializer)) throw new Error('Review borrowed article excerpt.');
            return JSON.stringify(excerpt.initializer.text);
          });
          return anonymise(`export const archiveWriting = ${articles};`);
        }
        if (id === `${hub}components/journalism-library.tsx`) {
          source = source.replace("import { BrandIdentity } from './brand-mark';", 'const BrandIdentity = (_props: { className?: string }) => null;');
          source = source.replace(/\{detail.section === 'Match previews' && \([\s\S]*?\n\s*\)\}/, '');
        }
        if (id.startsWith(hub) && !id.includes('/node_modules/') && /\.[jt]sx?$/.test(id)) return anonymise(source);
      },
    },
    react(),
  ],
  resolve: { alias: { '@': hub } },
  build: {
    outDir: process.env.SHOWCASE_OUT_DIR || '../showcase-dist',
    emptyOutDir: false,
    sourcemap: false,
    // No runtime module-preload fetch polyfill: this is a self-contained reader.
    modulePreload: false,
  },
});
