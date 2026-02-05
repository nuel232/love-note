import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calculateTimeLeft = (): TimeLeft => {
      const now = new Date();
      // Target next Valentine's Day (Feb 14) at 4:00 PM
      let year = now.getFullYear();
      let valentinesDay = new Date(year, 1, 14, 16, 0, 0, 0);
      if (now >= valentinesDay) {
        valentinesDay = new Date(year + 1, 1, 14, 16, 0, 0, 0);
      }

      const difference = valentinesDay.getTime() - now.getTime();

      if (difference > 0) {
        return {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        };
      }

      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    };

    // Update immediately, then every second
    setTimeLeft(calculateTimeLeft());
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const timeBlocks = [
    { label: 'Days', value: timeLeft.days },
    { label: 'Hours', value: timeLeft.hours },
    { label: 'Minutes', value: timeLeft.minutes },
    { label: 'Seconds', value: timeLeft.seconds },
  ];

  return (
    <div className="flex justify-center gap-3 md:gap-4">
      {timeBlocks.map((block, index) => (
        <motion.div
          key={block.label}
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <div className="bg-cream border border-gold-soft/30 rounded-lg p-3 md:p-4 min-w-[60px] md:min-w-[80px] shadow-sm">
            <motion.span
              key={`${block.label}-${block.value}`}
              className="font-display text-2xl md:text-4xl font-bold text-burgundy block"
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.2 }}
            >
              {block.value.toString().padStart(2, '0')}
            </motion.span>
          </div>
          <span className="text-xs md:text-sm text-muted-foreground mt-2 block">
            {block.label}
          </span>
        </motion.div>
      ))}
    </div>
  );
};

export default CountdownTimer;
