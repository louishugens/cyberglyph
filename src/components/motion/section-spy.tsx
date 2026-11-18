"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

/** Sticky in-page nav: the marker slides to whichever section is being read. */
export function SectionSpy({ items }: { items: { id: string; label: string }[] }) {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(items[0]?.id);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id);
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    for (const { id } of items) {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    }
    return () => io.disconnect();
  }, [items]);

  return (
    <nav aria-label="Services on this page">
      <ul className="grid gap-1 border-l border-border">
        {items.map((item) => (
          <li key={item.id} className="relative">
            {active === item.id ? (
              <motion.span
                layoutId="spy-marker"
                aria-hidden="true"
                transition={reduce ? { duration: 0 } : { type: "spring", duration: 0.45, bounce: 0.15 }}
                className="absolute inset-y-0 -left-px w-0.5 bg-gold"
              />
            ) : null}
            <a
              href={`#${item.id}`}
              aria-current={active === item.id ? "location" : undefined}
              className={cn(
                "block py-2 pl-5 text-[15px] leading-snug transition-colors duration-200 outline-none hover:text-foreground focus-visible:text-foreground",
                active === item.id ? "text-foreground" : "text-muted-foreground",
              )}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
