/**
 * MBTI 16유형 프로필 데이터
 *
 * 정적 데이터 파일로, 향후 CMS나 데이터베이스 연동 시
 * 이 파일의 인터페이스를 유지하면서 데이터 소스만 교체 가능
 */

import { MBTITypeProfile } from '@/types/mbti';
import type { MBTIType } from '@/types/mbti';

// 내향형 (Introverted) 유형들
export { ISTJ } from './istj';
export { ISTP } from './istp';
export { ISFJ } from './isfj';
export { ISFP } from './isfp';
export { INTJ } from './intj';
export { INTP } from './intp';
export { INFJ } from './infj';
export { INFP } from './infp';

// 외향형 (Extraverted) 유형들
export { ESTJ } from './estj';
export { ESTP } from './estp';
export { ESFJ } from './esfj';
export { ESFP } from './esfp';
export { ENTJ } from './entj';
export { ENTP } from './entp';
export { ENFJ } from './enfj';
export { ENFP } from './enfp';

import { ISTJ } from './istj';
import { ISTP } from './istp';
import { ISFJ } from './isfj';
import { ISFP } from './isfp';
import { INTJ } from './intj';
import { INTP } from './intp';
import { INFJ } from './infj';
import { INFP } from './infp';
import { ESTJ } from './estj';
import { ESTP } from './estp';
import { ESFJ } from './esfj';
import { ESFP } from './esfp';
import { ENTJ } from './entj';
import { ENTP } from './entp';
import { ENFJ } from './enfj';
import { ENFP } from './enfp';

/**
 * 모든 MBTI 유형 프로필 맵
 * 유형 코드로 O(1) 조회 가능
 */
export const profileMap: Record<MBTIType, MBTITypeProfile> = {
  ISTJ,
  ISTP,
  ISFJ,
  ISFP,
  INTJ,
  INTP,
  INFJ,
  INFP,
  ESTJ,
  ESTP,
  ESFJ,
  ESFP,
  ENTJ,
  ENTP,
  ENFJ,
  ENFP,
};

/**
 * 모든 MBTI 유형 프로필 배열
 */
export const allProfiles: MBTITypeProfile[] = Object.values(profileMap);

/**
 * MBTI 유형 코드로 프로필 조회
 */
export function getProfile(type: MBTIType): MBTITypeProfile | undefined {
  return profileMap[type];
}

/**
 * 특정 유형의 호환성 정보에서 특정 등급의 유형들을 조회
 */
export function getCompatibleTypes(
  type: MBTIType,
  level: 'best' | 'good' | 'neutral' | 'bad'
): MBTIType[] {
  const profile = profileMap[type];
  if (!profile) return [];
  return profile.compatibility[level];
}
