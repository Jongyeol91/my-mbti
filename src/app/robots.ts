import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: 'https://my-mbti-jongyeol91s-projects.vercel.app/sitemap.xml',
  };
}
