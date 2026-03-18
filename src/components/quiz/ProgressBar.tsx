'use client';

import { motion, AnimatePresence } from 'framer-motion';

type MBTIDimension = 'EI' | 'SN' | 'TF' | 'JP';

const AXIS_COLOR: Record<MBTIDimension, string> = {
  EI: 'bg-energy-e',
  SN: 'bg-info-s',
  TF: 'bg-decision-t',
  JP: 'bg-lifestyle-j',
};

interface ProgressBarProps {
  current: number;
  total: number;
  progress: number;
  axis?: MBTIDimension;
}

export default function ProgressBar({ current, total, progress, axis }: ProgressBarProps) {
  const fillColor = axis ? AXIS_COLOR[axis] : 'bg-primary';
  return (
    <div className="w-full max-w-md md:max-w-lg lg:max-w-xl mx-auto px-4 sm:px-6 md:px-8 py-2 sm:py-3">
      <div className="flex items-center justify-between mb-1.5 sm:mb-2">
        <div className="flex items-center gap-1.5">
          {/* 질문 번호 — 숫자 플립 애니메이션 */}
          <span className="text-xs sm:text-sm font-bold text-primary flex items-center">
            Q
            <span className="relative inline-flex overflow-hidden h-[1.2em] w-[1.5em] justify-center">
              <AnimatePresence mode="popLayout">
                <motion.span
                  key={current}
                  initial={{ y: 14, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -14, opacity: 0 }}
                  transition={{
                    type: 'spring',
                    stiffness: 500,
                    damping: 30,
                    mass: 0.5,
                  }}
                  className="absolute"
                >
                  {current}
                </motion.span>
              </AnimatePresence>
            </span>
          </span>
          <span className="text-xs sm:text-sm text-foreground/40">
            / {total}
          </span>
        </div>
        <AnimatePresence mode="popLayout">
          <motion.span
            key={progress}
            initial={{ y: 8, opacity: 0, scale: 1.15 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: -8, opacity: 0, scale: 0.85 }}
            transition={{
              type: 'spring',
              stiffness: 500,
              damping: 30,
              mass: 0.5,
            }}
            className="text-xs sm:text-sm font-medium text-primary/80"
          >
            {progress}%
          </motion.span>
        </AnimatePresence>
      </div>
      <div className="relative w-full h-2 sm:h-2.5 md:h-3 bg-surface-alt rounded-full overflow-hidden">
        <motion.div
          className={`h-full ${fillColor} rounded-full`}
          initial={{ width: 0 }}
          animate={{ width: `${Math.max(progress, 2)}%` }}
          transition={{
            duration: 0.5,
            ease: [0.32, 0.72, 0, 1],
          }}
        />
      </div>
    </div>
  );
}
