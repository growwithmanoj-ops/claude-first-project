import { Sparkles, ExternalLink } from 'lucide-react';
import type { RoadmapItem } from '../types';

interface Props {
  items: RoadmapItem[];
}

const phaseColors: Record<number, string> = {
  1: 'bg-blue-100 text-blue-700',
  2: 'bg-purple-100 text-purple-700',
  3: 'bg-green-100 text-green-700',
  4: 'bg-orange-100 text-orange-700',
  5: 'bg-gray-100 text-gray-700',
};

export function RecommendedSummary({ items }: Props) {
  if (items.length === 0) {
    return (
      <div className="rounded-2xl bg-white border border-border p-5">
        <div className="flex items-center gap-2 mb-3">
          <Sparkles className="w-4 h-4 text-accent" />
          <span className="font-semibold text-primary text-sm">Picked for you</span>
        </div>
        <p className="text-sm text-secondary">
          🚀 All of these resources are great for you — dive into Phase 1 and start building momentum!
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl bg-white border border-border p-5">
      <div className="flex items-center gap-2 mb-4">
        <Sparkles className="w-4 h-4 text-accent" />
        <span className="font-semibold text-primary text-sm">Picked for you</span>
        <span className="text-xs text-tertiary">— matches your interests</span>
      </div>
      <div className="space-y-2">
        {items.map(item => (
          <a
            key={item.number}
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors group"
          >
            <div className="flex items-center gap-2 min-w-0">
              <span className={`text-xs font-medium px-2 py-0.5 rounded-full flex-shrink-0 ${phaseColors[item.phase]}`}>
                Phase {item.phase}
              </span>
              <span className="text-sm font-medium text-primary truncate group-hover:text-accent transition-colors">
                {item.name}
              </span>
            </div>
            <ExternalLink className="w-3.5 h-3.5 text-tertiary group-hover:text-accent transition-colors flex-shrink-0" />
          </a>
        ))}
      </div>
    </div>
  );
}
