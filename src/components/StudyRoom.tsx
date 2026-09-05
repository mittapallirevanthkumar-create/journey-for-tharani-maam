import React from 'react';
import { motion } from 'framer-motion';
import type { StepId, PhotoItem } from '../types';
import { Sparkles, Book, Image as ImageIcon, Gift, Lightbulb, Sun, Clock, CloudRain } from 'lucide-react';
import { audioEngine } from '../services/audioEngine';
import { isMediaVideo } from '../services/photoStore';

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
      className={`relative min-h-[100dvh] w-full overflow-y-auto pb-24 transition-all duration-1000 ${
        isLampOn ? 'room-lamp-on' : 'room-lamp-off'
      }`}
    >
      {/* Background Room Walls & Texture */}
      <div className="absolute inset-0 bg-[#120c08] bg-[radial-gradient(ellipse_at_top,rgba(40,25,16,0.8)_0%,rgba(10,6,4,0.95)_100%)] pointer-events-none" />

      {/* Wooden Floor Perspective Line */}
      <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-[#1a110a] to-[#2c1e16] border-t-2 border-[#4a3728]/50 shadow-[inset_0_20px_50px_rgba(0,0,0,0.8)] pointer-events-none" />

      {/* Container Layout */}
      <div className="relative z-20 container mx-auto max-w-5xl px-3 sm:px-6 pt-4 sm:pt-8 flex flex-col justify-between min-h-[100dvh]">
        
        {/* Header Title */}
        <div className="text-center mb-4 sm:mb-6">
          <span className="font-cinzel text-[10px] sm:text-xs text-[#d4af37] tracking-widest uppercase bg-[#2c1e16]/80 px-3 py-1 rounded-full border border-[#8c6d53]/40 shadow-sm inline-flex items-center gap-1.5">
            <Sparkles className="w-3 h-3 text-[#d4af37]" />
            Tharani Ma'am • Cozy Memory Sanctuary
          </span>
        </div>

        {/* --- MOBILE RESPONSIVE ADAPTIVE ROOM (Visible on phone screens <768px) --- */}
        <div className="md:hidden flex flex-col gap-4 my-auto">
          
          {/* Mobile Top Row: Bookshelf & Rainy Window */}
          <div className="grid grid-cols-2 gap-3">
            {/* Bookshelf */}
            <motion.div
              whileTap={{ scale: 0.96 }}
              onClick={() => {
                if (currentStep >= 5) {
                  audioEngine.playClick();
                  onOpenBookshelf();
                }
              }}
              className={`relative cursor-pointer p-3.5 rounded-2xl border-2 bg-gradient-to-b from-[#2c1e16] to-[#1a110a] shadow-xl flex flex-col justify-between min-h-[120px] transition-all touch-manipulation ${
                currentStep === 5
                  ? 'border-[#d4af37] ring-4 ring-[#d4af37]/40 shadow-[0_0_30px_rgba(212,175,55,0.6)] bg-[#3a271a]'
                  : 'border-[#4a3728] opacity-85 active:opacity-100'
              }`}
            >
              <div className="flex items-center justify-between">
                <Book className="w-6 h-6 text-[#d4af37]" />
                <span className="text-[10px] font-cinzel text-[#d4af37] uppercase tracking-wider font-bold">Books</span>
              </div>
              <div>
                <h4 className="font-cinzel text-sm font-bold text-[#fdfbf7]">Bookshelf</h4>
                <p className="font-serif text-[11px] text-[#f5ebe0]/70">3 Special Volumes</p>
              </div>
              {currentStep === 5 && (
                <div className="mt-1">
                  <span className="inline-block w-full py-1 text-center rounded-full bg-[#d4af37] text-[#120c08] font-serif text-[10px] font-bold animate-bounce shadow">
                    ➡️ Click Bookshelf
                  </span>
                </div>
              )}
            </motion.div>

            {/* Rainy Window */}
            <motion.div
              whileTap={{ scale: 0.96 }}
              onClick={() => {
                if (currentStep >= 6) {
                  audioEngine.playClick();
                  onOpenWindow();
                }
              }}
              className={`relative cursor-pointer p-3.5 rounded-2xl border-2 bg-[#0a121d] shadow-xl flex flex-col justify-between min-h-[120px] transition-all touch-manipulation ${
                currentStep === 6
                  ? 'border-[#d4af37] ring-4 ring-[#d4af37]/40 shadow-[0_0_30px_rgba(212,175,55,0.6)]'
                  : 'border-[#4a3728] opacity-85 active:opacity-100'
              }`}
            >
              <div className="flex items-center justify-between">
                <CloudRain className="w-6 h-6 text-blue-300" />
                <span className="text-[10px] font-serif text-blue-200 uppercase tracking-wider">Window</span>
              </div>
              <div>
                <h4 className="font-cinzel text-sm font-bold text-[#fdfbf7]">Rainy Window</h4>
                <p className="font-serif text-[11px] text-blue-200/80">Cozy Ambience</p>
              </div>
              {currentStep === 6 && (
                <div className="mt-1">
                  <span className="inline-block w-full py-1 text-center rounded-full bg-[#d4af37] text-[#120c08] font-serif text-[10px] font-bold animate-bounce shadow">
                    ➡️ Click Window
                  </span>
                </div>
              )}
            </motion.div>
          </div>

          {/* Mobile Hanging Photo Frame */}
          <motion.div
            whileTap={{ scale: 0.96 }}
            onClick={() => {
              audioEngine.playClick();
              onOpenFrame();
            }}
            className={`relative cursor-pointer p-3 rounded-2xl border-2 bg-[#2c1e16] shadow-xl flex items-center gap-3 transition-all touch-manipulation ${
              currentStep === 8
                ? 'border-[#d4af37] ring-4 ring-[#d4af37]/40 shadow-[0_0_30px_rgba(212,175,55,0.6)]'
                : 'border-[#4a3728] opacity-90'
            }`}
          >
            <div className="w-20 h-20 rounded-xl bg-[#120c08] border-2 border-[#d4af37]/50 overflow-hidden shrink-0 flex items-center justify-center">
              {previewPhoto ? (
                isMediaVideo(previewPhoto) ? (
                  <video src={previewPhoto.url} muted playsInline autoPlay loop className="w-full h-full object-cover rounded pointer-events-none" />
                ) : (
                  <img src={previewPhoto.url} alt="Frame" className="w-full h-full object-cover rounded pointer-events-none" />
                )
              ) : (
                <ImageIcon className="w-8 h-8 text-[#d4af37]" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <span className="font-cinzel text-sm font-bold text-[#fdfbf7] truncate">Hanging Frame</span>
                <Clock className="w-4 h-4 text-[#d4af37] shrink-0" />
              </div>
              <p className="font-serif text-xs text-[#f5ebe0]/80 mt-0.5">Explore 18 Memories & Videos</p>
              {currentStep === 8 && (
                <span className="inline-block mt-2 px-3 py-0.5 rounded-full bg-[#d4af37] text-[#120c08] font-serif text-[11px] font-bold animate-bounce">
                  ➡️ Tap Photo Frame
                </span>
              )}
            </div>
          </motion.div>

          {/* Mobile Study Table Block: Diary & Photo Album */}
          <div className="p-4 rounded-3xl border-2 border-[#4a3728] bg-gradient-to-b from-[#2c1e16] to-[#120c08] shadow-2xl flex flex-col gap-3">
            <span className="text-[10px] font-cinzel text-[#8c6d53] tracking-widest uppercase border-b border-[#8c6d53]/30 pb-1">
              Study Table Items
            </span>

            <div className="grid grid-cols-2 gap-3">
              {/* Vintage Diary */}
              <motion.div
                whileTap={{ scale: 0.96 }}
                onClick={() => {
                  if (currentStep >= 2) {
                    audioEngine.playClick();
                    onOpenDiary();
                  }
                }}
                className={`relative cursor-pointer p-3.5 rounded-2xl border-2 bg-gradient-to-tr from-[#3a271a] to-[#2c1e16] shadow-lg flex flex-col justify-between min-h-[110px] transition-all touch-manipulation ${
                  currentStep === 2 || currentStep === 3
                    ? 'border-[#d4af37] ring-4 ring-[#d4af37]/40 shadow-[0_0_25px_rgba(212,175,55,0.6)]'
                    : 'border-[#4a3728] opacity-85'
                }`}
              >
                <div className="flex items-center justify-between">
                  <Sparkles className="w-5 h-5 text-[#d4af37]" />
                  <span className="font-serif text-[10px] text-[#d4af37]">Diary</span>
                </div>
                <div>
                  <h4 className="font-cinzel text-xs font-bold text-[#fdfbf7]">Vintage Diary</h4>
                  <p className="font-handwritten text-xs text-[#d4af37]">Notes for Ma'am</p>
                </div>
                {(currentStep === 2 || currentStep === 3) && (
                  <span className="w-full text-center py-0.5 rounded-full bg-[#d4af37] text-[#120c08] font-serif text-[10px] font-bold animate-bounce">
                    ➡️ Open Diary
                  </span>
                )}
              </motion.div>

              {/* Photo Album */}
              <motion.div
                whileTap={{ scale: 0.96 }}
                onClick={() => {
                  if (currentStep >= 4) {
                    audioEngine.playClick();
                    onOpenAlbum();
                  }
                }}
                className={`relative cursor-pointer p-3.5 rounded-2xl border-2 bg-gradient-to-br from-[#4a3728] to-[#1e130c] shadow-lg flex flex-col justify-between min-h-[110px] transition-all touch-manipulation ${
                  currentStep === 4
                    ? 'border-[#d4af37] ring-4 ring-[#d4af37]/40 shadow-[0_0_25px_rgba(212,175,55,0.6)]'
                    : 'border-[#4a3728] opacity-85'
                }`}
              >
                <div className="flex items-center justify-between">
                  <ImageIcon className="w-5 h-5 text-[#d4af37]" />
                  <span className="font-serif text-[10px] text-[#d4af37]">Album</span>
                </div>
                <div>
                  <h4 className="font-cinzel text-xs font-bold text-[#fdfbf7]">Photo Album</h4>
                  <p className="font-serif text-[10px] text-[#f5ebe0]/80">Photos & Videos</p>
                </div>
                {currentStep === 4 && (
                  <span className="w-full text-center py-0.5 rounded-full bg-[#d4af37] text-[#120c08] font-serif text-[10px] font-bold animate-bounce">
                    ➡️ Open Album
                  </span>
                )}
              </motion.div>
            </div>

            {/* Mobile Bottom Row: Lamp & Gift Box */}
            <div className="grid grid-cols-2 gap-3 pt-1">
              {/* Table Lamp */}
              <motion.div
                whileTap={{ scale: 0.96 }}
                onClick={() => {
                  if (currentStep >= 7) {
                    audioEngine.playClick();
                    onOpenLamp();
                  }
                }}
                className={`relative cursor-pointer p-3 rounded-2xl border-2 flex items-center justify-center gap-2 transition-all touch-manipulation ${
                  isLampOn
                    ? 'bg-[#ffe082]/30 border-[#ffd54f] shadow-[0_0_30px_rgba(255,215,120,0.8)]'
                    : currentStep === 7
                    ? 'border-[#d4af37] ring-4 ring-[#d4af37]/40 bg-[#2c1e16]'
                    : 'border-[#8c6d53] bg-[#2c1e16]'
                }`}
              >
                {isLampOn ? (
                  <Sun className="w-6 h-6 text-[#ffd54f] animate-spin" style={{ animationDuration: '12s' }} />
                ) : (
                  <Lightbulb className="w-6 h-6 text-[#d4af37]" />
                )}
                <span className="font-serif text-xs text-[#fdfbf7]">
                  {isLampOn ? 'Lamp On' : 'Turn Lamp'}
                </span>
              </motion.div>

              {/* Gift Box */}
              <motion.div
                whileTap={{ scale: 0.96 }}
                onClick={() => {
                  if (currentStep >= 9) {
                    audioEngine.playClick();
                    onOpenGift();
                  }
                }}
                className={`relative cursor-pointer p-3 rounded-2xl border-2 bg-gradient-to-br from-[#4a3728] to-[#2c1e16] flex items-center justify-center gap-2 shadow-lg transition-all touch-manipulation ${
                  currentStep === 9
                    ? 'border-[#d4af37] ring-4 ring-[#d4af37]/40 shadow-[0_0_25px_rgba(212,175,55,0.6)]'
                    : 'border-[#8c6d53] opacity-85'
                }`}
              >
                <Gift className="w-6 h-6 text-[#d4af37]" />
                <span className="font-serif text-xs font-bold text-[#d4af37]">Gift Box</span>
              </motion.div>
            </div>
          </div>
        </div>

        {/* --- DESKTOP ROOM LAYOUT (Visible on md: screens and larger) --- */}
        <div className="hidden md:flex flex-col justify-between my-auto">
          
          {/* Top Wall Section: Bookshelf, Window, Hanging Photo Frame, Clock */}
          <div className="grid grid-cols-12 gap-6 items-start pt-4">
            
            {/* Bookshelf */}
            <div className="col-span-3 flex flex-col items-center">
              <motion.div
                whileHover={{ scale: 1.04 }}
                onClick={() => {
                  if (currentStep >= 5) {
                    audioEngine.playClick();
                    onOpenBookshelf();
                  }
                }}
                className={`relative cursor-pointer w-full max-w-[220px] p-5 rounded-2xl border-2 bg-gradient-to-b from-[#2c1e16] to-[#1a110a] shadow-2xl transition-all duration-500 ${
                  currentStep === 5
                    ? 'border-[#d4af37] glow-interactive ring-4 ring-[#d4af37]/30'
                    : 'border-[#4a3728] opacity-85 hover:opacity-100'
                }`}
              >
                <div className="flex items-center justify-between border-b border-[#8c6d53]/30 pb-2 mb-3">
                  <span className="font-cinzel text-xs text-[#d4af37] font-semibold">Bookshelf</span>
                  <Book className="w-5 h-5 text-[#d4af37]" />
                </div>

                <div className="space-y-3">
                  <div className="h-12 bg-[#3a271a] rounded-lg flex items-center justify-around px-2 border-b border-[#8c6d53]/40">
                    <div className="w-3.5 h-9 bg-[#8b263e] rounded-xs" />
                    <div className="w-4 h-8 bg-[#1e4620] rounded-xs" />
                    <div className="w-4 h-9 bg-[#1c3144] rounded-xs" />
                    <div className="w-3.5 h-8 bg-[#d4af37]/70 rounded-xs" />
                  </div>
                  <div className="h-12 bg-[#3a271a] rounded-lg flex items-center justify-around px-2 border-b border-[#8c6d53]/40">
                    <div className="w-4 h-9 bg-[#4a3728] rounded-xs" />
                    <div className="w-3.5 h-8 bg-[#8b263e] rounded-xs" />
                    <div className="w-4 h-9 bg-[#1c3144] rounded-xs" />
                  </div>
                </div>

                {currentStep === 5 && (
                  <div className="mt-3 text-center">
                    <span className="inline-block px-3 py-1 rounded-full bg-[#d4af37] text-[#120c08] font-serif text-xs font-bold animate-bounce shadow">
                      ➡️ Click Bookshelf
                    </span>
                  </div>
                )}
              </motion.div>
            </div>

            {/* Center Window */}
            <div className="col-span-6 flex flex-col items-center">
              <motion.div
                whileHover={{ scale: 1.02 }}
                onClick={() => {
                  if (currentStep >= 6) {
                    audioEngine.playClick();
                    onOpenWindow();
                  }
                }}
                className={`relative cursor-pointer w-64 h-56 rounded-t-full border-4 bg-[#0a121d] shadow-2xl overflow-hidden transition-all duration-500 flex flex-col items-center justify-center ${
                  currentStep === 6
                    ? 'border-[#d4af37] glow-interactive ring-4 ring-[#d4af37]/30'
                    : 'border-[#4a3728] opacity-80 hover:opacity-100'
                }`}
              >
                <div className="absolute inset-0 grid grid-cols-2 grid-rows-2 border-t border-[#8c6d53]/40 pointer-events-none">
                  <div className="border-r border-b border-[#8c6d53]/40" />
                  <div className="border-b border-[#8c6d53]/40" />
                  <div className="border-r border-[#8c6d53]/40" />
                  <div className="" />
                </div>

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

            {/* Photo Frame & Clock */}
            <div className="col-span-3 flex flex-col items-center gap-4">
              <div className="w-12 h-12 rounded-full border-2 border-[#8c6d53] bg-[#2c1e16] flex items-center justify-center shadow-md">
                <Clock className="w-6 h-6 text-[#d4af37]" />
              </div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                onClick={() => {
                  audioEngine.playClick();
                  onOpenFrame();
                }}
                className={`relative cursor-pointer w-36 h-44 p-2 rounded-xl border-4 bg-[#fdfbf7] shadow-xl transition-all duration-500 ${
                  currentStep === 8
                    ? 'border-[#d4af37] glow-interactive ring-4 ring-[#d4af37]/30'
                    : 'border-[#4a3728] opacity-80 hover:opacity-100'
                }`}
              >
                <div className="w-full h-full bg-[#2c1e16] rounded border border-[#d4c3a3] overflow-hidden flex flex-col items-center justify-center text-center relative">
                  {previewPhoto ? (
                    isMediaVideo(previewPhoto) ? (
                      <video src={previewPhoto.url} muted playsInline autoPlay loop className="w-full h-full object-cover rounded pointer-events-none" />
                    ) : (
                      <img src={previewPhoto.url} alt="Frame" className="w-full h-full object-cover rounded pointer-events-none" />
                    )
                  ) : (
                    <>
                      <ImageIcon className="w-8 h-8 text-[#d4af37] mb-1" />
                      <span className="font-serif text-xs text-[#f5ebe0]">Frame</span>
                    </>
                  )}
                </div>

                {currentStep === 8 && (
                  <div className="absolute -bottom-3 left-0 right-0 text-center">
                    <span className="inline-block px-2.5 py-0.5 rounded-full bg-[#d4af37] text-[#120c08] font-serif text-[11px] font-bold animate-bounce shadow">
                      ➡️ Frame
                    </span>
                  </div>
                )}
              </motion.div>
            </div>
          </div>

          {/* Desktop Study Table */}
          <div className="mt-12 flex justify-center">
            <div className="relative w-full max-w-4xl p-8 rounded-3xl border-t-8 border-[#4a3728] bg-gradient-to-b from-[#2c1e16] via-[#1e130c] to-[#120c08] shadow-[0_20px_60px_rgba(0,0,0,0.9)] grid grid-cols-12 gap-6 items-center">
              
              <div className="absolute top-2 left-6 text-xs font-cinzel text-[#8c6d53] tracking-widest uppercase">
                Study Table • Memory Sanctuary
              </div>

              {/* Diary */}
              <div className="col-span-4 flex flex-col items-center">
                <motion.div
                  whileHover={{ scale: 1.06 }}
                  onClick={() => {
                    if (currentStep >= 2) {
                      audioEngine.playClick();
                      onOpenDiary();
                    }
                  }}
                  className={`relative cursor-pointer w-36 h-44 p-4 rounded-xl border-2 bg-gradient-to-tr from-[#3a271a] to-[#2c1e16] shadow-xl flex flex-col justify-between transition-all duration-500 ${
                    currentStep === 2 || currentStep === 3
                      ? 'border-[#d4af37] glow-interactive ring-4 ring-[#d4af37]/40'
                      : 'border-[#4a3728] opacity-80 hover:opacity-100'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <Sparkles className="w-5 h-5 text-[#d4af37]" />
                    <span className="font-serif text-xs text-[#d4af37]">Diary</span>
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
                      <span className="inline-block px-3 py-0.5 rounded-full bg-[#d4af37] text-[#120c08] font-serif text-[11px] font-bold animate-bounce shadow">
                        ➡️ Click Diary
                      </span>
                    </div>
                  )}
                </motion.div>
              </div>

              {/* Photo Album */}
              <div className="col-span-4 flex flex-col items-center">
                <motion.div
                  whileHover={{ scale: 1.06 }}
                  onClick={() => {
                    if (currentStep >= 4) {
                      audioEngine.playClick();
                      onOpenAlbum();
                    }
                  }}
                  className={`relative cursor-pointer w-40 h-40 p-4 rounded-2xl border-2 bg-gradient-to-br from-[#4a3728] to-[#1e130c] shadow-xl flex flex-col justify-between transition-all duration-500 ${
                    currentStep === 4
                      ? 'border-[#d4af37] glow-interactive ring-4 ring-[#d4af37]/40'
                      : 'border-[#4a3728] opacity-80 hover:opacity-100'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <ImageIcon className="w-6 h-6 text-[#d4af37]" />
                    <span className="font-serif text-xs text-[#d4af37]">Album</span>
                  </div>

                  <div className="text-center">
                    <span className="font-cinzel text-sm text-[#fdfbf7] font-bold block">
                      Photo Album
                    </span>
                    <span className="font-handwritten text-xs text-[#f5ebe0]/80">Memories</span>
                  </div>

                  <div className="h-1 bg-[#d4af37]/40 rounded" />

                  {currentStep === 4 && (
                    <div className="absolute -bottom-3 left-0 right-0 text-center">
                      <span className="inline-block px-3 py-0.5 rounded-full bg-[#d4af37] text-[#120c08] font-serif text-[11px] font-bold animate-bounce shadow">
                        ➡️ Click Album
                      </span>
                    </div>
                  )}
                </motion.div>
              </div>

              {/* Lamp & Gift Box */}
              <div className="col-span-4 flex flex-col items-center gap-5">
                <motion.div
                  whileHover={{ scale: 1.08 }}
                  onClick={() => {
                    if (currentStep >= 7) {
                      audioEngine.playClick();
                      onOpenLamp();
                    }
                  }}
                  className={`relative cursor-pointer p-4 rounded-full border-2 transition-all duration-500 ${
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
                      <span className="inline-block px-3 py-0.5 rounded-full bg-[#d4af37] text-[#120c08] font-serif text-[11px] font-bold animate-bounce shadow">
                        ➡️ Turn Lamp On
                      </span>
                    </div>
                  )}
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.08 }}
                  onClick={() => {
                    if (currentStep >= 9) {
                      audioEngine.playClick();
                      onOpenGift();
                    }
                  }}
                  className={`relative cursor-pointer p-4 rounded-2xl border-2 bg-gradient-to-br from-[#4a3728] to-[#2c1e16] shadow-xl transition-all duration-500 ${
                    currentStep === 9
                      ? 'border-[#d4af37] glow-interactive ring-4 ring-[#d4af37]/40'
                      : 'border-[#8c6d53] opacity-80 hover:opacity-100'
                  }`}
                >
                  <Gift className="w-8 h-8 text-[#d4af37]" />

                  {currentStep === 9 && (
                    <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap">
                      <span className="inline-block px-3 py-0.5 rounded-full bg-[#d4af37] text-[#120c08] font-serif text-[11px] font-bold animate-bounce shadow">
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
    </div>
  );
};

