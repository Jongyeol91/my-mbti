import { Suspense } from 'react';
import CompatibilityPageClient from './CompatibilityPageClient';

export const metadata = {
  title: 'MBTI 궁합 비교 | 나의 MBTI',
  description: '두 MBTI 유형의 궁합을 비교해보세요!',
};

export default function CompatibilityPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-dvh items-center justify-center">
          <p className="text-sm text-foreground/50">로딩 중...</p>
        </div>
      }
    >
      <CompatibilityPageClient />
    </Suspense>
  );
}
