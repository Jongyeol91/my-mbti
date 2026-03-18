import { ReactNode } from "react";

interface ResponsiveContainerProps {
  children: ReactNode;
  /** Maximum width class - defaults to max-w-lg (32rem/512px) for content, use "wide" for max-w-4xl */
  size?: "narrow" | "default" | "wide" | "full";
  /** Additional className */
  className?: string;
  /** HTML element to render as */
  as?: "div" | "section" | "main" | "article";
}

const sizeMap = {
  narrow: "max-w-md",    // 28rem / 448px
  default: "max-w-lg",   // 32rem / 512px
  wide: "max-w-4xl",     // 56rem / 896px
  full: "max-w-full",
} as const;

/**
 * Responsive container component that provides consistent horizontal padding
 * and max-width constraints across breakpoints.
 *
 * Mobile-first: starts with 20px padding, scales up for tablet/desktop.
 */
export default function ResponsiveContainer({
  children,
  size = "default",
  className = "",
  as: Tag = "div",
}: ResponsiveContainerProps) {
  return (
    <Tag
      className={`mx-auto w-full px-5 sm:px-8 md:px-10 ${sizeMap[size]} ${className}`}
    >
      {children}
    </Tag>
  );
}
