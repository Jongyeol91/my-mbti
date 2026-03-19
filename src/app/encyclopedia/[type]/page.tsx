import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import type { MBTIType } from '@/types/mbti';
import { getProfile, ALL_TYPES } from '@/lib/profiles';
import TypeDetailPageClient from './TypeDetailPageClient';

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
    return { title: 'MBTI 유형 | 나의 MBTI 테스트' };
  }

  const BASE_URL = 'https://my-mbti-jongyeol91s-projects.vercel.app';
  return {
    title: `${profile.type} ${profile.nickname} | MBTI 유형 백과사전`,
    description: profile.summary,
    alternates: {
      canonical: `${BASE_URL}/encyclopedia/${type}`,
    },
    openGraph: {
      title: `${profile.type} ${profile.nickname} | MBTI 유형 백과사전`,
      description: profile.summary,
      type: 'website',
      locale: 'ko_KR',
      url: `${BASE_URL}/encyclopedia/${type}`,
    },
    twitter: {
      card: 'summary_large_image' as const,
      title: `${profile.type} ${profile.nickname} | MBTI 유형 백과사전`,
      description: profile.summary,
    },
  };
}

export default async function EncyclopediaTypeDetailRoute({ params }: Props) {
  const { type } = await params;
  const mbtiType = type.toUpperCase() as MBTIType;
  const profile = getProfile(mbtiType);

  if (!profile) {
    notFound();
  }

  return <TypeDetailPageClient profile={profile} />;
}
