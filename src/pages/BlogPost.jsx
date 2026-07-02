import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, useScroll, useSpring } from 'framer-motion';
import { getPost, getAdjacent, formatDate } from '../data/blog';
import { profile, consult } from '../data/content';
import ArticleBody from '../components/ArticleBody';

export default function BlogPost() {
  const { slug } = useParams();
  const post = getPost(slug);
  const { prev, next } = getAdjacent(slug);
  const [copied, setCopied] = useState(false);

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.4,
  });

  useEffect(() => {
    document.title = post
      ? `${post.title} — Noel Paul Moses Jangam`
      : 'Journal — Noel Paul Moses Jangam';
  }, [post]);

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard unavailable — no-op */
    }
  };

  if (!post) {
    return (
      <div className="section flex min-h-screen flex-col items-center justify-center gap-6 text-center">
        <h1 className="font-display text-5xl tracking-tightest md:text-7xl">
          Lost the <span className="grad-text">thread.</span>
        </h1>
        <p className="text-bone/70">That essay doesn’t exist (yet).</p>
        <Link to="/journal" className="btn btn-primary" data-cursor>
          <span>Back to the Journal</span>
          <span aria-hidden>→</span>
        </Link>
      </div>
    );
  }

  const accent = post.accent;

  return (
    <article className="relative">
      {/* Reading progress */}
      <motion.div
        style={{ scaleX: progress, transformOrigin: '0% 50%' }}
        className="fixed inset-x-0 top-0 z-[75] h-[2px]"
      >
        <div className="h-full w-full" style={{ background: accent }} />
      </motion.div>

      {/* Hero */}
      <header className="relative overflow-hidden px-5 pb-10 pt-32 md:px-10 md:pt-44">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-24 left-1/2 h-[420px] w-[820px] -translate-x-1/2 rounded-full opacity-25 blur-[150px]"
          style={{ background: `radial-gradient(circle, ${accent}, transparent 70%)` }}
        />
        <div className="relative mx-auto max-w-3xl">
          <Link
            to="/journal"
            data-cursor
            className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-bone/60 transition-colors hover:text-bone"
          >
            <span aria-hidden>←</span> Journal
          </Link>

          <div className="mt-8 flex flex-wrap items-center gap-3 font-mono text-[10px] uppercase tracking-[0.22em] text-bone/55">
            <span
              className="rounded-full border px-2.5 py-1"
              style={{ borderColor: `${accent}55`, color: accent }}
            >
              {post.category}
            </span>
            <span>{formatDate(post.date)}</span>
            <span className="text-bone/30">/</span>
            <span>{post.readMins} min read</span>
          </div>

          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="mt-6 font-display text-4xl leading-[1.02] tracking-tightest md:text-6xl"
          >
            {post.title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mt-6 text-lg leading-relaxed text-bone/70 md:text-xl"
          >
            {post.dek}
          </motion.p>

          <div className="mt-8 flex items-center justify-between border-t border-bone/10 pt-5">
            <div className="flex items-center gap-3">
              <img
                src={profile.portrait}
                alt={profile.name}
                className="h-9 w-9 rounded-full object-cover"
              />
              <div className="leading-tight">
                <div className="text-sm text-bone">{profile.name}</div>
                <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-bone/50">
                  {profile.role}
                </div>
              </div>
            </div>
            <button
              onClick={copyLink}
              data-cursor
              className="flex items-center gap-2 rounded-full border border-bone/15 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.18em] text-bone/70 transition-colors hover:border-bone/40 hover:text-bone"
            >
              {copied ? 'Copied ✓' : 'Share ↗'}
            </button>
          </div>
        </div>
      </header>

      {/* Body */}
      <div className="px-5 pb-20 md:px-10">
        <div className="mx-auto max-w-3xl">
          <ArticleBody content={post.content} accent={accent} />
        </div>
      </div>

      {/* CTA */}
      <div className="px-5 pb-16 md:px-10">
        <div className="mx-auto flex max-w-3xl flex-col items-start gap-5 rounded-3xl border border-bone/10 bg-bone/[0.02] p-7 md:flex-row md:items-center md:justify-between md:p-8">
          <div>
            <h3 className="font-display text-2xl leading-tight md:text-3xl">
              Building something like this?
            </h3>
            <p className="mt-2 max-w-md text-sm text-bone/70">
              I take a few 1:1 sessions a month on agentic AI and system design.
            </p>
          </div>
          <a
            href={consult.bookHref}
            target="_blank"
            rel="noreferrer"
            data-cursor
            className="btn btn-primary shrink-0"
          >
            <span>Book a 1:1 call</span>
            <span aria-hidden>↗</span>
          </a>
        </div>
      </div>

      {/* Prev / Next */}
      <nav className="border-t border-bone/10 px-5 py-10 md:px-10">
        <div className="mx-auto grid max-w-3xl grid-cols-1 gap-4 md:grid-cols-2">
          {prev ? (
            <Link
              to={`/journal/${prev.slug}`}
              data-cursor
              className="group rounded-2xl border border-bone/10 bg-bone/[0.02] p-5 transition-colors hover:border-bone/30"
            >
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-bone/45">
                ← Previous
              </div>
              <div className="mt-2 font-display text-lg leading-snug text-bone/90 group-hover:text-white">
                {prev.title}
              </div>
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link
              to={`/journal/${next.slug}`}
              data-cursor
              className="group rounded-2xl border border-bone/10 bg-bone/[0.02] p-5 text-right transition-colors hover:border-bone/30"
            >
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-bone/45">
                Next →
              </div>
              <div className="mt-2 font-display text-lg leading-snug text-bone/90 group-hover:text-white">
                {next.title}
              </div>
            </Link>
          ) : (
            <span />
          )}
        </div>
      </nav>
    </article>
  );
}
