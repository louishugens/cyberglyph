"use client";

import { createContext, useContext, useRef, type ReactNode } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  type MotionValue,
} from "motion/react";
import { cn } from "@/lib/utils";

type Pointer = { px: MotionValue<number>; py: MotionValue<number> };
const PointerContext = createContext<Pointer | null>(null);

/** Normalized pointer position (-0.5..0.5) inside the nearest SpotlightCard. */
export function useCardPointer() {
  return useContext(PointerContext);
}

/**
 * Card whose border and surface light up under the cursor. Mouse only; touch
 * and reduced-motion users get the plain card. Overlays repaint on their own
 * layers, never on the card's children.
 */
export function SpotlightCard({
  children,
  className,
  glow = "var(--signal)",
  strength = 16,
}: {
  children: ReactNode;
  className?: string;
  glow?: string;
  strength?: number;
}) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 350, damping: 40 });
  const sy = useSpring(y, { stiffness: 350, damping: 40 });
  const opacity = useSpring(0, { stiffness: 200, damping: 30 });
  const px = useMotionValue(0);
  const py = useMotionValue(0);

  const surface = useMotionTemplate`radial-gradient(420px circle at ${sx}px ${sy}px, color-mix(in oklch, ${glow} ${strength}%, transparent), transparent 70%)`;
  const border = useMotionTemplate`radial-gradient(260px circle at ${sx}px ${sy}px, color-mix(in oklch, ${glow} 85%, transparent), transparent 75%)`;

  const onMove = (e: React.PointerEvent) => {
    if (reduce || e.pointerType !== "mouse" || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set(e.clientX - r.left);
    y.set(e.clientY - r.top);
    px.set((e.clientX - r.left) / r.width - 0.5);
    py.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onEnter = (e: React.PointerEvent) => {
    if (reduce || e.pointerType !== "mouse") return;
    const r = ref.current!.getBoundingClientRect();
    // Jump (no spring) to the entry point so the light doesn't sweep in from a corner.
    sx.jump(e.clientX - r.left);
    sy.jump(e.clientY - r.top);
    opacity.set(1);
  };
  const onLeave = () => {
    opacity.set(0);
    px.set(0);
    py.set(0);
  };

  return (
    <PointerContext.Provider value={{ px, py }}>
      <motion.article
        ref={ref}
        onPointerMove={onMove}
        onPointerEnter={onEnter}
        onPointerLeave={onLeave}
        className={cn("relative isolate", className)}
      >
        <motion.div
          aria-hidden="true"
          style={{ background: surface, opacity }}
          className="pointer-events-none absolute inset-0 -z-10 rounded-[inherit]"
        />
        <motion.div
          aria-hidden="true"
          style={{ background: border, opacity }}
          className="pointer-events-none absolute inset-0 z-10 rounded-[inherit] p-px [mask:linear-gradient(#000_0_0)_content-box_exclude,linear-gradient(#000_0_0)]"
        />
        {children}
      </motion.article>
    </PointerContext.Provider>
  );
}
