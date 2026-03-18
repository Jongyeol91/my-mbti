'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import type { TestMode } from '@/types/question';
import QuizContainer from '@/components/quiz/QuizContainer';

export default function QuizPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const modeParam = searchParams.get('mode');
  const [mode, setMode] = useState<TestMode | null>(null);

  useEffect(() => {
    if (modeParam === 'simple' || modeParam === 'deep') {
      setMode(modeParam);
    } else {
      // 잘못된 모드 파라미터 → 홈으로 리다이렉트
      router.replace('/');
    }
  }, [modeParam, router]);

  if (!mode) {
    return (
      <div className="min-h-dvh flex items-center justify-center">
        <p className="text-foreground/60 text-lg">로딩 중...</p>
      </div>
    );
  }

  return <QuizContainer mode={mode} />;
}
