import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import type { MBTIType } from '@/types/mbti';
import { getProfile, getAllProfiles, ALL_TYPES } from '@/lib/profiles';
import CompatibilityDetailClient from './CompatibilityDetailClient';

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
    return { title: 'MBTI 궁합 | 나의 MBTI 테스트' };
  }

  return {
    title: `${profile.type} 궁합 비교 | 나의 MBTI`,
    description: `${profile.type} ${profile.nickname}의 모든 유형별 궁합을 확인해보세요!`,
    openGraph: {
      title: `${profile.type} 궁합 비교`,
      description: `${profile.type} ${profile.nickname}과(와) 잘 맞는 유형은?`,
    },
  };
}

export default async function CompatibilityTypePage({ params }: Props) {
  const { type } = await params;
  const mbtiType = type.toUpperCase() as MBTIType;
  const profile = getProfile(mbtiType);

  if (!profile) {
    notFound();
  }

  const allProfiles = getAllProfiles();

  return <CompatibilityDetailClient profile={profile} allProfiles={allProfiles} />;
}
