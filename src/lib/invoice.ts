import { supabase } from "./supabase";

export async function generateInvoiceNumber(): Promise<string> {
  const year = new Date().getFullYear();

  // Count existing invoices this year to get next number
  const { count } = await supabase
    .from("invoices")
    .select("*", { count: "exact", head: true })
    .gte("issued_at", `${year}-01-01`)
    .lt("issued_at", `${year + 1}-01-01`);

  const next = (count || 0) + 1;
  return `ICS-${year}-${String(next).padStart(4, "0")}`;
}

export function formatAmount(cents: number): string {
  return `$${(cents / 100).toFixed(2)}`;
}
