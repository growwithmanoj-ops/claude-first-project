import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import type { RecommendedResource } from '../utils/openRouterApi';

interface Props {
  resources: RecommendedResource[];
  learningGoal: string;
  level: string;
  onTryAnother: () => void;
  onClose: () => void;
  onBuildRoadmap: () => void;
}

const levelLabels: Record<string, string> = {
  beginner: 'Beginner',
  intermediate: 'Intermediate',
  expert: 'Expert',
};

export function CustomRecResults({ resources, learningGoal, level, onTryAnother, onClose, onBuildRoadmap }: Props) {
  const truncatedGoal = learningGoal.length > 60 ? learningGoal.slice(0, 60) + '…' : learningGoal;

  return (
    <div className="space-y-4">
      {/* Header */}
      <div>
        <h3 className="text-xl font-semibold text-primary mb-1">✨ Here's what we found for you</h3>
        <p className="text-sm text-secondary">
          Based on: "<span className="font-medium">{truncatedGoal}</span>"
          {' · '}Level: <span className="font-medium">{levelLabels[level] ?? level}</span>
        </p>
      </div>

      {/* Resource cards */}
      <div className="space-y-3">
        {resources.map((res, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1, type: 'spring', stiffness: 300, damping: 30 }}
            className="rounded-xl border border-border bg-white p-4 flex gap-3 hover:shadow-sm transition-shadow"
          >
            {/* Number badge */}
            <div className="flex-shrink-0 w-6 h-6 rounded-full bg-accent flex items-center justify-center">
              <span className="text-xs font-bold text-white">{i + 1}</span>
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-primary text-sm leading-snug mb-1">{res.name}</p>
              <p className="text-xs text-secondary leading-relaxed mb-2">{res.description}</p>
              <a
                href={res.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs font-medium text-accent hover:underline"
              >
                Open
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Bottom actions */}
      <div className="flex items-center justify-between pt-1">
        <button
          type="button"
          onClick={onTryAnother}
          className="text-sm text-secondary hover:text-primary transition-colors cursor-pointer"
        >
          ← Try another search
        </button>
        <button
          type="button"
          onClick={onClose}
          className="text-sm text-secondary hover:text-primary transition-colors cursor-pointer"
        >
          Close
        </button>
      </div>

      {/* Upsell */}
      <div className="border-t border-border pt-4">
        <p className="text-sm text-secondary mb-2">Want a complete learning plan?</p>
        <button
          type="button"
          onClick={onBuildRoadmap}
          className="w-full bg-accent text-white py-3 rounded-xl text-sm font-semibold hover:bg-accent/90 transition-all cursor-pointer"
        >
          Build My Full Roadmap →
        </button>
      </div>
    </div>
  );
}
