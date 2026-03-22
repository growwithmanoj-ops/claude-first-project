import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { customRecLoadingMessages } from '../data/customRecMessages';

export function CustomRecLoading() {
  const [msgIndex, setMsgIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMsgIndex((i) => (i + 1) % customRecLoadingMessages.length);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center py-12 gap-6">
      {/* Pulsing dots */}
      <div className="flex gap-2">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-2.5 h-2.5 rounded-full bg-accent"
            animate={{ scale: [1, 1.4, 1], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.2 }}
          />
        ))}
      </div>

      {/* Cycling message */}
      <div className="h-6 relative overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.p
            key={msgIndex}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35 }}
            className="text-sm text-secondary text-center absolute left-0 right-0"
          >
            {customRecLoadingMessages[msgIndex]}
          </motion.p>
        </AnimatePresence>
      </div>
    </div>
  );
}
