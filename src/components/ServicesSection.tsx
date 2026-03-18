import Image from "next/image";

const services = [
  {
    num: "01",
    title: "Standard Clean",
    subtitle: "Regular maintenance",
    desc: "Thorough cleaning of all rooms — dusting, vacuuming, mopping, and sanitizing bathrooms & kitchen.",
    image: "/hero3.jpeg",
    span: "md:col-span-7",
  },
  {
    num: "02",
    title: "Deep Clean",
    subtitle: "Our most thorough service",
    desc: "Everything in Standard plus inside appliances, baseboards, window sills, and detailed scrubbing.",
    image: "/kitchen2.png",
    span: "md:col-span-5",
  },
  {
    num: "03",
    title: "Move In/Out",
    subtitle: "Deposit-back guarantee",
    desc: "Comprehensive top-to-bottom cleaning for empty homes. Perfect for getting your deposit back.",
    image: "/dingin2.jpeg",
    span: "md:col-span-5",
  },
  {
    num: "04",
    title: "Office Cleaning",
    subtitle: "After-hours availability",
    desc: "Keep your workspace professional and hygienic. Flexible scheduling around your business hours.",
    image: "/bathroom2.png",
    span: "md:col-span-7",
  },
];

export default function ServicesSection() {
  return (
    <section id="services" className="py-24 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <span className="inline-block text-green text-sm font-semibold tracking-[0.2em] uppercase mb-3">
            What We Offer
          </span>
          <h2
            className="text-3xl md:text-5xl font-bold text-dark mb-5"
            style={{ fontFamily: "var(--font-poppins)" }}
          >
            Our Services
          </h2>
          <div className="flex items-center justify-center gap-2">
            <div className="w-8 h-[2px] bg-green/30 rounded-full" />
            <div className="w-16 h-[2px] bg-gold rounded-full" />
            <div className="w-8 h-[2px] bg-green/30 rounded-full" />
          </div>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-5">
          {services.map((service) => (
            <a
              href="#pricing"
              key={service.num}
              className={`${service.span} group relative h-[320px] md:h-[400px] rounded-2xl overflow-hidden cursor-pointer block`}
            >
              {/* Background image */}
              <Image
                src={service.image}
                alt={service.title}
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              />

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-dark/90 via-dark/40 to-dark/10 transition-opacity duration-500 group-hover:from-dark/95" />

              {/* Shimmer sweep on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none" />

              {/* Number watermark */}
              <span
                className="absolute top-4 right-6 text-[80px] md:text-[100px] font-bold text-white/[0.07] leading-none select-none pointer-events-none"
                style={{ fontFamily: "var(--font-poppins)" }}
              >
                {service.num}
              </span>

              {/* Top-left corner accent */}
              <div className="absolute top-0 left-0 pointer-events-none">
                <div className="w-12 h-[2px] bg-gold/40 rounded-full transition-all duration-700 group-hover:w-20 group-hover:bg-gold" />
                <div className="w-[2px] h-12 bg-gold/40 rounded-full transition-all duration-700 group-hover:h-20 group-hover:bg-gold" />
              </div>

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                {/* Gold accent line + subtitle */}
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-[2px] bg-gold rounded-full transition-all duration-500 group-hover:w-14" />
                  <span className="text-gold/90 text-xs font-semibold tracking-widest uppercase">
                    {service.subtitle}
                  </span>
                </div>

                {/* Title */}
                <h3
                  className="text-2xl md:text-3xl font-bold text-white mb-2 transition-transform duration-500 group-hover:-translate-y-1"
                  style={{ fontFamily: "var(--font-poppins)" }}
                >
                  {service.title}
                </h3>

                {/* Description - reveals on hover */}
                <p className="text-white/60 text-sm leading-relaxed max-w-md translate-y-4 opacity-0 transition-all duration-500 ease-out group-hover:translate-y-0 group-hover:opacity-100">
                  {service.desc}
                </p>

                {/* Arrow - appears on hover */}
                <div className="mt-4 flex items-center gap-2 translate-y-4 opacity-0 transition-all duration-500 delay-100 group-hover:translate-y-0 group-hover:opacity-100">
                  <span className="text-gold text-sm font-semibold">Book this service</span>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#D4A843"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  >
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
