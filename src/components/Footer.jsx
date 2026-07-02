import { Link } from 'react-router-dom';
import { profile } from '../data/content';
import { getLenis } from '../lib/useLenis';

export default function Footer() {
  const toTop = (e) => {
    e.preventDefault();
    const lenis = getLenis();
    if (lenis) lenis.scrollTo(0, { duration: 1.2 });
    else window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative border-t border-bone/10 bg-ink-950">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-5 py-12 md:px-10">
        <Link to="/" className="font-display text-[18vw] leading-[0.85] tracking-tightest md:text-[12vw]" data-cursor>
          <span className="grad-text">Noel.</span>
        </Link>
        <div className="flex flex-col items-start justify-between gap-6 border-t border-bone/10 pt-6 font-mono text-[11px] uppercase tracking-[0.22em] text-bone/55 md:flex-row md:items-center">
          <span>© {new Date().getFullYear()} {profile.name}</span>
          <span>Designed &amp; engineered in San Jose · Tempe</span>
          <a
            href="#top"
            onClick={toTop}
            data-cursor
            className="flex items-center gap-2 text-bone/80 hover:text-bone"
          >
            Back to top
            <span aria-hidden>↑</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
