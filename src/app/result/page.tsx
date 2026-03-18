import type { Metadata } from 'next';
import ResultHistoryClient from './ResultHistoryClient';

export const metadata: Metadata = {
  title: '내 결과 히스토리 | 나의 MBTI 테스트',
  description: '지금까지 받은 MBTI 테스트 결과를 한눈에 확인하세요.',
};

export default function ResultHistoryPage() {
  return <ResultHistoryClient />;
}
