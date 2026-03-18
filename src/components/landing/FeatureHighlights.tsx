"use client";

import { motion } from "framer-motion";

const features = [
  { label: "다양한 질문", detail: "A/B · 시나리오 · 스와이프" },
  { label: "4축 분석", detail: "E/I · S/N · T/F · J/P" },
  { label: "궁합 & 관계", detail: "찰떡궁합부터 도전 궁합까지" },
  { label: "16유형 백과", detail: "유명인 · 직업 · 성격 특성" },
];

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.35 },
  }),
};

export default function FeatureHighlights() {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
      {features.map((f, i) => (
        <motion.div
          key={f.label}
          custom={i}
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="rounded-lg border border-border/60 px-4 py-3 text-center"
        >
          <p className="text-sm font-semibold text-foreground/70">{f.label}</p>
          <p className="mt-0.5 text-xs text-foreground/35">{f.detail}</p>
        </motion.div>
      ))}
    </div>
  );
}
