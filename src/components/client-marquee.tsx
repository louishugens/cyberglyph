const clients = [
  "Law firms",
  "Accounting firms",
  "Medical practices",
  "Dental practices",
  "Insurance companies",
  "SaaS companies",
  "Clinics",
  "Consulting companies",
  "Real estate",
  "Nonprofits",
  "Construction",
  "Retail",
];

function Row({ hidden = false }: { hidden?: boolean }) {
  return (
    <ul aria-hidden={hidden || undefined} className="flex shrink-0 items-center gap-12 pr-12">
      {clients.map((c) => (
        <li key={c} className="text-xl font-medium tracking-[-0.02em] whitespace-nowrap text-foreground/55 md:text-2xl">
          {c}
        </li>
      ))}
    </ul>
  );
}

/** The kinds of business CyberGlyph serves, drifting past. Pauses on hover. */
export function ClientMarquee() {
  return (
    <div className="group flex overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_12%,black_88%,transparent)]">
      <div className="flex animate-[marquee_60s_linear_infinite] group-hover:[animation-play-state:paused] motion-reduce:animate-none">
        <Row />
        <Row hidden />
      </div>
    </div>
  );
}
