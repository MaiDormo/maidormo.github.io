interface SectionHeaderProps {
  /** Two-digit section number, e.g. "01". */
  index: string;
  title: string;
}

/** Numbered section title over a solid ink rule. */
export const SectionHeader = ({ index, title }: SectionHeaderProps) => (
  <div
    data-reveal
    className="flex items-baseline gap-4 border-b border-ink pb-4"
  >
    <span className="font-mono text-meta text-ink-3">{index}</span>
    <h2 className="font-serif text-h2 text-ink">{title}</h2>
  </div>
);
