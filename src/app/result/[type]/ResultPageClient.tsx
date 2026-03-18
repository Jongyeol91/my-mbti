'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import type { MBTITypeProfile, MBTIResult, SavedResultsData } from '@/types/mbti';
import ResultPage from '@/components/result/ResultPage';

interface Props {
  profile: MBTITypeProfile;
}

const STORAGE_KEY = 'mbti-results';

export default function ResultPageClient({ profile }: Props) {
  const [savedResult, setSavedResult] = useState<MBTIResult | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const searchParams = useSearchParams();
  const resultId = searchParams.get('id');

  useEffect(() => {
    // Load result from localStorage (matches useQuiz saveResult key)
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const data: SavedResultsData = JSON.parse(stored);

        // Try to find by result ID first (from URL query param)
        if (resultId && data.history) {
          const matchById = data.history.find((r) => r.id === resultId);
          if (matchById) {
            setSavedResult(matchById);
            setIsLoaded(true);
            return;
          }
        }

        // Fallback: use lastResult if type matches
        if (data.lastResult && data.lastResult.type === profile.type) {
          setSavedResult(data.lastResult);
        }
      }
    } catch {
      // Ignore localStorage errors
    }
    setIsLoaded(true);
  }, [profile.type, resultId]);

  return (
    <ResultPage
      profile={profile}
      scores={savedResult?.scores}
      mode={savedResult?.mode}
      isLoaded={isLoaded}
    />
  );
}
