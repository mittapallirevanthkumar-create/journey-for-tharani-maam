import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, ChevronRight, ChevronLeft, X, BookOpen } from 'lucide-react';
import { audioEngine } from '../../services/audioEngine';

interface Step3DiaryProps {
  isOpen: boolean;
  onClose: () => void;
  onCompleteStep3: () => void;
}

export const Step3Diary: React.FC<Step3DiaryProps> = ({ isOpen, onClose, onCompleteStep3 }) => {
  const [page, setPage] = useState<1 | 2 | 3>(1);

  if (!isOpen) return null;

  const nextPage = () => {
    audioEngine.playPageTurn();
    if (page === 1) {
      setPage(2);
    } else if (page === 2) {
      setPage(3);
    } else {
      onCompleteStep3();
      onClose();
    }
  };

  const prevPage = () => {
    if (page > 1) {
      audioEngine.playPageTurn();
      setPage((prev) => (prev - 1) as 1 | 2 | 3);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md">
      <motion.div
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.85, opacity: 0 }}
        transition={{ duration: 0.4 }}
        className="relative w-full max-w-2xl max-h-[88vh] overflow-y-auto paper-texture rounded-2xl border-l-[12px] sm:border-l-[16px] border-[#3a271a] shadow-[0_20px_60px_rgba(0,0,0,0.9)] p-4 sm:p-8 flex flex-col justify-between"
      >
        {/* Binder Rings / Spine Details */}
        <div className="absolute left-0 top-0 bottom-0 w-3 sm:w-4 bg-gradient-to-r from-[#2c1e16] to-[#4a3728] border-r border-[#8c6d53]/40 pointer-events-none" />

        {/* Close button */}
        <button
          onClick={() => {
            audioEngine.playClick();
            onClose();
          }}
          className="absolute top-3 right-3 p-2 rounded-full hover:bg-[#4a3728]/20 text-[#4a3728] transition active:scale-95 touch-manipulation"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Indicator */}
        <div className="flex items-center justify-between text-[11px] sm:text-xs font-serif text-[#8c6d53] uppercase tracking-wider border-b border-[#8c6d53]/20 pb-2 pr-8 sm:pr-0">
          <span className="flex items-center gap-1.5">
            <BookOpen className="w-4 h-4 text-[#d4af37]" /> Vintage Diary • Page {page}/3
          </span>
          <span className="hidden sm:inline">September 5th</span>
        </div>

        {/* Page Content */}
        <div className="my-auto py-4">
          <AnimatePresence mode="wait">
            {page === 1 && (
              <motion.div
                key="page1"
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -15 }}
                transition={{ duration: 0.3 }}
                className="space-y-4 sm:space-y-6 text-center max-w-xl mx-auto"
              >
                <h2 className="font-cinzel text-2xl sm:text-4xl md:text-5xl font-bold text-[#2c1e16] tracking-tight">
                  Happy Teachers' Day
                </h2>
                <h3 className="font-serif text-xl sm:text-3xl text-[#d4af37] font-semibold flex items-center justify-center gap-2">
                  Tharani Ma'am <Heart className="w-5 h-5 sm:w-6 sm:h-6 fill-red-500 text-red-500 inline" />
                </h3>
                
                <div className="w-16 h-[1px] bg-[#d4af37] mx-auto" />

                <p className="font-handwritten text-xl sm:text-2xl md:text-3xl text-[#4a3728] leading-relaxed pt-1 sm:pt-2">
                  To the mentor who shapes minds and touches hearts with quiet grace.
                  May your days be filled with as much light, joy, and peace as you bring to everyone around you.
                </p>
              </motion.div>
            )}

            {page === 2 && (
              <motion.div
                key="page2"
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -15 }}
                transition={{ duration: 0.3 }}
                className="space-y-3 sm:space-y-4 max-w-xl mx-auto text-[#2c1e16]"
              >
                <h3 className="font-serif text-lg sm:text-2xl font-bold text-[#4a3728] border-b border-[#8c6d53]/30 pb-2">
                  A Heartfelt Letter of Apology
                </h3>

                <p className="font-handwritten text-lg sm:text-2xl text-[#3a281c] leading-snug">
                  Ma'am, looking back, I realize how often I was a source of inconvenience for you.
                  I am truly sorry for:
                </p>

                <ul className="font-handwritten text-base sm:text-xl text-[#4a3728] space-y-1.5 list-disc list-inside pl-1 sm:pl-2">
                  <li>Disturbing your peace with my endless questions and worries.</li>
                  <li>Calling repeatedly when I should have been patient.</li>
                  <li>Messaging too much, filling your inbox during busy hours.</li>
                  <li>Asking for your precious time even when you were overwhelmed.</li>
                  <li>Unintentionally troubling you time and time again.</li>
                </ul>

                <p className="font-serif italic text-base sm:text-xl text-[#2c1e16] font-medium pt-2 sm:pt-3 border-t border-[#8c6d53]/30">
                  "I hope one day you'll smile remembering your most troublesome student."
                </p>
              </motion.div>
            )}

            {page === 3 && (
              <motion.div
                key="page3"
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -15 }}
                transition={{ duration: 0.3 }}
                className="text-center space-y-4 sm:space-y-6 max-w-lg mx-auto py-4 sm:py-8"
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#d4af37]/20 border border-[#d4af37] flex items-center justify-center mx-auto text-[#d4af37]">
                  ✨
                </div>

                <blockquote className="font-serif text-xl sm:text-3xl italic text-[#2c1e16] leading-relaxed">
                  "There are memories I never want to forget."
                </blockquote>

                <p className="font-handwritten text-xl sm:text-2xl text-[#8c6d53]">
                  Let us look into the photo album next...
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer Turn Page Action */}
        <div className="flex flex-wrap sm:flex-nowrap justify-between items-center gap-2 border-t border-[#8c6d53]/20 pt-3 mt-2">
          <div>
            {page > 1 && (
              <button
                onClick={prevPage}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#8c6d53]/30 hover:bg-[#4a3728] text-[#2c1e16] hover:text-[#fdfbf7] font-serif text-xs sm:text-sm border border-[#8c6d53]/50 transition-all active:scale-95 touch-manipulation"
              >
                <ChevronLeft className="w-4 h-4" />
                Previous Page
              </button>
            )}
          </div>

          <button
            onClick={nextPage}
            className="inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-full bg-[#4a3728] hover:bg-[#2c1e16] text-[#fdfbf7] font-serif text-xs sm:text-sm shadow-md transition-all active:scale-95 touch-manipulation font-bold ml-auto"
          >
            {page === 3 ? '➡️ Open Photo Album' : '➡️ Turn Page'}
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </motion.div>
    </div>
  );
};

