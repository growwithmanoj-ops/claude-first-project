import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { questions } from '../data/questions';
import { ProgressBar } from './ProgressBar';
import { QuestionCard } from './QuestionCard';
import type { UserAnswers, Interest } from '../types';

interface Props {
  currentStep: number;
  answers: Partial<UserAnswers>;
  onSelectSingle: (key: keyof UserAnswers, value: string) => void;
  onToggleInterest: (interest: Interest) => void;
  onNext: () => void;
  onBack: () => void;
  isComplete: (step: number) => boolean;
}

const slideVariants = {
  enterFromRight: { x: 60, opacity: 0 },
  enterFromLeft: { x: -60, opacity: 0 },
  center: { x: 0, opacity: 1 },
  exitToLeft: { x: -60, opacity: 0 },
  exitToRight: { x: 60, opacity: 0 },
};

export function QuestionScreen({
  currentStep,
  answers,
  onSelectSingle,
  onToggleInterest,
  onNext,
  onBack,
  isComplete,
}: Props) {
  const [direction, setDirection] = useState<1 | -1>(1);
  const [maxReachedToast, setMaxReachedToast] = useState(false);

  const question = questions[currentStep - 1];
  const isLastStep = currentStep === 5;

  const handleNext = () => {
    setDirection(1);
    onNext();
  };

  const handleBack = () => {
    setDirection(-1);
    onBack();
  };

  const handleCardSelect = (value: string) => {
    if (question.type === 'single_select') {
      onSelectSingle(getAnswerKey(currentStep), value);
    } else {
      const currentInterests = answers.interests || [];
      const isSelected = currentInterests.includes(value as Interest);
      if (!isSelected && currentInterests.length >= 3) {
        setMaxReachedToast(true);
        setTimeout(() => setMaxReachedToast(false), 3000);
        return;
      }
      onToggleInterest(value as Interest);
    }
  };

  const isSelected = (value: string): boolean => {
    if (question.type === 'single_select') {
      const key = getAnswerKey(currentStep);
      return answers[key] === value;
    } else {
      return (answers.interests || []).includes(value as Interest);
    }
  };

  const selectedCount = question.type === 'multi_select' ? (answers.interests || []).length : 0;

  return (
    <div className="min-h-screen bg-surface flex flex-col">
      {/* Progress bar */}
      <div className="px-6 pt-6">
        <ProgressBar currentStep={currentStep} totalSteps={5} />
      </div>

      <div className="flex-1 flex flex-col items-center px-6 py-10">
        <div className="w-full max-w-2xl">
          {/* Step indicator */}
          <p className="text-sm text-tertiary font-medium mb-4 text-center">
            Question {currentStep} of 5
          </p>

          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentStep}
              custom={direction}
              variants={slideVariants}
              initial={direction > 0 ? 'enterFromRight' : 'enterFromLeft'}
              animate="center"
              exit={direction > 0 ? 'exitToLeft' : 'exitToRight'}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
              {/* Question */}
              <h2 className="text-2xl md:text-3xl font-semibold text-primary text-center mb-3 leading-tight">
                {question.question}
              </h2>

              {/* Encouragement + multi-select counter */}
              <div className="flex items-center justify-center gap-3 mb-8">
                <p className="text-sm text-secondary text-center">{question.encouragement}</p>
                {question.type === 'multi_select' && (
                  <span className="text-xs font-medium bg-gray-100 text-secondary px-2.5 py-1 rounded-full whitespace-nowrap">
                    {selectedCount} of 3 selected
                  </span>
                )}
              </div>

              {/* Options */}
              <div className="space-y-3 mb-8">
                {question.options.map((option) => (
                  <QuestionCard
                    key={option.value}
                    value={option.value}
                    label={option.label}
                    description={option.description}
                    selected={isSelected(option.value)}
                    onSelect={() => handleCardSelect(option.value)}
                    type={question.type}
                  />
                ))}
              </div>

              {/* Max selections toast */}
              <AnimatePresence>
                {maxReachedToast && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.2 }}
                    className="mb-4 flex items-center gap-2 bg-amber-50 border border-amber-200 text-amber-800 px-4 py-3 rounded-xl text-sm"
                  >
                    <span>✨</span>
                    <span>You've picked 3 already! If you want to swap, just tap one to remove it.</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-2">
            <div>
              {currentStep > 1 && (
                <button
                  onClick={handleBack}
                  className="flex items-center gap-1.5 text-sm text-secondary hover:text-primary transition-colors cursor-pointer py-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back
                </button>
              )}
            </div>
            <motion.button
              onClick={handleNext}
              disabled={!isComplete(currentStep)}
              whileHover={isComplete(currentStep) ? { scale: 1.02 } : {}}
              whileTap={isComplete(currentStep) ? { scale: 0.98 } : {}}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-200 cursor-pointer ${
                isComplete(currentStep)
                  ? 'bg-accent text-white shadow-sm hover:shadow-md'
                  : 'bg-gray-100 text-gray-300 cursor-not-allowed'
              }`}
            >
              {isLastStep ? 'Build My Roadmap' : 'Continue'}
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
}

function getAnswerKey(step: number): keyof UserAnswers {
  switch (step) {
    case 1: return 'role';
    case 2: return 'experience';
    case 3: return 'goal';
    case 4: return 'timeCommitment';
    case 5: return 'interests';
    default: return 'role';
  }
}
