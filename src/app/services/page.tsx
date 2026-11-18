import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { CtaBand } from "@/components/cta-band";
import { ObjectTile } from "@/components/motion/object-tile";
import { Reveal } from "@/components/motion/reveal";
import { SectionSpy } from "@/components/motion/section-spy";
import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { ongoing, services } from "@/lib/services";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Cybersecurity assessments, identity and access management, endpoint and data protection, governance and compliance, web design, and AI integration for small and midsize businesses.",
  alternates: { canonical: "/services" },
};

const spy = services.map((s) => ({ id: s.id, label: s.name }));

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        shape="governance"
        title="Six services."
        accent="One security partner."
        lead="We protect your accounts, devices, data, and applications, and we build the website and AI tools your customers use. Take one service or all six."
      />

      <div className="mx-auto grid max-w-7xl gap-12 px-4 pt-8 pb-20 sm:px-6 md:pb-28 lg:grid-cols-12 lg:px-8">
        <aside className="hidden lg:col-span-3 lg:block">
          <div className="sticky top-28">
            <SectionSpy items={spy} />
          </div>
        </aside>

        <div className="grid gap-24 md:gap-32 lg:col-span-9">
          {services.map((s) => (
            <section key={s.id} id={s.id} aria-labelledby={`${s.id}-title`}>
              <Reveal>
                <ObjectTile
                  src={s.image}
                  alt={s.alt}
                  sizes="(min-width: 1024px) 70vw, 100vw"
                  className="aspect-[16/10] sm:aspect-[21/9]"
                />
              </Reveal>
              <div className="mt-10 grid gap-8 md:grid-cols-12">
                <div className="md:col-span-6">
                  <h2
                    id={`${s.id}-title`}
                    className="max-w-[16ch] text-3xl leading-[1.08] font-medium tracking-[-0.03em] text-balance md:text-5xl"
                  >
                    {s.headline}
                  </h2>
                  <p className="mt-5 max-w-[42ch] text-lg leading-relaxed text-muted-foreground">{s.summary}</p>
                  <p className="mt-6 text-sm text-signal">{s.name}</p>
                </div>
                <Stagger as="ul" gap={0.035} className="grid content-start gap-x-6 sm:grid-cols-2 md:col-span-6">
                  {s.items.map((i) => (
                    <StaggerItem as="li" key={i} className="flex gap-3 py-2 leading-snug">
                      <span aria-hidden="true" className="mt-[0.65em] h-px w-3 shrink-0 bg-signal" />
                      {i}
                    </StaggerItem>
                  ))}
                </Stagger>
              </div>
            </section>
          ))}

          <section className="card gold-glow p-8 md:p-12">
            <h2 className="max-w-[20ch] text-3xl leading-[1.08] font-medium tracking-[-0.03em] text-balance md:text-5xl">
              Ongoing support after the project ends.
            </h2>
            <Stagger as="ul" className="mt-8 flex flex-wrap gap-2">
              {ongoing.map((o) => (
                <StaggerItem as="li" key={o} className="glass-chip rounded-full px-5 py-2.5 text-lg">
                  {o}
                </StaggerItem>
              ))}
            </Stagger>
          </section>
        </div>
      </div>

      <CtaBand />
    </>
  );
}
