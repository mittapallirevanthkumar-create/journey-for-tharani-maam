import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { CloudRain, X, ChevronRight, Wind } from 'lucide-react';
import { audioEngine } from '../../services/audioEngine';

interface Step6WindowProps {
  isOpen: boolean;
  onClose: () => void;
  onCompleteStep6: () => void;
}

export const Step6Window: React.FC<Step6WindowProps> = ({
  isOpen,
  onClose,
  onCompleteStep6
}) => {
  useEffect(() => {
    if (isOpen) {
      audioEngine.startRainSound();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleFinish = () => {
    audioEngine.playClick();
    onCompleteStep6();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="relative w-full max-w-3xl bg-[#0f172a] border-2 border-[#d4af37]/60 rounded-2xl shadow-[0_25px_70px_rgba(0,0,0,0.9)] p-6 md:p-10 flex flex-col justify-between overflow-hidden"
      >
        {/* Soft breeze background glow */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-950/40 via-transparent to-[#1e130c]/80 pointer-events-none" />

        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#8c6d53]/30 pb-4 z-10">
          <div className="flex items-center gap-2">
            <CloudRain className="w-5 h-5 text-blue-300 animate-bounce" />
            <h3 className="font-cinzel text-xl md:text-2xl text-[#d4af37] font-semibold">
              Gentle Rain Outside the Window
            </h3>
          </div>

          <button
            onClick={() => {
              audioEngine.playClick();
              onClose();
            }}
            className="p-2 rounded-full hover:bg-[#4a3728]/50 text-[#f5ebe0] transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Window View Animation */}
        <div className="my-8 z-10 text-center space-y-6 max-w-xl mx-auto">
          {/* Animated Curtains blowing */}
          <motion.div
            animate={{ x: [-5, 5, -5] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-900/40 border border-blue-400/30 text-blue-200 text-xs font-serif"
          >
            <Wind className="w-4 h-4 text-blue-300 animate-spin" style={{ animationDuration: '8s' }} />
            <span>Soft Breeze & Rain Ambient Soundscape</span>
          </motion.div>

          <blockquote className="font-serif text-2xl md:text-4xl text-[#fdfbf7] italic leading-relaxed drop-shadow">
            "Some teachers teach subjects... <br />
            Some teach life. <br />
            <span className="text-[#d4af37] font-semibold not-italic block mt-2">
              You unknowingly did both."
            </span>
          </blockquote>

          <p className="font-handwritten text-2xl text-[#f5ebe0]/80">
            Listen to the soft raindrops on the sill...
          </p>
        </div>

        {/* Footer Action */}
        <div className="flex justify-end items-center border-t border-[#8c6d53]/30 pt-4 z-10">
          <button
            onClick={handleFinish}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#d4af37] hover:bg-[#c3a02e] text-[#120c08] font-serif font-bold text-sm shadow-lg transition-all hover:scale-105"
          >
            ➡️ Turn on the Lamp <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </motion.div>
    </div>
  );
};
