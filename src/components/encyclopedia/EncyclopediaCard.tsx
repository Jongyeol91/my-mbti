'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import type { MBTITypeProfile } from '@/types/mbti';
import { getMBTILetterColor, getMBTILetterCSSVar } from '@/lib/mbti-colors';

interface EncyclopediaCardProps {
  profile: MBTITypeProfile;
  index: number;
}

export default function EncyclopediaCard({ profile, index }: EncyclopediaCardProps) {
  const letters = profile.type.split('');
  const accentColor = getMBTILetterCSSVar(letters[0]);

  return (
    <Link href={`/encyclopedia/${profile.type.toLowerCase()}`}>
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-20px' }}
        transition={{ delay: (index % 4) * 0.05, duration: 0.35 }}
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.96 }}
        className="group relative flex h-full cursor-pointer flex-col rounded-lg bg-surface p-5 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_2px_8px_rgba(0,0,0,0.03)] transition-shadow duration-300 ease-out hover:shadow-[0_4px_16px_rgba(0,0,0,0.08),0_1px_3px_rgba(0,0,0,0.06)]"
      >
        {/* Content */}
        <div className="min-w-0 flex-1">
          {/* Type code */}
          <span className="font-display text-2xl font-black tracking-tight sm:text-3xl">
            {letters.map((letter, i) => (
              <span key={i} className={getMBTILetterColor(letter)}>
                {letter}
              </span>
            ))}
          </span>

          {/* Nickname */}
          <p className="mt-1.5 text-sm font-medium text-foreground/70">
            {profile.nickname}
          </p>

          {/* Summary */}
          <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-foreground/40">
            {profile.summary}
          </p>
        </div>
      </motion.div>
    </Link>
  );
}
