import { Lightbulb } from 'lucide-react';

interface Props {
  tip: string;
}

export function TipCard({ tip }: Props) {
  return (
    <div className="bg-accent-soft border-l-4 border-accent rounded-2xl p-5 flex gap-4">
      <div className="flex-shrink-0 mt-0.5">
        <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center">
          <Lightbulb className="w-4 h-4 text-accent" />
        </div>
      </div>
      <div>
        <p className="font-semibold text-primary text-sm mb-1">Your personalized learning tip</p>
        <p className="text-sm text-secondary leading-relaxed">{tip}</p>
      </div>
    </div>
  );
}
