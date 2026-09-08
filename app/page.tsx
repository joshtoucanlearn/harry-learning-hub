'use client';
import { useEffect, useRef, useState } from 'react';
import { BrandIdentity } from '@/components/brand-mark';
import { GalaxySky } from '@/components/galaxy-sky';
import { JournalismLibrary } from '@/components/journalism-library';
import { LearningArchive } from '@/components/learning-archive';
import { LearningHome, ReviewHub } from '@/components/review-hub';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import {
  ArrowUpRight,
  Menu,
  Target,
  PenLine,
  ChartNoAxesCombined,
  SlidersHorizontal,
  Plus,
  Check,
  LockKeyhole,
  Download,
  Upload,
  ChevronRight,
  BookOpen,
} from 'lucide-react';
import {
  assess,
  stats,
  rate,
  parseBackup,
  EMPTY,
  STORAGE_KEY,
  type Data,
  type Prediction,
  type EventCall,
} from '@/lib/football';
const tabs = [
  { name: 'Home', icon: BookOpen },
  { name: 'The Record', icon: BookOpen },
  { name: 'Football Journalism', icon: PenLine },
  { name: 'Review', icon: BookOpen },
  { name: 'Stats lab', icon: ChartNoAxesCombined },
  { name: 'Teacher', icon: SlidersHorizontal },
  { name: 'Matchday', icon: Target },
] as const;
type Tab = (typeof tabs)[number]['name'];
const tabRoutes: Record<Tab, string> = {
  Home: 'home',
  Review: 'review',
  Matchday: 'matchday',
  'Football Journalism': 'football',
  'The Record': 'record',
  'Stats lab': 'stats',
  Teacher: 'teacher',
};
const dateLabel = (s: string) =>
  new Date(s).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
function Action({ children, ...props }: React.ComponentProps<typeof Button>) {
  return (
    <Button {...props} className={`action ${props.className || ''}`}>
      {children}
    </Button>
  );
}
export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [reviewTopic, setReviewTopic] = useState<string | undefined>();
  const [articleId, setArticleId] = useState<string | null>(null);
  const [tab, setTab] = useState<Tab>('Home');
  const [data, setData] = useState<Data>(EMPTY);
  const [ready, setReady] = useState(false);
  const [storageBlocked, setStorageBlocked] = useState(false);
  const [message, setMessage] = useState('');
  const [filter, setFilter] = useState('All');
  const [selection, setSelection] = useState<string | null>(null);
  const [backup, setBackup] = useState<Data | null>(null);
  const importRef = useRef<HTMLInputElement>(null);
  const live = useRef(data);
  live.current = data;
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setData(parseBackup(raw));
    } catch {
      setStorageBlocked(true);
      setMessage(
        'Saved data could not be read. Open Teacher to export the unreadable data or restore a valid backup. Existing data has been preserved.',
      );
    }
    setReady(true);
  }, []);
  useEffect(() => {
    function followLocation(event?: HashChangeEvent) {
      const [route, story] = window.location.hash.slice(1).split('/');
      const destination =
        tabs.find((t) => tabRoutes[t.name] === route)?.name || 'Home';
      setTab(destination);
      setArticleId(
        destination === 'Football Journalism' ? story || null : null,
      );
      if (event) setMessage('');
      window.scrollTo({ top: 0 });
    }
    followLocation();
    window.addEventListener('hashchange', followLocation);
    return () => window.removeEventListener('hashchange', followLocation);
  }, []);
  function commit(next: Data) {
    try {
      if (storageBlocked) throw Error();
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      setData(next);
      return true;
    } catch {
      setMessage(
        'Could not save. Browser storage may be blocked or full. Your previous saved work has not been replaced.',
      );
      return false;
    }
  }
  function update(p: Prediction) {
    return commit({
      ...data,
      predictions: data.predictions.map((x) => (x.id === p.id ? p : x)),
    });
  }
  useEffect(() => {
    const context = (document as any).modelContext;
    if (!context?.registerTool) return;
    const lifecycle = new AbortController();
    try {
      Promise.resolve(
        context.registerTool(
          {
            name: 'read_prediction_history',
            title: 'Read football prediction history',
            description:
              'Read the saved local prediction history and transparent accuracy totals.',
            inputSchema: {
              type: 'object',
              properties: {},
              additionalProperties: false,
            },
            annotations: { readOnlyHint: true, untrustedContentHint: true },
            execute(input: unknown) {
              if (
                !input ||
                typeof input !== 'object' ||
                Object.keys(input).length
              )
                throw Error('Pass an empty object.');
              return {
                predictions: live.current.predictions,
                stats: stats(live.current.predictions),
              };
            },
          },
          { signal: lifecycle.signal },
        ),
      ).catch(() => {});
    } catch {}
    return () => lifecycle.abort();
  }, []);
  function exportBackup() {
    const contents = storageBlocked
      ? localStorage.getItem(STORAGE_KEY) || ''
      : JSON.stringify(data, null, 2);
    const blob = new Blob([contents], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `football-desk-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    setMessage(
      'Backup downloaded. Keep it somewhere you can find next lesson.',
    );
  }
  const harryStats = stats(
    data.predictions.filter((p) => p.author === 'Harry'),
  );
  const selected = data.predictions.find((p) => p.id === selection);
  const switchTab = (t: Tab) => {
    setMenuOpen(false);
    setTab(t);
    setArticleId(null);
    window.location.hash = tabRoutes[t];
    if (t === 'Review') setReviewTopic(undefined);
    setMessage('');
    window.scrollTo({ top: 0 });
  };
  return (
    <>
      <GalaxySky />
      <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
        <SheetTrigger className="menu-toggle">
          <Menu size={18} /> Menu
        </SheetTrigger>
        <SheetContent
          side="left"
          className="menu-panel"
          aria-describedby={undefined}
        >
          <SheetHeader className="menu-heading">
            <SheetTitle className="menu-brand">
              <BrandIdentity />
            </SheetTitle>
          </SheetHeader>
          <nav className="media-nav" aria-label="Main navigation">
            {tabs.map(({ name, icon: Icon }) => (
              <button
                key={name}
                aria-current={tab === name ? 'page' : undefined}
                className={tab === name ? 'active' : ''}
                onClick={() => switchTab(name)}
              >
                <Icon size={18} />
                {name}
              </button>
            ))}
          </nav>
        </SheetContent>
      </Sheet>
      <main>
        <div className="status" role="status" aria-live="polite">
          {message}
        </div>
        {!ready ? (
          <p>Opening your desk…</p>
        ) : (
          <>
            {tab === 'Home' && (
              <LearningHome progress={data.review || {}} go={switchTab} />
            )}
            {tab === 'Review' && (
              <ReviewHub
                key={reviewTopic || 'all'}
                initialTopic={reviewTopic}
                progress={data.review || {}}
                save={(review) => commit({ ...data, review })}
              />
            )}
            {tab === 'Matchday' && (
              <>
                <div className="page-heading">
                  <div>
                    <p className="eyebrow">MAKE YOUR CALL</p>
                    <h1>Matchday.</h1>
                  </div>
                  <span className="edition">01 / MATCHDAY</span>
                </div>
                <div className="workspace">
                  <div>
                    {selected ? (
                      <Review
                        key={selected.id}
                        prediction={selected}
                        update={update}
                        notify={setMessage}
                        close={() => setSelection(null)}
                      />
                    ) : (
                      <PredictionForm
                        onSave={(p) => {
                          if (
                            commit({
                              ...data,
                              predictions: [p, ...data.predictions],
                            })
                          ) {
                            setSelection(p.id);
                            setMessage(
                              'Prediction locked and saved. Return here after the match.',
                            );
                            return true;
                          }
                          return false;
                        }}
                      />
                    )}
                  </div>
                  <aside>
                    <div className="side-note">
                      <span className="eyebrow">THE POST-MATCH QUESTION</span>
                      <h2>
                        Good call.
                        <br />
                        Or good luck?
                      </h2>
                      <p>
                        A score tells you what happened. Your evidence helps
                        explain why.
                      </p>
                      <div className="rule" />
                      <p>
                        Make one clear claim per event. “Leeds score first” can
                        be checked. “Leeds play well” needs a clearer
                        definition.
                      </p>
                    </div>
                    <div className="mini-stats">
                      <h3>Harry’s record</h3>
                      <div className="stat-pair">
                        <div>
                          <strong>
                            {rate(harryStats.outcomes, harryStats.reviewed)}
                          </strong>
                          <span>correct outcomes</span>
                        </div>
                        <div>
                          <strong>{harryStats.reviewed}</strong>
                          <span>matches reviewed</span>
                        </div>
                      </div>
                      <p>
                        {harryStats.reviewed
                          ? 'Win, draw or loss — exact scores are tracked separately.'
                          : 'Your record starts after your first result.'}
                      </p>
                    </div>
                  </aside>
                </div>
                <section className="history">
                  <div className="section-heading">
                    <div>
                      <p className="eyebrow">YOUR CALLS, KEPT ON RECORD</p>
                      <h2>Your predictions</h2>
                    </div>
                    <div className="filters" aria-label="Filter predictions">
                      {['All', 'Awaiting result', 'Reviewed'].map((f) => (
                        <button
                          className={f === filter ? 'selected' : ''}
                          key={f}
                          aria-pressed={f === filter}
                          onClick={() => setFilter(f)}
                        >
                          {f}
                        </button>
                      ))}
                    </div>
                  </div>
                  {!data.predictions.length ? (
                    <div className="empty">
                      <BookOpen size={26} />
                      <div>
                        <h3>A fresh season of predictions.</h3>
                        <p>
                          Your saved calls will appear here, ready for the final
                          whistle.
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="match-list">
                      {data.predictions
                        .filter(
                          (p) =>
                            filter === 'All' ||
                            (filter === 'Reviewed' ? p.result : !p.result),
                        )
                        .map((p) => {
                          const a = assess(p);
                          return (
                            <button
                              className="match-row"
                              key={p.id}
                              onClick={() => {
                                setSelection(p.id);
                                window.scrollTo({ top: 0, behavior: 'smooth' });
                              }}
                            >
                              <span className="match-date">
                                {dateLabel(p.createdAt)}
                                <small>{p.author}</small>
                              </span>
                              <span className="match-name">
                                {p.home} <span>v</span> {p.away}
                                <small>
                                  {p.result
                                    ? `Final score ${p.result.home}–${p.result.away}`
                                    : '90 minutes + stoppage time'}
                                </small>
                              </span>
                              <span className="call-score">
                                {p.homeGoals}–{p.awayGoals}
                                <small>Your call</small>
                              </span>
                              <span
                                className={`pill ${p.result ? 'reviewed' : ''}`}
                              >
                                {p.result
                                  ? `${a.total}/${a.possible} pts${a.pending ? ' · events pending' : ''}`
                                  : 'Awaiting result'}
                              </span>
                              <ChevronRight size={18} />
                            </button>
                          );
                        })}
                      {!data.predictions.filter(
                        (p) =>
                          filter === 'All' ||
                          (filter === 'Reviewed' ? p.result : !p.result),
                      ).length && <p>No predictions in this view yet.</p>}
                    </div>
                  )}
                </section>
              </>
            )}
            {tab === 'Football Journalism' && (
              <JournalismLibrary articleId={articleId} />
            )}
            {tab === 'The Record' && (
              <LearningArchive
                notes={data.archiveNotes || {}}
                save={(archiveNotes) => commit({ ...data, archiveNotes })}
                review={(topic) => {
                  setReviewTopic(topic);
                  setTab('Review');
                  window.location.hash = 'review';
                  window.scrollTo({ top: 0 });
                }}
              />
            )}
            {tab === 'Stats lab' && <StatsLab predictions={data.predictions} />}
            {tab === 'Teacher' && (
              <>
                <div className="page-heading">
                  <div>
                    <p className="eyebrow">LESSON MODE</p>
                    <h1>Lesson desk.</h1>
                  </div>
                  <span className="edition">04 / TEACHER</span>
                </div>
                <div className="workspace">
                  <section className="panel">
                    <h2>One match, three lesson moments</h2>
                    <ol className="lesson-steps">
                      <li>
                        <strong>Before · 5–10 minutes</strong>
                        <p>
                          Harry makes a score call and up to three events. Ask
                          for one piece of evidence and one reason his
                          prediction might be wrong.
                        </p>
                      </li>
                      <li>
                        <strong>After · 5 minutes</strong>
                        <p>
                          Enter the 90-minute result and check each event.
                          Separate a correct result from a well-supported
                          argument.
                        </p>
                      </li>
                      <li>
                        <strong>Extend · 10 minutes</strong>
                        <p>
                          Turn one claim into a short article, or use his
                          accuracy fraction for a percentage question. Keep the
                          first draft before revising.
                        </p>
                      </li>
                    </ol>
                    <div className="button-row">
                      <Action onClick={() => switchTab('Matchday')}>
                        Open matchday <ArrowUpRight size={18} />
                      </Action>
                      <button
                        className="plain-button"
                        onClick={() => switchTab('Football Journalism')}
                      >
                        Read Football Journalism
                      </button>
                    </div>
                  </section>
                  <aside className="panel">
                    <h2>Your saved work</h2>
                    <p>
                      Saved on this browser at this address. It does not sync
                      between devices. Export a backup before changing devices
                      or clearing browser data.
                    </p>
                    <div className="backup-actions">
                      <Action onClick={exportBackup}>
                        <Download size={18} />
                        Export backup
                      </Action>
                      <button
                        className="plain-button"
                        onClick={() => importRef.current?.click()}
                      >
                        <Upload size={18} />
                        Import backup
                      </button>
                      <button
                        className="plain-button"
                        onClick={() => window.print()}
                      >
                        Print lesson record
                      </button>
                    </div>
                    <input
                      ref={importRef}
                      hidden
                      type="file"
                      accept="application/json,.json"
                      aria-label="Import backup file"
                      onChange={async (e) => {
                        const file = e.target.files?.[0];
                        e.target.value = '';
                        if (!file) return;
                        try {
                          if (file.size > 5000000)
                            throw Error('Choose a backup under 5 MB.');
                          setBackup(parseBackup(await file.text()));
                        } catch (error) {
                          setMessage(
                            error instanceof Error
                              ? error.message
                              : 'Could not read this backup.',
                          );
                        }
                      }}
                    />
                    {backup && (
                      <div className="restore-box">
                        <h3>Restore this backup?</h3>
                        <p>
                          {backup.predictions.length} predictions and{' '}
                          {backup.articles.length} articles. This replaces the
                          current saved work, including review progress. Export
                          your current work first if you want to keep it.
                        </p>
                        <button
                          className="plain-button"
                          onClick={() => {
                            try {
                              localStorage.setItem(
                                STORAGE_KEY,
                                JSON.stringify(backup),
                              );
                              setData(backup);
                              setStorageBlocked(false);
                              setBackup(null);
                              setSelection(null);
                              setMessage('Backup restored.');
                            } catch {
                              setMessage(
                                'Could not restore: browser storage is blocked or full.',
                              );
                            }
                          }}
                        >
                          Replace saved work with backup
                        </button>
                        <button
                          className="plain-button"
                          onClick={() => setBackup(null)}
                        >
                          Cancel import
                        </button>
                      </div>
                    )}
                  </aside>
                </div>
                <section className="history">
                  <h2>Lesson evidence</h2>
                  {!data.predictions.length ? (
                    <p>
                      Saved predictions will appear here with reasoning,
                      reflections and your notes.
                    </p>
                  ) : (
                    data.predictions.map((p) => (
                      <TeacherRecord
                        key={p.id}
                        p={p}
                        save={update}
                        notify={setMessage}
                      />
                    ))
                  )}
                  {data.articles.map((a) => (
                    <article className="panel teacher-record" key={a.id}>
                      <h3>{a.title}</h3>
                      <p className="meta">
                        {a.kind} · {dateLabel(a.savedAt)}
                      </p>
                      <div className="two-col">
                        <div>
                          <h4>First draft</h4>
                          <p className="preserve">{a.original}</p>
                        </div>
                        <div>
                          <h4>Revision</h4>
                          <p className="preserve">
                            {a.revision || 'No revision yet.'}
                          </p>
                        </div>
                      </div>
                    </article>
                  ))}
                </section>
              </>
            )}
          </>
        )}
      </main>
      <footer>
        Harry Baker MEDIA{' '}
        <span>Saved on this browser. Your desk, your calls.</span>
      </footer>
    </>
  );
}
function PredictionForm({ onSave }: { onSave: (p: Prediction) => boolean }) {
  const [home, setHome] = useState('');
  const [away, setAway] = useState('');
  const [confidence, setConfidence] = useState(60);
  const [events, setEvents] = useState(['']);
  const [error, setError] = useState('');
  return (
    <section className="panel">
      <div className="section-heading">
        <h2>Next on your radar</h2>
        <span className="badge">NEW PREDICTION</span>
      </div>
      <p>Choose the match. Call the score. Back yourself with evidence.</p>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const f = new FormData(e.currentTarget);
          if (home.trim().toLowerCase() === away.trim().toLowerCase()) {
            setError('Choose two different teams.');
            return;
          }
          const kickoff = String(f.get('kickoff'));
          if (kickoff && new Date(kickoff).getTime() <= Date.now()) {
            setError(
              'Choose an upcoming kickoff, or leave it blank for a practice prediction.',
            );
            return;
          }
          const reasoning = String(f.get('reasoning')).trim();
          if (!reasoning) {
            setError('Add a reason for your prediction.');
            return;
          }
          onSave({
            id: crypto.randomUUID(),
            home: home.trim(),
            away: away.trim(),
            kickoff,
            author: f.get('author') as 'Harry' | 'Josh',
            homeGoals: Number(f.get('homeGoals')),
            awayGoals: Number(f.get('awayGoals')),
            confidence,
            reasoning,
            events: events
              .map((text) => text.trim())
              .filter(Boolean)
              .map((text) => ({ text, actual: 'pending' })),
            createdAt: new Date().toISOString(),
            result: null,
            reflection: '',
            teacherNote: '',
          });
        }}
      >
        <div className="two-col">
          <label>
            Home team
            <input
              required
              maxLength={80}
              placeholder="e.g. Leeds"
              value={home}
              onChange={(e) => setHome(e.target.value)}
            />
          </label>
          <label>
            Away team
            <input
              required
              maxLength={80}
              placeholder="Enter opponent"
              value={away}
              onChange={(e) => setAway(e.target.value)}
            />
          </label>
        </div>
        <div className="two-col">
          <label>
            Kickoff{' '}
            <span className="optional">(optional · your local time)</span>
            <input name="kickoff" type="datetime-local" />
          </label>
          <label>
            Whose call?
            <select name="author">
              <option>Harry</option>
              <option>Josh</option>
            </select>
          </label>
        </div>
        <div className="score-board">
          <label>
            Home goals
            <input
              name="homeGoals"
              type="number"
              min="0"
              max="99"
              required
              defaultValue="2"
            />
          </label>
          <span aria-hidden="true">:</span>
          <label>
            Away goals
            <input
              name="awayGoals"
              type="number"
              min="0"
              max="99"
              required
              defaultValue="1"
            />
          </label>
        </div>
        <p className="hint">
          All scores use 90 minutes + stoppage time. Exclude extra time and
          shoot-outs.
        </p>
        <label>
          How sure are you about the win, draw or loss?{' '}
          <strong className="confidence">{confidence}%</strong>
          <input
            type="range"
            min="0"
            max="100"
            step="5"
            value={confidence}
            onChange={(e) => setConfidence(Number(e.target.value))}
          />
        </label>
        <div className="range-labels">
          <span>Long shot</span>
          <span>Very confident</span>
        </div>
        <div className="section-heading">
          <h3>Call the key events</h3>
          <span className="meta">Up to 3 · optional</span>
        </div>
        <p className="hint">
          Write an event you think will happen within 90 minutes, such as “Leeds
          score first” or “There is a penalty”.
        </p>
        {events.map((event, i) => (
          <label key={i}>
            Event {i + 1}
            <input
              maxLength={300}
              value={event}
              placeholder={
                i === 0 ? 'e.g. Leeds score first' : 'One checkable event'
              }
              onChange={(e) =>
                setEvents(events.map((v, n) => (n === i ? e.target.value : v)))
              }
            />
          </label>
        ))}
        {events.length < 3 && (
          <button
            type="button"
            className="plain-button compact"
            onClick={() => setEvents([...events, ''])}
          >
            <Plus size={16} />
            Add an event
          </button>
        )}
        <label className="top-space">
          What makes you think that?
          <textarea
            required
            name="reasoning"
            maxLength={5000}
            placeholder="I think… because… A piece of evidence is…"
          />
        </label>
        <details>
          <summary>Need a starting point?</summary>
          <p>
            What have you seen in recent matches? Who is available? What could
            the other team do to change the game? Separate something you know
            from something you suspect.
          </p>
        </details>
        {error && (
          <p role="alert" className="error">
            {error}
          </p>
        )}
        <Action type="submit">
          <LockKeyhole size={16} />
          Lock prediction <ArrowUpRight size={18} />
        </Action>
        <p className="hint last">
          Locking keeps your original call unchanged for an honest comparison.
        </p>
      </form>
    </section>
  );
}
function Review({
  prediction: p,
  update,
  notify,
  close,
}: {
  prediction: Prediction;
  update: (p: Prediction) => boolean;
  notify: (s: string) => void;
  close: () => void;
}) {
  const [eventResults, setEventResults] = useState(
    p.events.map((e) => e.actual),
  );
  const [reflection, setReflection] = useState(p.reflection);
  const a = assess(p);
  return (
    <section className="panel">
      <div className="section-heading">
        <span className="badge">
          {p.result ? 'MATCH REVIEW' : 'PREDICTION LOCKED'}
        </span>
        <button className="plain-button compact" onClick={close}>
          <Plus size={16} />
          New prediction
        </button>
      </div>
      <h2 className="match-title">
        {p.home} <span>v</span> {p.away}
      </h2>
      <p className="meta">
        {p.author} · locked {dateLabel(p.createdAt)}
        {p.kickoff
          ? ` · kickoff ${new Date(p.kickoff).toLocaleString('en-GB')}`
          : ' · kickoff not set'}
      </p>
      <div className="comparison">
        <div>
          <span>THE CALL</span>
          <strong>
            {p.homeGoals}–{p.awayGoals}
          </strong>
          <small>{p.confidence}% sure of the outcome</small>
        </div>
        <div>
          <span>THE RESULT</span>
          <strong>
            {p.result ? `${p.result.home}–${p.result.away}` : '–'}
          </strong>
          <small>90 minutes + stoppage time</small>
        </div>
      </div>
      <h3>The reasoning</h3>
      <p className="preserve">{p.reasoning}</p>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const f = new FormData(e.currentTarget);
          if (
            update({
              ...p,
              events: p.events.map((ev, i) => ({
                ...ev,
                actual: eventResults[i],
              })),
              result: {
                home: Number(f.get('actualHome')),
                away: Number(f.get('actualAway')),
                source: String(f.get('source')).trim(),
                enteredAt: new Date().toISOString(),
              },
            })
          )
            notify('Result saved. Your comparison is updated.');
        }}
      >
        <div className="section-heading top-space">
          <h3>{p.result ? 'Update the result' : 'After the final whistle'}</h3>
          <span className="meta">Manual result entry</span>
        </div>
        <div className="two-col">
          <label>
            Actual home goals
            <input
              name="actualHome"
              type="number"
              min="0"
              max="99"
              required
              defaultValue={p.result?.home ?? ''}
            />
          </label>
          <label>
            Actual away goals
            <input
              name="actualAway"
              type="number"
              min="0"
              max="99"
              required
              defaultValue={p.result?.away ?? ''}
            />
          </label>
        </div>
        <label>
          Result source or match note{' '}
          <span className="optional">(optional)</span>
          <input
            name="source"
            maxLength={500}
            defaultValue={p.result?.source ?? ''}
            placeholder="e.g. BBC Sport match report, or watched the match"
          />
        </label>
        {p.events.length > 0 && (
          <>
            <h3>Did each event happen?</h3>
            <p className="hint">
              “Not checked” stays pending. “Void” is excluded, for example an
              abandoned match event.
            </p>
            {p.events.map((event, i) => (
              <label key={i} className="event-result">
                <span>{event.text}</span>
                <select
                  aria-label={`Result for event ${i + 1}`}
                  value={eventResults[i]}
                  onChange={(e) =>
                    setEventResults(
                      eventResults.map((v, n) =>
                        i === n ? (e.target.value as EventCall['actual']) : v,
                      ),
                    )
                  }
                >
                  <option value="pending">Not checked</option>
                  <option value="yes">Yes · correct</option>
                  <option value="no">No · missed</option>
                  <option value="void">Void · exclude</option>
                </select>
              </label>
            ))}
          </>
        )}
        <Action type="submit">
          <Check size={18} />
          {p.result ? 'Update result' : 'Save result & compare'}
        </Action>
      </form>
      {p.result && (
        <div className="breakdown">
          <div className="section-heading">
            <h3>Your accuracy breakdown</h3>
            <strong>
              {a.total} / {a.possible} points
            </strong>
          </div>
          <ul>
            <li>
              <span>
                {a.exact
                  ? 'Exact score'
                  : a.correctOutcome
                    ? 'Correct outcome, different score'
                    : 'Different outcome'}
              </span>
              <b>{a.scorePoints} / 3</b>
            </li>
            <li>
              <span>
                Events checked · {a.eventHits} correct of {a.eventCount}
              </span>
              <b>
                {a.eventHits} / {a.eventCount}
              </b>
            </li>
          </ul>
          {a.pending > 0 && (
            <p className="hint">
              {a.pending} event(s) still unchecked — points are provisional.
            </p>
          )}
          <details>
            <summary>How are points calculated?</summary>
            <p>
              3 points for the exact score; otherwise 1 for the correct win,
              draw or loss; otherwise 0. Each checked event earns 1 if correct
              and 0 if missed. Unchecked and void events are excluded. These are
              game points, not a percentage measure of your writing or
              reasoning.
            </p>
          </details>
        </div>
      )}
      <form
        className="top-space"
        onSubmit={(e) => {
          e.preventDefault();
          if (update({ ...p, reflection })) notify('Reflection saved.');
        }}
      >
        <label>
          What will you take into the next match?
          <textarea
            value={reflection}
            onChange={(e) => setReflection(e.target.value)}
            maxLength={5000}
            placeholder="The evidence that helped was… I overlooked… Next time I’ll…"
          />
        </label>
        <button className="plain-button" type="submit">
          Save reflection
        </button>
      </form>
    </section>
  );
}
function StatsLab({ predictions }: { predictions: Prediction[] }) {
  const [author, setAuthor] = useState<'Harry' | 'Josh'>('Harry');
  const [answer, setAnswer] = useState('');
  const [feedback, setFeedback] = useState('');
  const s = stats(predictions.filter((p) => p.author === author));
  const reviewed = predictions.filter((p) => p.author === author && p.result);
  const [chance, setChance] = useState(60);
  return (
    <>
      <div className="page-heading">
        <div>
          <p className="eyebrow">TURN YOUR CALLS INTO NUMBERS</p>
          <h1>The stats lab.</h1>
        </div>
        <span className="edition">03 / THE NUMBERS</span>
      </div>
      <div className="filters stat-filter">
        {(['Harry', 'Josh'] as const).map((name) => (
          <button
            key={name}
            aria-pressed={name === author}
            className={name === author ? 'selected' : ''}
            onClick={() => setAuthor(name)}
          >
            {name}
          </button>
        ))}
      </div>
      <div className="stat-grid">
        <Stat
          title="Exact score"
          value={rate(s.exact, s.reviewed)}
          detail={`${s.exact} of ${s.reviewed} reviewed matches`}
        />
        <Stat
          title="Correct outcome"
          value={rate(s.outcomes, s.reviewed)}
          detail={`${s.outcomes} of ${s.reviewed} · win / draw / loss`}
        />
        <Stat
          title="Events called"
          value={rate(s.eventHits, s.eventCount)}
          detail={`${s.eventHits} of ${s.eventCount} checked events`}
        />
      </div>
      <p className="hint">
        Only entered results count. Unchecked and void events are excluded. A
        small sample can swing quickly.
      </p>
      <div className="workspace">
        <section className="panel">
          <h2>Confidence meets reality</h2>
          <p>
            When you felt more certain, did you get the outcome right more
            often?
          </p>
          {reviewed.length ? (
            <div className="confidence-table">
              {[
                [0, 39, '0–39%'],
                [40, 69, '40–69%'],
                [70, 100, '70–100%'],
              ].map(([low, high, label]) => {
                const group = reviewed.filter(
                  (p) =>
                    p.confidence >= Number(low) && p.confidence <= Number(high),
                );
                const correct = group.filter(
                  (p) => assess(p).correctOutcome,
                ).length;
                return (
                  <div key={label}>
                    <span>{label} confident</span>
                    <div className="bar">
                      <i
                        style={{
                          width: group.length
                            ? `${(correct / group.length) * 100}%`
                            : '0%',
                        }}
                      />
                    </div>
                    <b>{rate(correct, group.length)}</b>
                    <small>
                      {correct}/{group.length} correct
                    </small>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="empty">
              <Target />
              <p>Review a match to start comparing confidence with outcomes.</p>
            </div>
          )}
          <details>
            <summary>What does a 60% prediction mean?</summary>
            <p>
              Across many similar predictions at 60% confidence, you would
              expect about 6 in 10 to be correct if your confidence is well
              judged. One wrong call does not make 60% unreasonable.
            </p>
          </details>
        </section>
        <aside className="side-note">
          <span className="eyebrow">QUICK CHALLENGE · PRACTICE NUMBERS</span>
          <h2>
            6 right.
            <br />
            10 predictions.
          </h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setFeedback(
                Number(answer) === 60
                  ? 'Correct: 6 ÷ 10 × 100 = 60%.'
                  : 'Try dividing 6 by 10, then multiply by 100.',
              );
            }}
          >
            <label>
              What percentage were correct?
              <input
                required
                type="number"
                min="0"
                max="100"
                step="any"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                placeholder="Your answer (%)"
              />
            </label>
            <Action type="submit">Check answer</Action>
            <p role="status">{feedback}</p>
          </form>
        </aside>
      </div>
      <section className="panel top-space">
        <h2>Probability playground</h2>
        <p>
          A prediction is a degree of confidence, not a promise. Move the slider
          and connect the percentage to a frequency.
        </p>
        <label>
          Chance of an event: {chance}%
          <input
            type="range"
            min="0"
            max="100"
            step="10"
            value={chance}
            onChange={(e) => setChance(Number(e.target.value))}
          />
        </label>
        <div className="probability-dots" aria-hidden="true">
          {Array.from({ length: 10 }, (_, i) => (
            <span key={i} className={i < chance / 10 ? 'filled' : ''} />
          ))}
        </div>
        <p>
          <strong>
            {chance}% = {chance / 10} in 10
          </strong>{' '}
          over many similar situations, on average.{' '}
          {chance > 0 && chance < 100
            ? `Odds in favour are ${chance}:${100 - chance} (before simplifying).`
            : chance === 0
              ? '0% means impossible in this model.'
              : '100% means certain in this model.'}
        </p>
        <p className="hint">
          Discussion: what evidence would move your estimate up or down? These
          are probability odds, with no betting or money involved.
        </p>
      </section>
      {reviewed.length > 0 && (
        <section className="panel top-space">
          <h2>Results over time</h2>
          <div className="timeline">
            {[...reviewed].reverse().map((p) => (
              <div key={p.id}>
                <span>
                  {dateLabel(p.createdAt)} · {p.home} v {p.away}
                </span>
                <b>
                  {assess(p).exact
                    ? 'Exact score'
                    : assess(p).correctOutcome
                      ? 'Correct outcome'
                      : 'Missed outcome'}
                </b>
              </div>
            ))}
          </div>
        </section>
      )}
    </>
  );
}
function Stat({
  title,
  value,
  detail,
}: {
  title: string;
  value: string;
  detail: string;
}) {
  return (
    <div className="stat-card">
      <span>{title}</span>
      <strong>{value}</strong>
      <small>{detail}</small>
    </div>
  );
}
function TeacherRecord({
  p,
  save,
  notify,
}: {
  p: Prediction;
  save: (p: Prediction) => boolean;
  notify: (s: string) => void;
}) {
  const [note, setNote] = useState(p.teacherNote);
  return (
    <article className="panel teacher-record">
      <div className="section-heading">
        <h3>
          {p.home} v {p.away}
        </h3>
        <span className="meta">
          {p.author} · {dateLabel(p.createdAt)}
        </span>
      </div>
      <p className="meta">
        Call {p.homeGoals}–{p.awayGoals} ·{' '}
        {p.result
          ? `Result ${p.result.home}–${p.result.away} · ${assess(p).total}/${assess(p).possible} points`
          : 'Awaiting result'}
      </p>
      <div className="two-col">
        <div>
          <h4>Reasoning</h4>
          <p className="preserve">{p.reasoning}</p>
        </div>
        <div>
          <h4>Reflection</h4>
          <p className="preserve">{p.reflection || 'Not yet added.'}</p>
        </div>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (save({ ...p, teacherNote: note })) notify('Teacher note saved.');
        }}
      >
        <label>
          Teaching note
          <textarea
            maxLength={5000}
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Evidence used independently… Prompt needed… Next step…"
          />
        </label>
        <button className="plain-button" type="submit">
          Save teaching note
        </button>
      </form>
    </article>
  );
}
