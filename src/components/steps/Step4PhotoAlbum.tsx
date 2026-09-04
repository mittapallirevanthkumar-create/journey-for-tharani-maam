import React, { useState } from 'react';
import { motion } from 'framer-motion';
import type { PhotoItem } from '../../types';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { audioEngine } from '../../services/audioEngine';

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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <motion.div
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.85, opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="relative w-full max-w-4xl bg-[#1e130c] border-2 border-[#d4af37]/60 rounded-2xl shadow-[0_25px_70px_rgba(0,0,0,0.9)] p-6 md:p-8 flex flex-col justify-between overflow-hidden"
      >
        {/* Header bar - only close button */}
        <div className="flex items-center justify-end pb-2">
          <button
            onClick={() => {
              audioEngine.playClick();
              onClose();
            }}
            className="p-2 rounded-full hover:bg-[#4a3728]/50 text-[#f5ebe0] transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Clean Photo Layout - Just the photo floating in the album frame */}
        <div className="my-4 flex items-center justify-center min-h-[350px] md:min-h-[420px] relative">
          {photos.length > 1 && (
            <button
              onClick={handlePrev}
              className="absolute left-2 z-20 p-3 rounded-full bg-[#2c1e16]/80 border border-[#d4af37]/50 text-[#d4af37] hover:bg-[#d4af37] hover:text-[#120c08] transition shadow-lg"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          )}

          <div className="p-3 bg-[#fdfbf7] rounded-xl shadow-2xl max-w-2xl w-full border-4 border-[#4a3728]">
            <div className="relative aspect-[4/3] md:aspect-[16/10] overflow-hidden rounded-lg bg-[#120c08] flex items-center justify-center">
              {currentPhoto ? (
                currentPhoto.mediaType === 'video' || currentPhoto.url.startsWith('data:video/') ? (
                  <video
                    src={currentPhoto.url}
                    controls
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
              className="absolute right-2 z-20 p-3 rounded-full bg-[#2c1e16]/80 border border-[#d4af37]/50 text-[#d4af37] hover:bg-[#d4af37] hover:text-[#120c08] transition shadow-lg"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          )}
        </div>

        {/* Action Footer */}
        <div className="flex items-center justify-end border-t border-[#8c6d53]/30 pt-4">
          <button
            onClick={handleFinish}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#d4af37] hover:bg-[#c3a02e] text-[#120c08] font-serif font-bold text-sm shadow-lg transition-all hover:scale-105"
          >
            ➡️ Close the Album (Next: Bookshelf)
          </button>
        </div>
      </motion.div>
    </div>
  );
};
