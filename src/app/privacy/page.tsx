import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy | Industrial Cleaning Services LLC",
  description:
    "How Industrial Cleaning Services LLC collects, uses, and protects your information.",
};

export default function PrivacyPage() {
  const lastUpdated = "May 7, 2026";

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      <section className="pt-32 pb-20 px-6">
        <div className="max-w-3xl mx-auto">
          <h1
            className="text-4xl md:text-5xl font-bold text-dark mb-3"
            style={{ fontFamily: "var(--font-poppins)" }}
          >
            Privacy Policy
          </h1>
          <p className="text-sm text-dark/50 mb-12">Last updated: {lastUpdated}</p>

          <div className="prose prose-lg max-w-none text-dark/80 leading-relaxed space-y-8">
            <section>
              <h2 className="text-2xl font-bold text-dark mb-3">Who we are</h2>
              <p>
                Industrial Cleaning Services LLC (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) is a residential
                and commercial cleaning company based in Norman, Oklahoma, serving the
                Oklahoma City metro area. This Privacy Policy explains how we collect,
                use, and protect the information you share with us when you use our
                website at{" "}
                <a href="https://industrialcleaning.services" className="text-green hover:underline">
                  industrialcleaning.services
                </a>{" "}
                or book a cleaning service with us.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-dark mb-3">Information we collect</h2>
              <p>
                When you book a cleaning through our website, we collect only the
                information you provide directly through the booking form:
              </p>
              <ul className="list-disc pl-6 mt-3 space-y-1">
                <li>Your name</li>
                <li>Email address</li>
                <li>Phone number</li>
                <li>Service address (street, city, ZIP)</li>
                <li>Property details (bedrooms, bathrooms, type of property, etc.)</li>
                <li>Booking preferences (frequency, scheduled date and time)</li>
                <li>Any optional notes you choose to include</li>
              </ul>
              <p className="mt-3">
                We do not use cookies for tracking or third-party advertising. We do not
                collect or store payment card information on our servers.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-dark mb-3">How we use your information</h2>
              <p>We use the information you provide solely to:</p>
              <ul className="list-disc pl-6 mt-3 space-y-1">
                <li>Schedule, confirm, and deliver the cleaning service you booked</li>
                <li>Send you a confirmation email about your booking</li>
                <li>Contact you if we need to reschedule or have a question about service access</li>
                <li>Notify our business owner internally that a new booking has come in</li>
              </ul>
              <p className="mt-3">
                We do not sell your information. We do not share it with advertisers,
                marketers, or data brokers.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-dark mb-3">SMS notifications</h2>
              <p>
                Our business uses an SMS notification system that sends a single text
                message <strong>only to the business owner</strong> (Maudy Marquez Robles)
                each time a customer books a cleaning. Customers do not receive
                marketing or promotional text messages from us. The owner consented to
                receive these operational alerts when she configured the booking system
                for her own business.
              </p>
              <p className="mt-3">
                If we ever introduce customer-facing SMS in the future (for example,
                appointment reminders), it will be opt-in, clearly disclosed at the
                point of collection, and you will be able to unsubscribe at any time by
                replying STOP. Standard message and data rates may apply.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-dark mb-3">Service providers</h2>
              <p>
                We rely on a small number of trusted technology providers to operate the
                website and deliver service confirmations:
              </p>
              <ul className="list-disc pl-6 mt-3 space-y-1">
                <li>
                  <strong>Supabase</strong> &mdash; secure database hosting for booking records
                </li>
                <li>
                  <strong>Vercel</strong> &mdash; website hosting and content delivery
                </li>
                <li>
                  <strong>Resend</strong> &mdash; transactional email delivery (booking confirmations and admin alerts)
                </li>
                <li>
                  <strong>Twilio</strong> &mdash; the SMS notification described above (admin only)
                </li>
              </ul>
              <p className="mt-3">
                These providers process information on our behalf and are bound by their
                own privacy and security commitments. We do not authorize them to use
                your information for any purpose other than running our business.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-dark mb-3">How long we keep your information</h2>
              <p>
                We retain your booking information for as long as you remain an active
                customer and for a reasonable period afterward to support recurring
                service, recordkeeping, and tax obligations. You may request deletion of
                your information at any time by emailing us at the address below.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-dark mb-3">Your choices</h2>
              <p>You can:</p>
              <ul className="list-disc pl-6 mt-3 space-y-1">
                <li>Request a copy of the information we have on file for you</li>
                <li>Correct any information that is out of date or inaccurate</li>
                <li>Ask us to delete your information from our records</li>
              </ul>
              <p className="mt-3">
                Email us using the contact information below and we will respond within
                a reasonable time frame.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-dark mb-3">Children&rsquo;s privacy</h2>
              <p>
                Our services are intended for adults arranging cleaning for a property
                they own or rent. We do not knowingly collect information from children
                under the age of 13.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-dark mb-3">Changes to this policy</h2>
              <p>
                We may update this Privacy Policy from time to time. When we do, we will
                update the &ldquo;Last updated&rdquo; date at the top of the page. Material changes
                will be highlighted on our homepage for at least 30 days.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-dark mb-3">Contact us</h2>
              <p>
                If you have any questions about this Privacy Policy or how we handle
                your information, contact us at:
              </p>
              <div className="mt-3 bg-gray-light p-5 rounded-lg text-dark/90 not-prose">
                <p className="font-semibold">Industrial Cleaning Services LLC</p>
                <p>3816 Tayport St</p>
                <p>Norman, OK 73072</p>
                <p className="mt-2">
                  Phone:{" "}
                  <a href="tel:+14052509185" className="text-green hover:underline">
                    (405) 250-9185
                  </a>
                </p>
                <p>
                  Email:{" "}
                  <a
                    href="mailto:Industrialcleaningservices00@gmail.com"
                    className="text-green hover:underline"
                  >
                    Industrialcleaningservices00@gmail.com
                  </a>
                </p>
              </div>
            </section>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
