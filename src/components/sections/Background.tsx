import { Education, Skills } from '../../types';
import { byRecency } from '../../lib/chrono';
import { useReveal } from '../../hooks/useReveal';
import { LINK, META } from '../../lib/styles';
import { SectionHeader } from '../ui/SectionHeader';

interface BackgroundProps {
  educations: Education[];
  skills: Skills;
}

const ColumnLabel = ({ text }: { text: string }) => (
  <h3 className="mb-2 font-serif text-[1.25rem] text-ink-2">{text}</h3>
);

/** Education and the CV skills block, side by side. */
export const Background = ({ educations, skills }: BackgroundProps) => {
  useReveal();
  const study = byRecency(educations);
  const rows: [string, string[]][] = [
    ['Languages', skills.languages],
    ['Tools', skills.tools],
    ['Concepts', skills.concepts],
  ];

  return (
    <section
      id="background"
      className="scroll-mt-32 pb-section md:scroll-mt-20"
    >
      <SectionHeader index="04" title="Background" />

      <div className="grid gap-12 py-9 md:grid-cols-12 md:gap-8">
        <div className="md:col-span-6">
          <ColumnLabel text="Education" />
          <div>
            {study.map((edu) => (
              <div key={edu.degree} data-reveal className="rule-draw py-5">
                {edu.institutionLogo && (
                  <img
                    src={edu.institutionLogo}
                    alt={`${edu.institution} logo`}
                    height={22}
                    loading="lazy"
                    decoding="async"
                    className="mb-3 h-[22px] w-auto object-contain object-left"
                  />
                )}
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <h4 className="font-serif text-[1.3rem] leading-tight text-ink">
                    {edu.degree}
                  </h4>
                  <span className={META}>
                    {edu.from} — {edu.to}
                  </span>
                </div>
                <div className="mt-1 text-[15px]">
                  {edu.institutionLink ? (
                    <a
                      href={edu.institutionLink}
                      target="_blank"
                      rel="noreferrer"
                      className={`${LINK} text-ink-2`}
                    >
                      {edu.institution}
                    </a>
                  ) : (
                    <span className="text-ink-2">{edu.institution}</span>
                  )}
                </div>
                {(edu.description || edu.score) && (
                  <p className="mt-1.5 flex flex-wrap items-baseline gap-x-3 text-[15px] text-ink-3">
                    {edu.description && <span>{edu.description}</span>}
                    {edu.score && (
                      <span className="font-mono text-meta">{edu.score}</span>
                    )}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="md:col-span-6">
          <ColumnLabel text="Skills" />
          <dl className="m-0">
            {rows.map(([label, items]) => (
              <div
                key={label}
                data-reveal
                className="rule-draw grid grid-cols-1 gap-1 py-4 min-[420px]:grid-cols-[6.5rem_1fr] min-[420px]:gap-4"
              >
                <dt className={META}>{label}</dt>
                <dd className="m-0 text-[15px] leading-relaxed text-ink-2">
                  {items.join(' · ')}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
};
