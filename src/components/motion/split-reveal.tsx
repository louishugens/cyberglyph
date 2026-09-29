"use client";

import { Fragment } from "react";
import { motion, useReducedMotion } from "motion/react";

const EASE_OUT = [0.23, 1, 0.32, 1] as const;

/**
 * Word-by-word heading reveal on scroll: each word rises out of a slight blur.
 * Optional `muted` continues the sentence in the secondary tone (two-tone
 * headline: statement first, explanation after, same size and weight).
 * Render inside the heading element so semantics stay on the server.
 */
export function SplitReveal({
  text,
  muted,
  delay = 0,
}: {
  text: string;
  muted?: string;
  delay?: number;
}) {
  const reduce = useReducedMotion();
  const words = [
    ...text.split(" ").map((w) => ({ w, muted: false })),
    ...(muted ? muted.split(" ").map((w) => ({ w, muted: true })) : []),
  ];
  const full = muted ? `${text} ${muted}` : text;

  if (reduce) {
    return (
      <>
        {text}
        {muted ? <span className="text-muted-foreground"> {muted}</span> : null}
      </>
    );
  }

  return (
    <>
      <span className="sr-only">{full}</span>
      <motion.span
        aria-hidden="true"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-60px" }}
        variants={{ show: { transition: { staggerChildren: 0.04, delayChildren: delay } } }}
      >
        {words.map(({ w, muted: m }, i) => (
          <Fragment key={i}>
            <span className={m ? "inline-block pb-[0.08em] text-muted-foreground" : "inline-block pb-[0.08em]"}>
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
