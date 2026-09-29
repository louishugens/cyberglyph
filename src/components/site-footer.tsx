import { LinkedinLogo } from "@phosphor-icons/react/dist/ssr";
import { Logo } from "@/components/logo";
import { ScrambleText } from "@/components/motion/scramble-text";
import { nav, site } from "@/lib/site";

const practices = [
  "Security assessments",
  "Identity & access",
  "AI automation",
  "Web engineering",
];

export function SiteFooter() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 md:grid-cols-12 lg:px-8">
        <div className="md:col-span-5">
          <Logo />
          <p className="mt-4 max-w-[36ch] leading-relaxed text-muted-foreground">
            Security, identity, AI automation, and web engineering for New York
            businesses.
          </p>
          <address className="mt-6 text-sm leading-relaxed text-muted-foreground not-italic">
            {site.name}
            <br />
            {site.address.street}
            <br />
            {site.address.city}, {site.address.region} {site.address.postal}
            <br />
            <a href={site.phoneHref} className="link-draw hover:text-foreground">{site.phone}</a>
            <br />
            <a href={`mailto:${site.email}`} className="link-draw hover:text-foreground">{site.email}</a>
          </address>
        </div>

        <div className="grid grid-cols-2 gap-8 md:col-span-7 md:grid-cols-3">
          <div>
            <p className="text-sm font-medium">Practices</p>
            <ul className="mt-4 grid gap-3 text-sm text-muted-foreground">
              {practices.map((p) => (
                <li key={p}>
                  <a href="#practices" className="hover:text-foreground"><ScrambleText>{p}</ScrambleText></a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-sm font-medium">Company</p>
            <ul className="mt-4 grid gap-3 text-sm text-muted-foreground">
              {nav.slice(1).map((n) => (
                <li key={n.href}>
                  <a href={n.href} className="hover:text-foreground"><ScrambleText>{n.label}</ScrambleText></a>
                </li>
              ))}
              <li>
                <a href="#contact" className="hover:text-foreground"><ScrambleText>Contact</ScrambleText></a>
              </li>
            </ul>
          </div>
          <div>
            <p className="text-sm font-medium">Follow</p>
            <a
              href={site.linkedin}
              aria-label="CyberGlyph Security on LinkedIn"
              className="pressable mt-4 inline-flex size-10 items-center justify-center rounded-full border border-border text-muted-foreground hover:text-foreground"
            >
              <LinkedinLogo size={18} />
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-6 text-sm text-muted-foreground sm:flex-row sm:justify-between sm:px-6 lg:px-8">
          <p>&copy; {new Date().getFullYear()} {site.name}. All rights reserved.</p>
          <p>
            <a href="#" className="link-draw hover:text-foreground">Privacy</a>
            <span className="px-2">/</span>
            <a href="#" className="link-draw hover:text-foreground">Responsible disclosure</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
