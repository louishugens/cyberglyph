import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { site } from "@/lib/site";

const faqs = [
  {
    q: "Who do you work with?",
    a: "Companies of roughly 20 to 2,000 people, often in finance, healthcare, legal, and real estate, that need senior security leadership without building a full in-house team.",
  },
  {
    q: "Do you replace our IT team or MSP?",
    a: "No. We work alongside them. They keep devices and help desk running; we own security architecture, identity, and detection, and we make their jobs easier while we do it.",
  },
  {
    q: "Which identity platforms do you support?",
    a: "Okta, Microsoft Entra ID, Google Workspace, Auth0, and JumpCloud, plus custom SAML and OIDC integrations for internal and legacy apps.",
  },
  {
    q: "How do you keep AI automations safe?",
    a: "Every automation runs under its own scoped identity, logs each action, and routes sensitive steps to a person for approval. Your data stays inside the boundaries you set.",
  },
  {
    q: "Can you get us ready for SOC 2 or HIPAA?",
    a: "Yes. We put the controls in place, automate evidence collection, and work directly with your auditor. The audit report itself always comes from an independent firm.",
  },
  {
    q: "How quickly can you start?",
    a: "Assessment sprints usually begin within two weeks of signing. If you are dealing with an active incident, call us and we will triage the same day.",
  },
];

export function Faq() {
  return (
    <section id="faq" className="border-t border-border py-24 md:py-32">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:px-8">
        <div className="lg:col-span-4">
          <h2 className="max-w-[14ch] text-4xl font-medium tracking-[-0.03em] text-balance md:text-5xl">
            Questions buyers ask first.
          </h2>
          <p className="mt-5 leading-relaxed text-muted-foreground">
            Something else on your mind? Email{" "}
            <a href={`mailto:${site.email}`} className="text-foreground underline underline-offset-4">
              {site.email}
            </a>
            .
          </p>
        </div>
        <Accordion className="border-t border-border lg:col-span-8">
          {faqs.map((f) => (
            <AccordionItem key={f.q} value={f.q}>
              <AccordionTrigger>{f.q}</AccordionTrigger>
              <AccordionContent>{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
