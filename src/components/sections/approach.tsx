"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion, useScroll, useSpring } from "motion/react";
import { cn } from "@/lib/utils";

const steps = [
  {
    verb: "Map",
    title: "See everything you actually run.",
    body: "We inventory identities, apps, data flows, and vendors, then rank risk by business impact instead of severity scores alone.",
    outputs: ["Identity & asset inventory", "Risk register", "90-day roadmap"],
  },
  {
    verb: "Harden",
    title: "Close the gaps that matter first.",
    body: "SSO everywhere, passkeys, least privilege, and secure cloud baselines, rolled out without stalling the people doing the work.",
    outputs: ["SSO & passkey rollout", "Cloud baselines", "Privileged access"],
  },
  {
    verb: "Automate",
    title: "Make the right thing the default.",
    body: "Onboarding, offboarding, access reviews, and audit evidence run on their own. A person approves what matters.",
    outputs: ["Lifecycle automation", "Access reviews", "Audit evidence"],
  },
  {
    verb: "Operate",
    title: "Stay ahead, month after month.",
    body: "We watch, tune, and report in plain language, so leadership always knows where things stand and what comes next.",
    outputs: ["Detection & response", "Monthly briefings", "Tabletop exercises"],
  },
];

function Step({
  step,
  index,
  onActive,
}: {
  step: (typeof steps)[number];
  index: number;
  onActive: (i: number) => void;
}) {
  const ref = useRef<HTMLLIElement>(null);
  const inView = useInView(ref, { margin: "-45% 0px -45% 0px" });
  useEffect(() => {
    if (inView) onActive(index);
  }, [inView, index, onActive]);

  return (
    <li ref={ref} className="border-t border-border py-12 first:border-t-0 first:pt-0 lg:min-h-[42vh] lg:py-14 lg:last:min-h-0">
      <p className="font-mono text-sm text-signal lg:hidden">{step.verb}</p>
      <h3 className="mt-2 text-3xl font-medium tracking-[-0.025em] text-balance md:text-4xl lg:mt-0">
        {step.title}
      </h3>
      <p className="mt-4 max-w-[52ch] text-lg leading-relaxed text-muted-foreground">{step.body}</p>
      <ul className="mt-7 grid gap-2 sm:grid-cols-3">
        {step.outputs.map((o) => (
          <li key={o} className="rounded-(--radius-field) bg-surface px-4 py-3 text-sm">
            {o}
          </li>
        ))}
      </ul>
    </li>
  );
}

export function Approach() {
  const [active, setActive] = useState(0);
  const listRef = useRef<HTMLOListElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: listRef, offset: ["start 55%", "end 55%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  return (
    <section id="approach" className="py-24 md:py-32">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:px-8">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <h2 className="max-w-[16ch] text-4xl font-medium tracking-[-0.03em] text-balance md:text-5xl">
              How an engagement runs.
            </h2>
            <div className="mt-10 hidden gap-6 lg:flex">
              <div className="relative w-px bg-border">
                <motion.div
                  style={{ scaleY: reduce ? 1 : progress }}
                  className="absolute inset-0 origin-top bg-signal"
                />
              </div>
              <ol className="grid gap-3">
                {steps.map((s, i) => (
                  <li
                    key={s.verb}
                    className={cn(
                      "text-4xl font-medium tracking-[-0.03em] transition-colors duration-300",
                      i === active ? "text-foreground" : "text-foreground/20",
                    )}
                  >
                    {s.verb}
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>

        <ol ref={listRef} className="lg:col-span-7">
          {steps.map((s, i) => (
            <Step key={s.verb} step={s} index={i} onActive={setActive} />
          ))}
        </ol>
      </div>
    </section>
  );
}
