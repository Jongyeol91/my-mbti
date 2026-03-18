'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { getAllProfiles, TYPE_GROUPS, TYPE_GROUP_LABELS } from '@/lib/profiles';
import type { MBTIType } from '@/types/mbti';
import EncyclopediaCard from '@/components/encyclopedia/EncyclopediaCard';

const GROUP_KEYS = Object.keys(TYPE_GROUPS) as Array<keyof typeof TYPE_GROUPS>;

type FilterMode = 'all' | keyof typeof TYPE_GROUPS;

export default function EncyclopediaPageClient() {
  const allProfiles = getAllProfiles();
  const profileMap = new Map(allProfiles.map((p) => [p.type, p]));
  const [activeFilter, setActiveFilter] = useState<FilterMode>('all');

  const filteredGroups =
    activeFilter === 'all'
      ? GROUP_KEYS
      : [activeFilter];

  return (
    <div className="min-h-dvh bg-background">
      <div className="mx-auto max-w-5xl px-[--spacing-container-x-mobile] pb-24 pt-6 sm:px-[--spacing-container-x-tablet] md:px-[--spacing-container-x-desktop] lg:pt-10">
        {/* Back link */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-2"
        >
          <Link
            href="/"
            className="inline-flex items-center gap-1 rounded-full bg-surface/80 px-3 py-1.5 text-xs font-medium text-foreground/60 backdrop-blur-sm transition-colors hover:text-foreground sm:text-sm"
          >
            ← 홈으로
          </Link>
        </motion.div>

        {/* Page header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-6 text-center sm:mb-8 md:mb-10"
        >
          <h1 className="mb-2 text-2xl font-black tracking-tight sm:text-3xl md:text-4xl">
            MBTI 유형 백과사전
          </h1>
          <p className="text-sm text-foreground/50 sm:text-base">
            16가지 성격 유형을 탐험해보세요
          </p>
        </motion.div>

        {/* Filter tabs */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8 flex flex-wrap items-center justify-center gap-2 sm:mb-10"
        >
          <FilterTab
            label="전체"
            active={activeFilter === 'all'}
            onClick={() => setActiveFilter('all')}
          />
          {GROUP_KEYS.map((key) => {
            const info = TYPE_GROUP_LABELS[key];
            return (
              <FilterTab
                key={key}
                label={info.label}
                active={activeFilter === key}
                onClick={() => setActiveFilter(key)}
              />
            );
          })}
        </motion.div>

        {/* Type groups */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="space-y-10 sm:space-y-12 md:space-y-14"
          >
            {filteredGroups.map((groupKey, groupIdx) => {
              const types = TYPE_GROUPS[groupKey];
              const groupInfo = TYPE_GROUP_LABELS[groupKey];

              return (
                <section key={groupKey}>
                  {/* Group header */}
                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-40px' }}
                    transition={{ delay: groupIdx * 0.08, duration: 0.4 }}
                    className="mb-4 text-center sm:mb-6"
                  >
                    <h2 className="text-lg font-bold sm:text-xl md:text-2xl">
                      {groupInfo.label}
                    </h2>
                  </motion.div>

                  {/* Cards grid */}
                  <div className="grid grid-cols-2 gap-2.5 sm:gap-4 md:grid-cols-4 md:gap-5">
                    {(types as MBTIType[]).map((type, i) => {
                      const profile = profileMap.get(type);
                      if (!profile) return null;
                      return (
                        <EncyclopediaCard
                          key={type}
                          profile={profile}
                          index={groupIdx * 4 + i}
                        />
                      );
                    })}
                  </div>
                </section>
              );
            })}
          </motion.div>
        </AnimatePresence>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-12 text-center sm:mt-16"
        >
          <div className="rounded-3xl bg-surface-alt p-6 sm:p-8">
            <p className="mb-2 text-lg font-bold sm:text-xl">나의 유형은 뭘까?</p>
            <p className="mb-5 text-xs text-foreground/50 sm:text-sm">
              테스트를 통해 직접 확인해보세요
            </p>
            <Link
              href="/quiz?mode=simple"
              className="inline-block rounded-full bg-primary px-6 py-3 text-sm font-bold text-white shadow-lg shadow-primary/20 transition-opacity hover:opacity-90 active:scale-95 sm:px-8"
            >
              테스트 시작하기 →
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

/* ── Filter Tab ─────────────────────────────────────── */

interface FilterTabProps {
  label: string;
  active: boolean;
  onClick: () => void;
}

function FilterTab({ label, active, onClick }: FilterTabProps) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors sm:px-4 sm:py-2 sm:text-sm ${
        active
          ? 'bg-primary text-white'
          : 'bg-surface-alt text-foreground/60 hover:bg-surface text-foreground/80'
      }`}
    >
      {label}
    </button>
  );
}
