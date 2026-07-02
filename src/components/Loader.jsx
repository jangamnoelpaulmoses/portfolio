import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

// Module-scoped so the intro only plays on the very first load — not every
// time the user navigates back to "/" from the Journal.
let hasPlayed = false;

export default function Loader({ onDone }) {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(hasPlayed);

  useEffect(() => {
    if (hasPlayed) {
      onDone?.();
      return;
    }
    document.body.classList.add('no-scroll');
    let p = 0;
    const id = setInterval(() => {
      p += Math.random() * 8 + 4;
      if (p >= 100) {
        p = 100;
        clearInterval(id);
        setProgress(100);
        setTimeout(() => {
          document.body.classList.remove('no-scroll');
          hasPlayed = true;
          setDone(true);
          onDone?.();
        }, 650);
      } else {
        setProgress(p);
      }
    }, 80);
    return () => clearInterval(id);
  }, [onDone]);

  if (done) return null;

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[120] flex flex-col justify-between bg-ink-950 px-6 py-8 md:px-12 md:py-10"
          initial={{ y: 0 }}
          exit={{ y: '-100%' }}
          transition={{ duration: 0.9, ease: [0.85, 0, 0.15, 1] }}
        >
          <div className="flex items-start justify-between font-mono text-xs uppercase tracking-[0.2em] text-bone/60">
            <span>Noel Paul Moses Jangam</span>
            <span>Portfolio · 2026</span>
          </div>

          <div className="flex flex-col gap-6">
            <motion.div
              className="font-display text-[14vw] leading-[0.85] tracking-tightest text-bone md:text-[10vw]"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              <span className="grad-text">Noel.</span>
            </motion.div>
            <div className="flex items-end justify-between gap-6 font-mono text-xs uppercase tracking-[0.2em] text-bone/60">
              <span>AI Software Engineer · Full Stack · 3D</span>
              <span>{Math.floor(progress).toString().padStart(3, '0')}</span>
            </div>
            <div className="relative h-[2px] w-full bg-bone/10">
              <motion.div
                className="absolute inset-y-0 left-0 bg-bone"
                style={{ width: `${progress}%` }}
                transition={{ ease: 'linear' }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
