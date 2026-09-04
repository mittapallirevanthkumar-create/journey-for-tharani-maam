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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-lg">
      <AnimatePresence mode="wait">
        {!isBoxOpened ? (
          /* Gift Box Sealed View */
          <motion.div
            key="gift-box"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="relative w-full max-w-lg bg-[#2c1e16] border-4 border-[#d4af37] rounded-3xl shadow-[0_0_90px_rgba(212,175,55,0.5)] p-8 text-center"
          >
            <div className="w-20 h-20 rounded-full bg-[#d4af37]/20 border border-[#d4af37] flex items-center justify-center mx-auto mb-6">
              <Gift className="w-10 h-10 text-[#d4af37] animate-bounce" />
            </div>

            <h3 className="font-cinzel text-3xl text-[#d4af37] font-bold mb-2">
              The Wooden Gift Box
            </h3>

            <p className="font-serif text-base text-[#f5ebe0]/80 mb-8">
              A final keepsake wrapped with golden ribbon for Tharani Ma'am.
            </p>

            <button
              onClick={handleUntieRibbon}
              disabled={isRibbonUntied}
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-[#d4af37] to-[#e5c158] hover:from-[#c3a02e] hover:to-[#d4af37] text-[#120c08] font-serif font-bold text-lg shadow-[0_0_30px_rgba(212,175,55,0.7)] transition-all hover:scale-105 active:scale-95"
            >
              <Sparkles className="w-5 h-5" />
              {isRibbonUntied ? 'Untying Ribbon...' : 'Untie Ribbon & Open Gift'}
            </button>
          </motion.div>
        ) : (
          /* Handwritten Final Letter View */
          <motion.div
            key="letter"
            initial={{ scale: 0.8, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative w-full max-w-2xl paper-texture rounded-2xl border-4 border-[#d4af37] shadow-[0_25px_90px_rgba(0,0,0,0.95)] p-8 md:p-12 text-[#2c1e16] flex flex-col justify-between max-h-[90vh] overflow-y-auto"
          >
            {/* Header */}
            <div className="text-center border-b border-[#8c6d53]/30 pb-4 mb-6">
              <span className="font-serif text-xs uppercase tracking-widest text-[#d4af37] font-bold block mb-1">
                Handwritten Letter
              </span>
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-[#4a3728]">
                For Tharani Ma'am
              </h2>
            </div>

            {/* Letter Content */}
            <div className="space-y-4 font-handwritten text-2xl md:text-3xl text-[#2c1e16] leading-relaxed">
              <p className="font-bold text-3xl text-[#4a3728]">Dear Tharani Ma'am,</p>

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

              <div className="pt-4 border-t border-[#8c6d53]/30 text-right">
                <p>With respect,</p>
                <p className="font-bold text-3xl text-[#d4af37] flex items-center justify-end gap-2 mt-1">
                  Your most troublesome student <Heart className="w-6 h-6 fill-red-500 text-red-500 inline" />
                </p>
              </div>
            </div>

            {/* Finale Section: The End */}
            <div className="mt-8 pt-6 border-t border-[#8c6d53]/40 text-center space-y-4">
              <h3 className="font-cinzel text-4xl text-[#d4af37] font-extrabold tracking-widest drop-shadow-md">
                The End
              </h3>

              <div className="flex justify-center gap-4 pt-2">
                <button
                  onClick={() => {
                    audioEngine.playClick();
                    handleRestart();
                  }}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#4a3728] hover:bg-[#2c1e16] text-[#fdfbf7] font-serif text-sm shadow-md transition"
                >
                  <RotateCcw className="w-4 h-4" /> Replay Journey
                </button>

                <button
                  onClick={() => {
                    audioEngine.playClick();
                    onClose();
                  }}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#d4af37] hover:bg-[#c3a02e] text-[#120c08] font-serif text-sm font-bold shadow-md transition"
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
