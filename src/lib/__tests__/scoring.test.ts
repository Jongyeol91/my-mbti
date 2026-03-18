/**
 * MBTI 점수 계산 엔진 단위 테스트
 *
 * 엣지 케이스:
 * - 동점 (tied scores) → 첫 번째 선호(E,S,T,J)로 결정
 * - 모든 응답이 한쪽인 경우 (all-one-side)
 * - 혼합 응답 (mixed answers)
 * - simple 모드 (12문항) 및 deep 모드 (40문항)
 * - 빈 응답
 * - WeightedScoringStrategy 기본 검증
 */

import { describe, it, expect } from 'vitest';
import {
  DefaultScoringStrategy,
  WeightedScoringStrategy,
  ScoringEngine,
  calculateMBTIResult,
  MBTI_AXES,
} from '../scoring';
import type { QuestionResponse } from '@/types/question';
import type { DimensionScore, MBTIType, MBTIDimension } from '@/types/mbti';

// ─── 헬퍼 함수 ────────────────────────────────────────────────────────────

/** 특정 선호 지표로 N개의 응답을 생성 */
function makeResponses(
  ...specs: [string, number][]
): QuestionResponse[] {
  const responses: QuestionResponse[] = [];
  let idx = 0;
  for (const [value, count] of specs) {
    for (let i = 0; i < count; i++) {
      responses.push({
        questionId: `q${idx++}`,
        selectedValue: value as QuestionResponse['selectedValue'],
      });
    }
  }
  return responses;
}

/** simple 모드용 12개 응답 생성 (축당 3문항) */
function makeSimpleResponses(ei: string, sn: string, tf: string, jp: string): QuestionResponse[] {
  return makeResponses(
    [ei, 3],
    [sn, 3],
    [tf, 3],
    [jp, 3],
  );
}

/** deep 모드용 40개 응답 생성 (축당 10문항) */
function makeDeepResponses(ei: string, sn: string, tf: string, jp: string): QuestionResponse[] {
  return makeResponses(
    [ei, 10],
    [sn, 10],
    [tf, 10],
    [jp, 10],
  );
}

/** 축당 mixed 응답 생성: firstCount는 첫 번째 선호, 나머지는 두 번째 선호 */
function makeMixedAxisResponses(
  eiE: number, eiTotal: number,
  snS: number, snTotal: number,
  tfT: number, tfTotal: number,
  jpJ: number, jpTotal: number,
): QuestionResponse[] {
  return makeResponses(
    ['E', eiE], ['I', eiTotal - eiE],
    ['S', snS], ['N', snTotal - snS],
    ['T', tfT], ['F', tfTotal - tfT],
    ['J', jpJ], ['P', jpTotal - jpJ],
  );
}

function getScore(scores: DimensionScore[], dim: MBTIDimension): DimensionScore {
  return scores.find(s => s.dimension === dim)!;
}

// ─── DefaultScoringStrategy 테스트 ──────────────────────────────────────

describe('DefaultScoringStrategy', () => {
  const strategy = new DefaultScoringStrategy();

  describe('determineType (유형 결정)', () => {
    it('점수 > 0이면 첫 번째 선호 선택 (E, S, T, J)', () => {
      const scores: DimensionScore[] = [
        { dimension: 'EI', score: 2, confidence: 67 },
        { dimension: 'SN', score: 4, confidence: 100 },
        { dimension: 'TF', score: 1, confidence: 33 },
        { dimension: 'JP', score: 6, confidence: 100 },
      ];
      expect(strategy.determineType(scores)).toBe('ESTJ');
    });

    it('점수 < 0이면 두 번째 선호 선택 (I, N, F, P)', () => {
      const scores: DimensionScore[] = [
        { dimension: 'EI', score: -2, confidence: 67 },
        { dimension: 'SN', score: -1, confidence: 33 },
        { dimension: 'TF', score: -3, confidence: 100 },
        { dimension: 'JP', score: -5, confidence: 100 },
      ];
      expect(strategy.determineType(scores)).toBe('INFP');
    });

    it('동점 (score === 0)이면 첫 번째 선호로 결정 (E, S, T, J)', () => {
      const scores: DimensionScore[] = [
        { dimension: 'EI', score: 0, confidence: 0 },
        { dimension: 'SN', score: 0, confidence: 0 },
        { dimension: 'TF', score: 0, confidence: 0 },
        { dimension: 'JP', score: 0, confidence: 0 },
      ];
      expect(strategy.determineType(scores)).toBe('ESTJ');
    });

    it('일부 축만 동점인 경우 혼합 결과', () => {
      const scores: DimensionScore[] = [
        { dimension: 'EI', score: 0, confidence: 0 },  // tied → E
        { dimension: 'SN', score: -2, confidence: 67 }, // N
        { dimension: 'TF', score: 0, confidence: 0 },   // tied → T
        { dimension: 'JP', score: -1, confidence: 33 },  // P
      ];
      expect(strategy.determineType(scores)).toBe('ENTP');
    });
  });

  describe('calculateScores (점수 계산)', () => {
    it('빈 응답이면 모든 점수와 확신도가 0', () => {
      const scores = strategy.calculateScores([]);
      expect(scores).toHaveLength(4);
      for (const s of scores) {
        expect(s.score).toBe(0);
        expect(s.confidence).toBe(0);
      }
    });

    it('모든 응답이 E, S, T, J → 모두 양수', () => {
      const answers = makeSimpleResponses('E', 'S', 'T', 'J');
      const scores = strategy.calculateScores(answers);

      expect(getScore(scores, 'EI').score).toBe(3);
      expect(getScore(scores, 'SN').score).toBe(3);
      expect(getScore(scores, 'TF').score).toBe(3);
      expect(getScore(scores, 'JP').score).toBe(3);
    });

    it('모든 응답이 I, N, F, P → 모두 음수', () => {
      const answers = makeSimpleResponses('I', 'N', 'F', 'P');
      const scores = strategy.calculateScores(answers);

      expect(getScore(scores, 'EI').score).toBe(-3);
      expect(getScore(scores, 'SN').score).toBe(-3);
      expect(getScore(scores, 'TF').score).toBe(-3);
      expect(getScore(scores, 'JP').score).toBe(-3);
    });

    it('확신도: 한쪽으로 완전히 치우치면 100%', () => {
      const answers = makeSimpleResponses('E', 'S', 'T', 'J');
      const scores = strategy.calculateScores(answers);

      for (const s of scores) {
        expect(s.confidence).toBe(100);
      }
    });

    it('확신도: 동점이면 0%', () => {
      // 축당 2문항씩, 각 축에서 1:1
      const answers = makeMixedAxisResponses(1, 2, 1, 2, 1, 2, 1, 2);
      const scores = strategy.calculateScores(answers);

      for (const s of scores) {
        expect(s.confidence).toBe(0);
      }
    });

    it('확신도: 3문항 중 2:1이면 33%', () => {
      const answers = makeMixedAxisResponses(2, 3, 2, 3, 2, 3, 2, 3);
      const scores = strategy.calculateScores(answers);

      for (const s of scores) {
        expect(s.confidence).toBe(33); // Math.round(1/3 * 100)
      }
    });

    it('deep 모드 40문항: 축당 10문항에서 7:3 → score = 4, confidence = 40%', () => {
      const answers = makeMixedAxisResponses(7, 10, 7, 10, 7, 10, 7, 10);
      const scores = strategy.calculateScores(answers);

      for (const s of scores) {
        expect(s.score).toBe(4); // 7 - 3
        expect(s.confidence).toBe(40); // Math.round(4/10 * 100)
      }
    });
  });

  describe('전체 유형 결정 (calculateScores → determineType)', () => {
    it('all E, S, T, J → ESTJ', () => {
      const answers = makeDeepResponses('E', 'S', 'T', 'J');
      const scores = strategy.calculateScores(answers);
      expect(strategy.determineType(scores)).toBe('ESTJ');
    });

    it('all I, N, F, P → INFP', () => {
      const answers = makeDeepResponses('I', 'N', 'F', 'P');
      const scores = strategy.calculateScores(answers);
      expect(strategy.determineType(scores)).toBe('INFP');
    });

    it('혼합: E, N, F, J → ENFJ', () => {
      const answers = makeDeepResponses('E', 'N', 'F', 'J');
      const scores = strategy.calculateScores(answers);
      expect(strategy.determineType(scores)).toBe('ENFJ');
    });

    it('혼합: I, S, T, P → ISTP', () => {
      const answers = makeDeepResponses('I', 'S', 'T', 'P');
      const scores = strategy.calculateScores(answers);
      expect(strategy.determineType(scores)).toBe('ISTP');
    });
  });
});

// ─── 동점 엣지 케이스 집중 테스트 ───────────────────────────────────────

describe('동점 (Tied Scores) 엣지 케이스', () => {
  const strategy = new DefaultScoringStrategy();

  it('simple 모드: 모든 축 동점 → ESTJ (첫 번째 선호 기본값)', () => {
    // 축당 0문항 → 모든 score = 0
    const scores = strategy.calculateScores([]);
    expect(strategy.determineType(scores)).toBe('ESTJ');
  });

  it('simple 모드: EI만 동점, 나머지 확실 → ENTJ (E는 기본값)', () => {
    const answers = makeMixedAxisResponses(
      1, 2,  // EI: 1E, 1I → tied
      0, 3,  // SN: 0S, 3N → N
      3, 3,  // TF: 3T, 0F → T
      3, 3,  // JP: 3J, 0P → J
    );
    const scores = strategy.calculateScores(answers);
    const type = strategy.determineType(scores);

    expect(getScore(scores, 'EI').score).toBe(0);
    expect(type[0]).toBe('E'); // tied defaults to E
    expect(type).toBe('ENTJ');
  });

  it('deep 모드: 축당 5:5 동점 → 모두 첫 번째 선호 → ESTJ', () => {
    const answers = makeMixedAxisResponses(5, 10, 5, 10, 5, 10, 5, 10);
    const scores = strategy.calculateScores(answers);

    for (const s of scores) {
      expect(s.score).toBe(0);
      expect(s.confidence).toBe(0);
    }
    expect(strategy.determineType(scores)).toBe('ESTJ');
  });

  it('deep 모드: SN축만 동점, 나머지 두 번째 선호 → ISTJ (S는 기본값)', () => {
    const answers = makeMixedAxisResponses(
      3, 10,  // EI: 3E, 7I → I
      5, 10,  // SN: 5S, 5N → tied → S
      4, 10,  // TF: 4T, 6F → F
      2, 10,  // JP: 2J, 8P → P
    );
    const scores = strategy.calculateScores(answers);

    expect(getScore(scores, 'SN').score).toBe(0);
    expect(strategy.determineType(scores)).toBe('ISFP');
  });
});

// ─── ScoringEngine 통합 테스트 ──────────────────────────────────────────

describe('ScoringEngine', () => {
  it('기본 생성자는 DefaultScoringStrategy 사용', () => {
    const engine = new ScoringEngine();
    expect(engine.getStrategyName()).toBe('default-1pt');
  });

  it('calculate()는 완전한 MBTIResult 반환', () => {
    const engine = new ScoringEngine();
    const answers = makeSimpleResponses('E', 'N', 'T', 'P');
    const result = engine.calculate(answers, 'simple');

    expect(result.type).toBe('ENTP');
    expect(result.mode).toBe('simple');
    expect(result.scores).toHaveLength(4);
    expect(result.id).toMatch(/^mbti-/);
    expect(result.timestamp).toBeGreaterThan(0);
  });

  it('calculate() deep 모드도 올바르게 작동', () => {
    const engine = new ScoringEngine();
    const answers = makeDeepResponses('I', 'S', 'F', 'J');
    const result = engine.calculate(answers, 'deep');

    expect(result.type).toBe('ISFJ');
    expect(result.mode).toBe('deep');
  });

  it('전략 교체 가능', () => {
    const engine = new ScoringEngine();
    expect(engine.getStrategyName()).toBe('default-1pt');

    // 질문 데이터 없이 WeightedScoringStrategy 생성 (빈 질문 배열)
    engine.setStrategy(new WeightedScoringStrategy([], 'simple'));
    expect(engine.getStrategyName()).toBe('weighted');
  });

  it('calculateScores()와 determineType()을 개별 호출 가능', () => {
    const engine = new ScoringEngine();
    const answers = makeDeepResponses('E', 'S', 'F', 'P');

    const scores = engine.calculateScores(answers);
    const type = engine.determineType(scores);

    expect(type).toBe('ESFP');
  });
});

// ─── calculateMBTIResult 편의 함수 테스트 ───────────────────────────────

describe('calculateMBTIResult (편의 함수)', () => {
  it('simple 모드 결과 반환', () => {
    const answers = makeSimpleResponses('I', 'N', 'F', 'P');
    const result = calculateMBTIResult(answers, 'simple');

    expect(result.type).toBe('INFP');
    expect(result.mode).toBe('simple');
  });

  it('deep 모드 결과 반환', () => {
    const answers = makeDeepResponses('E', 'N', 'T', 'J');
    const result = calculateMBTIResult(answers, 'deep');

    expect(result.type).toBe('ENTJ');
    expect(result.mode).toBe('deep');
  });
});

// ─── 모든 16가지 유형 결정 테스트 ───────────────────────────────────────

describe('16가지 MBTI 유형 모두 올바르게 결정', () => {
  const strategy = new DefaultScoringStrategy();

  const allTypes: [string, string, string, string, MBTIType][] = [
    ['E', 'S', 'T', 'J', 'ESTJ'],
    ['E', 'S', 'T', 'P', 'ESTP'],
    ['E', 'S', 'F', 'J', 'ESFJ'],
    ['E', 'S', 'F', 'P', 'ESFP'],
    ['E', 'N', 'T', 'J', 'ENTJ'],
    ['E', 'N', 'T', 'P', 'ENTP'],
    ['E', 'N', 'F', 'J', 'ENFJ'],
    ['E', 'N', 'F', 'P', 'ENFP'],
    ['I', 'S', 'T', 'J', 'ISTJ'],
    ['I', 'S', 'T', 'P', 'ISTP'],
    ['I', 'S', 'F', 'J', 'ISFJ'],
    ['I', 'S', 'F', 'P', 'ISFP'],
    ['I', 'N', 'T', 'J', 'INTJ'],
    ['I', 'N', 'T', 'P', 'INTP'],
    ['I', 'N', 'F', 'J', 'INFJ'],
    ['I', 'N', 'F', 'P', 'INFP'],
  ];

  describe('simple 모드 (12문항)', () => {
    for (const [ei, sn, tf, jp, expectedType] of allTypes) {
      it(`${ei}${sn}${tf}${jp} → ${expectedType}`, () => {
        const answers = makeSimpleResponses(ei, sn, tf, jp);
        const scores = strategy.calculateScores(answers);
        expect(strategy.determineType(scores)).toBe(expectedType);
      });
    }
  });

  describe('deep 모드 (40문항)', () => {
    for (const [ei, sn, tf, jp, expectedType] of allTypes) {
      it(`${ei}${sn}${tf}${jp} → ${expectedType}`, () => {
        const answers = makeDeepResponses(ei, sn, tf, jp);
        const scores = strategy.calculateScores(answers);
        expect(strategy.determineType(scores)).toBe(expectedType);
      });
    }
  });
});

// ─── 혼합 응답 현실적 시나리오 ──────────────────────────────────────────

describe('혼합 응답 현실적 시나리오', () => {
  const strategy = new DefaultScoringStrategy();

  it('simple 모드: 2E/1I, 1S/2N, 2T/1F, 1J/2P → ENTP', () => {
    const answers = makeMixedAxisResponses(2, 3, 1, 3, 2, 3, 1, 3);
    const scores = strategy.calculateScores(answers);
    const type = strategy.determineType(scores);

    expect(getScore(scores, 'EI').score).toBe(1);   // 2-1
    expect(getScore(scores, 'SN').score).toBe(-1);   // 1-2
    expect(getScore(scores, 'TF').score).toBe(1);    // 2-1
    expect(getScore(scores, 'JP').score).toBe(-1);   // 1-2
    expect(type).toBe('ENTP');
  });

  it('deep 모드: 근소한 차이 6E/4I, 4S/6N, 7T/3F, 5J/5P → ENTJ (JP tied→J)', () => {
    const answers = makeMixedAxisResponses(6, 10, 4, 10, 7, 10, 5, 10);
    const scores = strategy.calculateScores(answers);
    const type = strategy.determineType(scores);

    expect(getScore(scores, 'EI').score).toBe(2);
    expect(getScore(scores, 'SN').score).toBe(-2);
    expect(getScore(scores, 'TF').score).toBe(4);
    expect(getScore(scores, 'JP').score).toBe(0);
    expect(type).toBe('ENTJ');
  });

  it('deep 모드: 1점 차이로 유형 변경 검증', () => {
    // 5E/5I → E (tied), 6S/4N → S, 5T/5F → T (tied), 6J/4P → J
    const baseAnswers = makeMixedAxisResponses(5, 10, 6, 10, 5, 10, 6, 10);
    const baseScores = strategy.calculateScores(baseAnswers);
    expect(strategy.determineType(baseScores)).toBe('ESTJ');

    // 한 표 차이로 I쪽 우세
    const tiltedAnswers = makeMixedAxisResponses(4, 10, 6, 10, 5, 10, 6, 10);
    const tiltedScores = strategy.calculateScores(tiltedAnswers);
    expect(strategy.determineType(tiltedScores)).toBe('ISTJ');
  });

  it('확신도가 축마다 다르게 계산됨', () => {
    const answers = makeMixedAxisResponses(
      10, 10, // EI: 10E, 0I → 100%
      6, 10,  // SN: 6S, 4N → 20%
      5, 10,  // TF: 5T, 5F → 0%
      0, 10,  // JP: 0J, 10P → 100%
    );
    const scores = strategy.calculateScores(answers);

    expect(getScore(scores, 'EI').confidence).toBe(100);
    expect(getScore(scores, 'SN').confidence).toBe(20);
    expect(getScore(scores, 'TF').confidence).toBe(0);
    expect(getScore(scores, 'JP').confidence).toBe(100);
  });
});

// ─── WeightedScoringStrategy 기본 테스트 ─────────────────────────────────

describe('WeightedScoringStrategy', () => {
  it('가중치 없는 질문은 기본 전략과 동일하게 동작', () => {
    const questions = [
      { id: 'q0', type: 'ab' as const, axis: 'EI' as const, mode: 'simple' as const, question: 'test', options: [{ text: 'a', value: 'E' as const }, { text: 'b', value: 'I' as const }] },
      { id: 'q1', type: 'ab' as const, axis: 'EI' as const, mode: 'simple' as const, question: 'test', options: [{ text: 'a', value: 'E' as const }, { text: 'b', value: 'I' as const }] },
    ];

    const weighted = new WeightedScoringStrategy(questions, 'simple');
    const defaultStrat = new DefaultScoringStrategy();

    const answers: QuestionResponse[] = [
      { questionId: 'q0', selectedValue: 'E' },
      { questionId: 'q1', selectedValue: 'I' },
    ];

    const wScores = weighted.calculateScores(answers);
    const dScores = defaultStrat.calculateScores(answers);

    expect(getScore(wScores, 'EI').score).toBe(getScore(dScores, 'EI').score);
  });

  it('가중치가 있으면 점수에 반영', () => {
    const questions = [
      { id: 'q0', type: 'ab' as const, axis: 'EI' as const, mode: 'simple' as const, weight: 3, question: 'test', options: [{ text: 'a', value: 'E' as const }, { text: 'b', value: 'I' as const }] },
      { id: 'q1', type: 'ab' as const, axis: 'EI' as const, mode: 'simple' as const, weight: 1, question: 'test', options: [{ text: 'a', value: 'E' as const }, { text: 'b', value: 'I' as const }] },
    ];

    const weighted = new WeightedScoringStrategy(questions, 'simple');

    const answers: QuestionResponse[] = [
      { questionId: 'q0', selectedValue: 'E' }, // weight 3
      { questionId: 'q1', selectedValue: 'I' }, // weight 1
    ];

    const scores = weighted.calculateScores(answers);
    // E = 3, I = 1 → score = 3 - 1 = 2
    expect(getScore(scores, 'EI').score).toBe(2);
  });

  it('determineType은 DefaultScoringStrategy와 동일 로직', () => {
    const weighted = new WeightedScoringStrategy([], 'simple');
    const scores: DimensionScore[] = [
      { dimension: 'EI', score: -1, confidence: 50 },
      { dimension: 'SN', score: 2, confidence: 100 },
      { dimension: 'TF', score: -3, confidence: 100 },
      { dimension: 'JP', score: 0, confidence: 0 },
    ];
    expect(weighted.determineType(scores)).toBe('ISFJ');
  });
});

// ─── MBTI_AXES 상수 테스트 ──────────────────────────────────────────────

describe('MBTI_AXES 상수', () => {
  it('정확히 4축 정의', () => {
    expect(MBTI_AXES).toHaveLength(4);
  });

  it('올바른 축과 선호 매핑', () => {
    expect(MBTI_AXES[0]).toEqual(['EI', 'E', 'I']);
    expect(MBTI_AXES[1]).toEqual(['SN', 'S', 'N']);
    expect(MBTI_AXES[2]).toEqual(['TF', 'T', 'F']);
    expect(MBTI_AXES[3]).toEqual(['JP', 'J', 'P']);
  });
});
