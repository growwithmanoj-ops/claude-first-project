import { Star, ExternalLink } from 'lucide-react';
import type { RoadmapItem } from '../types';

interface Props {
  item: RoadmapItem;
  starred: boolean;
}

export function ResourceCard({ item, starred }: Props) {
  return (
    <div
      className={`bg-white rounded-xl border p-4 flex items-start gap-4 transition-all duration-200 hover:shadow-md group ${
        starred ? 'border-l-4 border-l-amber-400 border-y-border border-r-border' : 'border-border'
      }`}
    >
      {/* Number badge */}
      <div className="flex-shrink-0 w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center text-xs font-semibold text-secondary">
        {item.number}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <p className="font-semibold text-primary text-sm leading-tight">{item.name}</p>
          {starred && (
            <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500 flex-shrink-0" />
          )}
        </div>
        <p className="text-xs text-secondary leading-relaxed line-clamp-2">{item.description}</p>
      </div>

      {/* Link */}
      <a
        href={item.link}
        target="_blank"
        rel="noopener noreferrer"
        className="flex-shrink-0 flex items-center gap-1 text-xs font-medium text-accent hover:text-accent/80 transition-colors py-1 px-2.5 rounded-lg hover:bg-accent-soft whitespace-nowrap"
        onClick={(e) => e.stopPropagation()}
      >
        Open
        <ExternalLink className="w-3 h-3" />
      </a>
    </div>
  );
}
