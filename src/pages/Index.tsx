import { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import LoadingScreen from '@/components/LoadingScreen';
import FloatingHearts from '@/components/FloatingHearts';
import LandingHero from '@/components/LandingHero';
import ValentineQuestion from '@/components/ValentineQuestion';
import Celebration from '@/components/Celebration';
import InvitationCard from '@/components/InvitationCard';
import MusicToggle from '@/components/MusicToggle';

type Stage = 'loading' | 'hero' | 'question' | 'celebration' | 'invitation';

const Index = () => {
  const [stage, setStage] = useState<Stage>('loading');
  const [showHeroButton, setShowHeroButton] = useState(false);
  const questionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Show the continue button after a delay on hero
    if (stage === 'hero') {
      const timer = setTimeout(() => {
        setShowHeroButton(true);
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [stage]);

  const handleLoadingComplete = () => {
    setStage('hero');
  };

  const handleContinue = () => {
    setStage('question');
    // Smooth scroll to question section
    setTimeout(() => {
      questionRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleYes = () => {
    setStage('celebration');
  };

  const handleCelebrationComplete = () => {
    setStage('invitation');
  };

  return (
    <div className="min-h-screen heart-cursor overflow-x-hidden">
      {/* Loading Screen */}
      <AnimatePresence mode="wait">
        {stage === 'loading' && (
          <LoadingScreen onComplete={handleLoadingComplete} />
        )}
      </AnimatePresence>

      {/* Main Content */}
      <AnimatePresence>
        {stage !== 'loading' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            {/* Floating Hearts Background */}
            <FloatingHearts />

            {/* Music Toggle */}
            <MusicToggle />

            {/* Hero Section */}
            {(stage === 'hero' || stage === 'question') && (
              <LandingHero 
                onContinue={handleContinue} 
                showButton={showHeroButton && stage === 'hero'} 
              />
            )}

            {/* Question Section */}
            {stage === 'question' && (
              <div ref={questionRef}>
                <ValentineQuestion onYes={handleYes} />
              </div>
            )}

            {/* Celebration */}
            {stage === 'celebration' && (
              <Celebration onComplete={handleCelebrationComplete} />
            )}

            {/* Invitation Card */}
            {stage === 'invitation' && (
              <InvitationCard isConfirmed={true} />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Index;
