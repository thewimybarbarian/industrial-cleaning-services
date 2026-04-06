import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search");

    // Fetch all customers
    const { data: customers, error: custError } = await supabase
      .from("customers")
      .select("*")
      .order("created_at", { ascending: false });

    if (custError) throw custError;

    // Fetch all bookings for aggregation
    const { data: bookings, error: bookError } = await supabase
      .from("bookings")
      .select("customer_id, price, scheduled_date, status");

    if (bookError) throw bookError;

    // Aggregate booking data per customer
    const leads = (customers || []).map((c) => {
      const customerBookings = (bookings || []).filter(
        (b) => b.customer_id === c.id
      );
      const completedBookings = customerBookings.filter(
        (b) => b.status === "completed"
      );
      const dates = customerBookings
        .map((b) => b.scheduled_date)
        .filter(Boolean)
        .sort();

      return {
        ...c,
        total_bookings: customerBookings.length,
        total_spent: completedBookings.reduce((sum, b) => sum + b.price, 0),
        last_booking_date: dates.length > 0 ? dates[dates.length - 1] : null,
      };
    });

    // Filter by search
    let results = leads;
    if (search) {
      const s = search.toLowerCase();
      results = leads.filter(
        (l) =>
          l.name.toLowerCase().includes(s) ||
          l.email.toLowerCase().includes(s)
      );
    }

    return NextResponse.json(results);
  } catch (error) {
    console.error("Leads error:", error);
    return NextResponse.json({ error: "Failed to fetch leads" }, { status: 500 });
  }
}
