// gitprofile.config.ts

const CONFIG = {
  github: {
    username: 'MaiDormo',
  },
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
      header: 'Projects',
      subheader:
        'Architecture-first projects with constraints, scale, and tradeoffs.',
      projects: [
        {
          title: 'GPU Computing: Sparse Matrix-Vector',
          description:
            'Optimized SpMV kernels (C/CUDA) for parallel computing on AMD EPYC and NVIDIA A30. Hybrid Adaptive CUDA kernel for strategy switching.',
          techStack: ['CUDA', 'C', 'OpenMP'],
          highlights: ['Adaptive kernel selection', 'Vectorized memory access'],
          metrics: ['NVIDIA A30', 'Hybrid kernels'],
          decision: 'Switched kernels based on sparsity pattern at runtime.',
          codeUrl: 'https://github.com/MaiDormo/GPU-Computing-2025-256137',
        },
        {
          title: 'HPC: Parallel MST Implementation',
          description:
            'Hybrid parallel Minimum Spanning Tree algorithm using MPI and OpenMP. Analyzed scalability on clusters up to 32 nodes.',
          techStack: ['MPI', 'OpenMP', 'C'],
          highlights: ['Hybrid parallelism', 'Scalability profiling'],
          metrics: ['32-node cluster', 'Hybrid MPI/OMP'],
          decision:
            'Hybrid parallelism reduced communication overhead for dense graphs.',
          codeUrl: 'https://github.com/MaiDormo/parallel_mst',
        },
        {
          title: 'P2P Key-Value Storage System',
          description:
            'Distributed storage system in Java 21/Akka. Features Sequential Consistency, high availability, and Quorum Consensus protocol.',
          techStack: ['Java 21', 'Akka'],
          highlights: ['Sequential consistency', 'Fault-tolerant quorum reads'],
          metrics: ['P2P nodes', 'Quorum consensus'],
          decision:
            'Quorum reads/writes balance availability with consistency.',
          codeUrl: 'https://github.com/MaiDormo/distributed-storage-system',
        },
        {
          title: 'MovieMatch Microservices',
          description:
            'Microservice architecture for movie recommendations. Features an API Gateway pattern routing to specialized services (Core TMDB adapter, Recommendation engine, Enrichment).',
          imageUrl: './service_architecture.png',
          techStack: ['Python', 'FastAPI', 'PostgreSQL', 'Docker'],
          highlights: ['API Gateway Pattern', 'Service Isolation'],
          metrics: ['4 Backend Services', 'External API Integration'],
          decision:
            'Separated the stateless TMDB adapter (Core) from the stateful logic (Recommendations) to decouple data storage and isolate external rate limits.',
          codeUrl: 'https://github.com/MaiDormo/movie-match',
          //demoUrl: 'https://moviematch.io',
        },
        {
          title: 'MPEG-DASH Performance Analysis',
          description:
            'Bachelor’s Thesis analyzing protocol performance under simulated (Mininet SDN) and real-world (AWS) conditions using custom Node.js clients.',
          techStack: ['Node.js', 'Mininet', 'AWS'],
          highlights: ['Reproducible testbed scripts', 'Client metrics export'],
          metrics: ['SDN + cloud', 'Controlled latency'],
          decision:
            'Used Mininet to isolate transport behavior before cloud tests.',
          codeUrl: 'https://github.com/MaiDormo/thesis',
        },
        {
          title: 'DWT-SVD Digital Watermarking Tool',
          description:
            'Winner of university CTM challenge. Implemented a robust watermarking algorithm embedding singular values in high-entropy DWT blocks.',
          imageUrl: './embedding_bg.png',
          techStack: ['Python', 'Signal Processing'],
          highlights: ['Robust to compression', 'High-entropy block selection'],
          metrics: ['Contest winner', 'High PSNR'],
          decision: 'Embedded in high-entropy bands to maximize invisibility.',
          codeUrl: 'https://github.com/MaiDormo/DWT-SVD-watermarking',
        },
        {
          title: 'CROSSTRACK ITALIA',
          description:
            'Cross-platform Flutter app for motocross track discovery and management. Features map visualization (OpenStreetMaps), user authentication, and track management.',
          techStack: ['Flutter', 'Firebase', 'OpenStreetMap'],
          highlights: [
            'Offline-friendly map caching',
            'Role-based track management',
          ],
          metrics: ['Mobile + web', 'Map-first UX'],
          decision: 'Optimized for offline discovery with lightweight sync.',
          codeUrl: 'https://github.com/MaiDormo/crosstrack_italia',
          demoUrl: 'https://maidormo.github.io/crosstrack_italia/',
        },
      ],
    },
  },
  base: '/',
  seo: {
    title: 'Elia Gatti — Software Engineer',
    description:
      'Software engineer specializing in backend development, distributed systems, and HPC.',
    imageURL: '',
  },
  customBio:
    'Software Engineer, currently pursuing M.S. in Computer Science at University of Trento.',
  social: {
    linkedin: 'elia-gatti',
    github: 'MaiDormo',
    email: 'elia.gatti01@gmail.com',
    instagram: 'elia_gatti_',
    strava: '34560653',
  },
  resume: {
    fileUrl: '/elia_gatti_cv.pdf',
    buttonText: 'View Resume',
    showInNavbar: true,
  },
  skills: [
    {
      category: 'Languages',
      badges: ['Java', 'Python', 'C', 'CUDA', 'Dart', 'SQL', 'Shell Scripting'],
    },
    {
      category: 'Frameworks',
      badges: ['Spring Boot', 'FastAPI', 'Flutter', 'Akka', 'Riverpod'],
    },
    {
      category: 'Infrastructure',
      badges: [
        'Docker',
        'Git',
        'Linux',
        'Firebase',
        'Mininet',
        'PBS Schedulers',
        'Kubernetes',
      ],
    },
    {
      category: 'Concepts',
      badges: [
        'Microservices',
        'Distributed Systems',
        'HPC (MPI, OpenMP)',
        'GPU Computing',
      ],
    },
  ],
  certifications: [],
  systemStatus: {
    display: true,
    status: 'online',
    uptime: '99.99%',
    region: 'EU-West (Trento)',
    log: [
      'System initialized...',
      'All services operational.',
      'Ready for distributed challenges.',
    ],
  },
  experiences: [
    {
      company: 'Dedagroup',
      position: 'Software Developer',
      from: 'May 2024',
      to: 'September 2024',
      companyLink: 'https://www.deda.com',
      companyLogo:
        'https://cdn.brandfetch.io/idr0YfdnV9/w/400/h/400/theme/dark/icon.png?c=1bxid64Mup7aczewSAYMX&t=1760140861558',
      description:
        'Developed backend (Java/Spring) and frontend (HTMX) features for treasury services. Managed Linux server migration from legacy Windows infrastructure.',
      technologies: ['Java', 'Spring', 'HTMX', 'Linux'],
    },
  ],
  educations: [
    {
      institution: 'University of Trento',
      degree: 'M.S. in Computer Science',
      from: '2024',
      to: 'Present',
      institutionLink: 'https://www.unitn.it',
      institutionLogo:
        'https://cdn.brandfetch.io/id0vp94LKa/w/1024/h/1024/theme/dark/logo.png?c=1bxid64Mup7aczewSAYMX&t=1727381497834',
      score: 'Expected 2026',
      description:
        'Specializing in Distributed Systems and High-Performance Computing.',
    },
    {
      institution: 'University of Trento',
      degree: 'B.S. in Computer Science',
      from: '2020',
      to: '2024',
      institutionLink: 'https://www.unitn.it',
      institutionLogo:
        'https://cdn.brandfetch.io/id0vp94LKa/w/1024/h/1024/theme/dark/logo.png?c=1bxid64Mup7aczewSAYMX&t=1727381497834',
      // score: '101/110',
      description:
        'Focused on Software Engineering, Algorithms, and System Programming.',
    },
  ],

  hotjar: { id: '', snippetVersion: 6 },
  googleAnalytics: { id: '' },
  enablePWA: true,
  footer: `Made with <a class="text-primary" href="https://github.com/arifszn/gitprofile" target="_blank" rel="noreferrer">GitProfile</a>`,
  themeConfig: {
    defaultTheme: 'procyon', // Forces your custom CSS theme
    disableSwitch: true, // Prevents users from changing the look
    respectPrefersColorScheme: false,
    displayAvatarRing: true,
    themes: ['procyon', 'light', 'dark'],
  },
};

export default CONFIG;