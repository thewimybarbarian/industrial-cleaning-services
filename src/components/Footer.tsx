export default function Footer() {
  return (
    <footer id="contact" className="bg-dark text-white py-16 px-6 pattern-crosshatch pattern-glow-dark">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-full bg-green flex items-center justify-center">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
              </svg>
            </div>
            <span className="text-lg font-bold" style={{ fontFamily: "var(--font-poppins)" }}>
              Industrial Cleaning
            </span>
          </div>
          <p className="text-white/60 text-sm leading-relaxed max-w-xs">
            Professional house cleaning services in the Oklahoma City metro area. Licensed, bonded, and insured.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-bold text-sm uppercase tracking-wider mb-4 text-white/80">Quick Links</h3>
          <ul className="space-y-2 text-sm text-white/60">
            <li><a href="#services" className="hover:text-green transition-colors">Services</a></li>
            <li><a href="#how-it-works" className="hover:text-green transition-colors">How It Works</a></li>
            <li><a href="#pricing" className="hover:text-green transition-colors">Pricing</a></li>
            <li><a href="#contact" className="hover:text-green transition-colors">Contact</a></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="font-bold text-sm uppercase tracking-wider mb-4 text-white/80">Contact Us</h3>
          <ul className="space-y-3 text-sm text-white/60">
            <li className="flex items-center gap-2">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              <a href="tel:+14055551234" className="hover:text-green transition-colors">(405) 555-1234</a>
            </li>
            <li className="flex items-center gap-2">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
              <a href="mailto:info@industrialcleaningokc.com" className="hover:text-green transition-colors">info@industrialcleaningokc.com</a>
            </li>
            <li className="flex items-start gap-2">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <span>Oklahoma City Metro Area</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-6xl mx-auto mt-12 pt-6 border-t border-white/10 text-center text-xs text-white/40">
        &copy; {new Date().getFullYear()} Industrial Cleaning Services. All rights reserved.
      </div>
    </footer>
  );
}
