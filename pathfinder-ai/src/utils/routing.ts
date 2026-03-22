import type { UserAnswers, Roadmap, RoadmapItem, Experience, Interest } from '../types';
import {
  softwareDevRoadmap,
  techPMRoadmap,
  designerRoadmap,
  contentWriterRoadmap,
  dataAnalystRoadmap,
} from '../data/roadmaps';

export function getRoadmap(answers: UserAnswers): Roadmap {
  switch (answers.role) {
    case 'software_dev': return softwareDevRoadmap;
    case 'tech_pm': return techPMRoadmap;
    case 'designer': return designerRoadmap;
    case 'content_writer': return contentWriterRoadmap;
    case 'data_analyst': return dataAnalystRoadmap;
  }
}

export function getStartPhase(experience: Experience): 1 | 2 | 3 {
  switch (experience) {
    case 'beginner': return 1;
    case 'basic': return 1;
    case 'intermediate': return 2;
    case 'advanced': return 3;
  }
}

export function isItemStarred(item: RoadmapItem, interests: Interest[]): boolean {
  return item.tags.some(tag => interests.includes(tag as Interest));
}

export function getRecommendedItems(roadmap: Roadmap, answers: UserAnswers): RoadmapItem[] {
  const startPhase = getStartPhase(answers.experience);
  const starred = roadmap.items.filter(item => isItemStarred(item, answers.interests));

  // Prefer items from start phase onward
  const fromStartPhase = starred.filter(item => item.phase >= startPhase);
  const beforeStartPhase = starred.filter(item => item.phase < startPhase);

  const ordered = [...fromStartPhase, ...beforeStartPhase];
  return ordered.slice(0, 5);
}

export const roleLabels: Record<string, string> = {
  software_dev: 'Software Developer',
  tech_pm: 'Tech PM / Manager',
  designer: 'Designer',
  content_writer: 'Content Writer',
  data_analyst: 'Data Analyst',
};

export const experienceLabels: Record<string, string> = {
  beginner: 'Beginner',
  basic: 'Basic User',
  intermediate: 'Intermediate',
  advanced: 'Advanced',
};

export const goalLabels: Record<string, string> = {
  productivity: 'Boost Productivity',
  build: 'Build AI Products',
  career: 'Career Transition',
  strategy: 'AI Strategy',
};

export const phaseLabels: Record<number, string> = {
  1: 'Foundations',
  2: 'Core Skills',
  3: 'Applied Practice',
  4: 'Advanced Specialization',
  5: 'Staying Current',
};
