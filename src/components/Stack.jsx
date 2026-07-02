import { Suspense } from 'react';
import TechSphere from '../three/TechSphere';
import { skills } from '../data/content';

export default function Stack() {
  return (
    <section id="stack" className="section relative overflow-hidden">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-14 md:grid-cols-12">
        <div className="md:col-span-5">
          <span className="eyebrow">03 · Stack</span>
          <h2 className="mt-4 font-display text-4xl leading-[0.95] tracking-tightest md:text-6xl">
            Tools I trust,
            <br />
            <span className="grad-text">opinions I’ve earned.</span>
          </h2>
          <p className="mt-6 max-w-md text-base text-bone/70 md:text-lg">
            Four years across Java, C++, AWS, and the modern JS/TS stack — from
            real-time data pipelines to production-grade frontends. Drag the
            sphere; the stack follows.
          </p>

          <div className="mt-10 grid gap-6">
            {Object.entries(skills).map(([cat, list]) => (
              <div key={cat}>
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-bone/45">
                  {cat}
                </p>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {list.map((s) => (
                    <li
                      key={s}
                      className="rounded-full border border-bone/10 bg-bone/[0.02] px-3 py-1 text-xs text-bone/80"
                    >
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="md:col-span-7">
          <div className="relative aspect-square w-full overflow-hidden rounded-3xl border border-bone/10 bg-bone/[0.015]">
            <Suspense fallback={null}>
              <TechSphere />
            </Suspense>
            <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between p-5 font-mono text-[10px] uppercase tracking-[0.22em] text-bone/55">
              <span>Drag to rotate</span>
              <span>v1 · 2026</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
