'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import {
  motion,
  useMotionValue,
  useTransform,
  useAnimation,
  type PanInfo,
} from 'framer-motion';
import type { SwipeQuestion } from '@/types/question';
import type { MBTIPreference } from '@/types/mbti';

interface SwipeQuestionCardProps {
  question: SwipeQuestion;
  onAnswer: (value: MBTIPreference) => void;
}

/** 스와이프 임계값 (px) — 이 거리 이상 드래그하면 선택 확정 */
const SWIPE_THRESHOLD = 60;
/** 빠르게 스와이프할 때 속도 임계값 (px/s) */
const VELOCITY_THRESHOLD = 300;
/** 카드가 날아갈 X 좌표 */
const FLY_DISTANCE = 500;

export default function SwipeQuestionCard({ question, onAnswer }: SwipeQuestionCardProps) {
  const [exiting, setExiting] = useState(false);
  const [pastThreshold, setPastThreshold] = useState<'left' | 'right' | null>(null);
  const controls = useAnimation();
  const containerRef = useRef<HTMLDivElement>(null);

  // 드래그 위치
  const x = useMotionValue(0);

  // 드래그에 따른 회전 (-12도 ~ 12도)
  const rotate = useTransform(x, [-250, 0, 250], [-12, 0, 12]);

  // 동의/비동의 라벨 불투명도
  const agreeOpacity = useTransform(x, [0, SWIPE_THRESHOLD], [0, 1]);
  const disagreeOpacity = useTransform(x, [-SWIPE_THRESHOLD, 0], [1, 0]);

  // 카드 배경색 그라데이션
  const bgGradient = useTransform(
    x,
    [-200, -50, 0, 50, 200],
    [
      'linear-gradient(135deg, rgba(255,107,157,0.08) 0%, rgba(255,248,240,0) 100%)',
      'linear-gradient(135deg, rgba(255,107,157,0.03) 0%, rgba(255,248,240,0) 100%)',
      'linear-gradient(135deg, rgba(255,248,240,0) 0%, rgba(255,248,240,0) 100%)',
      'linear-gradient(135deg, rgba(110,231,183,0.03) 0%, rgba(255,248,240,0) 100%)',
      'linear-gradient(135deg, rgba(110,231,183,0.08) 0%, rgba(255,248,240,0) 100%)',
    ],
  );

  // 동의/비동의 아이콘 스케일
  const agreeScale = useTransform(x, [0, SWIPE_THRESHOLD, 200], [0.5, 1, 1.3]);
  const disagreeScale = useTransform(x, [-200, -SWIPE_THRESHOLD, 0], [1.3, 1, 0.5]);

  // 테두리 색상 변화
  const borderColor = useTransform(
    x,
    [-200, -50, 0, 50, 200],
    [
      'rgba(255,107,157,0.4)',
      'rgba(255,107,157,0.15)',
      'rgba(255,107,157,0.1)',
      'rgba(110,231,183,0.15)',
      'rgba(110,231,183,0.4)',
    ],
  );

  // 카드 그림자 변화
  const boxShadow = useTransform(
    x,
    [-200, 0, 200],
    [
      '0 10px 40px rgba(255,107,157,0.2)',
      '0 4px 20px rgba(0,0,0,0.06)',
      '0 10px 40px rgba(110,231,183,0.2)',
    ],
  );

  // 임계값 통과 시 시각 피드백 추적
  useEffect(() => {
    const unsubscribe = x.on('change', (latest) => {
      if (exiting) return;
      if (latest > SWIPE_THRESHOLD) {
        setPastThreshold((prev) => {
          if (prev !== 'right') return 'right';
          return prev;
        });
      } else if (latest < -SWIPE_THRESHOLD) {
        setPastThreshold((prev) => {
          if (prev !== 'left') return 'left';
          return prev;
        });
      } else {
        setPastThreshold((prev) => {
          if (prev !== null) return null;
          return prev;
        });
      }
    });
    return unsubscribe;
  }, [x, exiting]);

  // 모바일에서 스와이프 중 페이지 스크롤 방지
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let isDragging = false;

    const handleTouchStart = (e: TouchEvent) => {
      // 카드 영역 터치 시작 — 드래그 가능성 마킹
      const target = e.target as HTMLElement;
      if (target.closest('[data-swipe-card]')) {
        isDragging = true;
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      // 카드 드래그 중이면 스크롤 차단
      if (isDragging) {
        e.preventDefault();
      }
    };

    const handleTouchEnd = () => {
      isDragging = false;
    };

    container.addEventListener('touchstart', handleTouchStart, { passive: true });
    container.addEventListener('touchmove', handleTouchMove, { passive: false });
    container.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchmove', handleTouchMove);
      container.removeEventListener('touchend', handleTouchEnd);
    };
  }, []);

  /** 스와이프 확정 처리 — 카드가 화면 밖으로 날아감 */
  const confirmSwipe = useCallback(
    async (direction: 'left' | 'right') => {
      if (exiting) return;
      setExiting(true);

      const targetX = direction === 'right' ? FLY_DISTANCE : -FLY_DISTANCE;
      const targetRotate = direction === 'right' ? 20 : -20;

      await controls.start({
        x: targetX,
        rotate: targetRotate,
        opacity: 0,
        transition: { duration: 0.35, ease: [0.32, 0.72, 0, 1] },
      });

      const value =
        direction === 'right'
          ? question.card.agreeValue
          : question.card.disagreeValue;
      onAnswer(value);
    },
    [exiting, controls, question.card.agreeValue, question.card.disagreeValue, onAnswer],
  );

  /** 드래그 종료 시 판정 */
  const handleDragEnd = useCallback(
    (_: unknown, info: PanInfo) => {
      if (exiting) return;

      const { offset, velocity } = info;

      // 거리 또는 속도 임계값 초과 시 스와이프 확정
      if (offset.x > SWIPE_THRESHOLD || velocity.x > VELOCITY_THRESHOLD) {
        confirmSwipe('right');
      } else if (offset.x < -SWIPE_THRESHOLD || velocity.x < -VELOCITY_THRESHOLD) {
        confirmSwipe('left');
      } else {
        // 임계값 미달 — 탄성 있게 원위치로 복귀
        controls.start({
          x: 0,
          rotate: 0,
          opacity: 1,
          transition: { type: 'spring', stiffness: 500, damping: 30 },
        });
      }
    },
    [exiting, confirmSwipe, controls],
  );

  /** 버튼 클릭 시 (터치 스와이프가 힘든 경우) */
  const handleButtonAnswer = useCallback(
    (direction: 'left' | 'right') => {
      confirmSwipe(direction);
    },
    [confirmSwipe],
  );

  return (
    <div
      ref={containerRef}
      className="flex flex-col items-center gap-4 sm:gap-5 md:gap-6 w-full
                 max-w-md md:max-w-lg lg:max-w-xl mx-auto
                 px-4 sm:px-6 md:px-8"
    >
      {/* 안내 텍스트 */}
      <motion.p
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-xs sm:text-sm text-foreground/50 flex items-center gap-1.5"
      >
        <span className="inline-block animate-bounce">👈</span>
        좌우로 스와이프하세요!
        <span className="inline-block animate-bounce">👉</span>
      </motion.p>

      {/* 스와이프 방향 인디케이터 — 현재 스와이프 방향을 시각적으로 표시 */}
      <div className="relative w-full flex items-center justify-between px-2 h-6">
        <motion.div
          animate={{
            opacity: pastThreshold === 'left' ? 1 : 0.2,
            scale: pastThreshold === 'left' ? 1.15 : 1,
          }}
          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          className="flex items-center gap-1 text-primary/80"
        >
          <span className="text-lg">✕</span>
          <span className="text-xs font-medium">비동의</span>
        </motion.div>
        {/* 스와이프 진행도 바 */}
        <div className="flex-1 mx-3 h-1 rounded-full bg-foreground/5 overflow-hidden">
          <motion.div
            className="h-full rounded-full"
            style={{
              width: useTransform(x, [-150, 0, 150], ['100%', '0%', '100%']),
              backgroundColor: useTransform(
                x,
                [-150, 0, 150],
                ['rgba(255,107,157,0.6)', 'rgba(0,0,0,0)', 'rgba(110,231,183,0.6)'],
              ),
              marginLeft: useTransform(x, [-150, 0], ['0%', '50%']),
              marginRight: useTransform(x, [0, 150], ['50%', '0%']),
            }}
          />
        </div>
        <motion.div
          animate={{
            opacity: pastThreshold === 'right' ? 1 : 0.2,
            scale: pastThreshold === 'right' ? 1.15 : 1,
          }}
          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          className="flex items-center gap-1 text-emerald-500/80"
        >
          <span className="text-xs font-medium">동의</span>
          <span className="text-lg">♥</span>
        </motion.div>
      </div>

      {/* 카드 스택 영역 */}
      <div className="relative w-full aspect-[4/3] sm:aspect-[3/2] max-h-[320px] md:max-h-[380px]">
        {/* 뒤쪽 장식 카드 (깊이감) */}
        <div
          className="absolute inset-2 sm:inset-3 rounded-3xl bg-surface/50 border border-primary/5
                     transform translate-y-2 scale-[0.96]"
        />
        <div
          className="absolute inset-1 sm:inset-2 rounded-3xl bg-surface/70 border border-primary/5
                     transform translate-y-1 scale-[0.98]"
        />

        {/* 메인 스와이프 카드 */}
        <motion.div
          data-swipe-card
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.9}
          dragMomentum={true}
          dragTransition={{ bounceStiffness: 300, bounceDamping: 20 }}
          onDragEnd={handleDragEnd}
          animate={controls}
          style={{
            x,
            rotate,
            borderColor,
            boxShadow,
            backgroundImage: bgGradient,
            touchAction: 'pan-y',
          }}
          className="absolute inset-0 p-5 sm:p-6 md:p-8 lg:p-10 rounded-3xl bg-surface
                     border-2
                     flex flex-col items-center justify-center gap-3 sm:gap-4
                     cursor-grab active:cursor-grabbing select-none
                     will-change-transform"
          whileTap={{ scale: 0.98 }}
        >
          {/* 동의 라벨 (오른쪽으로 스와이프 시) */}
          <motion.div
            style={{ opacity: agreeOpacity, scale: agreeScale }}
            className="absolute top-3 left-3 sm:top-4 sm:left-4
                       px-3 py-1.5 sm:px-4 sm:py-2
                       rounded-full bg-mint/90 text-white font-bold
                       text-xs sm:text-sm
                       shadow-md shadow-mint/20
                       flex items-center gap-1
                       pointer-events-none"
          >
            <span>👍</span>
            <span>동의!</span>
          </motion.div>

          {/* 비동의 라벨 (왼쪽으로 스와이프 시) */}
          <motion.div
            style={{ opacity: disagreeOpacity, scale: disagreeScale }}
            className="absolute top-3 right-3 sm:top-4 sm:right-4
                       px-3 py-1.5 sm:px-4 sm:py-2
                       rounded-full bg-primary/90 text-white font-bold
                       text-xs sm:text-sm
                       shadow-md shadow-primary/20
                       flex items-center gap-1
                       pointer-events-none"
          >
            <span>비동의</span>
            <span>👎</span>
          </motion.div>

          {/* 임계값 통과 시 펄스 이펙트 */}
          {pastThreshold && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: [0.3, 0], scale: [1, 1.5] }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className={`absolute inset-0 rounded-3xl pointer-events-none ${
                pastThreshold === 'right'
                  ? 'border-2 border-mint/40'
                  : 'border-2 border-primary/40'
              }`}
            />
          )}

          {/* 카드 내용 */}
          {question.card.emoji && (
            <motion.span
              initial={{ scale: 0, rotate: -20 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 15, delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-6xl drop-shadow-sm pointer-events-none"
            >
              {question.card.emoji}
            </motion.span>
          )}
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-center
                       leading-relaxed text-foreground px-2 pointer-events-none"
          >
            {question.card.statement}
          </motion.p>

          {/* 스와이프 방향 힌트 아이콘 */}
          <div className="absolute bottom-3 sm:bottom-4 left-0 right-0 flex justify-between px-4 sm:px-6 pointer-events-none">
            <motion.span
              style={{ opacity: disagreeOpacity }}
              className="text-primary/60 text-lg sm:text-xl"
            >
              ✕
            </motion.span>
            <motion.span
              style={{ opacity: agreeOpacity }}
              className="text-emerald-500/60 text-lg sm:text-xl"
            >
              ♥
            </motion.span>
          </div>
        </motion.div>
      </div>

      {/* 버튼 대안 (터치가 힘든 경우 또는 데스크톱) */}
      <div className="flex gap-3 sm:gap-4 w-full">
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.92 }}
          onClick={() => handleButtonAnswer('left')}
          disabled={exiting}
          className="flex-1 py-3 sm:py-3.5 md:py-4 rounded-2xl
                     bg-primary/10 text-primary font-bold
                     text-sm sm:text-base md:text-lg
                     border-2 border-primary/20 hover:border-primary/40
                     hover:bg-primary/15 hover:shadow-md hover:shadow-primary/10
                     transition-all duration-200
                     cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed
                     flex items-center justify-center gap-1.5"
        >
          <span>👎</span>
          <span>아니요</span>
        </motion.button>
        <motion.button
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.92 }}
          onClick={() => handleButtonAnswer('right')}
          disabled={exiting}
          className="flex-1 py-3 sm:py-3.5 md:py-4 rounded-2xl
                     bg-mint/10 text-emerald-600 font-bold
                     text-sm sm:text-base md:text-lg
                     border-2 border-mint/30 hover:border-mint/50
                     hover:bg-mint/15 hover:shadow-md hover:shadow-mint/10
                     transition-all duration-200
                     cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed
                     flex items-center justify-center gap-1.5"
        >
          <span>네!</span>
          <span>👍</span>
        </motion.button>
      </div>
    </div>
  );
}
