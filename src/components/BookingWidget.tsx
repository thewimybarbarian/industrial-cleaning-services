"use client";

import { useState } from "react";
import { calculatePrice, FREQUENCY_OPTIONS, type FrequencyId } from "@/lib/pricing";
import ScheduleModal from "./ScheduleModal";

export default function BookingWidget() {
  const [activeTab, setActiveTab] = useState<"residential" | "commercial">("residential");

  // Residential state
  const [bedrooms, setBedrooms] = useState(3);
  const [bathrooms, setBathrooms] = useState(2);
  const [livingRooms, setLivingRooms] = useState(1);
  const [diningRooms, setDiningRooms] = useState(1);
  const [offices, setOffices] = useState(0);
  const [stories, setStories] = useState<"single" | "two">("single");
  const [hasPets, setHasPets] = useState(false);
  const [specialNotes, setSpecialNotes] = useState("");

  // Commercial state
  const [commOffices, setCommOffices] = useState(1);
  const [commRestrooms, setCommRestrooms] = useState(1);
  const [commFloors, setCommFloors] = useState(1);
  const [commBreakRooms, setCommBreakRooms] = useState(0);
  const [commConferenceRooms, setCommConferenceRooms] = useState(0);
  const [commSqft, setCommSqft] = useState("");
  const [commSpecialNotes, setCommSpecialNotes] = useState("");

  // Shared state
  const [frequency, setFrequency] = useState<FrequencyId>("weekly");
  const [showModal, setShowModal] = useState(false);

  const price = calculatePrice(bedrooms, bathrooms, frequency);

  return (
    <>
      <div id="pricing" className="relative z-30 max-w-4xl mx-auto -mt-28 md:-mt-56 px-4">
        <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-10">
          {/* Tabs */}
          <div className="flex mb-8 bg-gray-100 rounded-xl p-1">
            <button
              onClick={() => setActiveTab("residential")}
              className={`flex-1 py-3 rounded-lg text-sm font-bold transition-all ${
                activeTab === "residential"
                  ? "bg-green text-white shadow-md"
                  : "text-dark/60 hover:text-dark"
              }`}
            >
              Residential
            </button>
            <button
              onClick={() => setActiveTab("commercial")}
              className={`flex-1 py-3 rounded-lg text-sm font-bold transition-all ${
                activeTab === "commercial"
                  ? "bg-green text-white shadow-md"
                  : "text-dark/60 hover:text-dark"
              }`}
            >
              Commercial
            </button>
          </div>

          {activeTab === "residential" ? (
            <>
              {/* Room sliders */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                {/* Bedrooms */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-semibold text-dark">Bedrooms</span>
                    <span className="text-2xl font-bold text-green">{bedrooms}</span>
                  </div>
                  <input type="range" min={1} max={6} value={bedrooms} onChange={(e) => setBedrooms(Number(e.target.value))} className="w-full" />
                  <div className="flex justify-between text-xs text-text-muted mt-1"><span>1</span><span>6</span></div>
                </div>

                {/* Bathrooms */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-semibold text-dark">Bathrooms</span>
                    <span className="text-2xl font-bold text-green">{bathrooms}</span>
                  </div>
                  <input type="range" min={1} max={4} value={bathrooms} onChange={(e) => setBathrooms(Number(e.target.value))} className="w-full" />
                  <div className="flex justify-between text-xs text-text-muted mt-1"><span>1</span><span>4</span></div>
                </div>

                {/* Living Rooms */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-semibold text-dark">Living Rooms</span>
                    <span className="text-2xl font-bold text-green">{livingRooms}</span>
                  </div>
                  <input type="range" min={0} max={4} value={livingRooms} onChange={(e) => setLivingRooms(Number(e.target.value))} className="w-full" />
                  <div className="flex justify-between text-xs text-text-muted mt-1"><span>0</span><span>4</span></div>
                </div>

                {/* Dining Rooms */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-semibold text-dark">Dining Rooms</span>
                    <span className="text-2xl font-bold text-green">{diningRooms}</span>
                  </div>
                  <input type="range" min={0} max={3} value={diningRooms} onChange={(e) => setDiningRooms(Number(e.target.value))} className="w-full" />
                  <div className="flex justify-between text-xs text-text-muted mt-1"><span>0</span><span>3</span></div>
                </div>

                {/* Offices */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-semibold text-dark">Offices</span>
                    <span className="text-2xl font-bold text-green">{offices}</span>
                  </div>
                  <input type="range" min={0} max={3} value={offices} onChange={(e) => setOffices(Number(e.target.value))} className="w-full" />
                  <div className="flex justify-between text-xs text-text-muted mt-1"><span>0</span><span>3</span></div>
                </div>

                {/* Stories */}
                <div>
                  <span className="block text-sm font-semibold text-dark mb-3">Stories</span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setStories("single")}
                      className={`flex-1 px-4 py-2.5 rounded-lg border-2 text-sm font-medium transition-all ${
                        stories === "single"
                          ? "border-green bg-green/5 text-dark font-semibold"
                          : "border-gray-200 text-dark/70 hover:border-green/40"
                      }`}
                    >
                      Single Story
                    </button>
                    <button
                      onClick={() => setStories("two")}
                      className={`flex-1 px-4 py-2.5 rounded-lg border-2 text-sm font-medium transition-all ${
                        stories === "two"
                          ? "border-green bg-green/5 text-dark font-semibold"
                          : "border-gray-200 text-dark/70 hover:border-green/40"
                      }`}
                    >
                      Two Story
                    </button>
                  </div>
                </div>
              </div>

              {/* Pets toggle */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                <div>
                  <span className="block text-sm font-semibold text-dark mb-3">Pets</span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setHasPets(false)}
                      className={`flex-1 px-4 py-2.5 rounded-lg border-2 text-sm font-medium transition-all ${
                        !hasPets
                          ? "border-green bg-green/5 text-dark font-semibold"
                          : "border-gray-200 text-dark/70 hover:border-green/40"
                      }`}
                    >
                      No
                    </button>
                    <button
                      onClick={() => setHasPets(true)}
                      className={`flex-1 px-4 py-2.5 rounded-lg border-2 text-sm font-medium transition-all ${
                        hasPets
                          ? "border-green bg-green/5 text-dark font-semibold"
                          : "border-gray-200 text-dark/70 hover:border-green/40"
                      }`}
                    >
                      Yes
                    </button>
                  </div>
                </div>
              </div>

              {/* Special Notes */}
              <div className="mb-8">
                <label className="block text-sm font-semibold text-dark mb-3">Special Notes</label>
                <textarea
                  value={specialNotes}
                  onChange={(e) => setSpecialNotes(e.target.value)}
                  rows={3}
                  className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green/40 focus:border-green resize-none"
                  placeholder="Any specific details or areas you'd like us to focus on..."
                />
              </div>
            </>
          ) : (
            <>
              {/* Commercial services list */}
              <div className="mb-8">
                <h3 className="text-lg font-bold text-dark mb-4">Our Commercial Services</h3>
                <div className="space-y-3">
                  {[
                    { title: "Commercial Cleaning", desc: "Offices, retail stores, clinics, and more" },
                    { title: "Office Disinfection", desc: "High-touch surface sanitization & germ elimination" },
                    { title: "Breakroom & Restroom Cleaning", desc: "Deep cleaning and restocking" },
                    { title: "Floor Care", desc: "Vacuuming, sweeping, mopping all floor types" },
                    { title: "After-Hours & Weekend Cleaning", desc: "Flexible scheduling around your business" },
                  ].map((service) => (
                    <div key={service.title} className="flex items-start gap-3 p-3 rounded-lg bg-gray-50">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#5B8A7A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 shrink-0">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      <div>
                        <span className="text-sm font-semibold text-dark">{service.title}</span>
                        <p className="text-xs text-text-muted mt-0.5">{service.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Commercial Special Notes */}
              <div className="mb-8">
                <label className="block text-sm font-semibold text-dark mb-3">Tell us about your space</label>
                <textarea
                  value={commSpecialNotes}
                  onChange={(e) => setCommSpecialNotes(e.target.value)}
                  rows={3}
                  className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green/40 focus:border-green resize-none"
                  placeholder="Type of business, square footage, number of offices/restrooms, specific requirements..."
                />
              </div>
            </>
          )}

          {/* Frequency options + CTA (shared) */}
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="flex flex-wrap gap-3 flex-1 pt-5">
              {FREQUENCY_OPTIONS.map((opt) => (
                <label
                  key={opt.id}
                  className={`relative overflow-visible flex items-center gap-2 px-4 py-2.5 rounded-lg border-2 cursor-pointer transition-all text-sm ${
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
                    <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-10 text-[10px] font-bold text-white bg-green px-2.5 py-0.5 rounded-full whitespace-nowrap shadow-sm">
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
              Schedule Your Estimate
            </button>
          </div>
        </div>
      </div>

      {showModal && (
        <ScheduleModal
          bookingType={activeTab}
          bedrooms={bedrooms}
          bathrooms={bathrooms}
          livingRooms={livingRooms}
          diningRooms={diningRooms}
          offices={offices}
          stories={stories}
          hasPets={hasPets}
          specialNotes={activeTab === "residential" ? specialNotes : commSpecialNotes}
          commOffices={commOffices}
          commRestrooms={commRestrooms}
          commFloors={commFloors}
          commBreakRooms={commBreakRooms}
          commConferenceRooms={commConferenceRooms}
          commSqft={commSqft}
          frequency={frequency}
          price={price}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
}
