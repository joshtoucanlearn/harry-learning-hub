'use client';
import { useState, useEffect } from 'react';
import { archiveWriting } from '@/data/learning-history';
import type { WritingSeed } from './learning-archive';
export function JournalismLibrary({
  write,
}: {
  write: (seed: WritingSeed) => void;
}) {
  const [selected, setSelected] = useState<string | null>(null);
  useEffect(() => {
    if (selected)
      document
        .getElementById('archive-article')
        ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [selected]);
  const item = archiveWriting.find((a) => a.id === selected);
  return (
    <section className="journalism-library">
      <div className="section-heading">
        <div>
          <p className="eyebrow">FROM HARRY’S WRITING</p>
          <h2>The back pages.</h2>
        </div>
        <span className="meta">
          {archiveWriting.length} pieces & starting points
        </span>
      </div>
      <div className="article-shelf">
        {archiveWriting.map((a, i) => (
          <button
            key={a.id}
            className={`shelf-card ${selected === a.id ? 'selected' : ''}`}
            aria-pressed={selected === a.id}
            onClick={() => setSelected(selected === a.id ? null : a.id)}
          >
            <span className="shelf-number">0{i + 1}</span>
            <span className="eyebrow">
              {a.category} · {a.date}
            </span>
            <h3>{a.title}</h3>
            <span className="shelf-credit">{a.credit}</span>
            <strong>Read & rework ↗</strong>
          </button>
        ))}
      </div>
      {item && (
        <article
          id="archive-article"
          className="archive-article"
          aria-label={`Archive article: ${item.title}`}
        >
          <button
            className="plain-button close-article"
            onClick={() => setSelected(null)}
          >
            Close piece ×
          </button>
          <p className="eyebrow">{item.category} / CLASSROOM ARCHIVE</p>
          <h2>{item.title}</h2>
          <p className="meta">
            {item.credit} · {item.date} · {item.source}
          </p>
          <div className="reading-copy">
            {item.excerpt.split('\n\n').map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
          <p className="source-caption">{item.note}</p>
          <div className="editor-challenge">
            <p className="eyebrow">NEXT EDIT</p>
            <p>{item.challenge}</p>
            <button
              className="action"
              onClick={() =>
                write({
                  key: crypto.randomUUID(),
                  title: `${item.title}: second take`,
                  kind: item.brief,
                  original: item.excerpt,
                  context: item.challenge,
                  sourceNote: `${item.credit} · ${item.source}. ${item.note}`,
                  archived: true,
                })
              }
            >
              Rework this piece →
            </button>
          </div>
        </article>
      )}
    </section>
  );
}
