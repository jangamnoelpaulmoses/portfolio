import { skills } from '../data/content';

const flat = Object.values(skills).flat();

const Star = () => (
  <svg
    viewBox="0 0 24 24"
    aria-hidden
    className="h-4 w-4 shrink-0 text-accent md:h-5 md:w-5"
    fill="currentColor"
  >
    <path d="M12 2l2.39 6.96L22 9.27l-5.91 4.3L18 22l-6-4.5L6 22l1.91-8.43L2 9.27l7.61-.31L12 2z" />
  </svg>
);

export default function Marquee() {
  const items = [...flat, ...flat]; // duplicate for seamless loop
  return (
    <div className="relative overflow-hidden border-y border-bone/10 bg-ink-950 py-6">
      <div className="marquee gap-10 px-6 md:gap-16">
        {items.map((s, i) => (
          <div
            key={i}
            className="flex items-center gap-6 font-display text-3xl text-bone md:gap-8 md:text-5xl"
          >
            <span className="whitespace-nowrap">{s}</span>
            <Star />
          </div>
        ))}
      </div>
    </div>
  );
}
