import { motion } from 'framer-motion';
import { Heart, MapPin, Calendar, Clock, Sparkles, Download, Share2, CheckCircle2 } from 'lucide-react';
import CountdownTimer from './CountdownTimer';

interface InvitationCardProps {
  isConfirmed: boolean;
}

// Single source of truth for event details (used for display and ICS download)
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
  const y = valentinesDate.getFullYear();
  const m = String(valentinesDate.getMonth() + 1).padStart(2, '0');
  const d = String(valentinesDate.getDate()).padStart(2, '0');
  const icsDate = `${y}${m}${d}`;
  return {
    title: "Valentine's Day Date 💕",
    description: "A special Valentine's Day date at Nike Art Museum",
    location: "Nike Art Museum, Lagos, Nigeria",
    locationShort: "Nike Art Museum, Lagos",
    dateStr,
    timeStr: "4:00 PM",
    startIcs: `${icsDate}T160000`,
    endIcs: `${icsDate}T200000`,
  };
};

const InvitationCard = ({ isConfirmed }: InvitationCardProps) => {
  const event = getEventDetails();

  const handleSaveDate = async () => {
    // ICS format requires CRLF line endings and escaped special chars
    const escapeIcs = (str: string) =>
      str.replace(/\\/g, '\\\\').replace(/;/g, '\\;').replace(/,/g, '\\,').replace(/\n/g, '\\n');
    const crlf = '\r\n';

    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Valentine Invitation//EN',
      'BEGIN:VEVENT',
      `DTSTART:${event.startIcs}`,
      `DTEND:${event.endIcs}`,
      `SUMMARY:${escapeIcs(event.title)}`,
      `DESCRIPTION:${escapeIcs(event.description)}`,
      `LOCATION:${escapeIcs(event.location)}`,
      'END:VEVENT',
      'END:VCALENDAR',
    ].join(crlf);

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const file = new File([blob], 'valentines-date.ics', { type: 'text/calendar;charset=utf-8' });

    // Prefer the native share sheet on mobile (often includes "Add to Calendar")
    try {
      // iOS Safari can be picky about `navigator.canShare` results for `text/calendar`,
      // so we try `share()` directly and fall back if it throws.
      if (navigator.share) {
        await navigator.share({
          title: 'Save the date 💕',
          text: 'Add this to your calendar',
          files: [file],
        });
        return;
      }
    } catch {
      // Fall back to redirect/download below
    }

    const ua = navigator.userAgent;
    const isIOS = /iPhone|iPad|iPod/i.test(ua);
    const isMobile = /Android|iPhone|iPad|iPod/i.test(ua);

    // iOS fallback: open the .ics directly (Safari then shows "Add to Calendar")
    if (isIOS) {
      const url = URL.createObjectURL(file);
      // Must be triggered by a user gesture (this click handler is one)
      window.location.href = url;
      // Give Safari time to load it before revoking
      setTimeout(() => URL.revokeObjectURL(url), 30_000);
      return;
    }

    // Mobile fallback: open calendar event creation (Google Calendar deep-link)
    if (isMobile) {
      const googleCalendarUrl =
        'https://calendar.google.com/calendar/render' +
        `?action=TEMPLATE` +
        `&text=${encodeURIComponent(event.title)}` +
        `&details=${encodeURIComponent(event.description)}` +
        `&location=${encodeURIComponent(event.location)}` +
        `&dates=${encodeURIComponent(`${event.startIcs}/${event.endIcs}`)}`;

      window.location.href = googleCalendarUrl;
      return;
    }

    // Desktop fallback: download the ICS file
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'valentines-date.ics';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(link.href);
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
