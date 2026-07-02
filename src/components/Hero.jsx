import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import HeroShader from '../three/HeroShader';
import { profile } from '../data/content';

const splitWord = (word) =>
  word.split('').map((c, i) => (
    <motion.span
      key={i}
      initial={{ y: '110%' }}
      animate={{ y: 0 }}
      transition={{
        duration: 1,
        delay: 1.5 + i * 0.04,
        ease: [0.85, 0, 0.15, 1],
      }}
      className="inline-block"
    >
      {c === ' ' ? ' ' : c}
    </motion.span>
  ));

export default function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section
      id="top"
      ref={ref}
      className="relative h-screen w-full overflow-hidden"
    >
      <div className="absolute inset-0">
        <HeroShader />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-ink-950/80" />

      <motion.div
        style={{ y, opacity }}
        className="relative z-10 flex h-full flex-col justify-end px-5 pb-10 md:px-10 md:pb-14"
      >
        <div className="mb-auto pt-32 md:pt-40">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.4 }}
            className="flex flex-wrap items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em] text-bone/60"
          >
            <span className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="absolute inset-0 animate-ping rounded-full bg-accent-lime opacity-70" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-lime" />
              </span>
              Available · Q2 2026
            </span>
            <span className="text-bone/30">/</span>
            <span>San Jose · Tempe</span>
          </motion.div>
        </div>

        <h1 className="font-display leading-[0.85] tracking-tightest text-bone">
          <span className="block overflow-hidden text-[16vw] md:text-[11vw]">
            {splitWord('Noel Paul')}
          </span>
          <span className="block overflow-hidden text-[16vw] md:text-[11vw]">
            <span className="grad-text">{splitWord('Moses J.')}</span>
          </span>
        </h1>

        <div className="mt-8 grid grid-cols-1 items-end gap-6 md:grid-cols-12 md:gap-10">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 2.4 }}
            className="md:col-span-5 max-w-md text-base text-bone/80 md:text-lg"
          >
            {profile.tagline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 2.6 }}
            className="md:col-span-3 md:col-start-9 flex flex-wrap items-center gap-3"
          >
            <a href="#work" className="btn btn-primary" data-cursor>
              <span>See selected work</span>
              <span aria-hidden>→</span>
            </a>
            <a
              href={`mailto:${profile.email}`}
              className="btn"
              data-cursor
            >
              <span>Get in touch</span>
            </a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 3 }}
          className="mt-12 flex items-end justify-between border-t border-bone/10 pt-5"
        >
          <div className="flex flex-wrap gap-x-8 gap-y-2 font-mono text-[10px] uppercase tracking-[0.22em] text-bone/55">
            {profile.highlights.map((h) => (
              <div key={h.label} className="flex items-baseline gap-2">
                <span className="font-display text-2xl text-bone">
                  {h.value}
                </span>
                <span>{h.sub}</span>
              </div>
            ))}
          </div>
          <a
            href="#about"
            className="hidden items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-bone/60 md:flex"
            data-cursor
          >
            Scroll
            <span className="inline-block h-8 w-px overflow-hidden bg-bone/20">
              <motion.span
                animate={{ y: ['-100%', '100%'] }}
                transition={{
                  repeat: Infinity,
                  duration: 1.6,
                  ease: 'easeInOut',
                }}
                className="block h-full w-px bg-bone"
              />
            </span>
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
