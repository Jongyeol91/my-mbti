'use client';

import { useState, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { getProfile, ALL_TYPES } from '@/lib/profiles';
import { getCompatibilityDetail } from '@/data/compatibility';
import { getMBTILetterColor } from '@/lib/mbti-colors';
import type { MBTIType, CompatibilityLevel } from '@/types/mbti';

const TYPES = ALL_TYPES as MBTIType[];

const LEVEL_STYLE: Record<CompatibilityLevel, { bg: string; label: string }> = {
  best: { bg: 'bg-primary/25', label: '최고' },
  good: { bg: 'bg-decision-t/20', label: '좋은' },
  neutral: { bg: 'bg-foreground/6', label: '보통' },
  bad: { bg: 'bg-decision-f/20', label: '도전' },
};

function getCompatLevel(a: MBTIType, b: MBTIType): CompatibilityLevel {
  if (a === b) return 'neutral';
  const profile = getProfile(a);
  if (!profile) return 'neutral';
  const { compatibility } = profile;
  if (compatibility.best.includes(b)) return 'best';
  if (compatibility.good.includes(b)) return 'good';
  if (compatibility.bad.includes(b)) return 'bad';
  return 'neutral';
}

function ColoredType({ type, size = 'xs' }: { type: string; size?: 'xs' | 'sm' | 'lg' }) {
  const cls = size === 'lg'
    ? 'font-display text-xl font-black tracking-tight'
    : size === 'sm'
    ? 'font-display text-sm font-bold tracking-tight'
    : 'font-display text-[10px] font-bold tracking-tight';
  return (
    <span className={cls}>
      {type.split('').map((l, i) => (
        <span key={i} className={getMBTILetterColor(l)}>{l}</span>
      ))}
    </span>
  );
}

function CompatibilityMatrix() {
  const [selected, setSelected] = useState<{ row: MBTIType; col: MBTIType } | null>(null);

  return (
    <div>
      {/* Legend */}
      <div className="mb-4 flex flex-wrap gap-3 text-xs text-foreground/50">
        {Object.entries(LEVEL_STYLE).map(([key, { bg, label }]) => (
          <span key={key} className="flex items-center gap-1.5">
            <span className={`inline-block h-3 w-3 rounded-sm ${bg}`} />
            {label}
          </span>
        ))}
      </div>

      {/* Matrix table */}
      <div className="overflow-x-auto -mx-1 pb-2">
        <table className="w-full border-separate" style={{ borderSpacing: '2px' }}>
          <thead>
            <tr>
              <th className="w-12" />
              {TYPES.map((type) => (
                <th key={type} className="px-0 py-1 text-center">
                  <span className="text-[9px] font-semibold text-foreground/35 sm:text-[10px]">
                    {type}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {TYPES.map((rowType) => (
              <tr key={rowType}>
                <td className="pr-1 text-right">
                  <span className="text-[9px] font-semibold text-foreground/35 sm:text-[10px]">
                    {rowType}
                  </span>
                </td>
                {TYPES.map((colType) => {
                  const level = getCompatLevel(rowType, colType);
                  const isSelf = rowType === colType;
                  const isSelected =
                    selected?.row === rowType && selected?.col === colType;

                  return (
                    <td key={colType} className="p-0">
                      <button
                        onClick={() =>
                          isSelf
                            ? null
                            : setSelected(
                                isSelected ? null : { row: rowType, col: colType }
                              )
                        }
                        className={`block w-full aspect-square rounded-[3px] transition-opacity duration-150 ${
                          LEVEL_STYLE[level].bg
                        } ${
                          isSelf ? 'opacity-20 cursor-default' : 'cursor-pointer hover:opacity-80 active:scale-90'
                        } ${
                          isSelected ? 'ring-2 ring-foreground/40 ring-offset-1' : ''
                        }`}
                        aria-label={`${rowType} × ${colType}: ${LEVEL_STYLE[level].label}`}
                      />
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Detail panel */}
      <AnimatePresence mode="wait">
        {selected && (() => {
          const { row, col } = selected;
          const level = getCompatLevel(row, col);
          const detail = getCompatibilityDetail(row, col);
          const rowProfile = getProfile(row);
          const colProfile = getProfile(col);

          return (
            <motion.div
              key={`${row}-${col}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.2 }}
              className="mt-4 rounded-lg bg-surface p-5 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_2px_8px_rgba(0,0,0,0.03)]"
            >
              <div className="flex items-center gap-2 text-sm">
                <ColoredType type={row} size="sm" />
                <span className="text-foreground/25">×</span>
                <ColoredType type={col} size="sm" />
                <span className={`ml-1 rounded-full px-2 py-0.5 text-[10px] font-semibold ${LEVEL_STYLE[level].bg} text-foreground/60`}>
                  {LEVEL_STYLE[level].label}
                </span>
              </div>

              <p className="mt-2 text-sm font-medium text-foreground/75">{detail.title}</p>
              <p className="mt-1 text-xs leading-relaxed text-foreground/50">{detail.description}</p>

              {detail.tip && (
                <p className="mt-2 text-[11px] text-foreground/35">Tip: {detail.tip}</p>
              )}

              <div className="mt-3 flex gap-3 text-xs">
                <Link href={`/encyclopedia/${row.toLowerCase()}`} className="text-primary hover:underline">
                  {row} ({rowProfile?.nickname}) →
                </Link>
                <Link href={`/encyclopedia/${col.toLowerCase()}`} className="text-primary hover:underline">
                  {col} ({colProfile?.nickname}) →
                </Link>
              </div>
            </motion.div>
          );
        })()}
      </AnimatePresence>
    </div>
  );
}

export default function CompatibilityPageClient() {
  return (
    <div className="mx-auto max-w-3xl px-4 pb-24 pt-8 md:pt-16">
      <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
        MBTI 궁합표
      </h1>
      <p className="mt-1 text-sm text-foreground/40">
        16가지 유형의 궁합을 한눈에 확인하세요. 셀을 탭하면 상세 설명을 볼 수 있습니다.
      </p>

      <div className="mt-6">
        <Suspense>
          <CompatibilityMatrix />
        </Suspense>
      </div>

      <div className="mt-8 text-center">
        <Link
          href="/quiz/select"
          className="inline-block rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-white shadow-[0_1px_2px_rgba(0,0,0,0.1)] transition-shadow duration-200 hover:shadow-[0_2px_8px_rgba(0,0,0,0.15)] active:scale-[0.96]"
        >
          내 유형 테스트하기
        </Link>
      </div>
    </div>
  );
}
