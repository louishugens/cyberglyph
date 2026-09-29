"use client";

import { Fragment } from "react";
import { motion, useReducedMotion } from "motion/react";

const EASE_OUT = [0.23, 1, 0.32, 1] as const;

/**
 * Word-by-word heading reveal on scroll: each word rises out of a slight blur.
 * Render inside the heading element so semantics stay on the server.
 */
export function SplitReveal({ text, delay = 0 }: { text: string; delay?: number }) {
  const reduce = useReducedMotion();
  const words = text.split(" ");

  if (reduce) return <>{text}</>;

  return (
    <>
      <span className="sr-only">{text}</span>
      <motion.span
        aria-hidden="true"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-60px" }}
        variants={{ show: { transition: { staggerChildren: 0.045, delayChildren: delay } } }}
      >
        {words.map((w, i) => (
          <Fragment key={i}>
            <span className="inline-block pb-[0.08em]">
              <motion.span
                className="inline-block will-change-transform"
                variants={{
                  hidden: { opacity: 0, transform: "translateY(0.45em)", filter: "blur(6px)" },
                  show: {
                    opacity: 1,
                    transform: "translateY(0em)",
                    filter: "blur(0px)",
                    transition: { duration: 0.7, ease: EASE_OUT },
                  },
                }}
              >
                {w}
              </motion.span>
            </span>
            {i < words.length - 1 ? " " : null}
          </Fragment>
        ))}
      </motion.span>
    </>
  );
}
