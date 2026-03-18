import Image from "next/image";
import Navbar from "@/components/Navbar";
import BookingWidget from "@/components/BookingWidget";
import TrustBar from "@/components/TrustBar";
import HowItWorks from "@/components/HowItWorks";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
        {/* Background image */}
        <Image
          src="/hero2.jpeg"
          alt="Beautiful clean living room"
          fill
          className="object-cover"
          priority
        />
        {/* Dark overlay + topo pattern */}
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 pattern-topo" />

        {/* Hero content */}
        <div className="relative z-10 text-center px-6 max-w-3xl mx-auto pt-16">
          <h1
            className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight animate-fade-up"
            style={{ fontFamily: "var(--font-poppins)" }}
          >
            House cleaning services in the{" "}
            <span className="text-green">OKC metro area</span>
          </h1>

          <p className="text-white/80 text-lg md:text-xl mb-8 animate-fade-up stagger-1">
            Professional cleaning you can trust. Book online in 60 seconds.
          </p>

          {/* Checkmarks */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 animate-fade-up stagger-2">
            {["Select number of rooms", "See your price", "Schedule in 60 seconds"].map((text) => (
              <div key={text} className="flex items-center gap-2">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2ECC71" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span className="text-white/90 text-sm font-medium">{text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Booking Widget — overlaps hero bottom */}
      <BookingWidget />

      {/* Trust Bar */}
      <div className="pt-8 pattern-pinstripe">
        <TrustBar />
      </div>

      {/* Services Section */}
      <section id="services" className="relative py-20 px-6 bg-white pattern-diamonds pattern-glow-green divider-wave">
        <div className="max-w-6xl mx-auto">
          <h2
            className="text-3xl md:text-5xl font-bold text-center text-dark mb-4"
            style={{ fontFamily: "var(--font-poppins)" }}
          >
            Our Services
          </h2>
          <p className="text-center text-dark/60 mb-14 max-w-md mx-auto">
            We take care of your home so you can focus on what matters
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Standard Clean",
                desc: "Thorough cleaning of all rooms, dusting, vacuuming, mopping, and sanitizing bathrooms & kitchen.",
                icon: (
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#2ECC71" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                    <polyline points="9 22 9 12 15 12 15 22" />
                  </svg>
                ),
              },
              {
                title: "Deep Clean",
                desc: "Everything in Standard plus inside appliances, baseboards, window sills, and detailed scrubbing.",
                icon: (
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#2ECC71" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M8 14s1.5 2 4 2 4-2 4-2" />
                    <line x1="9" y1="9" x2="9.01" y2="9" />
                    <line x1="15" y1="9" x2="15.01" y2="9" />
                  </svg>
                ),
              },
              {
                title: "Move In/Out",
                desc: "Comprehensive top-to-bottom cleaning for empty homes. Perfect for getting your deposit back.",
                icon: (
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#2ECC71" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="1" y="3" width="15" height="13" />
                    <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
                    <circle cx="5.5" cy="18.5" r="2.5" />
                    <circle cx="18.5" cy="18.5" r="2.5" />
                  </svg>
                ),
              },
              {
                title: "Office Cleaning",
                desc: "Keep your workspace professional and hygienic. Flexible scheduling around your business hours.",
                icon: (
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#2ECC71" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                  </svg>
                ),
              },
            ].map((service) => (
              <div
                key={service.title}
                className="bg-gray-light rounded-2xl p-6 hover:shadow-lg transition-shadow group"
              >
                <div className="w-14 h-14 rounded-xl bg-green/10 flex items-center justify-center mb-4 group-hover:bg-green/20 transition-colors">
                  {service.icon}
                </div>
                <h3 className="text-lg font-bold text-dark mb-2">{service.title}</h3>
                <p className="text-sm text-dark/60 leading-relaxed">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <HowItWorks />

      {/* CTA Banner */}
      <section className="relative py-20 px-6 bg-green pattern-herringbone divider-wave divider-wave-dark">
        <div className="max-w-3xl mx-auto text-center">
          <h2
            className="text-3xl md:text-5xl font-bold text-white mb-4"
            style={{ fontFamily: "var(--font-poppins)" }}
          >
            Ready for a spotless home?
          </h2>
          <p className="text-white/80 text-lg mb-8">
            Book your first cleaning today and get 20% off with a weekly plan.
          </p>
          <a
            href="#pricing"
            className="inline-block px-10 py-4 rounded-full bg-white text-green font-bold text-lg hover:shadow-xl hover:-translate-y-1 transition-all"
          >
            Get Your Price →
          </a>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </main>
  );
}
