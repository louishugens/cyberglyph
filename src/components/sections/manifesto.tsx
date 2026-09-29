"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react";

const TEXT =
  "We don't sell fear. We map what you run, close what's open, and automate the work that keeps it closed. Then we explain all of it in plain English.";

function Word({
  word,
  range,
  progress,
}: {
  word: string;
  range: [number, number];
  progress: MotionValue<number>;
}) {
  const opacity = useTransform(progress, range, [0.18, 1]);
  return (
    <motion.span style={{ opacity }} className="inline-block pr-[0.25em]">
      {word}
    </motion.span>
  );
}

/** Scroll-linked reading: words light up as the statement moves through the viewport. */
export function Manifesto() {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "end 45%"] });
  const words = TEXT.split(" ");

  return (
    <section className="border-y border-border bg-surface py-28 md:py-40">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <p
          ref={ref}
          className="text-3xl leading-[1.2] font-medium tracking-[-0.03em] text-balance md:text-5xl"
        >
          {reduce
            ? TEXT
            : words.map((w, i) => (
                <Word
                  key={i}
                  word={w}
                  progress={scrollYProgress}
                  range={[i / words.length, (i + 1) / words.length]}
                />
              ))}
        </p>
      </div>
    </section>
  );
}
