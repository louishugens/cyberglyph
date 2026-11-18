import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { PhotoBackdrop } from "@/components/motion/photo-backdrop";
import { Reveal } from "@/components/motion/reveal";
import { CTA_LABEL } from "@/lib/site";

/** Closing call to action shared by every page except Contact: one framed panel. */
export function CtaBand({
  title = "Tell us what you run.",
  accent = "We will tell you where to start.",
  body = "A briefing is a conversation about your business, your systems, and what worries you. You decide what happens after.",
}: {
  title?: string;
  /** Second phrase of the heading, warmed into gold. */
  accent?: string;
  body?: string;
}) {
  return (
    <section className="px-3 py-20 sm:px-6 md:py-28">
      <Reveal className="on-photo relative isolate mx-auto max-w-7xl overflow-hidden rounded-[28px] glass-glow px-6 py-16 sm:px-12 md:px-16 md:py-24">
        <PhotoBackdrop
          src="/images/photo-briefing-soft.webp"
          alt="Two consultants and a business owner reviewing a laptop at a conference table"
          position="object-[70%_30%]"
          fade={false}
        />
        <div aria-hidden="true" className="glass-rim pointer-events-none absolute inset-0 rounded-[inherit]" />
        <h2 className="max-w-[18ch] text-4xl leading-[1.05] font-medium tracking-[-0.035em] text-balance md:text-6xl">
          {title} {accent ? <span className="text-gold-fade">{accent}</span> : null}
        </h2>
        <p className="mt-6 max-w-[46ch] text-lg leading-relaxed text-muted-foreground">{body}</p>
        <Link href="/contact" className="btn-primary group mt-10 h-12 px-6">
          {CTA_LABEL}
          <ArrowRight
            size={16}
            weight="bold"
            className="transition-transform duration-200 ease-out group-hover:translate-x-0.5"
          />
        </Link>
      </Reveal>
    </section>
  );
}
