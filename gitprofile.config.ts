const CONFIG = {
  base: '/',
  seo: {
    title: 'Elia Gatti | GPU, HPC & Distributed Systems Engineer',
    description:
      'M.S. Computer Science, University of Trento (Mar 2027). GPU/HPC and distributed systems: CUDA, MPI, C++20, performance engineering. Thesis: distributed GPU hypergraph partitioning.',
    imageURL: 'https://maidormo.github.io/og.png',
  },
  googleAnalytics: { id: '' },
  enablePWA: true,

  headline: 'Elia Gatti',
  tagline:
    'GPU, HPC and distributed systems engineer. M.S. Computer Science, University of Trento.',
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
      title: 'dist-patoh — distributed GPU hypergraph partitioning',
      date: '2026–27',
      techStack: ['C++20', 'CUDA', 'MPI'],
      highlights: [
        'M.S. thesis: multilevel partitioner with distributed coarsening, FM/Jet refinement and recursive-bisection k-way partitioning.',
        '**126/126** cluster runs passed; **5.0×** bit-exact GPU coarsening speedup; **up to 1,143×** faster local refinement from lossless net-dedup.',
      ],
    },
    {
      title: 'Sparse matrix-vector multiplication (SpMV)',
      date: '2025',
      techStack: ['CUDA', 'C', 'OpenMP'],
      highlights: [
        'Hybrid adaptive A30 kernel: **649 GB/s (70% of peak)** and **122 GFLOPS** on CurlCurl_4, **1.10× cuSPARSE**.',
        'Diagnosed the **63% loss** on 226M-row mawi as **>800k-block overscheduling** — the failure that motivated the thesis.',
      ],
      codeUrl: 'https://github.com/MaiDormo/cuda-SpMV',
    },
    {
      title: 'Parallel minimum spanning tree',
      date: '2025',
      techStack: ['MPI', 'OpenMP', 'C'],
      highlights: [
        'Hybrid Borůvka with flat CSR, mmap I/O and bulk collectives: **4.7×** end-to-end and **77×** lower I/O vs baseline at 20k vertices.',
        'Scaling measured with **2–32 MPI ranks on one 64-thread node**; speedup flattens after 16 cores.',
      ],
      codeUrl: 'https://github.com/MaiDormo/parallel-mst',
    },
    {
      title: 'Fault-tolerant distributed key-value store',
      date: '2025',
      techStack: ['Java 21', 'Akka'],
      highlights: [
        'Consistent hashing, **N/W/R quorums**, versioned values and dynamic membership.',
        'Node-failure recovery without client disruption.',
      ],
      codeUrl: 'https://github.com/MaiDormo/distributed-storage-system',
    },
    {
      title: 'MPEG-DASH performance analysis',
      date: '2024',
      techStack: ['Node.js', 'Mininet', 'AWS'],
      highlights: [
        'B.S. thesis: measured **adaptive streaming** under simulated (Mininet SDN) and real (AWS) networks.',
      ],
      codeUrl: 'https://github.com/MaiDormo/mpeg-dash-analysis',
      thesisUrl: '/thesis.pdf',
    },
  ],

  hackathons: [
    {
      event: 'CTM Challenge',
      organizer: 'University of Trento',
      organizerLink: 'https://www.unitn.it',
      organizerLogo: '/logos/unitn.png',
      date: '2025',
      location: 'Trento, Italy',
      team: [],
      title: 'DWT-SVD watermarking',
      description: 'Image watermarking that embeds singular values in high-entropy DWT blocks.',
      techStack: ['Python', 'Signal processing'],
      highlights: [
        '**Robust to compression, noise, and geometric transforms.**',
        'Automated attack suite with ROC validation.',
      ],
      result: '1st of 11 teams',
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
        'Co-built KAIROS **end-to-end** with one other intern: Next.js/React, Supabase/PostgreSQL with RLS, Go/Python workers, a **public MCP API**, and Terraform-managed GCP. Owned the sport-understanding stage, orchestration and the live pipeline.',
        'Cut sport transcription latency **>10×** by replacing whisper.cpp with parakeet; measured 12 threads **20% slower** than 8 from core contention, made shot detection **~4×** faster, changed frame windowing from quadratic to linear, and removed **~1 min** of dead time per clip.',
        'Built the launch campaign and conversion tracking: **~130 signups** in the first two weeks.',
      ],
      technologies: [
        'Supabase',
        'Go',
        'Python',
        'Google Cloud',
        'Terraform',
        'MCP',
        'Next.js',
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
        "Migrated the 'TEN' treasury application from legacy Windows to Linux servers, **halving VM resource requirements**.",
        'Developed reactive **HTMX frontend features** and maintained the Java/Spring backend.',
      ],
      technologies: ['Java', 'Spring', 'HTMX', 'Linux'],
    },
  ],

  educations: [
    {
      institution: 'University of Trento',
      degree: 'M.S. in Computer Science',
      from: '2024',
      to: 'Mar 2027',
      institutionLink: 'https://www.unitn.it',
      institutionLogo: '/logos/unitn.png',
      score: 'Thesis: distributed GPU hypergraph partitioning (C++20/CUDA/MPI)',
      description:
        'GPU programming and high-performance computing. Available Mar 2027; open to thesis-with-company Oct–Mar.',
    },
    {
      institution: 'University of Trento',
      degree: 'B.S. in Computer Science',
      from: '2020',
      to: '2024',
      institutionLink: 'https://www.unitn.it',
      institutionLogo: '/logos/unitn.png',
      description: 'Thesis: adaptive MPEG-DASH under Mininet and AWS.',
    },
  ],

  skills: {
    languages: ['C', 'C++17/20', 'CUDA', 'Go', 'Python', 'Java'],
    tools: [
      'MPI',
      'OpenMP',
      'NCCL',
      'Slurm',
      'CMake',
      'Docker',
      'Git',
      'Linux',
      'PostgreSQL',
      'Terraform',
      'GCP',
      'FastAPI',
      'Akka',
    ],
    concepts: [
      'GPU kernels and memory hierarchy',
      'Distributed systems and MPI',
      'Performance measurement: GB/s, GFLOPS, scaling',
      'Video streaming (MPEG-DASH)',
    ],
  },
};

export default CONFIG;
