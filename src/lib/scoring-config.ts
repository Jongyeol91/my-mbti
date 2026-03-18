/**
 * 스코어링 설정 (Scoring Configuration)
 *
 * 채점 방식을 전환하기 위한 설정 파일입니다.
 * 현재는 기본 1점 합산 방식만 활성화되어 있으며,
 * 향후 가중치 방식, 다축 교차 방식 등으로 확장할 수 있습니다.
 *
 * 사용 방법:
 *   import { scoringConfig } from '@/lib/scoring-config';
 *   if (scoringConfig.useWeightedScoring) { ... }
 */

import type { TestMode } from '@/types/question';

// ─── 채점 전략 유형 ─────────────────────────────────────────────────────────

/** 사용 가능한 채점 전략 이름 */
export type ScoringStrategyType = 'default' | 'weighted';

// ─── 설정 인터페이스 ────────────────────────────────────────────────────────

export interface ScoringConfig {
  /**
   * 활성화할 채점 전략 유형
   * - 'default': 1점 단순 합산 (현재 활성)
   * - 'weighted': 질문별 가중치 반영 (미활성 - 향후 사용)
   */
  activeStrategy: ScoringStrategyType;

  /**
   * 가중치 스코어링 사용 여부 (편의 토글)
   * activeStrategy === 'weighted'와 동기화됩니다.
   */
  useWeightedScoring: boolean;

  /**
   * 가중치 미설정 질문의 기본 가중치 값
   * question.weight가 undefined일 때 이 값을 사용합니다.
   */
  defaultWeight: number;

  /**
   * 테스트 모드별 가중치 배율
   * deep 모드에서 특정 질문에 더 높은 가중치를 부여할 수 있습니다.
   */
  modeWeightMultiplier: Record<TestMode, number>;

  /**
   * 확신도 계산 시 가중치 반영 여부
   * true: 가중치가 높은 응답이 확신도에 더 큰 영향
   * false: 모든 응답이 동일한 확신도 기여
   */
  weightAffectsConfidence: boolean;
}

// ─── 기본 설정값 ────────────────────────────────────────────────────────────

/**
 * 현재 활성 스코어링 설정
 *
 * ⚠️ useWeightedScoring을 true로 변경하면 WeightedScoringStrategy가 활성화됩니다.
 * 현재는 비활성 상태이며, 기본 1점 합산 방식이 사용됩니다.
 */
export const scoringConfig: Readonly<ScoringConfig> = {
  activeStrategy: 'default',
  useWeightedScoring: false,
  defaultWeight: 1,
  modeWeightMultiplier: {
    simple: 1.0,
    deep: 1.0,
  },
  weightAffectsConfidence: false,
} as const;

// ─── 설정 헬퍼 ──────────────────────────────────────────────────────────────

/**
 * 질문의 실효 가중치를 계산합니다.
 *
 * @param questionWeight - 질문에 설정된 가중치 (undefined이면 기본값 사용)
 * @param mode - 테스트 모드
 * @param config - 스코어링 설정 (기본: scoringConfig)
 * @returns 실효 가중치 값
 */
export function getEffectiveWeight(
  questionWeight: number | undefined,
  mode: TestMode,
  config: ScoringConfig = scoringConfig,
): number {
  const baseWeight = questionWeight ?? config.defaultWeight;
  const multiplier = config.modeWeightMultiplier[mode];
  return baseWeight * multiplier;
}

/**
 * 현재 설정이 가중치 스코어링을 사용하는지 확인합니다.
 */
export function isWeightedScoringEnabled(
  config: ScoringConfig = scoringConfig,
): boolean {
  return config.useWeightedScoring && config.activeStrategy === 'weighted';
}
