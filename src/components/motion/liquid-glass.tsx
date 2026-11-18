"use client";

import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Web approximation of Apple's Liquid Glass (technique from the
 * zettersten/liquid-glass skill): four stacked layers.
 *   0. refraction: backdrop blur plus an SVG displacement map that bends the
 *      content behind the edges, as a lens would
 *   1. tint
 *   2. specular rim
 *   3. content
 * Refraction needs `backdrop-filter: url()`, which only Chromium supports;
 * other browsers get the same glass without the edge bend. The element is
 * measured so the displacement map always matches its real size.
 */
function displacementMap(w: number, h: number, r: number) {
  const soften = Math.max(5, Math.round(r * 0.35));
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='${w}' height='${h}'><defs><linearGradient id='x' x1='0' y1='0' x2='1' y2='0'><stop offset='0' stop-color='#000'/><stop offset='1' stop-color='#f00'/></linearGradient><linearGradient id='y' x1='0' y1='0' x2='0' y2='1'><stop offset='0' stop-color='#000'/><stop offset='1' stop-color='#0f0'/></linearGradient><filter id='b'><feGaussianBlur stdDeviation='${soften}'/></filter></defs><rect width='${w}' height='${h}' rx='${r}' fill='url(#x)' style='mix-blend-mode:screen'/><rect width='${w}' height='${h}' rx='${r}' fill='url(#y)' style='mix-blend-mode:screen'/><rect width='${w}' height='${h}' rx='${r}' fill='#808080' filter='url(#b)'/></svg>`;
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}

export function LiquidGlass({
  children,
  className,
  contentClassName,
  radius = 20,
  scale = -26,
  blur = 14,
}: {
  children: ReactNode;
  className?: string;
  contentClassName?: string;
  /** Corner radius in px. Anything larger than half the height reads as a pill. */
  radius?: number;
  /** Refraction strength. Negative magnifies, as Apple's does. */
  scale?: number;
  blur?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const filterId = `lg-${useId().replace(/[^a-zA-Z0-9]/g, "")}`;
  // Null until measured in a refraction-capable browser, so server and first client render match.
  const [box, setBox] = useState<{ w: number; h: number } | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !/Chrome\//.test(navigator.userAgent)) return;
    const ro = new ResizeObserver(([entry]) => {
      const w = Math.round(entry.contentRect.width);
      const h = Math.round(entry.contentRect.height);
      setBox((prev) => (prev && prev.w === w && prev.h === h ? prev : { w, h }));
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const r = box ? Math.min(radius, box.h / 2, box.w / 2) : radius;
  const backdrop = box
    ? `blur(${blur}px) url(#${filterId}) brightness(1.08) saturate(1.5)`
    : `blur(${blur}px) brightness(1.08) saturate(1.5)`;

  return (
    <div
      ref={ref}
      className={cn("glass-glow relative isolate", className)}
      style={{ borderRadius: radius }}
    >
      {box ? (
        <svg aria-hidden="true" width="0" height="0" className="absolute overflow-hidden">
          <defs>
            <filter id={filterId} colorInterpolationFilters="sRGB" x="0%" y="0%" width="100%" height="100%">
              <feImage
                result="map"
                x="0"
                y="0"
                width={box.w}
                height={box.h}
                preserveAspectRatio="none"
                href={displacementMap(box.w, box.h, r)}
              />
              <feDisplacementMap in="SourceGraphic" in2="map" scale={scale} xChannelSelector="R" yChannelSelector="G" />
            </filter>
          </defs>
        </svg>
      ) : null}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 overflow-hidden rounded-[inherit]"
        style={{ backdropFilter: backdrop, WebkitBackdropFilter: backdrop }}
      />
      <div aria-hidden="true" className="glass-tint absolute inset-0 -z-10 rounded-[inherit]" />
      <div aria-hidden="true" className="glass-rim pointer-events-none absolute inset-0 z-10 rounded-[inherit]" />
      <div className={cn("relative", contentClassName)}>{children}</div>
    </div>
  );
}
