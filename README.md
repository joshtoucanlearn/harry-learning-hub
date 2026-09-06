# Harry’s Learning Hub

A learning space with two distinct areas:

- **Review:** Maths and English recall cards, questions, worked feedback, retries and saved progress.
- **Football desk:** score/event predictions, reasoning, actual-result comparison, probability activities and sports writing.

A Home view connects the two. Teacher provides lesson prompts, notes, printable records and JSON backups.

## Run locally

Use Node.js 22.13+ and pnpm. On the original Mac, `Start Learning Hub.command` also recognises the existing bundled runtime.

```sh
pnpm install
pnpm dev --host 127.0.0.1 --port 3000 --strictPort
```

Open http://localhost:3000/ and keep the terminal open. Stop with Ctrl+C.

## Review content

The initial six topics are percentages/discounts, reverse percentages, fractions/missing wholes, PEEL paragraphs, thesis/essay shape and objective literary analysis. The topics were adapted from existing fractions/percentages and English Literature preparation lessons. The public content is newly worded instructional material, not learner records or copied student responses. Arithmetic was checked; the reverse-percentage TV example is **£120 ÷ 0.75 = £160**.

Edit **`data/review-topics.ts`** to add or amend content. Each topic has a subject, title, source lesson label, summary, recall cards and questions. Each question has stable `id`, `prompt`, `choices`, zero-based `answer` index and `explanation`. If a question’s meaning changes, give it a new ID so older progress is not misrepresented. Keep source labels general and do not add private Drive links or learner details.

Review saves each question’s attempt count and most recent correctness. “Correct on latest checks” is a learning indicator, not an exam grade or a claim of long-term mastery. The retry flow targets questions not yet correct. Older backups without review progress remain supported.

## Football lesson loop

1. Enter two teams, optionally an upcoming kickoff, predicted 90-minute score and up to three checkable events. Choose Harry or Josh, add confidence in the outcome and explain the evidence.
2. Lock the prediction. Its score, events and reasoning stay unchanged.
3. After the match, open it from the notebook, enter the actual result and mark each event Yes, No, Not checked or Void. Exclude extra time and shoot-outs.
4. Compare and reflect. Exact score earns 3 points; otherwise correct win/draw/loss earns 1; otherwise 0. Each checked event earns 1 if correct. Pending/void events are excluded from the denominator. Pending events make totals provisional.
5. Stats separates exact scores, outcomes and events. Pundit desk keeps first draft and revision side by side. Save writing before switching sections; unsaved drafts are not retained.

## Data and access

The hosted app is publicly accessible, but entered work stays in that browser’s localStorage. No account, cloud database, live sports API, analytics or paid service is required. No learner data is shipped in the repository or site. Teacher is a working view, not a password-protected role.

The website remains available when the development computer is off. **Saved work does not sync between browsers or devices.** Use Teacher → Export backup after lessons. Import validates a backup and asks before replacing existing work, including review progress. Backups can include personal writing and teaching notes; keep them private.

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

Browser tests require Playwright and Chrome. Install Playwright separately or set `PLAYWRIGHT_MODULE` to an existing Playwright module. Set `HUB_URL` to test a hosted instance. Tests use isolated browser contexts and synthetic data, leaving the actual notebook untouched.

```sh
mkdir -p qa
node tests/hub-browser.mjs
node tests/browser.mjs
node tests/recovery.mjs
```

QA output and downloaded backups are excluded from Git. The optional read-only WebMCP history tool is feature-detected; native WebMCP was unavailable in the test browser and is not required for normal use.
