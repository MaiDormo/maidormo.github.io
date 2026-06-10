import { ExternalLinkIcon, GithubIcon } from '../../icon';
import { Project } from '../../types';

interface ProjectsProps {
  projects: Project[];
}

export const Projects = ({ projects }: ProjectsProps) => {
  if (!projects || projects.length === 0) return null;

  return (
    <section
      id="projects"
      className="mb-32 animate-fade-in-up"
      style={{ animationDelay: '0.1s' }}
    >
      <h2 className="text-2xl font-bold text-white mb-12 flex items-center gap-6 font-mono">
        <span className="text-emerald-500">~/</span> projects
        <div className="h-px bg-zinc-800 flex-1 border-b border-dashed border-zinc-700"></div>
      </h2>

      <div className="flex flex-col gap-10">
        {projects.map((project) => (
          <div
            key={project.title}
            className="group flex flex-col md:flex-row items-center gap-8 hack-panel p-6 md:p-8 rounded-none md:rounded-lg relative overflow-hidden"
          >
            {project.imageUrl && (
              <div className="w-full md:w-2/5 shrink-0 overflow-hidden border border-zinc-800 bg-zinc-900/40 z-10 flex items-center justify-center p-1">
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  width="1863"
                  height="1284"
                  className="w-full h-auto object-contain opacity-70 group-hover:opacity-100 transition-opacity duration-300 grayscale group-hover:grayscale-0"
                />
              </div>
            )}

            <div
              className={`flex flex-col justify-center z-10 ${
                project.imageUrl ? 'md:w-3/5' : 'w-full'
              }`}
            >
              <div className="flex items-start justify-between gap-4 mb-4">
                <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-emerald-400 transition-colors">
                  {project.title}
                </h3>
                <div className="flex gap-3 text-zinc-400">
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
                  <p className="text-zinc-300 text-sm">{project.decision}</p>
                </div>
              )}

              <div className="mt-auto flex flex-wrap gap-2 pt-2 font-mono text-xs">
                {project.techStack.map((tech) => (
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
