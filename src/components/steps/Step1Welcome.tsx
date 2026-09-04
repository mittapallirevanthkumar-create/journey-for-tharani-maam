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
    <div className="relative min-h-screen w-full flex flex-col items-center justify-between p-6 overflow-hidden bg-gradient-to-b from-[#0a0604] via-[#1a100a] to-[#0f0906]">
      {/* Background Soft Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.15)_0%,transparent_70%)] pointer-events-none" />

      {/* Header Info */}
      <motion.div
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
        className="text-center pt-8 md:pt-12 z-20 max-w-2xl"
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#d4af37]/30 bg-[#2c1e16]/60 backdrop-blur-sm mb-4">
          <Sparkles className="w-4 h-4 text-[#d4af37]" />
          <span className="text-xs uppercase tracking-widest text-[#d4af37] font-semibold">
            Teachers' Day Special
          </span>
        </div>

        <h1 className="font-cinzel text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[#fdfbf7] via-[#f5ebe0] to-[#d4af37] drop-shadow-md">
          Happy Teachers' Day
        </h1>

        <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl text-[#d4af37] mt-3 font-semibold flex items-center justify-center gap-3">
          Tharani Ma'am <Heart className="w-6 h-6 fill-red-500 text-red-500 inline animate-pulse" />
        </h2>

        <div className="my-6 w-24 h-[1px] bg-gradient-to-r from-transparent via-[#d4af37]/60 to-transparent mx-auto" />

        <p className="font-serif italic text-lg md:text-xl text-[#f5ebe0]/90 leading-relaxed px-4">
          "I couldn't express everything in words... <br />
          So I created this little journey."
        </p>
      </motion.div>

      {/* Glowing Wooden Door */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.5, delay: 0.4 }}
        className="relative z-20 my-auto cursor-pointer group flex flex-col items-center"
        onClick={handleClick}
      >
        <div className="relative w-48 md:w-60 h-80 md:h-96 rounded-t-full border-4 border-[#4a3728] bg-gradient-to-b from-[#2c1e16] to-[#120c08] shadow-[0_0_50px_rgba(212,175,55,0.3)] group-hover:shadow-[0_0_80px_rgba(255,215,120,0.6)] transition-all duration-500 overflow-hidden flex items-center justify-center">
          
          {/* Wood Texture Paneling */}
          <div className="absolute inset-2 rounded-t-full border border-[#8c6d53]/30 flex flex-col justify-between p-4 bg-[repeating-linear-gradient(90deg,#2c1e16,#2c1e16_10px,#23160e_10px,#23160e_20px)]">
            <div className="w-full h-24 border border-[#8c6d53]/40 rounded-t-full" />
            <div className="w-full h-32 border border-[#8c6d53]/40 rounded" />
          </div>

          {/* Door Handle */}
          <div className="absolute right-6 top-1/2 -translate-y-1/2 w-5 h-8 rounded-full bg-gradient-to-r from-[#d4af37] to-[#8c6d53] shadow-md group-hover:scale-110 transition-transform" />

          {/* Door Glow Light Leak */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#d4af37]/20 via-transparent to-transparent opacity-60 group-hover:opacity-100 transition-opacity" />

          <div className="z-10 text-center px-4">
            <span className="font-cinzel text-xs uppercase tracking-widest text-[#d4af37] font-bold block mb-1">
              Memory Chamber
            </span>
            <span className="font-serif text-sm text-[#fdfbf7]/80 group-hover:text-white transition-colors">
              Click to Open
            </span>
          </div>
        </div>

        {/* Pulsing Hint below door */}
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="mt-6 inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#d4af37]/20 border border-[#d4af37]/60 text-[#d4af37] font-serif font-medium text-base shadow-[0_0_20px_rgba(212,175,55,0.4)]"
        >
          ➡️ Click the Door to Begin
        </motion.div>
      </motion.div>

      {/* Footer minimal info */}
      <div className="z-20 pb-4 text-xs font-serif text-[#8c6d53]/70 text-center">
        A Dedicated Experience for Tharani Ma'am • 2026
      </div>
    </div>
  );
};
