import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import type { MBTIType } from '@/types/mbti';
import { getProfile, ALL_TYPES } from '@/lib/profiles';
import ResultPageClient from './ResultPageClient';

interface Props {
  params: Promise<{ type: string }>;
}

export function generateStaticParams() {
  return ALL_TYPES.map((type) => ({
    type: type.toLowerCase(),
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { type } = await params;
  const mbtiType = type.toUpperCase() as MBTIType;
  const profile = getProfile(mbtiType);

  if (!profile) {
    return { title: 'MBTI 결과 | 나의 MBTI 테스트' };
  }

  const shareImageUrl = `/images/share/${profile.type.toLowerCase()}.svg`;
  const ogTitle = `나는 ${profile.type} - ${profile.nickname}! ${profile.emoji}`;
  const ogDescription = `${profile.summary} | 나도 MBTI 테스트 해보기!`;

  return {
    title: `${profile.type} ${profile.nickname} | 나의 MBTI 결과`,
    description: profile.summary,
    openGraph: {
      title: ogTitle,
      description: ogDescription,
      type: 'website',
      siteName: '나의 MBTI 테스트',
      images: [
        {
          url: shareImageUrl,
          width: 1200,
          height: 630,
          alt: `${profile.type} ${profile.nickname} - MBTI 결과`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: ogTitle,
      description: ogDescription,
      images: [shareImageUrl],
    },
  };
}

export default async function ResultPage({ params }: Props) {
  const { type } = await params;
  const mbtiType = type.toUpperCase() as MBTIType;
  const profile = getProfile(mbtiType);

  if (!profile) {
    notFound();
  }

  return (
    <Suspense fallback={
      <div className="flex min-h-dvh items-center justify-center">
        <p className="text-sm text-foreground/50">결과 불러오는 중...</p>
      </div>
    }>
      <ResultPageClient profile={profile} />
    </Suspense>
  );
}
