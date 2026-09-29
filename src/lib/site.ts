// Single source for business identity. Values marked PLACEHOLDER must be
// replaced with the client's real details before launch.
export const site = {
  name: "CyberGlyph Security",
  shortName: "CyberGlyph",
  url: "https://cyberglyph.security", // PLACEHOLDER: confirm production domain
  description:
    "CyberGlyph Security secures identities, hardens infrastructure, and builds the AI automations and web platforms New York businesses run on.",
  email: "hello@cyberglyph.security", // PLACEHOLDER
  phone: "+1 (212) 555-0147", // PLACEHOLDER
  phoneHref: "tel:+12125550147", // PLACEHOLDER
  address: {
    street: "Suite TBD, Lower Manhattan", // PLACEHOLDER
    city: "New York",
    region: "NY",
    postal: "10038", // PLACEHOLDER
    country: "US",
  },
  linkedin: "https://www.linkedin.com/", // PLACEHOLDER
} as const;

export const nav = [
  { label: "Practices", href: "#practices" },
  { label: "Zero trust", href: "#zero-trust" },
  { label: "Approach", href: "#approach" },
  { label: "FAQ", href: "#faq" },
] as const;

// One label for the contact intent, used everywhere on the page.
export const CTA_LABEL = "Book a briefing";
