import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gift, Heart, RotateCcw, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { audioEngine } from '../../services/audioEngine';

interface Step9GiftBoxProps {
  isOpen: boolean;
  onClose: () => void;
  onRestartJourney: () => void;
}

export const Step9GiftBox: React.FC<Step9GiftBoxProps> = ({
  isOpen,
  onClose,
  onRestartJourney
}) => {
  const [isRibbonUntied, setIsRibbonUntied] = useState(false);
  const [isBoxOpened, setIsBoxOpened] = useState(false);

  if (!isOpen) return null;

  const handleRestart = () => {
    setIsRibbonUntied(false);
    setIsBoxOpened(false);
    onRestartJourney();
  };

  const handleUntieRibbon = () => {
    audioEngine.playRibbonUntie();
    setIsRibbonUntied(true);
    setTimeout(() => {
      setIsBoxOpened(true);
      // Trigger romantic flower confetti burst
      confetti({
        particleCount: 70,
        spread: 90,
        origin: { y: 0.6 },
        colors: ['#e63946', '#ff4d6d', '#d4af37', '#ffb703', '#ff758f']
      });
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/90 backdrop-blur-lg">
      <AnimatePresence mode="wait">
        {!isBoxOpened ? (
          /* Gift Box Sealed View */
          <motion.div
            key="gift-box"
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.85, opacity: 0 }}
            className="relative w-full max-w-lg bg-[#2c1e16] border-2 sm:border-4 border-[#d4af37] rounded-3xl shadow-[0_0_90px_rgba(212,175,55,0.5)] p-6 sm:p-8 text-center"
          >
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#d4af37]/20 border border-[#d4af37] flex items-center justify-center mx-auto mb-4 sm:mb-6">
              <Gift className="w-8 h-8 sm:w-10 sm:h-10 text-[#d4af37] animate-bounce" />
            </div>

            <h3 className="font-cinzel text-2xl sm:text-3xl text-[#d4af37] font-bold mb-2">
              The Wooden Gift Box
            </h3>

            <p className="font-serif text-sm sm:text-base text-[#f5ebe0]/80 mb-6 sm:mb-8">
              A final keepsake wrapped with golden ribbon for Tharani Ma'am.
            </p>

            <button
              onClick={handleUntieRibbon}
              disabled={isRibbonUntied}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 sm:gap-3 px-6 sm:px-8 py-3.5 sm:py-4 rounded-full bg-gradient-to-r from-[#d4af37] to-[#e5c158] hover:from-[#c3a02e] hover:to-[#d4af37] text-[#120c08] font-serif font-bold text-sm sm:text-lg shadow-[0_0_30px_rgba(212,175,55,0.7)] transition-all active:scale-95 touch-manipulation"
            >
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" />
              {isRibbonUntied ? 'Untying Ribbon...' : 'Untie Ribbon & Open Gift'}
            </button>
          </motion.div>
        ) : (
          /* Handwritten Final Letter View */
          <motion.div
            key="letter"
            initial={{ scale: 0.85, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative w-full max-w-2xl paper-texture rounded-2xl border-2 sm:border-4 border-[#d4af37] shadow-[0_25px_90px_rgba(0,0,0,0.95)] p-4 sm:p-10 text-[#2c1e16] flex flex-col justify-between max-h-[92vh] overflow-y-auto"
          >
            {/* Header */}
            <div className="text-center border-b border-[#8c6d53]/30 pb-3 mb-4">
              <span className="font-serif text-[10px] sm:text-xs uppercase tracking-widest text-[#d4af37] font-bold block mb-1">
                Handwritten Letter
              </span>
              <h2 className="font-serif text-xl sm:text-3xl font-bold text-[#4a3728]">
                For Tharani Ma'am
              </h2>
            </div>

            {/* Letter Content */}
            <div className="space-y-3 sm:space-y-4 font-handwritten text-xl sm:text-2xl md:text-3xl text-[#2c1e16] leading-relaxed">
              <p className="font-bold text-2xl sm:text-3xl text-[#4a3728]">Dear Tharani Ma'am,</p>

              <p>Happy Teachers' Day.</p>

              <p>This isn't a thank-you letter.</p>

              <p>It's simply my heart speaking.</p>

              <p className="italic text-[#4a3728]">
                I'm sorry for every unnecessary call, every repeated message, every moment I unknowingly added to your busy schedule.
              </p>

              <p>Even then, you always showed patience.</p>

              <p>Some people become teachers.</p>

              <p className="font-bold text-[#4a3728]">A few become unforgettable.</p>

              <p>You'll always be one of those people in my life.</p>

              <p>Happy Teachers' Day, Ma'am.</p>

              <div className="pt-3 border-t border-[#8c6d53]/30 text-right">
                <p>With respect,</p>
                <p className="font-bold text-2xl sm:text-3xl text-[#d4af37] flex items-center justify-end gap-2 mt-1">
                  Your most troublesome student <Heart className="w-5 h-5 sm:w-6 sm:h-6 fill-red-500 text-red-500 inline" />
                </p>
              </div>
            </div>

            {/* Finale Section: The End */}
            <div className="mt-6 pt-4 border-t border-[#8c6d53]/40 text-center space-y-3">
              <h3 className="font-cinzel text-3xl sm:text-4xl text-[#d4af37] font-extrabold tracking-widest drop-shadow-md">
                The End
              </h3>

              <div className="flex flex-col sm:flex-row justify-center gap-2 sm:gap-4 pt-2">
                <button
                  onClick={() => {
                    audioEngine.playClick();
                    handleRestart();
                  }}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-[#4a3728] hover:bg-[#2c1e16] text-[#fdfbf7] font-serif text-xs sm:text-sm shadow-md transition active:scale-95 touch-manipulation"
                >
                  <RotateCcw className="w-4 h-4" /> Replay Journey
                </button>

                <button
                  onClick={() => {
                    audioEngine.playClick();
                    onClose();
                  }}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-[#d4af37] hover:bg-[#c3a02e] text-[#120c08] font-serif text-xs sm:text-sm font-bold shadow-md transition active:scale-95 touch-manipulation"
                >
                  Close Letter
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

