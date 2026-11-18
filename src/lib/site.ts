// Single source for business identity. Values marked PLACEHOLDER must be
// replaced with the client's real details before launch.
export const site = {
  name: "CyberGlyph Security",
  shortName: "CyberGlyph",
  url: "https://cyberglyph.security", // PLACEHOLDER: confirm production domain
  description:
    "CyberGlyph Security helps small and midsize businesses protect their identities, devices, data, and applications, and builds the websites and AI tools they run on.",
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
  { label: "Services", href: "/services" },
  { label: "Assessment", href: "/assessment" },
  { label: "Who we serve", href: "/industries" },
  { label: "Zero trust", href: "/zero-trust" },
] as const;

// One label for the contact intent, used everywhere on the site.
export const CTA_LABEL = "Book a briefing";
