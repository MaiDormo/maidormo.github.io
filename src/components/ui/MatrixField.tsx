import { useEffect, useRef } from 'react';
import {
  decayBoost,
  readBoost,
  resetBoost,
  useScrollBoost,
} from '../../hooks/useScrollBoost';
import { prefersReducedMotion } from '../../lib/reveal';

const COLS = 46;
const ROWS = 34;

/** Resting cells are drawn in this many fixed alpha steps so the paint loop can
 *  batch them: one fillStyle assignment per shade instead of one per cell. */
const SHADES = 6;

/** Half-width of the wavefront, in columns. */
const GLOW = 3.2;

/** A 60fps frame, in ms — the unit `t` advances in. */
const FRAME_MS = 1000 / 60;

type Cell = { x: number; y: number };

const coldFill = (shade: number) =>
  `rgba(113,113,122,${(0.16 + (shade / (SHADES - 1)) * 0.2).toFixed(3)})`;

/**
 * Hero backdrop: a sparse matrix whose SpMV wavefront sweeps left to right.
 * The sweep surges with scroll velocity and settles to a slow drift at rest.
 *
 * The animation loop only runs while the canvas is on screen and the tab is
 * visible — scrolling past the hero stops the work entirely.
 */
export const MatrixField = () => {
  const ref = useRef<HTMLCanvasElement>(null);
  useScrollBoost();

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = Math.min(2, window.devicePixelRatio || 1);
    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = Math.max(1, rect.width * dpr);
      canvas.height = Math.max(1, rect.height * dpr);
    };
    resize();

    // Cells are grouped by shade once, up front, so paint() never has to sort
    // or re-derive a colour string for a resting cell.
    const shades: Cell[][] = Array.from({ length: SHADES }, () => []);
    const shadeFills = Array.from({ length: SHADES }, (_, i) => coldFill(i));
    for (let x = 0; x < COLS; x++) {
      for (let y = 0; y < ROWS; y++) {
        const band = Math.abs(x / COLS - y / ROWS) < 0.055;
        const anti = Math.abs(x / COLS - (1 - y / ROWS)) < 0.03;
        if (band || anti || Math.random() < 0.05) {
          shades[Math.floor(Math.random() * SHADES)].push({ x, y });
        }
      }
    }

    // Reused across frames — the hot set is small and we do not want per-frame
    // array allocation in the paint path.
    const hotCells: Cell[] = [];
    const hotHeat: number[] = [];

    const still = prefersReducedMotion();
    let raf = 0;
    let running = false;
    let last = 0;
    let t = 0;

    const paint = () => {
      const w = canvas.width;
      const h = canvas.height;
      const cw = w / COLS;
      const ch = h / ROWS;
      const cold = 1.6 * dpr;
      ctx.clearRect(0, 0, w, h);

      const sweep = still ? -2 : (t % (COLS + 18)) - 9;
      let hotCount = 0;

      for (let s = 0; s < SHADES; s++) {
        ctx.fillStyle = shadeFills[s];
        for (const cell of shades[s]) {
          const dist = Math.abs(cell.x - sweep);
          if (dist < GLOW) {
            hotCells[hotCount] = cell;
            hotHeat[hotCount] = 1 - dist / GLOW;
            hotCount++;
            continue;
          }
          ctx.fillRect(
            cell.x * cw + cw / 2 - cold / 2,
            cell.y * ch + ch / 2 - cold / 2,
            cold,
            cold,
          );
        }
      }

      for (let i = 0; i < hotCount; i++) {
        const cell = hotCells[i];
        const heat = hotHeat[i];
        const size = (1.6 + heat * 2.4) * dpr;
        ctx.fillStyle = `rgba(16,185,129,${0.25 + heat * 0.75})`;
        ctx.fillRect(
          cell.x * cw + cw / 2 - size / 2,
          cell.y * ch + ch / 2 - size / 2,
          size,
          size,
        );
      }

      if (still) return;
      const b = readBoost();
      ctx.fillStyle = `rgba(16,185,129,${0.09 + b * 0.14})`;
      ctx.fillRect(sweep * cw + cw / 2, 0, (1 + b * 1.6) * dpr, h);
    };

    // Advance by elapsed time, not by frame count, so the sweep runs at the
    // same speed on a 60Hz laptop and a 144Hz monitor. Capped so a stalled tab
    // resumes with a step, not a jump.
    const frame = (now: number) => {
      const step = last ? Math.min(3, (now - last) / FRAME_MS) : 1;
      last = now;
      paint();
      t += (0.085 + readBoost()) * step;
      decayBoost(0.9 ** step);
      raf = requestAnimationFrame(frame);
    };

    const start = () => {
      if (running || still) return;
      running = true;
      last = 0;
      raf = requestAnimationFrame(frame);
    };

    const stop = () => {
      if (!running) return;
      running = false;
      cancelAnimationFrame(raf);
      resetBoost();
    };

    // Run only while on screen (hero visible) and the tab is in the foreground.
    const state = { onScreen: true, foreground: !document.hidden };
    const sync = () => (state.onScreen && state.foreground ? start() : stop());

    const io = new IntersectionObserver((entries) => {
      state.onScreen = entries.some((entry) => entry.isIntersecting);
      sync();
    });
    io.observe(canvas);

    const onVisibility = () => {
      state.foreground = !document.hidden;
      sync();
    };
    document.addEventListener('visibilitychange', onVisibility);

    const onResize = () => {
      resize();
      if (!running) paint();
    };
    window.addEventListener('resize', onResize);

    paint();
    sync();

    return () => {
      stop();
      io.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none absolute top-0 -right-10 h-[460px] w-[620px] max-w-[62%] opacity-55"
      style={{
        maskImage:
          'radial-gradient(circle at 62% 38%, #000 30%, transparent 72%)',
        WebkitMaskImage:
          'radial-gradient(circle at 62% 38%, #000 30%, transparent 72%)',
      }}
    />
  );
};
