'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import type { CompatibilityInfo, MBTIType } from '@/types/mbti';
import { getProfile } from '@/lib/profiles';
import { getCompatibilityDetail } from '@/data/compatibility';

interface CompatibilitySectionProps {
  compatibility: CompatibilityInfo;
  currentType: MBTIType;
}

const COMPAT_LEVELS = [
  {
    key: 'best' as const,
    label: '💖 최고의 궁합',
    sublabel: '운명처럼 딱 맞는 사이',
    bg: 'bg-pink-50',
    border: 'border-pink-200',
    badge: 'bg-pink-100 text-pink-700',
    cardBg: 'bg-gradient-to-br from-pink-50 to-rose-50',
    iconBg: 'bg-pink-100',
    barColor: 'bg-gradient-to-r from-pink-400 to-rose-400',
    indicator: '💕',
    matchPercent: 95,
  },
  {
    key: 'good' as const,
    label: '💛 좋은 궁합',
    sublabel: '함께하면 더 좋은 사이',
    bg: 'bg-amber-50',
    border: 'border-amber-200',
    badge: 'bg-amber-100 text-amber-700',
    cardBg: 'bg-gradient-to-br from-amber-50 to-yellow-50',
    iconBg: 'bg-amber-100',
    barColor: 'bg-gradient-to-r from-amber-400 to-yellow-400',
    indicator: '💚',
    matchPercent: 75,
  },
  {
    key: 'bad' as const,
    label: '⚡ 도전적인 궁합',
    sublabel: '차이를 이해하면 성장해요',
    bg: 'bg-purple-50',
    border: 'border-purple-200',
    badge: 'bg-purple-100 text-purple-700',
    cardBg: 'bg-gradient-to-br from-purple-50 to-indigo-50',
    iconBg: 'bg-purple-100',
    barColor: 'bg-gradient-to-r from-purple-400 to-indigo-400',
    indicator: '💔',
    matchPercent: 35,
  },
];

function CompatibilityCard({
  type,
  currentType,
  levelConfig,
  index,
}: {
  type: MBTIType;
  currentType: MBTIType;
  levelConfig: (typeof COMPAT_LEVELS)[number];
  index: number;
}) {
  const profile = getProfile(type);
  const detail = getCompatibilityDetail(currentType, type);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.4, type: 'spring', stiffness: 200 }}
      whileHover={{ y: -2 }}
      className={`relative overflow-hidden rounded-2xl border p-3.5 sm:p-4 ${levelConfig.border} ${levelConfig.cardBg} transition-shadow hover:shadow-md`}
    >
      {/* Match indicator bar */}
      <div className="absolute left-0 top-0 h-1 w-full overflow-hidden rounded-t-2xl bg-foreground/5">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${levelConfig.matchPercent}%` }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.08 + 0.3, duration: 0.6, ease: 'easeOut' }}
          className={`h-full ${levelConfig.barColor}`}
        />
      </div>

      <div className="flex items-start gap-3">
        {/* Type emoji + badge */}
        <Link href={`/encyclopedia/${type.toLowerCase()}`} className="shrink-0">
          <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
            className={`flex h-11 w-11 items-center justify-center rounded-xl text-xl sm:h-12 sm:w-12 sm:text-2xl ${levelConfig.iconBg}`}
          >
            {profile?.emoji || '🎭'}
          </motion.div>
        </Link>

        <div className="min-w-0 flex-1">
          {/* Type code + indicator */}
          <div className="flex items-center gap-1.5">
            <Link href={`/encyclopedia/${type.toLowerCase()}`}>
              <span className={`rounded-full px-2 py-0.5 text-xs font-bold sm:text-sm ${levelConfig.badge}`}>
                {type}
              </span>
            </Link>
            <span className="text-xs">{levelConfig.indicator}</span>
            {profile?.nickname && (
              <span className="truncate text-[10px] text-foreground/40 sm:text-xs">
                {profile.nickname}
              </span>
            )}
          </div>

          {/* Compatibility title */}
          <p className="mt-1 text-xs font-semibold text-foreground/80 sm:text-sm">
            {detail.title}
          </p>

          {/* Brief description */}
          <p className="mt-0.5 line-clamp-2 text-[11px] leading-relaxed text-foreground/55 sm:text-xs sm:leading-relaxed">
            {detail.description}
          </p>

          {/* Tip */}
          <div className="mt-1.5 flex items-start gap-1">
            <span className="shrink-0 text-[10px]">💡</span>
            <p className="line-clamp-1 text-[10px] text-foreground/40 sm:text-[11px]">
              {detail.tip}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function CompatibilitySection({
  compatibility,
  currentType,
}: CompatibilitySectionProps) {
  return (
    <div className="space-y-5 sm:space-y-6">
      {COMPAT_LEVELS.map((level, idx) => {
        const types = compatibility[level.key];
        if (types.length === 0) return null;

        return (
          <motion.div
            key={level.key}
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.12, duration: 0.4 }}
          >
            {/* Section header */}
            <div className="mb-2.5 flex items-center gap-2 sm:mb-3">
              <h3 className="text-sm font-bold sm:text-base">{level.label}</h3>
              <span className="text-[10px] text-foreground/40 sm:text-xs">{level.sublabel}</span>
            </div>

            {/* Cards grid */}
            <div className="grid grid-cols-1 gap-2.5 sm:gap-3">
              {types.map((type, i) => (
                <CompatibilityCard
                  key={type}
                  type={type}
                  currentType={currentType}
                  levelConfig={level}
                  index={i}
                />
              ))}
            </div>
          </motion.div>
        );
      })}

      {/* Neutral types - compact display */}
      {compatibility.neutral.length > 0 && (
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.4 }}
        >
          <div className="mb-2.5 flex items-center gap-2 sm:mb-3">
            <h3 className="text-sm font-bold sm:text-base">🤝 보통 궁합</h3>
            <span className="text-[10px] text-foreground/40 sm:text-xs">
              노력하면 좋은 관계가 돼요
            </span>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-slate-50/50 p-3 sm:p-4">
            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              {compatibility.neutral.map((type, i) => {
                const profile = getProfile(type);
                return (
                  <Link key={type} href={`/encyclopedia/${type.toLowerCase()}`}>
                    <motion.span
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.04, duration: 0.3 }}
                      whileHover={{ scale: 1.08, y: -1 }}
                      whileTap={{ scale: 0.95 }}
                      className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600 transition-shadow hover:shadow-md cursor-pointer sm:text-sm"
                    >
                      {profile?.emoji || '🎭'} {type}
                    </motion.span>
                  </Link>
                );
              })}
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
