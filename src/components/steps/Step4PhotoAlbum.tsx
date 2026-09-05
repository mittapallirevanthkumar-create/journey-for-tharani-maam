import React, { useState } from 'react';
import { motion } from 'framer-motion';
import type { PhotoItem } from '../../types';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { audioEngine } from '../../services/audioEngine';
import { isMediaVideo } from '../../services/photoStore';

interface Step4PhotoAlbumProps {
  isOpen: boolean;
  onClose: () => void;
  photos: PhotoItem[];
  onCompleteStep4: () => void;
}

export const Step4PhotoAlbum: React.FC<Step4PhotoAlbumProps> = ({
  isOpen,
  onClose,
  photos,
  onCompleteStep4
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!isOpen) return null;

  const currentPhoto = photos && photos.length > 0 ? photos[currentIndex % photos.length] || photos[0] : null;

  const handleNext = () => {
    if (!photos || photos.length === 0) return;
    audioEngine.playPageTurn();
    setCurrentIndex((prev) => (prev + 1) % photos.length);
  };

  const handlePrev = () => {
    if (!photos || photos.length === 0) return;
    audioEngine.playPageTurn();
    setCurrentIndex((prev) => (prev - 1 + photos.length) % photos.length);
  };

  const handleFinish = () => {
    audioEngine.playClick();
    onCompleteStep4();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md">
      <motion.div
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.85, opacity: 0 }}
        transition={{ duration: 0.4 }}
        className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto bg-[#1e130c] border-2 border-[#d4af37]/60 rounded-2xl shadow-[0_25px_70px_rgba(0,0,0,0.9)] p-4 sm:p-6 flex flex-col justify-between"
      >
        {/* Header bar - title & photo count & close button */}
        <div className="flex items-center justify-between border-b border-[#8c6d53]/30 pb-3">
          <div className="flex items-center gap-2">
            <span className="font-cinzel text-xs sm:text-sm text-[#d4af37] font-bold">
              Photo Album
            </span>
            {photos.length > 0 && (
              <span className="text-[10px] sm:text-xs text-[#f5ebe0]/70 font-serif bg-[#2c1e16] px-2 py-0.5 rounded-full border border-[#8c6d53]/40">
                {currentIndex + 1} / {photos.length}
              </span>
            )}
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

        {/* Clean Photo Layout - Just the photo floating in the album frame */}
        <div className="my-3 sm:my-4 flex items-center justify-center min-h-[260px] sm:min-h-[380px] relative">
          {photos.length > 1 && (
            <button
              onClick={handlePrev}
              className="absolute left-0 sm:left-2 z-30 p-2.5 sm:p-3 rounded-full bg-[#2c1e16]/90 border border-[#d4af37]/60 text-[#d4af37] active:scale-90 transition shadow-xl touch-manipulation"
              aria-label="Previous Photo"
            >
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          )}

          <div className="p-2 sm:p-3 bg-[#fdfbf7] rounded-xl shadow-2xl max-w-2xl w-full border-2 sm:border-4 border-[#4a3728]">
            <div className="relative aspect-[4/3] sm:aspect-[16/10] max-h-[55vh] overflow-hidden rounded-lg bg-[#120c08] flex items-center justify-center">
              {currentPhoto ? (
                isMediaVideo(currentPhoto) ? (
                  <video
                    key={currentPhoto.id || currentPhoto.url}
                    src={currentPhoto.url}
                    controls
                    playsInline
                    preload="auto"
                    className="w-full h-full object-contain rounded-lg"
                  />
                ) : (
                  <img
                    src={currentPhoto.url}
                    alt="Memory"
                    className="w-full h-full object-contain select-none pointer-events-none"
                    onContextMenu={(e) => e.preventDefault()}
                  />
                )
              ) : (
                <div className="w-full h-full bg-[#f5ebe0] flex items-center justify-center text-[#8c6d53] p-4 text-center">
                  No photos uploaded yet.
                </div>
              )}
            </div>
          </div>

          {photos.length > 1 && (
            <button
              onClick={handleNext}
              className="absolute right-0 sm:right-2 z-30 p-2.5 sm:p-3 rounded-full bg-[#2c1e16]/90 border border-[#d4af37]/60 text-[#d4af37] active:scale-90 transition shadow-xl touch-manipulation"
              aria-label="Next Photo"
            >
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          )}
        </div>

        {/* Action Footer */}
        <div className="flex items-center justify-end border-t border-[#8c6d53]/30 pt-3">
          <button
            onClick={handleFinish}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-[#d4af37] hover:bg-[#c3a02e] text-[#120c08] font-serif font-bold text-xs sm:text-sm shadow-lg transition-all active:scale-95 touch-manipulation"
          >
            ➡️ Close Album (Next: Bookshelf)
          </button>
        </div>
      </motion.div>
    </div>
  );
};

