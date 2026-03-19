import type { Metadata, Viewport } from "next";
import AppShell from "@/components/layout/AppShell";
import "./globals.css";

const BASE_URL = "https://my-mbti-jongyeol91s-projects.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_BASE_URL ?? BASE_URL
  ),
  title: "나의 MBTI 테스트 | 귀여운 성격 유형 검사",
  description:
    "재미있는 질문으로 알아보는 나의 MBTI 성격 유형! 간단 모드 12문항, 심화 모드 40문항으로 정확한 결과를 확인하세요.",
  keywords: [
    "MBTI", "MBTI 테스트", "성격 유형 검사", "MBTI 유형", "성격 테스트",
    "MBTI 궁합", "MBTI 백과사전", "인격 유형", "심리 테스트",
    "INFP", "INFJ", "INTJ", "INTP", "ISFP", "ISFJ", "ISTJ", "ISTP",
    "ENFP", "ENFJ", "ENTJ", "ENTP", "ESFP", "ESFJ", "ESTJ", "ESTP"
  ],
  alternates: {
    canonical: BASE_URL,
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "나의 MBTI 테스트 | 귀여운 성격 유형 검사",
    description: "재미있는 질문으로 알아보는 나의 MBTI 성격 유형! 간단 모드 12문항, 심화 모드 40문항으로 정확한 결과를 확인하세요.",
    type: "website",
    locale: "ko_KR",
    siteName: "나의 MBTI 테스트",
    url: BASE_URL,
    images: [
      {
        url: `${BASE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "나의 MBTI 테스트",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "나의 MBTI 테스트 | 귀여운 성격 유형 검사",
    description: "재미있는 질문으로 알아보는 나의 MBTI 성격 유형!",
    images: [`${BASE_URL}/og-image.png`],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#ff6b9d",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "나의 MBTI 테스트",
  "description": "재미있는 질문으로 알아보는 나의 MBTI 성격 유형",
  "url": BASE_URL,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased">
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
