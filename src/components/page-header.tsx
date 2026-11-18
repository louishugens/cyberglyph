import type { CSSProperties, ReactNode } from "react";
import { GlyphField } from "@/components/motion/glyph-field";
import { GlyphIcon } from "@/components/motion/glyph-icon";
import type { GlyphShape } from "@/components/motion/glyph-shapes";
import { SplitReveal } from "@/components/motion/split-reveal";

const step = (i: number) => ({ "--i": i }) as CSSProperties;

/**
 * Opening for inner pages, in the home hero's language: the glyph field
 * behind, and the page's own silhouette resolving out of it.
 */
export function PageHeader({
  title,
  accent,
  lead,
  shape,
  children,
}: {
  title: string;
  /** Closing phrase of the title, warmed into gold. */
  accent?: string;
  lead: string;
  shape: GlyphShape;
  children?: ReactNode;
}) {
  return (
    <header className="relative isolate overflow-hidden">
      <GlyphField className="absolute inset-0 -z-10 size-full [mask-image:radial-gradient(ellipse_70%_90%_at_82%_40%,black_10%,transparent_70%)] max-lg:hidden" />
      <div className="mx-auto grid max-w-7xl items-center gap-8 px-4 pt-20 pb-16 sm:px-6 md:pt-28 md:pb-24 lg:grid-cols-12 lg:px-8">
        <div className="lg:col-span-7">
          <h1 className="max-w-[16ch] text-4xl leading-[1.05] font-medium tracking-[-0.035em] text-balance sm:text-5xl lg:text-6xl">
            <SplitReveal text={title} />{" "}
            {accent ? (
              <span style={step(2)} className="rise text-gold-fade inline-block">
                {accent}
              </span>
            ) : null}
          </h1>
          <p style={step(3)} className="rise mt-6 max-w-[54ch] text-lg leading-relaxed text-pretty text-muted-foreground">
            {lead}
          </p>
          {children ? (
            <div style={step(5)} className="rise">
              {children}
            </div>
          ) : null}
        </div>
        <GlyphIcon
          shape={shape}
          cell={10}
          className="hidden aspect-square w-full max-w-[380px] justify-self-end lg:col-span-5 lg:block"
        />
      </div>
    </header>
  );
}
