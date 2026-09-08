'use client';
import { useState } from 'react';
import {
  historicalCalls,
  lessons,
  type HistoricalCall,
} from '@/data/learning-history';
export type ArchiveNotes = Record<
  string,
  { result: string; reflection: string }
>;
export function LearningArchive({
  notes,
  save,
  review,
}: {
  notes: ArchiveNotes;
  save: (notes: ArchiveNotes) => boolean;
  review: (topic: string) => void;
}) {
  const [view, setView] = useState('Predictions');
  const [tutor, setTutor] = useState('Everyone');
  return (
    <>
      <div className="page-heading">
        <div>
          <p className="eyebrow">APRIL → SEPTEMBER 2026</p>
          <h1>The Record.</h1>
        </div>
        <span className="edition">REAL WORK, WORTH RETURNING TO</span>
      </div>
      <div className="archive-intro">
        <p>
          Your old calls, early arguments and lesson trail. There’s plenty here
          to pick up again.
        </p>
        <div>
          <b>{historicalCalls.length}</b> recorded calls <b>{lessons.length}</b>{' '}
          lesson entries
        </div>
      </div>
      <div className="filters stat-filter" aria-label="Archive view">
        {['Predictions', 'Lesson trail'].map((v) => (
          <button
            key={v}
            className={view === v ? 'selected' : ''}
            aria-pressed={view === v}
            onClick={() => setView(v)}
          >
            {v}
          </button>
        ))}
      </div>
      {view === 'Predictions' ? (
        <>
          <div className="archive-explainer">
            <strong>The calls meet the results.</strong>
            <p>
              All three matches now have sourced results and event comparisons.
              Norway went to extra time, so both scores are shown. Historical
              calls are reviewed here; new 90-minute predictions have their own
              Matchday statistics.
            </p>
          </div>
          <div className="archive-grid">
            {historicalCalls.map((call) => (
              <HistoricalCard
                key={call.id}
                call={call}
                note={notes[call.id]}
                save={(note) => save({ ...notes, [call.id]: note })}
              />
            ))}
          </div>
        </>
      ) : (
        <>
          <div className="section-heading">
            <p className="meta">
              Reconstructed from lesson materials and tutor reports. All dates
              are 2026. The activities opened below are new recall practice.
            </p>
            <div className="filters" aria-label="Filter by tutor">
              {['Everyone', 'Josh', 'Aaron'].map((t) => (
                <button
                  key={t}
                  className={tutor === t ? 'selected' : ''}
                  aria-pressed={tutor === t}
                  onClick={() => setTutor(t)}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
          <ol className="lesson-timeline">
            {lessons
              .filter((l) => tutor === 'Everyone' || l.tutor === tutor)
              .map((l) => (
                <li key={`${l.date}-${l.tutor}`}>
                  <div className="timeline-date">
                    {l.date}
                    <small>
                      {l.tutor} · {l.subject}
                    </small>
                  </div>
                  <div>
                    <h2>{l.title}</h2>
                    <p>{l.work}</p>
                  </div>
                  {l.subject === 'Maths' && (
                    <button
                      className="plain-button"
                      onClick={() => review(l.topic)}
                    >
                      Revisit topic →
                    </button>
                  )}
                </li>
              ))}
          </ol>
        </>
      )}
    </>
  );
}
function HistoricalCard({
  call,
  note,
  save,
}: {
  call: HistoricalCall;
  note?: ArchiveNotes[string];
  save: (note: ArchiveNotes[string]) => boolean;
}) {
  const [result, setResult] = useState(note?.result || '');
  const [reflection, setReflection] = useState(note?.reflection || '');
  const [message, setMessage] = useState('');
  return (
    <article
      className={`history-card ${call.author === 'Josh' ? 'josh-call' : ''}`}
    >
      <div className="section-heading">
        <span className="eyebrow">{call.date}</span>
        <span className="author-stamp">
          {call.author}
          {call.author === 'Josh' ? ' · MODEL' : ''}
        </span>
      </div>
      <div className={`prediction-heading ${call.photo ? 'has-photo' : ''}`}>
        <div>
          <h2>{call.title}</h2>
          <strong className="archive-call">{call.call}</strong>
        </div>
        {call.photo && (
          <figure className="prediction-photo">
            <img
              src={call.photo.src}
              alt={call.photo.alt}
              width={640}
              height={420}
              loading="lazy"
              decoding="async"
              style={{ objectPosition: call.photo.position || 'center' }}
            />
            <figcaption>
              <a href={call.photo.sourceUrl} target="_blank" rel="noreferrer">
                {call.photo.credit} ↗
              </a>
            </figcaption>
          </figure>
        )}
      </div>
      <div className="verified-result">
        <p className="eyebrow">THE RESULT</p>
        <h3>{call.result.label}</h3>
        <p className="meta">{call.result.date}</p>
        <p>{call.result.detail}</p>
        <strong>{call.result.verdict}</strong>
        <div className="result-sources">
          {call.result.sources.map((source) => (
            <a
              key={source.url}
              href={source.url}
              target="_blank"
              rel="noreferrer"
            >
              {source.label} ↗
            </a>
          ))}
        </div>
      </div>
      <details className="original-call">
        <summary>Read the original prediction</summary>
        <blockquote>{call.excerpt}</blockquote>
      </details>
      {call.events.length > 0 && (
        <div>
          <p className="event-total">
            <strong>
              {call.events.filter((e) => e.result === 'correct').length} /{' '}
              {call.events.filter((e) => e.result !== 'unrecorded').length}
            </strong>{' '}
            event calls correct
          </p>
          <ul className="archive-events">
            {call.events.map((e) => (
              <li key={e.call}>
                <span>{e.call}</span>
                <b className={`event-${e.result}`}>
                  {e.result === 'correct'
                    ? '✓ Correct'
                    : e.result === 'missed'
                      ? '× Missed'
                      : 'Not recorded'}
                </b>
                {e.evidence && <small>{e.evidence}</small>}
              </li>
            ))}
          </ul>
        </div>
      )}
      <p className="archive-context">{call.context}</p>
      <p className="meta">Source: {call.source}</p>
      <details className="archive-review">
        <summary>Add your reflection & extra evidence</summary>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setMessage(
              save({ result, reflection })
                ? 'Archive review saved on this browser.'
                : 'Could not save. Your previous review is preserved.',
            );
          }}
        >
          <label>
            Additional evidence or match notes
            <textarea
              value={result}
              maxLength={3000}
              onChange={(e) => setResult(e.target.value)}
              placeholder="Add another source, a key moment or something the original reasoning missed."
            />
          </label>
          <label>
            What would you change next time?
            <textarea
              value={reflection}
              maxLength={3000}
              onChange={(e) => setReflection(e.target.value)}
            />
          </label>
          <button className="action" type="submit">
            Save archive review
          </button>
          <p role="status">{message}</p>
        </form>
      </details>
    </article>
  );
}
