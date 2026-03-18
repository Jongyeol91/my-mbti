"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const modes = [
  {
    id: "simple" as const,
    title: "간단 테스트",
    count: "12문항",
    time: "약 3분",
    desc: "핵심 질문으로 빠르게 알아보는 나의 MBTI",
  },
  {
    id: "deep" as const,
    title: "심화 테스트",
    count: "40문항",
    time: "약 10분",
    desc: "다양한 형식의 질문으로 정밀하게 분석",
    recommended: true,
  },
];

const comparisons = [
  { label: "문항 수", simple: "12문항", deep: "40문항" },
  { label: "소요 시간", simple: "약 3분", deep: "약 10분" },
  { label: "질문 형식", simple: "A/B 선택", deep: "A/B + 시나리오 + 스와이프" },
  { label: "결과 분석", simple: "기본 유형", deep: "상세 분석" },
];

export default function ModeSelectionPage() {
  return (
    <div className="flex min-h-dvh flex-col items-center px-5 pb-24 pt-16 md:pt-24">
      <motion.div
        className="flex w-full max-w-lg flex-col items-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="mb-1 text-xl font-bold tracking-tight sm:text-2xl">
          테스트 모드 선택
        </h1>
        <p className="mb-8 text-sm text-foreground/40">
          나에게 맞는 테스트를 골라보세요
        </p>

        {/* Mode Cards */}
        <div className="flex w-full flex-col gap-3">
          {modes.map((mode, i) => (
            <Link key={mode.id} href={`/quiz?mode=${mode.id}`}>
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.35 }}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.96 }}
                className="group relative rounded-lg bg-surface p-5 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_2px_8px_rgba(0,0,0,0.03)] transition-shadow duration-300 hover:shadow-[0_4px_16px_rgba(0,0,0,0.08),0_1px_3px_rgba(0,0,0,0.06)]"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-base font-bold">{mode.title}</h2>
                      {mode.recommended && (
                        <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold text-primary">
                          추천
                        </span>
                      )}
                    </div>
                    <p className="mt-1 text-sm text-foreground/50">{mode.desc}</p>
                  </div>
                  <span className="font-display text-3xl font-black text-foreground/[0.06] select-none">
                    {mode.count.replace("문항", "")}
                  </span>
                </div>

                <div className="mt-3 flex gap-3 text-xs text-foreground/40">
                  <span>{mode.count}</span>
                  <span>·</span>
                  <span>{mode.time}</span>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>

        {/* Comparison */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.4 }}
          className="mt-8 w-full"
        >
          <h3 className="mb-3 text-sm font-semibold text-foreground/50">
            비교
          </h3>

          <div className="overflow-hidden rounded-lg border border-border">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-border bg-surface-alt/60">
                  <th className="px-3 py-2 text-left font-medium text-foreground/40" />
                  <th className="px-3 py-2 text-center font-medium text-foreground/50">간단</th>
                  <th className="px-3 py-2 text-center font-medium text-foreground/50">심화</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60">
                {comparisons.map((row) => (
                  <tr key={row.label}>
                    <td className="px-3 py-2 text-foreground/45">{row.label}</td>
                    <td className="px-3 py-2 text-center text-foreground/55">{row.simple}</td>
                    <td className="px-3 py-2 text-center text-foreground/55">{row.deep}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="mt-3 text-center text-xs text-foreground/30">
            시간이 없다면 간단 모드, 정확한 결과를 원한다면 심화 모드를 추천합니다
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-6"
        >
          <Link
            href="/"
            className="text-sm text-foreground/30 transition-colors hover:text-foreground/60"
          >
            ← 메인으로
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}
