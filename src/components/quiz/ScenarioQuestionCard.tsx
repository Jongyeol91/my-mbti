'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { ScenarioQuestion } from '@/types/question';
import type { MBTIPreference } from '@/types/mbti';

interface ScenarioQuestionCardProps {
  question: ScenarioQuestion;
  onAnswer: (value: MBTIPreference) => void;
}

/** 옵션 인덱스별 장식 색상 */
const optionAccents = [
  {
    border: 'hover:border-primary/30 active:border-primary',
    bg: 'hover:bg-primary/5',
    badge: 'bg-primary/15 text-primary',
  },
  {
    border: 'hover:border-secondary/30 active:border-secondary',
    bg: 'hover:bg-secondary/5',
    badge: 'bg-secondary/15 text-secondary',
  },
  {
    border: 'hover:border-mint/40 active:border-mint',
    bg: 'hover:bg-mint/5',
    badge: 'bg-mint/20 text-emerald-600',
  },
  {
    border: 'hover:border-sky/40 active:border-sky',
    bg: 'hover:bg-sky/5',
    badge: 'bg-sky/20 text-sky-600',
  },
];

/** 선택 시 강조 색상 */
const selectedAccents = [
  'border-primary/50 bg-primary/10',
  'border-secondary/50 bg-secondary/10',
  'border-mint/50 bg-mint/10',
  'border-sky/50 bg-sky/10',
];

/** 옵션 라벨 (가, 나, 다, 라) */
const OPTION_LABELS = ['가', '나', '다', '라'];

export default function ScenarioQuestionCard({ question, onAnswer }: ScenarioQuestionCardProps) {
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);

  const handleSelect = useCallback(
    (idx: number, value: MBTIPreference) => {
      if (selectedIdx !== null) return; // 중복 클릭 방지
      setSelectedIdx(idx);

      // 짧은 시각적 피드백 후 답변 전달
      const timer = setTimeout(() => {
        onAnswer(value);
        setSelectedIdx(null);
      }, 350);

      return () => clearTimeout(timer);
    },
    [selectedIdx, onAnswer],
  );

  return (
    <div
      className="flex flex-col items-center gap-4 sm:gap-5 md:gap-6 w-full
                 max-w-md md:max-w-lg lg:max-w-xl mx-auto
                 px-4 sm:px-6 md:px-8"
    >
      {/* 시나리오 상황 카드 */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
        className="w-full rounded-2xl md:rounded-3xl overflow-hidden
                   bg-gradient-to-br from-primary/8 via-secondary/6 to-mint/8
                   border border-primary/15 shadow-sm"
      >
        {/* 상황 헤더 */}
        <div className="flex items-center gap-2 px-4 sm:px-5 pt-3 sm:pt-4 pb-1">
          <span className="text-base sm:text-lg">💡</span>
          <span className="text-xs sm:text-sm font-semibold text-primary/70 tracking-wide">
            상황
          </span>
        </div>

        {/* 시나리오 본문 */}
        <div className="px-4 sm:px-5 pb-4 sm:pb-5">
          <p className="text-sm sm:text-base md:text-lg leading-relaxed text-foreground/85">
            {question.scenario}
          </p>
        </div>
      </motion.div>

      {/* 질문 텍스트 */}
      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.3 }}
        className="text-lg sm:text-xl md:text-2xl font-bold text-center leading-relaxed text-foreground"
      >
        {question.question}
      </motion.h2>

      {/* 선택지 목록 */}
      <div
        className={`w-full gap-3 md:gap-4
          ${question.options.length > 2
            ? 'grid grid-cols-1 md:grid-cols-2'
            : 'flex flex-col'
          }`}
      >
        <AnimatePresence>
          {question.options.map((option, idx) => {
            const accent = optionAccents[idx % optionAccents.length];
            const isSelected = selectedIdx === idx;
            const isOther = selectedIdx !== null && selectedIdx !== idx;

            return (
              <motion.button
                key={idx}
                initial={{ opacity: 0, y: 14 }}
                animate={{
                  opacity: isOther ? 0.45 : 1,
                  y: 0,
                  scale: isSelected ? 1.03 : isOther ? 0.97 : 1,
                }}
                transition={{
                  delay: isSelected || isOther ? 0 : 0.15 + idx * 0.08,
                  duration: 0.3,
                  ease: 'easeOut',
                }}
                whileHover={selectedIdx === null ? { scale: 1.02, y: -2 } : undefined}
                whileTap={selectedIdx === null ? { scale: 0.96 } : undefined}
                onClick={() => handleSelect(idx, option.value)}
                disabled={selectedIdx !== null}
                className={`
                  w-full p-4 sm:p-5 md:p-6 rounded-2xl md:rounded-3xl
                  bg-surface border-2 text-left
                  text-sm sm:text-base md:text-lg leading-relaxed
                  shadow-sm transition-shadow duration-200
                  flex items-start gap-3
                  ${isSelected
                    ? `${selectedAccents[idx % selectedAccents.length]} shadow-md`
                    : `border-transparent ${accent.border} ${accent.bg} hover:shadow-md`
                  }
                  ${selectedIdx === null ? 'cursor-pointer' : 'cursor-default'}
                `}
                aria-label={`선택지 ${OPTION_LABELS[idx]}: ${option.text}`}
              >
                {/* 번호 뱃지 */}
                <span
                  className={`
                    shrink-0 inline-flex items-center justify-center
                    w-7 h-7 sm:w-8 sm:h-8
                    rounded-full font-bold text-xs sm:text-sm
                    transition-colors duration-200
                    ${isSelected
                      ? selectedAccents[idx % selectedAccents.length]
                      : accent.badge
                    }
                  `}
                >
                  {OPTION_LABELS[idx]}
                </span>

                {/* 선택지 텍스트 */}
                <span className="pt-0.5">{option.text}</span>

                {/* 선택 완료 표시 */}
                {isSelected && (
                  <motion.span
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                    className="ml-auto shrink-0 text-lg"
                    aria-hidden
                  >
                    ✓
                  </motion.span>
                )}
              </motion.button>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}
