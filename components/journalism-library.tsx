'use client';
import { useEffect, useRef, useState } from 'react';
import { archiveWriting } from '@/data/learning-history';
const hydrationArt = new URL(
  '../assets/hydration-editorial.jpg',
  import.meta.url,
).href;

const editorial: Record<
  string,
  { section: string; deck: string; format: string }
> = {
  hydration: {
    section: 'Opinion',
    deck: 'What happens to the tension when the game stops? Harry makes the case against mid-half hydration breaks.',
    format: 'Opinion excerpt',
  },
  'leeds-analysis': {
    section: 'Analysis',
    deck: 'A weakness on the left, a summer signing and the fine margins of a Premier League finish.',
    format: 'Analysis excerpt',
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
    format: 'Analysis excerpt',
  },
  'arsenal-tone': {
    section: 'Opinion',
    deck: '“Disgraceful” or “controversial”? One word changes the tone of a football argument.',
    format: 'Shared paragraph',
  },
  'social-media': {
    section: 'Opinion',
    deck: 'Misinformation, discrimination and easier access to team news: the two sides of football online.',
    format: 'Debate plan',
  },
};
const sections = ['All stories', 'Opinion', 'Analysis', 'Match previews'];
const storyUrl = (id: string) => `#football/${id}`;
type Story = (typeof archiveWriting)[number];

function StoryCard({ story, lead = false }: { story: Story; lead?: boolean }) {
  const detail = editorial[story.id];
  return (
    <article className={`news-story ${lead ? 'news-lead' : ''}`}>
      <a className="news-story-link" href={storyUrl(story.id)}>
        <div className="news-story-copy">
          <span className="news-kicker">{detail.format}</span>
          <h2>{story.title}</h2>
          <p>{detail.deck}</p>
          <span className="news-byline">{story.credit}</span>
          <span className="news-date">{story.date}</span>
        </div>
        {lead && (
          <img
            className="news-cover"
            src={hydrationArt}
            alt="Editorial illustration of water bottles beside a floodlit football pitch"
            width={1536}
            height={1024}
            fetchPriority="high"
          />
        )}
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
      ? `${item.title} | Harry Hub`
      : 'Football | Harry Hub';
    titleRef.current?.focus({ preventScroll: true });
    return () => {
      document.title = 'Harry Hub';
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
          {item.id === 'hydration' && (
            <figure className="news-figure">
              <img
                src={hydrationArt}
                alt="Water bottles on the touchline of a floodlit football ground"
                width={1536}
                height={1024}
              />
              <figcaption>
                Hydration breaks and the rhythm of a match.
              </figcaption>
            </figure>
          )}
          <div className="news-reading-copy">
            {item.excerpt.split('\n\n').map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
          <aside className="news-source-note">
            <h2>About this piece</h2>
            <p>{item.note}</p>
            <span>Source: {item.source}</span>
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
          <p className="news-kicker">HARRY HUB / SPORT</p>
          <h1 ref={titleRef} tabIndex={-1}>
            Football
          </h1>
        </div>
        <div className="news-edition">
          <strong>Harry’s press box</strong>
          <span>From the archive · May–July 2026</span>
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
            <StoryCard story={archiveWriting[0]} lead />
            <div className="news-side-stories">
              <StoryCard story={archiveWriting[1]} />
              <StoryCard story={archiveWriting[4]} />
            </div>
          </div>
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
              {archiveWriting.slice(5).map((a) => (
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
