import { MBTIType, MBTITypeProfile } from '@/types/mbti';
import { extrovertedTypes } from './extroverted';
import { introvertedTypes } from './introverted';

/**
 * 모든 MBTI 유형 프로필 데이터
 * 외향형 + 내향형 = 16유형 전체
 */
export const allTypes: MBTITypeProfile[] = [
  ...extrovertedTypes,
  ...introvertedTypes,
];

/**
 * MBTI 유형 코드로 프로필 조회
 */
export function getTypeProfile(type: MBTIType): MBTITypeProfile | undefined {
  return allTypes.find((t) => t.type === type);
}

/**
 * 모든 유형 프로필을 Map으로 반환 (빠른 조회용)
 */
export const typeProfileMap: Partial<Record<MBTIType, MBTITypeProfile>> =
  Object.fromEntries(allTypes.map((t) => [t.type, t]));

export { extrovertedTypes, introvertedTypes };
