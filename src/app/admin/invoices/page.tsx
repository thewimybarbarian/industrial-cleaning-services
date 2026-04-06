"use client";

import { useEffect, useState } from "react";
import InvoiceTable from "@/components/admin/InvoiceTable";
import StatsCards from "@/components/admin/StatsCards";
import type { Invoice } from "@/lib/types";

const statuses = ["all", "unpaid", "paid", "void"];

export default function InvoicesPage() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchInvoices();
  }, [filter]);

  async function fetchInvoices() {
    setLoading(true);
    const params = new URLSearchParams();
    if (filter !== "all") params.set("status", filter);

    const res = await fetch(`/api/admin/invoices?${params}`);
    const data = await res.json();
    setInvoices(Array.isArray(data) ? data : []);
    setLoading(false);
  }

  const unpaid = invoices.filter((i) => i.status === "unpaid");
  const unpaidTotal = unpaid.reduce((sum, i) => sum + i.amount, 0);
  const paidTotal = invoices
    .filter((i) => i.status === "paid")
    .reduce((sum, i) => sum + i.amount, 0);

  return (
    <div>
      <h1
        className="text-2xl font-bold text-dark mb-6"
        style={{ fontFamily: "var(--font-poppins)" }}
      >
        Invoices
      </h1>

      <StatsCards
        stats={[
          { label: "Total Invoices", value: invoices.length },
          { label: "Outstanding", value: unpaid.length, sub: `$${(unpaidTotal / 100).toFixed(2)} unpaid` },
          { label: "Revenue Collected", value: `$${(paidTotal / 100).toFixed(2)}` },
        ]}
      />

      <div className="flex gap-1 bg-white rounded-lg p-1 shadow-sm mb-6 w-fit">
        {statuses.map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`px-3 py-1.5 rounded-md text-xs font-medium capitalize transition-colors ${
              filter === s
                ? "bg-green text-white"
                : "text-text-muted hover:text-dark"
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="bg-white rounded-xl p-12 text-center shadow-sm">
          <p className="text-text-muted">Loading invoices...</p>
        </div>
      ) : (
        <InvoiceTable invoices={invoices} />
      )}
    </div>
  );
}
