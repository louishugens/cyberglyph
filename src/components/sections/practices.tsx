import { ArrowDown } from "@phosphor-icons/react/dist/ssr";
import { Reveal } from "@/components/motion/reveal";
import { SplitReveal } from "@/components/motion/split-reveal";
import { SpotlightCard } from "@/components/motion/spotlight-card";
import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { TiltImage } from "@/components/motion/tilt-image";
import { DrawMark } from "@/components/motion/draw-mark";
import { cn } from "@/lib/utils";

function Tags({ items }: { items: string[] }) {
  return (
    <Stagger as="ul" gap={0.05} delay={0.25} className="mt-5 flex flex-wrap gap-2">
      {items.map((t) => (
        <StaggerItem
          as="li"
          key={t}
          className="rounded-full border border-border bg-background/60 px-3 py-1 text-[13px] text-muted-foreground"
        >
          {t}
        </StaggerItem>
      ))}
    </Stagger>
  );
}

function CellText({
  title,
  body,
  tags,
  className,
}: {
  title: string;
  body: string;
  tags: string[];
  className?: string;
}) {
  return (
    <div className={cn("relative", className)}>
      <h3 className="text-2xl font-medium tracking-[-0.02em] text-balance">{title}</h3>
      <p className="mt-3 max-w-[44ch] leading-relaxed text-muted-foreground">{body}</p>
      <Tags items={tags} />
    </div>
  );
}

const lift = "transition-transform duration-500 ease-(--ease-out) group-hover:-translate-y-1.5";

export function Practices() {
  return (
    <section id="practices" className="py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <p className="font-mono text-xs tracking-[0.18em] text-signal uppercase">Practices</p>
        </Reveal>
        <h2 className="mt-4 max-w-[22ch] text-4xl font-medium tracking-[-0.03em] text-balance md:text-5xl">
          <SplitReveal text="Four practices. One team accountable for all of it." />
        </h2>

        <div className="mt-14 grid gap-4 md:grid-cols-6">
          {/* Security operations: wide, appliance breaks out the right edge */}
          <Reveal className="md:col-span-4">
            <SpotlightCard className="panel group flex h-full min-h-[380px] flex-col justify-end overflow-hidden p-7 md:p-9">
              <div
                aria-hidden="true"
                className="absolute inset-0 -z-20 bg-[radial-gradient(90%_70%_at_85%_10%,var(--signal-soft),transparent_70%)]"
              />
              <TiltImage
                src="/images/appliance.webp"
                alt="A graphite rack-mount security appliance with blue status lights"
                width={1170}
                height={396}
                sizes="(min-width: 768px) 560px, 90vw"
                tilt={7}
                className="pointer-events-none absolute top-4 -right-12 w-[108%] max-w-[620px] md:-top-2 md:-right-16 md:w-[78%]"
                imgClassName={lift}
              />
              <CellText
                className="mt-40 md:mt-44"
                title="Find the gaps before anyone else does."
                body="Penetration testing, cloud posture reviews, and around-the-clock detection tuned to how your business actually runs."
                tags={["Penetration testing", "Cloud posture", "Detection & response", "Compliance readiness"]}
              />
            </SpotlightCard>
          </Reveal>

          {/* Identity: tinted, no photo, points to the live demo */}
          <Reveal className="md:col-span-2" delay={0.08}>
            <SpotlightCard
              glow="white"
              strength={14}
              className="group flex h-full min-h-[380px] flex-col justify-between overflow-hidden rounded-(--radius-panel) bg-primary p-7 text-primary-foreground md:p-9"
            >
              <div
                aria-hidden="true"
                className="absolute -right-14 -bottom-14 text-primary-foreground/15 transition-transform duration-700 ease-(--ease-out) group-hover:-rotate-12"
              >
                <DrawMark className="size-52" />
              </div>
              <div
                aria-hidden="true"
                className="absolute inset-0 -z-20 bg-[radial-gradient(120%_80%_at_0%_100%,oklch(0.2_0.08_262/0.55),transparent_60%)]"
              />
              <div className="relative">
                <h3 className="text-2xl font-medium tracking-[-0.02em] text-balance">
                  Access that has to prove itself.
                </h3>
                <p className="mt-3 leading-relaxed text-primary-foreground/80">
                  SSO, passkeys, and least-privilege policy across Okta, Entra ID,
                  and the internal apps nobody documented.
                </p>
              </div>
              <a
                href="#zero-trust"
                className="pressable group/cta relative mt-8 inline-flex w-fit items-center gap-2 rounded-full bg-primary-foreground/12 px-4 py-2.5 text-sm font-medium ring-1 ring-primary-foreground/25 outline-none hover:bg-primary-foreground/20 focus-visible:ring-4 focus-visible:ring-primary-foreground/60"
              >
                Try the policy engine
                <ArrowDown
                  size={14}
                  weight="bold"
                  className="transition-transform duration-200 ease-out group-hover/cta:translate-y-0.5"
                />
              </a>
            </SpotlightCard>
          </Reveal>

          {/* AI automation: chip sits top, text bottom */}
          <Reveal className="md:col-span-2">
            <SpotlightCard className="panel group flex h-full min-h-[420px] flex-col justify-end overflow-hidden p-7 md:p-9">
              <div
                aria-hidden="true"
                className="absolute top-10 left-1/2 -z-20 size-56 -translate-x-1/2 rounded-full bg-signal/15 blur-3xl motion-safe:animate-[breathe_6s_ease-in-out_infinite]"
              />
              <TiltImage
                src="/images/chip.webp"
                alt="An AI processor chip with a blue glow along its edge"
                width={870}
                height={590}
                sizes="(min-width: 768px) 320px, 80vw"
                tilt={14}
                depth={18}
                className="pointer-events-none absolute top-6 left-1/2 w-[82%] -translate-x-1/2"
                imgClassName={lift}
              />
              <CellText
                className="mt-52"
                title="Automation your auditors can follow."
                body="Agents and workflows wired into your CRM, ERP, and inbox, with approvals, logging, and data boundaries built in."
                tags={["AI agents", "Integrations", "Guardrails"]}
              />
            </SpotlightCard>
          </Reveal>

          {/* Web engineering: wide, text left, laptop right */}
          <Reveal className="md:col-span-4" delay={0.08}>
            <SpotlightCard className="group grid h-full min-h-[420px] overflow-hidden rounded-(--radius-panel) border border-border bg-surface-2 p-7 md:grid-cols-2 md:items-end md:p-9">
              <div
                aria-hidden="true"
                className="absolute inset-0 -z-20 [background-image:radial-gradient(var(--border)_1px,transparent_1px)] [background-size:18px_18px] [mask-image:linear-gradient(to_left,black,transparent_70%)]"
              />
              <CellText
                className="order-2 md:order-1"
                title="Websites built like infrastructure."
                body="Fast, accessible sites and web apps, shipped with security headers, monitoring, and a real deploy pipeline."
                tags={["Next.js", "Web apps", "Performance", "Accessibility"]}
              />
              <TiltImage
                src="/images/laptop.webp"
                alt="An open laptop showing a dark website design with blue accents"
                width={899}
                height={551}
                sizes="(min-width: 768px) 420px, 90vw"
                tilt={9}
                className="pointer-events-none relative order-1 mb-6 md:order-2 md:mb-0 md:self-center"
                imgClassName={cn(lift, "w-full md:w-[120%] md:max-w-none")}
              />
            </SpotlightCard>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
