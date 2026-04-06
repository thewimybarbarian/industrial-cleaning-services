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

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  zip: string;
  notes: string;
  created_at: string;
}

export interface BookingRow {
  id: string;
  customer_id: string;
  bedrooms: number;
  bathrooms: number;
  frequency: string;
  scheduled_date: string;
  scheduled_time: string;
  price: number;
  status: "pending" | "confirmed" | "completed" | "cancelled";
  notes: string;
  created_at: string;
  customers?: Customer;
}

export interface Invoice {
  id: string;
  booking_id: string;
  customer_id: string;
  invoice_number: string;
  amount: number;
  status: "unpaid" | "paid" | "void";
  issued_at: string;
  paid_at: string | null;
  notes: string;
  bookings?: BookingRow;
  customers?: Customer;
}

export interface LeadRow {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  zip: string;
  created_at: string;
  total_bookings: number;
  total_spent: number;
  last_booking_date: string | null;
}
