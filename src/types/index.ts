export interface Project {
  title: string;
  techStack: string[];
  /** Outcome bullets, mirrored from the CV. */
  highlights: string[];
  codeUrl?: string;
}

export interface Experience {
  position: string;
  company: string;
  companyLink?: string;
  from: string;
  to: string;
  location?: string;
  description?: string;
  /** Outcome bullets, mirrored from the CV. */
  highlights?: string[];
  technologies?: string[];
  /** Product shipped in the role, if it has a public home. */
  product?: {
    name: string;
    url: string;
    /** Path under /public to a small square mark. */
    mark?: string;
  };
  /** Key of a figure the Work section knows how to render under the bullets. */
  figure?: 'kairos-football';
}

export interface Hackathon {
  event: string;
  organizer?: string;
  date: string;
  location: string;
  team: string[];
  title: string;
  /** One sentence on what it is. */
  description: string;
  techStack: string[];
  highlights: string[];
  /** Set when the team placed. */
  result?: string;
  codeUrl?: string;
}

export interface Education {
  degree: string;
  institution: string;
  institutionLink?: string;
  from: string;
  to: string;
  description?: string;
  score?: string;
}

export interface Skills {
  languages: string[];
  tools: string[];
  concepts: string[];
}

export interface Social {
  linkedin: string;
  github: string;
  email: string;
  instagram?: string;
  strava?: string;
}

export interface Resume {
  fileUrl: string;
  buttonText?: string;
  showInNavbar?: boolean;
}

export interface Config {
  base: string;
  seo: {
    title: string;
    description: string;
    imageURL: string;
  };
  googleAnalytics: {
    id: string;
  };
  enablePWA: boolean;
  /** Display headline. */
  headline: string;
  /** One line under the headline: role and affiliation. */
  tagline: string;
  social: Social;
  resume: Resume;
  projects: Project[];
  hackathons: Hackathon[];
  experiences: Experience[];
  educations: Education[];
  skills: Skills;
}
