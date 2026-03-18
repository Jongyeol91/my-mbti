'use client';

/**
 * useQuiz - 퀴즈 세션 상태 관리 및 스코어링 엔진 통합 훅
 *
 * 각 질문 응답 시 즉시 축별 점수를 업데이트하고,
 * 모든 질문 완료 시 최종 MBTI 결과를 산출합니다.
 */

import { useState, useCallback, useRef, useMemo } from 'react';
import type { QuestionResponse, TestMode } from '@/types/question';
import type { MBTIResult, DimensionScore, MBTIDimension } from '@/types/mbti';
import { getQuestionsByMode, type Question } from '@/data/questions';
import { ScoringEngine, DefaultScoringStrategy } from '@/lib/scoring';

export interface QuizState {
  /** 현재 테스트 모드 */
  mode: TestMode;
  /** 질문 목록 */
  questions: Question[];
  /** 현재 질문 인덱스 */
  currentIndex: number;
  /** 현재 질문 */
  currentQuestion: Question | null;
  /** 누적 응답 목록 */
  responses: QuestionResponse[];
  /** 현재까지의 축별 점수 (실시간 업데이트) */
  currentScores: DimensionScore[];
  /** 퀴즈 완료 여부 */
  isComplete: boolean;
  /** 최종 결과 (완료 시에만 존재) */
  result: MBTIResult | null;
  /** 진행률 (0~100) */
  progress: number;
  /** 총 질문 수 */
  totalQuestions: number;
  /** 시작 시각 */
  startedAt: number;
  /** 축별 총 질문 수 */
  totalPerAxis: Record<MBTIDimension, number>;
  /** 축별 응답 완료 수 */
  answeredPerAxis: Record<MBTIDimension, number>;
}

export interface QuizActions {
  /** 질문에 응답 (자동으로 다음 질문으로 이동) */
  answerQuestion: (selectedValue: QuestionResponse['selectedValue']) => void;
  /** 이전 질문으로 돌아가기 (응답 취소) */
  goBack: () => void;
  /** 퀴즈 초기화 */
  reset: () => void;
  /** 결과를 localStorage에 저장 */
  saveResult: () => void;
}

function createInitialScores(): DimensionScore[] {
  return [
    { dimension: 'EI', score: 0, confidence: 0 },
    { dimension: 'SN', score: 0, confidence: 0 },
    { dimension: 'TF', score: 0, confidence: 0 },
    { dimension: 'JP', score: 0, confidence: 0 },
  ];
}

export function useQuiz(mode: TestMode): QuizState & QuizActions {
  const engineRef = useRef(new ScoringEngine(new DefaultScoringStrategy()));
  const [questions] = useState(() => getQuestionsByMode(mode));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [responses, setResponses] = useState<QuestionResponse[]>([]);
  const [currentScores, setCurrentScores] = useState<DimensionScore[]>(createInitialScores);
  const [result, setResult] = useState<MBTIResult | null>(null);
  const [startedAt] = useState(() => Date.now());

  const totalQuestions = questions.length;
  const isComplete = currentIndex >= totalQuestions;
  const currentQuestion = isComplete ? null : questions[currentIndex];
  const progress = totalQuestions > 0 ? Math.round((currentIndex / totalQuestions) * 100) : 0;

  // 축별 총 질문 수 (한 번만 계산)
  const totalPerAxis = useMemo(() => {
    const counts: Record<MBTIDimension, number> = { EI: 0, SN: 0, TF: 0, JP: 0 };
    for (const q of questions) {
      counts[q.axis]++;
    }
    return counts;
  }, [questions]);

  // 축별 응답 완료 수 (responses 변경 시 재계산)
  const answeredPerAxis = useMemo(() => {
    const counts: Record<MBTIDimension, number> = { EI: 0, SN: 0, TF: 0, JP: 0 };
    for (const r of responses) {
      const q = questions.find((q) => q.id === r.questionId);
      if (q) counts[q.axis]++;
    }
    return counts;
  }, [responses, questions]);

  const answerQuestion = useCallback(
    (selectedValue: QuestionResponse['selectedValue']) => {
      if (currentIndex >= totalQuestions) return;

      const question = questions[currentIndex];
      const responseStartTime = Date.now();

      const newResponse: QuestionResponse = {
        questionId: question.id,
        selectedValue,
        responseTime: responseStartTime - startedAt,
      };

      const updatedResponses = [...responses, newResponse];
      setResponses(updatedResponses);

      // 실시간 축별 점수 업데이트
      const engine = engineRef.current;
      const updatedScores = engine.calculateScores(updatedResponses);
      setCurrentScores(updatedScores);

      const nextIndex = currentIndex + 1;
      setCurrentIndex(nextIndex);

      // 모든 질문 완료 시 최종 결과 산출
      if (nextIndex >= totalQuestions) {
        const finalResult = engine.calculate(updatedResponses, mode);
        setResult(finalResult);
      }
    },
    [currentIndex, totalQuestions, questions, responses, startedAt, mode],
  );

  const goBack = useCallback(() => {
    if (currentIndex <= 0) return;

    const newIndex = currentIndex - 1;
    const updatedResponses = responses.slice(0, -1);

    setCurrentIndex(newIndex);
    setResponses(updatedResponses);
    setResult(null);

    // 점수 재계산
    const engine = engineRef.current;
    if (updatedResponses.length > 0) {
      setCurrentScores(engine.calculateScores(updatedResponses));
    } else {
      setCurrentScores(createInitialScores());
    }
  }, [currentIndex, responses]);

  const reset = useCallback(() => {
    setCurrentIndex(0);
    setResponses([]);
    setCurrentScores(createInitialScores());
    setResult(null);
  }, []);

  const saveResult = useCallback(() => {
    if (!result) return;

    try {
      const STORAGE_KEY = 'mbti-results';
      const existing = localStorage.getItem(STORAGE_KEY);
      const data = existing
        ? JSON.parse(existing)
        : { lastResult: null, history: [] };

      data.lastResult = result;
      data.history = [result, ...(data.history || [])].slice(0, 20); // 최대 20개 보관

      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch {
      // localStorage 접근 실패 시 무시
    }
  }, [result]);

  return {
    mode,
    questions,
    currentIndex,
    currentQuestion,
    responses,
    currentScores,
    isComplete,
    result,
    progress,
    totalQuestions,
    startedAt,
    totalPerAxis,
    answeredPerAxis,
    answerQuestion,
    goBack,
    reset,
    saveResult,
  };
}
