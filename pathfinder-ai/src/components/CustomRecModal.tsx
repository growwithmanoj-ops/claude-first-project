import { useEffect, useCallback, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { CustomRecForm } from './CustomRecForm';
import { CustomRecLoading } from './CustomRecLoading';
import { CustomRecResults } from './CustomRecResults';
import { getCustomRecommendations } from '../utils/openRouterApi';
import { errorMessages } from '../data/errorMessages';
import type { CustomRecRequest, RecommendedResource } from '../utils/openRouterApi';

type ModalState = 'form' | 'loading' | 'results' | 'error';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onBuildRoadmap: () => void;
  prefillRole?: string;
}

export function CustomRecModal({ isOpen, onClose, onBuildRoadmap, prefillRole }: Props) {
  const [modalState, setModalState] = useState<ModalState>('form');
  const [resources, setResources] = useState<RecommendedResource[]>([]);
  const [lastRequest, setLastRequest] = useState<CustomRecRequest | null>(null);
  const [errorKey, setErrorKey] = useState<string>('apiError');

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  // Close on Escape
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') onClose();
  }, [onClose]);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, handleKeyDown]);

  // Reset to form when modal opens
  useEffect(() => {
    if (isOpen) {
      setModalState('form');
      setResources([]);
      setLastRequest(null);
    }
  }, [isOpen]);

  const handleSubmit = async (request: CustomRecRequest) => {
    setLastRequest(request);
    setModalState('loading');

    const result = await getCustomRecommendations(request);

    if (result.success) {
      setResources(result.resources);
      setModalState('results');
    } else {
      setErrorKey(result.error);
      setModalState('error');
    }
  };

  const handleTryAnother = () => {
    setModalState('form');
    setResources([]);
  };

  const handleRetry = () => {
    if (lastRequest) {
      handleSubmit(lastRequest);
    } else {
      setModalState('form');
    }
  };

  const handleBuildRoadmap = () => {
    onClose();
    onBuildRoadmap();
  };

  const errorMsg = (() => {
    const customRec = errorMessages.customRec as Record<string, { text: string; icon: string }>;
    return customRec[errorKey] ?? customRec['apiError'];
  })();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/40 z-40"
            onClick={onClose}
          />

          {/* Modal — bottom sheet on mobile, centered on desktop */}
          <motion.div
            key="modal"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed z-50 left-0 right-0 bottom-0 md:inset-0 md:flex md:items-center md:justify-center pointer-events-none"
          >
            <div
              className="pointer-events-auto w-full md:max-w-lg bg-white rounded-t-3xl md:rounded-2xl shadow-2xl flex flex-col max-h-[90vh] md:max-h-[85vh]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Drag handle (mobile only) */}
              <div className="md:hidden flex justify-center pt-3 pb-1">
                <div className="w-10 h-1 rounded-full bg-border" />
              </div>

              {/* Header */}
              <div className="flex items-center justify-between px-6 pt-4 pb-2">
                <div className="flex items-center gap-2">
                  <span className="text-lg">🎯</span>
                  <h2 className="text-base font-semibold text-primary">Get personalized recommendations</h2>
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 text-secondary transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Body */}
              <div className="px-6 pb-6 overflow-y-auto flex-1">
                <AnimatePresence mode="wait">
                  {modalState === 'form' && (
                    <motion.div
                      key="form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <CustomRecForm
                        initialRole={prefillRole}
                        onSubmit={handleSubmit}
                      />
                    </motion.div>
                  )}

                  {modalState === 'loading' && (
                    <motion.div
                      key="loading"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <CustomRecLoading />
                    </motion.div>
                  )}

                  {modalState === 'results' && lastRequest && (
                    <motion.div
                      key="results"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <CustomRecResults
                        resources={resources}
                        learningGoal={lastRequest.learningGoal}
                        level={lastRequest.level}
                        onTryAnother={handleTryAnother}
                        onClose={onClose}
                        onBuildRoadmap={handleBuildRoadmap}
                      />
                    </motion.div>
                  )}

                  {modalState === 'error' && (
                    <motion.div
                      key="error"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="py-8 text-center space-y-4"
                    >
                      <div className="text-3xl">{errorMsg.icon}</div>
                      <p className="text-sm text-secondary">{errorMsg.text}</p>
                      <div className="flex gap-3 justify-center">
                        <button
                          type="button"
                          onClick={handleRetry}
                          className="px-5 py-2.5 bg-accent text-white rounded-xl text-sm font-semibold hover:bg-accent/90 transition-all cursor-pointer"
                        >
                          Try Again
                        </button>
                        <button
                          type="button"
                          onClick={() => setModalState('form')}
                          className="px-5 py-2.5 border border-border text-secondary rounded-xl text-sm font-semibold hover:bg-gray-50 transition-all cursor-pointer"
                        >
                          Edit Search
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
