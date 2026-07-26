import { Education, Experience } from '../../types';
import { byRecency } from '../../lib/chrono';
import { useReveal } from '../../hooks/useReveal';
import { LogoTile } from '../ui/LogoTile';

interface BackgroundProps {
  experiences: Experience[];
  educations: Education[];
}

const ColumnLabel = ({ text }: { text: string }) => (
  <div className="mb-6 flex items-center gap-2.5 font-mono text-[11px] tracking-[0.14em] text-zinc-600 uppercase">
    <span>{text}</span>
    <span className="text-zinc-800">/</span>
    <span className="tracking-[0.1em] text-zinc-700">now ↓ then</span>
  </div>
);

/** Filled + pulsing when the entry is ongoing, hollow grey when finished. */
const Marker = ({ ongoing }: { ongoing: boolean }) =>
  ongoing ? (
    <span className="absolute top-3.5 -left-[31px] h-[9px] w-[9px]">
      <span
        className="absolute inset-0 rounded-sm bg-emerald-500"
        style={{
          boxShadow: '0 0 0 4px #000, 0 0 14px 2px rgba(16,185,129,.45)',
        }}
      />
      <span
        className="absolute inset-0 rounded-sm border border-emerald-500"
        style={{ animation: 'pulseRing 2.8s ease-out infinite' }}
      />
    </span>
  ) : (
    <span
      className="absolute top-3.5 -left-[31px] box-border h-[9px] w-[9px] rounded-sm border border-zinc-700 bg-zinc-950"
      style={{ boxShadow: '0 0 0 4px #000' }}
    />
  );

export const Background = ({ experiences, educations }: BackgroundProps) => {
  useReveal();
  const work = byRecency(experiences);
  const study = byRecency(educations);

  return (
    <section id="background" className="pb-24">
      <div data-reveal className="mb-8 flex items-center gap-5">
        <h2 className="font-mono text-xl font-semibold tracking-tight text-white">
          <span className="text-emerald-500">~/</span>background
        </h2>
        <div className="h-0 flex-1 border-b border-dashed border-zinc-800" />
      </div>

      <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
        <div>
          <ColumnLabel text="experience" />
          <div className="flex flex-col gap-7 border-l border-[#1f1f22] pl-6">
            {work.map((exp) => (
              <div key={exp.company} data-reveal className="relative">
                <Marker ongoing={exp.ongoing} />
                <div className="mb-2 flex items-center gap-3">
                  <LogoTile src={exp.companyLogo} name={exp.company} />
                  <div>
                    <h3 className="text-[16.5px] font-bold tracking-tight text-white">
                      {exp.position}
                    </h3>
                    <a
                      href={exp.companyLink}
                      target="_blank"
                      rel="noreferrer"
                      className="font-mono text-[12.5px] text-emerald-500/85 hover:text-emerald-400"
                    >
                      @ {exp.company}
                    </a>
                  </div>
                </div>
                <div className="mb-2.5 font-mono text-[11.5px] text-zinc-600">
                  [{exp.from} — {exp.to}]
                  {exp.location ? ` · ${exp.location}` : ''}
                </div>
                <p className="max-w-[46ch] text-sm leading-relaxed text-zinc-400 text-pretty">
                  {exp.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <ColumnLabel text="education" />
          <div className="flex flex-col gap-7 border-l border-[#1f1f22] pl-6">
            {study.map((edu) => (
              <div key={edu.degree} data-reveal className="relative">
                <Marker ongoing={edu.ongoing} />
                <div className="mb-2 flex items-center gap-3">
                  <LogoTile src={edu.institutionLogo} name={edu.institution} />
                  <div>
                    <h3 className="text-[16.5px] font-bold tracking-tight text-white">
                      {edu.degree}
                    </h3>
                    <a
                      href={edu.institutionLink}
                      target="_blank"
                      rel="noreferrer"
                      className="font-mono text-[12.5px] text-emerald-500/85 hover:text-emerald-400"
                    >
                      @ {edu.institution}
                    </a>
                  </div>
                </div>
                <div className="mb-2.5 font-mono text-[11.5px] text-zinc-600">
                  [{edu.from} — {edu.to}]{edu.score ? ` · ${edu.score}` : ''}
                </div>
                <p className="max-w-[46ch] text-sm leading-relaxed text-zinc-400 text-pretty">
                  {edu.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
