import { Link } from 'react-router-dom';
import { posts, blogMeta } from '../data/blog';
import PostCard from './PostCard';

export default function JournalTeaser() {
  const latest = posts.slice(0, 3);

  return (
    <section id="journal" className="section relative bg-ink-950">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="eyebrow">05 · Journal</span>
            <h2 className="mt-4 font-display text-4xl leading-[0.95] tracking-tightest md:text-7xl">
              Notes from
              <br />
              <span className="grad-text">the build.</span>
            </h2>
          </div>
          <div className="md:max-w-sm md:text-right">
            <p className="text-sm text-bone/70 md:text-base">{blogMeta.dek}</p>
            <Link
              to="/journal"
              data-cursor
              className="mt-5 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-bone/80 transition-colors hover:text-bone"
            >
              Read the journal
              <span aria-hidden>→</span>
            </Link>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-7">
          {latest.map((p, i) => (
            <PostCard key={p.slug} post={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
