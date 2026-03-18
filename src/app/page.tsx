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
      <section className="relative pt-16">
        {/* Top area — headline + checkmarks on light bg */}
        <div className="text-center px-6 pt-12 pb-6">
          <h1
            className="text-3xl md:text-5xl lg:text-6xl font-bold text-dark mb-5 leading-tight animate-fade-up"
            style={{ fontFamily: "var(--font-poppins)" }}
          >
            House cleaning services in the{" "}
            <span className="text-green">OKC metro area</span>
          </h1>

          {/* Checkmarks row with dividers */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-0 animate-fade-up stagger-1">
            {["Select number of rooms", "See your price", "Schedule in 60 seconds"].map((text, i) => (
              <div key={text} className="flex items-center">
                {i > 0 && <div className="hidden sm:block w-px h-5 bg-dark/15 mx-5" />}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#5B8A7A" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span className="text-dark/60 text-sm italic">{text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Hero image — full width, no overlay */}
        <div className="relative w-full h-[50vh] md:h-[60vh] lg:h-[65vh] overflow-hidden">
          <Image
            src="/hero3.jpeg"
            alt="Beautiful clean living room"
            fill
            className="object-cover"
            priority
          />
          {/* Very subtle gradient at bottom for depth */}
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/10 to-transparent" />
        </div>
      </section>

      {/* Booking Widget — overlaps hero bottom */}
      <BookingWidget />

      {/* Trust Bar */}
      <div className="pt-8">
        <TrustBar />
      </div>

      {/* Services Section */}
      <section id="services" className="py-20 px-6 bg-white">
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
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#5B8A7A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                    <polyline points="9 22 9 12 15 12 15 22" />
                  </svg>
                ),
              },
              {
                title: "Deep Clean",
                desc: "Everything in Standard plus inside appliances, baseboards, window sills, and detailed scrubbing.",
                icon: (
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#5B8A7A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#5B8A7A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#5B8A7A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
      <section className="py-20 px-6" style={{ background: "linear-gradient(135deg, #5B8A7A 0%, #4A7468 50%, #3D6459 100%)" }}>
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
            className="inline-block px-10 py-4 rounded-full font-bold text-lg hover:shadow-xl hover:-translate-y-1 transition-all"
            style={{ backgroundColor: "#D4A843", color: "#fff" }}
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
