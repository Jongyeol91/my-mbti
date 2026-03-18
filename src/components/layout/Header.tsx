"use client";

import { Suspense } from "react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

const navItems = [
  { href: "/", label: "홈" },
  { href: "/quiz?mode=simple", label: "간단 테스트" },
  { href: "/quiz?mode=deep", label: "심화 테스트" },
  { href: "/encyclopedia", label: "유형 백과" },
] as const;

function HeaderNav() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  return (
    <nav className="flex items-center gap-1">
      {navItems.map((item) => {
        const [itemPath, itemQuery] = item.href.split("?");
        let isActive: boolean;
        if (item.href === "/") {
          isActive = pathname === "/";
        } else if (itemQuery) {
          const params = new URLSearchParams(itemQuery);
          isActive = pathname.startsWith(itemPath) &&
            [...params].every(([k, v]) => searchParams.get(k) === v);
        } else {
          isActive = pathname.startsWith(itemPath);
        }

        return (
          <Link
            key={item.href}
            href={item.href}
            className={`rounded-full px-3.5 py-1 text-sm transition-colors duration-200 ${
              isActive
                ? "bg-foreground/8 font-semibold text-foreground"
                : "text-foreground/40 hover:text-foreground/70"
            }`}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}

/**
 * Desktop header navigation - hidden on mobile (< md breakpoint).
 * Shows on md+ screens with a horizontal nav bar.
 */
export default function Header() {
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
        <Suspense>
          <HeaderNav />
        </Suspense>
      </div>

      {/* Solid background */}
      <div className="absolute inset-0 -z-10 border-b border-border bg-background" />
    </header>
  );
}
