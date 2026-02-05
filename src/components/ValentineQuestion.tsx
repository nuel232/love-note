import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, X } from 'lucide-react';

interface ValentineQuestionProps {
  onYes: () => void;
}

const playfulMessages = [
  "I can stay here all day 😏",
  "Not taking no for an answer! 💕",
  "Nice try, but I'm persistent 😘",
  "Did you really think that would work? 💝",
  "The 'No' button is just decoration! 😄",
];

const ValentineQuestion = ({ onYes }: ValentineQuestionProps) => {
  const [noAttempts, setNoAttempts] = useState(0);
  const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 });
  const [noButtonScale, setNoButtonScale] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const handleNoHover = useCallback(() => {
    if (noAttempts >= 3) {
      const randomMessage = playfulMessages[Math.floor(Math.random() * playfulMessages.length)];
      setModalMessage(randomMessage);
      setShowModal(true);
      return;
    }

    const maxX = window.innerWidth > 768 ? 200 : 100;
    const maxY = window.innerWidth > 768 ? 150 : 80;
    
    const newX = (Math.random() - 0.5) * maxX * 2;
    const newY = (Math.random() - 0.5) * maxY * 2;
    
    setNoButtonPosition({ x: newX, y: newY });
    setNoButtonScale(1 - (noAttempts + 1) * 0.15);
    setNoAttempts(prev => prev + 1);
  }, [noAttempts]);

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
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="font-display text-5xl md:text-7xl font-bold text-burgundy mb-4">
            Will you be my
          </h2>
          <h2 className="font-display text-6xl md:text-8xl font-bold text-gradient-rose mb-12">
            Valentine?
          </h2>
        </motion.div>

        <motion.div
          className="flex justify-center mb-12"
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Heart className="w-24 h-24 text-primary" fill="currentColor" />
        </motion.div>

        <motion.div
          className="flex flex-col md:flex-row items-center justify-center gap-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <motion.button
            onClick={onYes}
            className="btn-valentine-yes text-xl px-12 py-5 pulse-glow"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="flex items-center gap-3">
              Yes! 
              <Heart className="w-6 h-6" fill="currentColor" />
            </span>
          </motion.button>

          <motion.button
            className="btn-valentine-no"
            animate={{
              x: noButtonPosition.x,
              y: noButtonPosition.y,
              scale: noButtonScale,
            }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            onMouseEnter={handleNoHover}
            onClick={handleNoHover}
            onTouchStart={handleNoHover}
          >
            No
          </motion.button>
        </motion.div>

        {noAttempts > 0 && noAttempts < 3 && (
          <motion.p
            className="mt-8 text-muted-foreground text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {noAttempts === 1 ? "Oops! The button moved 😅" : "It keeps moving! 🙈"}
          </motion.p>
        )}
      </div>

      <AnimatePresence>
        {showModal && (
          <motion.div
            className="fixed inset-0 bg-burgundy/50 backdrop-blur-sm flex items-center justify-center z-50 p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-cream rounded-2xl p-8 max-w-md w-full text-center shadow-2xl relative"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
            >
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-4 right-4 text-muted-foreground hover:text-burgundy"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              <Heart className="w-16 h-16 text-primary mx-auto mb-4" fill="currentColor" />

              <h3 className="font-display text-3xl font-bold text-burgundy mb-4">
                {modalMessage}
              </h3>

              <p className="text-muted-foreground mb-6">
                There's only one right answer here...
              </p>

              <motion.button
                onClick={() => {
                  setShowModal(false);
                  onYes();
                }}
                className="btn-valentine-yes pulse-glow"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Yes! ❤️
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default ValentineQuestion;