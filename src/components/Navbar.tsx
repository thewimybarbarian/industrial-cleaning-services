"use client";

import { useState } from "react";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white/95 backdrop-blur-sm shadow-sm">
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-green flex items-center justify-center">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
          </div>
          <span className="text-lg font-bold text-dark" style={{ fontFamily: "var(--font-poppins)" }}>
            Industrial Cleaning
          </span>
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
            Get a Quote
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
            Get a Quote
          </a>
        </div>
      )}
    </nav>
  );
}
