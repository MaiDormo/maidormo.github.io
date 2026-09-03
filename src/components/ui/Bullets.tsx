import { withEmphasis } from '../../lib/emphasis';

interface BulletsProps {
  items: string[];
  className?: string;
}

/** Outcome list with an en-dash marker, set slightly smaller than body. */
export const Bullets = ({ items, className = '' }: BulletsProps) => (
  <ul className={`flex list-none flex-col gap-2 p-0 ${className}`}>
    {items.map((item) => (
      <li
        key={item}
        className="grid grid-cols-[1.25rem_1fr] text-[15px] leading-relaxed text-ink-2"
      >
        <span aria-hidden="true" className="font-mono text-ink-3">
          –
        </span>
        <span className="text-pretty">{withEmphasis(item)}</span>
      </li>
    ))}
  </ul>
);
