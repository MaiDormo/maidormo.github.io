import { ComponentPropsWithoutRef, ReactNode } from 'react';

interface EntryProps extends ComponentPropsWithoutRef<'article'> {
  /** Left column: index, dates, tags — anything set in mono. */
  meta: ReactNode;
  children: ReactNode;
}

/**
 * One row of a numbered list: a narrow mono meta column beside the body.
 * Carries the scroll-reveal hooks and the hairline that draws in above it.
 */
export const Entry = ({
  meta,
  children,
  className = '',
  ...rest
}: EntryProps) => (
  <article
    data-reveal
    {...rest}
    className={`rule-draw grid gap-5 py-9 md:grid-cols-12 md:gap-8 ${className}`}
  >
    <div className="md:col-span-3">{meta}</div>
    <div data-stagger className="min-w-0 md:col-span-9">
      {children}
    </div>
  </article>
);
