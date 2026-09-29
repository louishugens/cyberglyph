"use client";

import { useRef, type ReactNode } from "react";

const GLYPHS = "0123456789ABCDEF<>/{}[]=+*#%$&@";

/**
 * Hover decrypt: characters scramble into glyphs and resolve left to right,
 * echoing the hero's cipher field. ~320ms, mouse only, skipped under reduced
 * motion. Width is locked to the original text so layout never shifts.
 */
export function useScramble<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const frame = useRef(0);

  const run = (e?: React.PointerEvent) => {
    const el = ref.current;
    if (!el || (e && e.pointerType !== "mouse")) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const original = el.dataset.text ?? el.textContent ?? "";
    el.dataset.text = original;
    cancelAnimationFrame(frame.current);
    const start = performance.now();
    const duration = 320;
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const settled = Math.floor(p * original.length);
      let out = "";
      for (let i = 0; i < original.length; i++) {
        const ch = original[i];
        out += i < settled || ch === " " ? ch : GLYPHS[(Math.random() * GLYPHS.length) | 0];
      }
      el.textContent = out;
      if (p < 1) frame.current = requestAnimationFrame(tick);
      else el.textContent = original;
    };
    frame.current = requestAnimationFrame(tick);
  };

  return { ref, onPointerEnter: run };
}

export function ScrambleText({ children, className }: { children: ReactNode; className?: string }) {
  const { ref, onPointerEnter } = useScramble<HTMLSpanElement>();
  return (
    <span className={className} onPointerEnter={onPointerEnter}>
      {/* Invisible copy holds the width; the visible layer scrambles on top. */}
      <span className="relative inline-grid">
        <span aria-hidden="true" className="invisible col-start-1 row-start-1">
          {children}
        </span>
        <span ref={ref} className="col-start-1 row-start-1 whitespace-nowrap">
          {children}
        </span>
      </span>
    </span>
  );
}
