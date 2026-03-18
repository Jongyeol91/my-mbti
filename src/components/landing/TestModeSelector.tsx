"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const modes = [
  {
    id: "simple",
    title: "간단 테스트",
    subtitle: "12문항 · 약 3분",
    description: "빠르게 알아보는 나의 MBTI",
    borderColor: "border-l-primary",
    accentColor: "text-primary",
  },
  {
    id: "deep",
    title: "심화 테스트",
    subtitle: "40문항 · 약 10분",
    description: "더 정확하고 자세한 분석",
    borderColor: "border-l-secondary",
    accentColor: "text-secondary",
  },
];

export default function TestModeSelector() {
  return (
    <div className="flex w-full flex-col gap-4 sm:flex-row">
      {modes.map((mode) => (
        <Link key={mode.id} href={`/quiz?mode=${mode.id}`} className="flex-1">
          <motion.div
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.97 }}
            className={`relative overflow-hidden rounded-2xl border border-border border-l-4 ${mode.borderColor} bg-surface p-5 shadow-sm transition-shadow hover:shadow-md`}
          >
            <div className="relative z-10">
              <h3 className="text-lg font-bold tracking-tight">{mode.title}</h3>
              <p className={`mb-1 text-xs font-semibold ${mode.accentColor}`}>
                {mode.subtitle}
              </p>
              <p className="text-sm text-foreground/60">{mode.description}</p>
            </div>
          </motion.div>
        </Link>
      ))}
    </div>
  );
}
