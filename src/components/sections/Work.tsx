import { Experience } from '../../types';
import { byRecency } from '../../lib/chrono';
import { useReveal } from '../../hooks/useReveal';
import { LINK, META } from '../../lib/styles';
import { SectionHeader } from '../ui/SectionHeader';
import { Entry } from '../ui/Entry';
import { Bullets } from '../ui/Bullets';
import { Tags } from '../ui/Tags';

interface WorkProps {
  experiences: Experience[];
}

export const Work = ({ experiences }: WorkProps) => {
  useReveal();
  const roles = byRecency(experiences);
  if (roles.length === 0) return null;

  return (
    <section id="work" className="scroll-mt-20 pb-section">
      <SectionHeader
        index="01"
        title="Work"
        aside={`${roles.length} ${roles.length === 1 ? 'role' : 'roles'}`}
      />

      <div>
        {roles.map((exp, i) => (
          <Entry
            key={`${exp.company}-${exp.from}`}
            meta={
              <div className={`flex flex-col gap-1.5 ${META}`}>
                <span className="text-ink">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span>
                  {exp.from} — {exp.to}
                </span>
                {exp.location && <span>{exp.location}</span>}
                {exp.ongoing && (
                  <span className="flex items-center gap-1.5 text-accent">
                    <span
                      aria-hidden="true"
                      className="h-1.5 w-1.5 rounded-full bg-accent"
                    />
                    now
                  </span>
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
              <Bullets items={exp.highlights} className="mt-5" />
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
