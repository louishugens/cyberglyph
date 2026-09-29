"use client";

import Image from "next/image";
import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { useCardPointer } from "@/components/motion/spotlight-card";

const EASE_OUT = [0.23, 1, 0.32, 1] as const;

/**
 * Product cutout that
 *  1. rises out of a clip mask when it enters the viewport,
 *  2. drifts against the scroll for depth,
 *  3. tilts toward the cursor inside its SpotlightCard.
 */
export function TiltImage({
  src,
  alt,
  width,
  height,
  sizes,
  className,
  imgClassName,
  tilt = 10,
  depth = 28,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  sizes: string;
  className?: string;
  imgClassName?: string;
  tilt?: number;
  depth?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const pointer = useCardPointer();
  const fallback = useMotionValue(0);
  const px = pointer?.px ?? fallback;
  const py = pointer?.py ?? fallback;

  const rotateY = useSpring(useTransform(px, [-0.5, 0.5], [-tilt, tilt]), { stiffness: 120, damping: 18 });
  const rotateX = useSpring(useTransform(py, [-0.5, 0.5], [tilt * 0.7, -tilt * 0.7]), { stiffness: 120, damping: 18 });

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [depth, -depth]);

  return (
    <div ref={ref} className={className} style={{ perspective: 1000 }}>
      <motion.div
        initial={reduce ? { opacity: 0 } : { opacity: 0, clipPath: "inset(60% -30% -30% -30%)", transform: "translateY(40px) scale(0.96)" }}
        whileInView={{ opacity: 1, clipPath: "inset(-30% -30% -30% -30%)", transform: "translateY(0px) scale(1)" }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 1, ease: EASE_OUT }}
      >
        <motion.div style={reduce ? undefined : { y, rotateX, rotateY, transformStyle: "preserve-3d" }}>
          <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            sizes={sizes}
            className={imgClassName}
          />
        </motion.div>
      </motion.div>
    </div>
  );
}
