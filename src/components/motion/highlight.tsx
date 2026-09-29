"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

/**
 * Marker highlight that sweeps in behind a key phrase once it scrolls into
 * view. Drawn with background-size so it wraps across lines like real ink.
 */
export function Highlight({ children, delay = 0.35 }: { children: ReactNode; delay?: number }) {
  const reduce = useReducedMotion();
  return (
    <motion.span
      className="box-decoration-clone rounded-[0.12em] bg-no-repeat px-[0.08em] [background-image:linear-gradient(var(--signal-mark),var(--signal-mark))] [background-position:0_88%]"
      initial={{ backgroundSize: reduce ? "100% 82%" : "0% 82%" }}
      whileInView={{ backgroundSize: "100% 82%" }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8, delay, ease: [0.77, 0, 0.175, 1] }}
    >
      {children}
    </motion.span>
  );
}
