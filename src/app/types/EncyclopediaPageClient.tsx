'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import TypeGrid from '@/components/encyclopedia/TypeGrid';

export default function EncyclopediaPageClient() {
  return (
    <div className="min-h-dvh bg-background">
      <div className="mx-auto max-w-4xl px-4 pb-20 pt-6 sm:px-6 md:px-8 lg:pt-10">
        {/* Header */}
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

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8 text-center sm:mb-10 md:mb-12"
        >
          <h1 className="mb-2 text-2xl font-black tracking-tight sm:text-3xl md:text-4xl">
            📚 MBTI{' '}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              유형 백과사전
            </span>
          </h1>
          <p className="text-sm text-foreground/50 sm:text-base">
            16가지 성격 유형을 탐험해보세요!
          </p>
        </motion.div>

        {/* Type Grid */}
        <TypeGrid />

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-12 text-center sm:mt-16"
        >
          <div className="rounded-3xl bg-gradient-to-br from-primary/10 to-secondary/10 p-6 sm:p-8">
            <p className="mb-2 text-lg font-bold sm:text-xl">나의 유형은 뭘까? 🤔</p>
            <p className="mb-5 text-xs text-foreground/50 sm:text-sm">
              테스트를 통해 직접 확인해보세요!
            </p>
            <Link
              href="/quiz?mode=simple"
              className="inline-block rounded-full bg-gradient-to-r from-primary to-secondary px-6 py-3 text-sm font-bold text-white shadow-lg shadow-primary/20 transition-transform active:scale-95 sm:px-8"
            >
              테스트 시작하기 →
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
