export interface Project {
  title: string;
  description?: string;
  imageUrl?: string;
  techStack: string[];
  highlights?: string[];
  metrics?: string[];
  decision?: string;
  demoUrl?: string;
  codeUrl?: string;
}

export interface Experience {
  position: string;
  company: string;
  companyLink?: string;
  companyLogo?: string;
  from: string;
  to: string;
  location?: string;
  description?: string;
  technologies?: string[];
}

export interface Hackathon {
  event: string;
  organizer?: string;
  date: string;
  location: string;
  team: string[];
  title: string;
  description: string;
  techStack: string[];
  highlights: string[];
  decision?: string;
  codeUrl?: string;
}

export interface Education {
  degree: string;
  institution: string;
  institutionLink?: string;
  institutionLogo?: string;
  from: string;
  to: string;
  description?: string;
  score?: string;
}

export interface Social {
  linkedin: string;
  github: string;
  email: string;
  instagram?: string;
  strava?: string;
}

export interface SystemStatus {
  display: boolean;
  region: string;
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
  customBio: string;
  social: Social;
  resume: Resume;
  projects: Project[];
  hackathons: Hackathon[];
  experiences: Experience[];
  educations: Education[];
  systemStatus: SystemStatus;
}
