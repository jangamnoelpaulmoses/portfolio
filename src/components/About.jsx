import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { profile, services } from '../data/content';

const iconMap = {
  briefcase: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
      <rect x="3" y="7" width="18" height="13" rx="2" />
      <path d="M9 7V5a2 2 0 012-2h2a2 2 0 012 2v2M3 13h18" />
    </svg>
  ),
  code: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
      <path d="M16 18l6-6-6-6M8 6l-6 6 6 6M14 4l-4 16" />
    </svg>
  ),
  cap: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
      <path d="M22 10L12 5 2 10l10 5 10-5z" />
      <path d="M6 12v5a6 6 0 0012 0v-5" />
    </svg>
  ),
  spark: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
      <path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1" />
    </svg>
  ),
};

export default function About() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const portraitY = useTransform(scrollYProgress, [0, 1], [60, -120]);
  const portraitScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.92, 1, 1.04]);
  const dialY = useTransform(scrollYProgress, [0, 1], [120, -120]);

  const sentences = profile.summary.split(/(?<=[.!?])\s+/);

  return (
    <section
      id="about"
      ref={ref}
      className="section relative overflow-hidden"
    >
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-14 md:grid-cols-12 md:gap-12">
        <div className="md:col-span-5">
          <span className="eyebrow">01 · About</span>
          <motion.div
            style={{ y: portraitY, scale: portraitScale }}
            className="relative mt-8 aspect-[4/5] overflow-hidden rounded-3xl"
          >
            <img
              src={profile.portrait}
              alt={profile.name}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink-950/70 via-transparent to-transparent" />
            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-5 font-mono text-[10px] uppercase tracking-[0.2em] text-bone">
              <span>{profile.name}</span>
              <span>· 2026</span>
            </div>
          </motion.div>
          <motion.div
            style={{ y: dialY }}
            aria-hidden
            className="pointer-events-none absolute -left-32 top-32 hidden h-72 w-72 rounded-full border border-accent/30 md:block"
          />
        </div>

        <div className="md:col-span-7">
          <h2 className="font-display text-5xl leading-[0.95] tracking-tightest md:text-7xl">
            Engineer who ships <span className="grad-text">scalable software</span>
            <span className="text-bone/40"> — and obsesses over the details.</span>
          </h2>

          <div className="mt-10 grid gap-4 text-bone/80 md:max-w-xl">
            {sentences.map((s, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.8, delay: i * 0.08 }}
                className="text-base leading-relaxed md:text-lg"
              >
                {s}
              </motion.p>
            ))}
          </div>

          <div className="mt-12 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {services.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: i * 0.06 }}
                className="group relative flex items-start gap-4 rounded-2xl border border-bone/10 bg-bone/[0.02] p-5 transition-colors hover:border-accent/40"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-bone/10 bg-bone/[0.03] text-bone/80 transition-colors group-hover:text-accent">
                  <span className="h-5 w-5">{iconMap[s.icon]}</span>
                </span>
                <span className="text-sm leading-snug text-bone/85">
                  {s.title}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
