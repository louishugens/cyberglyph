// Service catalogue, taken from the client brief. `headline` and `summary`
// for identity, data, endpoint, and web are the client's own wording.
export type Service = {
  id: string;
  name: string;
  headline: string;
  summary: string;
  image: string;
  alt: string;
  items: string[];
};

export const services: Service[] = [
  {
    id: "assessment",
    image: "/images/photo-server-soft.webp",
    alt: "A technician checking a network rack with a tablet in a small server closet",
    name: "Cybersecurity Assessment",
    headline: "Know where you stand before you spend.",
    summary:
      "We review your accounts, devices, cloud, and policies, then hand you a written report with a roadmap.",
    items: [
      "Cybersecurity risk assessment",
      "Microsoft 365 security assessment",
      "Identity assessment",
      "Endpoint security assessment",
      "Network assessment",
      "Cloud security assessment",
      "Vulnerability assessment",
      "Security configuration review",
      "Security policy review",
      "Vendor security assessment",
      "Security maturity assessment",
    ],
  },
  {
    id: "identity",
    image: "/images/photo-lobby-soft.webp",
    alt: "People walking through the entrance lobby of an office building",
    name: "Identity & Access Management",
    headline: "Keep business accounts in the right hands.",
    summary:
      "Strengthen sign-ins and manage employee access, from their first day to their last.",
    items: [
      "Microsoft Entra ID",
      "Multi-factor authentication",
      "Conditional Access",
      "Passwordless authentication",
      "Single sign-on and federation",
      "OAuth, OIDC, and SAML",
      "Privileged Identity Management",
      "Privileged account protection",
      "Joiner, mover, leaver process",
      "Access reviews",
      "Identity governance",
      "Service-account security",
    ],
  },
  {
    id: "endpoint",
    image: "/images/photo-office-soft.webp",
    alt: "Employees working on laptops in a small New York office",
    name: "Endpoint & Infrastructure Security",
    headline: "Keep your devices secure and your business moving.",
    summary:
      "Protect laptops, servers, and networks with practical security improvements and maintenance.",
    items: [
      "Microsoft Defender",
      "EDR and XDR",
      "Device compliance",
      "Patch management",
      "Disk encryption",
      "Application control",
      "Local administrator management",
      "Mobile-device security",
      "Windows hardening",
      "Server and network security",
      "Cloud security",
      "Vulnerability management",
    ],
  },
  {
    id: "data",
    image: "/images/photo-law-soft.webp",
    alt: "Two colleagues reviewing documents beside a laptop at a law firm",
    name: "Data & Email Protection",
    headline: "Protect your inbox and customer information.",
    summary:
      "Improve Microsoft 365 and Google Workspace security to reduce email threats and unwanted data sharing.",
    items: [
      "Email security",
      "Phishing protection",
      "Data Loss Prevention",
      "Data classification",
      "Encryption",
      "Secure sharing",
      "Access controls",
      "Data retention",
      "Backup security",
      "Microsoft Purview",
    ],
  },
  {
    id: "governance",
    image: "/images/photo-briefing-soft.webp",
    alt: "Three people in a meeting reviewing a laptop and a notebook",
    name: "Security Governance & Compliance",
    headline: "Answer the security questions your customers send you.",
    summary:
      "Written policies, tested plans, and a security program that fits the size of your business.",
    items: [
      "Cybersecurity policies",
      "Security questionnaires",
      "Compliance readiness",
      "NIST CSF assessments",
      "Incident response planning",
      "Business continuity",
      "Disaster recovery planning",
      "Vendor risk management",
      "Security awareness training",
      "Security program development",
    ],
  },
  {
    id: "web-ai",
    image: "/images/photo-software-soft.webp",
    alt: "A small team working at monitors and a whiteboard",
    name: "Web Design & AI Integration",
    headline: "Reach more customers. Simplify daily work.",
    summary:
      "Build a professional website and use AI to help with customer inquiries and repetitive tasks.",
    items: [
      "Business websites",
      "Website redesign",
      "E-commerce websites",
      "Website security and maintenance",
      "AI website chatbots",
      "Customer-service automation",
      "AI knowledge assistants",
      "Business process automation",
    ],
  },
];

/** The four services featured on the home page, in the client's order. */
export const featured = ["identity", "data", "endpoint", "web-ai"].map(
  (id) => services.find((s) => s.id === id)!,
);

export const ongoing = [
  "Security architecture",
  "Security monitoring",
  "Incident response",
  "Cybersecurity consulting",
];
