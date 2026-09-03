import { Config } from '../../types';
import { useActiveSection } from '../../hooks/useActiveSection';
import { PILL } from '../../lib/styles';

interface MastheadProps {
  resume: Config['resume'];
}

export const NAV = [
  { id: 'work', label: 'Work' },
  { id: 'projects', label: 'Projects' },
  { id: 'hackathons', label: 'Hackathons' },
  { id: 'background', label: 'Background' },
] as const;

const NAV_IDS = NAV.map((item) => item.id);

/** Sticky hairline masthead: name, section links, and the CV. */
export const Masthead = ({ resume }: MastheadProps) => {
  const active = useActiveSection(NAV_IDS);
  // The hero already carries the name; the masthead only repeats it once the
  // reader has scrolled past it, like a running header.
  const pastHero = active !== null;

  return (
    <header className="sticky top-0 z-50 border-b border-rule bg-paper/90 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-5 md:px-10">
        <a
          href="#top"
          aria-hidden={!pastHero}
          tabIndex={pastHero ? 0 : -1}
          className={`font-serif text-[1.375rem] leading-none text-ink transition-opacity duration-300 hover:text-accent ${
            pastHero ? 'opacity-100' : 'pointer-events-none opacity-0'
          }`}
        >
          Elia Gatti
        </a>

        <nav aria-label="Sections" className="flex items-center gap-2">
          <ul className="hidden list-none items-center gap-1 p-0 md:flex">
            {NAV.map(({ id, label }) => {
              const on = active === id;
              return (
                <li key={id}>
                  <a
                    href={`#${id}`}
                    aria-current={on ? 'true' : undefined}
                    className={`rounded-full px-3 py-1.5 font-mono text-[12.5px] transition-colors hover:text-accent ${
                      on ? 'text-accent' : 'text-ink-2'
                    }`}
                  >
                    {label}
                  </a>
                </li>
              );
            })}
          </ul>
          <a
            href={resume.fileUrl}
            target="_blank"
            rel="noreferrer"
            className={PILL}
          >
            CV
          </a>
        </nav>
      </div>
    </header>
  );
};
