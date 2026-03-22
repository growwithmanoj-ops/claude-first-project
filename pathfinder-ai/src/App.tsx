import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useRoadmapState } from './hooks/useRoadmapState';
import { LandingScreen } from './components/LandingScreen';
import { QuestionScreen } from './components/QuestionScreen';
import { LoadingScreen } from './components/LoadingScreen';
import { RoadmapScreen } from './components/RoadmapScreen';
import { CustomRecModal } from './components/CustomRecModal';
import { SplashScreen } from './components/SplashScreen';
import type { UserAnswers, Interest } from './types';

function App() {
  const [showSplash, setShowSplash] = useState(() => !sessionStorage.getItem('splashShown'));

  const handleSplashComplete = () => {
    sessionStorage.setItem('splashShown', '1');
    setShowSplash(false);
  };

  const {
    screen,
    currentStep,
    answers,
    setScreen,
    setAnswer,
    toggleInterest,
    goToNextStep,
    goToPrevStep,
    startOver,
    isComplete,
  } = useRoadmapState();

  const [customRecOpen, setCustomRecOpen] = useState(false);

  const handleStart = () => {
    setScreen('questions');
  };

  const handleSelectSingle = (key: keyof UserAnswers, value: string) => {
    setAnswer(key, value);
  };

  const handleLoadingComplete = () => {
    setScreen('roadmap');
  };

  const handleBackFromRoadmap = () => {
    setScreen('questions');
  };

  if (showSplash) {
    return <SplashScreen onComplete={handleSplashComplete} />;
  }

  return (
    <>
      <AnimatePresence mode="wait">
        {screen === 'landing' && (
          <motion.div
            key="landing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <LandingScreen
              onStart={handleStart}
              onOpenCustomRec={() => setCustomRecOpen(true)}
            />
          </motion.div>
        )}

        {screen === 'questions' && (
          <motion.div
            key="questions"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <QuestionScreen
              currentStep={currentStep}
              answers={answers}
              onSelectSingle={handleSelectSingle}
              onToggleInterest={(interest: Interest) => toggleInterest(interest)}
              onNext={goToNextStep}
              onBack={goToPrevStep}
              isComplete={isComplete}
            />
          </motion.div>
        )}

        {screen === 'loading' && (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <LoadingScreen onComplete={handleLoadingComplete} />
          </motion.div>
        )}

        {screen === 'roadmap' && answers.role && answers.experience && answers.goal && answers.timeCommitment && answers.interests && (
          <motion.div
            key="roadmap"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30, duration: 0.4 }}
          >
            <RoadmapScreen
              answers={answers as UserAnswers}
              onStartOver={startOver}
              onBack={handleBackFromRoadmap}
              onOpenCustomRec={() => setCustomRecOpen(true)}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <CustomRecModal
        isOpen={customRecOpen}
        onClose={() => setCustomRecOpen(false)}
        onBuildRoadmap={handleStart}
        prefillRole={screen === 'roadmap' ? answers.role ?? undefined : undefined}
      />
    </>
  );
}

export default App;
