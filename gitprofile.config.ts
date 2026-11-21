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
    fileUrl: '/Elia_Gatti_CV.pdf',
    buttonText: 'CV',
    showInNavbar: true,
  },

  projects: [
    {
      title: 'dist-patoh: distributed GPU hypergraph partitioning',
      date: '2026–27',
      techStack: ['C++20', 'CUDA', 'MPI'],
      highlights: [
        'M.S. thesis (in progress): a distributed multi-GPU hypergraph partitioner in **C++20, CUDA and MPI** for massive irregular sparse graphs.',
        'Multilevel pipeline: parallel coarsening, recursive k-way partitioning and local refinement, targeting the load-imbalance and scheduling bottlenecks of standard GPU sparse kernels.',
        'Currently testing multi-GPU scaling, memory usage and partition quality against established CPU and GPU baselines.',
      ],
    },
    {
      title: 'Sparse matrix-vector multiplication (SpMV)',
      date: '2025',
      techStack: ['CUDA', 'C', 'OpenMP'],
      highlights: [
        'Wrote and benchmarked CSR SpMV kernels on NVIDIA GPUs, combining thread-per-row and warp-per-row strategies based on matrix sparsity.',
        'Reached competitive bandwidth with cuSPARSE on irregular matrices; diagnosed block-overscheduling bottlenecks that motivated the thesis.',
      ],
      codeUrl: 'https://github.com/MaiDormo/cuda-SpMV',
    },
    {
      title: 'Parallel minimum spanning tree',
      date: '2025',
      techStack: ['MPI', 'OpenMP', 'C'],
      highlights: [
        'Implemented a hybrid MPI + OpenMP Boruvka MST in C for dense graphs using a flat, cache-aligned symmetric adjacency matrix, **memory-mapped I/O (mmap)**, and bulk collectives; measured 2–32 rank scaling on a 64-core node.',
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
        'Co-built **KAIROS** end-to-end, a live and on-demand AI video highlight pipeline using Go/Python workers, a **public MCP API**, and Terraform-managed GCP. Owned the video-analysis stage, workflow orchestration and the live pipeline.',
        'Cut video processing latency **>10×** and removed **~1 min** of dead time per clip by switching the transcription engine, fixing CPU thread contention, and changing frame windowing from quadratic to linear.',
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
        "Halved VM resource requirements by migrating the 'TEN' treasury application from Windows servers to Linux.",
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
      score: 'Thesis (in progress): distributed GPU hypergraph partitioning (C++20, CUDA, MPI)',
      description:
        'GPU programming and high-performance computing. Open to thesis-with-company Oct–Mar.',
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
