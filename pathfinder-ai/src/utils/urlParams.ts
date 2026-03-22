import type { UserAnswers, Role, Experience, Goal, TimeCommitment, Interest } from '../types';

const VALID_ROLES: Role[] = ['software_dev', 'tech_pm', 'designer', 'content_writer', 'data_analyst'];
const VALID_EXPERIENCES: Experience[] = ['beginner', 'basic', 'intermediate', 'advanced'];
const VALID_GOALS: Goal[] = ['productivity', 'build', 'career', 'strategy'];
const VALID_TIME: TimeCommitment[] = ['light', 'moderate', 'intensive'];
const VALID_INTERESTS: Interest[] = ['llms', 'ml_fundamentals', 'ai_tools', 'ai_strategy', 'ai_agents', 'ethics'];

export function encodeAnswers(answers: UserAnswers): URLSearchParams {
  const params = new URLSearchParams();
  params.set('role', answers.role);
  params.set('exp', answers.experience);
  params.set('goal', answers.goal);
  params.set('time', answers.timeCommitment);
  params.set('interests', answers.interests.join(','));
  return params;
}

export function decodeAnswers(params: URLSearchParams): UserAnswers | null {
  try {
    const role = params.get('role') as Role;
    const experience = params.get('exp') as Experience;
    const goal = params.get('goal') as Goal;
    const timeCommitment = params.get('time') as TimeCommitment;
    const interestsStr = params.get('interests');

    if (!role || !experience || !goal || !timeCommitment || !interestsStr) return null;

    if (!VALID_ROLES.includes(role)) return null;
    if (!VALID_EXPERIENCES.includes(experience)) return null;
    if (!VALID_GOALS.includes(goal)) return null;
    if (!VALID_TIME.includes(timeCommitment)) return null;

    const interests = interestsStr.split(',').filter(i => VALID_INTERESTS.includes(i as Interest)) as Interest[];
    if (interests.length === 0) return null;

    return { role, experience, goal, timeCommitment, interests };
  } catch {
    return null;
  }
}

export function syncToURL(answers: Partial<UserAnswers>, step?: number): void {
  const params = new URLSearchParams(window.location.search);
  if (answers.role) params.set('role', answers.role);
  if (answers.experience) params.set('exp', answers.experience);
  if (answers.goal) params.set('goal', answers.goal);
  if (answers.timeCommitment) params.set('time', answers.timeCommitment);
  if (answers.interests) params.set('interests', answers.interests.join(','));
  if (step !== undefined) params.set('step', String(step));

  const newUrl = `${window.location.pathname}?${params.toString()}`;
  window.history.replaceState({}, '', newUrl);
}

export function getStepFromURL(): number {
  const params = new URLSearchParams(window.location.search);
  const step = parseInt(params.get('step') || '1', 10);
  return isNaN(step) ? 1 : Math.min(Math.max(step, 1), 5);
}
