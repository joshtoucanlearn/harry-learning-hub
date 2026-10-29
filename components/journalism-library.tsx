'use client';
import { useEffect, useRef, useState } from 'react';
import { BrandIdentity } from './brand-mark';
import { archiveWriting } from '@/data/learning-history';
import { newsArt } from '@/data/news-art';

const editorial: Record<
  string,
  { section: string; deck: string; format: string }
> = {
  'leeds-newcastle': {
    section: 'Match reports',
    deck: 'Monday 14th of September · Leeds 4 – 1 Newcastle',
    format: 'Match report',
  },
  hydration: {
    section: 'Opinion',
    deck: 'What happens to the tension when the game stops? Harry makes the case against mid-half hydration breaks.',
    format: 'Opinion',
  },
  'leeds-analysis': {
    section: 'Analysis',
    deck: 'A weakness on the left, a summer signing and the fine margins of a Premier League finish.',
    format: 'Analysis',
  },
  'norway-preview': {
    section: 'Match previews',
    deck: 'Before the quarter-final: Harry backed England and called the moments that might decide it.',
    format: 'Original prediction',
  },
  'france-preview': {
    section: 'Match previews',
    deck: 'Harry’s pre-match scenario for Spain against France, with Dembélé cast as the late hero.',
    format: 'Original prediction',
  },
  'football-evolution': {
    section: 'Analysis',
    deck: 'A look back at Leeds, Chelsea and the 1970 FA Cup final sparks a question about the modern game.',
    format: 'Analysis',
  },
  'arsenal-tone': {
    section: 'Opinion',
    deck: '“Disgraceful” or “controversial”? One word changes the tone of a football argument.',
    format: 'Shared paragraph',
  },
  'football-hooliganism': {
    section: 'Opinion',
    deck: 'A classroom argument about rivalry, shared identity and football culture.',
    format: 'Shared debate',
  },
  'social-media': {
    section: 'Opinion',
    deck: 'Misinformation, discrimination and easier access to team news: the two sides of football online.',
    format: 'Debate plan',
  },
  'england-world-cup': {
    section: 'Match previews',
    deck: 'Attacking options and dangerous set pieces: the case for England’s chances.',
    format: 'Original prediction',
  },
};
const sections = [
  'All stories',
  'Opinion',
  'Analysis',
  'Match reports',
  'Match previews',
];
const storyUrl = (id: string) => `#football/${id}`;
type Story = (typeof archiveWriting)[number];
const leadStory = archiveWriting.find((a) => a.id === 'hydration')!;

function StoryCard({ story, lead = false }: { story: Story; lead?: boolean }) {
  const detail = editorial[story.id];
  const art = newsArt[story.id];
  return (
    <article className={`news-story ${lead ? 'news-lead' : ''}`}>
      <a className="news-story-link" href={storyUrl(story.id)}>
        <img
          className="news-cover"
          src={art.src}
          alt={art.alt}
          width={art.width}
          height={art.height}
          loading={lead ? undefined : 'lazy'}
          fetchPriority={lead ? 'high' : undefined}
        />
        <div className="news-story-copy">
          <span className="news-kicker">{detail.format}</span>
          <h2>{story.title}</h2>
          <p>{detail.deck}</p>
          <span className="news-byline">{story.credit}</span>
          <span className="news-date">{story.date}</span>
        </div>
      </a>
    </article>
  );
}

export function JournalismLibrary({ articleId }: { articleId: string | null }) {
  const [section, setSection] = useState('All stories');
  const titleRef = useRef<HTMLHeadingElement>(null);
  const item = archiveWriting.find((a) => a.id === articleId);
  useEffect(() => {
    document.title = item
      ? `${item.title} | Harry Baker MEDIA`
      : 'Football | Harry Baker MEDIA';
    titleRef.current?.focus({ preventScroll: true });
    return () => {
      document.title = 'Harry Baker MEDIA';
    };
  }, [articleId, item]);

  if (articleId && !item)
    return (
      <section className="news-reader">
        <h1 ref={titleRef} tabIndex={-1}>
          Story not found
        </h1>
        <p>This story isn’t in the football pages.</p>
        <a className="news-back" href="#football">
          ← Back to Football
        </a>
      </section>
    );

  if (item) {
    const detail = editorial[item.id];
    const art = newsArt[item.id];
    const related = archiveWriting.filter((a) => a.id !== item.id).slice(0, 3);
    return (
      <div className="football-press">
        <a className="news-back" href="#football">
          ← Back to Football
        </a>
        <article className="news-reader" aria-label={item.title}>
          <header className="news-article-heading">
            <p className="news-kicker">{detail.format} / From the archive</p>
            <h1 ref={titleRef} tabIndex={-1}>
              {item.title}
            </h1>
            <p className="news-standfirst">{detail.deck}</p>
            <div className="news-article-byline">
              <strong>{item.credit}</strong>
              <span>{item.date}</span>
            </div>
          </header>
          <figure className="news-figure">
            <img
              src={art.src}
              alt={art.readerAlt || art.alt}
              width={art.width}
              height={art.height}
            />
            <figcaption>{art.caption}</figcaption>
          </figure>
          <div className="news-reading-copy">
            {item.excerpt.split('\n\n').map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
          <aside className="news-source-note">
            <h2>About this piece</h2>
            <p>{item.note}</p>
            <span>Source: {item.source}</span>
            {item.id === 'football-evolution' && (
              <a
                href="https://www.youtube.com/watch?v=vzifxh-2QRU&t=44s"
                target="_blank"
                rel="noopener noreferrer"
              >
                Watch the clip Harry analysed (0:44) ↗
              </a>
            )}
            {detail.section === 'Match previews' && (
              <a href="#record">See the recorded match results →</a>
            )}
          </aside>
        </article>
        <section className="news-more" aria-label="More football stories">
          <div className="news-section-heading">
            <h2>More football</h2>
            <a href="#football">All stories →</a>
          </div>
          <div className="news-related">
            {related.map((a) => (
              <StoryCard key={a.id} story={a} />
            ))}
          </div>
        </section>
      </div>
    );
  }

  const filtered = archiveWriting.filter(
    (a) => section === 'All stories' || editorial[a.id].section === section,
  );
  return (
    <section className="football-press" aria-label="Football Journalism">
      <header className="news-masthead">
        <div>
          <BrandIdentity className="news-identity" />
          <h1 ref={titleRef} tabIndex={-1}>
            Football
          </h1>
        </div>
        <div className="news-edition">
          <strong>Harry’s press box</strong>
          <span>From the archive · May–October 2026</span>
        </div>
      </header>
      <div
        className="news-sections"
        role="group"
        aria-label="Football sections"
      >
        {sections.map((label) => (
          <button
            key={label}
            aria-pressed={section === label}
            className={section === label ? 'selected' : ''}
            onClick={() => setSection(label)}
          >
            {label}
          </button>
        ))}
      </div>
      {section === 'All stories' ? (
        <>
          <div className="news-front">
            <StoryCard story={leadStory} lead />
            <div className="news-side-stories">
              {archiveWriting
                .filter((a) => editorial[a.id].section === 'Analysis')
                .map((a) => (
                  <StoryCard key={a.id} story={a} />
                ))}
            </div>
          </div>
          <section className="news-more" aria-label="Match reports">
            <div className="news-section-heading">
              <h2>After the whistle</h2>
              <span>Match reports</span>
            </div>
            <div className="news-two">
              {archiveWriting
                .filter((a) => editorial[a.id].section === 'Match reports')
                .map((a) => (
                  <StoryCard key={a.id} story={a} />
                ))}
            </div>
          </section>
          <section className="news-more" aria-label="Match previews">
            <div className="news-section-heading">
              <h2>Before the whistle</h2>
              <span>Harry’s original match calls</span>
            </div>
            <div className="news-two">
              {archiveWriting
                .filter((a) => editorial[a.id].section === 'Match previews')
                .map((a) => (
                  <StoryCard key={a.id} story={a} />
                ))}
            </div>
          </section>
          <section className="news-more" aria-label="More opinion">
            <div className="news-section-heading">
              <h2>The talking points</h2>
              <span>Opinion & debate</span>
            </div>
            <div className="news-two">
              {archiveWriting
                .filter(
                  (a) =>
                    editorial[a.id].section === 'Opinion' &&
                    a.id !== leadStory.id,
                )
                .map((a) => (
                  <StoryCard key={a.id} story={a} />
                ))}
            </div>
          </section>
        </>
      ) : (
        <section className="news-filtered" aria-label={section}>
          <div className="news-section-heading">
            <h2>{section}</h2>
            <span>{filtered.length} stories</span>
          </div>
          <div className="news-related">
            {filtered.map((a) => (
              <StoryCard key={a.id} story={a} />
            ))}
          </div>
        </section>
      )}
    </section>
  );
}
