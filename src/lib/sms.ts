import { getResend } from "./email";

interface SMSBooking {
  id: string;
  scheduled_date: string;
  scheduled_time: string;
}

interface SMSCustomer {
  name: string;
}

/**
 * Send an SMS to the admin via AT&T email-to-SMS gateway.
 * Delivers a short text with the customer name, date/time, and a direct CRM link.
 */
export async function sendAdminBookingSMS(customer: SMSCustomer, booking: SMSBooking) {
  const gateway = process.env.ADMIN_PHONE_SMS;
  if (!gateway) return;

  const link = `https://industrialcleaning.services/admin/bookings/${booking.id}`;
  const message = `New booking! ${customer.name} on ${booking.scheduled_date} at ${booking.scheduled_time}.\n${link}`;

  await getResend().emails.send({
    from: process.env.EMAIL_FROM!,
    to: gateway,
    subject: "New Booking",
    text: message,
  });
}
