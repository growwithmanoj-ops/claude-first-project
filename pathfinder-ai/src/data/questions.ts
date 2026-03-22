import type { Question } from '../types';

export const questions: Question[] = [
  {
    id: 'Q1',
    question: 'What best describes your current role?',
    type: 'single_select',
    encouragement: 'This helps us pick the right resources for your world.',
    options: [
      {
        value: 'software_dev',
        label: 'Software Developer / Engineer',
        description: 'I write code daily (frontend, backend, fullstack, mobile)',
      },
      {
        value: 'tech_pm',
        label: 'Tech PM / Tech Manager',
        description: "I manage technical products/teams but don't code regularly",
      },
      {
        value: 'designer',
        label: 'Designer (UX/UI/Product)',
        description: 'I design user interfaces, experiences, or product flows',
      },
      {
        value: 'content_writer',
        label: 'Content Writer / Marketer',
        description: 'I create written content, copy, or marketing materials',
      },
      {
        value: 'data_analyst',
        label: 'Data Analyst / Data Scientist',
        description: 'I work with data, analytics, SQL, or statistical modeling',
      },
    ],
  },
  {
    id: 'Q2',
    question: 'How familiar are you with AI/ML concepts?',
    type: 'single_select',
    encouragement: "No judgment — everyone starts somewhere.",
    options: [
      {
        value: 'beginner',
        label: 'Beginner',
        description: "I've heard of AI but haven't used it professionally",
      },
      {
        value: 'basic',
        label: 'Basic User',
        description: 'I use ChatGPT/Claude occasionally but want to go deeper',
      },
      {
        value: 'intermediate',
        label: 'Intermediate',
        description: 'I understand core concepts and use AI tools regularly',
      },
      {
        value: 'advanced',
        label: 'Advanced',
        description: "I've built AI features or have ML experience, want to specialize",
      },
    ],
  },
  {
    id: 'Q3',
    question: 'What is your primary goal for learning AI?',
    type: 'single_select',
    encouragement: "Dream big. We'll help you get there.",
    options: [
      {
        value: 'productivity',
        label: 'Boost Daily Productivity',
        description: 'Use AI tools to work faster and smarter in my current role',
      },
      {
        value: 'build',
        label: 'Build AI-Powered Products',
        description: 'Create applications or features that use AI/ML',
      },
      {
        value: 'career',
        label: 'Career Transition / Upskilling',
        description: 'Move into an AI-focused role or make myself more competitive',
      },
      {
        value: 'strategy',
        label: 'AI Strategy & Leadership',
        description: 'Lead AI initiatives and make informed strategic decisions',
      },
    ],
  },
  {
    id: 'Q4',
    question: 'How much time can you dedicate to learning per week?',
    type: 'single_select',
    encouragement: 'Even 2 hours a week adds up to something amazing.',
    options: [
      {
        value: 'light',
        label: '2-3 hours/week',
        description: 'Casual learning alongside my full-time role',
      },
      {
        value: 'moderate',
        label: '5-7 hours/week',
        description: 'Committed weekly study schedule',
      },
      {
        value: 'intensive',
        label: '10+ hours/week',
        description: 'Intensive learning, possibly between roles or dedicated upskilling',
      },
    ],
  },
  {
    id: 'Q5',
    question: 'Which specific AI topics interest you most?',
    type: 'multi_select',
    maxSelections: 3,
    encouragement: "Pick what excites you — we'll highlight the best matches.",
    options: [
      {
        value: 'llms',
        label: 'LLMs & Prompt Engineering',
        description: 'ChatGPT, Claude, prompt techniques, AI assistants',
      },
      {
        value: 'ml_fundamentals',
        label: 'ML/Deep Learning Fundamentals',
        description: 'Algorithms, neural networks, model training',
      },
      {
        value: 'ai_tools',
        label: 'AI Tools & Productivity',
        description: 'Hands-on tools for my daily workflow',
      },
      {
        value: 'ai_strategy',
        label: 'AI Strategy & Business',
        description: 'AI roadmaps, ROI, leadership, governance',
      },
      {
        value: 'ai_agents',
        label: 'AI Agents & Automation',
        description: 'Autonomous AI, tool use, multi-step workflows',
      },
      {
        value: 'ethics',
        label: 'AI Ethics & Safety',
        description: 'Responsible AI, bias, regulation, alignment',
      },
    ],
  },
];
