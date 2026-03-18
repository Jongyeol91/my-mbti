"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import MbtiPreviewCards from "./MbtiPreviewCards";
import FeatureHighlights from "./FeatureHighlights";

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const fadeInRight = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const modes = [
  {
    id: "simple",
    number: "12",
    title: "간단 테스트",
    subtitle: "약 3분 소요",
    description: "빠르게 알아보는 나의 MBTI",
    accent: "text-primary",
    hoverBorder: "border-l-primary",
  },
  {
    id: "deep",
    number: "40",
    title: "심화 테스트",
    subtitle: "약 10분 소요",
    description: "더 정확하고 자세한 분석",
    accent: "text-secondary",
    hoverBorder: "border-l-secondary",
  },
];

export default function LandingPage() {
  return (
    <div className="relative flex min-h-dvh flex-col overflow-hidden">

      {/* Hero Section */}
      <motion.section
        className="relative z-10 w-full px-5 pt-20 md:pt-28 lg:pt-32"
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
      >
        <div className="mx-auto max-w-4xl md:flex md:items-start md:justify-between md:gap-12">
          {/* Left: Hero Text */}
          <div className="md:flex-1">
            <motion.p
              variants={fadeInUp}
              className="mb-2 text-sm font-medium tracking-widest text-muted uppercase"
            >
              나의
            </motion.p>

            <motion.h1
              variants={fadeInUp}
              className="font-display text-8xl font-black leading-none tracking-tighter text-primary md:text-[10rem]"
            >
              MBTI
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="mt-4 max-w-sm text-lg font-normal text-foreground/60 md:text-xl"
            >
              재미있는 질문으로 찾는
              <br />
              진짜 나의 성격 유형
            </motion.p>

            <motion.p
              variants={fadeInUp}
              className="mt-3 text-sm text-foreground/40"
            >
              A/B 선택 · 시나리오 · 카드 스와이프까지 다양한 질문 형식
            </motion.p>
          </div>

          {/* Right: Mode Selection Cards */}
          <motion.div
            variants={staggerContainer}
            className="mt-10 flex flex-col gap-4 md:mt-4 md:w-[340px] md:shrink-0"
          >
            {modes.map((mode) => (
              <motion.div key={mode.id} variants={fadeInRight}>
                <Link href={`/quiz?mode=${mode.id}`} className="group block">
                  <motion.div
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.96 }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    className={`relative overflow-hidden rounded-lg border-l-4 border-l-transparent bg-surface p-6 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_2px_8px_rgba(0,0,0,0.03)] transition-shadow duration-300 ease-out hover:shadow-[0_4px_16px_rgba(0,0,0,0.08),0_1px_3px_rgba(0,0,0,0.06)] ${mode.hoverBorder}`}
                  >
                    {/* Large number as visual anchor */}
                    <span className="font-display absolute -top-2 right-4 text-7xl font-black text-foreground/[0.04] select-none">
                      {mode.number}
                    </span>

                    <div className="relative z-10">
                      <h3 className="font-display text-xl font-bold tracking-tight">
                        {mode.title}
                      </h3>
                      <p className={`mt-0.5 text-xs font-semibold ${mode.accent}`}>
                        {mode.number}문항 · {mode.subtitle}
                      </p>
                      <p className="mt-1.5 text-sm text-foreground/55">
                        {mode.description}
                      </p>
                    </div>
                  </motion.div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* MBTI Preview Cards */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={staggerContainer}
        className="relative z-10 mt-24 w-full px-5 md:mt-32"
      >
        <div className="mx-auto max-w-4xl">
          <motion.h2
            variants={fadeInUp}
            className="font-display mb-1 text-2xl font-bold tracking-tight md:text-3xl"
          >
            16가지 성격 유형
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="mb-8 text-sm text-foreground/50"
          >
            나는 어떤 유형일까? 테스트하고 확인해보세요
          </motion.p>
          <motion.div variants={fadeInUp}>
            <MbtiPreviewCards />
          </motion.div>
        </div>
      </motion.section>

      {/* Feature Highlights */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={staggerContainer}
        className="relative z-10 mt-20 w-full px-5 md:mt-28"
      >
        <div className="mx-auto max-w-4xl">
          <motion.div variants={fadeInUp}>
            <FeatureHighlights />
          </motion.div>
        </div>
      </motion.section>

      {/* Bottom CTA - Full width warm band */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
        className="relative z-10 mt-24 w-full md:mt-32"
      >
        <div className="bg-primary/[0.07] px-5 py-16 md:py-20">
          <div className="mx-auto max-w-4xl text-center">
            <p className="font-display text-3xl font-bold tracking-tight md:text-4xl">
              준비되셨나요?
            </p>
            <p className="mt-3 text-foreground/60">
              지금 바로 나의 성격 유형을 알아보세요
            </p>
            <Link
              href="/quiz/select"
              className="mt-8 inline-block rounded-xl bg-primary px-10 py-4 font-display text-lg font-bold text-white shadow-sm transition-shadow duration-200 hover:bg-primary-hover hover:shadow-md active:scale-[0.96]"
            >
              테스트 시작하기 →
            </Link>
          </div>
        </div>
      </motion.section>

      {/* Encyclopedia Link */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
        className="relative z-10 py-12 text-center"
      >
        <Link
          href="/encyclopedia"
          className="text-sm font-medium text-foreground/50 underline decoration-foreground/20 underline-offset-4 transition-colors hover:text-primary"
        >
          16가지 유형 백과사전 보기
        </Link>
      </motion.div>
    </div>
  );
}
