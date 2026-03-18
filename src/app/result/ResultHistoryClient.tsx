'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import type { MBTIResult, SavedResultsData } from '@/types/mbti';
import { getProfile } from '@/lib/profiles';

const STORAGE_KEY = 'mbti-results';

/** 날짜 포맷팅 (한국어) */
function formatDate(timestamp: number): string {
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const ampm = hours >= 12 ? '오후' : '오전';
  const displayHour = hours % 12 || 12;

  return `${year}.${month}.${day} ${ampm} ${displayHour}:${minutes}`;
}

/** 상대적 시간 표시 */
function relativeTime(timestamp: number): string {
  const now = Date.now();
  const diff = now - timestamp;
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (minutes < 1) return '방금 전';
  if (minutes < 60) return `${minutes}분 전`;
  if (hours < 24) return `${hours}시간 전`;
  if (days < 7) return `${days}일 전`;
  if (days < 30) return `${Math.floor(days / 7)}주 전`;
  return formatDate(timestamp);
}

/** confidence를 퍼센트 표시로 변환 */
function confidenceLabel(confidence: number): string {
  if (confidence >= 80) return '매우 확실';
  if (confidence >= 60) return '확실';
  if (confidence >= 40) return '보통';
  if (confidence >= 20) return '약간';
  return '미미';
}

function confidenceColor(confidence: number): string {
  if (confidence >= 80) return 'text-green-500';
  if (confidence >= 60) return 'text-emerald-400';
  if (confidence >= 40) return 'text-amber-400';
  if (confidence >= 20) return 'text-orange-400';
  return 'text-gray-400';
}

export default function ResultHistoryClient() {
  const [history, setHistory] = useState<MBTIResult[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const data: SavedResultsData = JSON.parse(raw);
        setHistory(data.history || []);
      }
    } catch {
      // localStorage 접근 실패 시 빈 목록
    }
    setIsLoaded(true);
  }, []);

  const clearHistory = () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
      setHistory([]);
    } catch {
      // ignore
    }
  };

  const deleteResult = (id: string) => {
    try {
      const updated = history.filter((r) => r.id !== id);
      setHistory(updated);
      const data: SavedResultsData = {
        lastResult: updated.length > 0 ? updated[0] : null,
        history: updated,
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch {
      // ignore
    }
  };

  if (!isLoaded) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          className="text-4xl"
        >
          🔮
        </motion.div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-[--spacing-container-x-mobile] py-8 sm:px-[--spacing-container-x-tablet] lg:px-[--spacing-container-x-desktop]">
      {/* 헤더 */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 text-center"
      >
        <h1 className="mb-2 text-2xl font-extrabold sm:text-3xl">
          <span className="mr-2">💝</span>
          <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            내 결과 히스토리
          </span>
        </h1>
        <p className="text-sm text-foreground/60">
          지금까지 받은 MBTI 테스트 결과를 확인해보세요
        </p>
      </motion.div>

      {/* 빈 상태 */}
      {history.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="rounded-3xl bg-surface p-8 text-center shadow-md"
        >
          <div className="mb-4 text-6xl">📋</div>
          <h2 className="mb-2 text-lg font-bold text-foreground/80">
            아직 테스트 결과가 없어요
          </h2>
          <p className="mb-6 text-sm text-foreground/50">
            MBTI 테스트를 완료하면 여기에 결과가 저장돼요!
          </p>
          <Link
            href="/quiz/select"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary to-secondary px-6 py-3 text-sm font-bold text-white shadow-lg transition-transform hover:scale-105 active:scale-95"
          >
            ✨ 테스트 시작하기
          </Link>
        </motion.div>
      ) : (
        <>
          {/* 통계 요약 */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-3"
          >
            <div className="rounded-2xl bg-surface p-4 text-center shadow-sm">
              <div className="text-2xl font-extrabold text-primary">
                {history.length}
              </div>
              <div className="text-xs text-foreground/50">총 테스트</div>
            </div>
            <div className="rounded-2xl bg-surface p-4 text-center shadow-sm">
              <div className="text-2xl font-extrabold text-secondary">
                {new Set(history.map((r) => r.type)).size}
              </div>
              <div className="text-xs text-foreground/50">나온 유형 수</div>
            </div>
            <div className="col-span-2 rounded-2xl bg-surface p-4 text-center shadow-sm sm:col-span-1">
              <div className="text-2xl font-extrabold text-accent">
                {getMostFrequentType(history)}
              </div>
              <div className="text-xs text-foreground/50">가장 많이 나온 유형</div>
            </div>
          </motion.div>

          {/* 결과 목록 */}
          <div className="space-y-3">
            <AnimatePresence mode="popLayout">
              {history.map((result, index) => (
                <ResultCard
                  key={result.id}
                  result={result}
                  index={index}
                  isLatest={index === 0}
                  onDelete={deleteResult}
                />
              ))}
            </AnimatePresence>
          </div>

          {/* 전체 삭제 */}
          {history.length > 1 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-8 text-center"
            >
              <button
                onClick={clearHistory}
                className="text-xs text-foreground/30 transition-colors hover:text-red-400"
              >
                🗑️ 전체 히스토리 삭제
              </button>
            </motion.div>
          )}
        </>
      )}
    </div>
  );
}

/** 가장 자주 나온 유형 */
function getMostFrequentType(history: MBTIResult[]): string {
  const counts: Record<string, number> = {};
  for (const r of history) {
    counts[r.type] = (counts[r.type] || 0) + 1;
  }
  return Object.entries(counts).sort((a, b) => b[1] - a[1])[0]?.[0] || '-';
}

/** 개별 결과 카드 */
function ResultCard({
  result,
  index,
  isLatest,
  onDelete,
}: {
  result: MBTIResult;
  index: number;
  isLatest: boolean;
  onDelete: (id: string) => void;
}) {
  const profile = getProfile(result.type);
  const avgConfidence =
    result.scores.length > 0
      ? Math.round(
          result.scores.reduce((sum, s) => sum + s.confidence, 0) /
            result.scores.length
        )
      : 0;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20, scale: 0.95 }}
      transition={{ delay: index * 0.05 }}
    >
      <Link
        href={`/result/${result.type.toLowerCase()}`}
        className="group block"
      >
        <div className="relative overflow-hidden rounded-2xl bg-surface p-4 shadow-sm transition-all hover:shadow-md sm:p-5">
          {/* 최신 배지 */}
          {isLatest && (
            <span className="absolute top-3 right-3 rounded-full bg-gradient-to-r from-primary to-secondary px-2.5 py-0.5 text-[10px] font-bold text-white">
              최신
            </span>
          )}

          <div className="flex items-center gap-4">
            {/* 유형 아이콘 */}
            <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/10 to-secondary/10 text-2xl">
              {profile?.emoji || '🧠'}
            </div>

            {/* 정보 */}
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <span className="text-lg font-extrabold text-foreground/90">
                  {result.type}
                </span>
                {profile && (
                  <span className="truncate text-sm text-foreground/50">
                    {profile.nickname}
                  </span>
                )}
              </div>

              {/* 축별 점수 미니 바 */}
              <div className="mt-1.5 flex gap-1.5">
                {result.scores.map((s) => {
                  const leftPole = s.dimension[0];
                  const rightPole = s.dimension[1];
                  const isLeft = s.score >= 0;
                  return (
                    <div
                      key={s.dimension}
                      className="flex items-center gap-0.5 text-[10px]"
                    >
                      <span
                        className={
                          isLeft
                            ? 'font-bold text-primary'
                            : 'text-foreground/30'
                        }
                      >
                        {leftPole}
                      </span>
                      <div className="h-1 w-6 overflow-hidden rounded-full bg-foreground/10">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-primary to-secondary"
                          style={{
                            width: `${Math.min(100, Math.abs(s.confidence))}%`,
                            marginLeft: isLeft ? '0' : 'auto',
                          }}
                        />
                      </div>
                      <span
                        className={
                          !isLeft
                            ? 'font-bold text-secondary'
                            : 'text-foreground/30'
                        }
                      >
                        {rightPole}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* 메타 정보 */}
              <div className="mt-1 flex items-center gap-3 text-[11px] text-foreground/40">
                <span>
                  {result.mode === 'simple' ? '⚡ 간단' : '🔮 심화'} 모드
                </span>
                <span className={confidenceColor(avgConfidence)}>
                  {confidenceLabel(avgConfidence)} ({avgConfidence}%)
                </span>
                <span>{relativeTime(result.timestamp)}</span>
              </div>
            </div>

            {/* 화살표 */}
            <span className="text-foreground/20 transition-colors group-hover:text-primary">
              →
            </span>
          </div>

          {/* 삭제 버튼 */}
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onDelete(result.id);
            }}
            className="absolute right-3 bottom-3 rounded-full p-1 text-foreground/20 opacity-0 transition-all hover:bg-red-50 hover:text-red-400 group-hover:opacity-100"
            aria-label="결과 삭제"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" />
            </svg>
          </button>
        </div>
      </Link>
    </motion.div>
  );
}
