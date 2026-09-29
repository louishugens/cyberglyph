// Logos: Simple Icons (CC0), self-hosted in /public/logos.
// Rendered as CSS masks so one file serves both themes.
const platforms = [
  ["okta", "Okta"],
  ["auth0", "Auth0"],
  ["cloudflare", "Cloudflare"],
  ["googlecloud", "Google Cloud"],
  ["paloaltonetworks", "Palo Alto Networks"],
  ["fortinet", "Fortinet"],
  ["datadog", "Datadog"],
  ["1password", "1Password"],
  ["hashicorp", "HashiCorp"],
  ["terraform", "Terraform"],
  ["kubernetes", "Kubernetes"],
  ["github", "GitHub"],
  ["vercel", "Vercel"],
  ["anthropic", "Anthropic"],
  ["n8n", "n8n"],
] as const;

function Row({ hidden = false }: { hidden?: boolean }) {
  return (
    <ul aria-hidden={hidden || undefined} className="flex shrink-0 items-center gap-14 pr-14">
      {platforms.map(([slug, name]) => (
        <li key={slug}>
          <span
            role={hidden ? undefined : "img"}
            aria-label={hidden ? undefined : name}
            className="block size-8 bg-muted-foreground/80 transition-colors duration-200 hover:bg-foreground"
            style={{
              maskImage: `url(/logos/${slug}.svg)`,
              WebkitMaskImage: `url(/logos/${slug}.svg)`,
              maskSize: "contain",
              maskRepeat: "no-repeat",
              maskPosition: "center",
            }}
          />
        </li>
      ))}
    </ul>
  );
}

export function Platforms() {
  return (
    <section aria-labelledby="platforms-title" className="border-b border-border py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 id="platforms-title" className="text-sm text-muted-foreground">
          We deploy, integrate, and harden the platforms you already run.
        </h2>
      </div>
      <div className="group relative mt-8 flex overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_12%,black_88%,transparent)]">
        <div className="flex animate-[marquee_48s_linear_infinite] group-hover:[animation-play-state:paused] motion-reduce:animate-none">
          <Row />
          <Row hidden />
        </div>
      </div>
    </section>
  );
}
