import { motion } from 'framer-motion';
import { testimonials } from '../data/content';

export default function Testimonials() {
  return (
    <section className="section relative overflow-hidden">
      <div className="mx-auto max-w-7xl">
        <div className="flex items-end justify-between">
          <div>
            <span className="eyebrow">05 · Words</span>
            <h2 className="mt-4 font-display text-4xl leading-[0.95] tracking-tightest md:text-6xl">
              Trusted by
              <br />
              <span className="grad-text">teammates I’ve shipped with.</span>
            </h2>
          </div>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <motion.a
              key={t.name}
              href={t.href}
              target="_blank"
              rel="noreferrer"
              data-cursor
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, delay: i * 0.08 }}
              className="group relative flex flex-col justify-between rounded-3xl border border-bone/10 bg-bone/[0.02] p-7 transition-colors hover:border-accent/40 md:p-8"
            >
              <span
                aria-hidden
                className="font-display text-7xl leading-none text-accent/60"
              >
                “
              </span>
              <p className="mt-3 text-base leading-relaxed text-bone/85 md:text-lg">
                {t.quote}
              </p>
              <div className="mt-8 flex items-center gap-3 border-t border-bone/10 pt-5">
                <img
                  src={t.image}
                  alt={t.name}
                  className="h-10 w-10 rounded-full object-cover"
                />
                <div>
                  <p className="font-display text-base">{t.name}</p>
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-bone/55">
                    {t.title}
                  </p>
                </div>
                <span className="ml-auto translate-x-0 text-xs text-bone/55 transition-transform group-hover:translate-x-1">
                  ↗
                </span>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
