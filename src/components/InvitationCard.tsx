import { motion } from 'framer-motion';
import { Heart, MapPin, Calendar, Clock, Sparkles, Share2, CheckCircle2, Apple } from 'lucide-react';
import CountdownTimer from './CountdownTimer';

interface InvitationCardProps {
  isConfirmed: boolean;
}

// Single source of truth for event details
const getEventDetails = () => {
  const now = new Date();
  const year = now.getFullYear();
  let valentinesDate = new Date(year, 1, 14); // Feb 14 (month is 0-indexed)
  if (now >= valentinesDate) {
    valentinesDate = new Date(year + 1, 1, 14);
  }
  const dateStr = valentinesDate.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
  
  // Create date objects for calendar links
  const startDate = new Date(valentinesDate);
  startDate.setHours(16, 0, 0, 0); // 4:00 PM
  const endDate = new Date(valentinesDate);
  endDate.setHours(20, 0, 0, 0); // 8:00 PM
  
  return {
    title: "Valentine's Day Date 💕",
    description: "A special Valentine's Day date at Nike Art Museum",
    location: "Nike Art Museum, Lagos, Nigeria",
    locationShort: "Nike Art Museum, Lagos",
    dateStr,
    timeStr: "4:00 PM",
    startDate,
    endDate,
  };
};

const InvitationCard = ({ isConfirmed }: InvitationCardProps) => {
  const event = getEventDetails();

  // Format dates for Google Calendar
  const formatDateForGoogle = (date: Date) => {
    return date.toISOString().replace(/-|:|\.\d+/g, '');
  };

  // Google Calendar URL
  const googleCalendarUrl = 
    'https://calendar.google.com/calendar/render' +
    `?action=TEMPLATE` +
    `&text=${encodeURIComponent(event.title)}` +
    `&details=${encodeURIComponent(event.description)}` +
    `&location=${encodeURIComponent(event.location)}` +
    `&dates=${formatDateForGoogle(event.startDate)}/${formatDateForGoogle(event.endDate)}`;

  // Apple Calendar URL (uses webcal protocol with Google Calendar endpoint)
  const appleCalendarUrl = googleCalendarUrl.replace('https://', 'webcal://');

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "You're Invited! 💕",
          text: "Check out this special Valentine's Day invitation!",
          url: window.location.href,
        });
      } catch (err) {
        console.log('Share cancelled');
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <section className="section-valentine bg-gradient-hero py-16 md:py-24">
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

      <div className="container mx-auto px-6">
        <motion.div
          className="max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* RSVP Badge */}
          {isConfirmed && (
            <motion.div
              className="flex justify-center mb-6"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, type: "spring" }}
            >
              <div className="inline-flex items-center gap-2 bg-secondary text-primary px-4 py-2 rounded-full text-sm font-medium">
                <CheckCircle2 className="w-4 h-4" />
                RSVP Confirmed ✓
              </div>
            </motion.div>
          )}

          {/* Countdown */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <p className="text-center text-muted-foreground mb-4 font-medium">
              Counting down to our special day...
            </p>
            <CountdownTimer />
          </motion.div>

          {/* Invitation Card */}
          <motion.div
            className="invitation-card"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            {/* Header decoration */}
            <div className="flex justify-center mb-6">
              <div className="flex items-center gap-2">
                <div className="w-12 h-[1px] bg-gradient-to-r from-transparent to-gold" />
                <Sparkles className="w-5 h-5 text-gold" />
                <Heart className="w-6 h-6 text-primary" fill="currentColor" />
                <Sparkles className="w-5 h-5 text-gold" />
                <div className="w-12 h-[1px] bg-gradient-to-l from-transparent to-gold" />
              </div>
            </div>

            {/* Title */}
            <h2 className="font-display text-3xl md:text-4xl font-bold text-center text-burgundy mb-2">
              You're Cordially Invited
            </h2>
            
            <motion.div
              className="flex justify-center mb-8"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
            >
              <div className="w-24 h-24 rounded-full border-2 border-gold-soft overflow-hidden shadow-lg">
                <img 
                  src="/Screenshot 2026-02-05 235239.png"
                  alt="My Valentine"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
            
            <p className="text-center text-muted-foreground mb-8">
              to a magical Valentine's Day celebration
            </p>

            {/* Event Details */}
            <div className="space-y-6 mb-8">
              {/* Event Name */}
              <div className="text-center">
                <p className="font-display text-2xl md:text-3xl text-gradient-rose font-semibold">
                  Valentine's Day Date
                </p>
              </div>

              {/* Date & Time */}
              <div className="flex flex-col md:flex-row justify-center gap-6 md:gap-12">
                <div className="flex items-center justify-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-primary" />
                  </div>
                  <div className="text-left">
                    <p className="text-sm text-muted-foreground">Date</p>
                    <p className="font-semibold text-burgundy">{event.dateStr}</p>
                  </div>
                </div>

                <div className="flex items-center justify-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                    <Clock className="w-5 h-5 text-primary" />
                  </div>
                  <div className="text-left">
                    <p className="text-sm text-muted-foreground">Time</p>
                    <p className="font-semibold text-burgundy">{event.timeStr}</p>
                  </div>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-center justify-center gap-3">
                <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <div className="text-left">
                  <p className="text-sm text-muted-foreground">Location</p>
                  <a
                    href="https://maps.google.com/?q=Nike+Art+Gallery+Lagos"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-burgundy hover:text-primary transition-colors underline-offset-2 hover:underline"
                  >
                    {event.locationShort}
                  </a>
                </div>
              </div>
            </div>

            {/* Dress Code */}
            <div className="text-center mb-8 p-4 bg-secondary/50 rounded-xl">
              <p className="text-muted-foreground text-sm mb-1">Dress Code</p>
              <p className="font-display text-lg text-burgundy">
                Dress to impress 💫
              </p>
            </div>

            {/* Decorative divider */}
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="w-16 h-[1px] bg-gradient-to-r from-transparent to-border" />
              <Heart className="w-4 h-4 text-primary/50" fill="currentColor" />
              <div className="w-16 h-[1px] bg-gradient-to-l from-transparent to-border" />
            </div>

            {/* Add to Calendar Buttons */}
            <div className="mb-6">
              <p className="text-center text-sm text-muted-foreground mb-4 font-medium">
                Add to your calendar:
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-3">
                {/* Apple Calendar Button */}
                <motion.a
      href={`data:text/calendar;charset=utf-8,${encodeURIComponent(
        `BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
DTSTART:${formatDateForGoogle(event.startDate)}
DTEND:${formatDateForGoogle(event.endDate)}
SUMMARY:${event.title}
DESCRIPTION:${event.description}
LOCATION:${event.location}
END:VEVENT
END:VCALENDAR`
      )}`}
      download="valentine-date.ics"
      className="btn-valentine-yes flex items-center justify-center gap-2 text-center no-underline"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Apple className="w-5 h-5" />
      Apple Calendar
    </motion.a>
              
              </div>
            </div>

            {/* Share Button */}
            <div className="flex justify-center">
              <motion.button
                onClick={handleShare}
                className="px-6 py-2 rounded-full bg-secondary text-primary font-medium hover:bg-secondary/80 transition-colors flex items-center justify-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Share2 className="w-4 h-4" />
                Share Invitation
              </motion.button>
            </div>
          </motion.div>

          {/* Footer message */}
          <motion.p
            className="text-center text-muted-foreground mt-8 font-display text-lg italic"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            Can't wait to see you there! 💕
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};

export default InvitationCard;