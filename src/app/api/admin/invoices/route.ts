import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { generateInvoiceNumber } from "@/lib/invoice";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");

    let query = supabase
      .from("invoices")
      .select("*, bookings(*), customers(*)")
      .order("issued_at", { ascending: false });

    if (status) query = query.eq("status", status);

    const { data, error } = await query;
    if (error) throw error;

    return NextResponse.json(data || []);
  } catch (error) {
    console.error("Fetch invoices error:", error);
    return NextResponse.json({ error: "Failed to fetch invoices" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { bookingId, notes } = await request.json();

    // Fetch the booking
    const { data: booking, error: bookingError } = await supabase
      .from("bookings")
      .select("*")
      .eq("id", bookingId)
      .single();

    if (bookingError || !booking) {
      return NextResponse.json({ error: "Booking not found" }, { status: 404 });
    }

    const invoiceNumber = await generateInvoiceNumber();

    const { data: invoice, error: invoiceError } = await supabase
      .from("invoices")
      .insert({
        booking_id: bookingId,
        customer_id: booking.customer_id,
        invoice_number: invoiceNumber,
        amount: booking.price * 100, // Convert to cents
        notes: notes || "",
      })
      .select()
      .single();

    if (invoiceError) throw invoiceError;

    return NextResponse.json(invoice);
  } catch (error) {
    console.error("Create invoice error:", error);
    return NextResponse.json({ error: "Failed to create invoice" }, { status: 500 });
  }
}
