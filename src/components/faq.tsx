import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "Who do you work with?",
    a: "Small and midsize businesses: law, accounting, and insurance firms, medical and dental practices, software companies, and others such as construction, real estate, retail, and nonprofits.",
  },
  {
    q: "We already have an IT company. Why add you?",
    a: "Your IT company keeps devices and the help desk running. We cover the security work most IT providers lack the staff for: identity, device hardening, data protection, and policy. We work alongside them.",
  },
  {
    q: "Where do we start?",
    a: "With an assessment. We review your accounts, devices, cloud, and policies, then give you a written report with findings ranked by risk and a roadmap for 30 days, 90 days, and 12 months.",
  },
  {
    q: "Do you work with Microsoft 365 and Google Workspace?",
    a: "Yes. Most of our identity, email, and data protection work happens inside those two platforms, including Microsoft Entra ID, Defender, and Purview.",
  },
  {
    q: "A customer sent us a security questionnaire. Can you help?",
    a: "Yes. We help you answer it, write the policies it asks for, and close the gaps behind the questions you cannot answer yet.",
  },
  {
    q: "Do you build websites too?",
    a: "Yes. We design and build business and e-commerce websites, maintain and secure them, and add AI chatbots that answer customer inquiries.",
  },
];

export function Faq() {
  return (
    <Accordion className="border-t border-border">
      {faqs.map((f) => (
        <AccordionItem key={f.q} value={f.q}>
          <AccordionTrigger>{f.q}</AccordionTrigger>
          <AccordionContent>{f.a}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
