import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

interface Props {
  value: string;
  label: string;
  description: string;
  selected: boolean;
  onSelect: () => void;
  type: 'single_select' | 'multi_select';
}

export function QuestionCard({ value: _value, label, description, selected, onSelect, type }: Props) {
  return (
    <motion.button
      onClick={onSelect}
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      animate={selected ? { scale: 1.02 } : { scale: 1 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      className={`w-full text-left p-5 rounded-2xl border transition-all duration-200 cursor-pointer relative ${
        selected
          ? 'border-accent bg-accent-soft shadow-md ring-2 ring-accent/20'
          : 'border-border bg-white shadow-sm hover:shadow-md'
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-primary text-base">{label}</p>
          <p className="text-sm text-secondary mt-1 leading-relaxed">{description}</p>
        </div>
        <div className="flex-shrink-0 mt-0.5">
          {type === 'multi_select' ? (
            <div
              className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all duration-200 ${
                selected ? 'bg-accent border-accent' : 'border-gray-300'
              }`}
            >
              {selected && <Check className="w-3 h-3 text-white" strokeWidth={3} />}
            </div>
          ) : (
            <div
              className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
                selected ? 'border-accent' : 'border-gray-300'
              }`}
            >
              {selected && <div className="w-2.5 h-2.5 rounded-full bg-accent" />}
            </div>
          )}
        </div>
      </div>
    </motion.button>
  );
}
