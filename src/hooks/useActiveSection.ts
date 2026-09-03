import { useEffect, useState } from 'react';

/**
 * Id of the last section whose top has scrolled past `offset` pixels from the
 * viewport top, or null above the first one. Measured at most once a frame
 * from a passive scroll listener; `ids` must be a stable reference.
 */
export const useActiveSection = (
  ids: readonly string[],
  offset = 160,
): string | null => {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    let raf = 0;

    const measure = () => {
      raf = 0;
      let current: string | null = null;
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= offset) current = id;
      }
      setActive(current);
    };

    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);

    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
    };
  }, [ids, offset]);

  return active;
};
