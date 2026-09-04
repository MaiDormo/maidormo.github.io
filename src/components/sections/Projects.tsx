import { Project } from '../../types';
import { useReveal } from '../../hooks/useReveal';
import { LINK, META } from '../../lib/styles';
import { SectionHeader } from '../ui/SectionHeader';
import { Entry } from '../ui/Entry';
import { Bullets } from '../ui/Bullets';
import { Tags } from '../ui/Tags';

interface ProjectsProps {
  projects: Project[];
}

export const Projects = ({ projects }: ProjectsProps) => {
  useReveal();
  if (!projects || projects.length === 0) return null;

  return (
    <section id="projects" className="scroll-mt-32 pb-section md:scroll-mt-20">
      <SectionHeader index="02" title="Projects" />

      <div>
        {projects.map((project, i) => (
          <Entry
            key={project.title}
            meta={
              <div
                className={`flex flex-row flex-wrap items-center gap-x-3 gap-y-1.5 md:flex-col md:items-start ${META}`}
              >
                <span className="text-ink">
                  {String(i + 1).padStart(2, '0')}
                </span>
                {project.date && <span>{project.date}</span>}
                {project.codeUrl && (
                  <a
                    href={project.codeUrl}
                    target="_blank"
                    rel="noreferrer"
                    className={`${LINK} w-fit text-ink-2`}
                  >
                    source
                  </a>
                )}
                {project.thesisUrl && (
                  <a
                    href={project.thesisUrl}
                    target="_blank"
                    rel="noreferrer"
                    className={`${LINK} w-fit text-ink-2`}
                  >
                    thesis
                  </a>
                )}
              </div>
            }
          >
            <h3 className="font-serif text-h3 text-ink">{project.title}</h3>
            <Bullets items={project.highlights} className="mt-4" />
            <Tags items={project.techStack} className="mt-6" />
          </Entry>
        ))}
      </div>
    </section>
  );
};
