import { TAG } from '../../lib/styles';

interface TagsProps {
  items: string[];
  className?: string;
  label?: string;
}

/** Row of mono tags for a technology stack. */
export const Tags = ({ items, className = '', label = 'Stack' }: TagsProps) => (
  <ul
    aria-label={label}
    className={`flex list-none flex-wrap gap-1.5 p-0 ${className}`}
  >
    {items.map((item) => (
      <li key={item} className={TAG}>
        {item}
      </li>
    ))}
  </ul>
);
