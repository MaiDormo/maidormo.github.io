import { Hackathon } from '../../types';

interface HackathonsProps {
  hackathons: Hackathon[];
}

export const Hackathons = ({ hackathons }: HackathonsProps) => {
  if (!hackathons || hackathons.length === 0) return null;

  return (
    <section
      id="hackathons"
      className="mb-32 animate-fade-in-up"
      style={{ animationDelay: '0.15s' }}
    >
      <h2 className="text-2xl font-bold text-white mb-12 flex items-center gap-6 font-mono">
        <span className="text-emerald-500">~/</span> hackathons
        <div className="h-px bg-zinc-800 flex-1 border-b border-dashed border-zinc-700"></div>
      </h2>

      <div className="flex flex-col gap-10">
        {hackathons.map((hack) => (
          <div
            key={hack.title}
            className="hack-panel p-6 md:p-8 rounded-none md:rounded-lg relative overflow-hidden"
          >
            <div className="flex flex-col gap-2 mb-6 pb-4 border-b border-zinc-800/60">
              <div className="flex flex-wrap items-center gap-3">
                <span className="font-mono text-emerald-400 text-xs uppercase tracking-widest border border-emerald-500/20 px-3 py-1 bg-emerald-500/5">
                  {hack.event}
                </span>
                {hack.organizer && (
                  <span className="text-zinc-500 font-mono text-xs">
                    by {hack.organizer}
                  </span>
                )}
              </div>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-zinc-400 font-mono mt-2">
                <span>{hack.date}</span>
                <span className="text-zinc-700">|</span>
                <span>{hack.location}</span>
              </div>
            </div>

            <div className="flex flex-col justify-center">
              <h3 className="text-xl md:text-2xl font-bold text-white mb-4">
                {hack.title}
              </h3>

              <p className="mb-6 text-zinc-400 leading-relaxed">
                {hack.description}
              </p>

              {hack.highlights.length > 0 && (
                <div className="mb-6">
                  <strong className="text-zinc-500 font-mono text-xs uppercase tracking-wider block mb-3">
                    &gt; Key_Features
                  </strong>
                  <ul className="space-y-1.5">
                    {hack.highlights.map((h, i) => (
                      <li
                        key={i}
                        className="text-sm text-zinc-400 flex items-start gap-2"
                      >
                        <span className="text-emerald-500/70 mt-0.5 shrink-0">
                          *
                        </span>
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {hack.decision && (
                <div className="mb-6 bg-zinc-900/50 border-l-2 border-emerald-500/50 p-4">
                  <strong className="text-zinc-500 font-mono text-xs uppercase tracking-wider block mb-2">
                    &gt; Architecture_Decision
                  </strong>
                  <p className="text-zinc-300 text-sm">{hack.decision}</p>
                </div>
              )}

              <div className="mt-auto flex flex-wrap gap-2 pt-2 font-mono text-xs">
                {hack.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-1 text-zinc-400 border border-zinc-800 bg-zinc-900/50"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
