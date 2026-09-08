# Harry Hub

Harry’s football and learning workspace:

- **Review:** Maths recall cards, questions, worked feedback, retries and saved progress.
- **Matchday:** score/event predictions, reasoning, actual-result comparison and statistics.
- **Football Journalism:** four briefs, original/revised drafts, reading comparison, seven recovered pieces and match-report handoffs.
- **The Record:** six historical calls, separate result-evidence/reflection notes, and 26 lesson entries from Josh and Aaron.

An editorial Home view connects these activities. Teacher provides lesson prompts, notes, printable records and JSON backups.

## Run locally

Use Node.js 22.13+ and pnpm. On the original Mac, `Start Learning Hub.command` also recognises the existing bundled runtime.

```sh
pnpm install
pnpm dev --host 127.0.0.1 --port 3000 --strictPort
```

Open http://localhost:3000/ and keep the terminal open. Stop with Ctrl+C.

## Review content

There are 12 maths topics and 36 questions: percentages/discounts, reverse percentages, fractions, units, decimal order, arithmetic, speed/time, probability, averages, sequences, expressions/multiples and Pythagoras. The English review activities were removed at the user’s request. Existing backup records remain compatible; retired question progress is ignored in displayed totals. Recall questions and explanations are newly authored from documented topics, rather than represented as Harry’s past answers. The reverse-percentage TV example is **£120 ÷ 0.75 = £160**, and the eleven-player rating set has median **7**, not 7.5.

`data/learning-history.ts` contains selected original classroom excerpts and explicitly labelled summaries. Source titles, lesson dates, attribution and tutoring support accompany them. Full documents, tutor reports, private identifiers and source links stay in a separate local research collection, outside this repository. An inaccessible early shared deck remains a documented gap.

Edit **`data/review-topics.ts`** and **`data/recovered-topics.ts`** to add or amend content. Each topic has a subject, title, source lesson label, summary, recall cards and questions. Each question has stable `id`, `prompt`, `choices`, zero-based `answer` index and `explanation`. If a question’s meaning changes, give it a new ID so older progress is not misrepresented. Keep source labels general and do not add private Drive links or learner details.

Review saves each question’s attempt count and most recent correctness. “Correct on latest checks” is a learning indicator, not an exam grade or a claim of long-term mastery. The retry flow targets questions not yet correct. Older backups without review progress remain supported.

## Football lesson loop

1. Enter two teams, optionally an upcoming kickoff, predicted 90-minute score and up to three checkable events. Choose Harry or Josh, add confidence in the outcome and explain the evidence.
2. Lock the prediction. Its score, events and reasoning stay unchanged.
3. After the match, open it from Your predictions, enter the actual result and mark each event Yes, No, Not checked or Void. Exclude extra time and shoot-outs.
4. Compare and reflect. Exact score earns 3 points; otherwise correct win/draw/loss earns 1; otherwise 0. Each checked event earns 1 if correct. Pending/void events are excluded from the denominator. Pending events make totals provisional.
5. Stats separates exact scores, outcomes and events. Football Journalism keeps first draft and revision for comparison. A Matchday review or historical call can supply reporting notes without inventing an article. Unsaved editor text survives ordinary section navigation, but save before reloading, starting another piece or leaving the site.

Historical calls preserve their original classroom wording and now carry independently checked match dates, final scores, regulation/extra-time distinctions, event verdicts and external result citations. They do not receive invented lock times or confidence levels. England–Norway ended 1–1 at 90 minutes and 2–1 to England after extra time; Spain beat France 2–0; Argentina beat England 2–1. Leeds’ completed 2025/26 position is shown with the original target-season ambiguity. Archive result evidence and reflections persist locally and export in backups, but do not affect Matchday statistics. Josh’s Spain–France model remains credited to Josh.

## Data and access

The hosted app is publicly accessible, but entered work stays in that browser’s localStorage. No account, cloud database, live sports API, analytics or paid service is required. Only the selected historical work and general lesson trail are shipped publicly. Raw reports, contact details, other learners’ records and new browser-entered work are not included. Teacher is a working view, not a password-protected role.

The website remains available when the development computer is off. **Saved work does not sync between browsers or devices.** Use Teacher → Export backup after lessons. Import validates a backup and asks before replacing existing work, including review progress and archive notes. Backups can include personal writing and teaching notes; keep them private.

Localhost and the hosted site have separate browser storage. To move existing local work, export from the local app and import on the hosted site. The storage key remains `harry-football-desk-v1` for compatibility. Corrupt stored data is preserved and can be exported before restoring a valid backup.

## GitHub Pages

`vite.pages.config.ts` creates a static React build at `/harry-learning-hub/` in `pages-dist`. This uses the same components and styles as the local app and does not require a server. The static branch is `gh-pages`, with `.nojekyll` and a `source-commit.txt` identifying its source commit. GitHub Pages publishes the root of that branch.

To publish an authorised update after committing the source:

```sh
./scripts/publish-pages.sh
```

The script runs tests, type checks and the Pages build, then pushes only static files to `gh-pages`, preserving deployment history. It does not publish backups, screenshots, node_modules or server output. Source code remains on `main`.

## Checks

```sh
pnpm test
pnpm typecheck
pnpm build:pages
pnpm preview:pages --port 4173 --strictPort
```

The preview URL is http://127.0.0.1:4173/harry-learning-hub/.

Browser tests require Playwright and Chrome. Install Playwright separately or set `PLAYWRIGHT_MODULE` to an existing Playwright module. Set `HUB_URL` to test a hosted instance. Tests use isolated browser contexts and synthetic data, leaving the actual saved work untouched.

```sh
mkdir -p qa
node tests/hub-browser.mjs
node tests/browser.mjs
node tests/recovery.mjs
node tests/archive-browser.mjs
```

QA output and downloaded backups are excluded from Git. The optional read-only WebMCP history tool is feature-detected; native WebMCP was unavailable in the test browser and is not required for normal use.

## Galaxy redesign

The Record replaces the old Notebook navigation. The whole interface uses a quiet midnight/slate palette, an editorial home layout and desktop side navigation. The background ports FLAME’s actual dithered pixel-galaxy shader to WebGL 2, including its exact seeded noise texture. See `assets/GALAXY-SOURCE.md` for provenance.

Animation pauses with the **Pause sky** control, is off by default for reduced-motion preferences, and stops while the page is hidden. It is capped at 24 rendered frames per second, without multiplying resolution by device pixel ratio. A static render remains available when WebGL is unavailable or the context is lost. This preference has its own browser storage key and does not alter saved lessons or predictions.

Additional motion/fallback verification: `node tests/galaxy-browser.mjs`.
