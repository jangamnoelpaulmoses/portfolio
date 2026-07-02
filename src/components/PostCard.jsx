import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { formatDate } from '../data/blog';

export default function PostCard({ post, index = 0, large = false }) {
  const onMove = (e) => {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    el.style.setProperty('--mx', `${e.clientX - r.left}px`);
    el.style.setProperty('--my', `${e.clientY - r.top}px`);
  };

  return (
    <motion.div
      className="h-full"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.7, delay: (index % 3) * 0.08 }}
    >
      <Link
        to={`/journal/${post.slug}`}
        onMouseMove={onMove}
        data-cursor
        style={{ '--jc': post.accent }}
        className={`journal-card group relative flex h-full flex-col gap-5 p-6 md:p-8 ${
          large ? 'md:gap-7' : ''
        }`}
      >
        {post.cover && (
          <div className="relative z-10 -mx-6 -mt-6 mb-1 overflow-hidden rounded-t-[inherit] md:-mx-8 md:-mt-8">
            <img
              src={post.cover}
              alt=""
              loading="lazy"
              className="aspect-[16/9] w-full object-cover"
            />
          </div>
        )}
        <div className="relative z-10 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.22em] text-bone/55">
          <span
            className="rounded-full border px-2.5 py-1"
            style={{
              borderColor: `${post.accent}55`,
              color: post.accent,
            }}
          >
            {post.category}
          </span>
          <span>{formatDate(post.date)}</span>
        </div>

        <div className="relative z-10 flex flex-1 flex-col gap-3">
          <h3
            className={`font-display leading-[1.05] tracking-tight transition-colors group-hover:text-white ${
              large ? 'text-3xl md:text-5xl' : 'text-2xl md:text-[28px]'
            }`}
          >
            {post.title}
          </h3>
          <p
            className={`text-bone/70 ${
              large ? 'text-base md:text-lg md:max-w-2xl' : 'text-sm md:text-[15px]'
            }`}
          >
            {post.excerpt}
          </p>
        </div>

        <div className="relative z-10 flex items-center justify-between border-t border-bone/10 pt-4 font-mono text-[10px] uppercase tracking-[0.22em] text-bone/50">
          <span>{post.readMins} min read</span>
          <span className="flex items-center gap-1.5 text-bone/80 transition-transform group-hover:translate-x-1">
            Read
            <span aria-hidden>→</span>
          </span>
        </div>
      </Link>
    </motion.div>
  );
}
