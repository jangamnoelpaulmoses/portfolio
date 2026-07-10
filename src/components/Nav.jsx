import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { navLinks, profile, consult } from '../data/content';
import { getLenis } from '../lib/useLenis';

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const onHome = location.pathname === '/';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToHash = (href) => {
    const el = document.querySelector(href === '#top' ? 'body' : href);
    const lenis = getLenis();
    if (lenis && el) {
      lenis.scrollTo(el, { offset: href === '#top' ? -200 : 0, duration: 1.4 });
    } else if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const go = (link) => (e) => {
    e.preventDefault();
    setOpen(false);
    if (link.to) {
      navigate(link.to);
      return;
    }
    // hash section link
    if (!onHome) {
      navigate('/');
      // wait for Home to mount before scrolling to the section
      setTimeout(() => scrollToHash(link.href), 140);
    } else {
      scrollToHash(link.href);
    }
  };

  const goHome = (e) => {
    e.preventDefault();
    setOpen(false);
    if (onHome) scrollToHash('#top');
    else navigate('/');
  };

  return (
    <>
      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, delay: onHome ? 1.2 : 0.1 }}
        className={`fixed inset-x-0 top-0 z-[70] flex items-center justify-between px-5 py-4 transition-colors duration-500 md:px-10 ${
          scrolled || !onHome ? 'bg-ink-950/60 backdrop-blur-md' : 'bg-transparent'
        }`}
      >
        <Link
          to="/"
          onClick={goHome}
          className="group flex items-center gap-3"
          data-cursor
        >
          <span className="relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-bone/20">
            <span className="absolute inset-0 bg-gradient-to-br from-accent to-accent-hot opacity-70 transition-opacity duration-500 group-hover:opacity-100" />
            <span className="relative font-display text-sm text-bone">N</span>
          </span>
          <span className="hidden flex-col leading-tight md:flex">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-bone/50">
              {profile.role}
            </span>
            <span className="font-display text-sm text-bone">{profile.shortName}</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((l) => {
            const active = l.to && location.pathname.startsWith(l.to);
            return (
              <a
                key={l.label}
                href={l.to || l.href}
                onClick={go(l)}
                data-cursor
                className={`group relative font-mono text-[11px] uppercase tracking-[0.18em] transition-colors hover:text-bone ${
                  active ? 'text-bone' : 'text-bone/70'
                }`}
              >
                <span className="mr-1 text-bone/35">{l.no}</span>
                {l.label}
                {active && (
                  <span className="absolute -bottom-1.5 left-0 h-px w-full bg-accent" />
                )}
              </a>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={profile.resume}
            target="_blank"
            rel="noreferrer"
            data-cursor
            className="btn"
          >
            <span>Resume</span>
            <span aria-hidden>↗</span>
          </a>
          <button
            data-cursor
            onClick={() => setOpen((o) => !o)}
            className="grid h-10 w-10 place-items-center rounded-full border border-bone/15 md:hidden"
            aria-label="Open menu"
          >
            <span className="relative block h-3 w-4">
              <span
                className={`absolute left-0 top-0 h-px w-full bg-bone transition-transform ${
                  open ? 'translate-y-1.5 rotate-45' : ''
                }`}
              />
              <span
                className={`absolute bottom-0 left-0 h-px w-full bg-bone transition-transform ${
                  open ? '-translate-y-1.5 -rotate-45' : ''
                }`}
              />
            </span>
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ y: '-100%' }}
            animate={{ y: 0 }}
            exit={{ y: '-100%' }}
            transition={{ duration: 0.6, ease: [0.85, 0, 0.15, 1] }}
            className="fixed inset-0 z-[60] flex flex-col bg-ink-950 px-6 pt-24 md:hidden"
          >
            <ul className="flex flex-col gap-6">
              {navLinks.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.to || l.href}
                    onClick={go(l)}
                    className="flex items-baseline gap-3 font-display text-5xl leading-none"
                  >
                    <span className="font-mono text-xs text-bone/40">{l.no}</span>
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
            <a
              href={consult.bookHref}
              target="_blank"
              rel="noreferrer"
              className="btn btn-primary mt-10 w-fit"
            >
              <span>Book a 1:1 call</span>
              <span aria-hidden>↗</span>
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
