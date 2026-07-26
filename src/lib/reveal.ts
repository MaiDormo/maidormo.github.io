const EASE = 'cubic-bezier(.16,1,.3,1)';

let io: IntersectionObserver | null = null;

const reduced = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** Children that should cascade in, if the element declares a stagger box. */
function kids(el: HTMLElement): HTMLElement[] {
  const box = el.matches('[data-stagger]')
    ? el
    : el.querySelector<HTMLElement>('[data-stagger]');
  return box ? (Array.from(box.children) as HTMLElement[]) : [];
}

function observer(): IntersectionObserver {
  if (io) return io;
  io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const el = entry.target as HTMLElement;
        el.style.animation = `fadeUp .5s ${EASE} both`;
        kids(el).forEach((child, i) => {
          child.style.animation = `fadeUp .5s ${EASE} ${0.09 + i * 0.055}s both`;
        });
        io?.unobserve(el);
      }
    },
    { rootMargin: '0px 0px -8% 0px' },
  );
  return io;
}

/** Arm every un-armed [data-reveal] in the tree. Safe to call on each render. */
export function scanReveal(root: ParentNode = document): void {
  if (reduced()) return;
  root.querySelectorAll<HTMLElement>('[data-reveal]').forEach((el) => {
    if (el.dataset.revealed) return;
    el.dataset.revealed = '1';
    el.style.opacity = '0';
    kids(el).forEach((child) => {
      child.style.opacity = '0';
    });
    observer().observe(el);
  });
}

/** Force an element to its final visible state (used before a FLIP move). */
export function skipReveal(el: HTMLElement): void {
  el.dataset.revealed = '1';
  el.style.animation = 'none';
  el.style.opacity = '1';
  kids(el).forEach((child) => {
    child.style.animation = 'none';
    child.style.opacity = '1';
  });
}

export const REVEAL_EASE = EASE;
export const prefersReducedMotion = reduced;
