import Link from "next/link";
import { LinkedinLogo } from "@phosphor-icons/react/dist/ssr";
import { Logo } from "@/components/logo";
import { services } from "@/lib/services";
import { nav, site } from "@/lib/site";

const linkClass = "hover:text-foreground";

export function SiteFooter() {
  return (
    <footer>
      <div aria-hidden="true" className="rule-fade mx-auto max-w-7xl" />
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 md:grid-cols-12 lg:px-8">
        <div className="md:col-span-5">
          <Logo className="h-12" />
          <p className="mt-5 max-w-[38ch] leading-relaxed text-muted-foreground">
            Cybersecurity and technology services for small and midsize
            businesses.
          </p>
          <address className="mt-6 text-sm leading-relaxed text-muted-foreground not-italic">
            {site.address.street}
            <br />
            {site.address.city}, {site.address.region} {site.address.postal}
            <br />
            <a href={site.phoneHref} className="link-draw hover:text-foreground">{site.phone}</a>
            <br />
            <a href={`mailto:${site.email}`} className="link-draw hover:text-foreground">{site.email}</a>
          </address>
        </div>

        <div className="grid grid-cols-2 gap-8 md:col-span-7">
          <div>
            <p className="text-sm font-medium">Services</p>
            <ul className="mt-4 grid gap-3 text-sm text-muted-foreground">
              {services.map((s) => (
                <li key={s.id}>
                  <Link href={`/services#${s.id}`} className={linkClass}>{s.name}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-sm font-medium">Company</p>
            <ul className="mt-4 grid gap-3 text-sm text-muted-foreground">
              {nav.slice(1).map((n) => (
                <li key={n.href}>
                  <Link href={n.href} className={linkClass}>{n.label}</Link>
                </li>
              ))}
              <li>
                <Link href="/contact" className={linkClass}>Contact</Link>
              </li>
              <li>
                <a href={site.linkedin} className={`inline-flex items-center gap-1.5 ${linkClass}`}>
                  <LinkedinLogo size={16} />
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div>
        <div aria-hidden="true" className="rule-fade mx-auto max-w-7xl" />
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-6 text-sm text-muted-foreground sm:flex-row sm:justify-between sm:px-6 lg:px-8">
          <p>&copy; {new Date().getFullYear()} {site.name}. All rights reserved.</p>
          <p className="flex gap-5">
            <Link href="/privacy" className="link-draw hover:text-foreground">Privacy</Link>
            <Link href="/responsible-disclosure" className="link-draw hover:text-foreground">Responsible disclosure</Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
