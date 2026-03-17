import type { FrequencyId } from "./pricing";

export interface BookingFormData {
  bedrooms: number;
  bathrooms: number;
  frequency: FrequencyId;
  scheduledDate: string;
  scheduledTime: string;
  customerName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  zip: string;
  notes: string;
}

export interface Booking extends BookingFormData {
  id: string;
  createdAt: string;
  price: number;
  status: "pending" | "confirmed" | "completed" | "cancelled";
}
