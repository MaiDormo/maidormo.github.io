import { Hackathon } from '../../types';
import { useReveal } from '../../hooks/useReveal';

interface HackathonsProps {
  hackathons: Hackathon[];
}

const won = (hack: Hackathon) =>
  hack.highlights.some((h) => /first place|winner|1st/i.test(h)) ||
  /winner/i.test(hack.description);

export const Hackathons = ({ hackathons }: HackathonsProps) => {
  useReveal();
  if (!hackathons || hackathons.length === 0) return null;

  return (
    <section id="hackathons" className="pb-28">
      <div data-reveal className="mb-8 flex items-center gap-5">
        <h2 className="font-mono text-xl font-semibold tracking-tight text-white">
          <span className="text-emerald-500">~/</span>hackathons
        </h2>
        <div className="h-0 flex-1 border-b border-dashed border-zinc-800" />
      </div>

      <div className="grid grid-cols-1 gap-3.5 md:grid-cols-2">
        {hackathons.map((hack) => (
          <article
            key={hack.title}
            data-reveal
            className="flex flex-col rounded-lg border border-[#1a1a1a] bg-[#050505] p-7 transition-[border-color,box-shadow] duration-300 hover:border-emerald-500/30 hover:shadow-[0_10px_40px_rgba(0,0,0,.6),0_0_34px_rgba(16,185,129,.05)]"
          >
            <div data-stagger className="flex flex-1 flex-col">
              <div className="mb-4 flex flex-wrap items-center gap-2 font-mono text-[10.5px] tracking-[0.1em] uppercase">
                <span className="rounded-sm border border-emerald-500/25 bg-emerald-500/5 px-2.5 py-1 text-emerald-400">
                  {hack.event} · {hack.date}
                </span>
                {won(hack) && (
                  <span className="rounded-sm bg-emerald-500 px-2.5 py-1 font-semibold text-black">
                    1st place
                  </span>
                )}
              </div>

              <h3 className="mb-2 text-xl font-bold tracking-tight text-white">
                {hack.title}
              </h3>

              <div className="mb-4 font-mono text-xs text-zinc-600">
                {hack.organizer ? `${hack.organizer} — ` : ''}
                {hack.location}
              </div>

              <p className="mb-4.5 text-[14.5px] leading-relaxed text-zinc-400 text-pretty">
                {hack.description}
              </p>

              <ul className="mb-4.5 flex list-none flex-col gap-2 p-0">
                {hack.highlights.map((h) => (
                  <li
                    key={h}
                    className="flex gap-2.5 text-[13.5px] leading-snug text-zinc-400"
                  >
                    <span className="shrink-0 font-mono text-emerald-500/70">
                      *
                    </span>
                    <span>{h}</span>
                  </li>
                ))}
              </ul>

              {hack.decision && (
                <div className="mb-4.5 rounded-r border-l-2 border-emerald-500/45 bg-zinc-900/50 p-4">
                  <div className="mb-2 font-mono text-[10.5px] tracking-[0.12em] text-zinc-600 uppercase">
                    key decision
                  </div>
                  <p className="text-sm leading-relaxed text-zinc-300">
                    {hack.decision}
                  </p>
                </div>
              )}

              <div className="mt-auto flex flex-wrap items-center gap-1.5 font-mono text-[11px]">
                {hack.techStack.map((t) => (
                  <span
                    key={t}
                    className="rounded-sm border border-zinc-800 bg-zinc-950/80 px-2.5 py-1 text-zinc-500"
                  >
                    {t}
                  </span>
                ))}
                {hack.codeUrl && (
                  <a
                    href={hack.codeUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="ml-auto font-mono text-xs text-zinc-600 hover:text-emerald-400"
                  >
                    source ↗
                  </a>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};
