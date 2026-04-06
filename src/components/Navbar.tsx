"use client";

import { useState } from "react";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white/95 backdrop-blur-sm shadow-sm">
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-20">
        {/* Logo */}
        <a href="#">
          <img src="/web-ics-logo-officisl.png" alt="Industrial Cleaning Services" className="h-14 w-auto object-contain" />
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
