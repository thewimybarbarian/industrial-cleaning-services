export default function Footer() {
  return (
    <footer id="contact" className="bg-dark text-white py-16 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-2.5 mb-4">
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
              <span className="text-xl font-bold text-white tracking-tight" style={{ fontFamily: "var(--font-poppins)" }}>
                Industrial
              </span>
              <span className="text-xs font-semibold tracking-[0.2em] uppercase text-green">
                Cleaning Co.
              </span>
            </div>
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
