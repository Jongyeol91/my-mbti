"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/", label: "홈" },
  { href: "/quiz/select", label: "테스트" },
  { href: "/encyclopedia", label: "유형 백과" },
  { href: "/compatibility", label: "궁합표" },
] as const;

/**
 * Mobile bottom navigation bar - visible only on screens < md breakpoint.
 * Fixed to bottom with safe area inset support for notched devices.
 */
export default function MobileBottomNav() {
  const pathname = usePathname();

  // Hide bottom nav during active quiz
  const isQuizActive = pathname === "/quiz";
  if (isQuizActive) return null;

  return (
    <nav className="fixed right-0 bottom-0 left-0 z-50 md:hidden">
      <div className="absolute inset-0 -z-10 border-t border-border bg-background" />

      <div
        className="flex items-center justify-around"
        style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
      >
        {navItems.map((item) => {
          const isActive =
            item.href === "/"
              ? pathname === "/"
              : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className="relative flex flex-1 flex-col items-center gap-0.5 py-3"
            >
              {isActive && (
                <motion.span
                  layoutId="bottom-nav-active"
                  className="absolute -top-px left-1/2 h-0.5 w-8 -translate-x-1/2 rounded-full bg-primary"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              <span
                className={`text-xs font-medium transition-colors ${
                  isActive ? "text-foreground" : "text-foreground/40"
                }`}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
