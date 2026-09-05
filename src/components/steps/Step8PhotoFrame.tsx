import React, { useState } from 'react';
import { motion } from 'framer-motion';
import type { PhotoItem } from '../../types';
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut, ChevronRight as ArrowIcon } from 'lucide-react';
import { audioEngine } from '../../services/audioEngine';
import { isMediaVideo } from '../../services/photoStore';

interface Step8PhotoFrameProps {
  isOpen: boolean;
  onClose: () => void;
  photos: PhotoItem[];
  onCompleteStep8: () => void;
}

export const Step8PhotoFrame: React.FC<Step8PhotoFrameProps> = ({
  isOpen,
  onClose,
  photos,
  onCompleteStep8
}) => {
  const [index, setIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  if (!isOpen) return null;

  const currentPhoto = photos && photos.length > 0 ? photos[index % photos.length] || photos[0] : null;

  const handleNext = () => {
    if (!photos || photos.length === 0) return;
    audioEngine.playClick();
    setIndex((prev) => (prev + 1) % photos.length);
  };

  const handlePrev = () => {
    if (!photos || photos.length === 0) return;
    audioEngine.playClick();
    setIndex((prev) => (prev - 1 + photos.length) % photos.length);
  };

  const handleFinish = () => {
    audioEngine.playClick();
    onCompleteStep8();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/90 backdrop-blur-lg">
      <motion.div
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.85, opacity: 0 }}
        className="relative w-full max-w-5xl max-h-[92vh] overflow-y-auto bg-[#120c08] border-2 border-[#d4af37]/70 rounded-3xl shadow-[0_30px_90px_rgba(0,0,0,0.95)] p-4 sm:p-8 flex flex-col justify-between"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#8c6d53]/40 pb-3 z-10">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsZoomed(!isZoomed)}
              className="px-3 py-1.5 rounded-full bg-[#2c1e16] border border-[#8c6d53]/40 text-xs text-[#f5ebe0] flex items-center gap-1.5 hover:border-[#d4af37] transition active:scale-95 touch-manipulation"
            >
              {isZoomed ? <ZoomOut className="w-4 h-4" /> : <ZoomIn className="w-4 h-4" />}
              <span>{isZoomed ? 'Reset' : 'Zoom'}</span>
            </button>
            {photos.length > 0 && (
              <span className="text-[10px] sm:text-xs text-[#d4af37] font-serif bg-[#2c1e16] px-2.5 py-1 rounded-full border border-[#8c6d53]/40">
                {index + 1} / {photos.length}
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

        {/* Pure Floating Photo / Video Display */}
        <div className="my-3 sm:my-6 relative flex items-center justify-center min-h-[260px] sm:min-h-[420px]">
          {photos.length > 1 && (
            <button
              onClick={handlePrev}
              className="absolute left-0 sm:left-2 z-30 p-2.5 sm:p-3 rounded-full bg-[#2c1e16]/90 border border-[#d4af37]/60 text-[#d4af37] active:scale-90 transition shadow-xl touch-manipulation"
              aria-label="Previous Photo"
            >
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          )}

          <motion.div
            key={currentPhoto?.id || index}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{
              opacity: 1,
              scale: isZoomed ? 1.2 : 1
            }}
            transition={{ duration: 0.3 }}
            className="max-w-3xl w-full p-2 sm:p-3 bg-[#fdfbf7] rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] border-2 sm:border-4 border-[#4a3728] relative"
          >
            <div className="aspect-[4/3] sm:aspect-[16/10] max-h-[55vh] overflow-hidden rounded-lg bg-[#2c1e16] flex items-center justify-center">
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
                    alt="Floating Memory"
                    className="w-full h-full object-contain select-none pointer-events-none transition-transform duration-500"
                    onContextMenu={(e) => e.preventDefault()}
                  />
                )
              ) : (
                <div className="text-center p-6 text-[#8c6d53] font-serif">
                  No photos uploaded yet.
                </div>
              )}
            </div>
          </motion.div>

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

        {/* Footer */}
        <div className="flex items-center justify-end border-t border-[#8c6d53]/40 pt-3 z-10">
          <button
            onClick={handleFinish}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-[#d4af37] hover:bg-[#c3a02e] text-[#120c08] font-serif font-bold text-xs sm:text-sm shadow-lg transition-all active:scale-95 touch-manipulation"
          >
            ➡️ Click Gift Box <ArrowIcon className="w-4 h-4" />
          </button>
        </div>
      </motion.div>
    </div>
  );
};

