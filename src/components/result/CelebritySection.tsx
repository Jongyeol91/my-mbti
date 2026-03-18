'use client';

import { motion } from 'framer-motion';
import type { CelebrityInfo } from '@/types/mbti';

interface CelebritySectionProps {
  celebrities: CelebrityInfo[];
  gradient: [string, string];
}

/** Generate a stable pastel color from a name string */
function getAvatarColor(name: string): string {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  const hue = Math.abs(hash) % 360;
  return `hsl(${hue}, 65%, 75%)`;
}

/** Get initials from a Korean/English name (first 1-2 chars) */
function getInitials(name: string): string {
  const trimmed = name.trim();
  // For Korean names, take first character
  if (/[\u3131-\uD79D]/.test(trimmed)) {
    return trimmed[0];
  }
  // For English names or mixed, take first letter of first two words
  const words = trimmed.split(/\s+/);
  if (words.length >= 2) {
    return (words[0][0] + words[1][0]).toUpperCase();
  }
  return trimmed.slice(0, 2).toUpperCase();
}

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring' as const,
      stiffness: 200,
      damping: 18,
    },
  },
};

export default function CelebritySection({ celebrities, gradient }: CelebritySectionProps) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-30px' }}
      className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4"
    >
      {celebrities.map((celeb) => {
        const avatarColor = getAvatarColor(celeb.name);
        const initials = getInitials(celeb.name);

        return (
          <motion.div
            key={celeb.name}
            variants={itemVariants}
            whileHover={{ scale: 1.05, y: -4 }}
            whileTap={{ scale: 0.97 }}
            className="group flex flex-col items-center rounded-2xl bg-surface p-3 shadow-sm transition-shadow hover:shadow-md sm:p-4"
          >
            {/* Avatar circle with gradient border */}
            <div
              className="relative mb-2.5 sm:mb-3"
            >
              {/* Gradient ring */}
              <div
                className="absolute -inset-[3px] rounded-full opacity-60 transition-opacity group-hover:opacity-100"
                style={{
                  background: `linear-gradient(135deg, ${gradient[0]}, ${gradient[1]})`,
                }}
              />
              {/* Avatar with initials */}
              <motion.div
                className="relative flex h-14 w-14 items-center justify-center rounded-full text-lg font-bold text-white shadow-inner sm:h-16 sm:w-16 sm:text-xl"
                style={{
                  backgroundColor: avatarColor,
                }}
                whileHover={{ rotate: [0, -5, 5, 0] }}
                transition={{ duration: 0.4 }}
              >
                {initials}
              </motion.div>
            </div>

            {/* Name */}
            <p className="text-center text-sm font-bold leading-tight sm:text-base">
              {celeb.name}
            </p>

            {/* Description */}
            <p className="mt-1 text-center text-[10px] leading-snug text-foreground/50 sm:text-xs sm:leading-snug">
              {celeb.description}
            </p>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
