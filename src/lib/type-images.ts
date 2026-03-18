/**
 * MBTI 타입별 이미지 경로 유틸리티
 * 각 MBTI 유형을 해당 플레이스홀더 이미지 경로에 매핑
 */

import type { MBTIType } from '@/types/mbti';

/** 모든 16가지 MBTI 유형 목록 */
export const ALL_MBTI_TYPES: MBTIType[] = [
  'ESTJ', 'ESTP', 'ESFJ', 'ESFP',
  'ENTJ', 'ENTP', 'ENFJ', 'ENFP',
  'ISTJ', 'ISTP', 'ISFJ', 'ISFP',
  'INTJ', 'INTP', 'INFJ', 'INFP',
];

/** 이미지 기본 경로 */
const TYPE_IMAGES_BASE_PATH = '/images/types';

/**
 * MBTI 유형에 해당하는 이미지 경로 반환
 * @param type - MBTI 유형 코드 (예: 'INFP')
 * @returns 이미지 경로 문자열
 */
export function getTypeImagePath(type: MBTIType): string {
  return `${TYPE_IMAGES_BASE_PATH}/${type}.svg`;
}

/**
 * 모든 MBTI 유형의 이미지 경로 맵 반환
 * @returns Record<MBTIType, string> 형태의 이미지 경로 맵
 */
export function getAllTypeImagePaths(): Record<MBTIType, string> {
  return ALL_MBTI_TYPES.reduce(
    (acc, type) => {
      acc[type] = getTypeImagePath(type);
      return acc;
    },
    {} as Record<MBTIType, string>,
  );
}

/** 타입별 대표 색상 (SVG와 동일한 색상) */
export const TYPE_COLORS: Record<MBTIType, string> = {
  ESTJ: '#E74C3C',
  ESTP: '#E67E22',
  ESFJ: '#F1C40F',
  ESFP: '#FF6B9D',
  ENTJ: '#8E44AD',
  ENTP: '#3498DB',
  ENFJ: '#2ECC71',
  ENFP: '#FF85A2',
  ISTJ: '#2C3E50',
  ISTP: '#7F8C8D',
  ISFJ: '#1ABC9C',
  ISFP: '#A3D9A5',
  INTJ: '#34495E',
  INTP: '#5DADE2',
  INFJ: '#9B59B6',
  INFP: '#DDA0DD',
};

/** 타입별 대표 이모지 */
export const TYPE_EMOJIS: Record<MBTIType, string> = {
  ESTJ: '👔',
  ESTP: '🏄',
  ESFJ: '🤗',
  ESFP: '🎉',
  ENTJ: '👑',
  ENTP: '💡',
  ENFJ: '🌟',
  ENFP: '🦋',
  ISTJ: '📋',
  ISTP: '🔧',
  ISFJ: '🛡️',
  ISFP: '🎨',
  INTJ: '♟️',
  INTP: '🔬',
  INFJ: '🔮',
  INFP: '🌙',
};
