"use client";

import { useState } from "react";
import { calculatePrice, FREQUENCY_OPTIONS, type FrequencyId } from "@/lib/pricing";
import ScheduleModal from "./ScheduleModal";

export default function BookingWidget() {
  const [bedrooms, setBedrooms] = useState(3);
  const [bathrooms, setBathrooms] = useState(2);
  const [frequency, setFrequency] = useState<FrequencyId>("weekly");
  const [showModal, setShowModal] = useState(false);

  const price = calculatePrice(bedrooms, bathrooms, frequency);

  return (
    <>
      <div id="pricing" className="relative z-30 max-w-4xl mx-auto -mt-28 md:-mt-56 px-4">
        <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-10">
          {/* Sliders row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {/* Bedrooms */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-semibold text-dark">Bedrooms</span>
                <span className="text-2xl font-bold text-green">{bedrooms}</span>
              </div>
              <input
                type="range"
                min={1}
                max={6}
                value={bedrooms}
                onChange={(e) => setBedrooms(Number(e.target.value))}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-text-muted mt-1">
                <span>1</span>
                <span>6</span>
              </div>
            </div>

            {/* Bathrooms */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-semibold text-dark">Bathrooms</span>
                <span className="text-2xl font-bold text-green">{bathrooms}</span>
              </div>
              <input
                type="range"
                min={1}
                max={4}
                value={bathrooms}
                onChange={(e) => setBathrooms(Number(e.target.value))}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-text-muted mt-1">
                <span>1</span>
                <span>4</span>
              </div>
            </div>
          </div>

          {/* Frequency options + CTA */}
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="flex flex-wrap gap-3 flex-1 pt-5">
              {FREQUENCY_OPTIONS.map((opt) => (
                <label
                  key={opt.id}
                  className={`relative flex items-center gap-2 px-4 py-2.5 rounded-lg border-2 cursor-pointer transition-all text-sm ${
                    frequency === opt.id
                      ? "border-green bg-green/5 text-dark font-semibold"
                      : "border-gray-200 text-dark/70 hover:border-green/40"
                  }`}
                >
                  <input
                    type="radio"
                    name="frequency"
                    value={opt.id}
                    checked={frequency === opt.id}
                    onChange={() => setFrequency(opt.id)}
                    className="sr-only"
                  />
                  <div
                    className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                      frequency === opt.id ? "border-green" : "border-gray-300"
                    }`}
                  >
                    {frequency === opt.id && <div className="w-2 h-2 rounded-full bg-green" />}
                  </div>
                  <span>{opt.label}</span>
                  {opt.discount > 0 && (
                    <span className="text-xs text-green font-semibold">
                      {Math.round(opt.discount * 100)}% off
                    </span>
                  )}
                  {"badge" in opt && opt.badge && (
                    <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 text-[10px] font-bold text-green bg-green/10 px-2 py-0.5 rounded-full whitespace-nowrap">
                      {opt.badge}
                    </span>
                  )}
                </label>
              ))}
            </div>

            {/* CTA */}
            <button
              onClick={() => setShowModal(true)}
              className="w-full md:w-auto shrink-0 px-8 py-4 rounded-xl bg-green text-white font-bold text-base hover:bg-green-dark transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:scale-[0.98]"
            >
              Schedule your clean
              <span className="block text-sm font-normal opacity-90">
                ${price}.00 per visit
              </span>
            </button>
          </div>
        </div>
      </div>

      {showModal && (
        <ScheduleModal
          bedrooms={bedrooms}
          bathrooms={bathrooms}
          frequency={frequency}
          price={price}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
}
