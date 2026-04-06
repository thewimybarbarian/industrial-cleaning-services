import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");
    const from = searchParams.get("from");
    const to = searchParams.get("to");
    const search = searchParams.get("search");

    let query = supabase
      .from("bookings")
      .select("*, customers(*)")
      .order("created_at", { ascending: false });

    if (status) query = query.eq("status", status);
    if (from) query = query.gte("scheduled_date", from);
    if (to) query = query.lte("scheduled_date", to);

    const { data, error } = await query;
    if (error) throw error;

    // Client-side search filter (name or email)
    let results = data || [];
    if (search) {
      const s = search.toLowerCase();
      results = results.filter(
        (b) =>
          b.customers?.name?.toLowerCase().includes(s) ||
          b.customers?.email?.toLowerCase().includes(s)
      );
    }

    return NextResponse.json(results);
  } catch (error) {
    console.error("Fetch bookings error:", error);
    return NextResponse.json({ error: "Failed to fetch bookings" }, { status: 500 });
  }
}
