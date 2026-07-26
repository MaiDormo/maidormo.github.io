import { useEffect, useRef } from 'react';

/**
 * Thin emerald read-progress line pinned to the top of the viewport.
 *
 * Deliberately does not hold progress in React state: scroll fires far more
 * often than once a frame, and a re-render per event is the one thing on this
 * page that can jank a slow device. Instead the bar is written directly, at
 * most once per frame, as a compositor-only scaleX.
 */
export const ScrollProgress = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let raf = 0;

    const apply = () => {
      raf = 0;
      const el = ref.current;
      if (!el) return;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const progress =
        max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      el.style.transform = `scaleX(${progress})`;
    };

    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(apply);
    };

    apply();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);

    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="fixed top-0 left-0 z-60 h-px w-full origin-left bg-emerald-500"
      style={{
        transform: 'scaleX(0)',
        boxShadow: '0 0 8px rgba(16,185,129,.6)',
      }}
    />
  );
};
