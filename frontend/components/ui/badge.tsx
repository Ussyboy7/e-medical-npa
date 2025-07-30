// components/ui/badge.tsx
// components/ui/badge.tsx
"use client";

import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "outline" | "secondary" | "destructive";
  className?: string;
}

/**
 * Reusable Badge component with variant support:
 * - default: primary background
 * - outline: bordered
 * - secondary: neutral background
 * - destructive: red background for errors/warnings
 */
export function Badge({ children, variant = "default", className }: BadgeProps) {
  const base = "inline-flex items-center rounded-full px-2 py-1 text-xs font-medium";

  const variants: Record<NonNullable<BadgeProps["variant"]>, string> = {
    default: "bg-primary text-primary-foreground",
    outline: "border border-input text-foreground",
    secondary: "bg-secondary text-secondary-foreground",
    destructive: "bg-red-100 text-red-800", // added
  };

  return (
    <span className={cn(base, variants[variant], className)}>
      {children}
    </span>
  );
}