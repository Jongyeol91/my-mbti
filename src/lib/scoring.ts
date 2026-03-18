/**
 * MBTI 점수 계산 엔진
 *
 * 확장 가능한 ScoringStrategy 패턴을 사용하여 다양한 채점 방식을 지원합니다.
 * - 기본: 1점 단순 합산 방식 (DefaultScoringStrategy)
 * - 향후: 가중치 방식, 다축 교차 방식 등 플러그 가능
 *
 * 사용 예:
 *   const engine = new ScoringEngine(); // 기본 전략 사용
 *   const engine = new ScoringEngine(new WeightedScoringStrategy()); // 커스텀 전략
 *   const result = engine.calculate(responses, 'simple');
 */

import type {
  MBTIDimension,
  MBTIPreference,
  MBTIType,
  DimensionScore,
  MBTIResult,
  ScoringStrategy,
} from '@/types/mbti';
import type { QuestionResponse } from '@/types/question';
import type { Question } from '@/types/question';
import {
  scoringConfig,
  getEffectiveWeight,
  isWeightedScoringEnabled,
  type ScoringConfig,
} from './scoring-config';

// ─── 상수 ────────────────────────────────────────────────────────────────────

/** MBTI 4축 정의: [축, 첫 번째 선호, 두 번째 선호] */
const MBTI_AXES: readonly [MBTIDimension, MBTIPreference, MBTIPreference][] = [
  ['EI', 'E', 'I'],
  ['SN', 'S', 'N'],
  ['TF', 'T', 'F'],
  ['JP', 'J', 'P'],
] as const;

/** 각 선호 지표가 속한 축 매핑 */
const PREFERENCE_TO_AXIS: Record<MBTIPreference, MBTIDimension> = {
  E: 'EI', I: 'EI',
  S: 'SN', N: 'SN',
  T: 'TF', F: 'TF',
  J: 'JP', P: 'JP',
};

/** 각 선호 지표가 축의 첫 번째(양수)인지 두 번째(음수)인지 */
const PREFERENCE_POLARITY: Record<MBTIPreference, 1 | -1> = {
  E: 1, I: -1,
  S: 1, N: -1,
  T: 1, F: -1,
  J: 1, P: -1,
};

// ─── 기본 채점 전략: 1점 단순 합산 ──────────────────────────────────────────

/**
 * 기본 1점 단순 합산 채점 전략
 *
 * 각 응답마다 선택한 선호 지표에 +1점을 부여합니다.
 * 축별 점수는 양수(첫 번째 선호 우세) 또는 음수(두 번째 선호 우세)로 표현됩니다.
 * 확신도는 해당 축의 총 응답 수 대비 편차 비율로 계산합니다.
 */
export class DefaultScoringStrategy implements ScoringStrategy {
  readonly name = 'default-1pt';

  calculateScores(answers: QuestionResponse[]): DimensionScore[] {
    // 축별 카운터 초기화
    const tallies: Record<MBTIDimension, { first: number; second: number }> = {
      EI: { first: 0, second: 0 },
      SN: { first: 0, second: 0 },
      TF: { first: 0, second: 0 },
      JP: { first: 0, second: 0 },
    };

    // 응답 집계
    for (const answer of answers) {
      const pref = answer.selectedValue;
      const axis = PREFERENCE_TO_AXIS[pref];
      if (!axis) continue;

      if (PREFERENCE_POLARITY[pref] === 1) {
        tallies[axis].first += 1;
      } else {
        tallies[axis].second += 1;
      }
    }

    // 축별 점수 생성
    return MBTI_AXES.map(([dimension]) => {
      const { first, second } = tallies[dimension];
      const total = first + second;
      const score = first - second; // 양수 = 첫 번째 선호 우세

      // 확신도: 총 응답이 0이면 0%, 아니면 편차 비율 (0~100)
      const confidence = total > 0
        ? Math.round((Math.abs(score) / total) * 100)
        : 0;

      return { dimension, score, confidence };
    });
  }

  determineType(scores: DimensionScore[]): MBTIType {
    const letters: string[] = [];

    for (const [dimension, firstPref, secondPref] of MBTI_AXES) {
      const dimScore = scores.find((s) => s.dimension === dimension);
      // score >= 0 → 첫 번째 선호 (E, S, T, J), < 0 → 두 번째 선호 (I, N, F, P)
      letters.push(dimScore && dimScore.score < 0 ? secondPref : firstPref);
    }

    return letters.join('') as MBTIType;
  }
}

// ─── 가중치 채점 전략 (스텁 - 미활성) ──────────────────────────────────────

/**
 * 가중치 기반 채점 전략 (WeightedScoringStrategy)
 *
 * 질문별 weight 필드를 반영하여 MBTI 축 점수를 계산합니다.
 * 기본 전략과 달리 모든 응답이 동일한 1점이 아니라,
 * 질문의 가중치만큼 점수가 부여됩니다.
 *
 * ⚠️ 현재 비활성 상태입니다. 활성화하려면:
 *   1. scoring-config.ts에서 useWeightedScoring: true 설정
 *   2. 질문 데이터에 weight 값 추가
 *   3. ScoringEngine 생성 시 이 전략을 주입
 *
 * @example
 *   const engine = new ScoringEngine(
 *     new WeightedScoringStrategy(questions, 'deep')
 *   );
 */
export class WeightedScoringStrategy implements ScoringStrategy {
  readonly name = 'weighted';

  private questionWeightMap: Map<string, number>;
  private config: ScoringConfig;

  /**
   * @param questions - 가중치 정보를 포함한 질문 배열
   * @param mode - 테스트 모드 (모드별 배율 적용에 사용)
   * @param config - 스코어링 설정 (기본: scoringConfig)
   */
  constructor(
    questions: Question[],
    private mode: 'simple' | 'deep' = 'simple',
    config?: ScoringConfig,
  ) {
    this.config = config ?? scoringConfig;

    // 질문 ID → 실효 가중치 맵 구축
    this.questionWeightMap = new Map();
    for (const q of questions) {
      const effectiveWeight = getEffectiveWeight(q.weight, this.mode, this.config);
      this.questionWeightMap.set(q.id, effectiveWeight);
    }
  }

  /**
   * 가중치를 반영한 축별 점수 계산
   *
   * 각 응답의 점수 기여도가 해당 질문의 가중치에 비례합니다.
   * weight=2인 질문의 응답은 weight=1인 질문보다 2배 큰 영향을 줍니다.
   */
  calculateScores(answers: QuestionResponse[]): DimensionScore[] {
    // 축별 가중치 합산 카운터
    const tallies: Record<MBTIDimension, { first: number; second: number; totalWeight: number }> = {
      EI: { first: 0, second: 0, totalWeight: 0 },
      SN: { first: 0, second: 0, totalWeight: 0 },
      TF: { first: 0, second: 0, totalWeight: 0 },
      JP: { first: 0, second: 0, totalWeight: 0 },
    };

    for (const answer of answers) {
      const pref = answer.selectedValue;
      const axis = PREFERENCE_TO_AXIS[pref];
      if (!axis) continue;

      // 질문의 가중치 조회 (맵에 없으면 기본값 사용)
      const weight = this.questionWeightMap.get(answer.questionId)
        ?? this.config.defaultWeight;

      if (PREFERENCE_POLARITY[pref] === 1) {
        tallies[axis].first += weight;
      } else {
        tallies[axis].second += weight;
      }
      tallies[axis].totalWeight += weight;
    }

    return MBTI_AXES.map(([dimension]) => {
      const { first, second, totalWeight } = tallies[dimension];
      const score = first - second;

      // 확신도: 가중치 반영 여부에 따라 계산 방식 변경
      let confidence: number;
      if (this.config.weightAffectsConfidence && totalWeight > 0) {
        // 가중치 반영: 총 가중치 대비 편차 비율
        confidence = Math.round((Math.abs(score) / totalWeight) * 100);
      } else {
        // 기본: 단순 응답 수 기반 (DefaultScoringStrategy와 동일)
        const total = first + second;
        confidence = total > 0
          ? Math.round((Math.abs(score) / total) * 100)
          : 0;
      }

      return { dimension, score, confidence };
    });
  }

  /**
   * 점수로부터 MBTI 유형 결정 (DefaultScoringStrategy와 동일 로직)
   */
  determineType(scores: DimensionScore[]): MBTIType {
    const letters: string[] = [];

    for (const [dimension, firstPref, secondPref] of MBTI_AXES) {
      const dimScore = scores.find((s) => s.dimension === dimension);
      letters.push(dimScore && dimScore.score < 0 ? secondPref : firstPref);
    }

    return letters.join('') as MBTIType;
  }
}

// ─── 스코어링 엔진 ──────────────────────────────────────────────────────────

/**
 * MBTI 스코어링 엔진
 *
 * ScoringStrategy를 주입받아 응답으로부터 MBTI 결과를 산출합니다.
 * 전략 교체를 통해 채점 방식을 쉽게 확장할 수 있습니다.
 */
export class ScoringEngine {
  private strategy: ScoringStrategy;

  constructor(strategy?: ScoringStrategy) {
    this.strategy = strategy ?? new DefaultScoringStrategy();
  }

  /** 현재 전략 교체 */
  setStrategy(strategy: ScoringStrategy): void {
    this.strategy = strategy;
  }

  /** 현재 전략 이름 반환 */
  getStrategyName(): string {
    return this.strategy.name;
  }

  /**
   * 응답 배열로부터 MBTI 결과를 계산합니다.
   *
   * @param answers - 질문 응답 배열
   * @param mode - 테스트 모드 ('simple' | 'deep')
   * @returns 완전한 MBTIResult 객체
   */
  calculate(answers: QuestionResponse[], mode: 'simple' | 'deep'): MBTIResult {
    const scores = this.strategy.calculateScores(answers);
    const type = this.strategy.determineType(scores);

    return {
      id: generateResultId(),
      type,
      scores,
      timestamp: Date.now(),
      mode,
    };
  }

  /**
   * 축별 점수만 계산합니다 (진행 중 미리보기용).
   */
  calculateScores(answers: QuestionResponse[]): DimensionScore[] {
    return this.strategy.calculateScores(answers);
  }

  /**
   * 점수로부터 MBTI 유형만 결정합니다.
   */
  determineType(scores: DimensionScore[]): MBTIType {
    return this.strategy.determineType(scores);
  }
}

// ─── 유틸리티 ────────────────────────────────────────────────────────────────

/** 결과 ID 생성 (timestamp + random suffix) */
function generateResultId(): string {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substring(2, 8);
  return `mbti-${timestamp}-${random}`;
}

// ─── 편의 함수 ──────────────────────────────────────────────────────────────

/** 싱글톤 기본 엔진 인스턴스 */
let defaultEngine: ScoringEngine | null = null;

/**
 * 기본 스코어링 엔진 인스턴스를 반환합니다.
 * 대부분의 경우 이 함수로 충분합니다.
 */
export function getDefaultEngine(): ScoringEngine {
  if (!defaultEngine) {
    defaultEngine = new ScoringEngine();
  }
  return defaultEngine;
}

/**
 * 응답으로부터 바로 MBTI 결과를 계산하는 편의 함수.
 */
export function calculateMBTIResult(
  answers: QuestionResponse[],
  mode: 'simple' | 'deep',
): MBTIResult {
  return getDefaultEngine().calculate(answers, mode);
}

// ─── 팩토리 함수 ─────────────────────────────────────────────────────────────

/**
 * 현재 설정에 따른 ScoringStrategy 인스턴스를 생성합니다.
 *
 * scoringConfig.useWeightedScoring이 true이면 WeightedScoringStrategy를,
 * 아니면 DefaultScoringStrategy를 반환합니다.
 *
 * @param questions - 가중치 스코어링 시 필요한 질문 배열
 * @param mode - 테스트 모드
 */
export function createScoringStrategy(
  questions?: Question[],
  mode?: 'simple' | 'deep',
): ScoringStrategy {
  if (isWeightedScoringEnabled() && questions && mode) {
    return new WeightedScoringStrategy(questions, mode);
  }
  return new DefaultScoringStrategy();
}

// ─── 내보내기: 상수 (외부에서 활용 가능) ─────────────────────────────────────

export { MBTI_AXES, PREFERENCE_TO_AXIS, PREFERENCE_POLARITY };

// ─── 내보내기: 설정 (재익스포트) ─────────────────────────────────────────────

export {
  scoringConfig,
  isWeightedScoringEnabled,
  getEffectiveWeight,
  type ScoringConfig,
  type ScoringStrategyType,
} from './scoring-config';
