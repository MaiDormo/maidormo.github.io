import { useLayoutEffect, useMemo, useRef, useState } from 'react';
import { Project } from '../../types';
import { useReveal } from '../../hooks/useReveal';
import {
  prefersReducedMotion,
  REVEAL_EASE,
  skipReveal,
} from '../../lib/reveal';

interface ProjectsProps {
  projects: Project[];
}

const ALL = 'all';

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

  /** Snapshot positions, fade out the leaving cards, then swap the list. */
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
    swapTimer.current = window.setTimeout(() => setTech(next), 165);
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
    <section id="projects" className="pb-28">
      <div data-reveal className="mb-3 flex items-center gap-5">
        <h2 className="font-mono text-xl font-semibold tracking-tight text-white">
          <span className="text-emerald-500">~/</span>projects
        </h2>
        <div className="h-0 flex-1 border-b border-dashed border-zinc-800" />
        <span className="font-mono text-xs text-zinc-600">
          {visible.length} {visible.length === 1 ? 'repo' : 'repos'}
        </span>
      </div>

      <div
        data-reveal
        className="mb-8 flex flex-wrap gap-1.5 font-mono text-[11.5px]"
      >
        {[ALL, ...techs].map((t) => {
          const on = tech === t;
          return (
            <button
              key={t}
              type="button"
              onClick={() => select(t)}
              aria-pressed={on}
              className={`cursor-pointer rounded-sm border px-2.5 py-1 transition-colors hover:border-emerald-500/50 ${
                on
                  ? 'border-emerald-500/50 bg-emerald-500/10 text-emerald-400'
                  : 'border-zinc-800 bg-zinc-950/80 text-zinc-500'
              }`}
            >
              {t}
            </button>
          );
        })}
      </div>

      <div className="flex flex-col gap-3.5">
        {visible.map((project, i) => (
          <article
            key={project.title}
            data-reveal
            data-pkey={project.title}
            className="group relative rounded-lg border border-[#1a1a1a] bg-[#050505] p-7 transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-0.5 hover:border-emerald-500/30 hover:shadow-[0_10px_40px_rgba(0,0,0,.6),0_0_34px_rgba(16,185,129,.05)]"
          >
            <div className="flex items-start gap-5">
              <span className="shrink-0 pt-1.5 font-mono text-xs text-zinc-700">
                {String(i + 1).padStart(2, '0')}
              </span>

              <div data-stagger className="min-w-0 flex-1">
                <div className="mb-2.5 flex flex-wrap items-baseline justify-between gap-3">
                  <h3 className="text-xl font-bold tracking-tight text-white">
                    {project.title}
                  </h3>
                  {project.codeUrl && (
                    <a
                      href={project.codeUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="shrink-0 font-mono text-xs text-zinc-600 hover:text-emerald-400"
                    >
                      source ↗
                    </a>
                  )}
                </div>

                {project.metrics && project.metrics.length > 0 && (
                  <div className="mb-3.5 flex flex-wrap gap-1.5 font-mono text-[11px]">
                    {project.metrics.map((metric) => (
                      <span
                        key={metric}
                        className="rounded-sm border border-emerald-500/20 bg-emerald-500/5 px-2 py-0.5 text-emerald-400/90"
                      >
                        {metric}
                      </span>
                    ))}
                  </div>
                )}

                <p className="mb-4 max-w-[68ch] text-[15px] leading-relaxed text-zinc-400 text-pretty">
                  {project.description}
                </p>

                {project.imageUrl && (
                  <div className="mb-4 max-w-[560px] rounded-md border border-[#1a1a1a] bg-zinc-950 p-2.5">
                    <img
                      src={project.imageUrl}
                      alt={project.title}
                      // Intrinsic size lets the browser reserve the box before
                      // the bytes land, so a late image cannot shift the page.
                      width={project.imageWidth}
                      height={project.imageHeight}
                      loading="lazy"
                      decoding="async"
                      className="block h-auto w-full opacity-80 grayscale transition duration-300 group-hover:opacity-100 group-hover:grayscale-0"
                    />
                  </div>
                )}

                {project.highlights && project.highlights.length > 0 && (
                  <ul className="mb-4 flex list-none flex-col gap-2 p-0">
                    {project.highlights.map((highlight) => (
                      <li
                        key={highlight}
                        className="flex gap-2.5 text-[13.5px] leading-snug text-zinc-400"
                      >
                        <span
                          aria-hidden="true"
                          className="shrink-0 font-mono text-emerald-500/70"
                        >
                          *
                        </span>
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {project.decision && (
                  <div className="mb-4 rounded-r border-l-2 border-emerald-500/45 bg-zinc-900/50 p-4">
                    <div className="mb-2 font-mono text-[10.5px] tracking-[0.12em] text-zinc-600 uppercase">
                      key decision
                    </div>
                    <p className="max-w-[66ch] text-sm leading-relaxed text-zinc-300">
                      {project.decision}
                    </p>
                  </div>
                )}

                <div className="flex flex-wrap gap-1.5 font-mono text-[11px]">
                  {project.techStack.map((t) => (
                    <span
                      key={t}
                      className="rounded-sm border border-zinc-800 bg-zinc-950/80 px-2.5 py-1 text-zinc-500"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};
