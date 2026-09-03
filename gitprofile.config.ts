// gitprofile.config.ts

const CONFIG = {
  base: '/',
  seo: {
    title: 'Elia Gatti — HPC & GPU Software Engineer',
    description:
      "Master's student in Computer Science at the University of Trento. HPC and GPU software engineer: CUDA kernels, MPI graph algorithms, distributed systems.",
    imageURL: 'https://maidormo.github.io/og.png',
  },
  googleAnalytics: { id: '' },
  enablePWA: true,

  now: {
    role: 'Software Engineer Intern',
    company: 'Bitmovin',
    location: 'Klagenfurt',
  },
  headline: 'Elia Gatti',
  tagline:
    'HPC & GPU software engineer. M.S. Computer Science, University of Trento.',
  social: {
    linkedin: 'elia-gatti',
    github: 'MaiDormo',
    email: 'elia.gatti01@gmail.com',
    instagram: 'elia_gatti_',
    strava: '34560653',
  },
  resume: {
    fileUrl: '/elia_gatti_cv.pdf',
    buttonText: 'CV',
    showInNavbar: true,
  },

  projects: [
    {
      title: 'SpMV Optimization on NVIDIA A30',
      description:
        'Optimized sparse matrix-vector multiplication kernels in C and CUDA for AMD EPYC and NVIDIA A30, ending in a hybrid adaptive kernel that switches strategy on the sparsity pattern at runtime.',
      techStack: ['CUDA', 'C', 'OpenMP'],
      highlights: [
        'Hybrid adaptive CUDA kernel that selects a per-input strategy',
        'Profiled execution time and GFLOPS; tuned memory coalescing and occupancy',
      ],
      metrics: ['NVIDIA A30', 'Adaptive kernel'],
      decision:
        'Switch kernels on the sparsity pattern at runtime instead of committing to one layout for every matrix.',
      codeUrl: 'https://github.com/MaiDormo/GPU-Computing-2025-256137',
    },
    {
      title: 'Parallel Minimum Spanning Tree',
      description:
        'Hybrid MPI and OpenMP implementations of Borůvka and Kruskal, with speedup and scalability analysis on a multicore cluster of up to 32 nodes.',
      techStack: ['MPI', 'OpenMP', 'C'],
      highlights: [
        'Borůvka and Kruskal with hybrid distributed and shared-memory parallelism',
        'Speedup and scalability profiling across node counts',
      ],
      metrics: ['32-node cluster', 'MPI + OpenMP'],
      decision:
        'Hybrid parallelism cut communication overhead on dense graphs where pure MPI stalled.',
      codeUrl: 'https://github.com/MaiDormo/parallel_mst',
    },
    {
      title: 'Distributed Key-Value Store',
      description:
        'Peer-to-peer storage system in Java 21 and Akka: consistent hashing, replication, quorum-based reads and writes, and sequential consistency under node failures.',
      techStack: ['Java 21', 'Akka'],
      highlights: [
        'Consistent hashing, data replication, fault tolerance',
        'Concurrent reads and writes and node failures without client disruption',
      ],
      metrics: ['Akka actors', 'Quorum consensus'],
      decision:
        'Quorum reads and writes trade a little latency for consistency that holds while nodes drop out.',
      codeUrl: 'https://github.com/MaiDormo/distributed-storage-system',
    },
    {
      title: 'MPEG-DASH Performance Analysis',
      description:
        'Bachelor’s thesis on adaptive streaming behaviour under simulated (Mininet SDN) and real (AWS) network conditions, measured with custom Node.js clients.',
      techStack: ['Node.js', 'Mininet', 'AWS'],
      highlights: [
        'Reproducible testbed scripts and client-side metrics export',
        'Controlled latency and loss before moving to cloud tests',
      ],
      metrics: ['SDN + cloud', 'Controlled latency'],
      decision:
        'Isolate transport behaviour in Mininet first, so cloud results have a baseline to compare against.',
      codeUrl: 'https://github.com/MaiDormo/thesis',
    },
  ],

  hackathons: [
    {
      event: 'EuroTech-Hong Kong Hackathon',
      organizer: 'EuroTech Federation',
      date: 'June 2026',
      location: 'Munich, Germany',
      team: [
        'Tanmay Narang',
        'Sun Eléonore Hyeyoung',
        'Mar Minguez',
        'Elia Gatti',
      ],
      title: 'Guardian: Privacy-First Eldercare',
      description:
        'On-device AI for families navigating cross-border elderly care. 1.68 million Hongkongers over 65 retire across the border while their children stay in Hong Kong for work; existing monitoring fails on cameras parents refuse, wearables they will not wear, and cloud infrastructure that breaks under cross-border data law.',
      techStack: ['mmWave radar', 'Gemma 4 (on-device LLM)', 'Agentic AI'],
      highlights: [
        'Zero-config monitoring: no cameras, no wearables, nothing to charge',
        'On-device LLM sidesteps cross-border cloud restrictions',
        'Behavioural drift tracking with real-time crisis alerts',
      ],
      decision:
        'Ceiling-mounted mmWave radar plus an on-device Gemma 4 model: zero configuration and zero data leaving the home, in any jurisdiction.',
      codeUrl: 'https://github.com/MaiDormo/Guardian',
    },
    {
      event: 'CTM Challenge',
      organizer: 'University of Trento',
      date: '2025',
      location: 'Trento, Italy',
      team: [],
      title: 'DWT-SVD Digital Watermarking',
      description:
        'First place. A watermarking scheme that embeds singular values in high-entropy DWT blocks, surviving compression, noise and geometric transforms while staying invisible to the eye.',
      techStack: ['Python', 'Signal processing'],
      highlights: [
        'Robust to compression, noise and transform attacks',
        'High-entropy block selection keeps the mark invisible',
        'Automated attack suite with ROC validation',
        'First place in the university competition',
      ],
      decision:
        'Embed in high-entropy DWT bands: maximum invisibility at the robustness the attack suite demanded.',
      codeUrl: 'https://github.com/MaiDormo/DWT-SVD-watermarking',
    },
  ],

  experiences: [
    {
      company: 'Bitmovin',
      position: 'Software Engineer Intern',
      from: 'June 2026',
      to: 'Sept 2026',
      location: 'Klagenfurt, Austria',
      companyLink: 'https://bitmovin.com',
      description:
        'Video streaming infrastructure: encoding, playback, analytics.',
      highlights: [
        'Shipped KAIROS, AI video highlight detection and segmentation for sports, news and podcasts: VOD and live analysis, a public API, MCP, and one-click highlight reels.',
        'Cut transcription latency by 20% by tuning parallelism and slimming workers, and sped up live playback by measuring it, improving cost and reliability.',
        'Drove 33k views to 130 signups in two weeks by launching a Google Ads campaign with signup tracking, a feedback loop into Slack, and admin traction charts.',
        'Improved pipeline reliability with job orchestration, startup fixes and live observability, reducing failed runs and manual ops work.',
      ],
      technologies: ['Python', 'FastAPI', 'Video pipelines', 'MCP'],
    },
    {
      company: 'Dedagroup',
      position: 'Software Developer Intern',
      from: 'May 2024',
      to: 'Sept 2024',
      location: 'Trento, Italy',
      companyLink: 'https://www.deda.com',
      description: 'Treasury software for public administration.',
      highlights: [
        "Migrated the 'TEN' treasury application from legacy Windows to Linux servers, halving VM resource requirements.",
        'Developed reactive HTMX frontend features and maintained the Java/Spring backend.',
      ],
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
      score: 'Expected 2026',
      description: 'GPU programming and high-performance computing.',
    },
    {
      institution: 'University of Trento',
      degree: 'B.S. in Computer Science',
      from: '2020',
      to: '2024',
      institutionLink: 'https://www.unitn.it',
      description: 'Software engineering, algorithms, systems programming.',
    },
  ],

  skills: {
    languages: ['C', 'C++', 'CUDA', 'Java', 'Python'],
    tools: ['FastAPI', 'Docker', 'Git', 'Linux', 'OpenMP', 'MPI'],
    concepts: [
      'GPU programming: memory hierarchy, kernel optimization',
      'Parallel algorithms',
      'Distributed systems',
      'Performance benchmarking',
    ],
  },
};

export default CONFIG;
