import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { CtaBand } from "@/components/cta-band";
import { Reveal } from "@/components/motion/reveal";
import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { ZeroTrustSimulator } from "@/components/zero-trust-simulator";

export const metadata: Metadata = {
  title: "Zero Trust Simulator",
  description:
    "Change who is signing in, what they want, and where they are, and watch a zero trust access policy decide: allow, step-up, or deny.",
  alternates: { canonical: "/zero-trust" },
};

const checks = [
  { name: "Entitlement", body: "Does this person's role include this system?" },
  { name: "Device posture", body: "Is the device managed, encrypted, and patched?" },
  { name: "Authentication", body: "Did they sign in with a method phishing cannot defeat?" },
  { name: "Context", body: "Does the location match where this person normally works?" },
];

export default function ZeroTrustPage() {
  return (
    <>
      <PageHeader
        shape="lock"
        title="Every request has to"
        accent="earn its access."
        lead="Zero trust means a password alone opens nothing. This is a working model of the Conditional Access policies we build. Change who is asking, what they want, and where they are."
      />

      <section className="pt-4 pb-14 md:pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal className="halo">
            <ZeroTrustSimulator />
          </Reveal>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="max-w-[20ch] text-3xl leading-[1.1] font-medium tracking-[-0.03em] text-balance md:text-5xl">
            Four questions behind every sign-in
          </h2>
          <Stagger as="dl" gap={0.08} className="mt-12 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {checks.map((c) => (
              <StaggerItem key={c.name} className="card p-7">
                <dt className="text-xl font-medium tracking-[-0.02em]">{c.name}</dt>
                <dd className="mt-2 leading-relaxed text-muted-foreground">{c.body}</dd>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <CtaBand
        title="Want policies like these"
        accent="on your own accounts?"
        body="We design and roll out MFA, Conditional Access, and least-privilege access in Microsoft Entra ID."
      />
    </>
  );
}
