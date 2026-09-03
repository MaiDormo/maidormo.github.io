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

/**
 * Mark an element as on screen. CSS keys off `data-shown` for anything that
 * cannot be driven from an inline style, such as the ::before hairline that
 * draws in with the entry.
 */
function show(el: HTMLElement): void {
  el.dataset.shown = '1';
}

function observer(): IntersectionObserver {
  if (io) return io;
  io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const el = entry.target as HTMLElement;
        el.style.animation = `fadeUp .55s ${EASE} both`;
        show(el);
        kids(el).forEach((child, i) => {
          child.style.animation = `fadeUp .55s ${EASE} ${0.08 + i * 0.05}s both`;
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
