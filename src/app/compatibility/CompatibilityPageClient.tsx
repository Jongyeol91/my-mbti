'use client';

import { useState, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { getProfile, ALL_TYPES } from '@/lib/profiles';
import type { MBTIType, CompatibilityLevel } from '@/types/mbti';

const COMPAT_LABEL: Record<CompatibilityLevel, { emoji: string; label: string; color: string; bg: string }> = {
  best: { emoji: '💖', label: '최고의 궁합', color: 'text-pink-600', bg: 'bg-pink-50 border-pink-200' },
  good: { emoji: '💛', label: '좋은 궁합', color: 'text-amber-600', bg: 'bg-amber-50 border-amber-200' },
  neutral: { emoji: '🤝', label: '보통 궁합', color: 'text-slate-600', bg: 'bg-slate-50 border-slate-200' },
  bad: { emoji: '⚡', label: '안 맞는 궁합', color: 'text-purple-600', bg: 'bg-purple-50 border-purple-200' },
};

function getCompatLevel(myType: MBTIType, otherType: MBTIType): CompatibilityLevel {
  const profile = getProfile(myType);
  if (!profile) return 'neutral';
  const { compatibility } = profile;
  if (compatibility.best.includes(otherType)) return 'best';
  if (compatibility.good.includes(otherType)) return 'good';
  if (compatibility.bad.includes(otherType)) return 'bad';
  return 'neutral';
}

function TypeSelector({
  label,
  value,
  onChange,
  gradient,
}: {
  label: string;
  value: MBTIType | null;
  onChange: (type: MBTIType) => void;
  gradient?: [string, string];
}) {
  const [isOpen, setIsOpen] = useState(false);
  const profile = value ? getProfile(value) : null;

  return (
    <div className="flex-1">
      <p className="mb-2 text-center text-xs font-semibold text-foreground/50">{label}</p>
      <motion.button
        whileTap={{ scale: 0.97 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-full rounded-2xl border-2 border-foreground/10 bg-surface p-3 text-center transition-colors hover:border-primary/30 sm:p-4"
        style={
          gradient
            ? { borderColor: gradient[0] + '60' }
            : undefined
        }
      >
        {profile ? (
          <div>
            <span className="text-2xl sm:text-3xl">{profile.emoji}</span>
            <p
              className="mt-1 text-lg font-black sm:text-xl"
              style={
                gradient
                  ? {
                      background: `linear-gradient(135deg, ${gradient[0]}, ${gradient[1]})`,
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }
                  : undefined
              }
            >
              {value}
            </p>
            <p className="text-xs text-foreground/50">{profile.nickname}</p>
          </div>
        ) : (
          <div className="py-2">
            <span className="text-2xl">🎭</span>
            <p className="mt-1 text-sm font-medium text-foreground/40">유형 선택</p>
          </div>
        )}
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-2 overflow-hidden rounded-2xl border border-foreground/10 bg-surface shadow-lg"
          >
            <div className="grid grid-cols-4 gap-1 p-2">
              {ALL_TYPES.map((type) => {
                const p = getProfile(type);
                const isSelected = type === value;
                return (
                  <motion.button
                    key={type}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      onChange(type);
                      setIsOpen(false);
                    }}
                    className={`rounded-xl p-1.5 text-center transition-colors sm:p-2 ${
                      isSelected
                        ? 'bg-primary/10 ring-2 ring-primary/40'
                        : 'hover:bg-foreground/5'
                    }`}
                  >
                    <span className="text-sm sm:text-base">{p?.emoji || '🎭'}</span>
                    <p className="text-[10px] font-bold sm:text-xs">{type}</p>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function CompatibilityPageClient() {
  const searchParams = useSearchParams();
  const initialType = (searchParams.get('type')?.toUpperCase() as MBTIType) || null;

  const [myType, setMyType] = useState<MBTIType | null>(
    initialType && ALL_TYPES.includes(initialType) ? initialType : null
  );
  const [otherType, setOtherType] = useState<MBTIType | null>(null);

  const myProfile = myType ? getProfile(myType) : null;
  const otherProfile = otherType ? getProfile(otherType) : null;

  const compatLevel = useMemo(() => {
    if (!myType || !otherType) return null;
    return getCompatLevel(myType, otherType);
  }, [myType, otherType]);

  const compatInfo = compatLevel ? COMPAT_LABEL[compatLevel] : null;

  const sharedDimensions = useMemo(() => {
    if (!myType || !otherType) return [];
    const dims = ['E/I', 'S/N', 'T/F', 'J/P'];
    return dims.map((dim, i) => ({
      dim,
      myPref: myType[i],
      otherPref: otherType[i],
      match: myType[i] === otherType[i],
    }));
  }, [myType, otherType]);

  return (
    <div className="relative min-h-dvh bg-background">
      <div className="relative z-10 mx-auto max-w-2xl px-4 pb-24 pt-8 sm:px-6 md:px-8 lg:pt-12">
        {/* Back button */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
          <Link
            href={myType ? `/result/${myType.toLowerCase()}` : '/'}
            className="inline-flex items-center gap-1 rounded-full bg-surface/80 px-3 py-1.5 text-xs font-medium text-foreground/60 backdrop-blur-sm transition-colors hover:text-foreground sm:text-sm"
          >
            ← {myType ? '결과로 돌아가기' : '홈으로'}
          </Link>
        </motion.div>

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-6 text-center sm:mt-8"
        >
          <h1 className="text-2xl font-black sm:text-3xl">💞 MBTI 궁합 비교</h1>
          <p className="mt-2 text-sm text-foreground/50">두 유형의 궁합을 확인해보세요!</p>
        </motion.div>

        {/* Type Selectors */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-8 flex items-start gap-3 sm:gap-4"
        >
          <TypeSelector
            label="나의 유형"
            value={myType}
            onChange={setMyType}
            gradient={myProfile?.gradient}
          />
          <div className="flex flex-col items-center pt-8">
            <motion.span
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ repeat: Infinity, duration: 2, repeatDelay: 1 }}
              className="text-2xl"
            >
              💕
            </motion.span>
          </div>
          <TypeSelector
            label="상대 유형"
            value={otherType}
            onChange={setOtherType}
            gradient={otherProfile?.gradient}
          />
        </motion.div>

        {/* Compatibility Result */}
        <AnimatePresence mode="wait">
          {myType && otherType && compatInfo && (
            <motion.div
              key={`${myType}-${otherType}`}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              transition={{ duration: 0.4 }}
              className="mt-8 space-y-6"
            >
              {/* Main result card */}
              <div className={`rounded-3xl border-2 p-6 text-center sm:p-8 ${compatInfo.bg}`}>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 300, delay: 0.2 }}
                  className="text-5xl sm:text-6xl"
                >
                  {compatInfo.emoji}
                </motion.div>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className={`mt-3 text-xl font-black sm:text-2xl ${compatInfo.color}`}
                >
                  {compatInfo.label}
                </motion.p>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="mt-2 text-sm text-foreground/60"
                >
                  {myProfile?.emoji} {myType} × {otherProfile?.emoji} {otherType}
                </motion.p>
              </div>

              {/* Dimension comparison */}
              <div className="rounded-3xl bg-surface p-4 shadow-sm sm:p-6">
                <h3 className="mb-4 text-center text-sm font-bold sm:text-base">🔍 차원별 비교</h3>
                <div className="space-y-3">
                  {sharedDimensions.map((d, i) => (
                    <motion.div
                      key={d.dim}
                      initial={{ opacity: 0, x: -16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + i * 0.1 }}
                      className="flex items-center gap-3"
                    >
                      <span className="w-10 text-xs font-bold text-foreground/40 sm:text-sm">{d.dim}</span>
                      <div className="flex flex-1 items-center justify-between rounded-xl bg-foreground/5 px-3 py-2">
                        <span
                          className={`text-sm font-bold sm:text-base ${
                            d.match ? 'text-green-600' : 'text-foreground/70'
                          }`}
                        >
                          {d.myPref}
                        </span>
                        <span className="text-xs">{d.match ? '✅ 같음' : '🔄 다름'}</span>
                        <span
                          className={`text-sm font-bold sm:text-base ${
                            d.match ? 'text-green-600' : 'text-foreground/70'
                          }`}
                        >
                          {d.otherPref}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  className="mt-4 text-center text-xs text-foreground/40"
                >
                  {sharedDimensions.filter((d) => d.match).length}개 차원 일치 / {sharedDimensions.filter((d) => !d.match).length}개 차원 상이
                </motion.p>
              </div>

              {/* Style comparison */}
              {myProfile && otherProfile && (
                <div className="space-y-3">
                  <h3 className="text-center text-sm font-bold sm:text-base">💬 관계 스타일 비교</h3>
                  {[
                    { emoji: '❤️', label: '연애', myText: myProfile.loveStyle, otherText: otherProfile.loveStyle },
                    { emoji: '🤝', label: '우정', myText: myProfile.friendshipStyle, otherText: otherProfile.friendshipStyle },
                    { emoji: '💼', label: '직장', myText: myProfile.workStyle, otherText: otherProfile.workStyle },
                  ].map((item, i) => (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 + i * 0.15 }}
                      className="rounded-2xl bg-surface p-4 shadow-sm sm:p-5"
                    >
                      <h4 className="mb-3 text-center text-xs font-bold sm:text-sm">
                        {item.emoji} {item.label} 스타일
                      </h4>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="rounded-xl bg-foreground/5 p-3">
                          <p className="mb-1 text-center text-[10px] font-bold text-foreground/40 sm:text-xs">
                            {myProfile.emoji} {myType}
                          </p>
                          <p className="text-[11px] leading-relaxed text-foreground/60 sm:text-xs">
                            {item.myText}
                          </p>
                        </div>
                        <div className="rounded-xl bg-foreground/5 p-3">
                          <p className="mb-1 text-center text-[10px] font-bold text-foreground/40 sm:text-xs">
                            {otherProfile.emoji} {otherType}
                          </p>
                          <p className="text-[11px] leading-relaxed text-foreground/60 sm:text-xs">
                            {item.otherText}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}

              {/* Links to individual profiles */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="flex flex-col items-center gap-3 pt-4 sm:flex-row sm:justify-center"
              >
                <Link
                  href={`/encyclopedia/${myType.toLowerCase()}`}
                  className="w-full rounded-2xl bg-foreground/5 px-5 py-3 text-center text-sm font-semibold transition-colors hover:bg-foreground/10 sm:w-auto"
                >
                  🔍 {myType} 자세히 보기
                </Link>
                <Link
                  href={`/encyclopedia/${otherType.toLowerCase()}`}
                  className="w-full rounded-2xl bg-foreground/5 px-5 py-3 text-center text-sm font-semibold transition-colors hover:bg-foreground/10 sm:w-auto"
                >
                  🔍 {otherType} 자세히 보기
                </Link>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Prompt when no selection */}
        {(!myType || !otherType) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-12 text-center"
          >
            <p className="text-4xl">👆</p>
            <p className="mt-2 text-sm text-foreground/40">
              위에서 두 유형을 선택하면 궁합 결과를 볼 수 있어요!
            </p>
          </motion.div>
        )}

        {/* Bottom nav */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-12 flex flex-col items-center gap-3 sm:flex-row sm:justify-center sm:gap-4"
        >
          <Link
            href="/quiz/select"
            className="w-full rounded-2xl bg-gradient-to-r from-primary to-secondary px-6 py-3 text-center text-sm font-bold text-white shadow-lg shadow-primary/20 transition-transform active:scale-95 sm:w-auto"
          >
            🔄 테스트하기
          </Link>
          <Link
            href="/encyclopedia"
            className="w-full rounded-2xl bg-foreground/5 px-6 py-3 text-center text-sm font-semibold transition-colors hover:bg-foreground/10 sm:w-auto"
          >
            📚 16유형 백과사전
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
