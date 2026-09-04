import React from 'react';
import { motion } from 'framer-motion';
import { Lightbulb, ChevronRight, X } from 'lucide-react';
import { audioEngine } from '../../services/audioEngine';

interface Step7LampProps {
  isOpen: boolean;
  onClose: () => void;
  onCompleteStep7: () => void;
}

export const Step7Lamp: React.FC<Step7LampProps> = ({
  isOpen,
  onClose,
  onCompleteStep7
}) => {
  if (!isOpen) return null;

  const handleFinish = () => {
    audioEngine.playClick();
    onCompleteStep7();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <motion.div
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.85, opacity: 0 }}
        className="relative w-full max-w-2xl paper-texture rounded-2xl border-2 border-[#d4af37] shadow-[0_0_80px_rgba(255,215,120,0.6)] p-6 md:p-10 text-center text-[#2c1e16]"
      >
        <button
          onClick={() => {
            audioEngine.playClick();
            onClose();
          }}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-[#4a3728]/20 text-[#4a3728] transition"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#ffe082] to-[#ffd54f] border-2 border-[#d4af37] flex items-center justify-center mx-auto shadow-[0_0_30px_rgba(255,215,120,0.8)] text-[#2c1e16] mb-4">
          <Lightbulb className="w-8 h-8 fill-[#ffe082] animate-pulse" />
        </div>

        <h3 className="font-cinzel text-xl md:text-2xl font-bold text-[#4a3728] uppercase tracking-wider mb-2">
          Golden Evening Illumination
        </h3>

        <p className="font-serif text-sm text-[#8c6d53] mb-6">
          The table lamp warms the entire study room with gentle golden light.
        </p>

        {/* Revealed Handwritten Note */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="p-6 rounded-xl border border-[#d4c3a3] bg-[#fffdf9]/90 shadow-inner max-w-lg mx-auto space-y-3"
        >
          <span className="font-serif text-xs text-[#d4af37] uppercase tracking-widest block font-bold">
            Hidden Handwritten Note
          </span>

          <blockquote className="font-handwritten text-3xl md:text-4xl text-[#2c1e16] leading-relaxed">
            "Kindness is remembered longer than words."
          </blockquote>
        </motion.div>

        {/* Footer Action */}
        <div className="mt-8 pt-4 border-t border-[#8c6d53]/30 flex justify-end">
          <button
            onClick={handleFinish}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#4a3728] hover:bg-[#2c1e16] text-[#fdfbf7] font-serif font-bold text-sm shadow-lg transition-all hover:scale-105"
          >
            ➡️ Click the Gift Box <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </motion.div>
    </div>
  );
};
