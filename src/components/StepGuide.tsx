import React from 'react';
import { motion } from 'framer-motion';
import type { StepId } from '../types';
import { Sparkles, ArrowRight, Volume2, VolumeX, ShieldCheck } from 'lucide-react';
import { audioEngine } from '../services/audioEngine';

interface StepGuideProps {
  currentStep: StepId;
  subStepText?: string;
  isMuted: boolean;
  onToggleMute: () => void;
  onOpenAdmin: () => void;
  isAdmin: boolean;
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
  9: '✨ Journey Complete! Click any room item to explore ❤️'
};

export const StepGuide: React.FC<StepGuideProps> = ({
  currentStep,
  subStepText,
  isMuted,
  onToggleMute,
  onOpenAdmin,
  isAdmin
}) => {
  const defaultHint = STEP_HINTS[currentStep];

  return (
    <div className="fixed bottom-4 left-0 right-0 z-40 flex justify-center items-center px-4 pointer-events-none">
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="pointer-events-auto flex items-center gap-3 bg-[#1e130c]/90 backdrop-blur-md border border-[#d4af37]/40 px-5 py-2.5 rounded-full shadow-[0_10px_30px_rgba(0,0,0,0.5)] text-[#fdfbf7]"
      >
        <Sparkles className="w-4 h-4 text-[#d4af37] animate-spin" style={{ animationDuration: '6s' }} />
        
        <span className="font-serif text-xs md:text-sm tracking-wider text-[#d4af37] font-semibold">
          Step {currentStep} of 9
        </span>
        
        <div className="h-4 w-[1px] bg-[#8c6d53]/40" />

        <div className="flex items-center gap-2">
          <ArrowRight className="w-4 h-4 text-[#f5ebe0] animate-pulse" />
          <span className="font-medium text-xs md:text-sm text-[#fdfbf7] drop-shadow">
            {subStepText || defaultHint}
          </span>
        </div>

        <div className="h-4 w-[1px] bg-[#8c6d53]/40" />

        <div className="flex items-center gap-2">
          {/* Audio Toggle */}
          <button
            onClick={() => {
              audioEngine.playClick();
              onToggleMute();
            }}
            className="p-1.5 rounded-full hover:bg-[#4a3728]/50 text-[#d4af37] transition"
            title={isMuted ? 'Unmute Piano Music' : 'Mute Music'}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 animate-pulse" />}
          </button>

          {/* Admin Lock / Indicator */}
          <button
            onClick={() => {
              audioEngine.playClick();
              onOpenAdmin();
            }}
            className={`p-1.5 rounded-full transition flex items-center gap-1 text-xs ${
              isAdmin ? 'bg-[#d4af37]/20 text-[#d4af37] border border-[#d4af37]/50' : 'hover:bg-[#4a3728]/50 text-[#8c6d53]'
            }`}
            title={isAdmin ? 'Admin Authenticated' : 'Admin Login'}
          >
            <ShieldCheck className="w-4 h-4" />
            {isAdmin && <span className="text-[10px] font-bold uppercase hidden md:inline">Admin</span>}
          </button>
        </div>
      </motion.div>
    </div>
  );
};
