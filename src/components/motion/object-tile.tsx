"use client";

import Image from "next/image";
import type { ReactNode } from "react";
import { motion, useMotionTemplate, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import { cn } from "@/lib/utils";

const EASE_OUT = [0.23, 1, 0.32, 1] as const;

/**
 * Navy tile holding a photograph. The picture settles in when the tile
 * scrolls into view and drifts away from the pointer on the same soft spring
 * as the hero key. Children sit above the image.
 */
export function ObjectTile({
  src,
  alt,
  sizes,
  className,
  imageClassName,
  frameClassName,
  children,
}: {
  src: string;
  alt: string;
  sizes: string;
  className?: string;
  imageClassName?: string;
  /** Where the render sits inside the tile. Defaults to the full tile. */
  frameClassName?: string;
  children?: ReactNode;
}) {
  const reduce = useReducedMotion();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 70, damping: 18, mass: 0.8 });
  const y = useSpring(my, { stiffness: 70, damping: 18, mass: 0.8 });
  const transform = useMotionTemplate`translate3d(${x}px, ${y}px, 0) scale(1.08)`;

  return (
    <div
      className={cn("relative isolate overflow-hidden rounded-(--radius-panel) bg-[#06182f] text-white shadow-[inset_0_1px_0_oklch(1_0_0/0.08)] ring-1 ring-white/10 transition-shadow duration-500 ease-(--ease-out) group-hover:ring-[#109fb5]/60 group-hover:shadow-[inset_0_1px_0_oklch(1_0_0/0.1),0_30px_80px_-40px_#109fb5]", className)}
      onPointerMove={(e) => {
        if (reduce || e.pointerType !== "mouse") return;
        const r = e.currentTarget.getBoundingClientRect();
        mx.set(((e.clientX - r.left) / r.width - 0.5) * -22);
        my.set(((e.clientY - r.top) / r.height - 0.5) * -16);
      }}
      onPointerLeave={() => {
        mx.set(0);
        my.set(0);
      }}
    >
      <motion.div
        className={cn("absolute -z-10", frameClassName ?? "inset-0")}
        initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 1.12, filter: "blur(10px)" }}
        whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 1.1, ease: EASE_OUT }}
      >
        <motion.div className="absolute inset-0" style={reduce ? undefined : { transform }}>
          <Image src={src} alt={alt} fill sizes={sizes} className={cn("object-cover", imageClassName)} />
        </motion.div>
      </motion.div>
      {children}
    </div>
  );
}
