import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      bedrooms,
      bathrooms,
      frequency,
      scheduledDate,
      scheduledTime,
      price,
      customerName,
      email,
      phone,
      address,
      city,
      zip,
      notes,
    } = body;

    // Validate required fields
    if (!customerName || !email || !phone || !address || !city || !zip || !scheduledDate || !scheduledTime) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // TODO: Save to Supabase once configured
    // For now, log the booking
    console.log("New booking:", {
      bedrooms,
      bathrooms,
      frequency,
      scheduledDate,
      scheduledTime,
      price,
      customerName,
      email,
      phone,
      address,
      city,
      zip,
      notes,
    });

    // TODO: Send confirmation email via Resend

    return NextResponse.json({ success: true, message: "Booking received!" });
  } catch {
    return NextResponse.json({ error: "Failed to process booking" }, { status: 500 });
  }
}
