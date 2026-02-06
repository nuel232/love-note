import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

interface LandingHeroProps {
  onContinue: () => void;
  showButton: boolean;
}

const LandingHero = ({ onContinue, showButton }: LandingHeroProps) => {
  return (
    <section className="section-valentine bg-gradient-hero">
      {/* Floating Hearts Background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        {Array.from({ length: 12 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              bottom: '-50px',
            }}
            animate={{
              y: [0, -window.innerHeight - 100],
              x: [0, Math.sin(i) * 50, 0],
              rotate: [0, 360],
              opacity: [0.3 + Math.random() * 0.4, 0.3 + Math.random() * 0.4, 0],
            }}
            transition={{
              duration: 6 + Math.random() * 4,
              delay: Math.random() * 5,
              repeat: Infinity,
              ease: "easeOut",
            }}
          >
            <Heart 
              className="text-primary" 
              fill="currentColor"
              size={12 + Math.random() * 16}
              style={{ opacity: 0.3 + Math.random() * 0.4 }}
            />
          </motion.div>
        ))}
      </div>

      <div className="container mx-auto px-6 text-center relative z-10">
        {/* Greeting */}
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
            <Heart className="w-16 h-16 text-primary mx-auto" fill="currentColor" />
          </motion.div>

          <h1 className="font-display text-5xl md:text-7xl font-bold text-gradient-rose mb-4">
            Hello, Beautiful
          </h1>
          
          <p className="font-body text-xl text-muted-foreground mb-12 max-w-md mx-auto">
            Bad girl from Abagana...
          </p>
        </motion.div>

        {/* Photo Placeholder */}
        <motion.div
          className="flex justify-center mb-12"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="relative">
            {/* Rotating glow ring */}
            <motion.div
              className="absolute -inset-4 rounded-full opacity-40 bg-gradient-rose"
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            />
            
            {/* Photo frame */}
            <div className="relative w-56 h-56 md:w-72 md:h-72 rounded-full border-4 border-gold-soft bg-cream shadow-lg overflow-hidden">
              {/* Add your photo: replace src with your image path */}
              {<img 
                src="/theo-1.jpg" 
                alt="My Valentine" 
                className="w-full h-full object-cover"
              />}
              
              {/* Placeholder - remove when you add photo */}
              <div className="w-full h-full flex items-center justify-center">
                <Heart className="w-20 h-20 text-primary/20" fill="currentColor" />
              </div>
            </div>

            {/* Decorative hearts around frame */}
            {[0, 1, 2, 3].map((i) => (
              <motion.div
                key={i}
                className="absolute"
                style={{
                  top: `${50 + 50 * Math.sin((i * Math.PI * 2) / 4)}%`,
                  left: `${50 + 50 * Math.cos((i * Math.PI * 2) / 4)}%`,
                  transform: 'translate(-50%, -50%)',
                }}
                animate={{ 
                  scale: [1, 1.3, 1], 
                  opacity: [0.6, 1, 0.6] 
                }}
                transition={{ 
                  duration: 2, 
                  delay: i * 0.5, 
                  repeat: Infinity 
                }}
              >
                <Heart className="w-6 h-6 text-primary" fill="currentColor" />
              </motion.div>
            ))}
          </div>
        </motion.div>

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

        {/* Continue button */}
        {showButton && (
          <motion.button
            onClick={onContinue}
            className="btn-valentine-yes pulse-glow"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 1.2 }}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="flex items-center gap-2">
              Continue
              <Heart className="w-5 h-5" fill="currentColor" />
            </span>
          </motion.button>
        )}
      </div>
    </section>
  );
};

export default LandingHero;