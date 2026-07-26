import { useEffect } from 'react';

/**
 * Shared scroll-velocity signal, read every frame by MatrixField.
 * Kept in a module-level ref so the canvas never re-renders React on scroll.
 */
const boost = { value: 0, lastY: 0 };

/** Refcounted so StrictMode's mount/unmount/mount cannot leave us unbound. */
let subscribers = 0;
let detach: (() => void) | null = null;

export function readBoost(): number {
  return boost.value;
}

export function decayBoost(factor = 0.9): void {
  boost.value *= factor;
}

/**
 * Drop the accumulated velocity. Only the animation loop decays the boost, so
 * a paused loop would otherwise resume with a full 1.7 surge banked up from
 * whatever scrolling happened while it was off screen.
 */
export function resetBoost(): void {
  boost.value = 0;
  boost.lastY = typeof window === 'undefined' ? 0 : window.scrollY;
}

export const useScrollBoost = (): void => {
  useEffect(() => {
    if (subscribers === 0) {
      const onScroll = () => {
        const y = window.scrollY;
        boost.value = Math.min(
          1.7,
          boost.value + Math.abs(y - boost.lastY) * 0.013,
        );
        boost.lastY = y;
      };
      boost.lastY = window.scrollY;
      window.addEventListener('scroll', onScroll, { passive: true });
      detach = () => window.removeEventListener('scroll', onScroll);
    }
    subscribers += 1;

    return () => {
      subscribers -= 1;
      if (subscribers === 0) {
        detach?.();
        detach = null;
      }
    };
  }, []);
};
