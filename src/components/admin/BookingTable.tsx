"use client";

import Link from "next/link";
import BookingStatusBadge from "./BookingStatusBadge";
import type { BookingRow } from "@/lib/types";

export default function BookingTable({ bookings }: { bookings: BookingRow[] }) {
  if (bookings.length === 0) {
    return (
      <div className="bg-white rounded-xl p-12 text-center shadow-sm">
        <p className="text-text-muted">No bookings found</p>
      </div>
    );
  }

  return (
    <>
      {/* Mobile: card view */}
      <div className="md:hidden space-y-3">
        {bookings.map((booking) => (
          <Link
            key={booking.id}
            href={`/admin/bookings/${booking.id}`}
            className="block bg-white rounded-xl p-4 shadow-sm active:bg-gray-light/50"
          >
            <div className="flex items-start justify-between mb-2">
              <div>
                <p className="font-semibold text-dark">{booking.customers?.name}</p>
                <p className="text-xs text-text-muted">{booking.scheduled_date} at {booking.scheduled_time}</p>
              </div>
              <BookingStatusBadge status={booking.status} />
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-dark/60 text-xs">{booking.customers?.city}</span>
              <span className="font-semibold text-dark">${booking.price}</span>
            </div>
          </Link>
        ))}
      </div>

      {/* Desktop: table view */}
      <div className="hidden md:block bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-text-muted uppercase tracking-wide">Date</th>
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-text-muted uppercase tracking-wide">Time</th>
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-text-muted uppercase tracking-wide">Customer</th>
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-text-muted uppercase tracking-wide">Address</th>
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-text-muted uppercase tracking-wide">Price</th>
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-text-muted uppercase tracking-wide">Status</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr key={booking.id} className="border-b border-gray-50 hover:bg-gray-light/50 transition-colors">
                  <td className="px-5 py-4">
                    <Link href={`/admin/bookings/${booking.id}`} className="text-dark hover:text-green font-medium">
                      {booking.scheduled_date}
                    </Link>
                  </td>
                  <td className="px-5 py-4 text-dark/70">{booking.scheduled_time}</td>
                  <td className="px-5 py-4">
                    <p className="font-medium text-dark">{booking.customers?.name}</p>
                    <p className="text-text-muted text-xs">{booking.customers?.email}</p>
                  </td>
                  <td className="px-5 py-4 text-dark/70 text-xs">
                    {booking.customers?.address}, {booking.customers?.city}
                  </td>
                  <td className="px-5 py-4 font-semibold text-dark">${booking.price}</td>
                  <td className="px-5 py-4">
                    <BookingStatusBadge status={booking.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
