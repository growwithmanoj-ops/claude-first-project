import { motion } from 'framer-motion';
import { Compass, ArrowRight } from 'lucide-react';

interface Props {
  onStart: () => void;
}

export function LandingScreen({ onStart }: Props) {
  return (
    <div className="min-h-screen bg-surface flex items-center justify-center px-6 py-12">
      {/* Subtle radial background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 60% at 50% 30%, rgba(232,115,58,0.06) 0%, transparent 70%)',
        }}
      />

      <div className="relative max-w-2xl mx-auto text-center">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="flex items-center justify-center gap-2 mb-8"
        >
          <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center shadow-sm">
            <Compass className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-semibold text-primary">PathfinderAI</span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30, delay: 0.2 }}
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary tracking-tight leading-tight mb-6"
        >
          The AI world is moving fast.{' '}
          <span className="text-accent">Your learning plan</span>{' '}
          should keep up.
        </motion.h1>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30, delay: 0.4 }}
          className="text-lg text-secondary leading-relaxed mb-10 max-w-xl mx-auto"
        >
          Answer 5 quick questions and we'll build you a personalized, step-by-step AI
          learning roadmap — tailored to your role, your experience, and your goals.
        </motion.p>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30, delay: 0.6 }}
        >
          <motion.button
            onClick={onStart}
            whileHover={{ scale: 1.03, boxShadow: '0 0 30px rgba(232,115,58,0.4)' }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-3 bg-accent text-white px-8 py-4 rounded-2xl text-lg font-semibold shadow-lg transition-all duration-200 cursor-pointer"
          >
            Build My Roadmap
            <ArrowRight className="w-5 h-5" />
          </motion.button>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="mt-5 text-sm text-tertiary"
          >
            No signup. No email. Takes 2 minutes.
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
}
