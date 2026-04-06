import type { LeadRow } from "@/lib/types";

export default function LeadCard({ lead }: { lead: LeadRow }) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <div className="mb-4">
        <h3 className="font-bold text-dark text-lg">{lead.name}</h3>
        <p className="text-text-muted text-sm">{lead.email}</p>
        <p className="text-text-muted text-xs mt-0.5">
          {lead.address}, {lead.city} {lead.zip}
        </p>
      </div>

      <div className="flex gap-4 text-xs text-text-muted mb-4 pb-4 border-b border-gray-100">
        <div>
          <p className="text-lg font-bold text-dark">{lead.total_bookings}</p>
          <p>Bookings</p>
        </div>
        <div>
          <p className="text-lg font-bold text-green">${lead.total_spent}</p>
          <p>Spent</p>
        </div>
        <div>
          <p className="text-sm font-medium text-dark mt-1">
            {lead.last_booking_date || "—"}
          </p>
          <p>Last Booking</p>
        </div>
      </div>

      <div className="flex gap-2">
        <a
          href={`tel:${lead.phone}`}
          className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg bg-green/10 text-green text-sm font-medium hover:bg-green/20 transition-colors"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
          </svg>
          Call
        </a>
        <a
          href={`mailto:${lead.email}`}
          className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg bg-gold/10 text-gold text-sm font-medium hover:bg-gold/20 transition-colors"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
            <polyline points="22,6 12,13 2,6" />
          </svg>
          Email
        </a>
        <a
          href={`sms:${lead.phone}`}
          className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg bg-dark/5 text-dark text-sm font-medium hover:bg-dark/10 transition-colors"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
          Text
        </a>
      </div>
    </div>
  );
}
