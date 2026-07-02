import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
} from 'framer-motion';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { experience } from '../data/content';

export default function Experience() {
  const sectionRef = useRef(null);
  const stageRef = useRef(null);
  const trackRef = useRef(null);
  const [travel, setTravel] = useState(0);
  const [active, setActive] = useState(0);

  // Re-measure horizontal travel whenever layout changes
  useLayoutEffect(() => {
    const measure = () => {
      const track = trackRef.current;
      const stage = stageRef.current;
      if (!track || !stage) return;
      const dist = Math.max(0, track.scrollWidth - stage.offsetWidth);
      setTravel(dist);
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (trackRef.current) ro.observe(trackRef.current);
    if (stageRef.current) ro.observe(stageRef.current);
    window.addEventListener('resize', measure);
    window.addEventListener('orientationchange', measure);
    // re-measure once images / fonts have settled
    const timers = [setTimeout(measure, 200), setTimeout(measure, 800)];
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', measure);
      window.removeEventListener('orientationchange', measure);
      timers.forEach(clearTimeout);
    };
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  // 1:1 mapping from scroll progress → translateX. No spring smoothing —
  // Lenis already interpolates the scroll position; layering a spring on top
  // creates double-smoothing that reads as lag/glitch on touch devices.
  const x = useTransform(scrollYProgress, [0, 1], [0, -travel]);

  useMotionValueEvent(scrollYProgress, 'change', (p) => {
    const idx = Math.min(
      experience.length - 1,
      Math.max(0, Math.round(p * (experience.length - 1)))
    );
    setActive((prev) => (prev === idx ? prev : idx));
  });

  // svh (small viewport height) so iOS URL-bar collapse can't change the
  // section height mid-scroll, which used to invalidate `travel` and jump
  // the cards. Mobile gets less scroll path → feels snappier.
  const isShort =
    typeof window !== 'undefined' &&
    window.matchMedia('(max-width: 768px)').matches;
  const sectionHeight = `${(experience.length + 1) * (isShort ? 70 : 90)}svh`;

  return (
    <section
      id="work"
      ref={sectionRef}
      style={{ height: sectionHeight }}
      className="relative bg-ink-950"
    >
      <div className="sticky top-0 flex h-[100svh] flex-col overflow-hidden">
        {/* Header */}
        <div className="flex flex-shrink-0 items-end justify-between px-5 pt-24 md:px-10 md:pt-28">
          <div>
            <span className="eyebrow">02 · Experience</span>
            <h2 className="mt-3 font-display text-3xl leading-[0.92] tracking-tightest md:text-5xl">
              Six chapters,{' '}
              <span className="grad-text">one engineer.</span>
            </h2>
          </div>
          <div className="hidden items-center gap-4 md:flex">
            <div className="flex items-baseline gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-bone/55">
              <span className="font-display text-2xl text-bone">
                {String(active + 1).padStart(2, '0')}
              </span>
              <span>/ {String(experience.length).padStart(2, '0')}</span>
            </div>
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-bone/55">
              Scroll →
            </span>
          </div>
        </div>

        {/* Stage */}
        <div
          ref={stageRef}
          className="relative flex flex-1 items-center overflow-hidden"
        >
          <motion.div
            ref={trackRef}
            style={{
              x,
              // Promote to own GPU layer to keep mobile compositor happy
              transform: 'translateZ(0)',
              willChange: 'transform',
              backfaceVisibility: 'hidden',
            }}
            className="flex h-full items-center gap-5 pl-5 pr-[20vw] md:gap-7 md:pl-10"
          >
            {experience.map((job, i) => {
              const isActive = active === i;
              return (
                <article
                  key={job.company}
                  className={`relative flex h-[58vh] w-[82vw] shrink-0 flex-col justify-between overflow-hidden rounded-3xl border bg-bone/[0.02] p-5 md:h-[62vh] md:w-[58vw] md:p-9 ${
                    isActive ? 'border-bone/30' : 'border-bone/10'
                  }`}
                >
                  <div
                    className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full blur-3xl"
                    style={{
                      background: job.color,
                      opacity: isActive ? 0.32 : 0.14,
                    }}
                  />

                  <div className="relative flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3 md:gap-4">
                      <span className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-2xl border border-bone/10 bg-ink-900 p-1.5 md:h-14 md:w-14 md:p-2">
                        <img
                          src={job.logo}
                          alt={job.company}
                          className="h-full w-full object-contain"
                        />
                      </span>
                      <div>
                        <p className="font-display text-lg leading-tight md:text-2xl">
                          {job.company}
                        </p>
                        <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-bone/55 md:text-[10px]">
                          {job.location}
                        </p>
                      </div>
                    </div>
                    <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-bone/55 md:text-[10px]">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  </div>

                  <div className="relative">
                    <p className="font-display text-xl leading-[1.05] md:text-4xl">
                      {job.role}
                    </p>
                    <p className="mt-1.5 font-mono text-[9px] uppercase tracking-[0.2em] text-bone/55 md:text-[10px]">
                      {job.dates}
                    </p>
                  </div>

                  <ul className="relative grid gap-2 md:gap-2.5 md:max-w-2xl">
                    {job.bullets.map((b, bi) => (
                      <li
                        key={bi}
                        className="flex gap-2.5 text-[12px] leading-relaxed text-bone/80 md:gap-3 md:text-sm"
                      >
                        <span
                          className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full"
                          style={{ background: job.color }}
                        />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              );
            })}

            {/* Closing panel */}
            <article className="flex h-[58vh] w-[70vw] shrink-0 items-center justify-center px-6 md:h-[62vh] md:w-[44vw] md:px-8">
              <p className="max-w-md font-display text-2xl leading-tight text-bone/60 md:text-3xl">
                Always{' '}
                <span className="grad-text">looking for the next chapter</span>{' '}
                — let’s build something together.
              </p>
            </article>
          </motion.div>
        </div>

        {/* Bottom: ticker + progress + mobile pips */}
        <div className="flex flex-shrink-0 flex-col gap-2.5 px-5 pb-6 md:gap-3 md:px-10 md:pb-8">
          <div className="flex items-center justify-between font-mono text-[9px] uppercase tracking-[0.22em] text-bone/55 md:text-[10px]">
            <span className="truncate">
              <span className="text-bone/85">{experience[active].company}</span>
              <span className="mx-2 text-bone/30">·</span>
              {experience[active].dates}
            </span>
            <span className="hidden md:inline">
              {String(active + 1).padStart(2, '0')} of{' '}
              {String(experience.length).padStart(2, '0')}
            </span>
            <span className="md:hidden">
              {String(active + 1).padStart(2, '0')}/
              {String(experience.length).padStart(2, '0')}
            </span>
          </div>
          <div className="relative h-[2px] w-full bg-bone/10">
            <motion.div
              style={{ scaleX: scrollYProgress, transformOrigin: '0% 50%' }}
              className="absolute inset-y-0 left-0 w-full bg-bone"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
