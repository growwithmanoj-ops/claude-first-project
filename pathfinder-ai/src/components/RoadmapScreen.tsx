import { useRef } from 'react';
import { motion } from 'framer-motion';
import { Compass, ArrowLeft } from 'lucide-react';
import type { UserAnswers } from '../types';
import { getRoadmap, getStartPhase, getRecommendedItems, roleLabels, experienceLabels, goalLabels } from '../utils/routing';
import { tips } from '../data/tips';
import { TipCard } from './TipCard';
import { RecommendedSummary } from './RecommendedSummary';
import { PhaseSection } from './PhaseSection';
import { ExportButtons } from './ExportButtons';

interface Props {
  answers: UserAnswers;
  onStartOver: () => void;
  onBack: () => void;
}

const PHASES = [1, 2, 3, 4, 5] as const;

export function RoadmapScreen({ answers, onStartOver, onBack }: Props) {
  const roadmapRef = useRef<HTMLDivElement>(null);
  const roadmap = getRoadmap(answers);
  const startPhase = getStartPhase(answers.experience);
  const tip = tips[answers.goal][answers.timeCommitment];
  const recommended = getRecommendedItems(roadmap, answers);

  const itemsByPhase = PHASES.reduce((acc, phase) => {
    acc[phase] = roadmap.items.filter(item => item.phase === phase);
    return acc;
  }, {} as Record<number, typeof roadmap.items>);

  return (
    <div className="min-h-screen bg-surface">
      {/* Header bar */}
      <div className="bg-white border-b border-border sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={onBack}
              className="flex items-center gap-1.5 text-sm text-secondary hover:text-primary transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-accent flex items-center justify-center">
                <Compass className="w-3.5 h-3.5 text-white" />
              </div>
              <span className="font-semibold text-primary text-sm">PathfinderAI</span>
            </div>
          </div>
          <div className="hidden md:block">
            <ExportButtons onStartOver={onStartOver} roadmapRef={roadmapRef} />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-2xl mx-auto px-6 py-10" ref={roadmapRef}>
        {/* Roadmap header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30, delay: 0.1 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-primary mb-2">Your AI Learning Roadmap</h1>
          <p className="text-sm text-secondary">
            Curated for:{' '}
            <span className="font-medium text-primary">{roleLabels[answers.role]}</span>
            {' · '}
            <span className="font-medium text-primary">{experienceLabels[answers.experience]}</span>
            {' · '}
            <span className="font-medium text-primary">{goalLabels[answers.goal]}</span>
          </p>
        </motion.div>

        {/* Tip card */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30, delay: 0.2 }}
          className="mb-6"
        >
          <TipCard tip={tip} />
        </motion.div>

        {/* Recommended */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30, delay: 0.3 }}
          className="mb-8"
        >
          <RecommendedSummary items={recommended} />
        </motion.div>

        {/* Phase sections */}
        <div className="space-y-4">
          {PHASES.map((phase, index) => (
            <motion.div
              key={phase}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30, delay: 0.4 + index * 0.1 }}
            >
              <PhaseSection
                phase={phase}
                items={itemsByPhase[phase]}
                interests={answers.interests}
                startPhase={startPhase}
                defaultExpanded={phase >= startPhase}
              />
            </motion.div>
          ))}
        </div>

        {/* Mobile export buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="mt-8 pt-6 border-t border-border md:hidden"
        >
          <ExportButtons onStartOver={onStartOver} roadmapRef={roadmapRef} />
        </motion.div>
      </div>
    </div>
  );
}
