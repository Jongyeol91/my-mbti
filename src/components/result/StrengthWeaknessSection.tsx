'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import type { StrengthWeakness } from '@/types/mbti';

interface Props {
  data: StrengthWeakness;
  gradient: [string, string];
}

type Tab = 'strengths' | 'weaknesses';

export default function StrengthWeaknessSection({ data, gradient }: Props) {
  const [activeTab, setActiveTab] = useState<Tab>('strengths');

  const tabs: { key: Tab; label: string }[] = [
    { key: 'strengths', label: '강점' },
    { key: 'weaknesses', label: '약점' },
  ];

  const items = activeTab === 'strengths' ? data.strengths : data.weaknesses;
  const isStrengths = activeTab === 'strengths';

  return (
    <div className="overflow-hidden rounded-3xl bg-surface shadow-sm">
      {/* Tab switcher */}
      <div className="flex border-b border-foreground/5">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`relative flex-1 px-4 py-3 text-sm font-bold transition-colors sm:text-base ${
              activeTab === tab.key
                ? 'text-foreground'
                : 'text-foreground/40 hover:text-foreground/60'
            }`}
          >
            <span className="relative z-10">
              {tab.label}
            </span>
            {activeTab === tab.key && (
              <motion.div
                layoutId="sw-tab-indicator"
                className="absolute inset-x-0 bottom-0 h-0.5"
                style={{
                  background: isStrengths
                    ? `linear-gradient(90deg, #10b981, #34d399)`
                    : `linear-gradient(90deg, #f43f5e, #fb7185)`,
                }}
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              />
            )}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="min-h-[200px] p-4 sm:p-6">
        <AnimatePresence mode="wait">
          <motion.ul
            key={activeTab}
            initial={{ opacity: 0, x: isStrengths ? -16 : 16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: isStrengths ? 16 : -16 }}
            transition={{ duration: 0.3 }}
            className="space-y-3"
          >
            {items.map((item, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
                className="flex items-start gap-3"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    delay: i * 0.06 + 0.1,
                    type: 'spring',
                    stiffness: 300,
                  }}
                  className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] font-bold text-white sm:h-6 sm:w-6 sm:text-xs ${
                    isStrengths ? 'bg-emerald-400' : 'bg-rose-400'
                  }`}
                >
                  {i + 1}
                </motion.div>
                <span className="text-xs leading-relaxed text-foreground/70 sm:text-sm sm:leading-relaxed">
                  {item}
                </span>
              </motion.li>
            ))}
          </motion.ul>
        </AnimatePresence>

        {/* Decorative gradient line */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mt-4 h-1 origin-left rounded-full"
          style={{
            background: `linear-gradient(90deg, ${gradient[0]}40, ${gradient[1]}40)`,
          }}
        />
      </div>
    </div>
  );
}
