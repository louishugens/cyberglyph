import type { Metadata } from "next";
import { ContactForm } from "@/components/contact-form";
import { PhotoBackdrop } from "@/components/motion/photo-backdrop";
import { Faq } from "@/components/faq";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Book a briefing with CyberGlyph Security. Tell us what you run and what worries you.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <section className="on-photo relative isolate -mt-[4.25rem] overflow-hidden pt-[4.25rem]">
        <PhotoBackdrop
          src="/images/photo-lobby-soft.webp"
          alt="Two professionals walking through an office building lobby in Lower Manhattan"
          position="object-top"
          priority
        />
        <div className="mx-auto grid max-w-7xl gap-14 px-4 pt-16 pb-20 sm:px-6 md:pt-24 md:pb-24 lg:grid-cols-12 lg:px-8">
          <div className="lg:col-span-5">
            <h1 className="max-w-[14ch] text-4xl leading-[1.05] font-medium tracking-[-0.035em] text-balance sm:text-5xl lg:text-6xl">
              Book a <span className="text-gold-fade">briefing.</span>
            </h1>
            <p className="mt-6 max-w-[44ch] text-lg leading-relaxed text-muted-foreground">
              Tell us about your business, the systems you run, and what
              worries you. We will come to the call with questions.
            </p>

            <dl className="mt-10 grid gap-5 text-[15px]">
              <div>
                <dt className="text-muted-foreground">Email</dt>
                <dd className="mt-1">
                  <a href={`mailto:${site.email}`} className="link-draw">{site.email}</a>
                </dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Phone</dt>
                <dd className="mt-1">
                  <a href={site.phoneHref} className="link-draw">{site.phone}</a>
                </dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Office</dt>
                <dd className="mt-1">
                  {site.address.street}, {site.address.city}, {site.address.region}
                </dd>
              </div>
            </dl>
          </div>

          <div className="lg:col-span-7">
            <ContactForm />
          </div>
        </div>
      </section>

      <section className="py-20 md:py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl leading-[1.1] font-medium tracking-[-0.03em] md:text-4xl">
            Common questions
          </h2>
          <div className="mt-10">
            <Faq />
          </div>
        </div>
      </section>
    </>
  );
}
