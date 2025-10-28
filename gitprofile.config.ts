// gitprofile.config.ts

const CONFIG = {
  github: {
    username: 'MaiDormo', // Your GitHub org/user name.
  },
  base: '/',
  projects: {
    github: {
      display: false,
      header: '',
      mode: 'manual',
      automatic: {
        sortBy: '',
        limit: 0,
        exclude: {
          forks: false,
          projects: [],
        },
      },
      manual: {
        projects: [],
      },
    },
    external: {
      header: 'My Projects',
        projects: [
          {
            title: 'Crosstrack Italia',
            description: 'Cross-platform Flutter app for motocross track discovery and management. Features map visualization (OpenStreetMaps), user authentication, and track management.',
            imageUrl: '',
            techStack: ['Flutter', 'Dart', 'Firebase', 'Riverpod', 'Freezed', 'OpenStreetMaps'],
            highlights: [
              'Map visualization with OpenStreetMaps',
              'User authentication and track management',
              'Firebase backend (Firestore, Auth)',
              'Responsive state management with Riverpod 2.0 and Freezed',
            ],
            demoUrl: '',
            codeUrl: 'https://github.com/MaiDormo/crosstrack_italia',
            featured: true,
          },
          {
            title: 'MPEG-DASH Performance Analysis (Bachelor’s Thesis)',
            description: 'Analyzed MPEG-DASH protocol performance under simulated (Mininet SDN) and real-world (AWS) network conditions. Custom Node.js/dash.js client-server for streaming and metrics.',
            imageUrl: '',
            techStack: ['Node.js', 'dash.js', 'Mininet', 'AWS', 'Python', 'Pandas', 'NumPy', 'Bash', 'FFmpeg'],
            highlights: [
              'Simulated and real-world network analysis',
              'Custom client-server for streaming and metrics',
              'Data analysis with Python (Pandas, NumPy)',
              'Multimedia asset preparation with Bash/FFmpeg',
            ],
            demoUrl: '',
            codeUrl: 'https://github.com/MaiDormo/thesis',
          },
          {
            title: 'P2P Key-Value Storage System',
            description: 'Distributed P2P Key-Value storage system in Java 21 using Akka. Sequential Consistency and high availability via Quorum Consensus protocol.',
            imageUrl: '',
            techStack: ['Java 21', 'Akka', 'Quorum Consensus'],
            highlights: [
              'Sequential Consistency and high availability',
              'Quorum Consensus protocol',
              'Configurable replication across nodes',
            ],
            demoUrl: '',
            codeUrl: 'https://github.com/MaiDormo/distributed-storage-system',
          },
          {
            title: 'MovieMatch (Microservices Project)',
            description: 'Scalable web app for movie search and recommendations. 15-service microservices architecture (Python/FastAPI), Docker Compose deployment.',
            imageUrl: './service_architecture.png',
            techStack: ['Python', 'FastAPI', 'Docker Compose', 'AI'],
            highlights: [
              'AI-generated quizzes',
              'Streaming availability integration',
              'Unified JSON API structure',
            ],
            demoUrl: '',
            codeUrl: 'https://github.com/MaiDormo/movie-match',
          },
          {
            title: 'GPU Computing: Sparse Matrix-Vector Multiplication (SpMV)',
            description: 'Optimized SpMV kernels (C/CUDA) for parallel computing on CPU (AMD EPYC) and GPU (NVIDIA A30). Hybrid Adaptive CUDA kernel for dynamic strategy switching.',
            imageUrl: '',
            techStack: ['C', 'CUDA', 'NVIDIA A30', 'AMD EPYC'],
            highlights: [
              'Hybrid Adaptive CUDA kernel',
              'Benchmarked Execution Time, Memory Bandwidth, GFLOPS',
            ],
            demoUrl: '',
            codeUrl: 'https://github.com/MaiDormo/GPU-Computing-2025-256137',
          },
          {
            title: 'HPC Project: Parallel MST Implementation',
            description: 'Hybrid parallel Minimum Spanning Tree (MST) algorithm using MPI and OpenMP. Analyzed Speedup, Efficiency, and Scalability on clusters up to 32 nodes.',
            imageUrl: '',
            techStack: ['C', 'MPI', 'OpenMP'],
            highlights: [
              'Hybrid MPI/OpenMP parallelization',
              'Scalability analysis up to 32 nodes',
            ],
            demoUrl: '',
            codeUrl: 'https://github.com/MaiDormo/parallel_mst',
          },
        ],
    },
  },
  seo: {
    title: 'Elia Gatti — Software Engineer',
    description: 'Software engineer with a strong passion for backend development, automation, and system optimization.',
    imageURL: '', // optional: social preview image URL
  },
  // Custom bio to display on the avatar card (optional, overrides GitHub bio)
  customBio: 'Software Engineer, currently pursuing M.S. in Computer Science at University of Trento.',
  social: {
    linkedin: 'elia-gatti',
    github: 'MaiDormo',
    email: 'elia.gatti01@gmail.com',
    // add other handles if desired
  },
  resume: {
    fileUrl: '/elia-gatti-cv.pdf', // Put a resume PDF at this path or use a remote URL
    buttonText: 'View Resume',
    showInNavbar: true,
  },
  experiences: [
    {
      company: 'Dedagroup',
      position: 'Software Developer',
      from: 'May 2024',
      to: 'September 2024',
      companyLink: 'https://www.deda.com/home',
      companyLogo: 'https://cdn.brandfetch.io/idr0YfdnV9/w/400/h/400/theme/dark/icon.png?c=1bxid64Mup7aczewSAYMX&t=1760140861558',
      description: `Developed and maintained backend (Java, Spring) and frontend (HTMX) features for 'TEN', a web-based treasury services application.\nManaged the application's deployment to a new Linux server environment, migrating from a legacy Windows setup.`,
      technologies: ['Java', 'Spring Framework', 'HTMX', 'SQL', 'Shell scripting'],
    },
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