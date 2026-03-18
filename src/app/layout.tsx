import type { Metadata, Viewport } from "next";
import AppShell from "@/components/layout/AppShell";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_BASE_URL ?? "https://my-mbti.vercel.app"
  ),
  title: "나의 MBTI 테스트 | 귀여운 성격 유형 검사",
  description:
    "재미있는 질문으로 알아보는 나의 MBTI 성격 유형! 간단 모드 12문항, 심화 모드 40문항으로 정확한 결과를 확인하세요.",
  openGraph: {
    title: "나의 MBTI 테스트",
    description: "재미있는 질문으로 알아보는 나의 MBTI 성격 유형!",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#ff6b9d",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body className="antialiased">
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
