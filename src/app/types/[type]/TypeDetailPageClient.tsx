'use client';

import type { MBTITypeProfile } from '@/types/mbti';
import TypeDetailPage from '@/components/encyclopedia/TypeDetailPage';

interface Props {
  profile: MBTITypeProfile;
}

export default function TypeDetailPageClient({ profile }: Props) {
  return <TypeDetailPage profile={profile} />;
}
