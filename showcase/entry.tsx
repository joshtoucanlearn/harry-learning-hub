import { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { JournalismLibrary } from '../components/journalism-library';
import 'showcase-news.css';
import './showcase.css';

function Football() {
  const [hash, setHash] = useState(location.hash);
  useEffect(() => {
    const navigate = () => {
      // This entry has exactly two routes: the newspaper and an article.
      if (!/^#football(?:\/[^/]+)?$/.test(location.hash)) {
        history.replaceState(null, '', '#football');
      }
      setHash(location.hash);
      window.scrollTo(0, 0);
    };
    navigate();
    window.addEventListener('hashchange', navigate);
    return () => window.removeEventListener('hashchange', navigate);
  }, []);
  let articleId: string | null = null;
  try { articleId = hash.startsWith('#football/') ? decodeURIComponent(hash.slice(10)) : null; } catch { /* Show front page for malformed links. */ }
  return <JournalismLibrary articleId={articleId} />;
}

createRoot(document.getElementById('root')!).render(<Football />);
