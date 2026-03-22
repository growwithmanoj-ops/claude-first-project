import { useState, useCallback, useEffect } from 'react';
import type { UserAnswers, Screen, Interest } from '../types';
import { decodeAnswers, syncToURL, getStepFromURL } from '../utils/urlParams';

interface RoadmapState {
  screen: Screen;
  currentStep: number;
  answers: Partial<UserAnswers>;
  setScreen: (screen: Screen) => void;
  setCurrentStep: (step: number) => void;
  setAnswer: (key: keyof UserAnswers, value: string | string[]) => void;
  toggleInterest: (interest: Interest) => void;
  goToNextStep: () => void;
  goToPrevStep: () => void;
  startOver: () => void;
  isComplete: (step: number) => boolean;
}

export function useRoadmapState(): RoadmapState {
  const [screen, setScreenState] = useState<Screen>('landing');
  const [currentStep, setCurrentStepState] = useState<number>(1);
  const [answers, setAnswers] = useState<Partial<UserAnswers>>({});

  // On mount: check URL params
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const decoded = decodeAnswers(params);
    if (decoded) {
      setAnswers(decoded);
      setScreenState('roadmap');
    } else {
      const step = getStepFromURL();
      const hasStepParam = params.has('step');
      if (hasStepParam) {
        setScreenState('questions');
        setCurrentStepState(step);
      }
    }
  }, []);

  const setScreen = useCallback((s: Screen) => {
    setScreenState(s);
    if (s === 'landing') {
      window.history.replaceState({}, '', window.location.pathname);
    }
  }, []);

  const setCurrentStep = useCallback((step: number) => {
    setCurrentStepState(step);
    syncToURL({}, step);
  }, []);

  const setAnswer = useCallback((key: keyof UserAnswers, value: string | string[]) => {
    setAnswers(prev => {
      const updated = { ...prev, [key]: value };
      syncToURL(updated as Partial<UserAnswers>);
      return updated;
    });
  }, []);

  const toggleInterest = useCallback((interest: Interest) => {
    setAnswers(prev => {
      const current = prev.interests || [];
      const exists = current.includes(interest);
      const updated = exists
        ? current.filter(i => i !== interest)
        : [...current, interest];
      const newAnswers = { ...prev, interests: updated };
      syncToURL(newAnswers as Partial<UserAnswers>);
      return newAnswers;
    });
  }, []);

  const isComplete = useCallback((step: number): boolean => {
    switch (step) {
      case 1: return !!answers.role;
      case 2: return !!answers.experience;
      case 3: return !!answers.goal;
      case 4: return !!answers.timeCommitment;
      case 5: return !!(answers.interests && answers.interests.length >= 1);
      default: return false;
    }
  }, [answers]);

  const goToNextStep = useCallback(() => {
    if (currentStep < 5) {
      const next = currentStep + 1;
      setCurrentStepState(next);
      syncToURL(answers as Partial<UserAnswers>, next);
    } else {
      // All done — go to loading
      setScreenState('loading');
    }
  }, [currentStep, answers]);

  const goToPrevStep = useCallback(() => {
    if (currentStep > 1) {
      const prev = currentStep - 1;
      setCurrentStepState(prev);
      syncToURL(answers as Partial<UserAnswers>, prev);
    } else {
      setScreenState('landing');
      window.history.replaceState({}, '', window.location.pathname);
    }
  }, [currentStep, answers]);

  const startOver = useCallback(() => {
    setAnswers({});
    setCurrentStepState(1);
    setScreenState('landing');
    window.history.replaceState({}, '', window.location.pathname);
  }, []);

  return {
    screen,
    currentStep,
    answers,
    setScreen,
    setCurrentStep,
    setAnswer,
    toggleInterest,
    goToNextStep,
    goToPrevStep,
    startOver,
    isComplete,
  };
}
