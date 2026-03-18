import { Suspense } from 'react';
import QuizPageContent from './QuizPageContent';

export const metadata = {
  title: 'MBTI 테스트 진행 중 | 나의 MBTI',
};

export default function QuizPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-dvh flex items-center justify-center">
          <p className="text-foreground/60 text-lg">로딩 중...</p>
        </div>
      }
    >
      <QuizPageContent />
    </Suspense>
  );
}
