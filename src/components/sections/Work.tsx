import { ReactNode } from 'react';
import { Experience } from '../../types';
import { byRecency } from '../../lib/chrono';
import { useReveal } from '../../hooks/useReveal';
import { LINK, META } from '../../lib/styles';
import { KAIROS_FOOTBALL } from '../../data/kairosFootball';
import { SectionHeader } from '../ui/SectionHeader';
import { Entry } from '../ui/Entry';
import { Bullets } from '../ui/Bullets';
import { Tags } from '../ui/Tags';
import { SegmentTimeline } from '../ui/SegmentTimeline';

interface WorkProps {
  experiences: Experience[];
}

/** Figures a role can reference from config. fig. 1 is the hero. */
const FIGURES: Record<NonNullable<Experience['figure']>, ReactNode> = {
  'kairos-football': (
    <SegmentTimeline
      index={2}
      data={KAIROS_FOOTBALL}
      caption={
        <>
          KAIROS output for a 10-minute football broadcast: live play in ink,
          down time in grey.{' '}
          <a
            href="https://kairosapp.tech"
            target="_blank"
            rel="noreferrer"
            className={LINK}
          >
            Live sample
          </a>
          .
        </>
      }
    />
  ),
};

export const Work = ({ experiences }: WorkProps) => {
  useReveal();
  const roles = byRecency(experiences);
  if (roles.length === 0) return null;

  return (
    <section id="work" className="scroll-mt-32 pb-section md:scroll-mt-20">
      <SectionHeader index="01" title="Work" />

      <div>
        {roles.map((exp, i) => (
          <Entry
            key={`${exp.company}-${exp.from}`}
            meta={
              <div
                className={`flex flex-row flex-wrap items-center gap-x-3 gap-y-1.5 md:flex-col md:items-start ${META}`}
              >
                <span className="text-ink">
                  {String(i + 1).padStart(2, '0')}
                </span>
                {exp.companyLogo && (
                  <img
                    src={exp.companyLogo}
                    alt={`${exp.company} logo`}
                    height={20}
                    loading="lazy"
                    decoding="async"
                    className="h-5 w-auto max-w-[140px] object-contain object-left md:my-1"
                  />
                )}
                <span>
                  {exp.from} — {exp.to}
                </span>
                {exp.location && <span>{exp.location}</span>}
                {exp.ongoing && <span className="text-accent">current</span>}
                {exp.product && (
                  <a
                    href={exp.product.url}
                    target="_blank"
                    rel="noreferrer"
                    className={`${LINK} flex w-fit items-center gap-2 text-ink-2 md:mt-2`}
                  >
                    {exp.product.mark && (
                      <img
                        src={exp.product.mark}
                        alt=""
                        width={20}
                        height={20}
                        loading="lazy"
                        decoding="async"
                        className="h-5 w-5 rounded-[3px]"
                      />
                    )}
                    {exp.product.name}
                  </a>
                )}
              </div>
            }
          >
            <h3 className="font-serif text-h3 text-ink">
              {exp.position} <span className="text-ink-3">at</span>{' '}
              {exp.companyLink ? (
                <a
                  href={exp.companyLink}
                  target="_blank"
                  rel="noreferrer"
                  className={LINK}
                >
                  {exp.company}
                </a>
              ) : (
                exp.company
              )}
            </h3>
            {exp.description && (
              <p className="mt-1.5 text-[15px] text-ink-3">{exp.description}</p>
            )}
            {exp.highlights && exp.highlights.length > 0 && (
              <Bullets items={exp.highlights} className="mt-4" />
            )}
            {exp.figure && (
              <div className="mt-6 max-w-[62ch]">{FIGURES[exp.figure]}</div>
            )}
            {exp.technologies && exp.technologies.length > 0 && (
              <Tags items={exp.technologies} className="mt-6" />
            )}
          </Entry>
        ))}
      </div>
    </section>
  );
};
