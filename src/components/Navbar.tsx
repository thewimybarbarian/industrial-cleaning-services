"use client";

import { useState } from "react";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white/95 backdrop-blur-sm shadow-sm">
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2.5">
          <svg width="44" height="44" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="2" y="2" width="44" height="44" rx="12" fill="#5B8A7A" />
            <path d="M14 34 C14 34 14 18 30 12 C30 12 32 28 18 34" fill="#FAF8F5" opacity="0.9" />
            <path d="M14 34 C14 34 20 26 30 12" stroke="#4A7468" strokeWidth="1.5" fill="none" />
            <circle cx="34" cy="14" r="1.5" fill="#D4A843" />
            <line x1="34" y1="10" x2="34" y2="18" stroke="#D4A843" strokeWidth="1" strokeLinecap="round" />
            <line x1="30" y1="14" x2="38" y2="14" stroke="#D4A843" strokeWidth="1" strokeLinecap="round" />
            <circle cx="28" cy="20" r="0.8" fill="#D4A843" opacity="0.6" />
          </svg>
          <div className="flex flex-col leading-none">
            <span className="text-xl font-bold text-dark tracking-tight" style={{ fontFamily: "var(--font-poppins)" }}>
              Industrial
            </span>
            <span className="text-xs font-semibold tracking-[0.2em] uppercase" style={{ color: "#5B8A7A" }}>
              Cleaning Co.
            </span>
          </div>
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-dark/80">
          <a href="#services" className="hover:text-green transition-colors">Services</a>
          <a href="#how-it-works" className="hover:text-green transition-colors">How It Works</a>
          <a href="#pricing" className="hover:text-green transition-colors">Pricing</a>
          <a href="#contact" className="hover:text-green transition-colors">Contact</a>
          <a
            href="#pricing"
            className="px-5 py-2.5 rounded-full bg-green text-white font-semibold text-sm hover:bg-green-dark transition-colors shadow-md hover:shadow-lg"
          >
            Book a Cleaning
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden flex flex-col gap-1.5 p-2"
          aria-label="Toggle menu"
        >
          <span className={`w-6 h-0.5 bg-dark transition-transform ${mobileOpen ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`w-6 h-0.5 bg-dark transition-opacity ${mobileOpen ? "opacity-0" : ""}`} />
          <span className={`w-6 h-0.5 bg-dark transition-transform ${mobileOpen ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t px-6 py-4 flex flex-col gap-4 text-sm font-medium text-dark/80">
          <a href="#services" onClick={() => setMobileOpen(false)} className="hover:text-green">Services</a>
          <a href="#how-it-works" onClick={() => setMobileOpen(false)} className="hover:text-green">How It Works</a>
          <a href="#pricing" onClick={() => setMobileOpen(false)} className="hover:text-green">Pricing</a>
          <a href="#contact" onClick={() => setMobileOpen(false)} className="hover:text-green">Contact</a>
          <a
            href="#pricing"
            onClick={() => setMobileOpen(false)}
            className="px-5 py-2.5 rounded-full bg-green text-white font-semibold text-center shadow-md"
          >
            Book a Cleaning
          </a>
        </div>
      )}
    </nav>
  );
}
