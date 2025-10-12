// gitprofile.config.ts

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
          projects: ['MaiDormo/MaiDormo', 'MaiDormo/TraderVisualizationEgui', 'MaiDormo/distributed-system', 'MaiDormo/MaiDormo.github.io', 'MaiDormo/Lab_SDE'], // add repo strings here to hide specific repos, e.g. ['MaiDormo/private-repo']
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
  // Custom bio to display on the avatar card (optional, overrides GitHub bio)
  customBio: 'Software engineer passionate about building scalable systems, optimizing performance, and exploring cutting-edge technologies. Currently pursuing M.S. in Computer Science at University of Trento.',
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
    {
      category: 'Programming Languages',
      badges: [
        'https://img.shields.io/badge/C-00599C?style=for-the-badge&logo=c&logoColor=white',
        'https://img.shields.io/badge/java-%23ED8B00.svg?style=for-the-badge&logo=openjdk&logoColor=white',
        'https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54',
      ],
    },
    {
      category: 'Development Tools & Scripting',
      badges: [
        'https://img.shields.io/badge/bash-%23121011.svg?style=for-the-badge&logo=gnu-bash&logoColor=white',
        'https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white',
        'https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white',
      ],
    },
    {
      category: 'Mobile Development',
      badges: [
        'https://img.shields.io/badge/dart-%230175C2.svg?style=for-the-badge&logo=dart&logoColor=white',
        'https://img.shields.io/badge/Flutter-%2302569B.svg?style=for-the-badge&logo=Flutter&logoColor=white',
      ],
    },
    {
      category: 'HPC and GPU Programming',
      badges: [
        'https://img.shields.io/badge/Cuda-%2376B900.svg?style=for-the-badge&logo=nvidia&logoColor=white',
        'https://img.shields.io/badge/MPI-%23316192.svg?style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZmlsbD0id2hpdGUiIGQ9Ik0xMiAyQzYuNDggMiAyIDYuNDggMiAxMnM0LjQ4IDEwIDEwIDEwIDEwLTQuNDggMTAtMTBTMTcuNTIgMiAxMiAyem0wIDE4Yy00LjQxIDAtOC0zLjU5LTgtOHMzLjU5LTggOC04IDggMy41OSA4IDgtMy41OSA4LTggOHoiLz48L3N2Zz4=&logoColor=white',
        'https://img.shields.io/badge/OpenMP-%23316192.svg?style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZmlsbD0id2hpdGUiIGQ9Ik0xMiAyQzYuNDggMiAyIDYuNDggMiAxMnM0LjQ4IDEwIDEwIDEwIDEwLTQuNDggMTAtMTBTMTcuNTIgMiAxMiAyem0wIDE4Yy00LjQxIDAtOC0zLjU5LTgtOHMzLjU5LTggOC04IDggMy41OSA4IDgtMy41OSA4LTggOHoiLz48L3N2Zz4=&logoColor=white',
      ],
    },
    {
      category: 'Web Technologies',
      badges: [
        'https://img.shields.io/badge/FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white',
        'https://img.shields.io/badge/jinja-%23B41717.svg?style=for-the-badge&logo=jinja&logoColor=white',
      ],
    },
    {
      category: 'Databases',
      badges: [
        'https://img.shields.io/badge/mysql-%234479A1.svg?style=for-the-badge&logo=mysql&logoColor=white',
        'https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white',
        'https://img.shields.io/badge/firebase-%23039BE5.svg?style=for-the-badge&logo=firebase',
      ],
    },
    {
      category: 'Operating Systems',
      badges: [
        'https://img.shields.io/badge/Linux-FCC624?style=for-the-badge&logo=linux&logoColor=black',
        'https://img.shields.io/badge/Windows-0078D6?style=for-the-badge&logo=windows&logoColor=white',
      ],
    },
  ],
  experiences: [
    {
      company: 'Dedagroup S.P.A',
      position: 'Software Engineer Intern',
      from: 'May 2024',
      to: 'September 2024',
      companyLink: 'https://www.deda.com/home',
      companyLogo: 'https://cdn.brandfetch.io/idr0YfdnV9/w/400/h/400/theme/dark/icon.png?c=1bxid64Mup7aczewSAYMX&t=1760140861558',
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
      institutionLink: 'https://www.unitn.it',
      institutionLogo: 'https://cdn.brandfetch.io/id0vp94LKa/w/1024/h/1024/theme/dark/logo.png?c=1bxid64Mup7aczewSAYMX&t=1727381497834',
      score: 'Expected 2026', // Add your expected graduation or current GPA
      description: 'Specializing in distributed systems and high-performance computing',
    },
    {
      institution: 'University of Trento',
      degree: 'B.S. in Computer Science',
      from: '2020',
      to: '2024',
      institutionLink: 'https://www.unitn.it',
      institutionLogo: 'https://cdn.brandfetch.io/id0vp94LKa/w/1024/h/1024/theme/dark/logo.png?c=1bxid64Mup7aczewSAYMX&t=1727381497834',
      score: '101/110', // Add your actual final score here
      description: 'Focused on software engineering, algorithms, and system programming',
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
  githubStats: {
    display: true, // Set to false to hide the GitHub Stats card
    excludeLanguages: ['HTML', 'CSS', 'TypeScript', 'Rust', 'JavaScript'], // Languages to exclude from Top Languages section
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