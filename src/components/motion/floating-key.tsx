"use client";

import Image from "next/image";
import { useEffect } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "motion/react";

/** Hero object: the hardware key, drifting with the pointer on a soft spring. */
export function FloatingKey() {
  const reduce = useReducedMotion();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 60, damping: 18, mass: 0.8 });
  const y = useSpring(my, { stiffness: 60, damping: 18, mass: 0.8 });
  const rotate = useSpring(useMotionValue(0), { stiffness: 60, damping: 18 });
  const transform = useMotionTemplate`translate3d(${x}px, ${y}px, 0) rotate(${rotate}deg)`;

  useEffect(() => {
    if (reduce) return;
    const fine = window.matchMedia("(pointer: fine)");
    if (!fine.matches) return;
    const onMove = (e: PointerEvent) => {
      const nx = e.clientX / window.innerWidth - 0.5;
      const ny = e.clientY / window.innerHeight - 0.5;
      mx.set(nx * -28);
      my.set(ny * -22);
      rotate.set(nx * 5);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [reduce, mx, my, rotate]);

  return (
    <motion.div
      initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.94, filter: "blur(8px)" }}
      animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
      transition={{ duration: 1.1, delay: 0.25, ease: [0.23, 1, 0.32, 1] }}
      className="relative"
    >
      <motion.div style={{ transform }} className="relative">
        <div
          aria-hidden="true"
          className="absolute inset-[18%] rounded-full bg-signal/25 blur-3xl dark:bg-signal/20"
        />
        <Image
          src="/images/key.webp"
          alt="A black hardware security key with a blue light around its edge"
          width={499}
          height={507}
          priority
          sizes="(min-width: 1024px) 420px, 60vw"
          className="relative h-auto w-full drop-shadow-[0_40px_60px_oklch(0.2_0.05_262/0.35)]"
        />
      </motion.div>
    </motion.div>
  );
}
