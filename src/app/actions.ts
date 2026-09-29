"use server";

export type BriefingState = {
  status: "idle" | "success" | "error";
  message?: string;
  errors?: Partial<Record<"name" | "email" | "company" | "message", string>>;
  values?: Record<string, string>;
};

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export async function requestBriefing(
  _prev: BriefingState,
  formData: FormData,
): Promise<BriefingState> {
  // Honeypot: real people never fill this field.
  if (String(formData.get("website") ?? "").trim()) {
    return { status: "success", message: "Thanks. We will be in touch." };
  }

  const values = {
    name: String(formData.get("name") ?? "").trim(),
    email: String(formData.get("email") ?? "").trim(),
    company: String(formData.get("company") ?? "").trim(),
    interest: String(formData.get("interest") ?? "").trim(),
    message: String(formData.get("message") ?? "").trim(),
  };

  const errors: BriefingState["errors"] = {};
  if (values.name.length < 2) errors.name = "Enter your name.";
  if (!EMAIL.test(values.email)) errors.email = "Enter a valid work email.";
  if (values.company.length < 2) errors.company = "Enter your company name.";
  if (values.message.length > 2000) errors.message = "Keep it under 2,000 characters.";

  if (Object.keys(errors).length) {
    return { status: "error", message: "Check the highlighted fields.", errors, values };
  }

  // TODO(launch): deliver the lead (email provider or CRM). Until then it is
  // logged server-side only.
  console.info("[briefing-request]", values);

  return {
    status: "success",
    message: `Thanks, ${values.name.split(" ")[0]}. A senior engineer will reply within one business day.`,
  };
}
