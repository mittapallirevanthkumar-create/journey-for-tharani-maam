import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Book, X, CheckCircle2, ChevronRight } from 'lucide-react';
import { audioEngine } from '../../services/audioEngine';
import type { BookItem } from '../../types';

interface Step5BookshelfProps {
  isOpen: boolean;
  onClose: () => void;
  onCompleteStep5: () => void;
}

const BOOKS: BookItem[] = [
  {
    id: 'book-1',
    title: 'My Mistakes',
    subtitle: 'Funny moments & trouble caused',
    coverColor: 'from-[#8b263e] to-[#4a121e]',
    content: {
      heading: 'Book 1: My Mistakes & Troubling Incidents',
      paragraphs: [
        'Looking back, there were so many hilarious and embarrassing moments where my eagerness got the better of me!',
        'Like the time I sent 5 consecutive messages asking about events when you were in the middle of a meeting, or calling twice in 10 minutes because I couldn’t solve a simple problem.',
        'You always handled my chaotic enthusiasm with incredible composure and a warm smile.'
      ]
    }
  },
  {
    id: 'book-2',
    title: 'What I Learned',
    subtitle: 'Life lessons from Tharani Ma\'am',
    coverColor: 'from-[#1e4620] to-[#0c2410]',
    content: {
      heading: 'Book 2: Core Lessons in Life & Character',
      paragraphs: [
        'Beyond textbooks and syllabus topics, the greatest lessons you gave were through your character.',
        'You taught me that true strength is quiet, that patience is a form of respect, and that listening is often more powerful than speaking.',
        'Whenever I face a daunting challenge now, I think of how calmly and gracefully you address every situation.'
      ]
    }
  },
  {
    id: 'book-3',
    title: 'Things I Never Said',
    subtitle: 'Emotional thoughts kept inside',
    coverColor: 'from-[#1c3144] to-[#0a1824]',
    content: {
      heading: 'Book 3: Silent Admiration & Gratitude',
      paragraphs: [
        'There were so many times I wanted to say how much your encouragement meant during low moments, but felt too shy to express it.',
        'Your belief in your students gives them confidence when they doubt themselves most.',
        'You are not just an educator; you are a beacon of inspiration that leaves an indelible mark on everyone you mentor.'
      ]
    }
  }
];

export const Step5Bookshelf: React.FC<Step5BookshelfProps> = ({
  isOpen,
  onClose,
  onCompleteStep5
}) => {
  const [readBooks, setReadBooks] = useState<Record<string, boolean>>({});
  const [activeBook, setActiveBook] = useState<BookItem | null>(null);

  if (!isOpen) return null;

  const handleOpenBook = (book: BookItem) => {
    audioEngine.playPageTurn();
    setActiveBook(book);
    setReadBooks((prev) => ({ ...prev, [book.id]: true }));
  };

  const allRead = BOOKS.every((b) => readBooks[b.id]);

  const handleFinishStep = () => {
    audioEngine.playClick();
    onCompleteStep5();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto bg-[#1a110a] border-2 border-[#d4af37]/60 rounded-2xl shadow-[0_25px_70px_rgba(0,0,0,0.9)] p-4 sm:p-8 flex flex-col justify-between"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#8c6d53]/30 pb-3">
          <div>
            <h3 className="font-cinzel text-xl sm:text-2xl text-[#d4af37] font-bold">
              Vintage Bookshelf
            </h3>
            <p className="font-serif text-xs sm:text-sm text-[#f5ebe0]/70">
              Read all 3 volumes dedicated to Tharani Ma'am
            </p>
          </div>

          <button
            onClick={() => {
              audioEngine.playClick();
              onClose();
            }}
            className="p-2 rounded-full hover:bg-[#4a3728]/50 text-[#f5ebe0] transition active:scale-95 touch-manipulation"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Book Selection View vs Active Book Reading View */}
        <div className="my-4 sm:my-6">
          <AnimatePresence mode="wait">
            {!activeBook ? (
              <motion.div
                key="shelf"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-6"
              >
                {BOOKS.map((book, idx) => {
                  const isRead = readBooks[book.id];
                  return (
                    <motion.div
                      key={book.id}
                      whileHover={{ y: -4, scale: 1.02 }}
                      whileTap={{ scale: 0.96 }}
                      onClick={() => handleOpenBook(book)}
                      className={`cursor-pointer rounded-xl p-4 sm:p-6 border border-[#d4af37]/40 bg-gradient-to-br ${book.coverColor} shadow-xl flex flex-col justify-between min-h-[140px] sm:min-h-[220px] relative overflow-hidden transition-all active:scale-95 touch-manipulation`}
                    >
                      <div className="flex items-center justify-between">
                        <Book className="w-5 h-5 sm:w-6 sm:h-6 text-[#d4af37]" />
                        {isRead && (
                          <span className="inline-flex items-center gap-1 text-[10px] sm:text-xs text-green-400 font-semibold bg-black/40 px-2 py-0.5 rounded-full border border-green-500/40">
                            <CheckCircle2 className="w-3 h-3 sm:w-3.5 sm:h-3.5" /> Read
                          </span>
                        )}
                      </div>

                      <div className="my-2">
                        <span className="text-[10px] sm:text-xs uppercase tracking-widest text-[#d4af37] font-semibold block mb-0.5 sm:mb-1">
                          Volume 0{idx + 1}
                        </span>
                        <h4 className="font-serif text-lg sm:text-2xl text-[#fdfbf7] font-bold">
                          {book.title}
                        </h4>
                        <p className="font-handwritten text-sm sm:text-lg text-[#f5ebe0]/80 mt-0.5">
                          {book.subtitle}
                        </p>
                      </div>

                      <div className="text-right text-[11px] sm:text-xs font-serif text-[#d4af37] font-semibold">
                        Tap to Read ➡️
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            ) : (
              <motion.div
                key="reading"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="paper-texture rounded-xl p-4 sm:p-8 text-[#2c1e16] shadow-2xl relative max-h-[65vh] overflow-y-auto"
              >
                <div className="flex items-center justify-between border-b border-[#8c6d53]/30 pb-3 mb-3">
                  <h4 className="font-serif text-lg sm:text-2xl font-bold text-[#4a3728]">
                    {activeBook.content.heading}
                  </h4>
                  <button
                    onClick={() => setActiveBook(null)}
                    className="text-xs font-serif text-[#8c6d53] hover:text-[#2c1e16] underline active:scale-95 touch-manipulation"
                  >
                    Back to Shelf
                  </button>
                </div>

                <div className="space-y-3 font-handwritten text-lg sm:text-2xl text-[#3a281c]">
                  {activeBook.content.paragraphs.map((p, i) => (
                    <p key={i} className="leading-relaxed">
                      {p}
                    </p>
                  ))}
                </div>

                <div className="mt-4 pt-3 border-t border-[#8c6d53]/30 flex justify-end">
                  <button
                    onClick={() => {
                      audioEngine.playClick();
                      setActiveBook(null);
                    }}
                    className="w-full sm:w-auto px-5 py-2 rounded-full bg-[#4a3728] text-[#fdfbf7] font-serif text-xs font-semibold hover:bg-[#2c1e16] transition active:scale-95 touch-manipulation text-center"
                  >
                    Return to Bookshelf
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-[#8c6d53]/30 pt-3">
          <span className="font-serif text-xs text-[#8c6d53]">
            {allRead
              ? '✨ All 3 volumes read!'
              : `Books read: ${Object.keys(readBooks).length} / 3`}
          </span>

          {allRead && (
            <button
              onClick={handleFinishStep}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-[#d4af37] hover:bg-[#c3a02e] text-[#120c08] font-serif font-bold text-xs sm:text-sm shadow-lg transition-all active:scale-95 touch-manipulation"
            >
              ➡️ Click Window <ChevronRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </motion.div>
    </div>
  );
};

