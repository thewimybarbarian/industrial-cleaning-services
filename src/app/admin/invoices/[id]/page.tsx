"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import InvoiceView from "@/components/admin/InvoiceView";
import type { Invoice } from "@/lib/types";

export default function InvoiceDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [invoice, setInvoice] = useState<Invoice | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    fetch(`/api/admin/invoices/${id}`)
      .then((r) => r.json())
      .then(setInvoice)
      .finally(() => setLoading(false));
  }, [id]);

  async function updateStatus(status: string) {
    setUpdating(true);
    const res = await fetch(`/api/admin/invoices/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    const data = await res.json();
    setInvoice(data);
    setUpdating(false);
  }

  if (loading) {
    return <div className="bg-white rounded-xl p-12 text-center shadow-sm"><p className="text-text-muted">Loading...</p></div>;
  }

  if (!invoice) {
    return <div className="bg-white rounded-xl p-12 text-center shadow-sm"><p className="text-text-muted">Invoice not found</p></div>;
  }

  return (
    <div>
      <div className="no-print">
        <Link href="/admin/invoices" className="text-green text-sm hover:underline mb-4 inline-block">
          &larr; Back to Invoices
        </Link>

        <div className="flex items-center gap-3 mb-6">
          <h1 className="text-2xl font-bold text-dark" style={{ fontFamily: "var(--font-poppins)" }}>
            {invoice.invoice_number}
          </h1>

          <div className="flex gap-2 ml-auto">
            {invoice.status === "unpaid" && (
              <button
                onClick={() => updateStatus("paid")}
                disabled={updating}
                className="px-4 py-2 rounded-lg text-sm font-medium bg-green text-white hover:bg-green-dark transition-colors shadow-md disabled:opacity-50"
              >
                Mark Paid
              </button>
            )}
            {invoice.status !== "void" && (
              <button
                onClick={() => updateStatus("void")}
                disabled={updating}
                className="px-4 py-2 rounded-lg text-sm font-medium border border-gray-200 hover:border-terracotta hover:text-terracotta transition-colors disabled:opacity-50"
              >
                Void
              </button>
            )}
            <button
              onClick={() => window.print()}
              className="px-4 py-2 rounded-lg text-sm font-medium border border-gray-200 hover:border-green hover:text-green transition-colors"
            >
              Print / Save PDF
            </button>
          </div>
        </div>
      </div>

      <InvoiceView invoice={invoice} />
    </div>
  );
}
