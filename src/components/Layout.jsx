import { Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import useLenis, { getLenis } from '../lib/useLenis';
import Cursor from './Cursor';
import Nav from './Nav';
import Footer from './Footer';

// Reset scroll position on every route change. Lenis caches its own scroll
// value, so we have to tell it explicitly — window.scrollTo alone won't do it.
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    const lenis = getLenis();
    if (lenis) lenis.scrollTo(0, { immediate: true });
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function Layout() {
  useLenis();

  return (
    <div className="vignette relative">
      <Cursor />
      <Nav />
      <ScrollToTop />
      <main>
        <Outlet />
      </main>
      <Footer />
      <div className="grain" />
    </div>
  );
}
