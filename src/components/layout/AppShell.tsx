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

      <MobileBottomNav />
    </>
  );
}
