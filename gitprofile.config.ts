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
      title: 'Sparse matrix-vector multiplication (SpMV) optimization',
      techStack: ['CUDA', 'C', 'OpenMP'],
      highlights: [
        'Developed a hybrid adaptive CUDA kernel for NVIDIA A30.',
        'Profiled execution time and GFLOPS, focusing on memory access coalescing and occupancy tuning.',
      ],
      codeUrl: 'https://github.com/MaiDormo/GPU-Computing-2025-256137',
    },
    {
      title: 'Parallel minimum spanning tree',
      techStack: ['MPI', 'OpenMP', 'C'],
      highlights: [
        'Implemented parallel MST algorithms (Borůvka, Kruskal) using OpenMP and MPI.',
        'Analyzed speedup and scalability on multicore CPU clusters up to 32 nodes.',
      ],
      codeUrl: 'https://github.com/MaiDormo/parallel_mst',
    },
    {
      title: 'Distributed key-value storage system',
      techStack: ['Java 21', 'Akka'],
      highlights: [
        'Built with Akka actors: consistent hashing, data replication, fault tolerance.',
        'Handled concurrent reads and writes and node failures without client disruption.',
      ],
      codeUrl: 'https://github.com/MaiDormo/distributed-storage-system',
    },
    {
      title: 'MPEG-DASH performance analysis',
      techStack: ['Node.js', 'Mininet', 'AWS'],
      highlights: [
        'Bachelor’s thesis: measured adaptive streaming under simulated (Mininet SDN) and real (AWS) network conditions.',
        'Wrote the testbed scripts and Node.js clients that export playback metrics.',
      ],
      codeUrl: 'https://github.com/MaiDormo/thesis',
    },
  ],

  hackathons: [
    {
      event: 'EuroTech-Hong Kong Hackathon',
      organizer: 'EuroTech Universities Alliance',
      organizerLink: 'https://eurotech-universities.eu',
      organizerLogo: '/logos/eurotech.png',
      date: 'June 2026',
      location: 'Munich, Germany',
      team: [
        'Tanmay Narang',
        'Sun Eléonore Hyeyoung',
        'Mar Minguez',
        'Elia Gatti',
      ],
      title: 'Guardian: privacy-first eldercare',
      description:
        'Elderly monitoring for families split across the Hong Kong–Shenzhen border, built to work without cameras, wearables, or cloud.',
      techStack: ['mmWave radar', 'Gemma 4 (on-device LLM)', 'Agentic AI'],
      highlights: [
        'Zero-config monitoring with mmWave radar and an on-device Gemma 4 LLM.',
        'Behavioural drift tracking with real-time crisis alerting.',
      ],
      codeUrl: 'https://github.com/MaiDormo/Guardian',
    },
    {
      event: 'CTM Challenge',
      organizer: 'University of Trento',
      organizerLink: 'https://www.unitn.it',
      organizerLogo: '/logos/unitn.png',
      date: '2025',
      location: 'Trento, Italy',
      team: [],
      title: 'DWT-SVD watermarking',
      description:
        'Image watermarking that embeds singular values in high-entropy DWT blocks.',
      techStack: ['Python', 'Signal processing'],
      highlights: [
        'Robust to compression, noise, and geometric transforms.',
        'Automated attack suite with ROC validation.',
      ],
      result: '1st place',
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
      companyLogo: '/logos/bitmovin.png',
      highlights: [
        'Shipped KAIROS, AI video highlight detection and segmentation for sports, news and podcasts: VOD and live analysis, a public API, MCP, and one-click highlight reels.',
        'Cut transcription latency by 20% by tuning parallelism and slimming workers; sped up live playback by measuring it.',
        'Drove 33k views to 130 signups in two weeks with a Google Ads campaign, signup tracking, a Slack feedback loop, and admin traction charts.',
        'Built job orchestration with startup fixes and live observability, reducing failed runs and manual ops work.',
      ],
      technologies: [
        'Next.js',
        'TypeScript',
        'Supabase',
        'Go',
        'Python',
        'Google Cloud',
        'Terraform',
        'MCP',
      ],
      product: {
        name: 'kairosapp.tech',
        url: 'https://kairosapp.tech',
        mark: '/kairos-mark.png',
      },
      figure: 'kairos-football' as const,
    },
    {
      company: 'Dedagroup',
      position: 'Software Developer Intern',
      from: 'May 2024',
      to: 'Sept 2024',
      location: 'Trento, Italy',
      companyLink: 'https://www.deda.com',
      companyLogo: '/logos/dedagroup.png',
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
      institutionLogo: '/logos/unitn.png',
      score: 'Expected 2026',
      description: 'GPU programming and high-performance computing.',
    },
    {
      institution: 'University of Trento',
      degree: 'B.S. in Computer Science',
      from: '2020',
      to: '2024',
      institutionLink: 'https://www.unitn.it',
      institutionLogo: '/logos/unitn.png',
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
