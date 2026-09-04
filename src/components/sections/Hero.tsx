import { Config } from '../../types';
import { useReveal } from '../../hooks/useReveal';
import { PILL, PILL_PRIMARY } from '../../lib/styles';
import { SparsityFigure } from '../ui/SparsityFigure';

interface HeroProps {
  headline: Config['headline'];
  tagline: Config['tagline'];
  social: Config['social'];
  resume: Config['resume'];
}

export const Hero = ({ headline, tagline, social, resume }: HeroProps) => {
  useReveal();

  return (
    <section
      aria-labelledby="hero-heading"
      className="grid gap-10 pt-10 pb-16 lg:grid-cols-12 lg:items-start lg:pt-14 lg:pb-20"
    >
      <div className="lg:col-span-7">
        <h1
          id="hero-heading"
          data-reveal
          className="font-serif text-display text-ink text-balance"
        >
          {headline}
        </h1>

        <p
          data-reveal
          className="mt-5 max-w-[40ch] font-serif text-[1.5rem] leading-snug text-ink-2 italic text-pretty"
        >
          {tagline}
        </p>

        <div
          data-reveal
          className="mt-7 flex flex-wrap gap-2.5 md:mt-9 md:gap-2"
        >
          <a
            href={`https://github.com/${social.github}`}
            target="_blank"
            rel="noreferrer"
            className={PILL_PRIMARY}
          >
            GitHub
          </a>
          <a
            href={`https://linkedin.com/in/${social.linkedin}`}
            target="_blank"
            rel="noreferrer"
            className={PILL}
          >
            LinkedIn
          </a>
          <a
            href={resume.fileUrl}
            target="_blank"
            rel="noreferrer"
            className={PILL}
          >
            CV
          </a>
          <a href={`mailto:${social.email}`} className={PILL}>
            Email
          </a>
        </div>

        {/* Paper only: the Email pill carries no address, and links don't
            click on paper. */}
        <p className="mt-4 hidden font-mono text-[12px] text-ink-2 print:block">
          {social.email}
        </p>
      </div>

      <div data-reveal className="lg:col-span-5">
        <SparsityFigure />
      </div>
    </section>
  );
};
