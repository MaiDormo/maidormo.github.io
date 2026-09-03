/**
 * Deterministic sparse-matrix pattern for the hero figure.
 *
 * Pure and seeded: the same matrix renders on every load, so the figure is a
 * fixed illustration rather than a random screensaver. The shape mimics the
 * matrices the adaptive SpMV kernel was built for: a tri-diagonal band, a few
 * dense coupling blocks, one nearly dense constraint row, and light random
 * fill, all symmetric.
 */
export interface Pattern {
  /** Matrix dimension (square). */
  n: number;
  /** Row-major nonzero flags, length n*n; values 1..255 double as magnitude. */
  cells: Uint8Array;
  nnz: number;
}

export const DEFAULT_SIZE = 56;
export const DEFAULT_SEED = 0x5a7e5;

/** Tiny 32-bit PRNG (mulberry32): fast, seedable, good enough for layout. */
export function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const RANDOM_FILL = 0.028;
const BLOCK_DENSITY = 0.62;
const CONSTRAINT_DENSITY = 0.55;

export function buildPattern(
  n: number = DEFAULT_SIZE,
  seed: number = DEFAULT_SEED,
): Pattern {
  const rnd = mulberry32(seed);
  const cells = new Uint8Array(n * n);

  /** Symmetric set with a pseudo-random magnitude so dots vary in weight. */
  const set = (i: number, j: number) => {
    if (i < 0 || j < 0 || i >= n || j >= n) return;
    const mag = 96 + Math.floor(rnd() * 160);
    if (!cells[i * n + j]) cells[i * n + j] = mag;
    if (!cells[j * n + i]) cells[j * n + i] = mag;
  };

  // Tri-diagonal band.
  for (let i = 0; i < n; i++) {
    set(i, i);
    set(i, i + 1);
  }

  // Dense coupling blocks straddling the diagonal at tile boundaries.
  const tile = 8;
  const blocks = [
    { row: tile, col: tile * 3 },
    { row: tile * 4, col: tile * 5 },
    { row: tile * 2, col: tile * 6 },
  ];
  for (const { row, col } of blocks) {
    for (let di = 0; di < tile; di++) {
      for (let dj = 0; dj < tile; dj++) {
        if (rnd() < BLOCK_DENSITY) set(row + di, col + dj);
      }
    }
  }

  // One near-dense constraint row/column, the classic "arrowhead".
  const constraint = Math.floor(n * 0.72);
  for (let j = 0; j < n; j++) {
    if (rnd() < CONSTRAINT_DENSITY) set(constraint, j);
  }

  // Light random fill, upper triangle mirrored down.
  for (let i = 0; i < n; i++) {
    for (let j = i + 2; j < n; j++) {
      if (rnd() < RANDOM_FILL) set(i, j);
    }
  }

  let nnz = 0;
  for (let k = 0; k < cells.length; k++) if (cells[k]) nnz++;

  return { n, cells, nnz };
}

/** Nonzero count in one row. */
export function rowNnz(pattern: Pattern, row: number): number {
  const { n, cells } = pattern;
  if (row < 0 || row >= n) return 0;
  let count = 0;
  for (let j = 0; j < n; j++) if (cells[row * n + j]) count++;
  return count;
}
