"use client";

import { useId, useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { CheckCircle, WarningCircle, XCircle } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

type SubjectId = "analyst" | "engineer" | "contractor";
type ResourceId = "payroll" | "proddb" | "cms";
type LocationId = "office" | "home" | "unfamiliar";
type Status = "pass" | "warn" | "fail";
type Decision = "allow" | "stepup" | "deny";

const subjects: Record<SubjectId, { label: string; group: string; grants: ResourceId[] }> = {
  analyst: { label: "Finance analyst", group: "finance", grants: ["payroll", "cms"] },
  engineer: { label: "On-call engineer", group: "platform", grants: ["proddb", "cms"] },
  contractor: { label: "Agency contractor", group: "external", grants: ["cms"] },
};

const resources: Record<ResourceId, { label: string; high: boolean }> = {
  payroll: { label: "Payroll", high: true },
  proddb: { label: "Production DB", high: true },
  cms: { label: "Website CMS", high: false },
};

const locations: Record<LocationId, string> = {
  office: "NYC office",
  home: "Home network",
  unfamiliar: "Unfamiliar country",
};

type Check = { key: string; label: string; status: Status; note: string; rule: string };

function evaluate(s: SubjectId, r: ResourceId, managed: boolean, passkey: boolean, loc: LocationId) {
  const subject = subjects[s];
  const resource = resources[r];
  const checks: Check[] = [];

  const entitled = subject.grants.includes(r);
  checks.push({
    key: "entitlement",
    label: "Entitlement",
    status: entitled ? "pass" : "fail",
    note: entitled
      ? `${subject.label} role includes ${resource.label}.`
      : `No role grants ${resource.label} to ${subject.group} users.`,
    rule: `role("${subject.group}").grants("${r}")`,
  });

  checks.push({
    key: "device",
    label: "Device posture",
    status: managed ? "pass" : resource.high ? "fail" : "warn",
    note: managed
      ? "Managed, encrypted, patched in the last 14 days."
      : resource.high
        ? "Unmanaged devices never reach high-sensitivity systems."
        : "Unmanaged device: isolated browser session only.",
    rule: `device.managed == true`,
  });

  checks.push({
    key: "auth",
    label: "Authentication",
    status: passkey ? "pass" : "warn",
    note: passkey ? "Phishing-resistant passkey verified." : "Password alone is not enough. Passkey challenge sent.",
    rule: `auth.method == "passkey"`,
  });

  const locStatus: Status =
    loc === "unfamiliar" ? (resource.high ? "fail" : "warn") : "pass";
  checks.push({
    key: "location",
    label: "Context",
    status: locStatus,
    note:
      loc === "unfamiliar"
        ? resource.high
          ? "Unfamiliar location on a sensitive system. Security team notified."
          : "Unusual location. Re-verification required."
        : `${locations[loc]}, consistent with recent sign-ins.`,
    rule: `context.risk != "high"`,
  });

  const decision: Decision = checks.some((c) => c.status === "fail")
    ? "deny"
    : checks.some((c) => c.status === "warn")
      ? "stepup"
      : "allow";

  let session = "";
  if (decision === "allow") {
    session =
      s === "engineer" && r === "proddb"
        ? "Just-in-time grant, 60 minutes, session recorded."
        : resource.high
          ? "Session valid for 4 hours, re-checked continuously."
          : "Session valid for 8 hours.";
  } else if (decision === "stepup") {
    session = "Access pauses until the extra check is satisfied.";
  } else {
    session = "Request blocked and written to the audit log.";
  }

  return { checks, decision, session };
}

const decisionMeta: Record<Decision, { label: string; tone: string; ring: string }> = {
  allow: { label: "Allow", tone: "text-allow", ring: "bg-allow" },
  stepup: { label: "Step-up", tone: "text-warn", ring: "bg-warn" },
  deny: { label: "Deny", tone: "text-deny", ring: "bg-deny" },
};

const statusIcon = {
  pass: <CheckCircle weight="fill" className="text-allow" size={18} />,
  warn: <WarningCircle weight="fill" className="text-warn" size={18} />,
  fail: <XCircle weight="fill" className="text-deny" size={18} />,
};

function Segmented<T extends string>({
  legend,
  value,
  onChange,
  options,
}: {
  legend: string;
  value: T;
  onChange: (v: T) => void;
  options: [T, string][];
}) {
  const name = useId();
  return (
    <fieldset>
      <legend className="text-sm font-medium">{legend}</legend>
      <div className="mt-2.5 flex flex-wrap gap-2">
        {options.map(([id, label]) => (
          <label key={id} className="relative">
            <input
              type="radio"
              name={name}
              value={id}
              checked={value === id}
              onChange={() => onChange(id)}
              className="peer sr-only"
            />
            <span
              className={cn(
                "pressable inline-flex h-9 cursor-pointer items-center rounded-full border px-3.5 text-sm select-none",
                "peer-focus-visible:ring-4 peer-focus-visible:ring-ring",
                value === id
                  ? "border-foreground bg-foreground text-background"
                  : "border-border text-muted-foreground hover:border-foreground/30 hover:text-foreground",
              )}
            >
              {label}
            </span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}

function Toggle({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className="group flex w-full items-center justify-between gap-4 rounded-(--radius-field) py-1.5 text-left text-sm outline-none focus-visible:ring-4 focus-visible:ring-ring"
    >
      <span>{label}</span>
      <span
        className={cn(
          "relative inline-flex h-6 w-10 shrink-0 items-center rounded-full transition-colors duration-200",
          checked ? "bg-primary" : "bg-foreground/15",
        )}
      >
        <span
          className={cn(
            "size-5 rounded-full bg-white shadow-sm transition-transform duration-200 ease-(--ease-out)",
            checked ? "translate-x-[18px]" : "translate-x-0.5",
          )}
        />
      </span>
    </button>
  );
}

export function ZeroTrust() {
  const reduce = useReducedMotion();
  const [subject, setSubject] = useState<SubjectId>("analyst");
  const [resource, setResource] = useState<ResourceId>("payroll");
  const [managed, setManaged] = useState(true);
  const [passkey, setPasskey] = useState(false);
  const [location, setLocation] = useState<LocationId>("home");

  const result = useMemo(
    () => evaluate(subject, resource, managed, passkey, location),
    [subject, resource, managed, passkey, location],
  );
  const meta = decisionMeta[result.decision];

  return (
    <section id="zero-trust" className="border-y border-border bg-surface py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="max-w-[20ch] text-4xl font-medium tracking-[-0.03em] text-balance md:text-5xl">
          Every request has to earn its access.
        </h2>
        <p className="mt-5 max-w-[58ch] text-lg leading-relaxed text-muted-foreground">
          A working model of the policies we design. Change who is asking, what
          they want, and where they are.
        </p>

        <div className="mt-14 grid overflow-hidden rounded-(--radius-panel) border border-border bg-background lg:grid-cols-12">
          {/* Controls */}
          <div className="grid content-start gap-7 border-b border-border p-6 sm:p-8 lg:col-span-5 lg:border-r lg:border-b-0">
            <Segmented
              legend="Who is asking"
              value={subject}
              onChange={setSubject}
              options={Object.entries(subjects).map(([k, v]) => [k as SubjectId, v.label])}
            />
            <Segmented
              legend="What they want"
              value={resource}
              onChange={setResource}
              options={Object.entries(resources).map(([k, v]) => [k as ResourceId, v.label])}
            />
            <Segmented
              legend="Where they are"
              value={location}
              onChange={setLocation}
              options={Object.entries(locations) as [LocationId, string][]}
            />
            <div className="grid gap-1 border-t border-border pt-5">
              <Toggle label="Company-managed device" checked={managed} onChange={setManaged} />
              <Toggle label="Passkey verified" checked={passkey} onChange={setPasskey} />
            </div>
          </div>

          {/* Decision */}
          <div className="p-6 sm:p-8 lg:col-span-7" aria-live="polite">
            <div className="flex items-center justify-between gap-6">
              <p className="text-sm text-muted-foreground">Decision</p>
              <p className="font-mono text-xs text-muted-foreground">
                {subjects[subject].label} &rarr; {resources[resource].label}
              </p>
            </div>

            <div className="relative mt-2 flex h-20 items-center gap-4">
              <span className="relative flex size-3">
                <span className={cn("absolute inset-0 rounded-full opacity-40 motion-safe:animate-ping", meta.ring)} />
                <span className={cn("relative size-3 rounded-full", meta.ring)} />
              </span>
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.p
                  key={result.decision}
                  initial={reduce ? { opacity: 0 } : { opacity: 0, filter: "blur(6px)", transform: "translateY(10px)" }}
                  animate={{ opacity: 1, filter: "blur(0px)", transform: "translateY(0px)" }}
                  exit={reduce ? { opacity: 0 } : { opacity: 0, filter: "blur(6px)", transform: "translateY(-10px)" }}
                  transition={{ duration: 0.22, ease: [0.23, 1, 0.32, 1] }}
                  className={cn("text-6xl font-medium tracking-[-0.04em]", meta.tone)}
                >
                  {meta.label}
                </motion.p>
              </AnimatePresence>
            </div>
            <p className="text-muted-foreground">{result.session}</p>

            <ul className="mt-8 grid gap-px overflow-hidden rounded-(--radius-field) border border-border bg-border sm:grid-cols-2">
              {result.checks.map((c) => (
                <li key={c.key} className="bg-background p-4">
                  <div className="flex items-center gap-2 text-sm font-medium">
                    {statusIcon[c.status]}
                    {c.label}
                  </div>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{c.note}</p>
                </li>
              ))}
            </ul>

            <pre className="mt-6 overflow-x-auto rounded-(--radius-field) bg-surface p-4 font-mono text-[13px] leading-6">
              <code>
                <span className="text-muted-foreground">allow if</span>
                {"\n"}
                {result.checks.map((c) => (
                  <span
                    key={c.key}
                    className={cn(
                      "block pl-4 transition-colors duration-200",
                      c.status === "fail" && "text-deny",
                      c.status === "warn" && "text-warn",
                    )}
                  >
                    {c.rule}
                  </span>
                ))}
              </code>
            </pre>
          </div>
        </div>
      </div>
    </section>
  );
}
