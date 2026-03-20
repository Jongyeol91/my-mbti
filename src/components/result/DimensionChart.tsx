'use client';

import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { useEffect, useRef } from 'react';
import type { DimensionScore, MBTIDimension } from '@/types/mbti';

const AXIS_LABELS: Record<MBTIDimension, { left: string; right: string; leftFull: string; rightFull: string }> = {
  EI: { left: 'E', right: 'I', leftFull: '외향', rightFull: '내향' },
  SN: { left: 'S', right: 'N', leftFull: '감각', rightFull: '직관' },
  TF: { left: 'T', right: 'F', leftFull: '사고', rightFull: '감정' },
  JP: { left: 'J', right: 'P', leftFull: '판단', rightFull: '인식' },
};

const AXIS_COLORS: Record<MBTIDimension, { left: string; right: string; leftGlow: string; rightGlow: string }> = {
  EI: { left: 'bg-amber-400', right: 'bg-indigo-400', leftGlow: 'shadow-amber-400/30', rightGlow: 'shadow-indigo-400/30' },
  SN: { left: 'bg-emerald-400', right: 'bg-purple-400', leftGlow: 'shadow-emerald-400/30', rightGlow: 'shadow-purple-400/30' },
  TF: { left: 'bg-sky-400', right: 'bg-rose-400', leftGlow: 'shadow-sky-400/30', rightGlow: 'shadow-rose-400/30' },
  JP: { left: 'bg-teal-400', right: 'bg-orange-400', leftGlow: 'shadow-teal-400/30', rightGlow: 'shadow-orange-400/30' },
};

/** Animated counter that counts up from 50 to the target percentage */
function AnimatedPercent({ target, delay }: { target: number; delay: number }) {
  const motionValue = useMotionValue(50);
  const rounded = useTransform(motionValue, (v) => Math.round(v));
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const controls = animate(motionValue, target, {
      delay,
      duration: 0.8,
      ease: 'easeOut',
    });
    // Subscribe to changes and update the DOM directly for performance
    const unsubscribe = rounded.on('change', (v) => {
      if (ref.current) ref.current.textContent = `${v}%`;
    });
    return () => {
      controls.stop();
      unsubscribe();
    };
  }, [motionValue, rounded, target, delay]);

  return <span ref={ref}>50%</span>;
}

interface DimensionChartProps {
  scores: DimensionScore[];
}

export default function DimensionChart({ scores }: DimensionChartProps) {
  return (
    <div className="space-y-5 sm:space-y-6">
      {scores.map((score, index) => {
        const axis = AXIS_LABELS[score.dimension];
        const colors = AXIS_COLORS[score.dimension];
        // score > 0 means left (E/S/T/J), < 0 means right (I/N/F/P)
        const leftPercent = score.score >= 0
          ? 50 + (score.confidence / 2)
          : 50 - (score.confidence / 2);
        const rightPercent = 100 - leftPercent;
        const isLeftDominant = score.score >= 0;
        const animDelay = index * 0.15;

        return (
          <motion.div
            key={score.dimension}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: animDelay, duration: 0.5, ease: 'easeOut' }}
            className="space-y-2 sm:space-y-2.5"
          >
            {/* Labels row */}
            <div className="flex items-center justify-between">
              {/* Left label */}
              <div className={`flex items-center gap-1.5 ${isLeftDominant ? '' : 'opacity-50'}`}>
                <span className="text-base font-black sm:text-lg">{axis.left}</span>
                <span className="text-[11px] font-medium text-foreground/60 sm:text-xs">{axis.leftFull}</span>
              </div>

              {/* Percentage display - animated counters */}
              <div className="flex items-center gap-1 text-xs font-bold tabular-nums sm:text-sm">
                <span className={isLeftDominant ? 'text-foreground' : 'text-foreground/40'}>
                  <AnimatedPercent target={Math.round(leftPercent)} delay={animDelay + 0.3} />
                </span>
                <span className="text-foreground/20">:</span>
                <span className={!isLeftDominant ? 'text-foreground' : 'text-foreground/40'}>
                  <AnimatedPercent target={Math.round(rightPercent)} delay={animDelay + 0.3} />
                </span>
              </div>

              {/* Right label */}
              <div className={`flex items-center gap-1.5 ${!isLeftDominant ? '' : 'opacity-50'}`}>
                <span className="text-[11px] font-medium text-foreground/60 sm:text-xs">{axis.rightFull}</span>
                <span className="text-base font-black sm:text-lg">{axis.right}</span>
              </div>
            </div>

            {/* Horizontal bar */}
            <div className="relative h-4 w-full overflow-hidden rounded-full bg-foreground/5 sm:h-5">
              {/* Left bar - grows from center */}
              <motion.div
                className={`absolute left-0 top-0 h-full rounded-l-full ${colors.left} ${isLeftDominant ? 'shadow-md ' + colors.leftGlow : ''}`}
                initial={{ width: '50%' }}
                animate={{ width: `${leftPercent}%` }}
                transition={{ delay: animDelay + 0.3, duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
              />
              {/* Right bar - grows from center */}
              <motion.div
                className={`absolute right-0 top-0 h-full rounded-r-full ${colors.right} ${!isLeftDominant ? 'shadow-md ' + colors.rightGlow : ''}`}
                initial={{ width: '50%' }}
                animate={{ width: `${rightPercent}%` }}
                transition={{ delay: animDelay + 0.3, duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
              />
              {/* Center marker */}
              <div className="absolute left-1/2 top-0 h-full w-0.5 -translate-x-1/2 bg-foreground/10" />

              {/* Dominant side indicator dot */}
              <motion.div
                className="absolute top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-white shadow-sm sm:h-2.5 sm:w-2.5"
                initial={{ opacity: 0, scale: 0 }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  left: isLeftDominant ? `${Math.min(leftPercent - 2, 96)}%` : undefined,
                  right: !isLeftDominant ? `${Math.min(rightPercent - 2, 96)}%` : undefined,
                }}
                transition={{ delay: animDelay + 1, duration: 0.3, type: 'spring', stiffness: 300 }}
              />
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
