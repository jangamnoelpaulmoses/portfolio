import { Suspense } from 'react';
import Earth from '../three/Earth';
import { profile } from '../data/content';

export default function Contact() {
  return (
    <section id="contact" className="section relative overflow-hidden">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-stretch gap-10 md:grid-cols-12">
        <div className="md:col-span-7">
          <span className="eyebrow">06 · Contact</span>
          <h2 className="mt-4 font-display text-5xl leading-[0.92] tracking-tightest md:text-[8vw]">
            Let’s build the
            <br />
            <span className="grad-text">next thing.</span>
          </h2>
          <p className="mt-6 max-w-md text-base text-bone/75 md:text-lg">
            Open to senior / staff roles, founding engineering positions, and
            high-leverage contract work. Currently shipping medical imaging at
            Naviget.
          </p>

          <div className="mt-10 grid gap-3">
            <a
              href={`mailto:${profile.email}`}
              data-cursor
              className="group flex items-center justify-between rounded-2xl border border-bone/10 bg-bone/[0.02] px-5 py-5 transition-colors hover:border-accent/40 md:px-6 md:py-6"
            >
              <div className="flex flex-col">
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-bone/55">
                  Direct line
                </span>
                <span className="font-display text-2xl md:text-3xl">
                  {profile.email}
                </span>
              </div>
              <span className="text-2xl transition-transform group-hover:translate-x-1 group-hover:-translate-y-1">
                ↗
              </span>
            </a>

            <div className="grid grid-cols-2 gap-3">
              {profile.socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  data-cursor
                  className="flex items-center justify-between rounded-2xl border border-bone/10 bg-bone/[0.02] px-4 py-4 transition-colors hover:border-accent/40"
                >
                  <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-bone/80">
                    {s.label}
                  </span>
                  <span className="text-lg">↗</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="md:col-span-5">
          <div className="relative h-[420px] w-full overflow-hidden rounded-3xl border border-bone/10 bg-bone/[0.015] md:h-full">
            <Suspense fallback={null}>
              <Earth />
            </Suspense>
            <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between p-5 font-mono text-[10px] uppercase tracking-[0.22em] text-bone/55">
              <span>Worldwide · remote-friendly</span>
              <span>·</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
