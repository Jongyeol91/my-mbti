"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/", label: "홈" },
  { href: "/quiz?mode=simple", label: "간단 테스트" },
  { href: "/quiz?mode=deep", label: "심화 테스트" },
  { href: "/encyclopedia", label: "유형 백과" },
] as const;

/**
 * Desktop header navigation - hidden on mobile (< md breakpoint).
 * Shows on md+ screens with a horizontal nav bar.
 */
export default function Header() {
  const pathname = usePathname();

  return (
    <header className="fixed top-0 right-0 left-0 z-50 hidden md:block">
      <div className="mx-auto flex h-[--height-header] max-w-4xl items-center justify-between px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <span className="font-display text-xl font-black tracking-tighter">
            <span className="text-primary">MBTI</span>
          </span>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="flex items-center gap-1">
          {navItems.map((item) => {
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href.split("?")[0]);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative px-4 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? "text-foreground"
                    : "text-foreground/50 hover:text-foreground/80"
                }`}
              >
                <span className="relative">
                  {item.label}
                  {isActive && (
                    <span className="absolute -bottom-1 left-0 h-px w-full bg-foreground" />
                  )}
                </span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Frosted glass background */}
      <div className="absolute inset-0 -z-10 border-b border-foreground/5 bg-background/80 backdrop-blur-lg" />
    </header>
  );
}
