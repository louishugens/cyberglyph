"use client";

import { useActionState, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowRight, CheckCircle, CircleNotch } from "@phosphor-icons/react";
import { requestBriefing, type BriefingState } from "@/app/actions";
import { Input } from "@/components/ui/input";
import { LiquidGlass } from "@/components/motion/liquid-glass";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CTA_LABEL } from "@/lib/site";
import { cn } from "@/lib/utils";

const interests = ["Assessment", "Identity & access", "Devices & data", "Compliance", "Web & AI", "Not sure yet"];
const initial: BriefingState = { status: "idle" };

const fieldClass =
  "h-12 rounded-(--radius-field) border-input bg-black/25 px-4 text-base shadow-none placeholder:text-muted-foreground/80 focus-visible:border-primary focus-visible:ring-4 focus-visible:ring-ring/40 aria-invalid:border-deny md:text-[15px]";

function Field({
  id,
  label,
  error,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid gap-2">
      <Label htmlFor={id} className="text-sm font-medium">
        {label}
      </Label>
      {children}
      {error ? (
        <p id={`${id}-error`} className="text-sm text-deny">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export function ContactForm() {
  const reduce = useReducedMotion();
  const [state, action, pending] = useActionState(requestBriefing, initial);
  const [interest, setInterest] = useState(interests[0]);
  const v = state.values ?? {};
  const e = state.errors ?? {};

  return (
    <LiquidGlass radius={24} blur={18} contentClassName="p-6 sm:p-8">
            <AnimatePresence mode="wait" initial={false}>
              {state.status === "success" ? (
                <motion.div
                  key="done"
                  initial={reduce ? { opacity: 0 } : { opacity: 0, filter: "blur(6px)", transform: "scale(0.98)" }}
                  animate={{ opacity: 1, filter: "blur(0px)", transform: "scale(1)" }}
                  transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
                  className="flex min-h-[420px] flex-col items-start justify-center"
                  role="status"
                >
                  <CheckCircle size={40} weight="fill" className="text-allow" />
                  <p className="mt-5 text-2xl font-medium tracking-[-0.02em]">Request received.</p>
                  <p className="mt-2 max-w-[44ch] leading-relaxed text-muted-foreground">{state.message}</p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  action={action}
                  exit={reduce ? { opacity: 0 } : { opacity: 0, filter: "blur(6px)" }}
                  transition={{ duration: 0.18 }}
                  noValidate
                  className="grid gap-5"
                >
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field id="name" label="Full name" error={e.name}>
                      <Input
                        id="name"
                        name="name"
                        autoComplete="name"
                        defaultValue={v.name}
                        aria-invalid={!!e.name}
                        aria-describedby={e.name ? "name-error" : undefined}
                        className={fieldClass}
                        required
                      />
                    </Field>
                    <Field id="email" label="Work email" error={e.email}>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        defaultValue={v.email}
                        aria-invalid={!!e.email}
                        aria-describedby={e.email ? "email-error" : undefined}
                        className={fieldClass}
                        required
                      />
                    </Field>
                  </div>
                  <Field id="company" label="Company" error={e.company}>
                    <Input
                      id="company"
                      name="company"
                      autoComplete="organization"
                      defaultValue={v.company}
                      aria-invalid={!!e.company}
                      aria-describedby={e.company ? "company-error" : undefined}
                      className={fieldClass}
                      required
                    />
                  </Field>

                  <fieldset>
                    <legend className="text-sm font-medium">What do you need help with?</legend>
                    <input type="hidden" name="interest" value={interest} />
                    <div className="mt-2.5 flex flex-wrap gap-2" role="radiogroup" aria-label="Area of interest">
                      {interests.map((i) => (
                        <button
                          key={i}
                          type="button"
                          role="radio"
                          aria-checked={interest === i}
                          onClick={() => setInterest(i)}
                          className={cn(
                            "pressable h-9 rounded-full border px-3.5 text-sm outline-none focus-visible:ring-4 focus-visible:ring-ring",
                            interest === i
                              ? "border-foreground bg-foreground text-background"
                              : "border-border text-muted-foreground hover:text-foreground",
                          )}
                        >
                          {i}
                        </button>
                      ))}
                    </div>
                  </fieldset>

                  <Field id="message" label="Anything we should know? (optional)" error={e.message}>
                    <Textarea
                      id="message"
                      name="message"
                      rows={4}
                      defaultValue={v.message}
                      aria-invalid={!!e.message}
                      className={cn(fieldClass, "h-auto min-h-28 py-3")}
                    />
                  </Field>

                  {/* Honeypot */}
                  <div aria-hidden="true" className="absolute -left-[9999px] h-0 overflow-hidden">
                    <label htmlFor="website">Website</label>
                    <input id="website" name="website" tabIndex={-1} autoComplete="off" />
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-4 pt-1">
                    <p className="text-sm text-muted-foreground" role={state.status === "error" ? "alert" : undefined}>
                      {state.status === "error" ? (
                        <span className="text-deny">{state.message}</span>
                      ) : (
                        "We reply by email."
                      )}
                    </p>
                    <button type="submit" disabled={pending} className="btn-primary group min-w-44 disabled:opacity-70">
                      {pending ? (
                        <CircleNotch size={16} weight="bold" className="animate-spin" />
                      ) : (
                        <>
                          {CTA_LABEL}
                          <ArrowRight
                            size={16}
                            weight="bold"
                            className="transition-transform duration-200 ease-out group-hover:translate-x-0.5"
                          />
                        </>
                      )}
                    </button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
    </LiquidGlass>
  );
}
