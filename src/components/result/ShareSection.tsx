'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { MBTIType } from '@/types/mbti';

interface ShareSectionProps {
  type: MBTIType;
  nickname: string;
}

/** Generate a shareable URL with the MBTI type result */
function getShareUrl(type: MBTIType): string {
  if (typeof window === 'undefined') return '';
  const baseUrl = window.location.origin;
  return `${baseUrl}/result/${type}?shared=true`;
}

/** Get share text for social platforms */
function getShareText(type: MBTIType, nickname: string): string {
  return `나의 MBTI 유형은 ${type} (${nickname})!\n너도 테스트 해볼래?`;
}

/** Copy text to clipboard with fallback */
async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    // Fallback for older browsers
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-9999px';
    document.body.appendChild(textArea);
    textArea.select();
    try {
      document.execCommand('copy');
      return true;
    } catch {
      return false;
    } finally {
      document.body.removeChild(textArea);
    }
  }
}

/** Individual share button component */
function ShareButton({
  icon,
  label,
  onClick,
  bgClass,
  textClass = 'text-white',
}: {
  icon: string;
  label: string;
  onClick: () => void;
  bgClass: string;
  textClass?: string;
}) {
  return (
    <motion.button
      whileHover={{ scale: 1.06, y: -2 }}
      whileTap={{ scale: 0.94 }}
      onClick={onClick}
      className={`flex w-full items-center justify-center gap-2 rounded-2xl px-4 py-3 text-sm font-semibold shadow-sm transition-shadow hover:shadow-md sm:w-auto sm:min-w-[140px] ${bgClass} ${textClass}`}
    >
      <span className="text-base">{icon}</span>
      {label}
    </motion.button>
  );
}

/** Toast notification for copy feedback */
function CopyToast({ show }: { show: boolean }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.9 }}
          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          className="absolute -top-12 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-foreground px-4 py-2 text-xs font-semibold text-background shadow-lg"
        >
          ✅ 링크가 복사되었어요!
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function ShareSection({ type, nickname }: ShareSectionProps) {
  const [showToast, setShowToast] = useState(false);

  const shareUrl = getShareUrl(type);
  const shareText = getShareText(type, nickname);

  /** URL 복사 */
  const handleCopyLink = useCallback(async () => {
    const success = await copyToClipboard(shareUrl);
    if (success) {
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2000);
    }
  }, [shareUrl]);

  /** 카카오톡 공유 (Kakao SDK or fallback) */
  const handleShareKakao = useCallback(() => {
    // Check if Kakao SDK is available
    const kakao = (window as unknown as Record<string, unknown>).Kakao as {
      isInitialized?: () => boolean;
      Share?: {
        sendDefault: (params: Record<string, unknown>) => void;
      };
    } | undefined;

    if (kakao?.isInitialized?.() && kakao.Share) {
      kakao.Share.sendDefault({
        objectType: 'feed',
        content: {
          title: `나의 MBTI는 ${type} (${nickname})`,
          description: '나도 MBTI 테스트 해보기!',
          imageUrl: `${window.location.origin}/share/${type.toLowerCase()}.png`,
          link: {
            mobileWebUrl: shareUrl,
            webUrl: shareUrl,
          },
        },
        buttons: [
          {
            title: '테스트 하러 가기',
            link: {
              mobileWebUrl: `${window.location.origin}/quiz/select`,
              webUrl: `${window.location.origin}/quiz/select`,
            },
          },
        ],
      });
    } else {
      // Fallback: open Kakao share via URL scheme or mobile share
      const kakaoShareUrl = `https://story.kakao.com/share?url=${encodeURIComponent(shareUrl)}`;
      window.open(kakaoShareUrl, '_blank', 'noopener,noreferrer,width=600,height=400');
    }
  }, [type, nickname, shareUrl]);

  /** 트위터/X 공유 */
  const handleShareTwitter = useCallback(() => {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
    window.open(twitterUrl, '_blank', 'noopener,noreferrer,width=600,height=400');
  }, [shareText, shareUrl]);

  /** 페이스북 공유 */
  const handleShareFacebook = useCallback(() => {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(shareText)}`;
    window.open(facebookUrl, '_blank', 'noopener,noreferrer,width=600,height=400');
  }, [shareText, shareUrl]);

  /** Web Share API (모바일 네이티브 공유) */
  const handleNativeShare = useCallback(async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `나의 MBTI는 ${type} (${nickname})`,
          text: shareText,
          url: shareUrl,
        });
      } catch {
        // User cancelled or error - ignore
      }
    }
  }, [type, nickname, shareText, shareUrl]);

  const hasNativeShare = typeof navigator !== 'undefined' && !!navigator.share;

  return (
    <div className="relative flex flex-col items-center gap-4">
      {/* Share image preview card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="w-full overflow-hidden rounded-2xl shadow-lg"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`/images/share/${type.toLowerCase()}.svg`}
          alt={`${type} ${nickname} 공유 이미지`}
          className="aspect-[1200/630] w-full object-cover"
          loading="lazy"
        />
      </motion.div>

      {/* Copy toast */}
      <CopyToast show={showToast} />

      {/* SNS Share buttons grid */}
      <div className="grid w-full grid-cols-2 gap-2 sm:flex sm:flex-wrap sm:justify-center sm:gap-3">
        {/* 카카오톡 */}
        <ShareButton
          icon="💬"
          label="카카오톡"
          onClick={handleShareKakao}
          bgClass="bg-[#FEE500] hover:bg-[#FDD835]"
          textClass="text-[#391B1B]"
        />

        {/* 트위터/X */}
        <ShareButton
          icon="𝕏"
          label="트위터"
          onClick={handleShareTwitter}
          bgClass="bg-black hover:bg-gray-800"
          textClass="text-white"
        />

        {/* 페이스북 */}
        <ShareButton
          icon="📘"
          label="페이스북"
          onClick={handleShareFacebook}
          bgClass="bg-[#1877F2] hover:bg-[#166FE5]"
          textClass="text-white"
        />

        {/* 링크 복사 */}
        <ShareButton
          icon="🔗"
          label="링크 복사"
          onClick={handleCopyLink}
          bgClass="bg-foreground/5 hover:bg-foreground/10"
          textClass="text-foreground"
        />
      </div>

      {/* Native share button (mobile) */}
      {hasNativeShare && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={handleNativeShare}
          className="mt-1 flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-primary/10 to-secondary/10 px-5 py-3 text-sm font-semibold text-foreground/70 transition-colors hover:from-primary/20 hover:to-secondary/20 sm:w-auto"
        >
          📲 다른 앱으로 공유하기
        </motion.button>
      )}

      {/* Share URL preview */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="mt-1 w-full max-w-sm"
      >
        <div
          onClick={handleCopyLink}
          className="flex cursor-pointer items-center gap-2 rounded-xl bg-foreground/[0.03] px-3 py-2 transition-colors hover:bg-foreground/[0.06]"
        >
          <span className="text-xs text-foreground/30">🔗</span>
          <span className="flex-1 truncate text-xs text-foreground/30">
            {typeof window !== 'undefined' ? shareUrl : ''}
          </span>
          <span className="shrink-0 text-[10px] font-medium text-foreground/40">
            탭하여 복사
          </span>
        </div>
      </motion.div>
    </div>
  );
}
