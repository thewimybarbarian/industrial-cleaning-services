import Image from "next/image";

const services = [
  {
    num: "01",
    title: "Residential Cleaning",
    subtitle: "Your home, handled",
    desc: "Regular house cleaning tailored to your space. We treat every home like our own.",
    image: "/residential.jpeg",
    span: "md:col-span-7",
    height: "h-[320px] md:h-[400px]",
  },
  {
    num: "02",
    title: "Commercial Cleaning",
    subtitle: "After hours, no hassle",
    desc: "Retail spaces, restaurants, and storefronts kept spotless so you can focus on business.",
    image: "/commercial.jpeg",
    span: "md:col-span-5",
    height: "h-[320px] md:h-[400px]",
  },
  {
    num: "03",
    title: "Deep Cleaning",
    subtitle: "The full treatment",
    desc: "Inside appliances, baseboards, window sills — every detail scrubbed and sanitized.",
    image: "/deep.jpeg",
    span: "md:col-span-4",
    height: "h-[280px] md:h-[340px]",
  },
  {
    num: "04",
    title: "Office Cleaning",
    subtitle: "Professional spaces",
    desc: "Desks, breakrooms, restrooms, and common areas. Flexible scheduling around your hours.",
    image: "/office.jpeg",
    span: "md:col-span-4",
    height: "h-[280px] md:h-[340px]",
  },
  {
    num: "05",
    title: "Disinfecting Service",
    subtitle: "Health & safety first",
    desc: "Hospital-grade disinfection for homes, offices, and shared spaces. Peace of mind included.",
    image: "/disinfect.jpeg",
    span: "md:col-span-4",
    height: "h-[280px] md:h-[340px]",
  },
  {
    num: "06",
    title: "Move-In Cleaning",
    subtitle: "Fresh start",
    desc: "Start your new chapter in a spotless home. We'll have it ready before you unpack.",
    image: "/move-in.jpeg",
    span: "md:col-span-6",
    height: "h-[300px] md:h-[360px]",
  },
  {
    num: "07",
    title: "Move-Out Cleaning",
    subtitle: "Get your deposit back",
    desc: "Top-to-bottom cleaning for empty homes. Landlord-approved results every time.",
    image: "/move-out.jpeg",
    span: "md:col-span-6",
    height: "h-[300px] md:h-[360px]",
  },
];

export default function ServicesSection() {
  return (
    <section id="services" className="py-24 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <span className="inline-block text-green text-sm font-semibold tracking-[0.2em] uppercase mb-3">
            What We Do
          </span>
          <h2
            className="text-3xl md:text-5xl font-bold text-dark mb-5"
            style={{ fontFamily: "var(--font-poppins)" }}
          >
            We clean. You relax.
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
              className={`${service.span} group relative ${service.height} rounded-2xl overflow-hidden cursor-pointer block`}
            >
              <Image
                src={service.image}
                alt={service.title}
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark/90 via-dark/40 to-dark/10" />
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none" />

              <span
                className="absolute top-4 right-6 text-[70px] md:text-[90px] font-bold text-white/[0.07] leading-none select-none pointer-events-none"
                style={{ fontFamily: "var(--font-poppins)" }}
              >
                {service.num}
              </span>

              <div className="absolute top-0 left-0 pointer-events-none">
                <div className="w-10 h-[2px] bg-gold/40 rounded-full transition-all duration-700 group-hover:w-16 group-hover:bg-gold" />
                <div className="w-[2px] h-10 bg-gold/40 rounded-full transition-all duration-700 group-hover:h-16 group-hover:bg-gold" />
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-5 md:p-7">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-6 h-[2px] bg-gold rounded-full transition-all duration-500 group-hover:w-12" />
                  <span className="text-gold/90 text-xs font-semibold tracking-widest uppercase">
                    {service.subtitle}
                  </span>
                </div>

                <h3
                  className="text-xl md:text-2xl font-bold text-white mb-1 transition-transform duration-500 group-hover:-translate-y-1"
                  style={{ fontFamily: "var(--font-poppins)" }}
                >
                  {service.title}
                </h3>

                <p className="text-white/60 text-sm leading-relaxed max-w-sm translate-y-3 opacity-0 transition-all duration-500 ease-out group-hover:translate-y-0 group-hover:opacity-100">
                  {service.desc}
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
