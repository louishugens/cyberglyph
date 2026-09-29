"use client";

import { useEffect, useRef } from "react";

/**
 * A field of monospace glyphs. Near the pointer (and along a slow scan line)
 * glyphs heat up, scramble, and resolve in the accent color, like ciphertext
 * decrypting under a key. Pure canvas, paused when off-screen or hidden,
 * static under prefers-reduced-motion.
 */
const CHARS = "0123456789ABCDEF<>/{}[]=+*#%$&@:;";
const CELL = 20;
const FPS = 40;

type Cell = { ch: number; base: number; heat: number };

export function GlyphField({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const scheme = window.matchMedia("(prefers-color-scheme: dark)");

    let cols = 0;
    let rows = 0;
    let cells: Cell[] = [];
    let dpr = 1;
    let colors = { dim: "", hot: "", lit: "" };
    let font = "500 12px monospace";
    const pointer = { x: -9999, y: -9999, active: false };
    let raf = 0;
    let last = 0;
    let visible = true;
    let scanY = 0;

    const readColors = () => {
      const cs = getComputedStyle(document.documentElement);
      colors = {
        dim: cs.getPropertyValue("--glyph-dim").trim(),
        hot: cs.getPropertyValue("--glyph-hot").trim(),
        lit: cs.getPropertyValue("--glyph-lit").trim(),
      };
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      font = `500 12px ${getComputedStyle(canvas).fontFamily}`;
      canvas.width = Math.round(rect.width * dpr);
      canvas.height = Math.round(rect.height * dpr);
      cols = Math.ceil(rect.width / CELL);
      rows = Math.ceil(rect.height / CELL);
      cells = Array.from({ length: cols * rows }, () => ({
        ch: (Math.random() * CHARS.length) | 0,
        base: Math.random() < 0.55 ? 0 : 0.35 + Math.random() * 0.65,
        heat: 0,
      }));
      draw(0);
    };

    const draw = (dt: number) => {
      const w = canvas.width / dpr;
      const h = canvas.height / dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);
      ctx.font = font;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      const radius = 150;
      const scanBand = 38;
      scanY = (scanY + dt * 0.06) % (h + 200);

      // Three passes grouped by color keep fillStyle changes minimal.
      const hotList: number[] = [];
      const litList: number[] = [];

      ctx.fillStyle = colors.dim;
      for (let r = 0; r < rows; r++) {
        const cy = r * CELL + CELL / 2;
        const scanDist = Math.abs(cy - (scanY - 100));
        for (let c = 0; c < cols; c++) {
          const i = r * cols + c;
          const cell = cells[i];
          const cx = c * CELL + CELL / 2;

          if (dt > 0) {
            let target = 0;
            if (pointer.active) {
              const d = Math.hypot(cx - pointer.x, cy - pointer.y);
              if (d < radius) target = 1 - d / radius;
            }
            if (scanDist < scanBand && cell.base > 0) {
              target = Math.max(target, (1 - scanDist / scanBand) * 0.45);
            }
            cell.heat += (target - cell.heat) * (target > cell.heat ? 0.25 : 0.05);
            // Hot cells scramble; cool ones rarely flicker.
            if (cell.heat > 0.15 ? Math.random() < cell.heat * 0.5 : Math.random() < 0.0015) {
              cell.ch = (Math.random() * CHARS.length) | 0;
            }
          }

          if (cell.heat > 0.45) hotList.push(i);
          else if (cell.heat > 0.12) litList.push(i);
          else if (cell.base > 0) ctx.fillText(CHARS[cell.ch], cx, cy);
        }
      }

      ctx.fillStyle = colors.lit;
      for (const i of litList) {
        ctx.fillText(CHARS[cells[i].ch], (i % cols) * CELL + CELL / 2, ((i / cols) | 0) * CELL + CELL / 2);
      }
      ctx.fillStyle = colors.hot;
      for (const i of hotList) {
        ctx.fillText(CHARS[cells[i].ch], (i % cols) * CELL + CELL / 2, ((i / cols) | 0) * CELL + CELL / 2);
      }
    };

    const loop = (t: number) => {
      raf = requestAnimationFrame(loop);
      if (!visible || document.hidden) return;
      const dt = t - last;
      if (dt < 1000 / FPS) return;
      last = t;
      draw(Math.min(dt, 64));
    };

    const start = () => {
      cancelAnimationFrame(raf);
      if (reduce.matches) {
        draw(0);
        return;
      }
      raf = requestAnimationFrame(loop);
    };

    const radiusPad = 40;
    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = e.clientX - rect.left;
      pointer.y = e.clientY - rect.top;
      pointer.active =
        pointer.x > -radiusPad && pointer.y > -radiusPad &&
        pointer.x < rect.width + radiusPad && pointer.y < rect.height + radiusPad;
    };
    const onLeave = () => (pointer.active = false);
    const onScheme = () => {
      readColors();
      draw(0);
    };

    readColors();
    resize();
    start();

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    const io = new IntersectionObserver(([entry]) => (visible = entry.isIntersecting));
    io.observe(canvas);
    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    scheme.addEventListener("change", onScheme);
    reduce.addEventListener("change", start);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      scheme.removeEventListener("change", onScheme);
      reduce.removeEventListener("change", start);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={className}
      style={{ fontFamily: "var(--font-geist-mono), ui-monospace, monospace" }}
    />
  );
}
