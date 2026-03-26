"use client";

import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import Header from "./Header";
import MobileBottomNav from "./MobileBottomNav";

interface AppShellProps {
  children: ReactNode;
}

/**
 * Client-side app shell that wraps the page content with:
 * - Desktop header navigation (hidden on mobile)
 * - Mobile bottom navigation (hidden on desktop, hidden during quiz)
 * - Proper spacing offsets for fixed nav elements
 */
export default function AppShell({ children }: AppShellProps) {
  const pathname = usePathname();
  const isQuizActive = pathname.startsWith("/quiz");

  return (
    <>
      <Header />

      {/* Main content area with nav offsets */}
      <main
        className={`min-h-dvh md:pt-[--height-header] ${
          !isQuizActive ? "has-bottom-nav md:pb-0" : ""
        }`}
      >
        {children}
      </main>

      {/* Footer disclaimer */}
      {!isQuizActive && (
        <footer className="border-t border-border px-4 py-6 text-center text-[11px] leading-relaxed text-foreground/25 md:py-8">
          이 테스트는 공식 MBTI® 검사가 아닌 재미용 성격 유형 테스트입니다.
          <br className="sm:hidden" />{" "}
          MBTI는 The Myers-Briggs Company의 등록 상표입니다.
        </footer>
      )}

      <MobileBottomNav />
    </>
  );
}
