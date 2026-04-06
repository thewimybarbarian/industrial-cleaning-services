"use client";

import { formatAmount } from "@/lib/invoice";
import type { Invoice } from "@/lib/types";

const frequencyLabels: Record<string, string> = {
  once: "One-time cleaning",
  weekly: "Weekly cleaning service",
  biweekly: "Bi-weekly cleaning service",
  monthly: "Monthly cleaning service",
};

export default function InvoiceView({ invoice }: { invoice: Invoice }) {
  const customer = invoice.customers;
  const booking = invoice.bookings;

  return (
    <div className="bg-white rounded-xl shadow-sm max-w-2xl mx-auto" id="invoice-print">
      {/* Header */}
      <div className="bg-green rounded-t-xl px-8 py-6 flex justify-between items-start">
        <div>
          <h1 className="text-white text-xl font-bold" style={{ fontFamily: "var(--font-poppins)" }}>
            Industrial Cleaning Services
          </h1>
          <p className="text-white/60 text-xs mt-1">Oklahoma City Metro</p>
          <p className="text-white/60 text-xs">(405) 250-9185</p>
        </div>
        <div className="text-right">
          <p className="text-white text-2xl font-bold" style={{ fontFamily: "var(--font-poppins)" }}>INVOICE</p>
          <p className="text-white/70 text-sm mt-1">{invoice.invoice_number}</p>
        </div>
      </div>

      <div className="px-8 py-6 space-y-6">
        {/* Meta */}
        <div className="flex justify-between text-sm">
          <div>
            <p className="text-text-muted text-xs uppercase tracking-wide mb-1">Bill To</p>
            <p className="font-semibold text-dark">{customer?.name}</p>
            <p className="text-dark/70">{customer?.address}</p>
            <p className="text-dark/70">{customer?.city}, {customer?.zip}</p>
            <p className="text-dark/70">{customer?.email}</p>
            <p className="text-dark/70">{customer?.phone}</p>
          </div>
          <div className="text-right">
            <div className="mb-3">
              <p className="text-text-muted text-xs uppercase tracking-wide mb-1">Date Issued</p>
              <p className="text-dark font-medium">{new Date(invoice.issued_at).toLocaleDateString()}</p>
            </div>
            <div>
              <p className="text-text-muted text-xs uppercase tracking-wide mb-1">Status</p>
              <p className={`font-bold uppercase text-sm ${invoice.status === "paid" ? "text-green" : invoice.status === "void" ? "text-text-muted" : "text-gold"}`}>
                {invoice.status}
              </p>
            </div>
            {invoice.paid_at && (
              <div className="mt-3">
                <p className="text-text-muted text-xs uppercase tracking-wide mb-1">Paid On</p>
                <p className="text-dark font-medium">{new Date(invoice.paid_at).toLocaleDateString()}</p>
              </div>
            )}
          </div>
        </div>

        {/* Line Items */}
        <div className="border border-gray-100 rounded-lg overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-light">
                <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase">Description</th>
                <th className="text-right px-4 py-3 text-xs font-semibold text-text-muted uppercase">Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-gray-100">
                <td className="px-4 py-4">
                  <p className="font-medium text-dark">House Cleaning</p>
                  <p className="text-text-muted text-xs mt-0.5">
                    {booking?.bedrooms} bed / {booking?.bathrooms} bath &middot; {frequencyLabels[booking?.frequency || ""] || booking?.frequency}
                  </p>
                  {booking?.scheduled_date && (
                    <p className="text-text-muted text-xs">Service date: {booking.scheduled_date}</p>
                  )}
                </td>
                <td className="px-4 py-4 text-right font-semibold text-dark">
                  {formatAmount(invoice.amount)}
                </td>
              </tr>
            </tbody>
            <tfoot>
              <tr className="border-t-2 border-gray-200">
                <td className="px-4 py-4 text-right font-bold text-dark">Total</td>
                <td className="px-4 py-4 text-right text-xl font-bold text-green">
                  {formatAmount(invoice.amount)}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>

        {/* Notes */}
        {invoice.notes && (
          <div>
            <p className="text-text-muted text-xs uppercase tracking-wide mb-1">Notes</p>
            <p className="text-sm text-dark">{invoice.notes}</p>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="border-t border-gray-100 px-8 py-4 text-center">
        <p className="text-text-muted text-xs">
          Industrial Cleaning Services &middot; Oklahoma City Metro &middot; (405) 250-9185
        </p>
      </div>
    </div>
  );
}
