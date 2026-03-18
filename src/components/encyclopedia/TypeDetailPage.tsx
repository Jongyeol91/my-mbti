'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import type { MBTITypeProfile } from '@/types/mbti';
import CompatibilitySection from '@/components/result/CompatibilitySection';
import { getMBTILetterColor, getMBTILetterCSSVar } from '@/lib/mbti-colors';

interface TypeDetailPageProps {
  profile: MBTITypeProfile;
}

const sectionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function TypeDetailPage({ profile }: TypeDetailPageProps) {
  const letters = profile.type.split('');
  const accentColor = getMBTILetterCSSVar(letters[0]);

  return (
    <div className="relative min-h-dvh bg-background">
      <div className="relative z-10 mx-auto max-w-2xl px-4 pb-20 pt-6 sm:px-6 md:px-8 lg:pt-10">
        {/* Navigation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center justify-between"
        >
          <Link
            href="/encyclopedia"
            className="inline-flex items-center gap-1 rounded-full bg-surface/80 px-3 py-1.5 text-xs font-medium text-foreground/60 backdrop-blur-sm transition-colors hover:text-foreground sm:text-sm"
          >
            ← 전체 유형
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-1 rounded-full bg-surface/80 px-3 py-1.5 text-xs font-medium text-foreground/60 backdrop-blur-sm transition-colors hover:text-foreground sm:text-sm"
          >
            홈
          </Link>
        </motion.div>

        {/* Hero */}
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mt-8 text-center sm:mt-10"
        >
          {/* Colored type letters */}
          <div className="mb-2 flex items-center justify-center gap-1 text-5xl font-black tracking-tight sm:text-6xl md:text-7xl">
            {letters.map((letter, i) => (
              <span key={i} className={getMBTILetterColor(letter)}>
                {letter}
              </span>
            ))}
          </div>

          <p className="text-lg font-bold text-foreground/80 sm:text-xl md:text-2xl">
            {profile.nickname}
          </p>
          <p className="mt-2 text-sm text-foreground/60 sm:text-base">
            {profile.summary}
          </p>

          {/* Keywords */}
          <div className="mt-4 flex flex-wrap justify-center gap-1.5 sm:gap-2">
            {profile.keywords.map((keyword) => (
              <span
                key={keyword}
                className="rounded-full bg-surface px-2.5 py-1 text-xs font-medium text-foreground/50 shadow-sm sm:text-sm"
              >
                #{keyword}
              </span>
            ))}
          </div>
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
          <SectionHeader label="성격 설명" accentColor={accentColor} />
          <div className="space-y-3 rounded-3xl bg-surface p-4 shadow-sm sm:p-6">
            {profile.description.map((para, i) => (
              <p
                key={i}
                className="text-sm leading-relaxed text-foreground/70 sm:text-base sm:leading-relaxed"
              >
                {para}
              </p>
            ))}
          </div>
        </motion.section>

        {/* Strengths & Weaknesses */}
        <motion.section
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5 }}
          className="mt-8 sm:mt-10"
        >
          <SectionHeader label="강점 & 약점" accentColor={accentColor} />
          <div className="grid gap-3 sm:grid-cols-2 sm:gap-4">
            <div className="rounded-3xl bg-emerald-50 p-4 sm:p-5">
              <h3 className="mb-3 text-sm font-bold text-emerald-700 sm:text-base">강점</h3>
              <ul className="space-y-2">
                {profile.strengthWeakness.strengths.map((s, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-emerald-800 sm:text-sm">
                    <span className="mt-0.5 shrink-0">•</span>
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-3xl bg-rose-50 p-4 sm:p-5">
              <h3 className="mb-3 text-sm font-bold text-rose-700 sm:text-base">약점</h3>
              <ul className="space-y-2">
                {profile.strengthWeakness.weaknesses.map((w, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-rose-800 sm:text-sm">
                    <span className="mt-0.5 shrink-0">•</span>
                    <span>{w}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.section>

        {/* Relationship Styles */}
        <motion.section
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5 }}
          className="mt-8 sm:mt-10"
        >
          <SectionHeader label="관계 스타일" accentColor={accentColor} />
          <div className="space-y-3">
            {[
              { label: '연애 스타일', text: profile.loveStyle },
              { label: '친구 관계', text: profile.friendshipStyle },
              { label: '직장 생활', text: profile.workStyle },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-2xl bg-surface p-4 shadow-sm sm:p-5"
              >
                <h3 className="mb-2 text-sm font-bold sm:text-base">{item.label}</h3>
                <p className="text-xs leading-relaxed text-foreground/70 sm:text-sm sm:leading-relaxed">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Careers */}
        <motion.section
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5 }}
          className="mt-8 sm:mt-10"
        >
          <SectionHeader label="추천 직업" accentColor={accentColor} />
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3 md:grid-cols-4">
            {profile.careers.map((career) => (
              <div
                key={typeof career === 'string' ? career : career.title}
                className="rounded-2xl bg-surface p-3 shadow-sm transition-shadow hover:shadow-md sm:p-4"
              >
                <p className="text-xs font-semibold sm:text-sm">
                  {typeof career === 'string' ? career : career.title}
                </p>
                {typeof career !== 'string' && career.reason && (
                  <p className="mt-1 text-[10px] leading-snug text-foreground/40 sm:text-xs">
                    {career.reason}
                  </p>
                )}
              </div>
            ))}
          </div>
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
          <SectionHeader label="같은 유형 유명인" accentColor={accentColor} />
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3">
            {profile.celebrities.map((celeb) => (
              <div
                key={celeb.name}
                className="rounded-2xl bg-surface p-3 text-center shadow-sm sm:p-4"
              >
                <p className="text-sm font-bold sm:text-base">{celeb.name}</p>
                <p className="mt-1 text-[10px] text-foreground/50 sm:text-xs">{celeb.description}</p>
              </div>
            ))}
          </div>
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
          <SectionHeader label="궁합" accentColor={accentColor} />
          <CompatibilitySection compatibility={profile.compatibility} currentType={profile.type} />
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
          <SectionHeader label="성장 조언" accentColor={accentColor} />
          <div
            className="rounded-3xl p-4 text-center shadow-sm sm:p-6"
            style={{ background: `${accentColor}12` }}
          >
            <p className="text-sm leading-relaxed text-foreground/80 sm:text-base sm:leading-relaxed">
              {profile.growthAdvice}
            </p>
          </div>
        </motion.section>

        {/* Bottom actions */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center sm:gap-4"
        >
          <Link
            href="/quiz?mode=simple"
            className="w-full rounded-2xl bg-primary px-6 py-3 text-center text-sm font-bold text-white shadow-lg shadow-primary/20 transition-opacity hover:opacity-90 active:scale-95 sm:w-auto"
          >
            나도 테스트하기
          </Link>
          <Link
            href="/encyclopedia"
            className="w-full rounded-2xl bg-foreground/5 px-6 py-3 text-center text-sm font-semibold transition-colors hover:bg-foreground/10 sm:w-auto"
          >
            다른 유형 보기
          </Link>
        </motion.div>
      </div>
    </div>
  );
}

/* ── Section Header ─────────────────────────────────── */

function SectionHeader({ label, accentColor }: { label: string; accentColor: string }) {
  return (
    <div className="mb-4 flex items-center gap-2">
      <div className="h-5 w-1 rounded-full" style={{ background: accentColor }} />
      <h2 className="text-lg font-bold sm:text-xl">{label}</h2>
    </div>
  );
}
