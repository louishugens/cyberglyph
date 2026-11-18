"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useReducedMotion } from "motion/react";
import { List, X } from "@phosphor-icons/react";
import { Logo } from "@/components/logo";
import { LiquidGlass } from "@/components/motion/liquid-glass";
import { CTA_LABEL, nav } from "@/lib/site";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const pathname = usePathname();
  const reduce = useReducedMotion();
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
  // The pill rests on the current page and follows the pointer across the nav.
  const pill = hovered ?? nav.find((n) => n.href === pathname)?.href ?? null;

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="sticky top-0 z-40 px-3 pt-3 sm:px-6">
      {/* Floating glass bar: the page scrolls, and bends, underneath it. */}
      <LiquidGlass radius={open ? 28 : 999} blur={24} className="mx-auto max-w-6xl bg-background/55">
        <div className="flex h-14 items-center justify-between pr-2 pl-5">
          <Link
            href="/"
            onClick={() => setOpen(false)}
            className="rounded-(--radius-sm) outline-none focus-visible:ring-4 focus-visible:ring-ring"
          >
            <Logo className="h-9" />
          </Link>

          <nav aria-label="Primary" className="hidden items-center md:flex" onPointerLeave={() => setHovered(null)}>
            {nav.map((item) => {
              const current = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={current ? "page" : undefined}
                  onPointerEnter={() => setHovered(item.href)}
                  onFocus={() => setHovered(item.href)}
                  onBlur={() => setHovered(null)}
                  className={cn(
                    "relative rounded-full px-4 py-2 text-sm transition-colors duration-200 outline-none focus-visible:ring-4 focus-visible:ring-ring",
                    current || pill === item.href ? "text-foreground" : "text-muted-foreground",
                  )}
                >
                  {pill === item.href ? (
                    <motion.span
                      layoutId="nav-pill"
                      aria-hidden="true"
                      transition={reduce ? { duration: 0 } : { type: "spring", duration: 0.35, bounce: 0.15 }}
                      className="absolute inset-0 rounded-full bg-white/12 shadow-[inset_0_1px_0_oklch(1_0_0/0.25)]"
                    />
                  ) : null}
                  <span className="relative">{item.label}</span>
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <Link href="/contact" className="btn-primary hidden h-10 px-4 text-sm sm:inline-flex">
              {CTA_LABEL}
            </Link>
            <button
              type="button"
              aria-expanded={open}
              aria-controls="mobile-nav"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((v) => !v)}
              className="pressable inline-flex size-10 items-center justify-center glass-chip rounded-full md:hidden"
            >
              {open ? <X size={18} /> : <List size={18} />}
            </button>
          </div>
        </div>

        <nav id="mobile-nav" aria-label="Mobile" hidden={!open} className="px-3 pt-1 pb-4 md:hidden">
          <ul className="grid gap-1">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  aria-current={pathname === item.href ? "page" : undefined}
                  className="block rounded-(--radius-field) px-3 py-3 text-base text-foreground hover:bg-white/8"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link href="/contact" onClick={() => setOpen(false)} className="btn-primary mt-3 w-full">
            {CTA_LABEL}
          </Link>
        </nav>
      </LiquidGlass>
    </header>
  );
}
