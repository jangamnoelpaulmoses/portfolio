import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { projects } from '../data/content';

function ProjectCard({ p, i }) {
  const ref = useRef(null);
  const onMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty('--mx', `${e.clientX - r.left}px`);
    el.style.setProperty('--my', `${e.clientY - r.top}px`);
  };

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.08, 0.96]);

  return (
    <motion.a
      ref={ref}
      onMouseMove={onMove}
      href={p.link}
      target="_blank"
      rel="noreferrer"
      data-cursor
      style={{ y }}
      className={`project-card group relative flex flex-col gap-6 p-6 md:p-8 ${
        [7, 5, 5, 7, 7, 5][i % 6] === 7
          ? 'md:col-span-7'
          : 'md:col-span-5'
      }`}
    >
      <div className="relative z-10 flex items-start justify-between font-mono text-[10px] uppercase tracking-[0.22em] text-bone/55">
        <span>
          ({String(i + 1).padStart(2, '0')}) — {p.year}
        </span>
        <span className="flex items-center gap-1 transition-transform group-hover:translate-x-1">
          Visit ↗
        </span>
      </div>

      <div className="relative z-10 overflow-hidden rounded-2xl border border-bone/10 bg-ink-900">
        <motion.img
          src={p.image}
          alt={p.title}
          loading="lazy"
          style={{ scale: imageScale }}
          className="aspect-[16/10] w-full object-cover transition-[filter] duration-500 group-hover:saturate-150"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950/40 via-transparent to-transparent" />
      </div>

      <div className="relative z-10 flex flex-col gap-3">
        <h3 className="font-display text-2xl leading-tight tracking-tight md:text-3xl">
          {p.title}
        </h3>
        <p className="text-sm text-bone/75 md:text-base">{p.blurb}</p>
        <ul className="flex flex-wrap gap-2 pt-1">
          {p.tags.map((t) => (
            <li
              key={t}
              className="rounded-full border border-bone/10 px-2.5 py-0.5 text-[11px] text-bone/65"
            >
              {t}
            </li>
          ))}
        </ul>
      </div>
    </motion.a>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="section relative">
      <div className="mx-auto max-w-7xl">
        <div className="flex items-end justify-between">
          <div>
            <span className="eyebrow">04 · Projects</span>
            <h2 className="mt-4 font-display text-4xl leading-[0.95] tracking-tightest md:text-7xl">
              Selected
              <br />
              <span className="grad-text">digital creations.</span>
            </h2>
          </div>
          <p className="hidden max-w-xs text-sm text-bone/70 md:block">
            From agentic AI and healthcare imaging to large-scale AWS APIs —
            recent artifacts of work I’m proud of.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-12 md:gap-8">
          {projects.map((p, i) => (
            <ProjectCard key={p.title} p={p} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
