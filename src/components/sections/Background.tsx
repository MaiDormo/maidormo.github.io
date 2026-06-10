import { Experience, Education } from '../../types';

interface BackgroundProps {
  experiences: Experience[];
  educations: Education[];
}

export const Background = ({ experiences, educations }: BackgroundProps) => {
  return (
    <section
      id="background"
      className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-32 animate-fade-in-up"
      style={{ animationDelay: '0.2s' }}
    >
      <div>
        <h2 className="text-xl font-bold text-white mb-10 flex items-center gap-4 font-mono">
          <span className="text-emerald-500">~/</span> experience
          <div className="h-px bg-zinc-800 flex-1 border-b border-dashed border-zinc-700"></div>
        </h2>
        <div className="flex flex-col gap-10 border-l border-zinc-800 pl-6 ml-2">
          {experiences.map((exp) => (
            <div key={exp.company} className="relative group">
              <span className="absolute -left-[29px] top-1.5 w-2 h-2 bg-zinc-800 group-hover:bg-emerald-500 transition-colors"></span>
              <div className="flex flex-col mb-2 gap-1">
                <h3 className="text-white font-bold text-lg">{exp.position}</h3>
                <span className="text-zinc-500 text-sm font-mono">
                  [{exp.from} - {exp.to}]
                </span>
              </div>
              <a
                href={exp.companyLink}
                target="_blank"
                rel="noreferrer"
                className="text-emerald-500/80 hover:text-emerald-400 font-mono block mb-3 text-sm transition-colors"
              >
                @ {exp.company}
              </a>
              <p className="text-sm text-zinc-400 leading-relaxed">
                {exp.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-xl font-bold text-white mb-10 flex items-center gap-4 font-mono">
          <span className="text-emerald-500">~/</span> education
          <div className="h-px bg-zinc-800 flex-1 border-b border-dashed border-zinc-700"></div>
        </h2>
        <div className="flex flex-col gap-10 border-l border-zinc-800 pl-6 ml-2">
          {educations.map((edu) => (
            <div key={edu.degree} className="relative group">
              <span className="absolute -left-[29px] top-1.5 w-2 h-2 bg-zinc-800 group-hover:bg-emerald-500 transition-colors"></span>
              <div className="flex flex-col mb-2 gap-1">
                <h3 className="text-white font-bold text-lg">{edu.degree}</h3>
                <span className="text-zinc-500 text-sm font-mono">
                  [{edu.from} - {edu.to}]
                </span>
              </div>
              <a
                href={edu.institutionLink}
                target="_blank"
                rel="noreferrer"
                className="text-emerald-500/80 hover:text-emerald-400 font-mono block mb-3 text-sm transition-colors"
              >
                @ {edu.institution}
              </a>
              <p className="text-sm text-zinc-400 leading-relaxed">
                {edu.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
