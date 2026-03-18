'use client';

import { motion } from 'framer-motion';
import type { CareerInfo, MBTIType } from '@/types/mbti';

interface CareerRecommendationsSectionProps {
  careers: CareerInfo[] | string[];
  workStyle: string;
  type: MBTIType;
  gradient: [string, string];
}

/** Work environment preferences derived from MBTI dimensions */
function getWorkEnvironmentPreferences(type: MBTIType): {
  emoji: string;
  label: string;
  description: string;
}[] {
  const prefs: { emoji: string; label: string; description: string }[] = [];

  // E/I axis - social environment
  if (type[0] === 'E') {
    prefs.push(
      { emoji: '👥', label: '협업 중심', description: '팀 프로젝트와 브레인스토밍을 즐기는 환경' },
      { emoji: '🗣️', label: '소통 활발', description: '회의와 토론이 자유로운 개방적 분위기' },
    );
  } else {
    prefs.push(
      { emoji: '🎧', label: '집중 환경', description: '독립적으로 깊이 몰입할 수 있는 공간' },
      { emoji: '📝', label: '자율 근무', description: '재택근무나 유연한 근무 형태를 선호' },
    );
  }

  // S/N axis - work approach
  if (type[1] === 'S') {
    prefs.push(
      { emoji: '📋', label: '체계적 프로세스', description: '명확한 업무 절차와 매뉴얼이 있는 환경' },
      { emoji: '🎯', label: '구체적 목표', description: '실질적이고 측정 가능한 성과 기준' },
    );
  } else {
    prefs.push(
      { emoji: '💡', label: '창의적 자유', description: '새로운 아이디어를 실험하고 혁신할 수 있는 곳' },
      { emoji: '🚀', label: '비전 지향', description: '미래를 만들어가는 도전적인 프로젝트' },
    );
  }

  // T/F axis - decision culture
  if (type[2] === 'T') {
    prefs.push(
      { emoji: '📊', label: '성과 기반', description: '객관적 데이터와 실력으로 평가받는 문화' },
      { emoji: '⚡', label: '효율 추구', description: '불필요한 절차 없이 빠르게 실행하는 조직' },
    );
  } else {
    prefs.push(
      { emoji: '💛', label: '따뜻한 문화', description: '서로를 존중하고 배려하는 팀 분위기' },
      { emoji: '🌱', label: '성장 지원', description: '구성원의 발전과 웰빙을 중시하는 조직' },
    );
  }

  // J/P axis - structure preference
  if (type[3] === 'J') {
    prefs.push(
      { emoji: '📅', label: '계획적 운영', description: '일정과 마감이 명확하게 관리되는 환경' },
      { emoji: '✅', label: '안정적 구조', description: '역할과 책임이 분명한 체계적 조직' },
    );
  } else {
    prefs.push(
      { emoji: '🎨', label: '유연한 환경', description: '상황에 따라 자유롭게 적응할 수 있는 곳' },
      { emoji: '🔄', label: '다양한 경험', description: '새로운 프로젝트와 역할을 시도할 기회' },
    );
  }

  return prefs;
}

/** Career category mapping for visual grouping */
function getCareerCategory(type: MBTIType): { icon: string; label: string } {
  const dim = `${type[1]}${type[2]}` as 'ST' | 'SF' | 'NT' | 'NF';
  switch (dim) {
    case 'ST': return { icon: '🔧', label: '실용/관리 분야' };
    case 'SF': return { icon: '🤗', label: '봉사/지원 분야' };
    case 'NT': return { icon: '🧪', label: '전략/분석 분야' };
    case 'NF': return { icon: '✨', label: '창의/성장 분야' };
  }
}

const cardVariants = {
  hidden: { opacity: 0, scale: 0.85, y: 10 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      delay: i * 0.05,
      type: 'spring' as const,
      stiffness: 200,
      damping: 20,
    },
  }),
};

const prefVariants = {
  hidden: { opacity: 0, x: -16 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: i * 0.08,
      duration: 0.4,
    },
  }),
};

export default function CareerRecommendationsSection({
  careers,
  workStyle,
  type,
  gradient,
}: CareerRecommendationsSectionProps) {
  const category = getCareerCategory(type);
  const workPrefs = getWorkEnvironmentPreferences(type);

  return (
    <div className="space-y-6">
      {/* Career category badge */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="flex items-center justify-center"
      >
        <span
          className="inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-bold sm:text-sm"
          style={{
            background: `linear-gradient(135deg, ${gradient[0]}20, ${gradient[1]}20)`,
            color: gradient[0],
          }}
        >
          {category.icon} {category.label}에서 빛나는 유형
        </span>
      </motion.div>

      {/* Career cards grid */}
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3 md:grid-cols-4">
        {careers.map((career, i) => {
          const isDetailed = typeof career !== 'string';
          const title = isDetailed ? career.title : career;
          const emoji = isDetailed ? career.emoji : '💼';
          const reason = isDetailed ? career.reason : null;

          return (
            <motion.div
              key={title}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              whileHover={{ scale: 1.05, y: -3 }}
              className="group relative cursor-default overflow-hidden rounded-2xl bg-surface p-3 shadow-sm transition-shadow hover:shadow-md sm:p-4"
            >
              {/* Gradient accent on hover */}
              <div
                className="absolute inset-x-0 top-0 h-0.5 opacity-0 transition-opacity group-hover:opacity-100"
                style={{
                  background: `linear-gradient(90deg, ${gradient[0]}, ${gradient[1]})`,
                }}
              />
              <div className="mb-1.5 text-xl sm:text-2xl">{emoji}</div>
              <p className="text-xs font-semibold leading-tight sm:text-sm">{title}</p>
              {reason && (
                <motion.p
                  initial={{ opacity: 0, height: 0 }}
                  whileInView={{ opacity: 1, height: 'auto' }}
                  viewport={{ once: true }}
                  className="mt-1 text-[10px] leading-snug text-foreground/50 sm:text-xs"
                >
                  {reason}
                </motion.p>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Work style summary */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="rounded-2xl bg-surface p-4 shadow-sm sm:p-5"
      >
        <h3 className="mb-2 text-sm font-bold sm:text-base">💼 직장 생활 스타일</h3>
        <p className="text-xs leading-relaxed text-foreground/70 sm:text-sm sm:leading-relaxed">
          {workStyle}
        </p>
      </motion.div>

      {/* Work Environment Preferences */}
      <div className="rounded-3xl bg-surface p-4 shadow-sm sm:p-6">
        <h3 className="mb-4 text-center text-sm font-bold sm:text-base">
          🏢 이상적인 근무 환경
        </h3>
        <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 sm:gap-3">
          {workPrefs.map((pref, i) => (
            <motion.div
              key={pref.label}
              custom={i}
              variants={prefVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              whileHover={{ x: 4 }}
              className="flex items-start gap-3 rounded-xl bg-background/60 p-3 transition-colors hover:bg-background/80"
            >
              <span className="mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg text-base sm:h-9 sm:w-9 sm:text-lg"
                style={{
                  background: `linear-gradient(135deg, ${gradient[0]}15, ${gradient[1]}15)`,
                }}
              >
                {pref.emoji}
              </span>
              <div className="min-w-0">
                <p className="text-xs font-bold sm:text-sm">{pref.label}</p>
                <p className="mt-0.5 text-[10px] leading-snug text-foreground/50 sm:text-xs sm:leading-snug">
                  {pref.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Fun tip based on type */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="rounded-2xl p-3 text-center sm:p-4"
        style={{
          background: `linear-gradient(135deg, ${gradient[0]}10, ${gradient[1]}10)`,
        }}
      >
        <p className="text-[10px] text-foreground/50 sm:text-xs">
          💡 <span className="font-semibold">{type}</span> 유형은 자신의 강점을 살릴 수 있는 환경에서 최고의 성과를 발휘해요!
        </p>
      </motion.div>
    </div>
  );
}
