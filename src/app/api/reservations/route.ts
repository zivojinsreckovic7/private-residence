import { isLang, type Lang } from "@/lib/i18n";
import {
  guestMessage,
  teamMessage,
  type ReservationRequest,
} from "@/lib/reservation-mail";
import { site } from "@/lib/site";

/**
 * The reservation form's endpoint.
 *
 * Everything here runs on the server: the Resend key is read from the
 * environment and never reaches the browser, and every field is validated
 * again on this side, because the checks in the form are a courtesy to the
 * guest and nothing more.
 *
 * Two messages go out. The one to the residence is the request itself, and its
 * failure fails the call, so the form can offer the guest a way to send it by
 * hand. The one back to the guest is a courtesy; if it fails the request has
 * still arrived, so it is logged and swallowed rather than shown as an error.
 */
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const RESEND_ENDPOINT = "https://api.resend.com/emails";

/** Field caps. Generous for a person, mean for a script. */
const LIMITS = {
  name: 120,
  email: 200,
  phone: 60,
  country: 80,
  occasion: 120,
  arrangement: 120,
  arrangements: 12,
  message: 4000,
} as const;

const MAX_GUESTS = 16;

/** The shortest a person plausibly takes from first touch to submit. */
const MIN_ELAPSED_MS = 3_000;

const RATE = { windowMs: 60_000, max: 5 };

/**
 * Requests per IP, in memory.
 *
 * A serverless instance is not the whole fleet, so this is a brake rather than
 * a lock: it stops one script hammering one instance, which is the shape abuse
 * of a form like this actually takes. Reach for something shared only if that
 * stops being true.
 */
const recent = new Map<string, number[]>();

export async function POST(request: Request) {
  const key = process.env.RESEND_API_KEY;
  if (!key) {
    console.error("[reservations] RESEND_API_KEY is not set");
    return json({ ok: false, error: "unavailable" }, 503);
  }

  const ip = clientIp(request);
  if (rateLimited(ip)) return json({ ok: false, error: "rate_limited" }, 429);

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return json({ ok: false, error: "invalid" }, 400);
  }

  const parsed = parse(body);
  if ("error" in parsed) {
    // A script is told the same thing a person is, and neither gets detail.
    if (parsed.error === "bot") return json({ ok: true }, 200);
    return json({ ok: false, error: parsed.error }, 400);
  }

  const reservation = parsed.request;
  const team = teamMessage(reservation);

  const sent = await send(key, {
    from: site.contact.sender,
    to: [site.contact.reservations],
    reply_to: [reservation.email],
    subject: team.subject,
    html: team.html,
    text: team.text,
  });

  if (!sent) return json({ ok: false, error: "send_failed" }, 502);

  const guest = guestMessage(reservation);
  await send(key, {
    from: site.contact.sender,
    to: [reservation.email],
    reply_to: [site.contact.reservations],
    subject: guest.subject,
    html: guest.html,
    text: guest.text,
  });

  return json({ ok: true }, 200);
}

/* -------------------------------------------------------------------------- */

type Payload = Record<string, unknown>;

function parse(
  body: unknown,
): { request: ReservationRequest } | { error: string } {
  if (typeof body !== "object" || body === null) return { error: "invalid" };
  const data = body as Payload;

  // The honeypot is a field no person can see, and the clock is the time from
  // the guest's first touch to submit. Either one tripping means a script.
  if (text(data.company, 1)) return { error: "bot" };
  const startedAt = Number(data.startedAt);
  if (Number.isFinite(startedAt) && Date.now() - startedAt < MIN_ELAPSED_MS) {
    return { error: "bot" };
  }

  const lang: Lang =
    typeof data.lang === "string" && isLang(data.lang) ? data.lang : "en";

  const arrival = date(data.arrival);
  const departure = date(data.departure);
  if (!arrival || !departure) return { error: "dates" };

  const nights = nightsBetween(arrival, departure);
  if (!nights) return { error: "dates" };

  const name = text(data.name, LIMITS.name);
  const email = text(data.email, LIMITS.email);
  if (!name || !isEmail(email)) return { error: "details" };

  const guests = Math.min(
    MAX_GUESTS,
    Math.max(1, Math.round(Number(data.guests) || 1)),
  );

  const arrangements = Array.isArray(data.arrangements)
    ? data.arrangements
        .slice(0, LIMITS.arrangements)
        .map((item) => text(item, LIMITS.arrangement))
        .filter(Boolean)
    : [];

  return {
    request: {
      lang,
      arrival,
      departure,
      nights,
      guests,
      occasion: text(data.occasion, LIMITS.occasion),
      arrangements,
      name,
      email,
      phone: text(data.phone, LIMITS.phone),
      country: text(data.country, LIMITS.country),
      message: text(data.message, LIMITS.message),
    },
  };
}

/**
 * One field, trimmed and capped. Control characters go too: they are no use to
 * a guest, and they are how a header injection starts.
 */
function text(value: unknown, max: number): string {
  if (typeof value !== "string") return "";
  return value
    .replace(/[\u0000-\u001f\u007f]/g, "")
    .trim()
    .slice(0, max);
}

/** A `YYYY-MM-DD` that is a real day and is not in the past. */
function date(value: unknown): string {
  const raw = text(value, 10);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(raw)) return "";
  const ms = Date.parse(`${raw}T00:00:00Z`);
  if (Number.isNaN(ms)) return "";
  // A day of slack: the guest's calendar and this server can sit either side
  // of midnight UTC, and refusing today's date over a timezone is absurd.
  if (ms < Date.now() - 86_400_000) return "";
  return raw;
}

function nightsBetween(from: string, to: string): number {
  const nights = Math.round(
    (Date.parse(`${to}T00:00:00Z`) - Date.parse(`${from}T00:00:00Z`)) /
      86_400_000,
  );
  return nights > 0 && nights <= 365 ? nights : 0;
}

function isEmail(value: string): boolean {
  return /^[^\s@,;:<>"]+@[^\s@,;:<>"]+\.[a-z]{2,}$/i.test(value);
}

async function send(key: string, payload: object): Promise<boolean> {
  try {
    const response = await fetch(RESEND_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    if (response.ok) return true;
    console.error(
      `[reservations] Resend returned ${response.status}: ${await response.text()}`,
    );
    return false;
  } catch (error) {
    console.error("[reservations] Resend request failed", error);
    return false;
  }
}

function clientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  return forwarded?.split(",")[0]?.trim() || "unknown";
}

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const hits = (recent.get(ip) ?? []).filter((at) => now - at < RATE.windowMs);
  hits.push(now);
  recent.set(ip, hits);

  // Keep the map from growing without bound on a long-lived instance.
  if (recent.size > 5_000) {
    for (const [key, times] of recent) {
      if (times.every((at) => now - at >= RATE.windowMs)) recent.delete(key);
    }
  }

  return hits.length > RATE.max;
}

function json(body: object, status: number): Response {
  return Response.json(body, { status });
}
