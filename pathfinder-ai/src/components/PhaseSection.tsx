import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Play } from 'lucide-react';
import { ResourceCard } from './ResourceCard';
import { phaseLabels } from '../utils/routing';
import type { RoadmapItem, Interest } from '../types';

interface Props {
  phase: 1 | 2 | 3 | 4 | 5;
  items: RoadmapItem[];
  interests: Interest[];
  startPhase: number;
  defaultExpanded: boolean;
}

export function PhaseSection({ phase, items, interests, startPhase, defaultExpanded }: Props) {
  const [expanded, setExpanded] = useState(defaultExpanded);
  const isStartHere = phase === startPhase;
  const isDimmed = phase < startPhase;

  return (
    <div className={`rounded-2xl border border-border overflow-hidden transition-all duration-200 ${isDimmed ? 'opacity-60' : ''}`}>
      {/* Header */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between p-5 bg-white hover:bg-gray-50 transition-colors cursor-pointer"
      >
        <div className="flex items-center gap-3">
          <div className="flex flex-col items-start">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-primary text-base">
                Phase {phase}: {phaseLabels[phase]}
              </span>
              {isStartHere && (
                <span className="flex items-center gap-1 text-xs font-medium bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full">
                  <Play className="w-2.5 h-2.5 fill-emerald-700" />
                  Start Here
                </span>
              )}
            </div>
            <span className="text-xs text-tertiary mt-0.5">{items.length} resources</span>
          </div>
        </div>
        <motion.div
          animate={{ rotate: expanded ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="w-5 h-5 text-secondary" />
        </motion.div>
      </button>

      {/* Content */}
      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            style={{ overflow: 'hidden' }}
          >
            <div className="px-5 pb-5 pt-2 space-y-3 bg-gray-50/50">
              {items.map(item => (
                <ResourceCard
                  key={item.number}
                  item={item}
                  starred={item.tags.some(tag => interests.includes(tag as Interest))}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
