'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import type { MBTITypeProfile, DimensionScore } from '@/types/mbti';
import DimensionChart from './DimensionChart';
import CompatibilitySection from './CompatibilitySection';
import ShareSection from './ShareSection';
import PersonalityTraitsChart from './PersonalityTraitsChart';
import CharacteristicsCards from './CharacteristicsCards';
import StrengthWeaknessSection from './StrengthWeaknessSection';
import CelebritySection from './CelebritySection';
import CareerRecommendationsSection from './CareerRecommendationsSection';
import { Icon } from '@/components/ui/Icon';

interface ResultPageProps {
  profile: MBTITypeProfile;
  scores?: DimensionScore[];
  mode?: 'simple' | 'deep';
  isLoaded?: boolean;
}

const sectionVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

/** Type reveal animation: letters appear one by one */
function TypeRevealAnimation({ type, gradient }: { type: string; gradient: [string, string] }) {
  return (
    <div className="mb-2 flex items-center justify-center gap-1 sm:gap-2">
      {type.split('').map((letter, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 30, scale: 0.3, rotateX: -90 }}
          animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
          transition={{
            delay: 0.6 + i * 0.12,
            duration: 0.5,
            type: 'spring',
            stiffness: 200,
            damping: 15,
          }}
          className="text-4xl font-black tracking-tight sm:text-5xl md:text-6xl"
          style={{
            background: `linear-gradient(135deg, ${gradient[0]}, ${gradient[1]})`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          {letter}
        </motion.span>
      ))}
    </div>
  );
}

/** Confetti particle component - uses colored dots instead of emoji */
function ConfettiParticles() {
  const [particles] = useState(() =>
    Array.from({ length: 30 }).map((_, i) => ({
      id: i,
      color: ['#f472b6', '#fbbf24', '#a78bfa', '#34d399', '#60a5fa', '#fb7185', '#818cf8', '#2dd4bf'][i % 8],
      x: Math.random() * 100,
      delay: Math.random() * 0.8,
      duration: Math.random() * 2 + 2.5,
      rotate: Math.random() * 720 - 360,
      scale: Math.random() * 0.5 + 0.5,
    }))
  );

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          initial={{
            x: `${p.x}vw`,
            y: -20,
            rotate: 0,
            scale: p.scale,
          }}
          animate={{
            y: '110vh',
            rotate: p.rotate,
          }}
          exit={{ opacity: 0 }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            ease: 'linear',
          }}
          className="absolute h-2.5 w-2.5 rounded-full sm:h-3 sm:w-3"
          style={{ backgroundColor: p.color }}
        />
      ))}
    </div>
  );
}

/** Loading skeleton while result data loads */
function LoadingSkeleton() {
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center gap-4 bg-background px-4">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 2, ease: 'linear' }}
        className="text-5xl"
      >
        🔮
      </motion.div>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-lg font-bold text-foreground/60"
      >
        결과를 불러오는 중...
      </motion.p>
      <div className="flex gap-1.5">
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            animate={{ scale: [1, 1.3, 1], opacity: [0.3, 1, 0.3] }}
            transition={{ repeat: Infinity, duration: 1, delay: i * 0.2 }}
            className="h-2.5 w-2.5 rounded-full bg-primary/50"
          />
        ))}
      </div>
    </div>
  );
}

export default function ResultPage({ profile, scores, mode, isLoaded = true }: ResultPageProps) {
  const [showConfetti, setShowConfetti] = useState(true);
  const [revealStage, setRevealStage] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setShowConfetti(false), 4000);
    return () => clearTimeout(timer);
  }, []);

  // Staged reveal animation
  useEffect(() => {
    const timers = [
      setTimeout(() => setRevealStage(1), 200),
      setTimeout(() => setRevealStage(2), 600),
      setTimeout(() => setRevealStage(3), 1200),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  // Default scores if not provided (for direct URL access)
  const displayScores: DimensionScore[] = scores ?? [
    { dimension: 'EI', score: profile.type[0] === 'E' ? 3 : -3, confidence: 75 },
    { dimension: 'SN', score: profile.type[1] === 'S' ? 3 : -3, confidence: 75 },
    { dimension: 'TF', score: profile.type[2] === 'T' ? 3 : -3, confidence: 75 },
    { dimension: 'JP', score: profile.type[3] === 'J' ? 3 : -3, confidence: 75 },
  ];

  if (!isLoaded) {
    return <LoadingSkeleton />;
  }

  return (
    <div className="relative min-h-dvh bg-background">
      {/* Confetti animation */}
      <AnimatePresence>
        {showConfetti && <ConfettiParticles />}
      </AnimatePresence>

      {/* Background gradient with fade-in */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.1 }}
        transition={{ duration: 1.5 }}
        className="absolute inset-0"
        style={{
          background: `linear-gradient(135deg, ${profile.gradient[0]}, ${profile.gradient[1]})`,
        }}
      />

      {/* Decorative floating orbs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
          transition={{ repeat: Infinity, duration: 8, ease: 'easeInOut' }}
          className="absolute -left-20 top-1/4 h-40 w-40 rounded-full opacity-5 sm:h-60 sm:w-60"
          style={{ background: profile.gradient[0] }}
        />
        <motion.div
          animate={{ x: [0, -20, 0], y: [0, 30, 0] }}
          transition={{ repeat: Infinity, duration: 10, ease: 'easeInOut' }}
          className="absolute -right-20 top-2/3 h-48 w-48 rounded-full opacity-5 sm:h-72 sm:w-72"
          style={{ background: profile.gradient[1] }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-2xl px-4 pb-24 pt-8 sm:px-6 md:px-8 lg:pt-12">
        {/* Back button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Link
            href="/"
            className="inline-flex items-center gap-1 rounded-full bg-surface/80 px-3 py-1.5 text-xs font-medium text-foreground/60 backdrop-blur-sm transition-colors hover:text-foreground sm:text-sm"
          >
            ← 홈으로
          </Link>
        </motion.div>

        {/* Hero: Staged type reveal */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="mt-6 text-center sm:mt-8"
        >
          {/* Type badge reveal with spring bounce */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={revealStage >= 1 ? { scale: 1, rotate: 0 } : {}}
            transition={{ type: 'spring', stiffness: 200, damping: 12 }}
            className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-2xl text-2xl font-black text-white sm:h-20 sm:w-20 sm:text-3xl md:h-24 md:w-24 md:text-4xl"
            style={{
              background: `linear-gradient(135deg, ${profile.gradient[0]}, ${profile.gradient[1]})`,
            }}
          >
            {profile.type.slice(0, 2)}
          </motion.div>

          {/* Type label and name - staged reveal */}
          <AnimatePresence>
            {revealStage >= 2 && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.1 }}
                  className="mb-1 text-sm font-medium text-foreground/50 sm:text-base"
                >
                  당신의 MBTI 유형은
                </motion.p>

                {/* Letter-by-letter type reveal */}
                <TypeRevealAnimation type={profile.type} gradient={profile.gradient} />

                <motion.p
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.1 }}
                  className="text-lg font-bold text-foreground/80 sm:text-xl md:text-2xl"
                >
                  {profile.nickname}
                </motion.p>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.3 }}
                  className="mt-2 text-sm text-foreground/60 sm:text-base"
                >
                  {profile.summary}
                </motion.p>
              </motion.div>
            )}
          </AnimatePresence>

          {mode && revealStage >= 3 && (
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: 'spring', stiffness: 300 }}
              className="mt-3 inline-block rounded-full bg-foreground/5 px-3 py-1 text-xs text-foreground/40"
            >
              {mode === 'simple' ? '간단 모드 (12문항)' : '심화 모드 (40문항)'}
            </motion.span>
          )}
        </motion.section>

        {/* Keywords with staggered pill animation */}
        <motion.section
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5 }}
          className="mt-8 sm:mt-10"
        >
          <div className="flex flex-wrap justify-center gap-2">
            {profile.keywords.map((keyword, i) => (
              <motion.span
                key={keyword}
                initial={{ opacity: 0, scale: 0.5, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{
                  delay: 1.4 + i * 0.06,
                  type: 'spring',
                  stiffness: 300,
                  damping: 20,
                }}
                whileHover={{ scale: 1.1, y: -2 }}
                className="rounded-full bg-surface px-3 py-1 text-xs font-medium text-foreground/60 shadow-sm transition-shadow hover:shadow-md sm:text-sm"
              >
                #{keyword}
              </motion.span>
            ))}
          </div>
        </motion.section>

        {/* Dimension scores */}
        <motion.section
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5 }}
          className="mt-8 sm:mt-10"
        >
          <h2 className="mb-4 flex items-center justify-center gap-1.5 text-lg font-bold sm:text-xl"><Icon name="chart" size={20} /> 성격 차원 분석</h2>
          <div className="rounded-3xl bg-surface p-4 shadow-sm sm:p-6">
            <DimensionChart scores={displayScores} />
          </div>
          {scores && (
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="mt-2 text-center text-[10px] text-foreground/30 sm:text-xs"
            >
              * 실제 테스트 응답 기반 분석 결과입니다
            </motion.p>
          )}
        </motion.section>

        {/* Description */}
        <motion.section
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5 }}
          className="mt-8 sm:mt-10"
        >
          <h2 className="mb-4 text-center text-lg font-bold sm:text-xl">📝 상세 설명</h2>
          <div className="overflow-hidden rounded-3xl bg-surface shadow-sm">
            <div
              className="h-1.5 w-full"
              style={{
                background: `linear-gradient(90deg, ${profile.gradient[0]}, ${profile.gradient[1]})`,
              }}
            />
            <div className="space-y-3 p-4 sm:p-6">
              {profile.description.map((para, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.12, duration: 0.4 }}
                  className="text-sm leading-relaxed text-foreground/70 sm:text-base sm:leading-relaxed"
                >
                  {i === 0 && (
                    <span
                      className="mr-1 text-2xl font-black leading-none sm:text-3xl"
                      style={{ color: profile.gradient[0] }}
                    >
                      {profile.type[0]}
                    </span>
                  )}
                  {para}
                </motion.p>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Personality Characteristics */}
        <motion.section
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5 }}
          className="mt-8 sm:mt-10"
        >
          <h2 className="mb-4 text-center text-lg font-bold sm:text-xl">🧩 성격 특성</h2>
          <CharacteristicsCards type={profile.type} />
        </motion.section>

        {/* Personality Traits Chart */}
        <motion.section
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5 }}
          className="mt-8 sm:mt-10"
        >
          <h2 className="mb-4 flex items-center justify-center gap-1.5 text-lg font-bold sm:text-xl"><Icon name="trending" size={20} /> 성격 수치 분석</h2>
          <div className="rounded-3xl bg-surface p-4 shadow-sm sm:p-6">
            <PersonalityTraitsChart type={profile.type} />
          </div>
        </motion.section>

        {/* Strengths & Weaknesses (Enhanced) */}
        <motion.section
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5 }}
          className="mt-8 sm:mt-10"
        >
          <h2 className="mb-4 flex items-center justify-center gap-1.5 text-lg font-bold sm:text-xl"><Icon name="strength" size={20} /> 강점 & 약점</h2>
          <StrengthWeaknessSection
            data={profile.strengthWeakness}
            gradient={profile.gradient}
          />
        </motion.section>

        {/* Love / Friendship / Work styles */}
        <motion.section
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5 }}
          className="mt-8 sm:mt-10"
        >
          <h2 className="mb-4 flex items-center justify-center gap-1.5 text-lg font-bold sm:text-xl"><Icon name="heart" size={20} /> 관계 스타일</h2>
          <div className="space-y-3">
            {[
              { icon: 'heart' as const, label: '연애 스타일', text: profile.loveStyle },
              { icon: 'users' as const, label: '친구 관계', text: profile.friendshipStyle },
            ].map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 16, scale: 0.98 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
                className="rounded-2xl bg-surface p-4 shadow-sm sm:p-5"
              >
                <h3 className="mb-2 flex items-center gap-1.5 text-sm font-bold sm:text-base">
                  <Icon name={item.icon} size={16} /> {item.label}
                </h3>
                <p className="text-xs leading-relaxed text-foreground/70 sm:text-sm sm:leading-relaxed">
                  {item.text}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Career Recommendations */}
        <motion.section
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5 }}
          className="mt-8 sm:mt-10"
        >
          <h2 className="mb-4 flex items-center justify-center gap-1.5 text-lg font-bold sm:text-xl"><Icon name="briefcase" size={20} /> 커리어 추천</h2>
          <CareerRecommendationsSection
            careers={profile.careers}
            workStyle={profile.workStyle}
            type={profile.type}
            gradient={profile.gradient}
          />
        </motion.section>

        {/* Celebrities */}
        <motion.section
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5 }}
          className="mt-8 sm:mt-10"
        >
          <h2 className="mb-4 flex items-center justify-center gap-1.5 text-lg font-bold sm:text-xl"><Icon name="star" size={20} /> 같은 유형 유명인</h2>
          <CelebritySection celebrities={profile.celebrities} gradient={profile.gradient} />
        </motion.section>

        {/* Compatibility */}
        <motion.section
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5 }}
          className="mt-8 sm:mt-10"
        >
          <h2 className="mb-4 text-center text-lg font-bold sm:text-xl">💞 궁합</h2>
          <CompatibilitySection compatibility={profile.compatibility} currentType={profile.type} />
          <div className="mt-4 text-center">
            <Link
              href={`/compatibility/${profile.type.toLowerCase()}`}
              className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-4 py-2 text-xs font-semibold text-primary transition-colors hover:bg-primary/20 sm:text-sm"
            >
              💞 전체 궁합 비교 보기 →
            </Link>
          </div>
        </motion.section>

        {/* Growth advice */}
        <motion.section
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5 }}
          className="mt-8 sm:mt-10"
        >
          <h2 className="mb-4 text-center text-lg font-bold sm:text-xl">🌱 성장 조언</h2>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-3xl p-4 text-center shadow-sm sm:p-6"
            style={{
              background: `linear-gradient(135deg, ${profile.gradient[0]}15, ${profile.gradient[1]}15)`,
            }}
          >
            <p className="text-sm leading-relaxed text-foreground/80 sm:text-base sm:leading-relaxed">
              {profile.growthAdvice}
            </p>
          </motion.div>
        </motion.section>

        {/* Share */}
        <motion.section
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-8 sm:mt-10"
        >
          <h2 className="mb-4 text-center text-lg font-bold sm:text-xl">📤 결과 공유하기</h2>
          <ShareSection type={profile.type} nickname={profile.nickname} />
        </motion.section>

        {/* Bottom navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.5 }}
          className="mt-12 flex flex-col items-center gap-3 sm:flex-row sm:justify-center sm:gap-4"
        >
          <Link
            href="/quiz/select"
            className="w-full rounded-2xl bg-gradient-to-r from-primary to-secondary px-6 py-3 text-center text-sm font-bold text-white shadow-lg shadow-primary/20 transition-transform active:scale-95 sm:w-auto"
          >
            🔄 다시 테스트하기
          </Link>
          <Link
            href={`/compatibility?type=${profile.type}`}
            className="w-full rounded-2xl bg-gradient-to-r from-pink-400 to-rose-400 px-6 py-3 text-center text-sm font-bold text-white shadow-lg shadow-pink-200/40 transition-transform active:scale-95 sm:w-auto"
          >
            💞 궁합 비교하기
          </Link>
          <Link
            href="/encyclopedia"
            className="w-full rounded-2xl bg-foreground/5 px-6 py-3 text-center text-sm font-semibold transition-colors hover:bg-foreground/10 sm:w-auto"
          >
            📚 16유형 백과사전
          </Link>
          <Link
            href={`/encyclopedia/${profile.type.toLowerCase()}`}
            className="w-full rounded-2xl bg-foreground/5 px-6 py-3 text-center text-sm font-semibold transition-colors hover:bg-foreground/10 sm:w-auto"
          >
            🔍 {profile.type} 자세히 보기
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
