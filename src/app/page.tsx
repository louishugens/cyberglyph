import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { Hero } from "@/components/sections/hero";
import { CtaBand } from "@/components/cta-band";
import { ZeroTrustSimulator } from "@/components/zero-trust-simulator";
import { Findings } from "@/components/motion/findings";
import { LiquidGlass } from "@/components/motion/liquid-glass";
import { Highlight } from "@/components/motion/highlight";
import { ObjectTile } from "@/components/motion/object-tile";
import { PhotoBackdrop } from "@/components/motion/photo-backdrop";
import { Reveal } from "@/components/motion/reveal";
import { Roadmap } from "@/components/motion/roadmap";
import { SplitReveal } from "@/components/motion/split-reveal";
import { featured } from "@/lib/services";

export const metadata: Metadata = { alternates: { canonical: "/" } };

const clients = [
  "Law firms",
  "Accounting firms",
  "Medical practices",
  "Dental practices",
  "Insurance companies",
  "SaaS companies",
  "Clinics",
  "Consulting companies",
  "Real estate",
  "Nonprofits",
  "Construction",
  "Retail",
];

const gaps = [
  "No full-time security engineer",
  "An IT provider with limited security expertise",
  "Weak sign-in and access controls",
  "No incident-response plan",
  "No written security policies",
  "Security requirements from customers",
];

const roadmap = [
  { when: "30 days", what: "Fix the critical findings first." },
  { when: "90 days", what: "Close the high-risk gaps in identity, endpoints, email, and data." },
  { when: "12 months", what: "Build the program: policies, training, vendor reviews, tested recovery." },
];

// Bento rhythm: wide + narrow, then narrow + wide.
const spans = ["md:col-span-7", "md:col-span-5", "md:col-span-5", "md:col-span-7"];

function ClientRow({ hidden = false }: { hidden?: boolean }) {
  return (
    <ul aria-hidden={hidden || undefined} className="flex shrink-0 items-center gap-12 pr-12">
      {clients.map((c) => (
        <li key={c} className="text-xl font-medium tracking-[-0.02em] whitespace-nowrap text-foreground/40 md:text-2xl">
          {c}
        </li>
      ))}
    </ul>
  );
}

export default function Home() {
  return (
    <>
      <Hero />

      <section aria-labelledby="clients-title" className="py-10">
        <h2 id="clients-title" className="sr-only">
          Who we serve
        </h2>
        <div className="group flex overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_12%,black_88%,transparent)]">
          <div className="flex animate-[marquee_60s_linear_infinite] group-hover:[animation-play-state:paused] motion-reduce:animate-none">
            <ClientRow />
            <ClientRow hidden />
          </div>
        </div>
      </section>

      <section id="practices" className="py-24 md:py-36">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="max-w-[20ch] text-4xl leading-[1.05] font-medium tracking-[-0.035em] text-balance md:text-6xl">
            <SplitReveal text="Security and technology" muted="for small and midsize businesses." />
          </h2>

          <ul className="mt-14 grid gap-4 md:grid-cols-12">
            {featured.map((s, i) => (
              <Reveal as="li" key={s.id} delay={(i % 2) * 0.08} className={spans[i]}>
                <Link
                  href={`/services#${s.id}`}
                  className="group block h-full rounded-(--radius-panel) outline-none focus-visible:ring-4 focus-visible:ring-ring"
                >
                  <ObjectTile
                    src={s.image}
                    alt={s.alt}
                    sizes="(min-width: 768px) 55vw, 100vw"
                    className="flex h-full min-h-[500px] flex-col justify-end p-7 md:min-h-[560px] md:p-9"
                  >
                    <div
                      aria-hidden="true"
                      className="absolute inset-x-0 bottom-0 -z-10 h-[78%] bg-linear-to-t from-[#06182f] from-45% via-[#06182f]/75 via-65% to-transparent"
                    />
                    <span className="absolute top-6 right-6 inline-flex size-11 items-center justify-center glass-chip rounded-full transition-[background-color,color,transform] duration-300 ease-(--ease-out) group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:bg-gold group-hover:text-[#06182f]">
                      <ArrowUpRight size={18} weight="bold" />
                    </span>
                    <h3 className="max-w-[18ch] text-3xl leading-[1.08] font-medium tracking-[-0.03em] text-balance md:text-4xl">
                      {s.headline}
                    </h3>
                    <p className="mt-3 max-w-[44ch] leading-relaxed text-white/70">{s.summary}</p>
                    <p className="mt-6 border-t border-white/12 pt-4 text-sm text-[#5fd0e0]">{s.name}</p>
                  </ObjectTile>
                </Link>
              </Reveal>
            ))}
          </ul>

          <p className="mt-8 text-muted-foreground">
            Also: assessments, governance, and compliance.{" "}
            <Link href="/services" className="link-draw text-foreground">
              See all six services
            </Link>
          </p>
        </div>
      </section>

      <section className="on-photo relative isolate overflow-hidden py-32 md:py-48">
        <PhotoBackdrop
          src="/images/photo-clinic-soft.webp"
          alt="A receptionist and a nurse at the front desk of a small medical practice"
          scrim="full"
          position="object-[50%_30%]"
        />
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:px-8">
          <div className="lg:col-span-6">
            <div className="lg:sticky lg:top-28">
              <h2 className="max-w-[16ch] text-4xl leading-[1.05] font-medium tracking-[-0.035em] text-balance md:text-6xl">
                <SplitReveal text="You have an IT provider." /> <span className="text-gold-fade">Who handles security?</span>
              </h2>
              <p className="mt-6 max-w-[46ch] text-lg leading-relaxed text-muted-foreground">
                A typical small business runs Microsoft 365 or Google Workspace,
                a fleet of laptops, and a few cloud apps, with staff working
                from home. The gaps tend to repeat.
              </p>
              <Link href="/industries" className="btn-ghost mt-8">
                Who we serve
              </Link>
            </div>
          </div>
          <LiquidGlass radius={24} className="lg:col-span-5 lg:col-start-8" contentClassName="px-7 py-2">
            <Findings items={gaps} className="[&>li]:py-6 [&>li]:text-xl [&>li:first-child]:border-t-0" />
          </LiquidGlass>
        </div>
      </section>

      <section className="py-24 md:py-36">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="max-w-[18ch] text-4xl leading-[1.05] font-medium tracking-[-0.035em] text-balance md:text-6xl">
            <SplitReveal text="Every request has to" /> <Highlight delay={0.4}>earn its access.</Highlight>
          </h2>
          <p className="mt-6 max-w-[56ch] text-lg leading-relaxed text-muted-foreground">
            A working model of the access policies we build. Change who is
            asking, what they want, and where they are.
          </p>
          <Reveal className="halo mt-14">
            <ZeroTrustSimulator />
          </Reveal>
        </div>
      </section>

      <section className="pb-24 md:pb-32">
        <div aria-hidden="true" className="rule-fade mx-auto mb-24 max-w-7xl md:mb-32" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-10 lg:grid-cols-12">
            <Reveal className="lg:col-span-5">
              <ObjectTile
                src="/images/photo-server-soft.webp"
                alt="A technician checking a network rack with a tablet in a small server closet"
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="aspect-[4/3]"
              />
            </Reveal>
            <div className="lg:col-span-6 lg:col-start-7">
              <h2 className="max-w-[14ch] text-4xl leading-[1.05] font-medium tracking-[-0.035em] text-balance md:text-6xl">
                <SplitReveal text="Start with an assessment." />
              </h2>
              <p className="mt-6 max-w-[50ch] text-lg leading-relaxed text-muted-foreground">
                You get a written report: your current security posture,
                findings ranked by risk, the business impact of each, and a
                roadmap in three stages.
              </p>
              <Link href="/assessment" className="btn-ghost group mt-8">
                What the assessment covers
                <ArrowRight
                  size={16}
                  weight="bold"
                  className="transition-transform duration-200 ease-out group-hover:translate-x-0.5"
                />
              </Link>
            </div>
          </div>

          <div className="mt-20 md:mt-28">
            <Roadmap stages={roadmap} />
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
