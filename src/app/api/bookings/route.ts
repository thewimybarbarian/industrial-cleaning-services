import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { calculatePrice, type FrequencyId } from "@/lib/pricing";
import { sendBookingConfirmation, sendAdminNotification } from "@/lib/email";

function buildResidentialNotes({
  livingRooms,
  diningRooms,
  offices,
  stories,
  hasPets,
  specialNotes,
}: {
  livingRooms: number;
  diningRooms: number;
  offices: number;
  stories: string;
  hasPets: boolean;
  specialNotes: string;
}): string {
  const parts: string[] = ["[RESIDENTIAL]"];

  const rooms = [
    livingRooms > 0 ? `Living rooms: ${livingRooms}` : null,
    diningRooms > 0 ? `Dining rooms: ${diningRooms}` : null,
    offices > 0 ? `Offices: ${offices}` : null,
  ].filter(Boolean);

  if (rooms.length > 0) parts.push(rooms.join(" | "));

  const storiesLabel = stories === "two" ? "Two Story" : "Single Story";
  const petsLabel = hasPets ? "Yes" : "No";
  parts.push(`${storiesLabel} | Pets: ${petsLabel}`);

  if (specialNotes?.trim()) {
    parts.push(`Notes: ${specialNotes.trim()}`);
  }

  return parts.join("\n");
}

function buildCommercialNotes({
  commOffices,
  commRestrooms,
  commFloors,
  commBreakRooms,
  commConferenceRooms,
  commSqft,
  specialNotes,
}: {
  commOffices: number;
  commRestrooms: number;
  commFloors: number;
  commBreakRooms: number;
  commConferenceRooms: number;
  commSqft: string;
  specialNotes: string;
}): string {
  const parts: string[] = ["[COMMERCIAL]"];

  const facilities = [
    commOffices > 0 ? `Offices: ${commOffices}` : null,
    commRestrooms > 0 ? `Restrooms: ${commRestrooms}` : null,
    commFloors > 0 ? `Floors: ${commFloors}` : null,
    commBreakRooms > 0 ? `Break rooms: ${commBreakRooms}` : null,
    commConferenceRooms > 0 ? `Conference rooms: ${commConferenceRooms}` : null,
  ].filter(Boolean);

  if (facilities.length > 0) parts.push(facilities.join(" | "));
  if (commSqft) parts.push(`Square footage: ${Number(commSqft).toLocaleString()} sq ft`);

  if (specialNotes?.trim()) {
    parts.push(`Notes: ${specialNotes.trim()}`);
  }

  return parts.join("\n");
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      bookingType = "residential",
      bedrooms = 3,
      bathrooms = 2,
      livingRooms = 0,
      diningRooms = 0,
      offices = 0,
      stories = "single",
      hasPets = false,
      specialNotes = "",
      commOffices = 0,
      commRestrooms = 0,
      commFloors = 1,
      commBreakRooms = 0,
      commConferenceRooms = 0,
      commSqft = "",
      frequency,
      scheduledDate,
      scheduledTime,
      customerName,
      email,
      phone,
      address,
      city,
      zip,
    } = body;

    // Validate required fields
    if (!customerName || !email || !phone || !address || !city || !zip || !scheduledDate || !scheduledTime) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Recalculate price server-side
    const price = calculatePrice(bedrooms, bathrooms, frequency as FrequencyId);

    // Build structured notes based on booking type
    const notes =
      bookingType === "commercial"
        ? buildCommercialNotes({ commOffices, commRestrooms, commFloors, commBreakRooms, commConferenceRooms, commSqft, specialNotes })
        : buildResidentialNotes({ livingRooms, diningRooms, offices, stories, hasPets, specialNotes });

    // Upsert customer by email
    const { data: customer, error: customerError } = await supabase
      .from("customers")
      .upsert(
        { name: customerName, email, phone, address, city, zip, notes: "" },
        { onConflict: "email" }
      )
      .select()
      .single();

    if (customerError) throw customerError;

    // Insert booking
    const { data: booking, error: bookingError } = await supabase
      .from("bookings")
      .insert({
        customer_id: customer.id,
        bedrooms: bookingType === "commercial" ? 0 : bedrooms,
        bathrooms: bookingType === "commercial" ? 0 : bathrooms,
        frequency,
        scheduled_date: scheduledDate,
        scheduled_time: scheduledTime,
        price,
        notes,
      })
      .select()
      .single();

    if (bookingError) throw bookingError;

    // Send notifications (non-blocking).
    // Admin SMS removed: US carriers block A2P traffic from unregistered
    // 10DLC numbers (Twilio error 30034). Admin relies on email push
    // notifications instead. To re-enable, register the Twilio number
    // with The Campaign Registry and restore sendAdminBookingSMS.
    Promise.allSettled([
      sendBookingConfirmation(customer, booking),
      sendAdminNotification(customer, booking),
    ]).then((results) => {
      const labels = ["Customer email", "Admin email"];
      results.forEach((r, i) => {
        if (r.status === "rejected") {
          console.error(`${labels[i]} failed:`, r.reason);
        }
      });
    });

    return NextResponse.json({ success: true, bookingId: booking.id });
  } catch (error) {
    console.error("Booking error:", error);
    return NextResponse.json({ error: "Failed to process booking" }, { status: 500 });
  }
}
