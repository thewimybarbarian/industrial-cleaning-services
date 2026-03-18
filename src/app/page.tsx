import Image from "next/image";
import Navbar from "@/components/Navbar";
import BookingWidget from "@/components/BookingWidget";
import TrustBar from "@/components/TrustBar";
import ServicesSection from "@/components/ServicesSection";
import HowItWorks from "@/components/HowItWorks";
import Reviews from "@/components/Reviews";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-16">
        <div className="text-center px-6 pt-12 pb-6">
          <h1
            className="text-3xl md:text-5xl lg:text-6xl font-bold text-dark mb-5 leading-tight animate-fade-up"
            style={{ fontFamily: "var(--font-poppins)" }}
          >
            We clean. <span className="text-green">You relax.</span>
          </h1>

          <p className="text-dark/60 text-lg md:text-xl mb-6 max-w-lg mx-auto animate-fade-up stagger-1">
            Trusted house cleaning for homes and businesses across the OKC metro.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-0 animate-fade-up stagger-2">
            {["Book in 60 seconds", "Licensed & insured", "Satisfaction guaranteed"].map((text, i) => (
              <div key={text} className="flex items-center">
                {i > 0 && <div className="hidden sm:block w-px h-5 bg-dark/15 mx-5" />}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#5B8A7A" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span className="text-dark/60 text-sm">{text}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="relative w-full h-[50vh] md:h-[60vh] lg:h-[65vh] overflow-hidden">
          <Image
            src="/hero3.jpeg"
            alt="Beautiful clean living room"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/10 to-transparent" />
        </div>
      </section>

      {/* Booking Widget */}
      <BookingWidget />

      {/* Trust Bar */}
      <div className="pt-8">
        <TrustBar />
      </div>

      {/* Services */}
      <ServicesSection />

      {/* How It Works */}
      <HowItWorks />

      {/* Reviews */}
      <Reviews />

      {/* CTA Banner */}
      <section className="py-20 px-6" style={{ background: "linear-gradient(135deg, #5B8A7A 0%, #4A7468 50%, #3D6459 100%)" }}>
        <div className="max-w-3xl mx-auto text-center">
          <h2
            className="text-3xl md:text-5xl font-bold text-white mb-4"
            style={{ fontFamily: "var(--font-poppins)" }}
          >
            Your home deserves it.
          </h2>
          <p className="text-white/80 text-lg mb-8">
            Book your first cleaning today and save 20% with a weekly plan.
          </p>
          <a
            href="#pricing"
            className="inline-block px-10 py-4 rounded-full font-bold text-lg hover:shadow-xl hover:-translate-y-1 transition-all"
            style={{ backgroundColor: "#D4A843", color: "#fff" }}
          >
            Get Your Price
          </a>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </main>
  );
}
