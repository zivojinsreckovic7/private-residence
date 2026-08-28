import type { ReservationRequest } from "@/lib/reservation-mail";

/**
 * The hand-off to the CRM at `crm.misprivateresidence.com`.
 *
 * The CRM is a separate application with its own database, and this is the
 * only line between the two: one POST, signed with a shared secret, sent
 * alongside the mail the form already sends.
 *
 * **This never throws and never fails the guest's request.** The reservation
 * reaching the residence is the promise the form makes; the reservation
 * reaching the CRM is bookkeeping. If the CRM is down or slow, the request has
 * still arrived — it is in the inbox, and it can be typed into the CRM by hand
 * from the calendar. Failing a guest over a database they have never heard of
 * would be the wrong way round.
 *
 * Callers should start this in parallel with the mail rather than awaiting it
 * first, so the hand-off costs the guest nothing in latency.
 */

const TIMEOUT_MS = 6_000;

/** One retry, for a connection that dropped rather than a request that was refused. */
const ATTEMPTS = 2;

export async function recordReservation(
  reservation: ReservationRequest,
): Promise<void> {
  const endpoint = process.env.CRM_INGEST_URL;
  const secret = process.env.CRM_INGEST_SECRET;

  if (!endpoint || !secret) {
    // Not an error. The site runs perfectly well without a CRM attached, and
    // it did so before this existed.
    return;
  }

  // Generated once and reused across the retry, so a timeout that actually
  // arrived cannot become two reservations. The CRM keys on it.
  const requestId = crypto.randomUUID();

  const body = JSON.stringify({
    requestId,
    arrival: reservation.arrival,
    departure: reservation.departure,
    guests: reservation.guests,
    name: reservation.name,
    email: reservation.email,
    phone: reservation.phone,
    country: reservation.country,
    lang: reservation.lang,
    occasion: reservation.occasion,
    arrangements: reservation.arrangements,
    message: reservation.message,
  });

  for (let attempt = 1; attempt <= ATTEMPTS; attempt++) {
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${secret}`,
          "Content-Type": "application/json",
        },
        body,
        signal: AbortSignal.timeout(TIMEOUT_MS),
      });

      if (response.ok) return;

      // A 4xx is a disagreement about the payload, and sending the same bytes
      // again will produce the same answer. Only a server-side failure is
      // worth a second attempt.
      const retryable = response.status >= 500;
      console.error(
        `[crm] hand-off ${requestId} returned ${response.status}: ${await response.text()}`,
      );
      if (!retryable) return;
    } catch (error) {
      console.error(`[crm] hand-off ${requestId} attempt ${attempt} failed`, error);
    }
  }

  // Both attempts are spent. The request is in the residence's inbox, which is
  // what the guest was promised, so this is logged loudly and nothing else.
  console.error(`[crm] hand-off ${requestId} abandoned for ${reservation.email}`);
}
