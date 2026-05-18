import CONFIG from '../gitprofile.config';
import {
  GithubIcon,
  LinkedinIcon,
  StravaIcon,
  FilePdfIcon,
  EnvelopeIcon,
  ExternalLinkIcon,
} from './icon';

interface Project {
  title: string;
  description?: string;
  imageUrl?: string;
  techStack: string[];
  decision?: string;
  demoUrl?: string;
  codeUrl?: string;
}

interface Experience {
  position: string;
  company: string;
  companyLink?: string;
  from: string;
  to: string;
  description?: string;
}

interface Education {
  degree: string;
  institution: string;
  institutionLink?: string;
  from: string;
  to: string;
  description?: string;
}

const App = () => {
  const {
    customBio,
    social,
    resume,
    projects,
    experiences,
    educations,
    systemStatus,
  } = CONFIG;
  const externalProjects = projects?.external?.projects ?? [];

  return (
    <div className="relative min-h-screen bg-black text-zinc-400 overflow-hidden">
      <div className="relative z-10 p-6 md:p-12 lg:p-24 max-w-4xl mx-auto">
        <header className="mb-24 animate-fade-in-up">
          <span className="font-mono text-emerald-500 text-sm mb-4 block flex items-center gap-2">
            <span className="w-2 h-3 bg-emerald-500 animate-blink"></span>
            elia@local:~$ ./whoami
          </span>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight drop-shadow-sm">
            Elia Gatti
          </h1>
          <p className="text-xl md:text-2xl text-zinc-300 font-medium mb-8">
            Software Engineer <span className="text-zinc-600 font-light mx-2">|</span> HPC & Distributed Systems
          </p>
          <p className="text-base md:text-lg mb-10 max-w-2xl leading-relaxed text-zinc-400">
            {customBio} Specializing in backend development, systems
            programming, and high-performance computing.
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

        <section className="mb-32 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
          <h2 className="text-2xl font-bold text-white mb-12 flex items-center gap-6 font-mono">
            <span className="text-emerald-500">~/</span> projects
            <div className="h-px bg-zinc-800 flex-1 border-b border-dashed border-zinc-700"></div>
          </h2>

          <div className="flex flex-col gap-10">
            {externalProjects.map((project: Project, idx: number) => (
              <div key={idx} className="group flex flex-col md:flex-row items-center gap-8 hack-panel p-6 md:p-8 rounded-none md:rounded-lg relative overflow-hidden">
                {project.imageUrl && (
                  <div className="w-full md:w-2/5 shrink-0 overflow-hidden border border-zinc-800 bg-zinc-900/40 z-10 flex items-center justify-center p-1">
                    <img
                      src={project.imageUrl}
                      alt={project.title}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-auto object-contain opacity-70 group-hover:opacity-100 transition-opacity duration-300 grayscale group-hover:grayscale-0"
                    />
                  </div>
                )}

                <div className={`flex flex-col justify-center z-10 ${project.imageUrl ? 'md:w-3/5' : 'w-full'}`}>
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-emerald-400 transition-colors">
                      {project.title}
                    </h3>
                    <div className="flex gap-3 text-zinc-500">
                      {project.demoUrl && (
                        <a
                          href={project.demoUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="hover:text-emerald-400 transition-colors"
                          title="Live Demo"
                        >
                          <ExternalLinkIcon size={20} />
                        </a>
                      )}
                      {project.codeUrl && (
                        <a
                          href={project.codeUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="hover:text-emerald-400 transition-colors"
                          title="Source Code"
                        >
                          <GithubIcon size={22} />
                        </a>
                      )}
                    </div>
                  </div>

                  <p className="mb-6 text-zinc-400 leading-relaxed">
                    {project.description}
                  </p>

                  {project.decision && (
                    <div className="mb-6 bg-zinc-900/50 border-l-2 border-emerald-500/50 p-4">
                      <strong className="text-zinc-500 font-mono text-xs uppercase tracking-wider block mb-2">
                        &gt; Architecture_Decision
                      </strong>
                      <p className="text-zinc-300 text-sm">
                        {project.decision}
                      </p>
                    </div>
                  )}

                  <div className="mt-auto flex flex-wrap gap-2 pt-2 font-mono text-xs">
                    {project.techStack.map((tech: string) => (
                      <span key={tech} className="px-2 py-1 text-zinc-400 border border-zinc-800 bg-zinc-900/50">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-32 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          <div>
            <h2 className="text-xl font-bold text-white mb-10 flex items-center gap-4 font-mono">
              <span className="text-emerald-500">~/</span> experience
              <div className="h-px bg-zinc-800 flex-1 border-b border-dashed border-zinc-700"></div>
            </h2>
            <div className="flex flex-col gap-10 border-l border-zinc-800 pl-6 ml-2">
              {(experiences ?? []).map((exp: Experience, idx: number) => (
                <div key={idx} className="relative group">
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
              {(educations ?? []).map((edu: Education, idx: number) => (
                <div key={idx} className="relative group">
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
                  <p className="text-sm text-zinc-400 leading-relaxed">{edu.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <footer className="pt-8 border-t border-dashed border-zinc-800 text-xs text-zinc-600 flex flex-col md:flex-row justify-between items-center gap-6 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
          <p className="font-mono text-zinc-500">© {new Date().getFullYear()} Elia Gatti. <span className="hidden md:inline">SYSTEM_READY</span></p>
          <div className="flex gap-4">
            {systemStatus?.display && (
              <div className="flex items-center gap-4 font-mono hack-badge px-4 py-2">
                <span className="hidden md:inline text-zinc-600">
                  REG: <span className="text-zinc-400">{systemStatus.region}</span>
                </span>
                <span className="hidden md:inline text-zinc-600">
                  UP: <span className="text-zinc-400">{systemStatus.uptime}</span>
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-emerald-500 font-bold tracking-wide">SYS_NOMINAL</span>
                  <span className="w-2 h-2 bg-emerald-500 animate-blink"></span>
                </div>
              </div>
            )}
          </div>
        </footer>
      </div>
    </div>
  );
};

export default App;
