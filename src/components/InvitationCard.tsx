import { motion } from 'framer-motion';
import { Heart, MapPin, Calendar, Clock, Sparkles, Download, Share2, CheckCircle2 } from 'lucide-react';
import CountdownTimer from './CountdownTimer';

interface InvitationCardProps {
  isConfirmed: boolean;
}

const InvitationCard = ({ isConfirmed }: InvitationCardProps) => {
  const handleSaveDate = () => {
    // Create calendar event
    const event = {
      title: "Valentine's Day Date 💕",
      description: "A special Valentine's Day date at Nike Art Museum",
      location: "Nike Art Museum, Lagos, Nigeria",
      start: "2025-02-14T16:00:00",
      end: "2025-02-14T20:00:00",
    };

    // Create ICS file content
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Valentine Invitation//EN
BEGIN:VEVENT
DTSTART:20250214T160000
DTEND:20250214T200000
SUMMARY:${event.title}
DESCRIPTION:${event.description}
LOCATION:${event.location}
END:VEVENT
END:VCALENDAR`;

    // Download the ICS file
    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'valentines-date.ics';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

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
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <section className="section-valentine bg-gradient-hero py-16 md:py-24">
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
                    <p className="font-semibold text-burgundy">February 14, 2025</p>
                  </div>
                </div>

                <div className="flex items-center justify-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                    <Clock className="w-5 h-5 text-primary" />
                  </div>
                  <div className="text-left">
                    <p className="text-sm text-muted-foreground">Time</p>
                    <p className="font-semibold text-burgundy">4:00 PM</p>
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
                    Nike Art Museum, Lagos
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

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <motion.button
                onClick={handleSaveDate}
                className="btn-valentine-yes flex items-center justify-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Download className="w-5 h-5" />
                Save the Date
              </motion.button>

              <motion.button
                onClick={handleShare}
                className="px-6 py-3 rounded-full border-2 border-primary text-primary font-medium hover:bg-primary hover:text-primary-foreground transition-colors flex items-center justify-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Share2 className="w-5 h-5" />
                Share
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
