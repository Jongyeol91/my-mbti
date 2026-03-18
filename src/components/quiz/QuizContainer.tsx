'use client';

import { useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import type { TestMode, ABQuestion, ScenarioQuestion, SwipeQuestion } from '@/types/question';
import { useQuiz } from '@/hooks/useQuiz';
import ProgressBar from './ProgressBar';
import AxisProgressIndicator from './AxisProgressIndicator';
import LiveScorePreview from './LiveScorePreview';
import ABQuestionCard from './ABQuestionCard';
import ScenarioQuestionCard from './ScenarioQuestionCard';
import SwipeQuestionCard from './SwipeQuestionCard';
import QuestionTransition from './QuestionTransition';

interface QuizContainerProps {
  mode: TestMode;
}

/** 축 색상 점 매핑 */
const AXIS_DOT: Record<string, string> = {
  EI: 'bg-energy-e',
  SN: 'bg-info-s',
  TF: 'bg-decision-t',
  JP: 'bg-lifestyle-j',
};

const AXIS_LABEL: Record<string, string> = {
  EI: '에너지 방향',
  SN: '인식 방식',
  TF: '판단 방식',
  JP: '생활 방식',
};

/** 질문 유형 라벨 */
const TYPE_BADGE: Record<string, { label: string; color: string }> = {
  ab: { label: 'A/B 선택', color: 'bg-primary/15 text-primary' },
  scenario: { label: '시나리오', color: 'bg-info-n/15 text-info-n' },
  swipe: { label: '스와이프', color: 'bg-decision-t/15 text-decision-t' },
};

/** 질문 메타 정보 (축 + 유형 배지) 애니메이션 */
const metaVariants = {
  initial: { opacity: 0, y: -10, scale: 0.85 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: 10, scale: 0.85 },
};

export default function QuizContainer({ mode }: QuizContainerProps) {
  const router = useRouter();
  const quiz = useQuiz(mode);
  const directionRef = useRef(1); // 1 = forward, -1 = backward

  // 방향 추적
  const handleAnswer = useCallback(
    (value: Parameters<typeof quiz.answerQuestion>[0]) => {
      directionRef.current = 1;
      quiz.answerQuestion(value);
    },
    [quiz.answerQuestion],
  );

  const handleGoBack = useCallback(() => {
    if (quiz.currentIndex > 0) {
      directionRef.current = -1;
      quiz.goBack();
    } else {
      router.back();
    }
  }, [quiz.currentIndex, quiz.goBack, router]);

  // 완료 시 결과를 저장하고 결과 페이지로 이동
  useEffect(() => {
    if (quiz.isComplete && quiz.result) {
      quiz.saveResult();

      // 짧은 딜레이 후 결과 페이지로 이동
      const timer = setTimeout(() => {
        router.push(`/result/${quiz.result!.type}?id=${quiz.result!.id}`);
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, [quiz.isComplete, quiz.result, quiz.saveResult, router]);

  // 완료 화면 (결과 페이지 전환 전 짧은 로딩)
  if (quiz.isComplete) {
    return (
      <div className="min-h-dvh flex flex-col items-center justify-center gap-4 px-4">
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15 }}
          className="text-6xl sm:text-7xl"
        >
          🎉
        </motion.div>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-xl sm:text-2xl font-bold text-foreground"
        >
          분석 중이에요...
        </motion.p>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex gap-1"
        >
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              animate={{ y: [0, -8, 0] }}
              transition={{
                repeat: Infinity,
                duration: 0.6,
                delay: i * 0.15,
                ease: 'easeInOut',
              }}
              className="w-2.5 h-2.5 rounded-full bg-primary/60"
            />
          ))}
        </motion.div>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-foreground/60 text-sm sm:text-base"
        >
          당신의 성격 유형을 알아보고 있어요!
        </motion.p>
        {quiz.result && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8, type: 'spring', stiffness: 200 }}
            className="mt-4 text-4xl sm:text-5xl font-black bg-gradient-to-r from-primary to-secondary
                       bg-clip-text text-transparent"
          >
            {quiz.result.type}
          </motion.div>
        )}
      </div>
    );
  }

  const { currentQuestion } = quiz;
  if (!currentQuestion) return null;

  const badge = TYPE_BADGE[currentQuestion.type];
  const axisDot = AXIS_DOT[currentQuestion.axis] ?? '';
  const axisLabel = AXIS_LABEL[currentQuestion.axis] ?? '';

  return (
    <div className="min-h-dvh flex flex-col bg-background">
      {/* 헤더: 뒤로 버튼 + 테스트 모드 + 프로그레스 바 */}
      <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-md border-b border-primary/10">
        <div className="flex items-center justify-between px-4 py-2">
          <button
            onClick={handleGoBack}
            className="text-foreground/60 hover:text-foreground transition-colors p-2 -ml-2
                       cursor-pointer flex items-center gap-1 text-sm sm:text-base"
            aria-label="뒤로 가기"
          >
            <span className="text-lg">←</span>
            <span className="hidden sm:inline">뒤로</span>
          </button>
          <span className="text-sm font-medium text-foreground/50">
            {mode === 'simple' ? '간단 테스트' : '심화 테스트'}
          </span>
          <div className="w-12" /> {/* spacer */}
        </div>
        <ProgressBar
          current={quiz.currentIndex + 1}
          total={quiz.totalQuestions}
          progress={quiz.progress}
          axis={currentQuestion.axis as 'EI' | 'SN' | 'TF' | 'JP'}
        />
      </div>

      {/* 심화 모드: 축별 진행도 표시 */}
      {mode === 'deep' && currentQuestion && (
        <div className="pt-3 pb-1">
          <AxisProgressIndicator
            answeredPerAxis={quiz.answeredPerAxis}
            totalPerAxis={quiz.totalPerAxis}
            currentAxis={currentQuestion.axis}
          />
        </div>
      )}

      {/* 질문 메타 정보 (축 + 유형 배지) — 질문 전환 시 함께 애니메이션 */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`meta-${currentQuestion.id}`}
          variants={metaVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{
            type: 'spring',
            stiffness: 400,
            damping: 30,
            mass: 0.6,
          }}
          className="flex items-center justify-center gap-2 pt-4 pb-1 px-4"
        >
          <span className="text-xs sm:text-sm text-foreground/40 flex items-center gap-1.5">
            <span className={`inline-block w-2 h-2 rounded-full ${axisDot}`} />
            <span>{axisLabel}</span>
          </span>
          <span className="text-foreground/20">·</span>
          <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${badge.color}`}>
            {badge.label}
          </span>
        </motion.div>
      </AnimatePresence>

      {/* 질문 영역: 한 문제씩 표시 — 슬라이드 + 페이드 + 스케일 전환 */}
      <div className="flex-1 flex flex-col items-center justify-center py-4 sm:py-8 overflow-hidden">
        <QuestionTransition
          questionKey={currentQuestion.id}
          direction={directionRef.current}
        >
          {currentQuestion.type === 'ab' && (
            <ABQuestionCard
              question={currentQuestion as unknown as ABQuestion}
              onAnswer={handleAnswer}
            />
          )}
          {currentQuestion.type === 'scenario' && (
            <ScenarioQuestionCard
              question={currentQuestion as unknown as ScenarioQuestion}
              onAnswer={handleAnswer}
            />
          )}
          {currentQuestion.type === 'swipe' && (
            <SwipeQuestionCard
              question={currentQuestion as unknown as SwipeQuestion}
              onAnswer={handleAnswer}
            />
          )}
        </QuestionTransition>
      </div>

      {/* 실시간 점수 미리보기 */}
      <div className="pb-6 sm:pb-8">
        <LiveScorePreview scores={quiz.currentScores} />
      </div>
    </div>
  );
}
