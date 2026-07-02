import { motion } from 'framer-motion';

const reveal = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.4 },
  transition: { duration: 0.6 },
};

function Block({ block, accent }) {
  switch (block.t) {
    case 'lead':
      return (
        <motion.p
          {...reveal}
          className="text-xl leading-relaxed text-bone/90 md:text-2xl md:leading-relaxed"
        >
          {block.text}
        </motion.p>
      );

    case 'h2':
      return (
        <motion.h2
          {...reveal}
          className="pt-4 font-display text-2xl leading-tight tracking-tight text-bone md:text-4xl"
        >
          {block.text}
        </motion.h2>
      );

    case 'p':
      return (
        <motion.p {...reveal} className="text-base leading-relaxed text-bone/75 md:text-lg md:leading-relaxed">
          {block.text}
        </motion.p>
      );

    case 'ul':
      return (
        <motion.ul {...reveal} className="grid gap-3">
          {block.items.map((it, i) => (
            <li key={i} className="flex gap-3 text-base leading-relaxed text-bone/75 md:text-lg">
              <span
                className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full"
                style={{ background: accent }}
              />
              <span>{it}</span>
            </li>
          ))}
        </motion.ul>
      );

    case 'ol':
      return (
        <motion.ol {...reveal} className="grid gap-3">
          {block.items.map((it, i) => (
            <li key={i} className="flex gap-4 text-base leading-relaxed text-bone/75 md:text-lg">
              <span
                className="font-display text-lg leading-none"
                style={{ color: accent }}
              >
                {String(i + 1).padStart(2, '0')}
              </span>
              <span>{it}</span>
            </li>
          ))}
        </motion.ol>
      );

    case 'quote':
      return (
        <motion.blockquote
          {...reveal}
          className="relative my-2 border-l-2 pl-6 font-display text-2xl leading-snug tracking-tight text-bone md:text-3xl"
          style={{ borderColor: accent }}
        >
          {block.text}
        </motion.blockquote>
      );

    case 'callout':
      return (
        <motion.div
          {...reveal}
          className="relative overflow-hidden rounded-2xl border border-bone/10 bg-bone/[0.03] p-6 md:p-7"
        >
          <span
            aria-hidden
            className="absolute left-0 top-0 h-full w-1"
            style={{ background: accent }}
          />
          {block.label && (
            <div
              className="mb-2 font-mono text-[10px] uppercase tracking-[0.22em]"
              style={{ color: accent }}
            >
              {block.label}
            </div>
          )}
          <p className="text-base leading-relaxed text-bone/85 md:text-lg">{block.text}</p>
        </motion.div>
      );

    case 'code':
      return (
        <motion.pre
          {...reveal}
          className="no-bar overflow-x-auto rounded-2xl border border-bone/10 bg-ink-900 p-5 font-mono text-sm leading-relaxed text-bone/85"
        >
          <code>{block.code}</code>
        </motion.pre>
      );

    case 'divider':
      return <div className="grad-line my-2" />;

    default:
      return null;
  }
}

export default function ArticleBody({ content, accent }) {
  return (
    <div className="flex flex-col gap-7 md:gap-8">
      {content.map((block, i) => (
        <Block key={i} block={block} accent={accent} />
      ))}
    </div>
  );
}
