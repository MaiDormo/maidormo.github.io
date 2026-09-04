/**
 * Shared class recipes for the editorial system. Tokens live in
 * src/assets/index.css; these are the handful of compositions reused across
 * sections so hover, focus, and type treatments stay identical everywhere.
 */

/** Inline text link: hairline underline that turns accent on hover. */
export const LINK =
  'underline decoration-1 decoration-ink/30 underline-offset-[3px] transition-colors hover:text-accent hover:decoration-accent';

/** Mono pill button/link with a hairline border. Roomy on touch, compact on md+. */
export const PILL =
  'inline-flex min-h-[44px] cursor-pointer items-center justify-center gap-1.5 rounded-full border border-rule px-4 py-2 font-mono text-[13px] text-ink transition-colors hover:border-ink md:min-h-0 md:px-3.5 md:py-1.5 md:text-[12.5px]';

/** Filled variant for the single primary action. */
export const PILL_PRIMARY =
  'inline-flex min-h-[44px] cursor-pointer items-center justify-center gap-1.5 rounded-full border border-ink bg-ink px-4 py-2 font-mono text-[13px] text-paper transition-colors hover:border-accent hover:bg-accent md:min-h-0 md:px-3.5 md:py-1.5 md:text-[12.5px]';

/** Small mono metadata. */
export const META = 'font-mono text-meta text-ink-3';

/** Mono tag for a technology or metric. */
export const TAG =
  'inline-block rounded-sm border border-rule px-2 py-0.5 font-mono text-[11.5px] leading-tight text-ink-2';
