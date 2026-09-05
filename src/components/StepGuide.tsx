import React from 'react';
import { motion } from 'framer-motion';
import type { StepId } from '../types';
import { Sparkles, ArrowRight, Volume2, VolumeX } from 'lucide-react';
import { audioEngine } from '../services/audioEngine';

interface StepGuideProps {
  currentStep: StepId;
  subStepText?: string;
  isMuted: boolean;
  onToggleMute: () => void;
}

const STEP_HINTS: Record<StepId, string> = {
  1: '➡️ Click the Door to Begin',
  2: '➡️ Click the Diary',
  3: '➡️ Click the Photo Album',
  4: '➡️ Click the Bookshelf',
  5: '➡️ Click the Window',
  6: '➡️ Turn on the Lamp',
  7: '➡️ Click the Gift Box',
  8: '➡️ Open the Gift Box',
  9: '✨ Journey Complete! Explore any item ❤️'
};

export const StepGuide: React.FC<StepGuideProps> = ({
  currentStep,
  subStepText,
  isMuted,
  onToggleMute
}) => {
  const defaultHint = STEP_HINTS[currentStep];

  return (
    <div className="fixed bottom-3 left-0 right-0 z-40 flex justify-center items-center px-3 pointer-events-none">
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="pointer-events-auto flex items-center gap-2 sm:gap-3 bg-[#1e130c]/95 backdrop-blur-md border border-[#d4af37]/50 px-4 py-2 sm:px-6 sm:py-2.5 rounded-full shadow-[0_10px_30px_rgba(0,0,0,0.8)] text-[#fdfbf7] max-w-[95vw]"
      >
        <Sparkles className="w-4 h-4 text-[#d4af37] shrink-0 animate-spin" style={{ animationDuration: '6s' }} />
        
        <span className="font-serif text-xs sm:text-sm tracking-wider text-[#d4af37] font-semibold shrink-0">
          Step {currentStep}/9
        </span>
        
        <div className="h-4 w-[1px] bg-[#8c6d53]/40 shrink-0" />

        <div className="flex items-center gap-1.5 min-w-0 overflow-hidden">
          <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#f5ebe0] shrink-0 animate-pulse" />
          <span className="font-medium text-xs sm:text-sm text-[#fdfbf7] truncate drop-shadow">
            {subStepText || defaultHint}
          </span>
        </div>

        <div className="h-4 w-[1px] bg-[#8c6d53]/40 shrink-0" />

        {/* Audio Toggle */}
        <button
          onClick={() => {
            audioEngine.playClick();
            onToggleMute();
          }}
          className="p-2 rounded-full hover:bg-[#4a3728]/60 text-[#d4af37] transition active:scale-95 shrink-0 touch-manipulation"
          title={isMuted ? 'Unmute Music' : 'Mute Music'}
        >
          {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 animate-pulse" />}
        </button>
      </motion.div>
    </div>
  );
};

