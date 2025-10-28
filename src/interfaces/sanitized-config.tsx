export interface SanitizedGithub {
  username: string;
}

export interface SanitizedGitHubProjects {
  display: boolean;
  header: string;
  mode: string;
  automatic: {
    sortBy: string;
    limit: number;
    exclude: {
      forks: boolean;
      projects: Array<string>;
    };
  };
  manual: {
    projects: Array<string>;
  };
}


export interface SanitizedExternalProject {
  title: string;
  description?: string;
  imageUrl?: string;
  techStack?: string[];
  highlights?: string[];
  demoUrl?: string;
  codeUrl?: string;
  featured?: boolean;
}

export interface SanitizedExternalProjects {
  header: string;
  projects: SanitizedExternalProject[];
}

export interface SanitizedProjects {
  github: SanitizedGitHubProjects;
  external: SanitizedExternalProjects;
}

export interface SanitizedSEO {
  title?: string;
  description?: string;
  imageURL?: string;
}


export interface SanitizedSocial {
  linkedin?: string;
  github?: string;
  twitter?: string;
  website?: string;
  x?: string;
  mastodon?: string;
  researchGate?: string;
  facebook?: string;
  instagram?: string;
  reddit?: string;
  threads?: string;
  youtube?: string;
  udemy?: string;
  dribbble?: string;
  behance?: string;
  medium?: string;
  dev?: string;
  stackoverflow?: string;
  telegram?: string;
  phone?: string;
  email?: string;
  discord?: string;
}


export interface SanitizedResume {
  fileUrl?: string;
  buttonText?: string;
  showInNavbar?: boolean;
}

export interface SanitizedExperience {
  company?: string;
  position?: string;
  from: string;
  to: string;
  companyLink?: string;
  companyLogo?: string;
  description?: string;
  technologies?: string[];
}

export interface SanitizedCertification {
  body?: string;
  name?: string;
  year?: string;
  link?: string;
}

export interface SanitizedEducation {
  institution?: string;
  degree?: string;
  from: string;
  to: string;
  institutionLink?: string;
  institutionLogo?: string;
  score?: string;
  description?: string;
}

export interface SanitizedPublication {
  title: string;
  conferenceName?: string;
  journalName?: string;
  authors?: string;
  link?: string;
  description?: string;
}

export interface SanitizedGoogleAnalytics {
  id?: string;
}

export interface SanitizedHotjar {
  id?: string;
  snippetVersion: number;
}

export interface SanitizedBlog {
  display: boolean;
  source: string;
  username: string;
  limit: number;
}

export interface SanitizedThemeConfig {
  defaultTheme: string;
  disableSwitch: boolean;
  respectPrefersColorScheme: boolean;
  displayAvatarRing: boolean;
  themes: Array<string>;
}

export interface SanitizedGitHubStats {
  display: boolean;
  excludeLanguages: Array<string>;
}

export interface SanitizedSkillCategory {
  category: string;
  badges: Array<string>;
}

export interface SanitizedConfig {
  github: SanitizedGithub;
  projects: SanitizedProjects;
  seo: SanitizedSEO;
  customBio?: string;
  social: SanitizedSocial;
  resume: SanitizedResume;
  skills: Array<string> | Array<SanitizedSkillCategory>;
  experiences: Array<SanitizedExperience>;
  educations: Array<SanitizedEducation>;
  certifications: Array<SanitizedCertification>;
  publications: Array<SanitizedPublication>;
  googleAnalytics: SanitizedGoogleAnalytics;
  hotjar: SanitizedHotjar;
  blog: SanitizedBlog;
  githubStats: SanitizedGitHubStats;
  themeConfig: SanitizedThemeConfig;
  footer?: string;
  enablePWA: boolean;
}
