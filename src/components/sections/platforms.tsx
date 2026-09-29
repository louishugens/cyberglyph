// Logos: Simple Icons (CC0), self-hosted in /public/logos.
// Rendered as CSS masks so one file serves both themes.
// Third value: whether the brand color reads on both themes. Near-black marks
// (GitHub, Vercel, ...) brighten to the foreground color instead.
const platforms = [
  ["okta", "Okta", true],
  ["auth0", "Auth0", true],
  ["cloudflare", "Cloudflare", true],
  ["googlecloud", "Google Cloud", true],
  ["paloaltonetworks", "Palo Alto Networks", true],
  ["fortinet", "Fortinet", true],
  ["datadog", "Datadog", true],
  ["1password", "1Password", true],
  ["hashicorp", "HashiCorp", false],
  ["terraform", "Terraform", true],
  ["kubernetes", "Kubernetes", true],
  ["github", "GitHub", false],
  ["vercel", "Vercel", false],
  ["anthropic", "Anthropic", false],
  ["n8n", "n8n", true],
] as const;

function Row({ hidden = false }: { hidden?: boolean }) {
  return (
    <ul aria-hidden={hidden || undefined} className="flex shrink-0 items-center gap-14 pr-14">
      {platforms.map(([slug, name, colored]) => (
        <li key={slug} className="group/logo relative">
          <span
            role={hidden ? undefined : "img"}
            aria-label={hidden ? undefined : name}
            className={
              colored
                ? "block size-8 bg-muted-foreground/80 transition-opacity duration-300 group-hover/logo:opacity-0"
                : "block size-8 bg-muted-foreground/80 transition-colors duration-300 group-hover/logo:bg-foreground"
            }
            style={{
              maskImage: `url(/logos/${slug}.svg)`,
              WebkitMaskImage: `url(/logos/${slug}.svg)`,
              maskSize: "contain",
              maskRepeat: "no-repeat",
              maskPosition: "center",
            }}
          />
          {colored ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={`/logos/${slug}.svg`}
              alt=""
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 size-8 scale-90 opacity-0 transition-[opacity,transform] duration-300 ease-(--ease-out) group-hover/logo:scale-100 group-hover/logo:opacity-100"
            />
          ) : null}
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
