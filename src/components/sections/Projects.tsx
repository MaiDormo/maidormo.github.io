import { useLayoutEffect, useMemo, useRef, useState } from 'react';
import { Project } from '../../types';
import { useReveal } from '../../hooks/useReveal';
import {
  prefersReducedMotion,
  REVEAL_EASE,
  skipReveal,
} from '../../lib/reveal';
import { LINK, META } from '../../lib/styles';
import { SectionHeader } from '../ui/SectionHeader';
import { Entry } from '../ui/Entry';
import { Bullets } from '../ui/Bullets';
import { Tags } from '../ui/Tags';
import { Decision } from '../ui/Decision';

interface ProjectsProps {
  projects: Project[];
}

const ALL = 'all';
/** How long leaving entries take to fade before the list swaps. */
const LEAVE_MS = 165;

export const Projects = ({ projects }: ProjectsProps) => {
  const [tech, setTech] = useState<string>(ALL);
  const flipFrom = useRef<Record<string, number> | null>(null);
  const swapTimer = useRef<number>(0);

  const techs = useMemo(() => {
    const out: string[] = [];
    for (const p of projects) {
      for (const t of p.techStack) if (!out.includes(t)) out.push(t);
    }
    return out;
  }, [projects]);

  const visible = useMemo(
    () =>
      tech === ALL
        ? projects
        : projects.filter((p) => p.techStack.includes(tech)),
    [projects, tech],
  );

  const cards = () =>
    Array.from(
      document.querySelectorAll<HTMLElement>('#projects article[data-pkey]'),
    );

  /** Snapshot positions, fade out the leaving entries, then swap the list. */
  const select = (next: string) => {
    if (next === tech) return;
    const nodes = cards();
    if (prefersReducedMotion() || !nodes.length) {
      setTech(next);
      return;
    }
    const keep = (
      next === ALL
        ? projects
        : projects.filter((p) => p.techStack.includes(next))
    ).map((p) => p.title);

    const from: Record<string, number> = {};
    const leaving: HTMLElement[] = [];
    for (const el of nodes) {
      const key = el.dataset.pkey as string;
      from[key] = el.getBoundingClientRect().top;
      if (!keep.includes(key)) leaving.push(el);
    }
    flipFrom.current = from;

    if (!leaving.length) {
      setTech(next);
      return;
    }
    for (const el of leaving) {
      el.style.animation = 'none';
      el.style.transition = 'opacity .16s ease, transform .16s ease';
      el.style.opacity = '0';
      el.style.transform = 'scale(.985)';
    }
    window.clearTimeout(swapTimer.current);
    swapTimer.current = window.setTimeout(() => setTech(next), LEAVE_MS);
  };

  /** FLIP: survivors slide from their old position, newcomers stagger in. */
  useLayoutEffect(() => {
    const from = flipFrom.current;
    if (!from) return;
    flipFrom.current = null;

    const nodes = cards();
    nodes.forEach((el, i) => {
      skipReveal(el);
      el.style.transition = 'none';
      el.style.transform = 'none';
      const prev = from[el.dataset.pkey as string];
      const now = el.getBoundingClientRect().top;

      if (prev == null) {
        el.style.opacity = '0';
        el.style.transform = 'translateY(12px)';
        requestAnimationFrame(() => {
          const delay = `${i * 0.045}s`;
          el.style.transition = `opacity .42s ease ${delay}, transform .42s ${REVEAL_EASE} ${delay}`;
          el.style.opacity = '1';
          el.style.transform = 'none';
        });
      } else if (Math.abs(prev - now) > 1) {
        el.style.transform = `translateY(${prev - now}px)`;
        requestAnimationFrame(() => {
          el.style.transition = `transform .46s ${REVEAL_EASE}`;
          el.style.transform = 'none';
        });
      }
    });

    const cleanup = window.setTimeout(() => {
      for (const el of cards()) {
        el.style.transition = '';
        el.style.transform = '';
      }
    }, 700);
    return () => window.clearTimeout(cleanup);
  }, [visible]);

  useReveal([visible]);

  if (!projects || projects.length === 0) return null;

  return (
    <section id="projects" className="scroll-mt-20 pb-section">
      <SectionHeader
        index="02"
        title="Projects"
        aside={`${visible.length} ${visible.length === 1 ? 'repo' : 'repos'}`}
      />

      <div
        data-reveal
        role="group"
        aria-label="Filter projects by technology"
        className="flex flex-wrap gap-x-5 gap-y-2 border-b border-rule py-4 font-mono text-meta"
      >
        {[ALL, ...techs].map((t) => {
          const on = tech === t;
          return (
            <button
              key={t}
              type="button"
              onClick={() => select(t)}
              aria-pressed={on}
              className={`cursor-pointer transition-colors hover:text-accent ${
                on
                  ? 'text-accent underline decoration-1 underline-offset-[5px]'
                  : 'text-ink-3'
              }`}
            >
              {t}
            </button>
          );
        })}
      </div>

      <div>
        {visible.map((project, i) => (
          <Entry
            key={project.title}
            data-pkey={project.title}
            meta={
              <div className={`flex flex-col gap-1.5 ${META}`}>
                <span className="text-ink">
                  {String(i + 1).padStart(2, '0')}
                </span>
                {project.metrics?.map((metric) => (
                  <span key={metric}>{metric}</span>
                ))}
                {project.codeUrl && (
                  <a
                    href={project.codeUrl}
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
            <h3 className="font-serif text-h3 text-ink">{project.title}</h3>
            {project.description && (
              <p className="mt-3 max-w-[62ch] text-[15.5px] leading-relaxed text-ink-2 text-pretty">
                {project.description}
              </p>
            )}
            {project.highlights && project.highlights.length > 0 && (
              <Bullets items={project.highlights} className="mt-5" />
            )}
            {project.decision && (
              <Decision text={project.decision} className="mt-6" />
            )}
            <Tags items={project.techStack} className="mt-6" />
          </Entry>
        ))}
      </div>
    </section>
  );
};
