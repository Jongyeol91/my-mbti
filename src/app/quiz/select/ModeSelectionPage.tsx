"use client";

import { motion } from "framer-motion";
import Link from "next/link";

interface ModeInfo {
  id: "simple" | "deep";
  title: string;
  subtitle: string;
  duration: string;
  questionCount: number;
  description: string;
  features: string[];
  borderColor: string;
  recommended?: boolean;
}

const modes: ModeInfo[] = [
  {
    id: "simple",
    title: "간단 테스트",
    subtitle: "가볍게 알아보기",
    duration: "약 3분",
    questionCount: 12,
    description:
      "빠르고 간편하게 나의 MBTI 유형을 알아봐요! 핵심 질문 12개로 성격 유형을 파악합니다.",
    features: [
      "3분이면 충분해요",
      "핵심 질문만 쏙쏙",
      "가볍게 즐기기 좋아요",
    ],
    borderColor: "border-energy-e",
  },
  {
    id: "deep",
    title: "심화 테스트",
    subtitle: "정밀 분석하기",
    duration: "약 10분",
    questionCount: 40,
    description:
      "40개의 다양한 질문으로 더 정확하고 자세한 성격 분석을 받아보세요!",
    features: [
      "정밀한 축별 분석",
      "시나리오 + 스와이프 질문",
      "상세한 결과 리포트",
    ],
    borderColor: "border-info-n",
    recommended: true,
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94] as const,
    },
  },
};

export default function ModeSelectionPage() {
  return (
    <div className="relative flex min-h-dvh flex-col items-center px-5 pb-24 pt-12 md:pt-20">
      {/* Background decorations */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-32 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-primary/8 blur-3xl" />
        <div className="absolute top-1/3 -right-32 h-[400px] w-[400px] rounded-full bg-secondary/8 blur-3xl" />
        <div className="absolute bottom-0 -left-32 h-[400px] w-[400px] rounded-full bg-mint/8 blur-3xl" />
      </div>

      <motion.div
        className="relative z-10 flex w-full max-w-2xl flex-col items-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header */}
        <motion.h1
          variants={itemVariants}
          className="mb-2 text-center text-2xl font-extrabold tracking-tight sm:text-3xl"
        >
          테스트 모드를 선택해주세요
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="mb-10 text-center text-sm text-foreground/50 sm:text-base"
        >
          나에게 맞는 테스트로 MBTI 유형을 알아보세요
        </motion.p>

        {/* Mode Cards */}
        <div className="flex w-full flex-col gap-5 sm:flex-row sm:gap-6">
          {modes.map((mode) => (
            <motion.div
              key={mode.id}
              variants={cardVariants}
              className="flex-1"
            >
              <Link href={`/quiz?mode=${mode.id}`} className="block">
                <motion.div
                  whileHover={{ y: -6, scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  className={`group relative overflow-hidden rounded-3xl bg-white border-l-4 ${mode.borderColor} shadow-lg transition-shadow hover:shadow-2xl`}
                >
                  {/* Recommended Badge */}
                  {mode.recommended && (
                    <div className="absolute right-3 top-3 z-20 rounded-full bg-primary px-3 py-1 text-xs font-bold text-white shadow-md">
                      추천
                    </div>
                  )}

                  {/* Card content */}
                  <div className="relative p-5 sm:p-6">
                    {/* Title */}
                    <div className="relative z-10">
                      <div className="mb-3">
                        <h2 className="text-xl font-extrabold">
                          {mode.title}
                        </h2>
                        <p className="text-xs font-medium text-foreground/50">
                          {mode.subtitle}
                        </p>
                      </div>

                      {/* Stats */}
                      <div className="mb-4 flex gap-3">
                        <div className="flex items-center gap-1.5 rounded-full bg-foreground/5 px-3 py-1.5">
                          <span className="text-xs font-semibold text-foreground/70">
                            {mode.questionCount}문항
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5 rounded-full bg-foreground/5 px-3 py-1.5">
                          <span className="text-xs font-semibold text-foreground/70">
                            {mode.duration}
                          </span>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="mb-4 text-sm leading-relaxed text-foreground/60">
                        {mode.description}
                      </p>

                      {/* Features */}
                      <ul className="mb-5 space-y-2">
                        {mode.features.map((feature, idx) => (
                          <motion.li
                            key={idx}
                            className="text-sm text-foreground/70"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.5 + idx * 0.1 }}
                          >
                            {feature}
                          </motion.li>
                        ))}
                      </ul>

                      {/* CTA Button */}
                      <div
                        className="rounded-2xl bg-primary p-3 text-center font-bold text-white shadow-md transition-shadow group-hover:shadow-lg"
                      >
                        {mode.title} 시작하기
                      </div>
                    </div>
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Comparison section */}
        <motion.div
          variants={itemVariants}
          className="mt-10 w-full rounded-2xl bg-surface/80 p-5 shadow-sm backdrop-blur-sm sm:p-6"
        >
          <h3 className="mb-4 text-center text-base font-bold">
            🤔 어떤 모드를 선택해야 할까?
          </h3>

          <div className="overflow-hidden rounded-xl border border-foreground/5">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-foreground/5 bg-foreground/[0.02]">
                  <th className="px-3 py-2.5 text-left font-semibold text-foreground/50">
                    비교 항목
                  </th>
                  <th className="px-3 py-2.5 text-center font-semibold text-energy-e">
                    간단
                  </th>
                  <th className="px-3 py-2.5 text-center font-semibold text-info-n">
                    심화
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-foreground/5">
                <ComparisonRow
                  label="문항 수"
                  simple="12문항"
                  deep="40문항"
                />
                <ComparisonRow
                  label="소요 시간"
                  simple="약 3분"
                  deep="약 10분"
                />
                <ComparisonRow
                  label="정확도"
                  simple="⭐⭐⭐"
                  deep="⭐⭐⭐⭐⭐"
                />
                <ComparisonRow
                  label="질문 형식"
                  simple="A/B 선택"
                  deep="A/B + 시나리오 + 스와이프"
                />
                <ComparisonRow
                  label="결과 분석"
                  simple="기본 유형"
                  deep="상세 분석"
                />
              </tbody>
            </table>
          </div>

          <p className="mt-3 text-center text-xs text-foreground/40">
            💡 시간이 없다면 간단 모드를, 정확한 결과를 원한다면 심화 모드를
            추천해요!
          </p>
        </motion.div>

        {/* Back link */}
        <motion.div variants={itemVariants} className="mt-8">
          <Link
            href="/"
            className="text-sm font-medium text-foreground/40 transition-colors hover:text-primary"
          >
            ← 메인으로 돌아가기
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}

function ComparisonRow({
  label,
  simple,
  deep,
}: {
  label: string;
  simple: string;
  deep: string;
}) {
  return (
    <tr>
      <td className="px-3 py-2.5 font-medium text-foreground/60">{label}</td>
      <td className="px-3 py-2.5 text-center text-foreground/70">{simple}</td>
      <td className="px-3 py-2.5 text-center text-foreground/70">{deep}</td>
    </tr>
  );
}
