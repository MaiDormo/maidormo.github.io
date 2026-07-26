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

/** Ongoing entries first, then most recent start date downward. */
export function byRecency<T extends { from: string; to: string }>(
  list: T[],
): (T & { ongoing: boolean })[] {
  return list
    .map((item) => ({ ...item, ongoing: isOngoing(item.to) }))
    .sort(
      (a, b) =>
        Number(b.ongoing) - Number(a.ongoing) ||
        toSortKey(b.from) - toSortKey(a.from),
    );
}
