"use client";

import { useEffect, useState } from "react";
import StatsCards from "@/components/admin/StatsCards";
import BookingTable from "@/components/admin/BookingTable";
import type { BookingRow } from "@/lib/types";

const statuses = ["all", "pending", "confirmed", "completed", "cancelled"];

export default function BookingsPage() {
  const [bookings, setBookings] = useState<BookingRow[]>([]);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBookings();
  }, [filter]);

  async function fetchBookings() {
    setLoading(true);
    const params = new URLSearchParams();
    if (filter !== "all") params.set("status", filter);
    if (search) params.set("search", search);

    const res = await fetch(`/api/admin/bookings?${params}`);
    const data = await res.json();
    setBookings(Array.isArray(data) ? data : []);
    setLoading(false);
  }

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    fetchBookings();
  }

  const pending = bookings.filter((b) => b.status === "pending").length;
  const todayStr = new Date().toISOString().split("T")[0];
  const todayBookings = bookings.filter((b) => b.scheduled_date === todayStr).length;
  const revenue = bookings
    .filter((b) => b.status === "completed")
    .reduce((sum, b) => sum + b.price, 0);

  return (
    <div>
      <h1
        className="text-2xl font-bold text-dark mb-6"
        style={{ fontFamily: "var(--font-poppins)" }}
      >
        Bookings
      </h1>

      <StatsCards
        stats={[
          { label: "Total Bookings", value: bookings.length },
          { label: "Pending", value: pending, sub: "Awaiting confirmation" },
          { label: "Today", value: todayBookings },
          { label: "Revenue (Completed)", value: `$${revenue}` },
        ]}
      />

      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="flex gap-1 bg-white rounded-lg p-1 shadow-sm overflow-x-auto">
          {statuses.map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`px-3 py-1.5 rounded-md text-xs font-medium capitalize transition-colors ${
                filter === s
                  ? "bg-green text-white"
                  : "text-text-muted hover:text-dark"
              }`}
            >
              {s}
            </button>
          ))}
        </div>

        <form onSubmit={handleSearch} className="flex gap-2 flex-1 sm:max-w-xs">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search name or email..."
            className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green/40 focus:border-green"
          />
          <button
            type="submit"
            className="bg-green text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-dark transition-colors"
          >
            Search
          </button>
        </form>
      </div>

      {loading ? (
        <div className="bg-white rounded-xl p-12 text-center shadow-sm">
          <p className="text-text-muted">Loading bookings...</p>
        </div>
      ) : (
        <BookingTable bookings={bookings} />
      )}
    </div>
  );
}
