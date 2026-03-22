import { Sparkles } from 'lucide-react';

interface Props {
  onOpen: () => void;
  variant: 'landing' | 'roadmap';
}

export function CustomRecCTA({ onOpen, variant }: Props) {
  if (variant === 'landing') {
    return (
      <div className="flex flex-col items-center gap-3 mt-6">
        {/* OR divider */}
        <div className="flex items-center gap-3 w-full max-w-xs">
          <div className="flex-1 h-px bg-border" />
          <span className="text-xs text-tertiary">or</span>
          <div className="flex-1 h-px bg-border" />
        </div>

        {/* Label + button */}
        <p className="text-sm text-secondary">Know exactly what you want to learn?</p>
        <button
          type="button"
          onClick={onOpen}
          className="inline-flex items-center gap-2 border border-accent text-accent bg-transparent hover:bg-accent-soft px-6 py-2.5 rounded-2xl text-sm font-semibold transition-all duration-200 cursor-pointer"
        >
          <Sparkles className="w-4 h-4" />
          Get Instant Recommendations
        </button>
      </div>
    );
  }

  // roadmap variant — floating card
  return (
    <div className="rounded-2xl border border-border bg-white shadow-sm p-5">
      <div className="flex items-start gap-3">
        <Sparkles className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
        <div className="flex-1">
          <p className="font-medium text-primary text-sm mb-0.5">Looking for something specific?</p>
          <p className="text-sm text-secondary mb-3">Tell us what you want to learn and we'll find it.</p>
          <button
            type="button"
            onClick={onOpen}
            className="inline-flex items-center gap-2 border border-accent text-accent bg-transparent hover:bg-accent-soft px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 cursor-pointer"
          >
            Get Custom Recommendations
          </button>
        </div>
      </div>
    </div>
  );
}
