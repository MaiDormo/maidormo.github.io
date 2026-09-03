const MONTHS = [
  'january',
  'february',
  'march',
  'april',
  'may',
  'june',
  'july',
  'august',
  'september',
  'october',
  'november',
  'december',
];

/**
 * Turns config date strings ("June 2026", "2024", "Sep 2024") into a sortable
 * YYYYMM number so the timeline orders itself instead of relying on array order.
 */
export function toSortKey(value: string): number {
  const text = (value || '').toLowerCase();
  const year = Number((text.match(/\d{4}/) || ['0'])[0]);
  const month = MONTHS.findIndex((m) => text.includes(m.slice(0, 3)));
  return year * 100 + (month >= 0 ? month + 1 : 1);
}

export function isOngoing(to: string): boolean {
  return /present|now|current/i.test(to || '');
}

/** YYYYMM for a given moment, in the same shape as toSortKey. */
export function monthKey(date: Date): number {
  return date.getFullYear() * 100 + (date.getMonth() + 1);
}

/**
 * An entry is current when its end is open ("Present") or still ahead of, or
 * inside, the current month. A fixed-term role dated "June — Sept 2026" reads
 * as "now" through September and flips over on its own in October.
 */
export function isCurrent(to: string, today: Date = new Date()): boolean {
  if (isOngoing(to)) return true;
  const end = toSortKey(to);
  return end > 0 && end >= monthKey(today);
}

/** Current entries first, then most recent start date downward. */
export function byRecency<T extends { from: string; to: string }>(
  list: T[],
  today: Date = new Date(),
): (T & { ongoing: boolean })[] {
  return list
    .map((item) => ({ ...item, ongoing: isCurrent(item.to, today) }))
    .sort(
      (a, b) =>
        Number(b.ongoing) - Number(a.ongoing) ||
        toSortKey(b.from) - toSortKey(a.from),
    );
}
