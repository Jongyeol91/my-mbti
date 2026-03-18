'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { ABQuestion } from '@/types/question';
import type { MBTIPreference } from '@/types/mbti';

interface ABQuestionCardProps {
  question: ABQuestion;
  onAnswer: (value: MBTIPreference) => void;
}

const optionStyles = [
  {
    idle: 'border-primary/15 hover:border-primary/40 active:border-primary hover:bg-primary/5',
    selected: 'border-primary bg-primary/10 shadow-lg shadow-primary/10',
    badge: 'bg-primary/15 text-primary',
    label: 'A',
  },
  {
    idle: 'border-secondary/15 hover:border-secondary/40 active:border-secondary hover:bg-secondary/5',
    selected: 'border-secondary bg-secondary/10 shadow-lg shadow-secondary/10',
    badge: 'bg-secondary/15 text-secondary',
    label: 'B',
  },
];

export default function ABQuestionCard({ question, onAnswer }: ABQuestionCardProps) {
  const [selected, setSelected] = useState<number | null>(null);

  // 방어적 체크: options가 없는 경우
  if (!question?.options) {
    console.error('ABQuestionCard: question.options is undefined', JSON.stringify(question));
    return null;
  }

  const handleSelect = (idx: number, value: MBTIPreference) => {
    if (selected !== null) return; // 이미 선택됨 - 중복 방지
    setSelected(idx);

    // 선택 피드백 후 다음 질문으로 이동
    setTimeout(() => {
      onAnswer(value);
      setSelected(null);
    }, 350);
  };

  return (
    <div
      className="flex flex-col items-center gap-5 sm:gap-6 md:gap-8 w-full
                 max-w-md md:max-w-lg lg:max-w-xl mx-auto
                 px-4 sm:px-6 md:px-8"
    >
      {/* 질문 텍스트 */}
      <motion.h2
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="text-lg sm:text-xl md:text-2xl font-bold text-center leading-relaxed text-foreground"
      >
        {question.question}
      </motion.h2>

      {/* 선택지: 모바일 세로 스택 / md+ 가로 배치 */}
      <div className="relative flex flex-col sm:flex-row gap-3 sm:gap-4 w-full">
        {question.options.map((option, idx) => {
          const style = optionStyles[idx];
          const isSelected = selected === idx;
          const isOther = selected !== null && selected !== idx;

          return (
            <motion.button
              key={idx}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{
                opacity: isOther ? 0.4 : 1,
                y: 0,
                scale: isSelected ? 1.03 : isOther ? 0.97 : 1,
              }}
              transition={{
                delay: selected !== null ? 0 : 0.1 + idx * 0.12,
                duration: 0.3,
                ease: 'easeOut',
              }}
              whileHover={selected === null ? { scale: 1.02, y: -3 } : undefined}
              whileTap={selected === null ? { scale: 0.96 } : undefined}
              onClick={() => handleSelect(idx, option.value)}
              disabled={selected !== null}
              className={`w-full sm:flex-1 p-4 sm:p-5 md:p-6 rounded-2xl md:rounded-3xl
                         bg-surface border-2
                         ${isSelected ? style.selected : style.idle}
                         text-left sm:text-center text-base sm:text-lg leading-relaxed
                         shadow-sm hover:shadow-md transition-all duration-200
                         cursor-pointer disabled:cursor-default
                         min-h-[64px] sm:min-h-[100px]
                         flex items-center sm:justify-center`}
            >
              <div className="flex items-center sm:flex-col sm:items-center gap-3 sm:gap-2">
                {/* A/B 배지 */}
                <span
                  className={`shrink-0 inline-flex items-center justify-center
                             w-8 h-8 sm:w-9 sm:h-9
                             rounded-full font-bold text-sm sm:text-base
                             ${style.badge}
                             transition-transform duration-200`}
                >
                  {style.label}
                </span>

                {/* 선택지 텍스트 */}
                <span className="flex-1 sm:flex-none">{option.text}</span>

                {/* 선택 체크 표시 */}
                <AnimatePresence>
                  {isSelected && (
                    <motion.span
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      transition={{ type: 'spring', stiffness: 500, damping: 25 }}
                      className="shrink-0 text-lg sm:text-xl"
                    >
                      ✨
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>
            </motion.button>
          );
        })}

        {/* VS 구분자 (sm+ 가로 배치 시에만 표시) */}
        <div className="hidden sm:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10
                        items-center justify-center pointer-events-none">
          <motion.div
            initial={{ scale: 0, rotate: -20 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.3, type: 'spring', stiffness: 300, damping: 20 }}
            className="w-9 h-9 rounded-full bg-accent/90 text-foreground
                       flex items-center justify-center
                       text-xs font-black shadow-md"
          >
            VS
          </motion.div>
        </div>
      </div>
    </div>
  );
}
