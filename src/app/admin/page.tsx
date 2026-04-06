"use client";

import { useEffect, useState } from "react";
import StatsCards from "@/components/admin/StatsCards";
import RevenueChart from "@/components/admin/RevenueChart";
import StatusChart from "@/components/admin/StatusChart";
import UpcomingBookings from "@/components/admin/UpcomingBookings";
import type { BookingRow } from "@/lib/types";

interface DashboardData {
  totals: {
    totalBookings: number;
    pendingCount: number;
    todayCount: number;
    totalRevenue: number;
  };
  bookingsByStatus: { status: string; count: number }[];
  revenueByWeek: { week: string; revenue: number }[];
  upcomingThisWeek: BookingRow[];
}

export default function AdminDashboard() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/dashboard")
      .then((r) => {
        if (!r.ok) throw new Error("API error");
        return r.json();
      })
      .then(setData)
      .catch(() => setData(null))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="bg-white rounded-xl p-12 text-center shadow-sm">
        <p className="text-text-muted">Loading dashboard...</p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="bg-white rounded-xl p-12 text-center shadow-sm">
        <p className="text-text-muted">Failed to load dashboard</p>
      </div>
    );
  }

  const { totals, bookingsByStatus, revenueByWeek, upcomingThisWeek } = data;

  return (
    <div>
      <h1
        className="text-2xl font-bold text-dark mb-6"
        style={{ fontFamily: "var(--font-poppins)" }}
      >
        Dashboard
      </h1>

      <StatsCards
        stats={[
          { label: "Total Bookings", value: totals.totalBookings },
          { label: "Pending", value: totals.pendingCount, sub: "Awaiting confirmation" },
          { label: "Today", value: totals.todayCount },
          { label: "Revenue", value: `$${totals.totalRevenue}`, sub: "Completed bookings" },
        ]}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2">
          <RevenueChart data={revenueByWeek} />
        </div>
        <StatusChart data={bookingsByStatus} />
      </div>

      <UpcomingBookings bookings={upcomingThisWeek} />
    </div>
  );
}
