export type Role = 'software_dev' | 'tech_pm' | 'designer' | 'content_writer' | 'data_analyst';
export type Experience = 'beginner' | 'basic' | 'intermediate' | 'advanced';
export type Goal = 'productivity' | 'build' | 'career' | 'strategy';
export type TimeCommitment = 'light' | 'moderate' | 'intensive';
export type Interest = 'llms' | 'ml_fundamentals' | 'ai_tools' | 'ai_strategy' | 'ai_agents' | 'ethics';

export interface UserAnswers {
  role: Role;
  experience: Experience;
  goal: Goal;
  timeCommitment: TimeCommitment;
  interests: Interest[];
}

export interface RoadmapItem {
  number: number;
  name: string;
  description: string;
  link: string;
  tags: Interest[];
  phase: 1 | 2 | 3 | 4 | 5;
}

export interface Roadmap {
  role: Role;
  description: string;
  items: RoadmapItem[];
}

export interface Question {
  id: string;
  question: string;
  type: 'single_select' | 'multi_select';
  maxSelections?: number;
  encouragement: string;
  options: {
    value: string;
    label: string;
    description: string;
  }[];
}

export type Screen = 'landing' | 'questions' | 'loading' | 'roadmap';
