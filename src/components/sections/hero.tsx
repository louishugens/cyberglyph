import type { CSSProperties } from "react";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { GlyphField } from "@/components/motion/glyph-field";
import { FloatingKey } from "@/components/motion/floating-key";
import { CTA_LABEL } from "@/lib/site";

const step = (i: number) => ({ "--i": i }) as CSSProperties;

export function Hero() {
  return (
    <section
      id="top"
      className="relative isolate overflow-hidden border-b border-border"
    >
      <GlyphField className="absolute inset-0 -z-10 size-full [mask-image:radial-gradient(ellipse_90%_38%_at_50%_82%,black_20%,transparent_75%)] lg:[mask-image:radial-gradient(ellipse_75%_85%_at_72%_45%,black_20%,transparent_75%)]" />

      <div className="mx-auto grid min-h-[calc(100dvh-4rem)] max-w-7xl items-center gap-10 px-4 pt-14 pb-16 sm:px-6 md:pt-20 lg:grid-cols-12 lg:gap-6 lg:px-8 lg:pb-20">
        <div className="lg:col-span-7">
          <h1
            style={step(0)}
            className="rise max-w-[14ch] text-5xl leading-[1.02] font-medium tracking-[-0.035em] text-balance sm:text-6xl lg:text-7xl"
          >
            Secure the business you&rsquo;re building.
          </h1>
          <p
            style={step(1)}
            className="rise mt-6 max-w-[46ch] text-lg leading-relaxed text-pretty text-muted-foreground"
          >
            CyberGlyph secures identities, hardens infrastructure, and ships the
            AI automations and web platforms your team runs on.
          </p>
          <div style={step(2)} className="rise mt-9 flex flex-wrap items-center gap-3">
            <a href="#contact" className="btn-primary group">
              {CTA_LABEL}
              <ArrowRight
                size={16}
                weight="bold"
                className="transition-transform duration-200 ease-out group-hover:translate-x-0.5"
              />
            </a>
            <a href="#practices" className="btn-ghost">
              Explore practices
            </a>
          </div>
        </div>

        <div className="mx-auto w-full max-w-[300px] sm:max-w-[360px] lg:col-span-5 lg:max-w-[420px]">
          <FloatingKey />
        </div>
      </div>
    </section>
  );
}
