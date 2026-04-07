import { Resend } from "resend";

let _resend: Resend | null = null;
export function getResend() {
  if (!_resend) {
    _resend = new Resend(process.env.RESEND_API_KEY);
  }
  return _resend;
}

interface EmailBooking {
  id: string;
  bedrooms: number;
  bathrooms: number;
  frequency: string;
  scheduled_date: string;
  scheduled_time: string;
  price: number;
  notes: string;
}

interface EmailCustomer {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  zip: string;
}

const frequencyLabels: Record<string, string> = {
  once: "One-time",
  weekly: "Weekly",
  biweekly: "Every 2 weeks",
  monthly: "Monthly",
};

export async function sendBookingConfirmation(customer: EmailCustomer, booking: EmailBooking) {
  await getResend().emails.send({
    from: process.env.EMAIL_FROM!,
    to: customer.email,
    subject: "Booking Confirmed - Industrial Cleaning Services",
    html: `
      <div style="font-family: 'Inter', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff;">
        <div style="background: #5B8A7A; padding: 28px 24px; text-align: center;">
          <h1 style="color: white; font-size: 22px; margin: 0; font-weight: 700;">Industrial Cleaning Services</h1>
        </div>
        <div style="padding: 32px 24px;">
          <h2 style="color: #2D2D2D; font-size: 20px; margin: 0 0 8px;">You're booked, ${customer.name}!</h2>
          <p style="color: #8A8580; margin: 0 0 24px;">Here are your booking details:</p>
          <div style="background: #F8F5F1; border-radius: 12px; padding: 20px; margin: 0 0 24px;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 6px 0; color: #8A8580; font-size: 14px;">Date</td>
                <td style="padding: 6px 0; color: #2D2D2D; font-size: 14px; text-align: right; font-weight: 600;">${booking.scheduled_date}</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; color: #8A8580; font-size: 14px;">Time</td>
                <td style="padding: 6px 0; color: #2D2D2D; font-size: 14px; text-align: right; font-weight: 600;">${booking.scheduled_time}</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; color: #8A8580; font-size: 14px;">Home</td>
                <td style="padding: 6px 0; color: #2D2D2D; font-size: 14px; text-align: right; font-weight: 600;">${booking.bedrooms} bed / ${booking.bathrooms} bath</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; color: #8A8580; font-size: 14px;">Frequency</td>
                <td style="padding: 6px 0; color: #2D2D2D; font-size: 14px; text-align: right; font-weight: 600;">${frequencyLabels[booking.frequency] || booking.frequency}</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; color: #8A8580; font-size: 14px;">Address</td>
                <td style="padding: 6px 0; color: #2D2D2D; font-size: 14px; text-align: right; font-weight: 600;">${customer.address}, ${customer.city} ${customer.zip}</td>
              </tr>
            </table>
          </div>
          ${booking.notes ? `<p style="color: #8A8580; font-size: 13px; margin: 0 0 24px; white-space: pre-line;"><strong>Property Details:</strong><br/>${booking.notes}</p>` : ""}
          <div style="text-align: center; margin: 0 0 24px;">
            <a href="mailto:Industrialcleaningservices00@gmail.com?subject=Reschedule%20Request%20-%20Booking%20${booking.id}&body=Hi%2C%20I%20would%20like%20to%20reschedule%20my%20cleaning%20on%20${encodeURIComponent(booking.scheduled_date)}%20at%20${encodeURIComponent(booking.scheduled_time)}.%0A%0ANew%20preferred%20date%2Ftime%3A%20" style="display: inline-block; background: #D4A843; color: white; padding: 12px 28px; border-radius: 8px; text-decoration: none; font-size: 14px; font-weight: 600;">Need to Reschedule?</a>
          </div>
          <p style="color: #8A8580; font-size: 14px; margin: 0;">Questions? Call us at <strong style="color: #2D2D2D;">(405) 250-9185</strong></p>
        </div>
        <div style="background: #2D2D2D; padding: 20px 24px; text-align: center;">
          <p style="color: #8A8580; font-size: 12px; margin: 0;">&copy; ${new Date().getFullYear()} Industrial Cleaning Services &middot; Oklahoma City Metro</p>
        </div>
      </div>
    `,
  });
}

export async function sendAdminNotification(customer: EmailCustomer, booking: EmailBooking) {
  const adminEmail = process.env.ADMIN_EMAIL || "Industrialcleaningservices00@gmail.com";
  if (!adminEmail) return;

  await getResend().emails.send({
    from: process.env.EMAIL_FROM!,
    to: adminEmail,
    subject: `New Booking: ${customer.name} - ${booking.scheduled_date}`,
    html: `
      <div style="font-family: 'Inter', Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2D2D2D; margin: 0 0 16px;">New Booking Received</h2>
        <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
          <tr><td style="padding: 8px 0; color: #8A8580; border-bottom: 1px solid #f0f0f0;">Customer</td><td style="padding: 8px 0; border-bottom: 1px solid #f0f0f0;"><strong>${customer.name}</strong></td></tr>
          <tr><td style="padding: 8px 0; color: #8A8580; border-bottom: 1px solid #f0f0f0;">Email</td><td style="padding: 8px 0; border-bottom: 1px solid #f0f0f0;">${customer.email}</td></tr>
          <tr><td style="padding: 8px 0; color: #8A8580; border-bottom: 1px solid #f0f0f0;">Phone</td><td style="padding: 8px 0; border-bottom: 1px solid #f0f0f0;">${customer.phone}</td></tr>
          <tr><td style="padding: 8px 0; color: #8A8580; border-bottom: 1px solid #f0f0f0;">Address</td><td style="padding: 8px 0; border-bottom: 1px solid #f0f0f0;">${customer.address}, ${customer.city} ${customer.zip}</td></tr>
          <tr><td style="padding: 8px 0; color: #8A8580; border-bottom: 1px solid #f0f0f0;">Date</td><td style="padding: 8px 0; border-bottom: 1px solid #f0f0f0;">${booking.scheduled_date} at ${booking.scheduled_time}</td></tr>
          <tr><td style="padding: 8px 0; color: #8A8580; border-bottom: 1px solid #f0f0f0;">Home</td><td style="padding: 8px 0; border-bottom: 1px solid #f0f0f0;">${booking.bedrooms} bed / ${booking.bathrooms} bath</td></tr>
          <tr><td style="padding: 8px 0; color: #8A8580; border-bottom: 1px solid #f0f0f0;">Frequency</td><td style="padding: 8px 0; border-bottom: 1px solid #f0f0f0;">${frequencyLabels[booking.frequency] || booking.frequency}</td></tr>
          <tr><td style="padding: 8px 0; color: #8A8580; border-bottom: 1px solid #f0f0f0;">Price</td><td style="padding: 8px 0; border-bottom: 1px solid #f0f0f0;"><strong>$${booking.price}.00</strong></td></tr>
          ${booking.notes ? `<tr><td style="padding: 8px 0; color: #8A8580;">Property Details</td><td style="padding: 8px 0; white-space: pre-line;">${booking.notes}</td></tr>` : ""}
        </table>
        <p style="margin: 24px 0 0;"><a href="https://industrialcleaning.services/admin/bookings/${booking.id}" style="background: #5B8A7A; color: white; padding: 10px 20px; border-radius: 8px; text-decoration: none; font-size: 14px; font-weight: 600;">View in Dashboard</a></p>
      </div>
    `,
  });
}
