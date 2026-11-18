import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { CtaBand } from "@/components/cta-band";
import { Findings } from "@/components/motion/findings";
import { PhotoBackdrop } from "@/components/motion/photo-backdrop";
import { Reveal } from "@/components/motion/reveal";
import { Stagger, StaggerItem } from "@/components/motion/stagger";

export const metadata: Metadata = {
  title: "Who We Serve",
  description:
    "CyberGlyph Security works with small and midsize businesses in professional services, healthcare, technology, and other industries.",
  alternates: { canonical: "/industries" },
};

const markets = [
  {
    name: "Professional services",
    image: "/images/photo-law-soft.webp",
    alt: "A partner and an associate reviewing documents at a law firm",
    body: "Client files, financial records, and privileged communications sit in your inbox and document store.",
    who: ["Law firms", "Accounting firms", "Consulting companies", "Insurance companies", "Financial services"],
  },
  {
    name: "Healthcare",
    image: "/images/photo-clinic-soft.webp",
    alt: "A receptionist and a nurse at the front desk of a medical practice",
    body: "Patient records need protection on every laptop, phone, and shared mailbox in the practice.",
    who: ["Medical practices", "Dental practices", "Clinics", "Healthcare service providers"],
  },
  {
    name: "Small technology companies",
    image: "/images/photo-software-soft.webp",
    alt: "Developers working together in a small software office",
    body: "Your customers send security questionnaires before they sign. You need answers and the controls behind them.",
    who: ["SaaS companies", "Software companies", "Technology consulting"],
  },
  {
    name: "Other small and midsize businesses",
    image: "/images/photo-shop-soft.webp",
    alt: "A shop owner at a back-office desk with inventory shelves behind",
    body: "Any business with email, payroll, and customer data has something worth protecting.",
    who: ["Construction", "Manufacturing", "Real estate", "Nonprofits", "Retail"],
  },
];

const signs = [
  "No full-time cybersecurity engineer",
  "An outsourced IT company with limited security expertise",
  "Microsoft 365 or Google Workspace",
  "Laptops and mobile devices",
  "Employees working remotely",
  "Weak identity and access controls",
  "No formal incident-response plan",
  "No formal security policies",
  "No vulnerability-management program",
  "Compliance or customer security requirements",
  "Concerns about ransomware and phishing",
  "Concerns about account compromise",
];

export default function IndustriesPage() {
  return (
    <>
      <PageHeader
        shape="industries"
        title="Built for businesses"
        accent="without a security team."
        lead="Our clients are small and midsize businesses. They hold sensitive data, answer to customers and regulators, and have no one on staff whose job is security."
      />

      <section className="pt-4 pb-16 md:pb-24">
        <div className="mx-auto grid max-w-7xl gap-4 px-4 sm:px-6 md:grid-cols-2 lg:px-8">
          {markets.map((m, i) => (
            <Reveal
              key={m.name}
              delay={(i % 2) * 0.08}
              className="on-photo relative isolate flex min-h-[520px] flex-col justify-end overflow-hidden rounded-(--radius-panel) p-7 shadow-[inset_0_1px_0_oklch(1_0_0/0.08)] ring-1 ring-white/10 md:min-h-[600px] md:p-9"
            >
              <PhotoBackdrop src={m.image} alt={m.alt} sizes="(min-width: 768px) 50vw, 100vw" scrim="bottom" fade={false} />
              <h2 className="max-w-[16ch] text-3xl leading-[1.08] font-medium tracking-[-0.03em] text-balance md:text-4xl">
                {m.name}
              </h2>
              <p className="mt-3 max-w-[46ch] leading-relaxed text-muted-foreground">{m.body}</p>
              <Stagger as="ul" gap={0.05} delay={0.15} className="mt-6 flex flex-wrap gap-2">
                {m.who.map((w) => (
                  <StaggerItem
                    as="li"
                    key={w}
                    className="glass-chip rounded-full px-4 py-2"
                  >
                    {w}
                  </StaggerItem>
                ))}
              </Stagger>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="px-3 py-12 sm:px-6 md:py-20">
        <div className="card gold-glow mx-auto max-w-7xl p-8 md:p-14">
          <h2 className="max-w-[20ch] text-3xl leading-[1.1] font-medium tracking-[-0.03em] text-balance md:text-5xl">
            Does this sound like your business?
          </h2>
          <p className="mt-4 max-w-[52ch] text-lg leading-relaxed text-muted-foreground">
            If several of these describe you, an assessment will show where
            the risk sits.
          </p>
          <Findings items={signs} className="mt-12 grid gap-x-10 sm:grid-cols-2 lg:grid-cols-3" />
        </div>
      </section>

      <CtaBand />
    </>
  );
}
