import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

interface LandingHeroProps {
  onContinue: () => void;
  showButton: boolean;
}

const LandingHero = ({ onContinue, showButton }: LandingHeroProps) => {
  return (
    <section className="section-valentine bg-gradient-hero decorative-border">
      {/* Decorative elements */}
      <div className="absolute top-10 left-10 opacity-20">
        <Heart className="w-16 h-16 text-primary" fill="currentColor" />
      </div>
      <div className="absolute bottom-20 right-10 opacity-20">
        <Heart className="w-12 h-12 text-primary" fill="currentColor" />
      </div>
      <div className="absolute top-1/4 right-1/4 opacity-10">
        <Heart className="w-24 h-24 text-primary" fill="currentColor" />
      </div>

      <div className="container mx-auto px-6 text-center relative z-10">
        {/* Main heading with fade-in */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <motion.div
            className="inline-block mb-6"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <Heart className="w-16 h-16 md:w-20 md:h-20 text-primary mx-auto" fill="currentColor" />
          </motion.div>
          
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold text-gradient-rose mb-6 leading-tight">
            Happy Valentine's Day
          </h1>
        </motion.div>

        {/* Tagline */}
        <motion.p
          className="font-body text-xl md:text-2xl text-muted-foreground mb-8 max-w-lg mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          Something special awaits you...
        </motion.p>

        {/* Decorative flourish */}
        <motion.div
          className="flex items-center justify-center gap-4 mb-12"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.9 }}
        >
          <div className="w-16 h-[1px] bg-gradient-to-r from-transparent to-gold" />
          <Heart className="w-4 h-4 text-gold" fill="currentColor" />
          <div className="w-16 h-[1px] bg-gradient-to-l from-transparent to-gold" />
        </motion.div>

        {/* Continue button with pulsing glow */}
        {showButton && (
          <motion.button
            onClick={onContinue}
            className="btn-valentine-yes pulse-glow"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="flex items-center gap-2">
              Open Your Gift
              <Heart className="w-5 h-5" fill="currentColor" />
            </span>
          </motion.button>
        )}

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: showButton ? 1 : 0, y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <div className="w-6 h-10 rounded-full border-2 border-primary/40 flex justify-center pt-2">
            <motion.div
              className="w-1.5 h-3 bg-primary/60 rounded-full"
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default LandingHero;
