// Contact form backend. Validates again on the server, then sends one email with Resend.
import { NextResponse } from "next/server";
import { Resend } from "resend";
import { REASONS, ReasonKey, cleanLine, cleanMessage, validateContact } from "@/lib/validation";

export const runtime = "nodejs";

// Best-effort rate limit (in memory). On serverless hosting each instance has its own memory,
// so this is not perfect, but it stops simple spamming.
const hits = new Map<string, number[]>();
const LIMIT = 5;
const WINDOW_MS = 10 * 60 * 1000;

function tooMany(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) for (const [k, v] of hits) if (v.every((t) => now - t >= WINDOW_MS)) hits.delete(k);
  return recent.length > LIMIT;
}

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
const json = (body: object, status = 200) => NextResponse.json(body, { status });

export async function POST(req: Request) {
  const ip = (req.headers.get("x-forwarded-for") || "unknown").split(",")[0].trim();
  if (tooMany(ip)) return json({ ok: false, error: "Too many messages in a short time. Please wait a few minutes and try again." }, 429);

  const len = Number(req.headers.get("content-length") || 0);
  if (len > 20000) return json({ ok: false, error: "Your message is too large." }, 413);

  let raw: Record<string, unknown>;
  try { raw = await req.json(); } catch { return json({ ok: false, error: "Invalid request." }, 400); }

  // Honeypot: bots fill the hidden field. Pretend success, send nothing.
  if (typeof raw.website === "string" && raw.website.trim() !== "") return json({ ok: true });

  const input = {
    name: cleanLine(raw.name), email: cleanLine(raw.email), organization: cleanLine(raw.organization),
    reason: cleanLine(raw.reason), message: cleanMessage(raw.message),
  };
  const fields = validateContact(input);
  if (Object.keys(fields).length) return json({ ok: false, error: "Please check the highlighted fields.", fields }, 400);

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  if (!apiKey || !to) {
    console.error("[contact] Missing RESEND_API_KEY or CONTACT_TO_EMAIL environment variable. Set them in .env.local (or hosting settings).");
    return json({ ok: false, error: "The contact form is not configured yet." }, 500);
  }

  const reasonLabel = REASONS[input.reason as ReasonKey];
  const when = new Date().toLocaleString("en-GB", { timeZone: "Asia/Karachi", dateStyle: "medium", timeStyle: "short" }) + " (Asia/Karachi)";
  const subject = `[Ignis RescueLink] ${reasonLabel} from ${input.name}`;
  const org = input.organization || "-";

  const text = `New message from the website\n\nName: ${input.name}\nEmail: ${input.email}\nOrganization: ${org}\nReason: ${reasonLabel}\nTime: ${when}\n\nMessage:\n${input.message}\n`;
  const row = (k: string, v: string) => `<tr><td style="padding:6px 12px 6px 0;color:#4A5F7A;vertical-align:top"><b>${k}</b></td><td style="padding:6px 0;color:#00254D">${v}</td></tr>`;
  const html = `<div style="font-family:Arial,sans-serif;max-width:560px;margin:auto;padding:24px;border:1px solid #DCE7F5;border-radius:16px">
<h2 style="margin:0 0 16px;color:#E5484D">New message from the website</h2>
<table style="border-collapse:collapse;font-size:15px">${row("Name", esc(input.name))}${row("Email", esc(input.email))}${row("Organization", esc(org))}${row("Reason", esc(reasonLabel))}${row("Time", esc(when))}</table>
<hr style="border:none;border-top:1px solid #DCE7F5;margin:18px 0"><p style="white-space:pre-wrap;color:#00254D;font-size:15px;line-height:1.6;margin:0">${esc(input.message)}</p></div>`;

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: "Ignis RescueLink <onboarding@resend.dev>", to: [to], replyTo: input.email, subject, text, html,
    });
    if (error) {
      console.error("[contact] Resend error:", error.name, "-", error.message); // never log the key
      return json({ ok: false, error: "Sorry, we could not send your message right now." }, 502);
    }
    return json({ ok: true });
  } catch (e) {
    console.error("[contact] Unexpected error:", e instanceof Error ? e.message : "unknown");
    return json({ ok: false, error: "Sorry, we could not send your message right now." }, 500);
  }
}
