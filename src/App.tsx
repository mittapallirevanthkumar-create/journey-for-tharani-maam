import { useState, useEffect } from 'react';
import type { StepId, PhotoItem } from './types';
import { photoStore } from './services/photoStore';
import { audioEngine } from './services/audioEngine';
import { CanvasAtmosphere } from './components/CanvasAtmosphere';
import { StepGuide } from './components/StepGuide';
import { StudyRoom } from './components/StudyRoom';

import { Step1Welcome } from './components/steps/Step1Welcome';
import { Step2DoorOpen } from './components/steps/Step2DoorOpen';
import { Step3Diary } from './components/steps/Step3Diary';
import { Step4PhotoAlbum } from './components/steps/Step4PhotoAlbum';
import { Step5Bookshelf } from './components/steps/Step5Bookshelf';
import { Step6Window } from './components/steps/Step6Window';
import { Step7Lamp } from './components/steps/Step7Lamp';
import { Step8PhotoFrame } from './components/steps/Step8PhotoFrame';
import { Step9GiftBox } from './components/steps/Step9GiftBox';

import { AdminModal } from './components/AdminModal';

export function App() {
  const [currentStep, setCurrentStep] = useState<StepId>(1);
  const [isLampOn, setIsLampOn] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  // Photos
  const [photos, setPhotos] = useState<PhotoItem[]>([]);

  // Admin Auth State
  const [isAdmin, setIsAdmin] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);

  // Modals
  const [showDiary, setShowDiary] = useState(false);
  const [showAlbum, setShowAlbum] = useState(false);
  const [showBookshelf, setShowBookshelf] = useState(false);
  const [showWindow, setShowWindow] = useState(false);
  const [showLamp, setShowLamp] = useState(false);
  const [showFrame, setShowFrame] = useState(false);
  const [showGift, setShowGift] = useState(false);

  useEffect(() => {
    // Load photos from IndexedDB
    photoStore.getPhotos().then((loadedPhotos) => {
      setPhotos(loadedPhotos);
    });

    // Keyboard shortcut for quick admin toggle (Ctrl + Shift + A)
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'a') {
        setShowAdmin(prev => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleToggleMute = () => {
    const muted = audioEngine.toggleMute();
    setIsMuted(muted);
  };

  const handleAdminLogin = (password: string): boolean => {
    if (password === 'admin123' || password === 'tharani') {
      setIsAdmin(true);
      return true;
    }
    return false;
  };

  // Step Transitions
  const handleStep1DoorClick = () => {
    setCurrentStep(2);
  };

  const handleDoorTransitionComplete = () => {
    // Step 2 intro finishes, unlock Step 3 (Diary)
    setCurrentStep(3);
    setShowDiary(true);
  };

  const handleCompleteStep3 = () => {
    setCurrentStep(4);
    setShowAlbum(true);
  };

  const handleCompleteStep4 = () => {
    setCurrentStep(5);
    setShowBookshelf(true);
  };

  const handleCompleteStep5 = () => {
    setCurrentStep(6);
    setShowWindow(true);
  };

  const handleCompleteStep6 = () => {
    setCurrentStep(7);
    setShowLamp(true);
  };

  const handleCompleteStep7 = () => {
    setIsLampOn(true);
    setCurrentStep(9);
    setShowGift(true);
  };

  const handleCompleteStep8 = () => {
    setCurrentStep(9);
    setShowGift(true);
  };

  const handleRestartJourney = () => {
    setCurrentStep(1);
    setIsLampOn(false);
    setShowDiary(false);
    setShowAlbum(false);
    setShowBookshelf(false);
    setShowWindow(false);
    setShowLamp(false);
    setShowFrame(false);
    setShowGift(false);
    audioEngine.stopRainSound();
  };

  return (
    <div className="min-h-screen w-full bg-[#120c08] text-[#fdfbf7] font-sans relative overflow-x-hidden">
      {/* Background Canvas Particles (Dust, Rain, Rose Petals) */}
      <CanvasAtmosphere currentStep={currentStep} isLampOn={isLampOn} />

      {/* Step 1 Screen */}
      {currentStep === 1 ? (
        <Step1Welcome onDoorClick={handleStep1DoorClick} />
      ) : (
        /* Study Room Interactive Environment */
        <StudyRoom
          currentStep={currentStep}
          isLampOn={isLampOn}
          photos={photos}
          onOpenDiary={() => setShowDiary(true)}
          onOpenAlbum={() => setShowAlbum(true)}
          onOpenBookshelf={() => setShowBookshelf(true)}
          onOpenWindow={() => setShowWindow(true)}
          onOpenLamp={() => setShowLamp(true)}
          onOpenFrame={() => setShowFrame(true)}
          onOpenGift={() => setShowGift(true)}
        />
      )}

      {/* Step 2 Door Transition Overlay */}
      {currentStep === 2 && (
        <Step2DoorOpen onCompleteDoorTransition={handleDoorTransitionComplete} />
      )}

      {/* Step 3 Vintage Diary Modal */}
      <Step3Diary
        isOpen={showDiary}
        onClose={() => setShowDiary(false)}
        onCompleteStep3={handleCompleteStep3}
      />

      {/* Step 4 Photo Album Modal */}
      <Step4PhotoAlbum
        isOpen={showAlbum}
        onClose={() => setShowAlbum(false)}
        photos={photos}
        onCompleteStep4={handleCompleteStep4}
      />

      {/* Step 5 Bookshelf Modal */}
      <Step5Bookshelf
        isOpen={showBookshelf}
        onClose={() => setShowBookshelf(false)}
        onCompleteStep5={handleCompleteStep5}
      />

      {/* Step 6 Window Modal */}
      <Step6Window
        isOpen={showWindow}
        onClose={() => {
          setShowWindow(false);
          audioEngine.stopRainSound();
        }}
        onCompleteStep6={handleCompleteStep6}
      />

      {/* Step 7 Table Lamp Modal */}
      <Step7Lamp
        isOpen={showLamp}
        onClose={() => setShowLamp(false)}
        onCompleteStep7={handleCompleteStep7}
      />

      {/* Step 8 Wall Photo Frame Lightbox */}
      <Step8PhotoFrame
        isOpen={showFrame}
        onClose={() => setShowFrame(false)}
        photos={photos}
        onCompleteStep8={handleCompleteStep8}
      />

      {/* Step 9 Gift Box & Final Handwritten Letter */}
      <Step9GiftBox
        isOpen={showGift}
        onClose={() => setShowGift(false)}
        onRestartJourney={handleRestartJourney}
      />

      {/* Admin Photo Manager Modal */}
      <AdminModal
        isOpen={showAdmin}
        onClose={() => setShowAdmin(false)}
        photos={photos}
        onPhotosUpdated={setPhotos}
        isAuthenticated={isAdmin}
        onLogin={handleAdminLogin}
      />

      {/* Guided Step Bottom Navbar */}
      <StepGuide
        currentStep={currentStep}
        isMuted={isMuted}
        onToggleMute={handleToggleMute}
        onOpenAdmin={() => setShowAdmin(true)}
        isAdmin={isAdmin}
      />
    </div>
  );
}

export default App;
