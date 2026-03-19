'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import type { CompatibilityInfo, MBTIType } from '@/types/mbti';
import { getProfile } from '@/lib/profiles';
import { getCompatibilityDetail } from '@/data/compatibility';
import { getMBTILetterColor } from '@/lib/mbti-colors';

interface CompatibilitySectionProps {
  compatibility: CompatibilityInfo;
  currentType: MBTIType;
}

const ROWS = [
  { key: 'best' as const, label: '최고' },
  { key: 'good' as const, label: '좋은' },
  { key: 'neutral' as const, label: '보통' },
  { key: 'bad' as const, label: '도전' },
];

function ColoredType({ type, size = 'sm' }: { type: string; size?: 'sm' | 'base' }) {
  const cls = size === 'base'
    ? 'font-display text-base font-black tracking-tight sm:text-lg'
    : 'font-display text-sm font-bold tracking-tight';
  return (
    <span className={cls}>
      {type.split('').map((letter, i) => (
        <span key={i} className={getMBTILetterColor(letter)}>{letter}</span>
      ))}
    </span>
  );
}

export default function CompatibilitySection({
  compatibility,
  currentType,
}: CompatibilitySectionProps) {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <div className="space-y-1">
      {/* Compact table */}
      {ROWS.map((row) => {
        const types = compatibility[row.key];
        if (types.length === 0) return null;

        return (
          <div key={row.key} className={`flex items-center gap-3 py-2.5 border-b border-border/50 last:border-0 ${row.key === 'best' ? 'bg-primary/5 -mx-3 px-3 rounded-md' : ''}`}>
            <span className={`w-10 shrink-0 text-xs font-semibold ${row.key === 'best' ? 'text-primary' : 'text-foreground/40'}`}>
              {row.label}
            </span>
            <div className="flex flex-wrap gap-1.5">
              {types.map((type) => {
                const isExpanded = expanded === `${row.key}-${type}`;
                return (
                  <button
                    key={type}
                    onClick={() => setExpanded(isExpanded ? null : `${row.key}-${type}`)}
                    className={`cursor-pointer rounded-md px-2.5 py-1.5 transition-all duration-200 ${
                      isExpanded
                        ? 'bg-foreground/8 shadow-sm'
                        : 'hover:bg-foreground/5'
                    }`}
                  >
                    <ColoredType type={type} />
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}

      {/* Expanded detail panel */}
      <AnimatePresence mode="wait">
        {expanded && (() => {
          const [, type] = expanded.split('-') as [string, MBTIType];
          const profile = getProfile(type);
          const detail = getCompatibilityDetail(currentType, type);

          return (
            <motion.div
              key={expanded}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="mt-2 rounded-lg bg-surface p-4 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_2px_8px_rgba(0,0,0,0.03)]">
                <div className="flex items-center gap-2">
                  <ColoredType type={type} size="base" />
                  <span className="text-xs text-foreground/40">{profile?.nickname}</span>
                </div>
                <p className="mt-2 text-sm font-medium text-foreground/75">{detail.title}</p>
                <p className="mt-1 text-xs leading-relaxed text-foreground/50">{detail.description}</p>
                {detail.tip && (
                  <p className="mt-2 text-[11px] text-foreground/35">Tip: {detail.tip}</p>
                )}
                <Link
                  href={`/encyclopedia/${type.toLowerCase()}`}
                  className="mt-3 inline-block text-xs font-medium text-primary hover:underline"
                >
                  {type} 상세 보기 →
                </Link>
              </div>
            </motion.div>
          );
        })()}
      </AnimatePresence>
    </div>
  );
}
