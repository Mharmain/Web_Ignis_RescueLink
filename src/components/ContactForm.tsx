"use client";
import { FormEvent, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { site } from "@/config/site";
import { REASONS, validateContact, FieldErrors, ContactInput, cleanLine, cleanMessage } from "@/lib/validation";

const inputCls = "w-full rounded-xl border border-line bg-white px-4 py-3 text-navy placeholder:text-muted/70 focus:border-blue";

export default function ContactForm() {
  const params = useSearchParams();
  const [reason, setReason] = useState<string>("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorText, setErrorText] = useState("");

  // /contact?reason=demo preselects "Request a demo"
  useEffect(() => {
    const r = params.get("reason");
    if (r && r in REASONS) setReason(r);
  }, [params]);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const input: ContactInput = {
      name: cleanLine(fd.get("name")), email: cleanLine(fd.get("email")),
      organization: cleanLine(fd.get("organization")), reason: String(fd.get("reason") || ""), message: cleanMessage(fd.get("message")),
    };
    const errs = validateContact(input);
    setErrors(errs);
    if (Object.keys(errs).length) {
      const first = Object.keys(errs)[0];
      (form.elements.namedItem(first) as HTMLElement | null)?.focus();
      return;
    }
    setStatus("sending");
    setErrorText("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...input, website: String(fd.get("website") || "") }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.ok) {
        setStatus("success");
        form.reset(); setMessage(""); setReason("");
      } else {
        if (data.fields) setErrors(data.fields);
        setErrorText(data.error || "");
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  const err = (k: keyof ContactInput) => errors[k] && <p id={`${k}-err`} role="alert" className="mt-1.5 text-sm font-bold text-brand-dark">{errors[k]}</p>;
  const aria = (k: keyof ContactInput) => ({ "aria-invalid": errors[k] ? true : undefined, "aria-describedby": errors[k] ? `${k}-err` : undefined });

  if (status === "success") {
    return (
      <div role="status" className="glass rounded-3xl p-8 text-center">
        <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-green/15 text-2xl text-green" aria-hidden="true">✓</span>
        <p className="mt-4 text-xl font-extrabold">Thank you! Your message has been sent. We will get back to you soon.</p>
        <button type="button" className="btn btn-secondary mt-6" onClick={() => setStatus("idle")}>Send another message</button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="glass space-y-5 rounded-3xl p-6 sm:p-8" aria-label="Contact form">
      {/* Honeypot: real people never see or fill this */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>Website<input type="text" name="website" tabIndex={-1} autoComplete="off" /></label>
      </div>

      <div>
        <label htmlFor="name" className="mb-1.5 block font-bold">Name *</label>
        <input id="name" name="name" type="text" autoComplete="name" maxLength={80} required className={inputCls} {...aria("name")} />
        {err("name")}
      </div>
      <div>
        <label htmlFor="email" className="mb-1.5 block font-bold">Email *</label>
        <input id="email" name="email" type="email" autoComplete="email" required className={inputCls} {...aria("email")} />
        {err("email")}
      </div>
      <div>
        <label htmlFor="organization" className="mb-1.5 block font-bold">Organization <span className="font-medium text-muted">(optional)</span></label>
        <input id="organization" name="organization" type="text" autoComplete="organization" maxLength={120} className={inputCls} {...aria("organization")} />
        {err("organization")}
      </div>
      <div>
        <label htmlFor="reason" className="mb-1.5 block font-bold">Reason *</label>
        <select id="reason" name="reason" value={reason} onChange={(e) => setReason(e.target.value)} required className={inputCls} {...aria("reason")}>
          <option value="" disabled>Choose a reason</option>
          {Object.entries(REASONS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
        </select>
        {err("reason")}
      </div>
      <div>
        <label htmlFor="message" className="mb-1.5 block font-bold">Message *</label>
        <textarea id="message" name="message" rows={6} maxLength={2000} required value={message} onChange={(e) => setMessage(e.target.value)} className={inputCls} {...aria("message")} />
        <div className="mt-1 flex items-start justify-between gap-3">
          <div>{err("message")}</div>
          <p className="ml-auto text-sm text-muted" aria-live="polite">{message.length} / 2000</p>
        </div>
      </div>

      {status === "error" && (
        <p role="alert" className="rounded-xl bg-brand/10 p-4 text-[15px] font-bold text-brand-dark">
          {errorText || "Sorry, your message could not be sent."} You can also email us directly at{" "}
          <a href={`mailto:${site.contactEmail}`} className="underline">{site.contactEmail}</a>.
        </p>
      )}
      <button type="submit" disabled={status === "sending"} className="btn btn-primary w-full sm:w-auto">
        {status === "sending" ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}
