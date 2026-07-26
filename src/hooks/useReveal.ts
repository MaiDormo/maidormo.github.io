import { useLayoutEffect } from 'react';
import { scanReveal } from '../lib/reveal';

/**
 * Arms scroll-reveal for anything currently in the DOM.
 * Pass deps that change when new [data-reveal] nodes appear.
 *
 * Layout effect, not effect: scanReveal sets opacity:0, and it has to land
 * before the browser paints. On useEffect the content paints visible for a
 * frame first, then snaps to hidden — a flash that reads as a broken load.
 */
export const useReveal = (deps: unknown[] = []): void => {
  useLayoutEffect(() => {
    scanReveal();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
};
