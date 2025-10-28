

export interface GithubProject {
  name: string;
  html_url: string;
  description: string;
  stargazers_count: number;
  forks_count: number;
  language?: string;
  updated_at?: string;
  topics?: string[];
  highlights?: string[];
  demo_url?: string;
  imageUrl?: string;
  techStack?: string[];
  codeUrl?: string;
  featured?: boolean;
}
