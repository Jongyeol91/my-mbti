import type { MetadataRoute } from 'next';

const BASE_URL = 'https://my-mbti-jongyeol91s-projects.vercel.app';

const MBTI_TYPES = [
  'istj', 'isfj', 'infj', 'intj',
  'istp', 'isfp', 'infp', 'intp',
  'estp', 'esfp', 'enfp', 'entp',
  'estj', 'esfj', 'enfj', 'entj',
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/quiz/select`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/encyclopedia`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/compatibility`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
  ];

  const encyclopediaRoutes: MetadataRoute.Sitemap = MBTI_TYPES.map((type) => ({
    url: `${BASE_URL}/encyclopedia/${type}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  const compatibilityRoutes: MetadataRoute.Sitemap = MBTI_TYPES.map((type) => ({
    url: `${BASE_URL}/compatibility/${type}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...encyclopediaRoutes, ...compatibilityRoutes];
}
