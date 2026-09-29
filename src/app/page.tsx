import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Hero } from "@/components/sections/hero";
import { Platforms } from "@/components/sections/platforms";
import { Practices } from "@/components/sections/practices";
import { ZeroTrust } from "@/components/sections/zero-trust";
import { Approach } from "@/components/sections/approach";
import { Manifesto } from "@/components/sections/manifesto";
import { Engagements } from "@/components/sections/engagements";
import { Faq } from "@/components/sections/faq";
import { Contact } from "@/components/sections/contact";

export default function Home() {
  return (
    <>
      <a
        href="#main"
        className="sr-only z-50 rounded-full bg-primary px-4 py-2 text-primary-foreground focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
      >
        Skip to content
      </a>
      <SiteHeader />
      <main id="main">
        <Hero />
        <Platforms />
        <Practices />
        <ZeroTrust />
        <Approach />
        <Manifesto />
        <Engagements />
        <Faq />
        <Contact />
      </main>
      <SiteFooter />
    </>
  );
}
