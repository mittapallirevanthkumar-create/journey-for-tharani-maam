import React from 'react';
import { motion } from 'framer-motion';
import type { StepId, PhotoItem } from '../types';
import { Sparkles, Book, Image as ImageIcon, Gift, Lightbulb, Sun, Clock } from 'lucide-react';
import { audioEngine } from '../services/audioEngine';

interface StudyRoomProps {
  currentStep: StepId;
  isLampOn: boolean;
  photos?: PhotoItem[];
  onOpenDiary: () => void;
  onOpenAlbum: () => void;
  onOpenBookshelf: () => void;
  onOpenWindow: () => void;
  onOpenLamp: () => void;
  onOpenFrame: () => void;
  onOpenGift: () => void;
}

export const StudyRoom: React.FC<StudyRoomProps> = ({
  currentStep,
  isLampOn,
  photos = [],
  onOpenDiary,
  onOpenAlbum,
  onOpenBookshelf,
  onOpenWindow,
  onOpenLamp,
  onOpenFrame,
  onOpenGift
}) => {
  const previewPhoto = photos && photos.length > 0 ? photos[0] : null;
  return (
    <div
      className={`relative min-h-screen w-full overflow-hidden transition-all duration-1000 ${
        isLampOn ? 'room-lamp-on' : 'room-lamp-off'
      }`}
    >
      {/* Background Room Canvas Walls & Wooden Floor Texture */}
      <div className="absolute inset-0 bg-[#120c08] bg-[radial-gradient(ellipse_at_top,rgba(40,25,16,0.8)_0%,rgba(10,6,4,0.95)_100%)] pointer-events-none" />

      {/* Wooden Floor perspective line */}
      <div className="absolute bottom-0 left-0 right-0 h-2/5 bg-gradient-to-t from-[#1a110a] to-[#2c1e16] border-t-2 border-[#4a3728]/50 shadow-[inset_0_20px_50px_rgba(0,0,0,0.8)]" />

      {/* Main Room Grid Layout */}
      <div className="relative z-20 container mx-auto min-h-screen px-4 py-8 flex flex-col justify-between">
        
        {/* Top Wall Section: Bookshelf, Window, Hanging Photo Frame, Clock */}
        <div className="grid grid-cols-12 gap-4 items-start pt-4 md:pt-8">
          
          {/* Bookshelf (Step 5 glow when step === 5) */}
          <div className="col-span-4 md:col-span-3 flex flex-col items-center">
            <motion.div
              whileHover={{ scale: 1.03 }}
              onClick={() => {
                if (currentStep >= 5) {
                  audioEngine.playClick();
                  onOpenBookshelf();
                }
              }}
              className={`relative cursor-pointer w-full max-w-[200px] p-4 rounded-xl border-2 bg-gradient-to-b from-[#2c1e16] to-[#1a110a] shadow-2xl transition-all duration-500 ${
                currentStep === 5
                  ? 'border-[#d4af37] glow-interactive ring-4 ring-[#d4af37]/30'
                  : 'border-[#4a3728] opacity-85 hover:opacity-100'
              }`}
            >
              <div className="flex items-center justify-between border-b border-[#8c6d53]/30 pb-2 mb-3">
                <span className="font-cinzel text-xs text-[#d4af37] font-semibold">Bookshelf</span>
                <Book className="w-4 h-4 text-[#d4af37]" />
              </div>

              {/* Wooden shelves representation */}
              <div className="space-y-3">
                <div className="h-10 bg-[#3a271a] rounded flex items-center justify-around px-2 border-b border-[#8c6d53]/40">
                  <div className="w-3 h-8 bg-[#8b263e] rounded-xs" />
                  <div className="w-4 h-7 bg-[#1e4620] rounded-xs" />
                  <div className="w-3.5 h-8 bg-[#1c3144] rounded-xs" />
                  <div className="w-3 h-7 bg-[#d4af37]/70 rounded-xs" />
                </div>
                <div className="h-10 bg-[#3a271a] rounded flex items-center justify-around px-2 border-b border-[#8c6d53]/40">
                  <div className="w-4 h-8 bg-[#4a3728] rounded-xs" />
                  <div className="w-3 h-7 bg-[#8b263e] rounded-xs" />
                  <div className="w-4 h-8 bg-[#1c3144] rounded-xs" />
                </div>
              </div>

              {currentStep === 5 && (
                <div className="mt-3 text-center">
                  <span className="inline-block px-2.5 py-0.5 rounded-full bg-[#d4af37] text-[#120c08] font-serif text-[10px] font-bold animate-bounce">
                    ➡️ Click Bookshelf
                  </span>
                </div>
              )}
            </motion.div>
          </div>

          {/* Center Window (Step 6 glow when step === 6) */}
          <div className="col-span-5 md:col-span-6 flex flex-col items-center">
            <motion.div
              whileHover={{ scale: 1.02 }}
              onClick={() => {
                if (currentStep >= 6) {
                  audioEngine.playClick();
                  onOpenWindow();
                }
              }}
              className={`relative cursor-pointer w-48 md:w-64 h-44 md:h-56 rounded-t-full border-4 bg-[#0a121d] shadow-2xl overflow-hidden transition-all duration-500 flex flex-col items-center justify-center ${
                currentStep === 6
                  ? 'border-[#d4af37] glow-interactive ring-4 ring-[#d4af37]/30'
                  : 'border-[#4a3728] opacity-80 hover:opacity-100'
              }`}
            >
              {/* Rain Window Grid Lines */}
              <div className="absolute inset-0 grid grid-cols-2 grid-rows-2 border-t border-[#8c6d53]/40 pointer-events-none">
                <div className="border-r border-b border-[#8c6d53]/40" />
                <div className="border-b border-[#8c6d53]/40" />
                <div className="border-r border-[#8c6d53]/40" />
                <div className="" />
              </div>

              {/* Window Light Moon Glow */}
              <div className="w-16 h-16 rounded-full bg-blue-200/20 blur-md mb-2" />

              <span className="font-serif text-xs text-blue-200 z-10 font-medium">
                {currentStep >= 6 ? 'Rainy Window' : 'Window'}
              </span>

              {currentStep === 6 && (
                <div className="mt-2 z-10">
                  <span className="inline-block px-3 py-1 rounded-full bg-[#d4af37] text-[#120c08] font-serif text-xs font-bold animate-bounce">
                    ➡️ Click Window
                  </span>
                </div>
              )}
            </motion.div>
          </div>

          {/* Wall Hanging Photo Frame (Step 8 glow when step === 8) & Clock */}
          <div className="col-span-3 md:col-span-3 flex flex-col items-center gap-4">
            {/* Clock */}
            <div className="w-12 h-12 rounded-full border-2 border-[#8c6d53] bg-[#2c1e16] flex items-center justify-center shadow-md">
              <Clock className="w-6 h-6 text-[#d4af37]" />
            </div>

            {/* Photo Frame */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              onClick={() => {
                audioEngine.playClick();
                onOpenFrame();
              }}
              className={`relative cursor-pointer w-28 md:w-36 h-36 md:h-44 p-2 rounded-lg border-4 bg-[#fdfbf7] shadow-xl transition-all duration-500 ${
                currentStep === 8
                  ? 'border-[#d4af37] glow-interactive ring-4 ring-[#d4af37]/30'
                  : 'border-[#4a3728] opacity-80 hover:opacity-100'
              }`}
            >
              <div className="w-full h-full bg-[#2c1e16] rounded border border-[#d4c3a3] overflow-hidden flex flex-col items-center justify-center text-center relative">
                {previewPhoto ? (
                  previewPhoto.mediaType === 'video' || previewPhoto.url.startsWith('data:video/') ? (
                    <video src={previewPhoto.url} className="w-full h-full object-cover rounded pointer-events-none" />
                  ) : (
                    <img src={previewPhoto.url} alt="Frame" className="w-full h-full object-cover rounded pointer-events-none" />
                  )
                ) : (
                  <>
                    <ImageIcon className="w-8 h-8 text-[#d4af37] mb-1" />
                    <span className="font-serif text-[10px] text-[#f5ebe0]">Frame</span>
                  </>
                )}
              </div>

              {currentStep === 8 && (
                <div className="absolute -bottom-3 left-0 right-0 text-center">
                  <span className="inline-block px-2 py-0.5 rounded-full bg-[#d4af37] text-[#120c08] font-serif text-[10px] font-bold animate-bounce shadow">
                    ➡️ Frame
                  </span>
                </div>
              )}
            </motion.div>
          </div>
        </div>

        {/* Center Study Table Section */}
        <div className="my-auto pb-12 flex justify-center">
          <div className="relative w-full max-w-4xl p-6 md:p-8 rounded-3xl border-t-8 border-[#4a3728] bg-gradient-to-b from-[#2c1e16] via-[#1e130c] to-[#120c08] shadow-[0_20px_60px_rgba(0,0,0,0.9)] grid grid-cols-12 gap-4 items-center">
            
            {/* Table Surface Label */}
            <div className="absolute top-2 left-6 text-[10px] font-cinzel text-[#8c6d53] tracking-widest uppercase">
              Study Table • Memory Sanctuary
            </div>

            {/* Vintage Diary (Step 3 glow when step === 3) */}
            <div className="col-span-4 flex flex-col items-center">
              <motion.div
                whileHover={{ scale: 1.06 }}
                onClick={() => {
                  if (currentStep >= 2) {
                    audioEngine.playClick();
                    onOpenDiary();
                  }
                }}
                className={`relative cursor-pointer w-28 md:w-36 h-36 md:h-44 p-3 rounded-lg border-2 bg-gradient-to-tr from-[#3a271a] to-[#2c1e16] shadow-xl flex flex-col justify-between transition-all duration-500 ${
                  currentStep === 2 || currentStep === 3
                    ? 'border-[#d4af37] glow-interactive ring-4 ring-[#d4af37]/40'
                    : 'border-[#4a3728] opacity-80 hover:opacity-100'
                }`}
              >
                <div className="flex items-center justify-between">
                  <Sparkles className="w-4 h-4 text-[#d4af37]" />
                  <span className="font-serif text-[10px] text-[#d4af37]">Diary</span>
                </div>

                <div className="text-center">
                  <span className="font-cinzel text-xs text-[#fdfbf7] font-bold block">
                    Tharani Ma'am
                  </span>
                  <span className="font-handwritten text-sm text-[#d4af37]">Notes</span>
                </div>

                <div className="w-full h-1 bg-[#8c6d53]/40 rounded" />

                {(currentStep === 2 || currentStep === 3) && (
                  <div className="absolute -bottom-3 left-0 right-0 text-center">
                    <span className="inline-block px-2.5 py-0.5 rounded-full bg-[#d4af37] text-[#120c08] font-serif text-[10px] font-bold animate-bounce shadow">
                      ➡️ Click Diary
                    </span>
                  </div>
                )}
              </motion.div>
            </div>

            {/* Photo Album (Step 4 glow when step === 4) */}
            <div className="col-span-4 flex flex-col items-center">
              <motion.div
                whileHover={{ scale: 1.06 }}
                onClick={() => {
                  if (currentStep >= 4) {
                    audioEngine.playClick();
                    onOpenAlbum();
                  }
                }}
                className={`relative cursor-pointer w-32 md:w-40 h-32 md:h-40 p-3 rounded-xl border-2 bg-gradient-to-br from-[#4a3728] to-[#1e130c] shadow-xl flex flex-col justify-between transition-all duration-500 ${
                  currentStep === 4
                    ? 'border-[#d4af37] glow-interactive ring-4 ring-[#d4af37]/40'
                    : 'border-[#4a3728] opacity-80 hover:opacity-100'
                }`}
              >
                <div className="flex items-center justify-between">
                  <ImageIcon className="w-5 h-5 text-[#d4af37]" />
                  <span className="font-serif text-[10px] text-[#d4af37]">Album</span>
                </div>

                <div className="text-center">
                  <span className="font-cinzel text-xs text-[#fdfbf7] font-bold block">
                    Photo Album
                  </span>
                  <span className="font-handwritten text-xs text-[#f5ebe0]/80">Memories</span>
                </div>

                <div className="h-1 bg-[#d4af37]/40 rounded" />

                {currentStep === 4 && (
                  <div className="absolute -bottom-3 left-0 right-0 text-center">
                    <span className="inline-block px-2.5 py-0.5 rounded-full bg-[#d4af37] text-[#120c08] font-serif text-[10px] font-bold animate-bounce shadow">
                      ➡️ Click Album
                    </span>
                  </div>
                )}
              </motion.div>
            </div>

            {/* Table Lamp & Coffee Mug & Gift Box (Step 7 lamp, Step 9 gift) */}
            <div className="col-span-4 flex flex-col items-center gap-4">
              {/* Lamp (Step 7) */}
              <motion.div
                whileHover={{ scale: 1.08 }}
                onClick={() => {
                  if (currentStep >= 7) {
                    audioEngine.playClick();
                    onOpenLamp();
                  }
                }}
                className={`relative cursor-pointer p-3 rounded-full border-2 transition-all duration-500 ${
                  isLampOn
                    ? 'bg-[#ffe082]/30 border-[#ffd54f] shadow-[0_0_40px_rgba(255,215,120,0.8)]'
                    : currentStep === 7
                    ? 'border-[#d4af37] glow-interactive bg-[#2c1e16]'
                    : 'border-[#8c6d53] bg-[#2c1e16]'
                }`}
              >
                {isLampOn ? (
                  <Sun className="w-8 h-8 text-[#ffd54f] animate-spin" style={{ animationDuration: '12s' }} />
                ) : (
                  <Lightbulb className="w-8 h-8 text-[#d4af37]" />
                )}

                {currentStep === 7 && !isLampOn && (
                  <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap">
                    <span className="inline-block px-2.5 py-0.5 rounded-full bg-[#d4af37] text-[#120c08] font-serif text-[10px] font-bold animate-bounce shadow">
                      ➡️ Turn Lamp On
                    </span>
                  </div>
                )}
              </motion.div>

              {/* Wooden Gift Box (Step 9) */}
              <motion.div
                whileHover={{ scale: 1.08 }}
                onClick={() => {
                  if (currentStep >= 9) {
                    audioEngine.playClick();
                    onOpenGift();
                  }
                }}
                className={`relative cursor-pointer p-3 rounded-2xl border-2 bg-gradient-to-br from-[#4a3728] to-[#2c1e16] shadow-xl transition-all duration-500 ${
                  currentStep === 9
                    ? 'border-[#d4af37] glow-interactive ring-4 ring-[#d4af37]/40'
                    : 'border-[#8c6d53] opacity-80 hover:opacity-100'
                }`}
              >
                <Gift className="w-8 h-8 text-[#d4af37]" />

                {currentStep === 9 && (
                  <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap">
                    <span className="inline-block px-2.5 py-0.5 rounded-full bg-[#d4af37] text-[#120c08] font-serif text-[10px] font-bold animate-bounce shadow">
                      ➡️ Click Gift Box
                    </span>
                  </div>
                )}
              </motion.div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
