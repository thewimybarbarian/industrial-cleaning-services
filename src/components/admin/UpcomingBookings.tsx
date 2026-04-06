"use client";

import Link from "next/link";
import BookingStatusBadge from "./BookingStatusBadge";
import type { BookingRow } from "@/lib/types";

export default function UpcomingBookings({ bookings }: { bookings: BookingRow[] }) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <h3 className="text-sm font-semibold text-text-muted uppercase tracking-wide mb-4">
        Upcoming This Week
      </h3>
      {bookings.length === 0 ? (
        <p className="text-text-muted text-sm">No upcoming bookings</p>
      ) : (
        <div className="space-y-3">
          {bookings.map((b) => (
            <Link
              key={b.id}
              href={`/admin/bookings/${b.id}`}
              className="flex flex-col sm:flex-row sm:items-center justify-between py-3 px-4 rounded-lg hover:bg-gray-light/50 active:bg-gray-light/50 transition-colors -mx-1 gap-1 sm:gap-4"
            >
              <div>
                <p className="text-sm font-medium text-dark">{b.customers?.name}</p>
                <p className="text-xs text-text-muted">
                  {b.scheduled_date} at {b.scheduled_time}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm font-semibold text-dark">${b.price}</span>
                <BookingStatusBadge status={b.status} />
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
