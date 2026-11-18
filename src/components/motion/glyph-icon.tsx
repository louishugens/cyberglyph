"use client";

import { useEffect, useRef } from "react";
import { GLYPH_SHAPES, type GlyphShape } from "@/components/motion/glyph-shapes";

const CHARS = "0123456789ABCDEF<>/{}[]=+*#%$&@:;";
const FPS = 30;

/**
 * A silhouette resolved out of the hero's glyph field: characters inside the
 * shape decrypt left to right into the accent color when the icon scrolls
 * into view, then scramble again near the pointer. Canvas only, paused while
 * off-screen, drawn once and static under prefers-reduced-motion.
 */
export function GlyphIcon({
  shape,
  className,
  cell = 9,
}: {
  shape: GlyphShape;
  className?: string;
  cell?: number;
}) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const scheme = window.matchMedia("(prefers-color-scheme: dark)");
    const path = new Path2D(GLYPH_SHAPES[shape]);

    let cols = 0;
    let rows = 0;
    let dpr = 1;
    let inside = new Uint8Array(0);
    let sparse = new Uint8Array(0);
    let ch = new Uint8Array(0);
    let reveal = new Float32Array(0);
    let colors = { dim: "", hot: "", lit: "" };
    let font = "";
    let raf = 0;
    let last = 0;
    let elapsed = 0;
    let visible = false;
    const pointer = { x: -9999, y: -9999 };

    const readColors = () => {
      const cs = getComputedStyle(canvas);
      colors = {
        dim: cs.getPropertyValue("--glyph-dim").trim(),
        hot: cs.getPropertyValue("--glyph-hot").trim(),
        lit: cs.getPropertyValue("--glyph-lit").trim(),
      };
      font = `500 ${cell - 1}px ${cs.fontFamily}`;
    };

    const build = () => {
      const rect = canvas.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(rect.width * dpr);
      canvas.height = Math.round(rect.height * dpr);
      cols = Math.floor(rect.width / cell);
      rows = Math.floor(rect.height / cell);

      // Rasterize the silhouette at one pixel per cell and read it back.
      const mask = document.createElement("canvas");
      mask.width = cols;
      mask.height = rows;
      const mc = mask.getContext("2d");
      if (!mc) return;
      const size = Math.min(cols, rows) * 0.94;
      mc.translate((cols - size) / 2, (rows - size) / 2);
      mc.scale(size / 256, size / 256);
      mc.fill(path, "evenodd");
      const alpha = mc.getImageData(0, 0, cols, rows).data;

      const n = cols * rows;
      inside = new Uint8Array(n);
      sparse = new Uint8Array(n);
      ch = new Uint8Array(n);
      reveal = new Float32Array(n);
      for (let i = 0; i < n; i++) {
        inside[i] = alpha[i * 4 + 3] > 110 ? 1 : 0;
        sparse[i] = Math.random() < 0.3 ? 1 : 0;
        ch[i] = (Math.random() * CHARS.length) | 0;
        reveal[i] = 150 + ((i % cols) / cols) * 900 + Math.random() * 450;
      }
      draw(0);
    };

    const draw = (dt: number) => {
      const w = canvas.width / dpr;
      const h = canvas.height / dpr;
      const ox = (w - cols * cell) / 2;
      const oy = (h - rows * cell) / 2;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);
      ctx.font = font;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      const done = reduce.matches;
      const radius = 70;

      for (let pass = 0; pass < 3; pass++) {
        ctx.fillStyle = pass === 0 ? colors.dim : pass === 1 ? colors.lit : colors.hot;
        for (let i = 0; i < cols * rows; i++) {
          const cx = ox + (i % cols) * cell + cell / 2;
          const cy = oy + ((i / cols) | 0) * cell + cell / 2;
          const near = Math.hypot(cx - pointer.x, cy - pointer.y) < radius;
          let tone = 0; // 0 dim, 1 lit, 2 hot, -1 hidden
          if (inside[i]) {
            const t = done ? 1 : elapsed - reveal[i];
            tone = t > 0 ? (near ? 1 : 2) : t > -350 ? 1 : sparse[i] ? 0 : -1;
            if (pass === 0 && dt > 0 && (near || t <= 0 ? Math.random() < 0.35 : Math.random() < 0.004)) {
              ch[i] = (Math.random() * CHARS.length) | 0;
            }
          } else {
            tone = near ? 1 : sparse[i] ? 0 : -1;
            if (pass === 0 && dt > 0 && near && Math.random() < 0.3) {
              ch[i] = (Math.random() * CHARS.length) | 0;
            }
          }
          if (tone === pass) ctx.fillText(CHARS[ch[i]], cx, cy);
        }
      }
    };

    const loop = (t: number) => {
      raf = requestAnimationFrame(loop);
      if (!visible || document.hidden) {
        last = t;
        return;
      }
      const dt = t - last;
      if (dt < 1000 / FPS) return;
      last = t;
      elapsed += Math.min(dt, 64);
      draw(dt);
    };

    const start = () => {
      cancelAnimationFrame(raf);
      if (reduce.matches) draw(0);
      else raf = requestAnimationFrame(loop);
    };

    const onMove = (e: PointerEvent) => {
      if (!visible) return;
      const rect = canvas.getBoundingClientRect();
      pointer.x = e.clientX - rect.left;
      pointer.y = e.clientY - rect.top;
    };
    const onScheme = () => {
      readColors();
      draw(0);
    };

    readColors();
    build();
    start();

    const ro = new ResizeObserver(build);
    ro.observe(canvas);
    const io = new IntersectionObserver(([entry]) => (visible = entry.isIntersecting), { threshold: 0.25 });
    io.observe(canvas);
    window.addEventListener("pointermove", onMove, { passive: true });
    scheme.addEventListener("change", onScheme);
    reduce.addEventListener("change", start);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      window.removeEventListener("pointermove", onMove);
      scheme.removeEventListener("change", onScheme);
      reduce.removeEventListener("change", start);
    };
  }, [shape, cell]);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className={className}
      style={{ fontFamily: "var(--font-geist-mono), ui-monospace, monospace" }}
    />
  );
}
