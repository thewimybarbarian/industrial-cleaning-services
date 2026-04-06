"use client";

import Link from "next/link";
import { formatAmount } from "@/lib/invoice";
import type { Invoice } from "@/lib/types";

const statusStyles: Record<string, string> = {
  unpaid: "bg-gold/15 text-gold",
  paid: "bg-green/15 text-green",
  void: "bg-dark/10 text-text-muted",
};

export default function InvoiceTable({ invoices }: { invoices: Invoice[] }) {
  if (invoices.length === 0) {
    return (
      <div className="bg-white rounded-xl p-12 text-center shadow-sm">
        <p className="text-text-muted">No invoices found</p>
      </div>
    );
  }

  return (
    <>
      {/* Mobile: card view */}
      <div className="md:hidden space-y-3">
        {invoices.map((invoice) => (
          <Link
            key={invoice.id}
            href={`/admin/invoices/${invoice.id}`}
            className="block bg-white rounded-xl p-4 shadow-sm active:bg-gray-light/50"
          >
            <div className="flex items-start justify-between mb-2">
              <div>
                <p className="font-semibold text-dark">{invoice.customers?.name}</p>
                <p className="text-xs text-text-muted">{invoice.invoice_number}</p>
              </div>
              <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-semibold capitalize ${statusStyles[invoice.status] || "bg-gray-100 text-gray-600"}`}>
                {invoice.status}
              </span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-dark/60 text-xs">{new Date(invoice.issued_at).toLocaleDateString()}</span>
              <span className="font-semibold text-dark">{formatAmount(invoice.amount)}</span>
            </div>
          </Link>
        ))}
      </div>

      {/* Desktop: table view */}
      <div className="hidden md:block bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-text-muted uppercase tracking-wide">Invoice #</th>
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-text-muted uppercase tracking-wide">Customer</th>
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-text-muted uppercase tracking-wide">Amount</th>
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-text-muted uppercase tracking-wide">Status</th>
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-text-muted uppercase tracking-wide">Issued</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((invoice) => (
                <tr key={invoice.id} className="border-b border-gray-50 hover:bg-gray-light/50 transition-colors">
                  <td className="px-5 py-4">
                    <Link href={`/admin/invoices/${invoice.id}`} className="text-dark hover:text-green font-medium">
                      {invoice.invoice_number}
                    </Link>
                  </td>
                  <td className="px-5 py-4">
                    <p className="font-medium text-dark">{invoice.customers?.name}</p>
                    <p className="text-text-muted text-xs">{invoice.customers?.email}</p>
                  </td>
                  <td className="px-5 py-4 font-semibold text-dark">{formatAmount(invoice.amount)}</td>
                  <td className="px-5 py-4">
                    <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-semibold capitalize ${statusStyles[invoice.status] || "bg-gray-100 text-gray-600"}`}>
                      {invoice.status}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-dark/70">
                    {new Date(invoice.issued_at).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
