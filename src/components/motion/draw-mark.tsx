"use client";

import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

/** The CyberGlyph mark, drawn stroke-first, then the keyhole settles in. */
export function DrawMark({ className }: { className?: string }) {
  const reduce = useReducedMotion();
  return (
    <motion.svg
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
      className={cn(className)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-40px" }}
    >
      <motion.path
        d="M24.5 8.2A11 11 0 1 0 24.5 23.8"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        variants={{
          hidden: { pathLength: reduce ? 1 : 0 },
          show: { pathLength: 1, transition: { duration: 1.4, ease: [0.77, 0, 0.175, 1] } },
        }}
      />
      <motion.g
        fill="currentColor"
        style={{ transformOrigin: "16px 17px" }}
        variants={{
          hidden: reduce ? { opacity: 0 } : { opacity: 0, scale: 0.8, y: 2 },
          show: { opacity: 1, scale: 1, y: 0, transition: { delay: 1, type: "spring", duration: 0.6, bounce: 0.25 } },
        }}
      >
        <circle cx="16" cy="13.6" r="3.2" />
        <path d="M14.6 15.5h2.8l.9 6h-4.6z" />
      </motion.g>
    </motion.svg>
  );
}
