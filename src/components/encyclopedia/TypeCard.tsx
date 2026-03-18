'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import type { MBTITypeProfile } from '@/types/mbti';

interface TypeCardProps {
  profile: MBTITypeProfile;
  index: number;
}

export default function TypeCard({ profile, index }: TypeCardProps) {
  return (
    <Link href={`/encyclopedia/${profile.type.toLowerCase()}`}>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.04, duration: 0.4 }}
        whileHover={{ y: -4, scale: 1.02 }}
        whileTap={{ scale: 0.97 }}
        className="group relative flex h-full cursor-pointer flex-col items-center overflow-hidden rounded-2xl bg-surface p-4 shadow-sm transition-shadow hover:shadow-lg sm:rounded-3xl sm:p-5 md:p-6"
      >
        {/* Gradient accent */}
        <div
          className="absolute inset-x-0 top-0 h-1 sm:h-1.5"
          style={{
            background: `linear-gradient(90deg, ${profile.gradient[0]}, ${profile.gradient[1]})`,
          }}
        />

        {/* Emoji */}
        <div className="mb-2 text-3xl sm:text-4xl md:text-5xl transition-transform group-hover:scale-110">
          {profile.emoji}
        </div>

        {/* Type code */}
        <h3
          className="mb-0.5 text-lg font-black tracking-tight sm:text-xl md:text-2xl"
          style={{
            background: `linear-gradient(135deg, ${profile.gradient[0]}, ${profile.gradient[1]})`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          {profile.type}
        </h3>

        {/* Nickname */}
        <p className="mb-2 text-xs font-semibold text-foreground/70 sm:text-sm">
          {profile.nickname}
        </p>

        {/* Summary - hidden on mobile small, shown on larger */}
        <p className="hidden text-center text-[11px] leading-snug text-foreground/50 sm:line-clamp-2 sm:block sm:text-xs">
          {profile.summary}
        </p>

        {/* Keywords on larger screens */}
        <div className="mt-auto hidden flex-wrap justify-center gap-1 pt-3 md:flex">
          {profile.keywords.slice(0, 3).map((kw) => (
            <span
              key={kw}
              className="rounded-full bg-foreground/5 px-2 py-0.5 text-[10px] text-foreground/40"
            >
              #{kw}
            </span>
          ))}
        </div>
      </motion.div>
    </Link>
  );
}
