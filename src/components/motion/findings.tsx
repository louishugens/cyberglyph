"use client";

import { motion, useReducedMotion } from "motion/react";
import { WarningCircle } from "@phosphor-icons/react";

/** A list that reads like an audit in progress: each row is flagged in turn as it scrolls in. */
export function Findings({ items, className }: { items: string[]; className?: string }) {
  const reduce = useReducedMotion();
  return (
    <motion.ul
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      variants={{ show: { transition: { staggerChildren: 0.11 } } }}
    >
      {items.map((item) => (
        <motion.li
          key={item}
          variants={{
            hidden: { opacity: reduce ? 1 : 0.25 },
            show: { opacity: 1, transition: { duration: 0.4 } },
          }}
          className="flex items-start gap-3.5 border-t border-border py-5 text-lg leading-snug"
        >
          <motion.span
            aria-hidden="true"
            variants={{
              hidden: reduce ? { opacity: 1, transform: "scale(1)" } : { opacity: 0, transform: "scale(0.6)" },
              show: { opacity: 1, transform: "scale(1)", transition: { type: "spring", duration: 0.45, bounce: 0.35 } },
            }}
            className="mt-0.5 shrink-0 text-warn"
          >
            <WarningCircle size={22} weight="fill" />
          </motion.span>
          {item}
        </motion.li>
      ))}
    </motion.ul>
  );
}
