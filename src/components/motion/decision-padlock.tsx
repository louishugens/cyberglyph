"use client";

import { useEffect, useSyncExternalStore } from "react";
import {
  Alignment,
  Fit,
  Layout,
  RuntimeLoader,
  useRive,
  useViewModelInstanceNumber,
} from "@rive-app/react-canvas";

// Self-hosted runtime: no third-party CDN request, no CDN fallback.
// Keep the filename in step with the installed @rive-app/canvas version.
RuntimeLoader.setWasmUrl("/rive/rive-2.43.1.wasm");
RuntimeLoader.setWasmFallbackUrl(null);

export type Decision = "allow" | "stepup" | "deny";

// Matches the `Padlock.decision` view model number in design/rive/padlock.
const VALUE: Record<Decision, number> = { allow: 1, stepup: 2, deny: 3 };

const COLOR: Record<Decision, string> = {
  allow: "var(--allow)",
  stepup: "var(--warn)",
  deny: "var(--deny)",
};

/**
 * Rive padlock that reacts to the policy decision: the shackle lifts on
 * allow, the ring pulses on step-up, the lock shakes on deny. Source lives in
 * design/rive/padlock (RML, built with the Rive CLI).
 */
const REDUCE_QUERY = "(prefers-reduced-motion: reduce)";
const subscribeReduce = (onChange: () => void) => {
  const mq = window.matchMedia(REDUCE_QUERY);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
};

/**
 * Hydration-safe motion preference: the server snapshot is always `false`, so
 * the first client render matches the HTML, then React re-renders with the
 * real value instead of reporting a mismatch.
 */
function usePrefersReducedMotion() {
  return useSyncExternalStore(
    subscribeReduce,
    () => window.matchMedia(REDUCE_QUERY).matches,
    () => false,
  );
}

export function DecisionPadlock({ decision, className }: { decision: Decision; className?: string }) {
  const reduce = usePrefersReducedMotion();
  if (reduce) return <StaticPadlock decision={decision} className={className} />;
  return <AnimatedPadlock decision={decision} className={className} />;
}

function AnimatedPadlock({ decision, className }: { decision: Decision; className?: string }) {
  const { rive, RiveComponent } = useRive({
    src: "/rive/padlock.riv",
    stateMachine: "Decision",
    autoplay: true,
    autoBind: true,
    layout: new Layout({ fit: Fit.Contain, alignment: Alignment.Center }),
  });
  const { setValue } = useViewModelInstanceNumber("decision", rive?.viewModelInstance);

  useEffect(() => {
    setValue(VALUE[decision]);
  }, [decision, setValue]);

  return (
    <div className={className} aria-hidden="true">
      <RiveComponent />
    </div>
  );
}

/** Reduced-motion fallback: the same padlock, tinted by decision, no motion. */
function StaticPadlock({ decision, className }: { decision: Decision; className?: string }) {
  const c = COLOR[decision];
  return (
    <svg viewBox="0 0 240 240" className={className} aria-hidden="true">
      <path
        d={decision === "allow" ? "M84 94 V64 a36 36 0 0 1 72 0 V94" : "M84 112 V82 a36 36 0 0 1 72 0 V112"}
        fill="none"
        stroke="#C9D2E3"
        strokeWidth="14"
        strokeLinecap="round"
      />
      <rect x="56" y="104" width="128" height="100" rx="22" fill="#1A2030" stroke="#2F3A55" strokeWidth="1.5" />
      <circle cx="120" cy="154" r="37" fill="none" stroke={c} strokeWidth="2" opacity="0.7" />
      <circle cx="120" cy="143" r="13" fill={c} />
      <path d="M113.5 150 h13 l4 26 h-21 z" fill={c} />
    </svg>
  );
}
