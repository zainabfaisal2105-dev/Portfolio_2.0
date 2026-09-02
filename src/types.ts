export type ThemeMode = 'neural' | 'y2k' | 'myspace';

export interface SkillItem {
  name: string;
  category: string;
  iconName?: string;
  description?: string;
}

export interface SkillLayer {
  layer: number;
  title: string;
  subtitle: string;
  color: string;
  skills: string[];
}

export interface ProjectCaseStudy {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  problem: string;
  approach: string;
  technology: string[];
  result: string;
  learned: string;
  stats?: { label: string; value: string }[];
  quote?: string;
  architecture?: {
    engine: string;
    description: string;
  }[];
  githubUrl?: string;
  liveUrl?: string;
}

export interface JourneyItem {
  year: string;
  title: string;
  subtitle?: string;
  items: string[];
  highlight?: boolean;
}

export interface CertificationItem {
  title: string;
  issuer: string;
  year?: string;
  description?: string;
  badge: string;
}

export interface ContactDispatchLog {
  timestamp: string;
  text: string;
  type?: 'info' | 'success' | 'warning';
}
