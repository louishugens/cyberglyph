"use client";

import { useEffect, useState } from "react";
import { List, X } from "@phosphor-icons/react";
import { Logo } from "@/components/logo";
import { ScrambleText } from "@/components/motion/scramble-text";
import { CTA_LABEL, nav } from "@/lib/site";

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/75 backdrop-blur-xl backdrop-saturate-150">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <a href="#top" aria-label="CyberGlyph Security, home" className="rounded-full outline-none focus-visible:ring-4 focus-visible:ring-ring">
          <Logo />
        </a>

        <nav aria-label="Primary" className="hidden items-center gap-1 md:flex">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-full px-3.5 py-2 text-sm text-muted-foreground transition-colors duration-200 outline-none hover:text-foreground focus-visible:ring-4 focus-visible:ring-ring"
            >
              <ScrambleText>{item.label}</ScrambleText>
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a href="#contact" className="btn-primary hidden h-10 px-4 text-sm sm:inline-flex">
            {CTA_LABEL}
          </a>
          <button
            type="button"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
            className="pressable inline-flex size-10 items-center justify-center rounded-full border border-border md:hidden"
          >
            {open ? <X size={18} /> : <List size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile menu: no animation, it is a utility toggle. */}
      <nav
        id="mobile-nav"
        aria-label="Mobile"
        hidden={!open}
        className="border-t border-border px-4 pt-2 pb-5 md:hidden"
      >
        <ul className="grid gap-1">
          {nav.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                onClick={() => setOpen(false)}
                className="block rounded-(--radius-field) px-3 py-3 text-base text-foreground hover:bg-surface-2"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
        <a href="#contact" onClick={() => setOpen(false)} className="btn-primary mt-3 w-full">
          {CTA_LABEL}
        </a>
      </nav>
    </header>
  );
}
