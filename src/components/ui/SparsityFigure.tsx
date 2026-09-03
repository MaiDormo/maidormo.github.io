import { useEffect, useMemo, useRef } from 'react';
import { buildPattern } from '../../lib/sparsity';

/** Tile boundary spacing drawn as faint grid lines (matches the block size). */
const TILE = 8;
const FALLBACK = { ink: '#171512', rule: '#d9d3c6' };

const cssColor = (name: string, fallback: string): string => {
  const value = getComputedStyle(document.documentElement)
    .getPropertyValue(name)
    .trim();
  return value || fallback;
};

/**
 * fig. 1 — a deterministic sparse matrix drawn to canvas.
 * Static: draws once and again on resize. Nothing animates.
 */
export const SparsityFigure = () => {
  const pattern = useMemo(() => buildPattern(), []);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const ink = cssColor('--color-ink', FALLBACK.ink);
    const rule = cssColor('--color-rule', FALLBACK.rule);

    const draw = () => {
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      const px = Math.max(
        1,
        Math.round(canvas.getBoundingClientRect().width * dpr),
      );
      if (canvas.width !== px || canvas.height !== px) {
        canvas.width = px;
        canvas.height = px;
      }

      const { n, cells } = pattern;
      const cell = px / n;
      ctx.clearRect(0, 0, px, px);

      ctx.strokeStyle = rule;
      ctx.lineWidth = Math.max(1, dpr * 0.75);
      ctx.beginPath();
      for (let k = TILE; k < n; k += TILE) {
        const p = Math.round(k * cell) + 0.5;
        ctx.moveTo(p, 0);
        ctx.lineTo(p, px);
        ctx.moveTo(0, p);
        ctx.lineTo(px, p);
      }
      ctx.stroke();

      const dot = cell * 0.7;
      const pad = (cell - dot) / 2;
      ctx.fillStyle = ink;
      for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
          const v = cells[i * n + j];
          if (!v) continue;
          ctx.globalAlpha = 0.35 + (v / 255) * 0.65;
          ctx.fillRect(j * cell + pad, i * cell + pad, dot, dot);
        }
      }
      ctx.globalAlpha = 1;
    };

    draw();
    const ro = new ResizeObserver(draw);
    ro.observe(canvas);
    return () => ro.disconnect();
  }, [pattern]);

  return (
    <figure className="m-0">
      <div className="border border-rule bg-paper p-3">
        <canvas
          ref={canvasRef}
          aria-hidden="true"
          className="block aspect-square w-full"
        />
      </div>
      <figcaption className="mt-3 font-mono text-meta text-ink-3">
        fig. 1 — {pattern.n}×{pattern.n} sparse matrix, {pattern.nnz} nonzeros.
      </figcaption>
    </figure>
  );
};
