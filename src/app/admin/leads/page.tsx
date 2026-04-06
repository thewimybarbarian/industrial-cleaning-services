"use client";

import { useEffect, useState } from "react";
import LeadCard from "@/components/admin/LeadCard";
import StatsCards from "@/components/admin/StatsCards";
import type { LeadRow } from "@/lib/types";

export default function LeadsPage() {
  const [leads, setLeads] = useState<LeadRow[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLeads();
  }, []);

  async function fetchLeads() {
    setLoading(true);
    const params = new URLSearchParams();
    if (search) params.set("search", search);

    const res = await fetch(`/api/admin/leads?${params}`);
    const data = await res.json();
    setLeads(Array.isArray(data) ? data : []);
    setLoading(false);
  }

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    fetchLeads();
  }

  const totalSpent = leads.reduce((sum, l) => sum + l.total_spent, 0);
  const avgBookings = leads.length
    ? Math.round((leads.reduce((sum, l) => sum + l.total_bookings, 0) / leads.length) * 10) / 10
    : 0;

  return (
    <div>
      <h1
        className="text-2xl font-bold text-dark mb-6"
        style={{ fontFamily: "var(--font-poppins)" }}
      >
        Leads
      </h1>

      <StatsCards
        stats={[
          { label: "Total Contacts", value: leads.length },
          { label: "Lifetime Revenue", value: `$${totalSpent}` },
          { label: "Avg Bookings", value: avgBookings, sub: "Per customer" },
        ]}
      />

      <form onSubmit={handleSearch} className="flex gap-2 max-w-sm mb-6">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search name or email..."
          className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green/40 focus:border-green"
        />
        <button
          type="submit"
          className="bg-green text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-dark transition-colors"
        >
          Search
        </button>
      </form>

      {loading ? (
        <div className="bg-white rounded-xl p-12 text-center shadow-sm">
          <p className="text-text-muted">Loading leads...</p>
        </div>
      ) : leads.length === 0 ? (
        <div className="bg-white rounded-xl p-12 text-center shadow-sm">
          <p className="text-text-muted">No leads found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {leads.map((lead) => (
            <LeadCard key={lead.id} lead={lead} />
          ))}
        </div>
      )}
    </div>
  );
}
