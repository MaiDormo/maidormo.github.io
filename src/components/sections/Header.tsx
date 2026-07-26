import { useEffect, useRef, useState } from 'react';
import { Config } from '../../types';
import { MatrixField } from '../ui/MatrixField';
import { useReveal } from '../../hooks/useReveal';

interface HeaderProps {
  customBio: Config['customBio'];
  social: Config['social'];
  resume: Config['resume'];
}

const BTN =
  'flex items-center gap-2 rounded border border-zinc-800 bg-[#0a0a0a] px-4 py-2.5 text-zinc-300 transition-colors hover:border-emerald-500/50 hover:text-emerald-400';

export const Header = ({ customBio, social, resume }: HeaderProps) => {
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
    resetTimer.current = window.setTimeout(() => setCopied(false), 1800);
  };

  return (
    <header className="relative pt-20 pb-22">
      <MatrixField />

      <div className="relative mb-7 flex items-center gap-2.5 font-mono text-xs text-zinc-500">
        <span
          className="h-[7px] w-[7px] rounded-full bg-emerald-500"
          style={{ animation: 'pulseDot 2.4s ease-out infinite' }}
        />
        <span className="text-emerald-500">Software Engineer Intern</span>
        <span className="text-zinc-700">@</span>
        <span>Bitmovin · Klagenfurt, AT</span>
      </div>

      <h1 className="relative mb-4 text-[clamp(52px,9vw,104px)] leading-[0.92] font-extrabold tracking-[-0.045em] text-white">
        Elia Gatti
      </h1>

      <p className="relative mb-6 font-mono text-[clamp(15px,2.2vw,19px)] tracking-tight text-zinc-300">
        GPU computing
        <span className="px-2.5 text-zinc-700">/</span>HPC
        <span className="px-2.5 text-zinc-700">/</span>distributed backends
      </p>

      <p className="relative mb-9 max-w-[56ch] text-[17px] leading-relaxed text-zinc-400 text-pretty">
        {customBio} I build systems where performance is the feature — CUDA
        kernels that adapt to their input, MPI graph algorithms that scale to 32
        nodes, and services that stay consistent when nodes fail.
      </p>

      <div className="relative flex flex-wrap gap-2.5 font-mono text-[13px]">
        <a
          href={`https://github.com/${social.github}`}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2 rounded border border-emerald-500 bg-emerald-500 px-4 py-2.5 font-semibold text-black transition-colors hover:border-emerald-400 hover:bg-emerald-400 hover:text-black"
        >
          GitHub
        </a>
        <a
          href={`https://linkedin.com/in/${social.linkedin}`}
          target="_blank"
          rel="noreferrer"
          className={BTN}
        >
          LinkedIn
        </a>
        <a
          href={resume.fileUrl}
          target="_blank"
          rel="noreferrer"
          className={BTN}
        >
          CV ↓
        </a>
        {social.strava && (
          <a
            href={`https://www.strava.com/athletes/${social.strava}`}
            target="_blank"
            rel="noreferrer"
            className={BTN}
          >
            Strava
          </a>
        )}
        <button type="button" onClick={copyEmail} className={BTN}>
          {copied ? 'copied ✓' : 'Copy email'}
        </button>
      </div>
    </header>
  );
};
