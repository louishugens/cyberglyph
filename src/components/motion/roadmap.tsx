"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useSpring, useTransform, type MotionValue } from "motion/react";

export type Stage = { when: string; what: string };

function StageItem({ stage, at, progress }: { stage: Stage; at: number; progress: MotionValue<number> }) {
  const reduce = useReducedMotion();
  const opacity = useTransform(progress, [at - 0.12, at + 0.04], [0.3, 1]);
  const scale = useTransform(progress, [at - 0.12, at + 0.04], [0.6, 1]);
  return (
    <motion.li style={reduce ? undefined : { opacity }} className="relative pt-10 md:pt-12">
      <motion.span
        aria-hidden="true"
        style={reduce ? undefined : { scale }}
        className="absolute top-0 left-0 size-4 -translate-y-1/2 rounded-full border-[3px] border-background bg-gold ring-1 ring-gold/50"
      />
      <p className="text-4xl font-medium tracking-[-0.035em] md:text-5xl">{stage.when}</p>
      <p className="mt-3 max-w-[34ch] leading-relaxed text-muted-foreground">{stage.what}</p>
    </motion.li>
  );
}

/** The roadmap line draws itself as the reader scrolls; each stage lights when the line reaches it. */
export function Roadmap({ stages }: { stages: Stage[] }) {
  const ref = useRef<HTMLOListElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "start 35%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 24 });

  return (
    <div className="relative">
      <div aria-hidden="true" className="absolute inset-x-0 top-0 hidden h-px bg-border md:block">
        <motion.div style={{ scaleX: reduce ? 1 : progress }} className="h-px origin-left bg-linear-to-r from-signal via-signal to-gold" />
      </div>
      <ol ref={ref} className="grid gap-12 md:grid-cols-3 md:gap-8">
        {stages.map((s, i) => (
          <StageItem key={s.when} stage={s} at={i / stages.length + 0.08} progress={progress} />
        ))}
      </ol>
    </div>
  );
}
