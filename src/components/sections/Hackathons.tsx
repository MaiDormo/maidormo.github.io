import { Hackathon } from '../../types';
import { useReveal } from '../../hooks/useReveal';
import { LINK, META } from '../../lib/styles';
import { SectionHeader } from '../ui/SectionHeader';
import { Entry } from '../ui/Entry';
import { Bullets } from '../ui/Bullets';
import { Tags } from '../ui/Tags';
import { Decision } from '../ui/Decision';

interface HackathonsProps {
  hackathons: Hackathon[];
}

const SELF = 'Elia Gatti';

const won = (hack: Hackathon) =>
  hack.highlights.some((h) => /first place|winner|1st/i.test(h)) ||
  /first place|winner/i.test(hack.description);

/** Teammates other than the site owner, or null for a solo entry. */
const teammates = (team: string[]): string[] | null => {
  const others = team.filter((name) => name !== SELF);
  return others.length ? others : null;
};

export const Hackathons = ({ hackathons }: HackathonsProps) => {
  useReveal();
  if (!hackathons || hackathons.length === 0) return null;

  return (
    <section id="hackathons" className="scroll-mt-20 pb-section">
      <SectionHeader
        index="03"
        title="Hackathons"
        aside={`${hackathons.length} ${hackathons.length === 1 ? 'event' : 'events'}`}
      />

      <div>
        {hackathons.map((hack, i) => {
          const others = teammates(hack.team);
          return (
            <Entry
              key={hack.title}
              meta={
                <div className={`flex flex-col gap-1.5 ${META}`}>
                  <span className="text-ink">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="text-ink-2">{hack.event}</span>
                  <span>{hack.date}</span>
                  <span>{hack.location}</span>
                  {hack.organizer && <span>{hack.organizer}</span>}
                  <span className="mt-1">
                    {others ? `with ${others.join(', ')}` : 'solo'}
                  </span>
                  {hack.codeUrl && (
                    <a
                      href={hack.codeUrl}
                      target="_blank"
                      rel="noreferrer"
                      className={`${LINK} mt-1 w-fit text-ink-2`}
                    >
                      source <span aria-hidden="true">↗</span>
                    </a>
                  )}
                </div>
              }
            >
              <h3 className="flex flex-wrap items-center gap-x-3 gap-y-1 font-serif text-h3 text-ink">
                {hack.title}
                {won(hack) && (
                  <span className="rounded-sm bg-accent px-1.5 py-0.5 font-mono text-[10.5px] tracking-[0.1em] text-paper uppercase">
                    1st place
                  </span>
                )}
              </h3>
              <p className="mt-3 max-w-[62ch] text-[15.5px] leading-relaxed text-ink-2 text-pretty">
                {hack.description}
              </p>
              <Bullets items={hack.highlights} className="mt-5" />
              {hack.decision && (
                <Decision text={hack.decision} className="mt-6" />
              )}
              <Tags items={hack.techStack} className="mt-6" />
            </Entry>
          );
        })}
      </div>
    </section>
  );
};
