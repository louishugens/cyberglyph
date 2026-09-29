"use client";

import { useEffect, useId, useMemo, useState } from "react";
import { AnimatePresence, LayoutGroup, motion, useReducedMotion } from "motion/react";
import { CheckCircle, WarningCircle, XCircle } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import { SplitReveal } from "@/components/motion/split-reveal";
import { Reveal } from "@/components/motion/reveal";
import { Highlight } from "@/components/motion/highlight";

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
  const reduce = useReducedMotion();
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
                "pressable relative inline-flex h-9 cursor-pointer items-center rounded-full border px-3.5 text-sm select-none",
                "peer-focus-visible:ring-4 peer-focus-visible:ring-ring",
                value === id
                  ? "border-transparent text-background"
                  : "border-border text-muted-foreground hover:border-foreground/30 hover:text-foreground",
              )}
            >
              {value === id ? (
                <motion.span
                  layoutId={`seg-${name}`}
                  aria-hidden="true"
                  transition={reduce ? { duration: 0 } : { type: "spring", duration: 0.4, bounce: 0.15 }}
                  className="absolute inset-0 rounded-full bg-foreground"
                />
              ) : null}
              <span className="relative transition-colors duration-200">{label}</span>
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

/**
 * Mono trace line that types itself out on each evaluation, ending on a live
 * caret. Remounted per evaluation (keyed by its text) so it restarts cleanly.
 */
function TypeLine({ text }: { text: string }) {
  const reduce = useReducedMotion();
  const [n, setN] = useState(reduce ? text.length : 0);
  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => {
      setN((v) => {
        if (v >= text.length) clearInterval(id);
        return Math.min(v + 2, text.length);
      });
    }, 16);
    return () => clearInterval(id);
  }, [text, reduce]);
  return (
    <p className="mt-3 truncate font-mono text-xs text-muted-foreground" aria-hidden="true">
      <span className="text-signal">$</span> {reduce ? text : text.slice(0, n)}
      <span className="caret text-signal/70" />
    </p>
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
  const signature = `${subject}-${resource}-${managed}-${passkey}-${location}`;

  return (
    <section id="zero-trust" className="border-y border-border bg-surface py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="max-w-[20ch] text-4xl leading-[1.08] font-normal tracking-[-0.035em] text-balance md:text-5xl">
          <SplitReveal text="Every request has to" />{" "}
          <Highlight delay={0.4}>earn its access.</Highlight>
        </h2>
        <p className="mt-5 max-w-[58ch] text-lg leading-relaxed text-muted-foreground">
          A working model of the policies we design. Change who is asking, what
          they want, and where they are.
        </p>

        <Reveal className="mt-14">
        <LayoutGroup>
        <div className="grid overflow-hidden rounded-(--radius-panel) border border-border bg-background lg:grid-cols-12">
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
            <TypeLine
              key={signature}
              text={`policy.evaluate(role="${subjects[subject].group}", resource="${resource}", device=${managed ? "managed" : "unmanaged"}, auth=${passkey ? "passkey" : "password"}, context="${location}")`}
            />

            <div className="relative mt-8 overflow-hidden rounded-(--radius-field)">
              <ul className="grid gap-px overflow-hidden rounded-(--radius-field) border border-border bg-border sm:grid-cols-2">
                {result.checks.map((c) => (
                  <li
                    key={c.key}
                    className={cn(
                      "p-4 transition-colors duration-300",
                      c.status === "pass" && "bg-background",
                      c.status === "warn" && "bg-[color-mix(in_oklch,var(--warn)_7%,var(--background))]",
                      c.status === "fail" && "bg-[color-mix(in_oklch,var(--deny)_8%,var(--background))]",
                    )}
                  >
                    <div className="flex items-center gap-2 text-sm font-medium">
                      <span className="relative inline-flex size-[18px]">
                        <AnimatePresence mode="popLayout" initial={false}>
                          <motion.span
                            key={c.status}
                            initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.5, filter: "blur(4px)" }}
                            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                            exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.5, filter: "blur(4px)" }}
                            transition={{ type: "spring", duration: 0.35, bounce: 0.3 }}
                            className="absolute inset-0"
                          >
                            {statusIcon[c.status]}
                          </motion.span>
                        </AnimatePresence>
                      </span>
                      {c.label}
                    </div>
                    <AnimatePresence mode="popLayout" initial={false}>
                      <motion.p
                        key={c.note}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.18 }}
                        className="mt-1.5 text-sm leading-relaxed text-muted-foreground"
                      >
                        {c.note}
                      </motion.p>
                    </AnimatePresence>
                  </li>
                ))}
              </ul>
              {/* Evaluation sweep: a band of light passes over the checks on every re-run. */}
              {reduce ? null : (
                <motion.div
                  key={signature}
                  aria-hidden="true"
                  initial={{ transform: "translateX(-100%)", opacity: 1 }}
                  animate={{ transform: "translateX(100%)", opacity: 0.6 }}
                  transition={{ duration: 0.7, ease: [0.77, 0, 0.175, 1] }}
                  className="pointer-events-none absolute inset-0 rounded-(--radius-field) bg-[linear-gradient(90deg,transparent,color-mix(in_oklch,var(--signal)_18%,transparent),transparent)]"
                />
              )}
            </div>

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
        </LayoutGroup>
        </Reveal>
      </div>
    </section>
  );
}
