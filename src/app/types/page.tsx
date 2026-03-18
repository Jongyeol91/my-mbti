import type { Metadata } from 'next';
import EncyclopediaPageClient from './EncyclopediaPageClient';

export const metadata: Metadata = {
  title: '16가지 MBTI 유형 백과사전 | 나의 MBTI 테스트',
  description: 'MBTI 16가지 성격 유형의 특징, 강점, 약점, 궁합, 추천 직업 등을 자세히 알아보세요!',
};

export default function EncyclopediaPage() {
  return <EncyclopediaPageClient />;
}
