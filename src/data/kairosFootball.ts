/**
 * One KAIROS read of a football broadcast, copied verbatim from the output the
 * public demo serves (kairosapp.tech, football sample: Barcelona v PSG).
 * Segments are [start, end, isLivePlay]; moments are [segmentStart, subtype].
 * Seconds, rounded to a tenth.
 */
export interface SegmentTimelineData {
  durationSeconds: number;
  segments: [number, number, 0 | 1][];
  moments: [number, string][];
}

export const KAIROS_FOOTBALL: SegmentTimelineData = {
  durationSeconds: 640.96,
  segments: [
    [0, 33.9, 1],
    [33.9, 56, 0],
    [56, 69, 1],
    [69, 95.6, 0],
    [95.6, 107.8, 1],
    [107.8, 139.9, 0],
    [139.9, 147.2, 1],
    [147.2, 180.3, 0],
    [180.3, 189.5, 1],
    [189.5, 193, 0],
    [193, 226, 1],
    [226, 227.6, 0],
    [227.6, 243.8, 1],
    [243.8, 302.1, 0],
    [302.1, 307.6, 1],
    [307.6, 311.7, 0],
    [311.7, 338.8, 0],
    [338.8, 364.4, 1],
    [364.4, 366.7, 0],
    [366.7, 388, 1],
    [388, 389.6, 0],
    [389.6, 398.9, 1],
    [398.9, 408, 0],
    [408, 410.5, 1],
    [410.5, 435.5, 0],
    [435.5, 450.6, 1],
    [450.6, 457.7, 0],
    [457.7, 487.5, 1],
    [487.5, 489, 0],
    [489, 498.4, 1],
    [498.4, 537.1, 0],
    [537.1, 555.1, 1],
    [555.1, 564.2, 1],
    [564.2, 568.2, 0],
    [568.2, 583, 1],
    [583, 636.8, 0],
    [636.8, 641, 1],
  ],
  moments: [
    [0, 'SHOT_BLOCKED'],
    [56, 'FOUL'],
    [95.6, 'FOUL'],
    [139.9, 'GOAL'],
    [227.6, 'PENALTY'],
    [302.1, 'GOAL'],
    [389.6, 'SAVE'],
    [457.7, 'FOUL'],
    [489, 'FOUL'],
    [537.1, 'FOUL'],
    [555.1, 'FOUL'],
    [568.2, 'GOAL'],
    [636.8, 'FREE_KICK'],
  ],
};
