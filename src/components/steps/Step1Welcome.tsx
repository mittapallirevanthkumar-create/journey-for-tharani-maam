import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles } from 'lucide-react';
import { audioEngine } from '../../services/audioEngine';

interface Step1WelcomeProps {
  onDoorClick: () => void;
}

export const Step1Welcome: React.FC<Step1WelcomeProps> = ({ onDoorClick }) => {
  const handleClick = () => {
    audioEngine.playClick();
    audioEngine.playDoorOpen();
    onDoorClick();
  };

  return (
    <div className="relative min-h-[100dvh] w-full flex flex-col items-center justify-between p-4 sm:p-6 overflow-y-auto bg-gradient-to-b from-[#0a0604] via-[#1a100a] to-[#0f0906]">
      {/* Background Soft Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.15)_0%,transparent_70%)] pointer-events-none" />

      {/* Header Info */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: 'easeOut' }}
        className="text-center pt-4 sm:pt-8 z-20 max-w-2xl"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#d4af37]/30 bg-[#2c1e16]/60 backdrop-blur-sm mb-3">
          <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
          <span className="text-[10px] sm:text-xs uppercase tracking-widest text-[#d4af37] font-semibold">
            Teachers' Day Special
          </span>
        </div>

        <h1 className="font-cinzel text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[#fdfbf7] via-[#f5ebe0] to-[#d4af37] drop-shadow-md">
          Happy Teachers' Day
        </h1>

        <h2 className="font-serif text-xl sm:text-3xl text-[#d4af37] mt-2 sm:mt-3 font-semibold flex items-center justify-center gap-2 sm:gap-3">
          Tharani Ma'am <Heart className="w-5 h-5 sm:w-6 sm:h-6 fill-red-500 text-red-500 inline animate-pulse" />
        </h2>

        <div className="my-4 sm:my-6 w-20 sm:w-24 h-[1px] bg-gradient-to-r from-transparent via-[#d4af37]/60 to-transparent mx-auto" />

        <p className="font-serif italic text-base sm:text-xl text-[#f5ebe0]/90 leading-relaxed px-2">
          "I couldn't express everything in words... <br className="hidden sm:inline" />
          So I created this little journey."
        </p>
      </motion.div>

      {/* Glowing Wooden Door */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.2 }}
        className="relative z-20 my-auto cursor-pointer group flex flex-col items-center py-4"
        onClick={handleClick}
      >
        <div className="relative w-40 sm:w-56 h-64 sm:h-88 rounded-t-full border-4 border-[#4a3728] bg-gradient-to-b from-[#2c1e16] to-[#120c08] shadow-[0_0_50px_rgba(212,175,55,0.3)] group-hover:shadow-[0_0_80px_rgba(255,215,120,0.6)] transition-all duration-500 overflow-hidden flex items-center justify-center active:scale-95 touch-manipulation">
          
          {/* Wood Texture Paneling */}
          <div className="absolute inset-2 rounded-t-full border border-[#8c6d53]/30 flex flex-col justify-between p-3 bg-[repeating-linear-gradient(90deg,#2c1e16,#2c1e16_10px,#23160e_10px,#23160e_20px)]">
            <div className="w-full h-20 sm:h-24 border border-[#8c6d53]/40 rounded-t-full" />
            <div className="w-full h-24 sm:h-32 border border-[#8c6d53]/40 rounded" />
          </div>

          {/* Door Handle */}
          <div className="absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 w-4 sm:w-5 h-7 sm:h-8 rounded-full bg-gradient-to-r from-[#d4af37] to-[#8c6d53] shadow-md group-hover:scale-110 transition-transform" />

          {/* Door Glow Light Leak */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#d4af37]/20 via-transparent to-transparent opacity-60 group-hover:opacity-100 transition-opacity" />

          <div className="z-10 text-center px-3">
            <span className="font-cinzel text-[10px] sm:text-xs uppercase tracking-widest text-[#d4af37] font-bold block mb-1">
              Memory Chamber
            </span>
            <span className="font-serif text-xs sm:text-sm text-[#fdfbf7]/80 group-hover:text-white transition-colors">
              Tap to Open
            </span>
          </div>
        </div>

        {/* Pulsing Hint below door */}
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="mt-4 sm:mt-6 inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-[#d4af37]/20 border border-[#d4af37]/60 text-[#d4af37] font-serif font-medium text-sm sm:text-base shadow-[0_0_20px_rgba(212,175,55,0.4)] active:scale-95 touch-manipulation"
        >
          ➡️ Tap the Door to Begin
        </motion.div>
      </motion.div>

      {/* Footer info */}
      <div className="z-20 pb-2 text-[10px] sm:text-xs font-serif text-[#8c6d53]/70 text-center">
        A Dedicated Experience for Tharani Ma'am • 2026
      </div>
    </div>
  );
};

