interface SMSBooking {
  id: string;
  scheduled_date: string;
  scheduled_time: string;
}

interface SMSCustomer {
  name: string;
}

/**
 * Send an SMS to the admin via Twilio.
 * Replaces the old AT&T email-to-SMS gateway (silently dropped by carrier
 * spam filters) and the Textbelt experiment (API key never delivered).
 *
 * Required env vars:
 *   TWILIO_ACCOUNT_SID  — starts with "AC..."
 *   TWILIO_AUTH_TOKEN   — from Twilio console
 *   TWILIO_FROM_NUMBER  — E.164 format, e.g. "+14055925338"
 *   ADMIN_PHONE         — E.164 format, e.g. "+14052509185"
 *
 * Note: Twilio trial accounts can only send to Verified Caller IDs.
 * Upgrade the account (or verify the destination number) before going live.
 */
export async function sendAdminBookingSMS(customer: SMSCustomer, booking: SMSBooking) {
  const sid = process.env.TWILIO_ACCOUNT_SID;
  const token = process.env.TWILIO_AUTH_TOKEN;
  const from = process.env.TWILIO_FROM_NUMBER;
  const to = process.env.ADMIN_PHONE;

  if (!sid || !token || !from || !to) {
    console.warn(
      "sendAdminBookingSMS skipped: missing TWILIO_ACCOUNT_SID / TWILIO_AUTH_TOKEN / TWILIO_FROM_NUMBER / ADMIN_PHONE"
    );
    return;
  }

  const link = `https://industrialcleaning.services/admin/bookings/${booking.id}`;
  const body = `Industrial Cleaning Services: New booking from ${customer.name} on ${booking.scheduled_date} at ${booking.scheduled_time}.\n${link}`;

  const auth = Buffer.from(`${sid}:${token}`).toString("base64");
  const params = new URLSearchParams({ From: from, To: to, Body: body });

  const res = await fetch(
    `https://api.twilio.com/2010-04-01/Accounts/${sid}/Messages.json`,
    {
      method: "POST",
      headers: {
        Authorization: `Basic ${auth}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params.toString(),
    }
  );

  const result = (await res.json()) as {
    sid?: string;
    status?: string;
    error_code?: number | null;
    error_message?: string | null;
    message?: string;
    code?: number;
  };

  if (!res.ok || result.error_code) {
    throw new Error(
      `Twilio send failed (${res.status}): ${result.error_message ?? result.message ?? "unknown error"}`
    );
  }

  console.log(`SMS sent via Twilio. sid=${result.sid} status=${result.status}`);
}
