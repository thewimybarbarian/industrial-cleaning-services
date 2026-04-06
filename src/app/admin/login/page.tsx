"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (res.ok) {
        window.location.href = "/admin";
      } else {
        const data = await res.json().catch(() => ({}));
        setError(data.error || "Invalid password");
      }
    } catch {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-dark flex items-center justify-center px-4 relative overflow-hidden">
      {/* Background patterns */}
      <div className="absolute inset-0 pattern-topo pointer-events-none" />
      <div className="absolute inset-0 pattern-glow-dark pointer-events-none" />

      <div className="w-full max-w-sm relative z-10">
        {/* Logo / Brand */}
        <div className="text-center mb-8">
          <img src="/ics-icon-1.png" alt="Industrial Cleaning Services" width={72} height={72} className="mx-auto mb-4 shadow-lg object-contain" />
          <h1
            className="text-2xl font-bold text-white"
            style={{ fontFamily: "var(--font-poppins)" }}
          >
            Industrial Cleaning
          </h1>
          <p className="text-white/40 text-sm mt-1">Admin Dashboard</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
          <label className="block text-sm font-medium text-white/70 mb-2">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-white/10 border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-green/60 focus:border-green"
            placeholder="Enter admin password"
            autoFocus
          />

          {error && (
            <p className="text-terracotta text-sm mt-3">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading || !password}
            className="w-full mt-6 bg-green text-white font-bold py-3 rounded-lg hover:bg-green-dark transition-colors shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <p className="text-center text-white/20 text-xs mt-6">
          industrialcleaning.services
        </p>
      </div>
    </div>
  );
}
