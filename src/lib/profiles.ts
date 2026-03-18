/**
 * 통합 MBTI 프로필 접근자
 * 두 데이터 소스(profiles/, types/)를 통합하여 16유형 전체를 제공
 */

import type { MBTIType, MBTITypeProfile, CareerInfo } from '@/types/mbti';
import { profileMap } from '@/data/profiles';
import { typeProfileMap } from '@/data/types';

/**
 * careers 필드가 string[]인 경우 CareerInfo[]로 정규화
 */
function normalizeCareers(careers: CareerInfo[] | string[]): CareerInfo[] {
  if (careers.length === 0) return [];
  if (typeof careers[0] === 'string') {
    return (careers as string[]).map((title) => ({
      title,
      emoji: '💼',
      reason: '',
    }));
  }
  return careers as CareerInfo[];
}

/**
 * 프로필 정규화 (데이터 소스 간 차이를 흡수)
 */
function normalizeProfile(profile: MBTITypeProfile): MBTITypeProfile {
  return {
    ...profile,
    careers: normalizeCareers(profile.careers as CareerInfo[] | string[]),
    shareImageUrl: `/images/share/${profile.type.toLowerCase()}.svg`,
  };
}

/** 모든 프로필 병합 (profiles/ 우선, 없으면 types/ 사용) */
const ALL_TYPES: MBTIType[] = [
  'ISTJ', 'ISFJ', 'INFJ', 'INTJ',
  'ISTP', 'ISFP', 'INFP', 'INTP',
  'ESTP', 'ESFP', 'ENFP', 'ENTP',
  'ESTJ', 'ESFJ', 'ENFJ', 'ENTJ',
];

const mergedMap: Partial<Record<MBTIType, MBTITypeProfile>> = {};

for (const type of ALL_TYPES) {
  const profile = profileMap[type] ?? typeProfileMap[type];
  if (profile) {
    mergedMap[type] = normalizeProfile(profile);
  }
}

/**
 * 타입 코드로 프로필 조회
 */
export function getProfile(type: MBTIType): MBTITypeProfile | undefined {
  return mergedMap[type];
}

/**
 * 등록된 모든 프로필 배열
 */
export function getAllProfiles(): MBTITypeProfile[] {
  return ALL_TYPES.map((t) => mergedMap[t]).filter(Boolean) as MBTITypeProfile[];
}

/**
 * 16개 타입 코드 목록
 */
export { ALL_TYPES };

/**
 * 타입 그룹별 분류
 */
export const TYPE_GROUPS = {
  analysts: ['INTJ', 'INTP', 'ENTJ', 'ENTP'] as MBTIType[],
  diplomats: ['INFJ', 'INFP', 'ENFJ', 'ENFP'] as MBTIType[],
  sentinels: ['ISTJ', 'ISFJ', 'ESTJ', 'ESFJ'] as MBTIType[],
  explorers: ['ISTP', 'ISFP', 'ESTP', 'ESFP'] as MBTIType[],
};

export const TYPE_GROUP_LABELS: Record<string, { label: string; emoji: string }> = {
  analysts: { label: '분석가형', emoji: '🧠' },
  diplomats: { label: '외교관형', emoji: '🌟' },
  sentinels: { label: '관리자형', emoji: '🛡️' },
  explorers: { label: '탐험가형', emoji: '🔍' },
};
