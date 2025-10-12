// gitprofile.config.ts

// ...existing code...
const CONFIG = {
  github: {
    username: 'MaiDormo', // Your GitHub org/user name.
  },
  base: '/',
  projects: {
    github: {
      display: true,
      header: 'Github Projects',
      mode: 'automatic',
      automatic: {
        sortBy: 'stars',
        limit: 12,
        exclude: {
          forks: false,
          projects: ['MaiDormo/MaiDormo', 'MaiDormo/TraderVisualizationEgui', 'MaiDormo/distributed-system', 'MaiDormo/MaiDormo.github.com'], // add repo strings here to hide specific repos, e.g. ['MaiDormo/private-repo']
        },
      },
      // To manually list projects, set mode: 'manual' and uncomment below:
      // manual: {
      //   projects: ['MaiDormo/project-1', 'MaiDormo/project-2'],
      // },
    },
    external: {
      header: 'My Projects',
      // Add external projects here if you want them shown
      // projects: [{ title: 'Project', description: '...', imageUrl: '...', link: '...' }],
    },
  },
  seo: {
    title: 'Elia Gatti — Software Engineer',
    description: 'Software engineer with a strong passion for backend development, automation, and system optimization.',
    imageURL: '', // optional: social preview image URL
  },
  social: {
    linkedin: 'elia-gatti',
    // x: '', (intentionally left empty)
    email: 'elia.gatti01@gmail.com',
    // add other handles if desired
  },
  resume: {
    fileUrl: '/elia-gatti-cv.pdf', // Put a resume PDF at this path or use a remote URL
  },
  skills: [
    'Git',
    'Docker',
    'Bash',
    'C',
    'C++',
    'Java',
    'Python',
    'Linux',
    'REST APIs',
    'React',
  ],
  experiences: [
    {
      company: 'Dedagroup S.P.A',
      position: 'Software Engineer Intern',
      from: 'May 2024',
      to: 'September 2024',
      companyLink: 'https://www.deda.com/home',
    },
    // add more experience objects as needed
  ],
  certifications: [
    // add certifications here
  ],
  educations: [
    {
      institution: 'University of Trento',
      degree: 'M.S. in Computer Science',
      from: '2024',
      to: 'present',
    },
    {
      institution: 'University of Trento',
      degree: 'B.S. in Computer Science',
      from: '2020',
      to: '2024',
    },
  ],
  publications: [
    // replace with your publications or remove
  ],
  blog: {
    source: 'dev',
    username: '', // set if you want blog entries shown
    limit: 2,
  },
  googleAnalytics: { id: '' },
  hotjar: { id: '', snippetVersion: 6 },
  themeConfig: {
    defaultTheme: 'dim',
    disableSwitch: true,
    respectPrefersColorScheme: false,
    displayAvatarRing: true,
    themes: [
      'light','dark','cupcake','bumblebee','emerald','corporate','synthwave','retro',
      'cyberpunk','valentine','halloween','garden','forest','aqua','lofi','pastel',
      'fantasy','wireframe','black','luxury','dracula','cmyk','autumn','business',
      'acid','lemonade','night','coffee','winter','dim','nord','sunset','caramellatte',
      'abyss','silk','procyon',
    ],
  },
  footer: `Made with <a class="text-primary" href="https://github.com/arifszn/gitprofile" target="_blank" rel="noreferrer">GitProfile</a>`,
  enablePWA: true,
};

export default CONFIG;