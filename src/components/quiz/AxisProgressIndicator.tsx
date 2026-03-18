'use client';

import { motion } from 'framer-motion';
import type { MBTIDimension } from '@/types/mbti';

interface AxisProgressIndicatorProps {
  /** Number of questions answered per axis */
  answeredPerAxis: Record<MBTIDimension, number>;
  /** Total questions per axis */
  totalPerAxis: Record<MBTIDimension, number>;
  /** Currently active axis (the axis of current question) */
  currentAxis: MBTIDimension;
}

const AXIS_CONFIG: Record<MBTIDimension, { emoji: string; label: string; gradient: string }> = {
  EI: { emoji: '🔋', label: 'E/I', gradient: 'from-amber-400 to-orange-400' },
  SN: { emoji: '🔮', label: 'S/N', gradient: 'from-violet-400 to-purple-400' },
  TF: { emoji: '💭', label: 'T/F', gradient: 'from-pink-400 to-rose-400' },
  JP: { emoji: '📋', label: 'J/P', gradient: 'from-cyan-400 to-blue-400' },
};

const axes: MBTIDimension[] = ['EI', 'SN', 'TF', 'JP'];

export default function AxisProgressIndicator({
  answeredPerAxis,
  totalPerAxis,
  currentAxis,
}: AxisProgressIndicatorProps) {
  return (
    <div className="w-full max-w-md md:max-w-lg lg:max-w-xl mx-auto px-4 sm:px-6 md:px-8">
      <div className="flex gap-1.5 sm:gap-2">
        {axes.map((axis) => {
          const answered = answeredPerAxis[axis] || 0;
          const total = totalPerAxis[axis] || 10;
          const percent = total > 0 ? Math.round((answered / total) * 100) : 0;
          const isActive = axis === currentAxis;
          const isComplete = answered >= total;

          return (
            <div key={axis} className="flex-1">
              <div className="flex items-center justify-between mb-0.5">
                <span
                  className={`text-[10px] sm:text-xs font-bold transition-colors ${
                    isActive
                      ? 'text-primary'
                      : isComplete
                        ? 'text-green-500'
                        : 'text-foreground/40'
                  }`}
                >
                  <span className="hidden sm:inline">{AXIS_CONFIG[axis].emoji} </span>
                  {AXIS_CONFIG[axis].label}
                </span>
                <span
                  className={`text-[9px] sm:text-[10px] font-medium ${
                    isComplete ? 'text-green-500' : 'text-foreground/30'
                  }`}
                >
                  {answered}/{total}
                </span>
              </div>

              <div className="relative h-1.5 sm:h-2 bg-surface-alt rounded-full overflow-hidden">
                <motion.div
                  className={`h-full rounded-full bg-gradient-to-r ${
                    isComplete
                      ? 'from-green-400 to-emerald-400'
                      : AXIS_CONFIG[axis].gradient
                  }`}
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.max(percent, 0)}%` }}
                  transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
                />

                {/* Active indicator pulse */}
                {isActive && !isComplete && (
                  <motion.div
                    className="absolute inset-0 rounded-full border border-primary/30"
                    animate={{ opacity: [0.3, 0.8, 0.3] }}
                    transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
                  />
                )}
              </div>

              {/* Completion checkmark */}
              {isComplete && (
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="text-center mt-0.5"
                >
                  <span className="text-[9px] text-green-500">✓</span>
                </motion.div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
