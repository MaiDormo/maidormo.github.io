import { Fragment, ReactNode } from 'react';

/**
 * Renders `**phrase**` markers in config copy as emphasised runs, so the
 * bullets can bold the same key words the CV does without HTML in the config.
 */
export function withEmphasis(text: string): ReactNode {
  const parts = text.split('**');
  if (parts.length === 1) return text;
  return parts.map((part, i) =>
    i % 2 === 1 ? (
      <strong key={i} className="font-semibold text-ink">
        {part}
      </strong>
    ) : (
      <Fragment key={i}>{part}</Fragment>
    ),
  );
}
