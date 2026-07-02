import { useEffect, useRef, useState } from 'react';

export default function Cursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) {
      setHidden(true);
      return;
    }

    const dot = dotRef.current;
    const ring = ringRef.current;
    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let rx = mx;
    let ry = my;
    let raf;
    let hovering = false;

    function onMove(e) {
      mx = e.clientX;
      my = e.clientY;

      const target = e.target;
      const interactive =
        target?.closest?.(
          'a, button, [data-cursor], [role="button"], input, textarea'
        );
      if (interactive && !hovering) {
        hovering = true;
        ring.classList.add('cursor-ring--hover');
      } else if (!interactive && hovering) {
        hovering = false;
        ring.classList.remove('cursor-ring--hover');
      }
    }

    function loop() {
      rx += (mx - rx) * 0.16;
      ry += (my - ry) * 0.16;
      dot.style.transform = `translate3d(${mx}px, ${my}px, 0) translate(-50%, -50%)`;
      ring.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%)`;
      raf = requestAnimationFrame(loop);
    }

    function onLeave() {
      dot.style.opacity = '0';
      ring.style.opacity = '0';
    }
    function onEnter() {
      dot.style.opacity = '1';
      ring.style.opacity = '1';
    }

    window.addEventListener('mousemove', onMove);
    document.addEventListener('mouseleave', onLeave);
    document.addEventListener('mouseenter', onEnter);
    loop();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onLeave);
      document.removeEventListener('mouseenter', onEnter);
    };
  }, []);

  if (hidden) return null;

  return (
    <>
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[200] h-1.5 w-1.5 rounded-full bg-bone mix-blend-difference"
      />
      <div
        ref={ringRef}
        className="cursor-ring pointer-events-none fixed left-0 top-0 z-[199] h-9 w-9 rounded-full border border-bone/50 mix-blend-difference transition-[width,height,border-color] duration-300"
      />
      <style>{`
        .cursor-ring--hover {
          width: 64px !important;
          height: 64px !important;
          border-color: rgba(244,241,234,0.85) !important;
        }
      `}</style>
    </>
  );
}
