import type { Goal, TimeCommitment } from '../types';

export const tips: Record<Goal, Record<TimeCommitment, string>> = {
  productivity: {
    light: 'Focus on Phases 1-2 of your roadmap. Spend the first 2 weeks on AI fundamentals, then move to hands-on tools. At 2-3 hrs/week, aim to complete Phases 1-2 within 8-10 weeks. Start applying AI tools to one daily task immediately.',
    moderate: 'Work through Phases 1-3 over 6-8 weeks. Pair each learning resource with a real work project. At 5-7 hrs/week, you\'ll build practical skills fast. Dedicate 60% of study time to tools, 40% to concepts.',
    intensive: 'Complete Phases 1-3 in 3-4 weeks, then explore Phase 4 topics that interest you. At 10+ hrs/week, build a portfolio of AI-enhanced work samples. Document your before/after productivity gains.',
  },
  build: {
    light: 'Focus on Phase 1 foundations first (4-5 weeks), then Phase 2 hands-on building. At 2-3 hrs/week, expect 16-20 weeks for Phases 1-3. Build one small project per phase to reinforce learning.',
    moderate: 'Work through Phases 1-4 over 10-12 weeks. Alternate theory and project weeks. At 5-7 hrs/week, build at least 3 projects. Start with tutorials, then build original projects.',
    intensive: 'Sprint through Phases 1-5 in 8-10 weeks. At 10+ hrs/week, aim for a portfolio of 5+ AI projects. Contribute to open source and share your builds publicly for visibility.',
  },
  career: {
    light: 'Prioritize Phases 1-2 with focus on marketable skills. At 2-3 hrs/week, give yourself 12-16 weeks. Update your resume/portfolio with each completed phase. Network in AI communities early.',
    moderate: 'Cover Phases 1-4 in 8-12 weeks. At 5-7 hrs/week, balance learning with networking. Complete at least one certification. Build a portfolio project that demonstrates AI skills in your domain.',
    intensive: 'Complete all 5 phases in 6-8 weeks. At 10+ hrs/week, pursue certifications, build portfolio projects, and attend AI meetups simultaneously. Target job applications by week 8.',
  },
  strategy: {
    light: 'Focus on Phases 1-2 (concepts + strategy). At 2-3 hrs/week, aim for 8-10 weeks. Read broadly, bookmark case studies, and start identifying AI opportunities in your organization.',
    moderate: 'Cover Phases 1-4 in 8-10 weeks. At 5-7 hrs/week, combine reading with hands-on tool exploration. Build an AI strategy proposal for your team/org as a capstone project.',
    intensive: 'Complete all phases in 5-6 weeks. At 10+ hrs/week, develop a comprehensive AI strategy document. Prototype AI solutions, run cost analyses, and prepare board-level presentations.',
  },
};
