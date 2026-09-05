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
    <div className="relative min-h-[100dvh] w-full flex flex-col items-center justify-between p-4 sm:p-8 bg-gradient-to-b from-[#0a0604] via-[#1a100a] to-[#0f0906] overflow-y-auto">
      {/* Background Soft Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.2)_0%,transparent_70%)] pointer-events-none" />

      {/* Header Info */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="text-center pt-2 sm:pt-6 z-20 max-w-2xl w-full"
      >
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#d4af37]/40 bg-[#2c1e16]/80 backdrop-blur-md mb-3 shadow-md">
          <Sparkles className="w-4 h-4 text-[#d4af37]" />
          <span className="text-xs uppercase tracking-widest text-[#d4af37] font-bold">
            Teachers' Day Special
          </span>
        </div>

        <h1 className="font-cinzel text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[#fdfbf7] via-[#f5ebe0] to-[#d4af37] drop-shadow-lg leading-tight">
          Happy Teachers' Day
        </h1>

        <h2 className="font-serif text-2xl sm:text-4xl text-[#d4af37] mt-2 sm:mt-3 font-bold flex items-center justify-center gap-2 drop-shadow">
          Tharani Ma'am <Heart className="w-6 h-6 sm:w-7 sm:h-7 fill-red-500 text-red-500 inline animate-pulse" />
        </h2>

        <div className="my-3 sm:my-5 w-24 h-[1.5px] bg-gradient-to-r from-transparent via-[#d4af37] to-transparent mx-auto" />

        <p className="font-serif italic text-base sm:text-xl text-[#f5ebe0] leading-relaxed px-2 drop-shadow">
          "I couldn't express everything in words... <br />
          So I created this little journey."
        </p>
      </motion.div>

      {/* Glowing Wooden Door (Big & Prominent on Mobile) */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="relative z-20 my-auto cursor-pointer group flex flex-col items-center py-2 sm:py-6 w-full"
        onClick={handleClick}
      >
        <div className="relative w-[70vw] max-w-[270px] sm:max-w-[300px] h-[340px] sm:h-[420px] rounded-t-full border-4 border-[#d4af37]/80 bg-gradient-to-b from-[#3a271a] via-[#2c1e16] to-[#120c08] shadow-[0_0_60px_rgba(212,175,55,0.4)] group-hover:shadow-[0_0_90px_rgba(255,215,120,0.8)] transition-all duration-500 overflow-hidden flex flex-col items-center justify-center active:scale-95 touch-manipulation">
          
          {/* Wood Texture Paneling */}
          <div className="absolute inset-2 rounded-t-full border border-[#8c6d53]/40 flex flex-col justify-between p-4 bg-[repeating-linear-gradient(90deg,#2c1e16,#2c1e16_12px,#23160e_12px,#23160e_24px)]">
            <div className="w-full h-28 sm:h-36 border border-[#8c6d53]/50 rounded-t-full" />
            <div className="w-full h-32 sm:h-44 border border-[#8c6d53]/50 rounded" />
          </div>

          {/* Door Handle */}
          <div className="absolute right-5 sm:right-7 top-1/2 -translate-y-1/2 w-5 sm:w-6 h-9 sm:h-10 rounded-full bg-gradient-to-r from-[#ffd54f] via-[#d4af37] to-[#8c6d53] shadow-lg group-hover:scale-110 transition-transform border border-[#ffe082]" />

          {/* Door Glow Light Leak */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#d4af37]/30 via-transparent to-transparent opacity-70 group-hover:opacity-100 transition-opacity" />

          <div className="z-10 text-center px-4">
            <span className="font-cinzel text-xs sm:text-sm uppercase tracking-widest text-[#ffd54f] font-bold block mb-1 drop-shadow">
              Memory Chamber
            </span>
            <span className="font-serif text-sm sm:text-base text-white font-semibold group-hover:text-[#ffd54f] transition-colors drop-shadow">
              Tap to Open Door
            </span>
          </div>
        </div>

        {/* Big Golden Action Button below door */}
        <motion.button
          animate={{ scale: [1, 1.04, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="mt-5 sm:mt-6 inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-gradient-to-r from-[#d4af37] via-[#e5c158] to-[#d4af37] text-[#120c08] font-serif font-extrabold text-base sm:text-lg shadow-[0_0_35px_rgba(212,175,55,0.7)] active:scale-95 touch-manipulation w-full max-w-[280px]"
        >
          ➡️ Tap to Open Door
        </motion.button>
      </motion.div>

      {/* Footer info */}
      <div className="z-20 pb-2 text-xs font-serif text-[#d4af37]/80 text-center font-medium">
        A Dedicated Experience for Tharani Ma'am • 2026
      </div>
    </div>
  );
};


