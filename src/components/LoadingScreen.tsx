import { motion } from 'framer-motion';

const LoadingScreen = ({ onComplete }: { onComplete: () => void }) => {
  return (
    <motion.div
      className="fixed inset-0 bg-gradient-romantic flex items-center justify-center z-50"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      onAnimationComplete={() => {
        setTimeout(onComplete, 2500);
      }}
    >
      <div className="relative flex flex-col items-center gap-6">
        {/* Rose Bloom Animation */}
        <motion.div
          className="relative"
          initial={{ scale: 0, rotate: -180, opacity: 0 }}
          animate={{ scale: 1, rotate: 0, opacity: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
        >
          {/* Outer petals */}
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-12 h-16 rounded-full bg-primary"
              style={{
                left: '50%',
                top: '50%',
                transformOrigin: 'center bottom',
              }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ 
                scale: 1, 
                opacity: 0.8,
                rotate: i * 45,
                translateX: '-50%',
                translateY: '-100%',
              }}
              transition={{ 
                duration: 0.5, 
                delay: 0.3 + i * 0.1,
                ease: "easeOut" 
              }}
            />
          ))}
          
          {/* Inner petals */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={`inner-${i}`}
              className="absolute w-8 h-12 rounded-full"
              style={{
                left: '50%',
                top: '50%',
                transformOrigin: 'center bottom',
                background: 'hsl(350 100% 88%)',
              }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ 
                scale: 1, 
                opacity: 0.9,
                rotate: i * 60 + 30,
                translateX: '-50%',
                translateY: '-80%',
              }}
              transition={{ 
                duration: 0.5, 
                delay: 0.8 + i * 0.1,
                ease: "easeOut" 
              }}
            />
          ))}
          
          {/* Center */}
          <motion.div
            className="relative w-8 h-8 rounded-full bg-gold"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3, delay: 1.4 }}
          />
        </motion.div>

        {/* Loading text */}
        <motion.p
          className="font-display text-xl text-burgundy mt-16"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.5 }}
        >
          Preparing something special...
        </motion.p>

        {/* Loading dots */}
        <div className="flex gap-2">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-2 h-2 rounded-full bg-primary"
              initial={{ opacity: 0.3 }}
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{
                duration: 1,
                delay: i * 0.2,
                repeat: Infinity,
              }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default LoadingScreen;
