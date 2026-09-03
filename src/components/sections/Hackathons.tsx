import { Hackathon } from '../../types';
import { useReveal } from '../../hooks/useReveal';
import { LINK, META } from '../../lib/styles';
import { SectionHeader } from '../ui/SectionHeader';
import { Entry } from '../ui/Entry';
import { Bullets } from '../ui/Bullets';
import { Tags } from '../ui/Tags';

interface HackathonsProps {
  hackathons: Hackathon[];
}

const SELF = 'Elia Gatti';

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
      <SectionHeader index="03" title="Hackathons" />

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
                  {hack.organizerLogo && (
                    <img
                      src={hack.organizerLogo}
                      alt={`${hack.organizer ?? hack.event} logo`}
                      height={32}
                      loading="lazy"
                      decoding="async"
                      className="my-1 h-8 w-auto max-w-[170px] object-contain object-left"
                    />
                  )}
                  <span className="text-ink-2">{hack.event}</span>
                  {hack.organizer &&
                    (hack.organizerLink ? (
                      <a
                        href={hack.organizerLink}
                        target="_blank"
                        rel="noreferrer"
                        className={`${LINK} w-fit`}
                      >
                        {hack.organizer}
                      </a>
                    ) : (
                      <span>{hack.organizer}</span>
                    ))}
                  <span>
                    {hack.date} · {hack.location}
                  </span>
                  {hack.result && (
                    <span className="text-accent">{hack.result}</span>
                  )}
                  {others && <span>with {others.join(', ')}</span>}
                  {hack.codeUrl && (
                    <a
                      href={hack.codeUrl}
                      target="_blank"
                      rel="noreferrer"
                      className={`${LINK} w-fit text-ink-2`}
                    >
                      source
                    </a>
                  )}
                </div>
              }
            >
              <h3 className="font-serif text-h3 text-ink">{hack.title}</h3>
              <p className="mt-2 max-w-[62ch] text-[15.5px] leading-relaxed text-ink-2 text-pretty">
                {hack.description}
              </p>
              <Bullets items={hack.highlights} className="mt-4" />
              <Tags items={hack.techStack} className="mt-6" />
            </Entry>
          );
        })}
      </div>
    </section>
  );
};
