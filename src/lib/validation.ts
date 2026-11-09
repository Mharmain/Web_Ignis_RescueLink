// Shared rules: used by the form (browser) AND the API (server).
export const REASONS = {
  demo: "Request a demo",
  collaboration: "Collaboration or partnership",
  feedback: "Feedback or question",
  other: "Other",
} as const;
export type ReasonKey = keyof typeof REASONS;

export type ContactInput = { name: string; email: string; organization: string; reason: string; message: string };
export type FieldErrors = Partial<Record<keyof ContactInput, string>>;

const EMAIL_RE = /^[^\s@<>()[\]\\,;:"]+@[^\s@<>()[\]\\,;:"]+\.[A-Za-z]{2,}$/;

/** Remove control characters (incl. CR/LF) and extra spaces: for single-line values. */
export function cleanLine(v: unknown): string {
  return String(v ?? "").replace(/[\u0000-\u001F\u007F\u2028\u2029]/g, " ").replace(/\s+/g, " ").trim();
}
/** Keep new lines in the message, drop other control characters. */
export function cleanMessage(v: unknown): string {
  return String(v ?? "")
    .replace(/\r\n?/g, "\n")
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "")
    .trim();
}

export function validateContact(input: ContactInput): FieldErrors {
  const e: FieldErrors = {};
  if (input.name.length < 2 || input.name.length > 80) e.name = "Please enter your name (2 to 80 characters).";
  if (!EMAIL_RE.test(input.email) || input.email.length > 254) e.email = "Please enter a valid email address.";
  if (input.organization.length > 120) e.organization = "Organization can be at most 120 characters.";
  if (!(input.reason in REASONS)) e.reason = "Please choose a reason.";
  if (input.message.length < 10 || input.message.length > 2000) e.message = "Message must be 10 to 2000 characters.";
  return e;
}
