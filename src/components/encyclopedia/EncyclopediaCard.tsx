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
  const firstLetterColor = getMBTILetterCSSVar(letters[0]);

  return (
    <Link href={`/encyclopedia/${profile.type.toLowerCase()}`}>
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: '-20px' }}
        transition={{ delay: (index % 4) * 0.06, duration: 0.4 }}
        whileHover={{ y: -6, scale: 1.03 }}
        whileTap={{ scale: 0.96 }}
        className="group relative flex h-full cursor-pointer flex-col items-center overflow-hidden rounded-2xl bg-surface p-4 shadow-sm transition-shadow hover:shadow-xl sm:rounded-3xl sm:p-5 md:p-6"
      >
        {/* Dimension color accent bar — keyed to first letter */}
        <div
          className="absolute inset-x-0 top-0 h-1 sm:h-1.5"
          style={{ background: firstLetterColor }}
        />

        {/* Hover glow */}
        <div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background: `radial-gradient(circle at 50% 30%, ${firstLetterColor}26, transparent 70%)`,
          }}
        />

        {/* Colored type letters as visual element */}
        <div className="relative mb-2 flex items-center gap-0.5 text-3xl font-black tracking-tight transition-transform duration-300 group-hover:scale-110 sm:text-4xl md:text-5xl">
          {letters.map((letter, i) => (
            <span key={i} className={getMBTILetterColor(letter)}>
              {letter}
            </span>
          ))}
        </div>

        {/* Nickname */}
        <p className="mb-1.5 text-xs font-semibold text-foreground/70 sm:text-sm">
          {profile.nickname}
        </p>

        {/* Summary - hidden on small mobile */}
        <p className="hidden text-center text-[11px] leading-snug text-foreground/50 sm:line-clamp-2 sm:block sm:text-xs">
          {profile.summary}
        </p>

        {/* Keywords */}
        <div className="mt-auto flex flex-wrap justify-center gap-1 pt-2 md:pt-3">
          {profile.keywords.slice(0, 3).map((kw) => (
            <span
              key={kw}
              className="rounded-full bg-foreground/5 px-2 py-0.5 text-[9px] text-foreground/40 sm:text-[10px]"
            >
              #{kw}
            </span>
          ))}
        </div>

        {/* View hint on hover */}
        <div className="mt-2 flex items-center gap-0.5 text-[10px] font-medium text-foreground/30 opacity-0 transition-opacity group-hover:opacity-100 sm:text-xs">
          자세히 보기 →
        </div>
      </motion.div>
    </Link>
  );
}
