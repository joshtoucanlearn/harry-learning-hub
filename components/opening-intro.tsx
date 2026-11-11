'use client';
import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties } from 'react';

const crest = new URL('../assets/harry-media-crest.png', import.meta.url).href;
const SESSION_KEY = 'harry-media-intro-seen';

export type IntroPhase = 'off' | 'hold' | 'leave';

// Plays once per browser session, and never for a deep link such as #football.
export function shouldPlayIntro() {
  if (typeof window === 'undefined') return false;
  if (window.location.hash.replace('#', '')) return false;
  try {
    if (window.sessionStorage.getItem(SESSION_KEY)) return false;
    window.sessionStorage.setItem(SESSION_KEY, '1');
  } catch {}
  return true;
}

const reducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export function OpeningIntro({
  phase,
  setPhase,
}: {
  phase: IntroPhase;
  setPhase: (next: IntroPhase) => void;
}) {
  const crestRef = useRef<HTMLImageElement>(null);
  const [landing, setLanding] = useState<CSSProperties>({});
  const reduced = useRef(reducedMotion());

  // Hold the crest, then hand over to the home page.
  useEffect(() => {
    if (phase === 'off') return;
    const wait = phase === 'hold' ? (reduced.current ? 900 : 1400) : reduced.current ? 300 : 950;
    const timer = window.setTimeout(() => setPhase(phase === 'hold' ? 'leave' : 'off'), wait);
    return () => window.clearTimeout(timer);
  }, [phase, setPhase]);

  // Tap, click or any key skips straight to the finished home page.
  useEffect(() => {
    if (phase === 'off') return;
    const skip = () => setPhase('off');
    const skipKey = (event: KeyboardEvent) => {
      // The skipping key should not also scroll the page.
      if (!event.metaKey && !event.ctrlKey && !event.altKey) event.preventDefault();
      skip();
    };
    window.addEventListener('keydown', skipKey);
    window.addEventListener('pointerdown', skip);
    return () => {
      window.removeEventListener('keydown', skipKey);
      window.removeEventListener('pointerdown', skip);
    };
  }, [phase, setPhase]);

  // Fly the big crest onto the header crest (FLIP), or simply fade it.
  useLayoutEffect(() => {
    if (phase !== 'leave' || reduced.current) return;
    const from = crestRef.current?.getBoundingClientRect();
    const to = document.querySelector('.harry-home-brand .brand-crest')?.getBoundingClientRect();
    if (!from || !to || !from.width || !to.width) return;
    const scale = to.width / from.width;
    const dx = to.left + to.width / 2 - (from.left + from.width / 2);
    const dy = to.top + to.height / 2 - (from.top + from.height / 2);
    setLanding({ transform: `translate(${dx}px, ${dy}px) scale(${scale})` });
  }, [phase]);

  if (phase === 'off') return null;
  return (
    <div
      className={`opening-intro is-${phase}${reduced.current ? ' is-reduced' : ''}${
        landing.transform ? ' is-flying' : ''
      }`}
      aria-hidden="true"
    >
      <img ref={crestRef} className="intro-crest" src={crest} width={256} height={256} alt="" style={landing} />
    </div>
  );
}
