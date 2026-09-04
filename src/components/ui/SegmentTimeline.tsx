import { ReactNode } from 'react';
import { SegmentTimelineData } from '../../data/kairosFootball';

interface SegmentTimelineProps {
  data: SegmentTimelineData;
  /** Caption shown under the strip, after the figure number. */
  caption: ReactNode;
  index: number;
}

const W = 1000;
const BAR_Y = 0;
const BAR_H = 22;
const TICK_Y = BAR_H + 6;
const TICK_H = 10;
const H = TICK_Y + TICK_H;

const fmt = (s: number) => {
  const m = Math.floor(s / 60);
  const r = Math.round(s % 60);
  return `${m}:${String(r).padStart(2, '0')}`;
};

/**
 * fig. — a segment timeline as the pipeline emits it: live play in ink,
 * down time in the rule colour, goals as accent ticks underneath.
 * Pure SVG scaled to the column; nothing animates.
 */
export const SegmentTimeline = ({
  data,
  caption,
  index,
}: SegmentTimelineProps) => {
  const scale = W / data.durationSeconds;
  const goals = data.moments.filter(([, kind]) => kind === 'GOAL');
  const live = data.segments.filter(([, , on]) => on === 1).length;

  return (
    <figure className="m-0">
      <div className="border border-rule bg-paper p-3">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          role="img"
          aria-label={`${data.segments.length} segments over ${fmt(data.durationSeconds)}: ${live} live play, ${data.segments.length - live} down time, ${goals.length} goals.`}
          className="block h-16 w-full sm:h-auto"
          preserveAspectRatio="none"
        >
          {data.segments.map(([start, end, on], i) => (
            <rect
              key={i}
              x={start * scale}
              y={BAR_Y}
              width={Math.max(1.5, (end - start) * scale - 1)}
              height={BAR_H}
              className={on ? 'fill-ink' : 'fill-rule'}
            />
          ))}
          {goals.map(([t], i) => (
            <rect
              key={i}
              x={t * scale - 2}
              y={TICK_Y}
              width={4}
              height={TICK_H}
              className="fill-accent"
            />
          ))}
        </svg>
        <div className="mt-2 flex justify-between font-mono text-[10.5px] text-ink-3">
          <span>0:00</span>
          <span>{fmt(data.durationSeconds)}</span>
        </div>
      </div>
      <figcaption className="mt-3 font-mono text-meta text-ink-3">
        fig. {index} — {caption} {data.segments.length} segments, {live} live
        play; {goals.length} goals marked.
      </figcaption>
    </figure>
  );
};
