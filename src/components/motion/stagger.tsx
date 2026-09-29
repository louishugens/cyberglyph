"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import type { ReactNode } from "react";

const EASE_OUT = [0.23, 1, 0.32, 1] as const;

const tags = {
  div: motion.div,
  ul: motion.ul,
  ol: motion.ol,
  li: motion.li,
  dl: motion.dl,
} as const;

type Tag = keyof typeof tags;

/** Parent that cascades its StaggerItem children in when scrolled into view. */
export function Stagger({
  children,
  className,
  as = "div",
  gap = 0.06,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  as?: Tag;
  gap?: number;
  delay?: number;
}) {
  const Comp = tags[as];
  return (
    <Comp
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
      variants={{ show: { transition: { staggerChildren: gap, delayChildren: delay } } }}
    >
      {children}
    </Comp>
  );
}

export function StaggerItem({
  children,
  className,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: Tag;
}) {
  const reduce = useReducedMotion();
  const Comp = tags[as];
  const variants: Variants = reduce
    ? { hidden: { opacity: 0 }, show: { opacity: 1, transition: { duration: 0.2 } } }
    : {
        hidden: { opacity: 0, transform: "translateY(14px)", filter: "blur(4px)" },
        show: {
          opacity: 1,
          transform: "translateY(0px)",
          filter: "blur(0px)",
          transition: { duration: 0.6, ease: EASE_OUT },
        },
      };
  return (
    <Comp className={className} variants={variants}>
      {children}
    </Comp>
  );
}
