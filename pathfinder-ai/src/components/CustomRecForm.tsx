import { useState } from 'react';
import type { CustomRecRequest } from '../utils/openRouterApi';

interface Props {
  initialRole?: string;
  onSubmit: (request: CustomRecRequest) => void;
}

const roleOptions = [
  { value: 'software_dev', label: 'Software Developer / Engineer' },
  { value: 'tech_pm', label: 'Tech PM / Tech Manager' },
  { value: 'designer', label: 'Designer (UX/UI/Product)' },
  { value: 'content_writer', label: 'Content Writer / Marketer' },
  { value: 'data_analyst', label: 'Data Analyst / Data Scientist' },
  { value: 'other', label: 'Other' },
];

const levelOptions: { value: 'beginner' | 'intermediate' | 'expert'; label: string; tooltip: string }[] = [
  { value: 'beginner', label: 'Beginner', tooltip: "I'm new to this topic" },
  { value: 'intermediate', label: 'Intermediate', tooltip: 'I know the basics, want to go deeper' },
  { value: 'expert', label: 'Expert', tooltip: "I'm advanced, looking for cutting-edge resources" },
];

export function CustomRecForm({ initialRole, onSubmit }: Props) {
  const [role, setRole] = useState(initialRole ?? '');
  const [learningGoal, setLearningGoal] = useState('');
  const [level, setLevel] = useState<'beginner' | 'intermediate' | 'expert' | ''>('');
  const [touched, setTouched] = useState(false);

  const charCount = learningGoal.length;
  const isValid = role !== '' && charCount >= 10 && charCount <= 500 && level !== '';

  const handleSubmit = () => {
    setTouched(true);
    if (!isValid) return;
    onSubmit({ role, learningGoal, level: level as 'beginner' | 'intermediate' | 'expert' });
  };

  const showError = touched && !isValid;

  return (
    <div className="space-y-5">
      {/* Role */}
      <div>
        <label className="block text-sm font-medium text-primary mb-1.5">
          What's your role?
        </label>
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full rounded-xl border border-border bg-white px-4 py-3 text-sm text-primary focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all cursor-pointer"
        >
          <option value="" disabled>Select your role</option>
          {roleOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </div>

      {/* Learning goal */}
      <div>
        <label className="block text-sm font-medium text-primary mb-1.5">
          What do you want to learn?
        </label>
        <div className="relative">
          <textarea
            value={learningGoal}
            onChange={(e) => setLearningGoal(e.target.value.slice(0, 500))}
            placeholder="e.g. How to build a RAG pipeline for my company's internal docs"
            rows={4}
            className="w-full rounded-xl border border-border bg-white px-4 py-3 text-sm text-primary placeholder:text-tertiary focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all resize-none"
          />
          <span className={`absolute bottom-3 right-3 text-xs ${charCount > 450 ? 'text-accent' : 'text-tertiary'}`}>
            {charCount} / 500
          </span>
        </div>
      </div>

      {/* Experience level */}
      <div>
        <label className="block text-sm font-medium text-primary mb-2">
          What's your current level with this?
        </label>
        <div className="flex gap-2">
          {levelOptions.map((opt) => (
            <button
              key={opt.value}
              type="button"
              title={opt.tooltip}
              onClick={() => setLevel(opt.value)}
              className={`flex-1 py-2.5 px-3 rounded-xl text-sm font-medium border transition-all duration-150 cursor-pointer ${
                level === opt.value
                  ? 'bg-accent text-white border-accent'
                  : 'bg-gray-100 text-secondary border-transparent hover:bg-gray-200'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Validation message */}
      {showError && (
        <p className="text-sm text-accent">
          👆 Fill in all three fields so we can give you the best recommendations.
        </p>
      )}

      {/* Submit */}
      <button
        type="button"
        onClick={handleSubmit}
        disabled={touched && !isValid}
        className="w-full bg-accent text-white py-3.5 rounded-xl text-base font-semibold hover:bg-accent/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 cursor-pointer"
      >
        ✨ Find Resources
      </button>
    </div>
  );
}
