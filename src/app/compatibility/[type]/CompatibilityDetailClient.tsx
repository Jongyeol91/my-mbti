'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import type { MBTITypeProfile, MBTIType, CompatibilityLevel } from '@/types/mbti';

interface Props {
  profile: MBTITypeProfile;
  allProfiles: MBTITypeProfile[];
}

type FilterMode = 'all' | CompatibilityLevel;

const COMPAT_CONFIG: Record<CompatibilityLevel, {
  label: string;
  emoji: string;
  description: string;
  bg: string;
  border: string;
  badge: string;
  ring: string;
  hearts: number;
  barColor: string;
}> = {
  best: {
    label: '최고의 궁합',
    emoji: '💖',
    description: '운명적인 만남!',
    bg: 'bg-pink-50',
    border: 'border-pink-200',
    badge: 'bg-pink-100 text-pink-700',
    ring: 'ring-pink-300',
    hearts: 5,
    barColor: 'bg-gradient-to-r from-pink-400 to-rose-500',
  },
  good: {
    label: '좋은 궁합',
    emoji: '💛',
    description: '서로 잘 통해요',
    bg: 'bg-amber-50',
    border: 'border-amber-200',
    badge: 'bg-amber-100 text-amber-700',
    ring: 'ring-amber-300',
    hearts: 4,
    barColor: 'bg-gradient-to-r from-amber-400 to-yellow-500',
  },
  neutral: {
    label: '보통 궁합',
    emoji: '🤝',
    description: '노력하면 좋아질 수 있어요',
    bg: 'bg-slate-50',
    border: 'border-slate-200',
    badge: 'bg-slate-100 text-slate-600',
    ring: 'ring-slate-300',
    hearts: 3,
    barColor: 'bg-gradient-to-r from-slate-300 to-slate-400',
  },
  bad: {
    label: '안 맞는 궁합',
    emoji: '⚡',
    description: '서로 다른 세계',
    bg: 'bg-purple-50',
    border: 'border-purple-200',
    badge: 'bg-purple-100 text-purple-700',
    ring: 'ring-purple-300',
    hearts: 2,
    barColor: 'bg-gradient-to-r from-purple-300 to-violet-400',
  },
};

const FILTER_OPTIONS: { key: FilterMode; label: string; emoji: string }[] = [
  { key: 'all', label: '전체', emoji: '🌈' },
  { key: 'best', label: '최고', emoji: '💖' },
  { key: 'good', label: '좋음', emoji: '💛' },
  { key: 'neutral', label: '보통', emoji: '🤝' },
  { key: 'bad', label: '주의', emoji: '⚡' },
];

function getCompatLevel(profile: MBTITypeProfile, targetType: MBTIType): CompatibilityLevel {
  if (profile.compatibility.best.includes(targetType)) return 'best';
  if (profile.compatibility.good.includes(targetType)) return 'good';
  if (profile.compatibility.bad.includes(targetType)) return 'bad';
  return 'neutral';
}

function HeartRating({ count, max = 5 }: { count: number; max?: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: max }).map((_, i) => (
        <motion.span
          key={i}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: i * 0.08, type: 'spring', stiffness: 300 }}
          className={`text-xs sm:text-sm ${i < count ? '' : 'opacity-20'}`}
        >
          {i < count ? '❤️' : '🤍'}
        </motion.span>
      ))}
    </div>
  );
}

function CompatibilityBar({ level }: { level: CompatibilityLevel }) {
  const config = COMPAT_CONFIG[level];
  const widthMap: Record<CompatibilityLevel, string> = {
    best: '100%',
    good: '75%',
    neutral: '50%',
    bad: '30%',
  };

  return (
    <div className="h-1.5 w-full overflow-hidden rounded-full bg-foreground/5">
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: widthMap[level] }}
        transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
        className={`h-full rounded-full ${config.barColor}`}
      />
    </div>
  );
}

function CompatCard({
  targetProfile,
  level,
  index,
}: {
  targetProfile: MBTITypeProfile;
  level: CompatibilityLevel;
  index: number;
}) {
  const config = COMPAT_CONFIG[level];

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.35, delay: index * 0.03 }}
    >
      <Link href={`/encyclopedia/${targetProfile.type.toLowerCase()}`}>
        <motion.div
          whileHover={{ scale: 1.03, y: -2 }}
          whileTap={{ scale: 0.97 }}
          className={`relative overflow-hidden rounded-2xl border p-3 transition-shadow hover:shadow-lg cursor-pointer sm:p-4 ${config.bg} ${config.border}`}
        >
          {/* Compat level indicator */}
          <div className="absolute right-2 top-2 sm:right-3 sm:top-3">
            <span className="text-sm sm:text-base">{config.emoji}</span>
          </div>

          {/* Type emoji */}
          <div className="mb-2">
            <span className="text-2xl sm:text-3xl">{targetProfile.emoji}</span>
          </div>

          {/* Type info */}
          <h3 className="text-sm font-bold sm:text-base">{targetProfile.type}</h3>
          <p className="text-[10px] text-foreground/60 sm:text-xs">{targetProfile.nickname}</p>

          {/* Heart rating */}
          <div className="mt-2">
            <HeartRating count={config.hearts} />
          </div>

          {/* Compat bar */}
          <div className="mt-2">
            <CompatibilityBar level={level} />
          </div>

          {/* Level badge */}
          <div className="mt-2">
            <span className={`inline-block rounded-full px-2 py-0.5 text-[10px] font-semibold sm:text-xs ${config.badge}`}>
              {config.label}
            </span>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
}

export default function CompatibilityDetailClient({ profile, allProfiles }: Props) {
  const [filter, setFilter] = useState<FilterMode>('all');

  // Build compatibility map for all types
  const compatMap = allProfiles
    .filter((p) => p.type !== profile.type)
    .map((p) => ({
      profile: p,
      level: getCompatLevel(profile, p.type),
    }));

  // Sort: best first, then good, neutral, bad
  const levelOrder: CompatibilityLevel[] = ['best', 'good', 'neutral', 'bad'];
  const sorted = [...compatMap].sort(
    (a, b) => levelOrder.indexOf(a.level) - levelOrder.indexOf(b.level)
  );

  const filtered = filter === 'all' ? sorted : sorted.filter((c) => c.level === filter);

  // Count per level
  const counts: Record<FilterMode, number> = {
    all: compatMap.length,
    best: compatMap.filter((c) => c.level === 'best').length,
    good: compatMap.filter((c) => c.level === 'good').length,
    neutral: compatMap.filter((c) => c.level === 'neutral').length,
    bad: compatMap.filter((c) => c.level === 'bad').length,
  };

  return (
    <div className="relative min-h-dvh bg-background">
      {/* Background gradient */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          background: `linear-gradient(135deg, ${profile.gradient[0]}, ${profile.gradient[1]})`,
        }}
      />

      <div className="relative z-10 mx-auto max-w-3xl px-4 pb-24 pt-6 sm:px-6 md:px-8 lg:pt-10">
        {/* Back nav */}
        <motion.div
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-6 flex flex-wrap items-center gap-2"
        >
          <Link
            href={`/result/${profile.type.toLowerCase()}`}
            className="inline-flex items-center gap-1 rounded-full bg-surface/80 px-3 py-1.5 text-xs font-medium text-foreground/60 backdrop-blur-sm transition-colors hover:text-foreground sm:text-sm"
          >
            ← 결과 페이지로
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-1 rounded-full bg-surface/80 px-3 py-1.5 text-xs font-medium text-foreground/60 backdrop-blur-sm transition-colors hover:text-foreground sm:text-sm"
          >
            🏠 홈
          </Link>
        </motion.div>

        {/* Hero section: User's type */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
            className="mb-3 text-5xl sm:text-6xl"
          >
            {profile.emoji}
          </motion.div>

          <h1
            className="mb-1 text-3xl font-black tracking-tight sm:text-4xl"
            style={{
              background: `linear-gradient(135deg, ${profile.gradient[0]}, ${profile.gradient[1]})`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            {profile.type}
          </h1>
          <p className="text-base font-bold text-foreground/70 sm:text-lg">
            {profile.nickname}
          </p>
          <p className="mt-1 text-xs text-foreground/50 sm:text-sm">{profile.summary}</p>

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-5"
          >
            <h2 className="text-lg font-bold sm:text-xl">💞 궁합 비교</h2>
            <p className="mt-1 text-xs text-foreground/50 sm:text-sm">
              다른 유형들과의 궁합을 한눈에 확인해보세요!
            </p>
          </motion.div>
        </motion.section>

        {/* Summary stats cards */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-6 grid grid-cols-4 gap-2 sm:gap-3"
        >
          {(['best', 'good', 'neutral', 'bad'] as CompatibilityLevel[]).map((level) => {
            const config = COMPAT_CONFIG[level];
            return (
              <motion.button
                key={level}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setFilter(filter === level ? 'all' : level)}
                className={`rounded-2xl border p-2.5 text-center transition-all sm:p-3 ${config.bg} ${config.border} ${
                  filter === level ? `ring-2 ${config.ring} shadow-md` : ''
                }`}
              >
                <div className="text-base sm:text-lg">{config.emoji}</div>
                <div className="text-lg font-black sm:text-xl">{counts[level]}</div>
                <div className="text-[10px] font-medium text-foreground/60 sm:text-xs">
                  {config.label}
                </div>
              </motion.button>
            );
          })}
        </motion.div>

        {/* Filter tabs */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="no-scrollbar mb-5 flex gap-1.5 overflow-x-auto rounded-2xl bg-surface p-1.5 shadow-sm sm:gap-2 sm:p-2"
        >
          {FILTER_OPTIONS.map((opt) => (
            <button
              key={opt.key}
              onClick={() => setFilter(opt.key)}
              className={`relative flex-shrink-0 rounded-xl px-3 py-1.5 text-xs font-semibold transition-all sm:px-4 sm:py-2 sm:text-sm ${
                filter === opt.key
                  ? 'bg-primary text-white shadow-sm'
                  : 'text-foreground/60 hover:bg-foreground/5'
              }`}
            >
              <span className="mr-1">{opt.emoji}</span>
              {opt.label}
              <span className="ml-1 text-[10px] opacity-70 sm:text-xs">
                ({counts[opt.key]})
              </span>
            </button>
          ))}
        </motion.div>

        {/* Compatibility grid */}
        <AnimatePresence mode="popLayout">
          <motion.div
            layout
            className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 sm:gap-3 md:grid-cols-4"
          >
            {filtered.map((item, idx) => (
              <CompatCard
                key={item.profile.type}
                targetProfile={item.profile}
                level={item.level}
                index={idx}
              />
            ))}
          </motion.div>
        </AnimatePresence>

        {filtered.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-12 text-center"
          >
            <p className="text-3xl">🔍</p>
            <p className="mt-2 text-sm text-foreground/50">
              해당 궁합 등급에 해당하는 유형이 없어요
            </p>
          </motion.div>
        )}

        {/* Compatibility legend */}
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-10 rounded-3xl bg-surface p-4 shadow-sm sm:p-6"
        >
          <h3 className="mb-3 text-center text-sm font-bold sm:text-base">📋 궁합 등급 안내</h3>
          <div className="space-y-2.5">
            {(['best', 'good', 'neutral', 'bad'] as CompatibilityLevel[]).map((level) => {
              const config = COMPAT_CONFIG[level];
              return (
                <div key={level} className="flex items-center gap-3">
                  <span className="text-base">{config.emoji}</span>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold sm:text-sm">{config.label}</span>
                      <span className="text-[10px] text-foreground/50 sm:text-xs">
                        {config.description}
                      </span>
                    </div>
                    <div className="mt-1">
                      <HeartRating count={config.hearts} />
                    </div>
                  </div>
                  <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold sm:text-xs ${config.badge}`}>
                    {counts[level]}개
                  </span>
                </div>
              );
            })}
          </div>
        </motion.section>

        {/* Bottom navigation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center sm:gap-4"
        >
          <Link
            href={`/result/${profile.type.toLowerCase()}`}
            className="w-full rounded-2xl bg-gradient-to-r from-primary to-secondary px-6 py-3 text-center text-sm font-bold text-white shadow-lg shadow-primary/20 transition-transform active:scale-95 sm:w-auto"
          >
            📊 내 결과 보기
          </Link>
          <Link
            href="/encyclopedia"
            className="w-full rounded-2xl bg-foreground/5 px-6 py-3 text-center text-sm font-semibold transition-colors hover:bg-foreground/10 sm:w-auto"
          >
            📚 16유형 백과사전
          </Link>
          <Link
            href="/quiz/select"
            className="w-full rounded-2xl bg-foreground/5 px-6 py-3 text-center text-sm font-semibold transition-colors hover:bg-foreground/10 sm:w-auto"
          >
            🔄 다시 테스트하기
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
