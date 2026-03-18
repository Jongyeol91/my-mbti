'use client';

import { type ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface QuestionTransitionProps {
  /** Unique key for the current question (triggers animation) */
  questionKey: string;
  /** 1 = forward, -1 = backward */
  direction: number;
  children: ReactNode;
}

/**
 * 질문 전환 애니메이션 래퍼
 *
 * - 앞으로 진행: 오른쪽에서 슬라이드 인 + 페이드 + 스케일 업
 * - 뒤로 이동: 왼쪽에서 슬라이드 인 + 페이드 + 스케일 업
 * - 스프링 물리 기반의 자연스러운 전환
 */
const variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 120 : -120,
    opacity: 0,
    scale: 0.92,
    filter: 'blur(4px)',
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    filter: 'blur(0px)',
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -120 : 120,
    opacity: 0,
    scale: 0.92,
    filter: 'blur(4px)',
  }),
};

const transition = {
  x: { type: 'spring' as const, stiffness: 300, damping: 30, mass: 0.8 },
  opacity: { duration: 0.25, ease: 'easeOut' as const },
  scale: { type: 'spring' as const, stiffness: 400, damping: 35 },
  filter: { duration: 0.2 },
};

export default function QuestionTransition({
  questionKey,
  direction,
  children,
}: QuestionTransitionProps) {
  return (
    <AnimatePresence mode="wait" custom={direction}>
      <motion.div
        key={questionKey}
        custom={direction}
        variants={variants}
        initial="enter"
        animate="center"
        exit="exit"
        transition={transition}
        className="w-full"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
