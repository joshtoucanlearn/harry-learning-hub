'use client';
import { useState } from 'react';
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
  go: (section: 'Review' | 'Matchday') => void;
}) {
  const all = topics.flatMap((t) => t.questions);
  const checked = all.filter((q) => progress[q.id]).length;
  const correct = all.filter((q) => progress[q.id]?.correct).length;
  return (
    <>
      <div className="page-heading">
        <div>
          <p className="eyebrow">HARRY’S LEARNING HUB</p>
          <h1>
            Pick something up.
            <br />
            Take it a bit further.
          </h1>
        </div>
        <span className="edition">YOUR SPACE TO LEARN</span>
      </div>
      <div className="hub-choices">
        <button
          className="hub-choice review-choice"
          onClick={() => go('Review')}
        >
          <span className="eyebrow">01 / REVIEW</span>
          <h2>Make it stick.</h2>
          <p>
            Maths and English from your lessons. Refresh a topic, test your
            recall, then revisit what needs another go.
          </p>
          <strong>Open Review →</strong>
        </button>
        <button
          className="hub-choice football-choice"
          onClick={() => go('Matchday')}
        >
          <span className="eyebrow">02 / FOOTBALL DESK</span>
          <h2>Make your call.</h2>
          <p>
            Predict the score. Back it with evidence. Compare the result,
            explore the stats and write your take.
          </p>
          <strong>Open football →</strong>
        </button>
      </div>
      <section className="panel top-space">
        <div className="section-heading">
          <h2>Your review so far</h2>
          <span className="badge">
            {correct} / {all.length} correct on latest checks
          </span>
        </div>
        <p>
          {checked
            ? `${checked} questions tried. ${checked - correct} to revisit.`
            : 'A fresh start. Choose a short topic and see what you remember.'}{' '}
          Progress saves on this browser.
        </p>
        <div className="topic-chips">
          {topics.map((t) => (
            <button
              className="plain-button"
              key={t.id}
              onClick={() => go('Review')}
            >
              {t.subject} · {t.title}
            </button>
          ))}
        </div>
      </section>
    </>
  );
}
export function ReviewHub({
  progress,
  save,
}: {
  progress: ReviewProgress;
  save: (next: ReviewProgress) => boolean;
}) {
  const [topic, setTopic] = useState<Topic | null>(null);
  const [subject, setSubject] = useState('All');
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
        <span className="edition">MATHS + ENGLISH</span>
      </div>
      {!topic ? (
        <>
          <div className="filters stat-filter">
            {['All', 'Maths', 'English'].map((s) => (
              <button
                key={s}
                aria-pressed={s === subject}
                className={s === subject ? 'selected' : ''}
                onClick={() => setSubject(s)}
              >
                {s}
              </button>
            ))}
          </div>
          <div className="topic-grid">
            {topics
              .filter((t) => subject === 'All' || subject === t.subject)
              .map((t) => {
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
                    <span className="eyebrow">{t.subject} · 3 QUESTIONS</span>
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
