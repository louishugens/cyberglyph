import { Reveal } from "@/components/motion/reveal";
import { SplitReveal } from "@/components/motion/split-reveal";
import { SpotlightCard } from "@/components/motion/spotlight-card";
import { Stagger, StaggerItem } from "@/components/motion/stagger";

const secondary = [
  {
    name: "Assessment sprint",
    length: "2 to 4 weeks",
    body: "A focused review of identity, cloud, and external exposure. You leave with a ranked risk register and a 90-day plan.",
  },
  {
    name: "Build project",
    length: "Scoped per project",
    body: "An AI automation, integration, or website delivered by the same engineers who secure it. Fixed scope, weekly demos.",
  },
];

export function Engagements() {
  return (
    <section className="py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <p className="font-mono text-xs tracking-[0.18em] text-signal uppercase">Ways to work together</p>
        </Reveal>
        <h2 className="mt-4 max-w-[20ch] text-4xl font-medium tracking-[-0.03em] text-balance md:text-5xl">
          <SplitReveal text="Start small, or hand us the whole program." />
        </h2>

        <div className="mt-14 grid gap-4 lg:grid-cols-5">
          <Reveal className="lg:col-span-3">
            <SpotlightCard strength={20} className="flex h-full flex-col justify-between overflow-hidden rounded-(--radius-panel) border border-signal/30 bg-surface p-8 md:p-10">
              <div
                aria-hidden="true"
                className="absolute -right-24 -bottom-32 -z-20 size-[28rem] rounded-full bg-signal/20 blur-3xl motion-safe:animate-[drift_14s_ease-in-out_infinite]"
              />
              <div className="relative">
                <p className="text-sm text-signal">Full coverage</p>
                <h3 className="mt-2 text-3xl font-medium tracking-[-0.025em] md:text-4xl">
                  Security program
                </h3>
                <p className="mt-4 max-w-[46ch] text-lg leading-relaxed text-muted-foreground">
                  A standing team that owns identity, detection, and compliance
                  readiness with you. One monthly retainer, one accountable lead.
                </p>
              </div>
              <Stagger as="ul" gap={0.06} delay={0.2} className="relative mt-10 grid gap-x-8 gap-y-3 text-[15px] sm:grid-cols-2">
                {[
                  "Named security lead",
                  "Identity & access operations",
                  "Detection tuning & response",
                  "SOC 2 and HIPAA readiness",
                  "Quarterly tabletop exercises",
                  "Board-ready reporting",
                ].map((i) => (
                  <StaggerItem as="li" key={i} className="border-t border-border pt-3">
                    {i}
                  </StaggerItem>
                ))}
              </Stagger>
            </SpotlightCard>
          </Reveal>

          <div className="grid gap-4 lg:col-span-2">
            {secondary.map((e, i) => (
              <Reveal key={e.name} delay={0.06 * (i + 1)}>
                <SpotlightCard className="panel h-full p-8">
                  <div className="flex items-baseline justify-between gap-4">
                    <h3 className="text-2xl font-medium tracking-[-0.02em]">{e.name}</h3>
                    <p className="shrink-0 font-mono text-xs text-muted-foreground">{e.length}</p>
                  </div>
                  <p className="mt-3 leading-relaxed text-muted-foreground">{e.body}</p>
                </SpotlightCard>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
