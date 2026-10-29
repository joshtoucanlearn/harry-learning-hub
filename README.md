# Harry Baker MEDIA

Harry’s football and learning workspace:

- **Review:** Maths recall cards, questions, worked feedback, retries and saved progress.
- **Matchday:** score/event predictions, reasoning, actual-result comparison and statistics.
- **Football Journalism:** a newspaper-style football page with its original illustrated Hydration lead, ten full pieces and plans, topic filters and individual article links. The October final version of The Battering of the Geordies is in Match reports.
- **The Record:** six historical calls, separate result-evidence/reflection notes, and 26 lesson entries from Josh and Aaron.

Home is a simple welcome with the combined crest and wordmark. The Menu opens each activity. Teacher provides lesson prompts, notes, printable records and JSON backups.

## Run locally

Use Node.js 22.13+ and pnpm. On the original Mac, `Start Learning Hub.command` also recognises the existing bundled runtime.

```sh
pnpm install
pnpm dev --host 127.0.0.1 --port 3000 --strictPort
```

Open http://localhost:3000/ and keep the terminal open. Stop with Ctrl+C.

## Review content

There are 12 maths topics and 36 questions: percentages/discounts, reverse percentages, fractions, units, decimal order, arithmetic, speed/time, probability, averages, sequences, expressions/multiples and Pythagoras. The English review activities were removed at the user’s request. Existing backup records remain compatible; retired question progress is ignored in displayed totals. Recall questions and explanations are newly authored from documented topics, rather than represented as Harry’s past answers. The reverse-percentage TV example is **£120 ÷ 0.75 = £160**, and the eleven-player rating set has median **7**, not 7.5.

`data/learning-history.ts` contains full classroom pieces and plans, with original wording, spelling, punctuation and honest credits. The 29 October source audit checked the named Drive documents and decks. Norway and France include every learner answer section, the World Cup prediction includes the full paragraph, and the October final match report supersedes Aaron's September draft. The original Hydration text stays exactly as the owner approved it, excluding tutor-only wording. Joint work retains its shared credit; Josh's separate prediction stays credited to Josh. `tests/fixtures/writing-audit.json` pins the audited text and paragraph counts against future truncation. Private source documents, report details and source links remain outside this repository.

Edit **`data/review-topics.ts`** and **`data/recovered-topics.ts`** to add or amend content. Each topic has a subject, title, source lesson label, summary, recall cards and questions. Each question has stable `id`, `prompt`, `choices`, zero-based `answer` index and `explanation`. If a question’s meaning changes, give it a new ID so older progress is not misrepresented. Keep source labels general and do not add private Drive links or learner details.

Review saves each question’s attempt count and most recent correctness. “Correct on latest checks” is a learning indicator, not an exam grade or a claim of long-term mastery. The retry flow targets questions not yet correct. Older backups without review progress remain supported.

## Football lesson loop

1. Enter two teams, optionally an upcoming kickoff, predicted 90-minute score and up to three checkable events. Choose Harry or Josh, add confidence in the outcome and explain the evidence.
2. Lock the prediction. Its score, events and reasoning stay unchanged.
3. After the match, open it from Your predictions, enter the actual result and mark each event Yes, No, Not checked or Void. Exclude extra time and shoot-outs.
4. Compare and reflect. Exact score earns 3 points; otherwise correct win/draw/loss earns 1; otherwise 0. Each checked event earns 1 if correct. Pending/void events are excluded from the denominator. Pending events make totals provisional.
5. Stats separates exact scores, outcomes and events. Football Journalism is a reading section: full pieces, shared work and plans are labelled accurately. Article submission and revision forms were removed at the user’s request. Previously saved articles remain readable in Teacher and continue to round-trip in backups.

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

The Record replaces the old Notebook navigation. The whole interface uses a quiet midnight/slate palette, an editorial home layout and a tucked-away Menu drawer. The background ports FLAME’s actual dithered pixel-galaxy shader to WebGL 2, including its exact seeded noise texture. See `assets/GALAXY-SOURCE.md` for provenance.

Animation pauses with the **Pause sky** control, is off by default for reduced-motion preferences, and stops while the page is hidden. It is capped at 24 rendered frames per second, without multiplying resolution by device pixel ratio. A static render remains available when WebGL is unavailable or the context is lost. This preference has its own browser storage key and does not alter saved lessons or predictions.

Additional motion/fallback verification: `node tests/galaxy-browser.mjs`.

## Football pages and reading contrast

Football Journalism uses hash links such as `#football/leeds-newcastle` so individual stories support browser back/forward, reloads and direct links on GitHub Pages. The front page offers Opinion, Analysis, Match reports and Match previews. Headlines and decks are editorial labels around preserved source text; The Battering of the Geordies keeps its supplied final title and date line. Provenance notes distinguish full pieces, predictions, shared paragraphs and plans. No article-entry UI remains. To add a piece, update `data/learning-history.ts`, `data/news-art.ts`, the editorial metadata in `components/journalism-library.tsx` and the audited text fixture.

The original prominent galaxy remains visible across all pages, without an enclosing main panel. Individual reading cards protect contrast, with warm off-white text and amber actions. Every archive story has an original editorial illustration on its card and article page; prompts and provenance are recorded in `assets/NEWS-ART-SOURCE.md`. Hydration keeps its original artwork and lead position. The evolution article links to the analysed 1970 clip at 0:44 in a separate tab; no YouTube content is embedded or loaded by the newspaper.

### Toucan newspaper build and checks

From this repository, reuse the showcase wrapper, copy its compiled entry and assets, and reapply the website's embedded-focus guard. Keep the destination README and older generated assets:

```sh
bash ../website-codex-showcase/scripts/build-football-showcase.sh
cp ../website-codex-showcase/projects/football-journalism/index.html ../website-final-pass/projects/football-journalism/index.html
cp -R ../website-codex-showcase/projects/football-journalism/assets/. ../website-final-pass/projects/football-journalism/assets/
node ../website-final-pass/scripts/patch-newspaper-focus.mjs
SHOWCASE_SITE=../website-final-pass SHOWCASE_NEWSPAPER_ONLY=1 node ../website-codex-showcase/scripts/check-showcase-static.mjs
node ../website-final-pass/scripts/check-project-cells-static.mjs
SHOWCASE_BASE=HEAD node ../website-final-pass/tests/project-showcase-source.mjs
```

The newspaper-only option uses the shared name, CSP, relative-asset and reader checks. The final-pass checks cover that checkout's on-demand project frames and focus guard. `SHOWCASE_BASE=HEAD` compares unchanged website sections with the destination branch's existing version.

For browser QA, serve the destination in one terminal:

```sh
python3 -m http.server 4206 --bind 127.0.0.1 --directory ../website-final-pass
```

In another terminal, from this repository:

```sh
PLAYWRIGHT_MODULE=/Users/joshuagordonjones/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs node tests/newspaper-browser.mjs
```

This checks every article, compares complete paragraphs with the source, and captures 1440×750 and 390×844 in light and dark at device scale 1. Screenshots and results go to `qa/newspaper/`. The existing hub browser commands above also cover the preserved Hydration lead and report filter. Local server startup and Chrome launch were blocked by the sandbox during the October 2026 update, so browser screenshots still need Claude's review. Repo-wide lint reports 54 existing errors; the changed data and new newspaper QA have no lint diagnostics.

Branding uses the Leeds-inspired pixel crest across the home page, football masthead, Menu drawer and favicon. Navigation is tucked into an accessible modal drawer. Final order: Home, The Record, Football Journalism, Review, Stats lab, Teacher, Matchday. The former full-width header is removed.

Home adds one short pixel shooting star every 14 seconds and very faint blue/teal hues in the darker sky. These effects are confined to Home, use the same capped shader clock and obey Pause sky, page visibility and reduced-motion preferences.

The Record places a verified match photograph at the top right of each historical prediction, with source credit and descriptive alternative text. The two Spain–France calls share one match image; the broader Leeds and England forecasts use the season finale and World Cup semifinal respectively. Photo provenance is recorded in `assets/matches/SOURCES.md`.

The default Pixel sky refracts its original midnight artwork with the same pointer swashes and expanding waves as Earth sky. It uses a WebGL image texture rather than drawing rings over a still. If WebGL is unavailable or lost, a low-resolution software renderer also displaces the image itself. The preset, palette controls, calm mode and reduced-motion behaviour remain shared. Regression check: `node --experimental-strip-types tests/sky-waves.mjs`.
