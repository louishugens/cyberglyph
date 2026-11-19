"use client";

import { useEffect, useRef } from "react";

/**
 * Muted, looping background film for the hero. Shows its poster frame and
 * stays paused under prefers-reduced-motion, and pauses while off-screen.
 */
export function HeroVideo({ src, poster, className }: { src: string; poster: string; className?: string }) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    let visible = true;
    const sync = () => {
      if (reduce.matches || !visible) video.pause();
      else video.play().catch(() => {});
    };
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      sync();
    });
    io.observe(video);
    reduce.addEventListener("change", sync);
    sync();
    return () => {
      io.disconnect();
      reduce.removeEventListener("change", sync);
    };
  }, []);

  return (
    <video
      ref={ref}
      aria-hidden="true"
      className={className}
      src={src}
      poster={poster}
      muted
      loop
      playsInline
      preload="metadata"
    />
  );
}
