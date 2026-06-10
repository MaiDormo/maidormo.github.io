// gitprofile.config.ts

const CONFIG = {
  base: '/',
  seo: {
    title: 'Elia Gatti — Software Engineer',
    description:
      'Software engineer specializing in backend development, distributed systems, and HPC.',
    imageURL: '',
  },
  googleAnalytics: { id: '' },
  enablePWA: true,

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
  systemStatus: {
    display: true,
    status: 'online',
    uptime: '99.99%',
    region: 'EU-West (Trento)',
  },

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
      decision: 'Quorum reads/writes balance availability with consistency.',
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
  ],

  hackathons: [
    {
      event: 'CTM Challenge',
      organizer: 'University of Trento',
      date: '2025',
      location: 'Trento, Italy 🇮🇹',
      team: [],
      title: 'DWT-SVD Digital Watermarking Tool',
      description:
        'Winner of the university CTM challenge. Implemented a robust watermarking algorithm that embeds singular values in high-entropy DWT blocks — surviving compression while remaining invisible to the naked eye.',
      techStack: ['Python', 'Signal Processing'],
      highlights: [
        'Robust to compression attacks',
        'High-entropy block selection for invisibility',
        'First place in university competition',
      ],
      decision:
        'Embedded in high-entropy DWT bands to maximize invisibility while maintaining robustness.',
      codeUrl: 'https://github.com/MaiDormo/DWT-SVD-watermarking',
    },
    {
      event: 'EuroTech-Hong Kong Hackathon',
      organizer: 'EuroTech Federation',
      date: 'June 2026',
      location: 'Munich, Germany 🇩🇪',
      team: [
        'Tanmay Narang',
        'Sun Eléonore Hyeyoung',
        'Mar Minguez',
        'Elia Gatti',
      ],
      title: 'Guardian',
      description:
        "Privacy-first, on-device AI for families navigating cross-border elderly care. With 1.68 million Hongkongers over 65 retiring across the border to Shenzhen or Guangzhou while their children stay in HK for work, existing monitoring fails — cameras parents refuse, wearables they won't wear, and cloud infrastructure that breaks under cross-border data laws.",
      techStack: ['mmWave Radar', 'Gemma 4 (On-Device LLM)', 'Agentic AI'],
      highlights: [
        'No cameras, no wearables, nothing to charge or configure',
        'On-device LLM bypasses cross-border cloud restrictions',
        'Behavioral drift tracking + immediate crisis alerts',
      ],
      decision:
        'Ceiling-mounted mmWave radar + on-device Gemma 4 LLM for zero-config, zero-leakage eldercare that works across any border.',
    },
  ],

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
      description:
        'Focused on Software Engineering, Algorithms, and System Programming.',
    },
  ],
};

export default CONFIG;
