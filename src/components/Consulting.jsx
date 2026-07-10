import { motion } from 'framer-motion';
import { consult } from '../data/content';

export default function Consulting() {
  return (
    <section id="consulting" className="section relative overflow-hidden">
      {/* ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[820px] -translate-x-1/2 rounded-full opacity-20 blur-[140px]"
        style={{ background: 'radial-gradient(circle, #7c5cff, transparent 70%)' }}
      />

      <div className="relative mx-auto max-w-7xl">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="eyebrow">Work with me</span>
            <h2 className="mt-4 font-display text-4xl leading-[0.95] tracking-tightest md:text-7xl">
              Stuck shipping
              <br />
              <span className="grad-text">AI to production?</span>
            </h2>
          </div>
          <p className="md:max-w-sm text-sm text-bone/70 md:text-base">
            {consult.blurb}
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-3 md:gap-6">
          {consult.offerings.map((o, i) => (
            <motion.div
              key={o.title}
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className="group relative flex flex-col gap-4 overflow-hidden rounded-3xl border border-bone/10 bg-bone/[0.02] p-7 transition-colors hover:border-bone/25"
            >
              <span
                aria-hidden
                className="absolute inset-x-0 top-0 h-px opacity-60"
                style={{ background: `linear-gradient(90deg, transparent, ${o.accent}, transparent)` }}
              />
              <div className="flex items-center justify-between">
                <span
                  className="flex h-10 w-10 items-center justify-center rounded-xl border text-lg"
                  style={{ borderColor: `${o.accent}55`, color: o.accent }}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-bone/55">
                  {o.duration}
                </span>
              </div>
              <h3 className="font-display text-xl leading-tight md:text-2xl">
                {o.title}
              </h3>
              <p className="text-sm leading-relaxed text-bone/70">{o.desc}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-10 flex flex-col items-start gap-5 rounded-3xl border border-bone/10 bg-bone/[0.02] p-7 md:flex-row md:items-center md:justify-between md:p-9">
          <div className="flex items-center gap-4">
            {consult.available && (
              <span className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-bone/70">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inset-0 animate-ping rounded-full bg-accent-lime opacity-70" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-lime" />
                </span>
                Taking a few sessions this month
              </span>
            )}
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <a
              href={consult.bookHref}
              target="_blank"
              rel="noreferrer"
              data-cursor
              className="btn btn-primary"
            >
              <span>Book a 1:1 call</span>
              <span aria-hidden>↗</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
