import { useEffect, useMemo, useRef, useState } from 'react';
import { buildPattern, rowNnz } from '../../lib/sparsity';

/** Row highlighted at rest: inside the first coupling block, so it has weight. */
const DEFAULT_ROW = 12;
/** Tile boundary spacing drawn as faint grid lines (matches the block size). */
const TILE = 8;
const FALLBACK = { ink: '#171512', accent: '#c2470b', rule: '#d9d3c6' };

const cssColor = (name: string, fallback: string): string => {
  const value = getComputedStyle(document.documentElement)
    .getPropertyValue(name)
    .trim();
  return value || fallback;
};

/**
 * fig. 1 — a deterministic sparse matrix drawn to canvas.
 *
 * Static by design: no animation loop, redraws only on resize or when the
 * pointer picks a different row. Reduced-motion users see the same figure.
 */
export const SparsityFigure = () => {
  const pattern = useMemo(() => buildPattern(), []);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const raf = useRef(0);
  const [row, setRow] = useState(DEFAULT_ROW);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const ink = cssColor('--color-ink', FALLBACK.ink);
    const accent = cssColor('--color-accent', FALLBACK.accent);
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

      // Tile boundaries: the blocking the kernel works in.
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

      // Band behind the inspected row.
      ctx.globalAlpha = 0.1;
      ctx.fillStyle = accent;
      ctx.fillRect(0, row * cell, px, cell);
      ctx.globalAlpha = 1;

      const dot = cell * 0.7;
      const pad = (cell - dot) / 2;

      // Resting nonzeros in ink, weighted by magnitude.
      ctx.fillStyle = ink;
      for (let i = 0; i < n; i++) {
        if (i === row) continue;
        for (let j = 0; j < n; j++) {
          const v = cells[i * n + j];
          if (!v) continue;
          ctx.globalAlpha = 0.35 + (v / 255) * 0.65;
          ctx.fillRect(j * cell + pad, i * cell + pad, dot, dot);
        }
      }

      // The inspected row in accent, full strength.
      ctx.globalAlpha = 1;
      ctx.fillStyle = accent;
      for (let j = 0; j < n; j++) {
        if (!cells[row * n + j]) continue;
        ctx.fillRect(j * cell + pad, row * cell + pad, dot, dot);
      }
    };

    draw();
    const ro = new ResizeObserver(draw);
    ro.observe(canvas);
    return () => ro.disconnect();
  }, [pattern, row]);

  useEffect(() => () => cancelAnimationFrame(raf.current), []);

  const onPointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    // Touch is for scrolling; only a hovering pointer scrubs rows.
    if (e.pointerType === 'touch') return;
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = (e.clientY - rect.top) / rect.height;
    const next = Math.min(
      pattern.n - 1,
      Math.max(0, Math.floor(ratio * pattern.n)),
    );
    if (raf.current) return;
    raf.current = requestAnimationFrame(() => {
      raf.current = 0;
      setRow(next);
    });
  };

  const { n, nnz } = pattern;

  return (
    <figure className="m-0">
      <div className="border border-rule bg-paper p-3">
        <canvas
          ref={canvasRef}
          aria-hidden="true"
          onPointerMove={onPointerMove}
          onPointerLeave={() => setRow(DEFAULT_ROW)}
          className="block aspect-square w-full"
        />
      </div>
      <figcaption className="mt-3 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 font-mono text-meta text-ink-3">
        <span>
          <span className="text-ink">fig. 1</span> — {n}×{n} sparse matrix,
          banded with coupling blocks · nnz {nnz}
        </span>
        <span className="tabular-nums">
          row {String(row).padStart(2, '0')} · {rowNnz(pattern, row)} nnz
        </span>
      </figcaption>
    </figure>
  );
};
