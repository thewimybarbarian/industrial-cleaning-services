import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET() {
  try {
    const now = new Date();
    const todayStr = now.toISOString().split("T")[0];

    // Fetch all bookings with customers
    const { data: bookings, error } = await supabase
      .from("bookings")
      .select("*, customers(*)")
      .order("created_at", { ascending: false });

    if (error) throw error;
    const all = bookings || [];

    // Totals
    const totalBookings = all.length;
    const pendingCount = all.filter((b) => b.status === "pending").length;
    const todayCount = all.filter((b) => b.scheduled_date === todayStr).length;
    const totalRevenue = all
      .filter((b) => b.status === "completed")
      .reduce((sum, b) => sum + b.price, 0);

    // Bookings by status
    const statusCounts: Record<string, number> = {};
    for (const b of all) {
      statusCounts[b.status] = (statusCounts[b.status] || 0) + 1;
    }
    const bookingsByStatus = Object.entries(statusCounts).map(([status, count]) => ({
      status,
      count,
    }));

    // Revenue by week (last 12 weeks, completed bookings)
    const revenueByWeek: { week: string; revenue: number }[] = [];
    for (let i = 11; i >= 0; i--) {
      const weekStart = new Date(now);
      weekStart.setDate(weekStart.getDate() - weekStart.getDay() - i * 7);
      const weekEnd = new Date(weekStart);
      weekEnd.setDate(weekEnd.getDate() + 6);

      const startStr = weekStart.toISOString().split("T")[0];
      const endStr = weekEnd.toISOString().split("T")[0];

      const weekRevenue = all
        .filter(
          (b) =>
            b.status === "completed" &&
            b.scheduled_date >= startStr &&
            b.scheduled_date <= endStr
        )
        .reduce((sum, b) => sum + b.price, 0);

      const label = `${weekStart.getMonth() + 1}/${weekStart.getDate()}`;
      revenueByWeek.push({ week: label, revenue: weekRevenue });
    }

    // Upcoming this week
    const weekFromNow = new Date(now);
    weekFromNow.setDate(weekFromNow.getDate() + 7);
    const weekFromNowStr = weekFromNow.toISOString().split("T")[0];

    const upcomingThisWeek = all
      .filter(
        (b) =>
          b.scheduled_date >= todayStr &&
          b.scheduled_date <= weekFromNowStr &&
          b.status !== "cancelled" &&
          b.status !== "completed"
      )
      .sort((a, b) => a.scheduled_date.localeCompare(b.scheduled_date))
      .slice(0, 10);

    return NextResponse.json({
      totals: { totalBookings, pendingCount, todayCount, totalRevenue },
      bookingsByStatus,
      revenueByWeek,
      upcomingThisWeek,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("Dashboard error:", message);
    return NextResponse.json({ error: "Failed to load dashboard", detail: message }, { status: 500 });
  }
}
