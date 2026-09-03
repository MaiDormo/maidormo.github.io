/**
 * Shared class recipes for the editorial system. Tokens live in
 * src/assets/index.css; these are the handful of compositions reused across
 * sections so hover, focus, and type treatments stay identical everywhere.
 */

/** Inline text link: hairline underline that turns accent on hover. */
export const LINK =
  'underline decoration-1 decoration-ink/30 underline-offset-[3px] transition-colors hover:text-accent hover:decoration-accent';

/** Mono pill button/link with a hairline border. */
export const PILL =
  'inline-flex cursor-pointer items-center gap-1.5 rounded-full border border-rule px-3.5 py-1.5 font-mono text-[12.5px] text-ink transition-colors hover:border-ink';

/** Filled variant for the single primary action. */
export const PILL_PRIMARY =
  'inline-flex cursor-pointer items-center gap-1.5 rounded-full border border-ink bg-ink px-3.5 py-1.5 font-mono text-[12.5px] text-paper transition-colors hover:border-accent hover:bg-accent';

/** Small mono metadata. */
export const META = 'font-mono text-meta text-ink-3';

/** Mono tag for a technology or metric. */
export const TAG =
  'inline-block rounded-sm border border-rule px-2 py-0.5 font-mono text-[11.5px] leading-tight text-ink-2';
