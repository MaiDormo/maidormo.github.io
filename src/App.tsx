// @ts-ignore
import CONFIG from '../gitprofile.config';
import { FaGithub, FaLinkedin, FaStrava, FaFilePdf, FaEnvelope, FaExternalLinkAlt } from 'react-icons/fa';

const App = () => {
  return (
    <div className="min-h-screen bg-black text-zinc-400 p-6 md:p-12 lg:p-24 selection:bg-zinc-800 selection:text-white">
      <div className="max-w-4xl mx-auto">
        
        {/* Hero Section */}
        <header className="mb-20 animate-fade-in-up">
          <span className="font-mono text-zinc-500 text-sm mb-3 block">elia@local:~$ ./whoami</span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 tracking-tight">
            Elia Gatti
          </h1>
          <p className="text-xl md:text-2xl text-zinc-300 font-medium mb-6">
            Software Engineer <span className="text-zinc-600">|</span> HPC & Distributed Systems
          </p>
          <p className="text-base md:text-lg mb-8 max-w-2xl leading-relaxed">
            {CONFIG.customBio} Specializing in backend development, systems programming, and high-performance computing.
          </p>
          
          <div className="flex flex-wrap gap-4">
            <a 
              href={`https://github.com/${CONFIG.social.github}`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-white !text-black font-semibold rounded-md hover:bg-zinc-200 transition-colors"
            >
              <FaGithub size={18} /> GitHub
            </a>
            <a 
              href={`https://linkedin.com/in/${CONFIG.social.linkedin}`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-[#0A66C2] text-white font-semibold rounded-md hover:bg-[#004182] transition-colors"
            >
              <FaLinkedin size={18} /> LinkedIn
            </a>
            {CONFIG.social.strava && (
              <a 
                href={`https://www.strava.com/athletes/${CONFIG.social.strava}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-[#fc4c02] border border-[#fc4c02] text-white font-semibold rounded-md hover:bg-[#e34402] hover:border-[#e34402] transition-colors"
              >
                <FaStrava size={18} /> Strava
              </a>
            )}
            <a 
              href={CONFIG.resume.fileUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 px-4 py-2 border border-zinc-700 text-white font-semibold rounded-md hover:border-zinc-500 transition-colors"
            >
              <FaFilePdf size={18} /> CV / Resume
            </a>
            <a 
              href={`mailto:${CONFIG.social.email}`}
              className="flex items-center gap-2 px-4 py-2 border border-zinc-700 text-white font-semibold rounded-md hover:border-zinc-500 transition-colors"
            >
              <FaEnvelope size={18} /> Email
            </a>
          </div>
        </header>

        {/* Selected Projects */}
        <section className="mb-24">
          <h2 className="text-2xl font-bold text-white mb-10 flex items-center gap-4">
            Selected Work
            <div className="h-px bg-zinc-800 flex-1"></div>
          </h2>
          
          <div className="flex flex-col gap-16">
            {CONFIG.projects.external.projects.map((project: any, idx: number) => (
              <div key={idx} className="group flex flex-col md:flex-row gap-8">
                {/* Visual Anchor (if exists) */}
                {project.imageUrl && (
                  <div className="w-full md:w-2/5 shrink-0 overflow-hidden rounded-lg border border-zinc-800 bg-zinc-900/50">
                    <img 
                      src={project.imageUrl} 
                      alt={project.title} 
                      className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                    />
                  </div>
                )}
                
                {/* Content */}
                <div className={`flex flex-col justify-center ${project.imageUrl ? 'md:w-3/5' : 'w-full'}`}>
                  <div className="flex items-center justify-between gap-4 mb-2">
                    <h3 className="text-xl font-bold text-white">
                      {project.title}
                    </h3>
                    <div className="flex gap-3 text-zinc-500">
                      {project.demoUrl && (
                        <a href={project.demoUrl} target="_blank" rel="noreferrer" className="hover:text-white transition-colors" title="Live Demo">
                          <FaExternalLinkAlt size={18} />
                        </a>
                      )}
                      {project.codeUrl && (
                        <a href={project.codeUrl} target="_blank" rel="noreferrer" className="hover:text-white transition-colors" title="Source Code">
                          <FaGithub size={20} />
                        </a>
                      )}
                    </div>
                  </div>
                  
                  <p className="mb-4 text-zinc-400 leading-relaxed">
                    {project.description}
                  </p>
                  
                  <div className="mb-4">
                    <strong className="text-zinc-300 text-sm block mb-1">Architecture Decision:</strong>
                    <p className="text-zinc-400 text-sm italic border-l-2 border-zinc-700 pl-3 py-1 bg-zinc-900/30">
                      {project.decision}
                    </p>
                  </div>

                  <div className="mt-auto font-mono text-xs text-zinc-500">
                    <span className="text-zinc-400">[</span>
                    {project.techStack.map((tech: string, i: number) => (
                      <span key={tech}>
                        <span className="text-zinc-300">"{tech}"</span>
                        {i < project.techStack.length - 1 && <span className="text-zinc-600 mr-2">,</span>}
                      </span>
                    ))}
                    <span className="text-zinc-400">]</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Experience & Education Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
          
          {/* Experience */}
          <div>
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-4">
              Experience
              <div className="h-px bg-zinc-800 flex-1"></div>
            </h2>
            <div className="flex flex-col gap-6">
              {CONFIG.experiences.map((exp: any, idx: number) => (
                <div key={idx}>
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="text-white font-semibold">{exp.position}</h3>
                    <span className="text-zinc-500 text-sm font-mono">{exp.from} - {exp.to}</span>
                  </div>
                  <a href={exp.companyLink} target="_blank" rel="noreferrer" className="text-zinc-400 hover:text-white block mb-2 text-sm">
                    {exp.company}
                  </a>
                  <p className="text-sm text-zinc-400 leading-relaxed">
                    {exp.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div>
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-4">
              Education
              <div className="h-px bg-zinc-800 flex-1"></div>
            </h2>
            <div className="flex flex-col gap-6">
              {CONFIG.educations.map((edu: any, idx: number) => (
                <div key={idx}>
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="text-white font-semibold">{edu.degree}</h3>
                    <span className="text-zinc-500 text-sm font-mono">{edu.from} - {edu.to}</span>
                  </div>
                  <a href={edu.institutionLink} target="_blank" rel="noreferrer" className="text-zinc-400 hover:text-white block mb-2 text-sm">
                    {edu.institution}
                  </a>
                  <p className="text-sm text-zinc-400">
                    {edu.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </section>

        {/* Footer */}
        <footer className="pt-8 border-t border-zinc-800 text-xs text-zinc-600 flex flex-col md:flex-row justify-between items-center gap-4">
          <p>© {new Date().getFullYear()} Elia Gatti. All rights reserved.</p>
          <div className="flex gap-4">
            {CONFIG.systemStatus.display && (
              <div className="flex items-center gap-3 font-mono">
                <span className="hidden md:inline text-zinc-500">
                  [REGION: {CONFIG.systemStatus.region}]
                </span>
                <span className="hidden md:inline text-zinc-500">
                  [UPTIME: {CONFIG.systemStatus.uptime}]
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-zinc-400">[STATUS: NOMINAL]</span>
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                </div>
                <span className="animate-pulse text-zinc-400 ml-1">█</span>
              </div>
            )}
          </div>
        </footer>

      </div>
    </div>
  );
};

export default App;
