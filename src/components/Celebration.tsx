import { useEffect } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Heart, Sparkles } from 'lucide-react';

interface CelebrationProps {
  onComplete: () => void;
}

const Celebration = ({ onComplete }: CelebrationProps) => {
  useEffect(() => {
    // Initial confetti burst
    const duration = 3000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 100 };

    const randomInRange = (min: number, max: number) => {
      return Math.random() * (max - min) + min;
    };

    // Multiple confetti bursts
    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        clearInterval(interval);
        return;
      }

      const particleCount = 50 * (timeLeft / duration);
      
      // Confetti from left
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        colors: ['#E91E63', '#FFC0CB', '#FFD700', '#FF69B4', '#FF1493'],
      });
      
      // Confetti from right
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        colors: ['#E91E63', '#FFC0CB', '#FFD700', '#FF69B4', '#FF1493'],
      });
    }, 250);

    // Center burst
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#E91E63', '#FFC0CB', '#FFD700'],
      zIndex: 100,
    });

    // Heart shapes using emoji
    setTimeout(() => {
      confetti({
        particleCount: 30,
        spread: 100,
        origin: { y: 0.5 },
        shapes: ['circle'],
        colors: ['#E91E63', '#FF69B4'],
        scalar: 1.5,
        zIndex: 100,
      });
    }, 500);

    // Transition to invitation after celebration
    const timeout = setTimeout(onComplete, 4000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 bg-gradient-romantic flex items-center justify-center z-40"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="text-center px-6">
        {/* Animated hearts burst */}
        <motion.div
          className="relative mb-8"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", damping: 10, delay: 0.2 }}
        >
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute left-1/2 top-1/2"
              initial={{ scale: 0, x: 0, y: 0 }}
              animate={{
                scale: [0, 1, 0.8],
                x: Math.cos((i * Math.PI * 2) / 8) * 80,
                y: Math.sin((i * Math.PI * 2) / 8) * 80,
                opacity: [0, 1, 0.6],
              }}
              transition={{
                duration: 1,
                delay: 0.5 + i * 0.1,
              }}
            >
              <Heart 
                className="w-8 h-8 text-primary -translate-x-1/2 -translate-y-1/2" 
                fill="currentColor" 
              />
            </motion.div>
          ))}
          
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 0.5, repeat: 3 }}
          >
            <Heart className="w-24 h-24 text-primary mx-auto" fill="currentColor" />
          </motion.div>
        </motion.div>

        {/* Success message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="w-8 h-8 text-gold" />
            <Sparkles className="w-8 h-8 text-gold" />
          </div>
          
          <h2 className="font-display text-4xl md:text-6xl font-bold text-burgundy mb-4">
            Yay!
          </h2>
          
          <p className="font-display text-2xl md:text-3xl text-primary mb-2">
            I knew you'd say yes!
          </p>
          
          <motion.p
            className="text-5xl"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            🎉
          </motion.p>
        </motion.div>

        {/* Loading to invitation */}
        <motion.div
          className="mt-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
        >
          <p className="text-muted-foreground text-sm">
            Preparing your special invitation...
          </p>
          <div className="flex justify-center gap-2 mt-4">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-2 h-2 rounded-full bg-primary"
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 1, delay: i * 0.2, repeat: Infinity }}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Celebration;
