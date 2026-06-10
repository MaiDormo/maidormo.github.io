import {
  GithubIcon,
  LinkedinIcon,
  StravaIcon,
  FilePdfIcon,
  EnvelopeIcon,
} from '../../icon';
import { Config } from '../../types';

interface HeaderProps {
  customBio: Config['customBio'];
  social: Config['social'];
  resume: Config['resume'];
}

export const Header = ({ customBio, social, resume }: HeaderProps) => {
  return (
    <header className="mb-24 animate-fade-in-up">
      <span className="font-mono text-emerald-500 text-sm mb-4 flex items-center gap-2">
        <span className="w-2 h-3 bg-emerald-500 animate-blink"></span>
        elia@local:~$ ./whoami
      </span>
      <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight drop-shadow-sm">
        Elia Gatti
      </h1>
      <p className="text-xl md:text-2xl text-zinc-300 font-medium mb-8">
        Software Engineer{' '}
        <span className="text-zinc-500 font-light mx-2">|</span> HPC &
        Distributed Systems
      </p>
      <p className="text-base md:text-lg mb-10 max-w-2xl leading-relaxed text-zinc-400">
        {customBio} Specializing in backend development, systems programming,
        and high-performance computing.
      </p>

      <div className="flex flex-wrap gap-4 font-mono text-sm">
        <a
          href={`https://github.com/${social.github}`}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2 px-4 py-2 hack-badge text-zinc-300 hover:text-emerald-400 hover:border-emerald-500/50 transition-colors"
        >
          <GithubIcon size={18} /> GitHub
        </a>
        <a
          href={`https://linkedin.com/in/${social.linkedin}`}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2 px-4 py-2 hack-badge text-zinc-300 hover:text-emerald-400 hover:border-emerald-500/50 transition-colors"
        >
          <LinkedinIcon size={18} /> LinkedIn
        </a>
        {social.strava && (
          <a
            href={`https://www.strava.com/athletes/${social.strava}`}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 px-4 py-2 hack-badge text-zinc-300 hover:text-emerald-400 hover:border-emerald-500/50 transition-colors"
          >
            <StravaIcon size={18} /> Strava
          </a>
        )}
        <a
          href={resume.fileUrl}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2 px-4 py-2 hack-badge text-zinc-300 hover:text-emerald-400 hover:border-emerald-500/50 transition-colors"
        >
          <FilePdfIcon size={18} /> CV / Resume
        </a>
        <a
          href={`mailto:${social.email}`}
          className="flex items-center gap-2 px-4 py-2 hack-badge text-zinc-300 hover:text-emerald-400 hover:border-emerald-500/50 transition-colors"
        >
          <EnvelopeIcon size={18} /> Email
        </a>
      </div>
    </header>
  );
};
