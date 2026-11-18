import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { CtaBand } from "@/components/cta-band";
import { PhotoBackdrop } from "@/components/motion/photo-backdrop";
import { ObjectTile } from "@/components/motion/object-tile";
import { Reveal } from "@/components/motion/reveal";
import { Roadmap } from "@/components/motion/roadmap";
import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { services } from "@/lib/services";

export const metadata: Metadata = {
  title: "Cybersecurity Assessment",
  description:
    "A CyberGlyph assessment reviews your identities, devices, network, cloud, and policies, and ends with a written report and a 30-day, 90-day, and 12-month roadmap.",
  alternates: { canonical: "/assessment" },
};

const scope = services.find((s) => s.id === "assessment")!.items;

const report = [
  { title: "Executive summary", body: "Written for the owner, in plain language." },
  { title: "Current security posture", body: "How your accounts, devices, cloud, and policies stand today." },
  { title: "Findings by severity", body: "Critical and high-risk findings first, then medium and low." },
  { title: "Business impact", body: "What each finding could cost you in downtime, data, or customers." },
  { title: "Recommended remediation", body: "The specific fix for each finding and who should make it." },
];

const roadmap = [
  { when: "30 days", what: "Critical findings. The fixes that cannot wait." },
  { when: "90 days", what: "High-risk findings across identity, endpoints, email, and data." },
  { when: "12 months", what: "The security program: policies, training, vendor reviews, recovery plans." },
];

const identity = [
  "Users and groups",
  "Privileged accounts",
  "MFA coverage",
  "Conditional Access",
  "Applications",
  "Service principals",
  "Guest and external users",
  "Authentication methods",
];

export default function AssessmentPage() {
  return (
    <>
      <PageHeader
        shape="assessment"
        title="Know where you stand"
        accent="before you spend."
        lead="An assessment is the right first project for most businesses. We review your environment, rank what we find by risk, and give you a roadmap you can act on with us, with your IT provider, or on your own."
      />

      <section className="pt-8 pb-20 md:pb-28">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-12 lg:px-8">
          <div className="lg:col-span-4">
            <h2 className="text-3xl leading-[1.08] font-medium tracking-[-0.03em] md:text-5xl">What we review</h2>
            <Reveal className="mt-8 max-lg:hidden">
              <ObjectTile
                src="/images/photo-server-soft.webp"
                alt="A technician checking a network rack with a tablet in a small server closet"
                sizes="30vw"
                className="aspect-square"
              />
            </Reveal>
          </div>
          <Stagger as="ul" gap={0.04} className="grid content-start gap-x-8 sm:grid-cols-2 lg:col-span-7 lg:col-start-6">
            {scope.map((i) => (
              <StaggerItem as="li" key={i} className="flex gap-3 border-t border-border py-4 text-lg leading-snug">
                <span aria-hidden="true" className="mt-[0.65em] h-px w-3 shrink-0 bg-signal" />
                {i}
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl leading-[1.1] font-medium tracking-[-0.03em] md:text-5xl">
            What the report contains
          </h2>
          <Stagger as="ol" gap={0.07} className="card halo mt-12 grid gap-px overflow-hidden sm:grid-cols-2 lg:grid-cols-3">
            {[...report, { title: "Roadmap", body: "The same findings, sequenced into three stages." }].map((r) => (
              <StaggerItem as="li" key={r.title} className="p-7 shadow-[0_0_0_0.5px_oklch(1_0_0/0.08)] md:p-9">
                <h3 className="text-2xl font-medium tracking-[-0.02em]">{r.title}</h3>
                <p className="mt-3 max-w-[38ch] leading-relaxed text-muted-foreground">{r.body}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl leading-[1.1] font-medium tracking-[-0.03em] md:text-5xl">
            A roadmap in three stages
          </h2>
          <div className="mt-16">
            <Roadmap stages={roadmap} />
          </div>
        </div>
      </section>

      <section className="on-photo relative isolate overflow-hidden py-32 md:py-48">
        <PhotoBackdrop
          src="/images/photo-lobby-soft.webp"
          alt="People walking through the entrance lobby of an office building"
          position="object-top"
        />
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-12 lg:px-8">
          <div className="lg:col-span-5">
            <h2 className="max-w-[16ch] text-3xl leading-[1.1] font-medium tracking-[-0.03em] text-balance md:text-4xl">
              Need a narrower look? Start with identity.
            </h2>
            <p className="mt-4 max-w-[44ch] text-lg leading-relaxed text-muted-foreground">
              The identity security assessment covers one thing: who can sign
              in to your business, and what they can reach once they do.
            </p>
          </div>
          <Stagger as="ul" gap={0.04} className="flex flex-wrap content-start gap-2 lg:col-span-6 lg:col-start-7 lg:pt-2">
            {identity.map((i) => (
              <StaggerItem as="li" key={i} className="glass-chip rounded-full px-5 py-2.5 text-lg">
                {i}
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <CtaBand
        title="Ask for an assessment."
        accent=""
        body="Tell us how many people you have and what you run. We will scope the review with you on a call."
      />
    </>
  );
}
