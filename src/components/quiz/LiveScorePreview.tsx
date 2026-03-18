'use client';

import { motion } from 'framer-motion';
import type { DimensionScore } from '@/types/mbti';

interface LiveScorePreviewProps {
  scores: DimensionScore[];
}

const AXIS_LABELS: Record<string, [string, string]> = {
  EI: ['E 외향', 'I 내향'],
  SN: ['S 감각', 'N 직관'],
  TF: ['T 사고', 'F 감정'],
  JP: ['J 판단', 'P 인식'],
};

const AXIS_BAR_COLOR: Record<string, string> = {
  EI: 'bg-energy-e',
  SN: 'bg-info-s',
  TF: 'bg-decision-t',
  JP: 'bg-lifestyle-j',
};

export default function LiveScorePreview({ scores }: LiveScorePreviewProps) {
  return (
    <div className="w-full max-w-md md:max-w-lg lg:max-w-xl mx-auto px-4 sm:px-6 md:px-8 mt-3 sm:mt-4">
      <div className="flex gap-2 sm:gap-3 md:gap-4">
        {scores.map((s) => {
          const [left, right] = AXIS_LABELS[s.dimension] ?? ['?', '?'];
          // Normalize to 0-100 where 50 = neutral, >50 = first pref, <50 = second pref
          const percent = s.confidence === 0
            ? 50
            : s.score > 0
              ? 50 + (s.confidence / 2)
              : 50 - (s.confidence / 2);

          const leading = s.score >= 0 ? left.charAt(0) : right.charAt(0);

          return (
            <div key={s.dimension} className="flex-1 text-center">
              <motion.div
                className="text-xs sm:text-sm font-bold text-primary"
                initial={{ scale: 1 }}
                animate={{ scale: [1, 1.15, 1] }}
                transition={{ duration: 0.3 }}
                key={`${s.dimension}-${s.score}`}
              >
                {leading}
              </motion.div>
              <div className="h-1 sm:h-1.5 bg-surface-alt rounded-full overflow-hidden mt-1">
                <motion.div
                  className={`h-full ${AXIS_BAR_COLOR[s.dimension] ?? 'bg-primary'} rounded-full`}
                  animate={{ width: `${percent}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
