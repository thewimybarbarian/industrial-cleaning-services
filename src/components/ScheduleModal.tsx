"use client";

import { useState } from "react";
import type { FrequencyId } from "@/lib/pricing";
import { FREQUENCY_OPTIONS } from "@/lib/pricing";

interface Props {
  bedrooms: number;
  bathrooms: number;
  frequency: FrequencyId;
  price: number;
  onClose: () => void;
}

const TIME_SLOTS = [
  "8:00 AM", "9:00 AM", "10:00 AM", "11:00 AM",
  "12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM",
];

export default function ScheduleModal({ bedrooms, bathrooms, frequency, price, onClose }: Props) {
  const [step, setStep] = useState(1);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [form, setForm] = useState({
    customerName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    zip: "",
    notes: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const freqLabel = FREQUENCY_OPTIONS.find((o) => o.id === frequency)?.label ?? "";

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          bedrooms,
          bathrooms,
          frequency,
          scheduledDate: date,
          scheduledTime: time,
          price,
          ...form,
        }),
      });
      if (res.ok) {
        setSuccess(true);
      }
    } catch {
      alert("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split("T")[0];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between rounded-t-2xl z-10">
          <h2 className="text-xl font-bold text-dark" style={{ fontFamily: "var(--font-poppins)" }}>
            {success ? "You're booked!" : step === 1 ? "Pick a date & time" : "Your details"}
          </h2>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-dark/60 hover:bg-gray-200 transition-colors"
          >
            ✕
          </button>
        </div>

        <div className="p-6">
          {success ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 rounded-full bg-green/10 flex items-center justify-center mx-auto mb-4">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#5B8A7A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-dark mb-2">You&apos;re all set!</h3>
              <p className="text-dark/60 mb-6">
                We&apos;ll send a confirmation to your email. See you soon!
              </p>
              <div className="bg-gray-light rounded-xl p-4 text-left text-sm space-y-1">
                <p><strong>Date:</strong> {date}</p>
                <p><strong>Time:</strong> {time}</p>
                <p><strong>Home:</strong> {bedrooms} bed / {bathrooms} bath &middot; {freqLabel}</p>
                <p><strong>Price:</strong> ${price}.00 per visit</p>
              </div>
              <button
                onClick={onClose}
                className="mt-6 px-8 py-3 rounded-xl bg-green text-white font-bold hover:bg-green-dark transition-colors"
              >
                Done
              </button>
            </div>
          ) : step === 1 ? (
            <>
              <div className="bg-gray-light rounded-xl p-4 mb-6 text-sm text-dark/80">
                <span className="font-bold">{bedrooms} bed</span> &middot;{" "}
                <span className="font-bold">{bathrooms} bath</span> &middot;{" "}
                <span className="font-bold">{freqLabel}</span> &middot;{" "}
                <span className="font-bold text-green">${price}/visit</span>
              </div>

              <label className="block mb-1 text-sm font-semibold text-dark">Preferred Date</label>
              <input
                type="date"
                min={minDate}
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-4 py-3 mb-6 text-sm focus:outline-none focus:ring-2 focus:ring-green/40 focus:border-green"
              />

              <label className="block mb-2 text-sm font-semibold text-dark">Preferred Time</label>
              <div className="grid grid-cols-3 gap-2 mb-6">
                {TIME_SLOTS.map((slot) => (
                  <button
                    key={slot}
                    onClick={() => setTime(slot)}
                    className={`px-3 py-2.5 rounded-lg text-sm font-medium border-2 transition-all ${
                      time === slot
                        ? "border-green bg-green/10 text-green"
                        : "border-gray-200 text-dark/70 hover:border-green/40"
                    }`}
                  >
                    {slot}
                  </button>
                ))}
              </div>

              <button
                onClick={() => setStep(2)}
                disabled={!date || !time}
                className="w-full py-3.5 rounded-xl bg-green text-white font-bold hover:bg-green-dark transition-colors disabled:opacity-40 disabled:cursor-not-allowed shadow-lg"
              >
                Continue
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setStep(1)}
                className="text-sm text-green font-medium mb-4 flex items-center gap-1 hover:underline"
              >
                ← Back
              </button>

              <div className="space-y-4">
                <div>
                  <label className="block mb-1 text-sm font-semibold text-dark">Full Name *</label>
                  <input
                    type="text"
                    value={form.customerName}
                    onChange={(e) => setForm({ ...form, customerName: e.target.value })}
                    className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green/40 focus:border-green"
                    placeholder="Jane Smith"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block mb-1 text-sm font-semibold text-dark">Email *</label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green/40 focus:border-green"
                      placeholder="jane@email.com"
                    />
                  </div>
                  <div>
                    <label className="block mb-1 text-sm font-semibold text-dark">Phone *</label>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green/40 focus:border-green"
                      placeholder="(405) 555-1234"
                    />
                  </div>
                </div>

                <div>
                  <label className="block mb-1 text-sm font-semibold text-dark">Street Address *</label>
                  <input
                    type="text"
                    value={form.address}
                    onChange={(e) => setForm({ ...form, address: e.target.value })}
                    className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green/40 focus:border-green"
                    placeholder="123 Main St"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block mb-1 text-sm font-semibold text-dark">City *</label>
                    <input
                      type="text"
                      value={form.city}
                      onChange={(e) => setForm({ ...form, city: e.target.value })}
                      className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green/40 focus:border-green"
                      placeholder="Oklahoma City"
                    />
                  </div>
                  <div>
                    <label className="block mb-1 text-sm font-semibold text-dark">ZIP *</label>
                    <input
                      type="text"
                      value={form.zip}
                      onChange={(e) => setForm({ ...form, zip: e.target.value })}
                      className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green/40 focus:border-green"
                      placeholder="73101"
                    />
                  </div>
                </div>

                <div>
                  <label className="block mb-1 text-sm font-semibold text-dark">Anything we should know?</label>
                  <textarea
                    value={form.notes}
                    onChange={(e) => setForm({ ...form, notes: e.target.value })}
                    rows={3}
                    className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green/40 focus:border-green resize-none"
                    placeholder="Gate code, pets, areas to focus on..."
                  />
                </div>
              </div>

              <div className="bg-gray-light rounded-xl p-4 mt-6 text-sm space-y-1">
                <p className="text-dark/70"><strong>Date:</strong> {date} at {time}</p>
                <p className="text-dark/70"><strong>Home:</strong> {bedrooms} bed / {bathrooms} bath</p>
                <p className="text-lg font-bold text-green">${price}.00 per visit</p>
              </div>

              <button
                onClick={handleSubmit}
                disabled={submitting || !form.customerName || !form.email || !form.phone || !form.address || !form.city || !form.zip}
                className="w-full mt-6 py-3.5 rounded-xl bg-green text-white font-bold hover:bg-green-dark transition-colors disabled:opacity-40 disabled:cursor-not-allowed shadow-lg"
              >
                {submitting ? "Booking..." : "Confirm Booking"}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
