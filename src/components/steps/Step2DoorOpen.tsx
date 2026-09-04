import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Step2DoorOpenProps {
  onCompleteDoorTransition: () => void;
}

export const Step2DoorOpen: React.FC<Step2DoorOpenProps> = ({ onCompleteDoorTransition }) => {
  const [phase, setPhase] = useState<'welcome' | 'memories' | 'guide'>('welcome');

  useEffect(() => {
    // "Welcome..." for 2 seconds
    const timer1 = setTimeout(() => {
      setPhase('memories');
    }, 2200);

    // "Everything inside this room holds a memory" for another 2.5 seconds
    const timer2 = setTimeout(() => {
      setPhase('guide');
      onCompleteDoorTransition();
    }, 5000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [onCompleteDoorTransition]);

  return (
    <div className="fixed inset-0 z-30 pointer-events-none flex items-center justify-center p-6">
      <AnimatePresence mode="wait">
        {phase === 'welcome' && (
          <motion.div
            key="welcome"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 1 }}
            className="bg-[#1e130c]/90 border border-[#d4af37]/50 px-8 py-6 rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.8)] text-center max-w-md backdrop-blur-md"
          >
            <h3 className="font-cinzel text-3xl text-[#d4af37] tracking-wider font-semibold">
              Welcome...
            </h3>
          </motion.div>
        )}

        {phase === 'memories' && (
          <motion.div
            key="memories"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 1 }}
            className="bg-[#1e130c]/90 border border-[#d4af37]/50 px-8 py-6 rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.8)] text-center max-w-lg backdrop-blur-md"
          >
            <p className="font-serif text-xl md:text-2xl text-[#fdfbf7] italic leading-relaxed">
              "Everything inside this room holds a memory."
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
