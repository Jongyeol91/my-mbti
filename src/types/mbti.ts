/**
 * MBTI 타입 관련 TypeScript 타입 정의
 * 확장 가능한 구조로 설계 - 향후 가중치 점수, CMS 연동, DB 저장 대비
 */

// MBTI 4축 차원
export type MBTIDimension = 'EI' | 'SN' | 'TF' | 'JP';

// MBTI 개별 선호 지표
export type MBTIPreference = 'E' | 'I' | 'S' | 'N' | 'T' | 'F' | 'J' | 'P';

// 16가지 MBTI 유형
export type MBTIType =
  | 'ESTJ' | 'ESTP' | 'ESFJ' | 'ESFP'
  | 'ENTJ' | 'ENTP' | 'ENFJ' | 'ENFP'
  | 'ISTJ' | 'ISTP' | 'ISFJ' | 'ISFP'
  | 'INTJ' | 'INTP' | 'INFJ' | 'INFP';

// 호환성 등급
export type CompatibilityLevel = 'best' | 'good' | 'neutral' | 'bad';

// 호환성 정보
export interface CompatibilityInfo {
  /** 최고의 궁합 */
  best: MBTIType[];
  /** 좋은 궁합 */
  good: MBTIType[];
  /** 보통 궁합 */
  neutral: MBTIType[];
  /** 안 맞는 궁합 */
  bad: MBTIType[];
}

// 유명인 정보
export interface CelebrityInfo {
  name: string;
  description: string;
}

// 강점/약점
export interface StrengthWeakness {
  strengths: string[];
  weaknesses: string[];
}

// 추천 직업 정보
export interface CareerInfo {
  /** 직업명 */
  title: string;
  /** 이모지 */
  emoji: string;
  /** 왜 이 유형에 잘 맞는지 */
  reason: string;
}

// MBTI 타입 프로필 (전체 데이터)
export interface MBTITypeProfile {
  /** MBTI 유형 코드 */
  type: MBTIType;
  /** 유형 별명 (예: "열정적인 리더") */
  nickname: string;
  /** 이모지 */
  emoji: string;
  /** 한 줄 요약 */
  summary: string;
  /** 상세 설명 (여러 단락) */
  description: string[];
  /** 키워드 태그 */
  keywords: string[];
  /** 강점과 약점 */
  strengthWeakness: StrengthWeakness;
  /** 유명인 예시 */
  celebrities: CelebrityInfo[];
  /** 추천 직업 (상세 또는 간단 문자열) */
  careers: CareerInfo[] | string[];
  /** 연애 스타일 */
  loveStyle: string;
  /** 친구 관계 스타일 */
  friendshipStyle: string;
  /** 직장 생활 스타일 */
  workStyle: string;
  /** 궁합 정보 */
  compatibility: CompatibilityInfo;
  /** 성장 조언 */
  growthAdvice: string;
  /** 대표 색상 (Tailwind 색상 코드용) */
  color: string;
  /** 그라데이션 색상 (시작, 끝) */
  gradient: [string, string];
  /** 공유 이미지 URL (placeholder) */
  shareImageUrl?: string;
}

// 점수 계산 관련 타입 (확장 가능)
export interface DimensionScore {
  dimension: MBTIDimension;
  /** 양의 값 = 첫 번째 선호(E,S,T,J), 음의 값 = 두 번째 선호(I,N,F,P) */
  score: number;
  /** 확신도 (0~100) */
  confidence: number;
}

export interface MBTIResult {
  /** 고유 결과 ID */
  id: string;
  type: MBTIType;
  scores: DimensionScore[];
  timestamp: number;
  mode: 'simple' | 'deep';
}

// localStorage 저장용 타입
export interface SavedResultsData {
  /** 최근 결과 */
  lastResult: MBTIResult | null;
  /** 결과 히스토리 */
  history: MBTIResult[];
}

// 점수 계산 전략 인터페이스 (확장용)
export interface ScoringStrategy {
  /** 전략 이름 */
  name: string;
  /** 응답으로부터 축별 점수 계산 */
  calculateScores: (answers: import('./question').QuestionResponse[]) => DimensionScore[];
  /** 점수로부터 MBTI 유형 결정 */
  determineType: (scores: DimensionScore[]) => MBTIType;
}

// 축 정보 (UI 표시용)
export interface AxisDisplayInfo {
  axis: MBTIDimension;
  leftLabel: string;
  rightLabel: string;
  leftDescription: string;
  rightDescription: string;
  leftPole: MBTIPreference;
  rightPole: MBTIPreference;
}
