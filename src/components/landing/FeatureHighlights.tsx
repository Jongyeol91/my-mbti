"use client";

import { motion } from "framer-motion";

const features = [
  {
    emoji: "🎯",
    title: "다양한 질문 형식",
    description: "A/B 선택, 시나리오, 카드 스와이프 등 지루할 틈 없는 테스트",
  },
  {
    emoji: "📊",
    title: "정확한 분석",
    description: "4가지 축을 기반으로 한 체계적인 성격 유형 분석",
  },
  {
    emoji: "💕",
    title: "궁합 & 관계",
    description: "나와 찰떡궁합인 유형, 주의할 유형까지 한눈에 확인",
  },
  {
    emoji: "📚",
    title: "유형 백과사전",
    description: "16가지 유형별 상세 설명, 유명인, 추천 직업 정보",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -16 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.4, ease: "easeOut" as const },
  },
};

export default function FeatureHighlights() {
  return (
    <motion.div
      className="flex flex-col gap-4"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-30px" }}
    >
      <h2 className="mb-2 text-center text-xl font-bold tracking-tight">
        이런 점이 특별해요
      </h2>
      {features.map((feature) => (
        <motion.div
          key={feature.title}
          variants={itemVariants}
          className="flex items-start gap-4 rounded-2xl bg-surface p-4 shadow-sm"
        >
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-surface-alt text-2xl">
            {feature.emoji}
          </span>
          <div>
            <h3 className="font-bold">{feature.title}</h3>
            <p className="text-sm text-foreground/60">{feature.description}</p>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
