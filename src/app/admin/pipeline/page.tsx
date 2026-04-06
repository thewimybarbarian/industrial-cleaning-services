"use client";

import { useEffect, useState } from "react";
import PipelineBoard from "@/components/admin/PipelineBoard";
import type { BookingRow } from "@/lib/types";

export default function PipelinePage() {
  const [bookings, setBookings] = useState<BookingRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/bookings")
      .then((r) => r.json())
      .then((data) => setBookings(Array.isArray(data) ? data : []))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <h1
        className="text-2xl font-bold text-dark mb-6"
        style={{ fontFamily: "var(--font-poppins)" }}
      >
        Pipeline
      </h1>

      {loading ? (
        <div className="bg-white rounded-xl p-12 text-center shadow-sm">
          <p className="text-text-muted">Loading pipeline...</p>
        </div>
      ) : (
        <PipelineBoard initialBookings={bookings} />
      )}
    </div>
  );
}
