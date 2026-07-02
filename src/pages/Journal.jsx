import { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { posts, allTags, blogMeta } from '../data/blog';
import PostCard from '../components/PostCard';

export default function Journal() {
  const [tag, setTag] = useState('All');

  useEffect(() => {
    document.title = 'Journal — Noel Paul Moses Jangam';
  }, []);

  const filtered = useMemo(
    () => (tag === 'All' ? posts : posts.filter((p) => p.category === tag)),
    [tag]
  );

  return (
    <div className="section relative min-h-screen pt-32 md:pt-40">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="flex flex-col gap-6">
          <span className="eyebrow">Journal · {posts.length} essays</span>
          <h1 className="font-display text-6xl leading-[0.9] tracking-tightest md:text-[9vw]">
            The <span className="grad-text">Journal.</span>
          </h1>
          <p className="max-w-2xl text-base text-bone/70 md:text-lg">
            {blogMeta.dek}
          </p>
        </div>

        {/* Filter */}
        <div className="mt-12 flex flex-wrap gap-2.5">
          {allTags.map((t) => {
            const active = t === tag;
            return (
              <button
                key={t}
                onClick={() => setTag(t)}
                data-cursor
                className={`rounded-full border px-4 py-2 font-mono text-[11px] uppercase tracking-[0.16em] transition-colors ${
                  active
                    ? 'border-bone bg-bone text-ink-950'
                    : 'border-bone/15 text-bone/65 hover:border-bone/40 hover:text-bone'
                }`}
              >
                {t}
              </button>
            );
          })}
        </div>

        {/* Grid */}
        <motion.div
          layout
          className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-7"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((p, i) => (
              <motion.div
                key={p.slug}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.4 }}
                className={tag === 'All' && i === 0 ? 'md:col-span-2' : ''}
              >
                <div className="journal-card-wrap h-full">
                  <PostCard post={p} index={i} large={tag === 'All' && i === 0} />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <p className="mt-16 text-center font-mono text-sm uppercase tracking-[0.2em] text-bone/50">
            Nothing here yet — more soon.
          </p>
        )}
      </div>
    </div>
  );
}
