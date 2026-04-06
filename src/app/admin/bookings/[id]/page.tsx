"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import BookingStatusBadge from "@/components/admin/BookingStatusBadge";
import type { BookingRow } from "@/lib/types";

const statusOptions = ["pending", "confirmed", "completed", "cancelled"];
const frequencyLabels: Record<string, string> = {
  once: "One-time",
  weekly: "Weekly",
  biweekly: "Every 2 weeks",
  monthly: "Monthly",
};

export default function BookingDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [booking, setBooking] = useState<BookingRow | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [creatingInvoice, setCreatingInvoice] = useState(false);

  useEffect(() => {
    fetch(`/api/admin/bookings/${id}`)
      .then((r) => r.json())
      .then(setBooking)
      .finally(() => setLoading(false));
  }, [id]);

  async function updateStatus(status: string) {
    setUpdating(true);
    const res = await fetch(`/api/admin/bookings/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    const data = await res.json();
    setBooking(data);
    setUpdating(false);
  }

  async function generateInvoice() {
    setCreatingInvoice(true);
    const res = await fetch("/api/admin/invoices", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ bookingId: id }),
    });
    const data = await res.json();
    if (data.id) {
      router.push(`/admin/invoices/${data.id}`);
    }
    setCreatingInvoice(false);
  }

  if (loading) {
    return <div className="bg-white rounded-xl p-12 text-center shadow-sm"><p className="text-text-muted">Loading...</p></div>;
  }

  if (!booking) {
    return <div className="bg-white rounded-xl p-12 text-center shadow-sm"><p className="text-text-muted">Booking not found</p></div>;
  }

  const customer = booking.customers;

  return (
    <div>
      <Link href="/admin/bookings" className="text-green text-sm hover:underline mb-4 inline-block">
        &larr; Back to Bookings
      </Link>

      <div className="flex items-center gap-4 mb-6">
        <h1 className="text-2xl font-bold text-dark" style={{ fontFamily: "var(--font-poppins)" }}>
          Booking Details
        </h1>
        <BookingStatusBadge status={booking.status} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Customer Info */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h2 className="text-sm font-semibold text-text-muted uppercase tracking-wide mb-4">Customer</h2>
          <div className="space-y-3">
            <div>
              <p className="text-lg font-bold text-dark">{customer?.name}</p>
              <p className="text-text-muted text-sm">{customer?.email}</p>
            </div>
            <p className="text-dark text-sm">{customer?.phone}</p>
            <p className="text-dark text-sm">
              {customer?.address}<br />
              {customer?.city}, {customer?.zip}
            </p>
          </div>
        </div>

        {/* Booking Info */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h2 className="text-sm font-semibold text-text-muted uppercase tracking-wide mb-4">Booking</h2>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-text-muted">Date</span>
              <span className="font-medium text-dark">{booking.scheduled_date}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-muted">Time</span>
              <span className="font-medium text-dark">{booking.scheduled_time}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-muted">Home</span>
              <span className="font-medium text-dark">{booking.bedrooms} bed / {booking.bathrooms} bath</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-muted">Frequency</span>
              <span className="font-medium text-dark">{frequencyLabels[booking.frequency] || booking.frequency}</span>
            </div>
            <div className="flex justify-between border-t border-gray-100 pt-3">
              <span className="text-text-muted">Price</span>
              <span className="text-xl font-bold text-green">${booking.price}.00</span>
            </div>
          </div>
          {booking.notes && (
            <div className="mt-4 pt-4 border-t border-gray-100">
              <p className="text-xs text-text-muted uppercase tracking-wide mb-1">Notes</p>
              <p className="text-sm text-dark">{booking.notes}</p>
            </div>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="bg-white rounded-xl p-6 shadow-sm mt-6">
        <h2 className="text-sm font-semibold text-text-muted uppercase tracking-wide mb-4">Actions</h2>
        <div className="flex flex-wrap gap-3">
          {statusOptions
            .filter((s) => s !== booking.status)
            .map((s) => (
              <button
                key={s}
                onClick={() => updateStatus(s)}
                disabled={updating}
                className="px-4 py-2 rounded-lg text-sm font-medium border border-gray-200 hover:border-green hover:text-green transition-colors capitalize disabled:opacity-50"
              >
                Mark {s}
              </button>
            ))}

          <button
            onClick={generateInvoice}
            disabled={creatingInvoice}
            className="px-4 py-2 rounded-lg text-sm font-medium bg-green text-white hover:bg-green-dark transition-colors shadow-md disabled:opacity-50"
          >
            {creatingInvoice ? "Creating..." : "Generate Invoice"}
          </button>
        </div>
      </div>

      <p className="text-xs text-text-muted mt-4">
        Created {new Date(booking.created_at).toLocaleString()}
      </p>
    </div>
  );
}
