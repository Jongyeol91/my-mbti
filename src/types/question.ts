/**
 * MBTI 질문 관련 타입 정의
 *
 * 질문 형식:
 * - ab: A/B 양자택일 선택
 * - scenario: 시나리오 기반 (상황 설명 후 선택)
 * - swipe: Tinder 스타일 카드 스와이프
 *
 * 공통 MBTI 타입은 ./mbti.ts 에서 임포트
 */

import type { MBTIDimension, MBTIPreference } from './mbti';

// Re-export for convenience
export type { MBTIDimension, MBTIPreference };

/** 질문 유형 */
export type QuestionType = 'ab' | 'scenario' | 'swipe';

/** 테스트 모드 */
export type TestMode = 'simple' | 'deep';

/** A/B 선택지 */
export interface ABOption {
  /** 선택지 텍스트 */
  text: string;
  /** 이 선택지가 가리키는 MBTI 선호 (예: 'E' or 'I') */
  value: MBTIPreference;
}

/** 시나리오 선택지 */
export interface ScenarioOption {
  /** 선택지 텍스트 */
  text: string;
  /** 이 선택지가 가리키는 MBTI 선호 */
  value: MBTIPreference;
}

/** 스와이프 카드 질문 */
export interface SwipeContent {
  /** 카드에 표시할 문장 */
  statement: string;
  /** 카드 이모지 */
  emoji?: string;
  /** 오른쪽(동의) 스와이프 시 MBTI 선호 */
  agreeValue: MBTIPreference;
  /** 왼쪽(비동의) 스와이프 시 MBTI 선호 */
  disagreeValue: MBTIPreference;
}

/** 기본 질문 인터페이스 */
export interface BaseQuestion {
  /** 고유 ID */
  id: string;
  /** 질문이 측정하는 MBTI 축 */
  axis: MBTIDimension;
  /** 질문 유형 */
  type: QuestionType;
  /** 테스트 모드 (simple: 12문항, deep: 40문항) */
  mode: TestMode;
  /** 가중치 (기본값 1, 향후 가중치 스코어링 확장용) */
  weight?: number;
  /** 질문 카테고리 태그 (향후 확장용) */
  tags?: string[];
}

/** A/B 선택형 질문 */
export interface ABQuestion extends BaseQuestion {
  type: 'ab';
  /** 질문 텍스트 */
  question: string;
  /** A/B 두 선택지 */
  options: [ABOption, ABOption];
}

/** 시나리오 기반 질문 */
export interface ScenarioQuestion extends BaseQuestion {
  type: 'scenario';
  /** 시나리오 상황 설명 */
  scenario: string;
  /** 질문 텍스트 */
  question: string;
  /** 선택지 (2~4개) */
  options: ScenarioOption[];
}

/** 스와이프형 질문 */
export interface SwipeQuestion extends BaseQuestion {
  type: 'swipe';
  /** 스와이프 카드 내용 */
  card: SwipeContent;
}

/** 통합 질문 타입 */
export type Question = ABQuestion | ScenarioQuestion | SwipeQuestion;

/** 질문에 대한 응답 */
export interface QuestionResponse {
  questionId: string;
  selectedValue: MBTIPreference;
  /** 응답 시간 (ms, 향후 분석용) */
  responseTime?: number;
}

/** 축별 점수 */
export interface AxisScore {
  axis: MBTIDimension;
  /** 첫 번째 차원 점수 (E, S, T, J) */
  firstScore: number;
  /** 두 번째 차원 점수 (I, N, F, P) */
  secondScore: number;
  /** 백분율 (첫 번째 차원 기준, 0~100) */
  percentage: number;
}

/** 퀴즈 세션 상태 */
export interface QuizSession {
  id: string;
  mode: TestMode;
  currentIndex: number;
  responses: QuestionResponse[];
  startedAt: number;
  completedAt: number | null;
}
