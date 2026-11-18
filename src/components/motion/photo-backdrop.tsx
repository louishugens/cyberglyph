"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { cn } from "@/lib/utils";

const BG = "oklch(0.135 0.028 258)";
const scrims = {
  // Text on the left, photo reads clearly on the right.
  left: `linear-gradient(90deg, ${BG} 0%, color-mix(in oklch, ${BG} 88%, transparent) 34%, color-mix(in oklch, ${BG} 35%, transparent) 68%, color-mix(in oklch, ${BG} 15%, transparent) 100%)`,
  // Text across the whole area.
  full: `linear-gradient(90deg, color-mix(in oklch, ${BG} 82%, transparent), color-mix(in oklch, ${BG} 55%, transparent))`,
  // Text anchored at the bottom of a tile.
  bottom: `linear-gradient(0deg, ${BG} 0%, color-mix(in oklch, ${BG} 86%, transparent) 40%, color-mix(in oklch, ${BG} 10%, transparent) 100%)`,
} as const;

/**
 * Full-bleed photograph behind a section, under a navy scrim. The photo
 * drifts slightly against the scroll for depth. Place inside a relative,
 * isolated, overflow-hidden container that carries `on-photo`.
 */
export function PhotoBackdrop({
  src,
  alt,
  sizes = "100vw",
  scrim = "left",
  position = "object-center",
  priority = false,
  fade = true,
}: {
  src: string;
  alt: string;
  sizes?: string;
  scrim?: keyof typeof scrims;
  position?: string;
  priority?: boolean;
  /** Melt the top and bottom edges into the page. Off for photos inside a card. */
  fade?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);

  return (
    <div
      ref={ref}
      className={cn(
        "absolute inset-0 -z-10 overflow-hidden",
        fade && "[mask-image:linear-gradient(180deg,transparent,black_16%,black_84%,transparent)]",
      )}
    >
      <motion.div className="absolute inset-[-6%_0]" style={reduce ? undefined : { y }}>
        <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className={cn("object-cover brightness-110", position)} />
      </motion.div>
      <div aria-hidden="true" className="absolute inset-0" style={{ backgroundImage: scrims[scrim] }} />
    </div>
  );
}
