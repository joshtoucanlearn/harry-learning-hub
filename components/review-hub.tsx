'use client';
import { useState } from 'react';
import { BrandIdentity } from './brand-mark';
import {
  topics,
  topicProgress,
  type Topic,
  type ReviewProgress,
} from '@/data/review-topics';
export function LearningHome({
  progress,
  go,
}: {
  progress: ReviewProgress;
  go: (
    section: 'Review' | 'Matchday' | 'Football Journalism' | 'The Record',
  ) => void;
}) {
  const all = topics.flatMap((t) => t.questions);
  const correct = all.filter((q) => progress[q.id]?.correct).length;
  const checked = all.filter((q) => progress[q.id]).length;
  return (
    <>
      <div className="home-heading">
        <BrandIdentity className="home-identity" />
        <h1>All yours, Harry.</h1>
        <p>Pick up a thought. See where it takes you.</p>
      </div>
      <div className="home-layout">
        <section className="home-stories">
          <div className="home-section-label">
            <span>FROM YOUR WRITING</span>
            <span>01 / 07</span>
          </div>
          <button
            className="featured-writing"
            onClick={() => go('Football Journalism')}
          >
            <span className="article-category">OPINION / FOOTBALL</span>
            <h2>
              Hydration
              <br />
              <em>disaster.</em>
            </h2>
            <p>
              “These hydration breaks need to stop. It ruins the flow of the
              games and disrupts the tempo.”
            </p>
            <div className="featured-byline">
              <span>
                Harry, with Josh
                <br />
                <small>From the June–July lessons</small>
              </span>
              <span className="round-arrow" aria-hidden="true">
                ↗
              </span>
            </div>
          </button>
          <div className="feature-caption">
            <span>Your original argument, ready for another look.</span>
            <button onClick={() => go('Football Journalism')}>
              Open Journalism ↗
            </button>
          </div>
        </section>
        <section className="desk-actions">
          <div className="home-section-label">
            <span>WHERE NEXT?</span>
          </div>
          <button onClick={() => go('Matchday')} className="desk-action">
            <span className="desk-number">01</span>
            <div>
              <h2>Make a prediction</h2>
              <p>Score, key moments and your reasons.</p>
            </div>
            <span aria-hidden="true">↗</span>
          </button>
          <button
            onClick={() => go('Football Journalism')}
            className="desk-action"
          >
            <span className="desk-number">02</span>
            <div>
              <h2>Read the football pages</h2>
              <p>Harry’s opinions, analysis and match previews.</p>
            </div>
            <span aria-hidden="true">↗</span>
          </button>
          <button onClick={() => go('Review')} className="desk-action">
            <span className="desk-number">03</span>
            <div>
              <h2>Work something out</h2>
              <p>A short maths topic from your lessons.</p>
            </div>
            <span aria-hidden="true">↗</span>
          </button>
          <button className="record-preview" onClick={() => go('The Record')}>
            <span className="eyebrow">THE RECORD / A LOOK BACK</span>
            <div className="record-teams">
              <span>
                England <b>2</b>
              </span>
              <span>
                Norway <b>1</b>
              </span>
            </div>
            <div className="record-caption">
              <span>After extra time · 11 July 2026</span>
              <span>View your call ↗</span>
            </div>
          </button>
        </section>
      </div>
      <section className="home-review-strip">
        <div>
          <p className="eyebrow">MATHS / {topics.length} TOPICS</p>
          <h2>Make it stick.</h2>
          <p>
            {checked
              ? `${checked} questions tried. ${checked - correct} to revisit.`
              : 'A little practice, whenever you feel like it.'}
          </p>
        </div>
        <div className="home-progress">
          <strong>
            {correct}
            <span> / {all.length}</span>
          </strong>
          <span>
            {correct} / {all.length} correct on latest checks
          </span>
        </div>
        <button className="plain-button" onClick={() => go('Review')}>
          Open Review ↗
        </button>
      </section>
      <div className="home-footer-note">
        <span>From your lessons with Josh & Aaron.</span>
        <span>Saved work stays on this browser. Backups are in Teacher.</span>
      </div>
    </>
  );
}

export function ReviewHub({
  progress,
  save,
  initialTopic,
}: {
  progress: ReviewProgress;
  initialTopic?: string;
  save: (next: ReviewProgress) => boolean;
}) {
  const [topic, setTopic] = useState<Topic | null>(
    topics.find((t) => t.id === initialTopic) || null,
  );
  const [stage, setStage] = useState<'notes' | 'quiz' | 'done'>('notes');
  const [queue, setQueue] = useState<string[]>([]);
  const [index, setIndex] = useState(0);
  const [choice, setChoice] = useState<number | null>(null);
  const [checked, setChecked] = useState(false);
  const [error, setError] = useState('');
  const q = topic?.questions.find((q) => q.id === queue[index]);
  function start(onlyMissed = false) {
    if (!topic) return;
    const qs = topic.questions.filter(
      (q) => !onlyMissed || !progress[q.id]?.correct,
    );
    setQueue(qs.map((q) => q.id));
    setIndex(0);
    setChoice(null);
    setChecked(false);
    setStage(qs.length ? 'quiz' : 'done');
    setError('');
  }
  return (
    <>
      <div className="page-heading">
        <div>
          <p className="eyebrow">A LITTLE RECALL GOES A LONG WAY</p>
          <h1>Review.</h1>
        </div>
        <span className="edition">MATHS</span>
      </div>
      {!topic ? (
        <>
          <div className="topic-grid">
            {topics.map((t) => {
              const p = topicProgress(t, progress);
              return (
                <button
                  key={t.id}
                  className="topic-card"
                  onClick={() => {
                    setTopic(t);
                    setStage('notes');
                  }}
                >
                  <span className="eyebrow">
                    {t.subject} · {t.questions.length} QUESTIONS
                  </span>
                  <h2>{t.title}</h2>
                  <p>{t.summary}</p>
                  <div className="review-progress">
                    <i style={{ width: `${(p.correct / p.total) * 100}%` }} />
                  </div>
                  <span>
                    {p.checked
                      ? `${p.correct}/${p.total} correct on latest checks`
                      : 'Not tried yet'}{' '}
                    <b>→</b>
                  </span>
                </button>
              );
            })}
          </div>
          <p className="hint">
            Progress reflects your latest answers here, not an exam grade.
            Revisit a topic later to check what stays with you.
          </p>
        </>
      ) : (
        <>
          <button
            className="plain-button"
            onClick={() => {
              setTopic(null);
              setError('');
            }}
          >
            ← All review topics
          </button>
          <div className="workspace top-space">
            <section className="panel">
              <p className="eyebrow">{topic.subject}</p>
              <h2 className="match-title">{topic.title}</h2>
              <p className="meta">Based on: {topic.source}</p>
              {stage === 'notes' && (
                <>
                  <p>Try recalling each idea before opening the card.</p>
                  {topic.cards.map((card, i) => (
                    <details className="recall-card" key={card.heading}>
                      <summary>
                        {i + 1}. {card.heading}
                      </summary>
                      <p>{card.body}</p>
                    </details>
                  ))}
                  <button className="action" onClick={() => start()}>
                    Test my recall →
                  </button>
                </>
              )}
              {stage === 'quiz' && q && (
                <>
                  <span className="badge">
                    QUESTION {index + 1} / {queue.length}
                  </span>
                  <h3 className="question-title">{q.prompt}</h3>
                  <fieldset className="answer-options" disabled={checked}>
                    <legend className="sr-only">Choose one answer</legend>
                    {q.choices.map((answer, i) => (
                      <label key={answer}>
                        <input
                          type="radio"
                          name="answer"
                          value={i}
                          checked={choice === i}
                          onChange={() => setChoice(i)}
                        />
                        <span>{answer}</span>
                      </label>
                    ))}
                  </fieldset>
                  {!checked ? (
                    <button
                      className="action"
                      disabled={choice === null}
                      onClick={() => {
                        if (choice === null) return;
                        const next = {
                          ...progress,
                          [q.id]: {
                            attempts: (progress[q.id]?.attempts || 0) + 1,
                            correct: choice === q.answer,
                            updatedAt: new Date().toISOString(),
                          },
                        };
                        if (save(next)) {
                          setChecked(true);
                          setError('');
                        } else
                          setError(
                            'Your answer could not be saved. Please try again.',
                          );
                      }}
                    >
                      Check my answer
                    </button>
                  ) : (
                    <>
                      <div
                        role="status"
                        className={`answer-feedback ${choice === q.answer ? 'correct' : 'retry'}`}
                      >
                        <h3>
                          {choice === q.answer
                            ? 'That’s right.'
                            : 'Not quite — here’s the idea.'}
                        </h3>
                        <p>{q.explanation}</p>
                      </div>
                      <button
                        className="action"
                        onClick={() => {
                          if (index + 1 === queue.length) setStage('done');
                          else {
                            setIndex(index + 1);
                            setChoice(null);
                            setChecked(false);
                          }
                        }}
                      >
                        {index + 1 === queue.length
                          ? 'See topic progress'
                          : 'Next question →'}
                      </button>
                    </>
                  )}
                  {error && <p role="alert">{error}</p>}
                </>
              )}
              {stage === 'done' && (
                <>
                  <div className="completion">
                    <h3>
                      {topicProgress(topic, progress).correct} /{' '}
                      {topic.questions.length} correct on your latest checks
                    </h3>
                    <p>
                      {topicProgress(topic, progress).correct ===
                      topic.questions.length
                        ? 'Good work. Come back another day and try without the notes.'
                        : 'Give the tricky ones another go. Use the feedback to explain the method in your own words.'}
                    </p>
                  </div>
                  <div className="button-row">
                    {topic.questions.some((q) => !progress[q.id]?.correct) && (
                      <button className="action" onClick={() => start(true)}>
                        Retry questions to revisit
                      </button>
                    )}
                    <button className="plain-button" onClick={() => start()}>
                      Try whole topic again
                    </button>
                    <button
                      className="plain-button"
                      onClick={() => setStage('notes')}
                    >
                      Revisit the notes
                    </button>
                  </div>
                </>
              )}
            </section>
            <aside className="side-note">
              <span className="eyebrow">YOUR NEXT SMALL STEP</span>
              <h2>
                Remember.
                <br />
                Check.
                <br />
                Revisit.
              </h2>
              <p>
                Think first. Use the feedback. Then try again without looking.
              </p>
              <div className="rule" />
              <p>
                {topicProgress(topic, progress).correct} of{' '}
                {topic.questions.length} correct on latest checks.
              </p>
              <p>Getting it wrong shows you what to work on next.</p>
            </aside>
          </div>
        </>
      )}
    </>
  );
}
