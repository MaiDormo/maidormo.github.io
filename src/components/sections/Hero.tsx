import { Fragment, useEffect, useRef, useState } from 'react';
import { Config } from '../../types';
import { useReveal } from '../../hooks/useReveal';
import { PILL, PILL_PRIMARY } from '../../lib/styles';
import { SparsityFigure } from '../ui/SparsityFigure';

interface HeroProps {
  now: Config['now'];
  headline: Config['headline'];
  tagline: Config['tagline'];
  social: Config['social'];
  resume: Config['resume'];
}

const COPIED_MS = 1800;

/** `*phrase*` in the headline becomes an italic run. */
const renderHeadline = (text: string) =>
  text.split('*').map((part, i) =>
    i % 2 === 1 ? (
      <em key={i} className="italic">
        {part}
      </em>
    ) : (
      <Fragment key={i}>{part}</Fragment>
    ),
  );

export const Hero = ({ now, headline, tagline, social, resume }: HeroProps) => {
  const [copied, setCopied] = useState(false);
  const resetTimer = useRef(0);
  useReveal();

  useEffect(() => () => window.clearTimeout(resetTimer.current), []);

  const copyEmail = () => {
    navigator.clipboard?.writeText(social.email).catch(() => {});
    setCopied(true);
    // Restart the window on every click so rapid presses cannot let an older
    // timer clear the label while the newest copy is still fresh.
    window.clearTimeout(resetTimer.current);
    resetTimer.current = window.setTimeout(() => setCopied(false), COPIED_MS);
  };

  return (
    <section
      aria-labelledby="hero-heading"
      className="grid gap-10 pt-10 pb-16 lg:grid-cols-12 lg:items-start lg:pt-14 lg:pb-20"
    >
      <div className="lg:col-span-7">
        <div
          data-reveal
          className="mb-8 flex flex-wrap items-center gap-2.5 font-mono text-meta text-ink-3"
        >
          <span
            aria-hidden="true"
            className="h-[7px] w-[7px] rounded-full bg-accent"
            style={{ animation: 'pulseDot 2.4s ease-out infinite' }}
          />
          <span className="text-ink">Now</span>
          <span aria-hidden="true">—</span>
          <span>
            {now.role} at {now.company}, {now.location}
          </span>
        </div>

        <h1
          id="hero-heading"
          data-reveal
          className="font-serif text-display text-ink text-balance"
        >
          {renderHeadline(headline)}
        </h1>

        <p
          data-reveal
          className="mt-5 max-w-[40ch] font-serif text-[1.5rem] leading-snug text-ink-2 italic text-pretty"
        >
          {tagline}
        </p>

        <div data-reveal className="mt-9 flex flex-wrap gap-2">
          <a
            href={`https://github.com/${social.github}`}
            target="_blank"
            rel="noreferrer"
            className={PILL_PRIMARY}
          >
            GitHub <span aria-hidden="true">↗</span>
          </a>
          <a
            href={`https://linkedin.com/in/${social.linkedin}`}
            target="_blank"
            rel="noreferrer"
            className={PILL}
          >
            LinkedIn <span aria-hidden="true">↗</span>
          </a>
          <a
            href={resume.fileUrl}
            target="_blank"
            rel="noreferrer"
            className={PILL}
          >
            CV (PDF)
          </a>
          <button type="button" onClick={copyEmail} className={PILL}>
            {copied ? 'copied ✓' : 'Copy email'}
          </button>
        </div>
      </div>

      <div data-reveal className="lg:col-span-5">
        <SparsityFigure />
      </div>
    </section>
  );
};
