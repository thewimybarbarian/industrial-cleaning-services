import Image from "next/image";

const steps = [
  {
    title: "Book",
    description: "Select your options and schedule online in under 60 seconds.",
    image: "/dingin2.jpeg",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
      </svg>
    ),
  },
  {
    title: "Clean",
    description: "Our professional team arrives and handles everything top to bottom.",
    image: "/kitchen2.png",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
  },
  {
    title: "Relax",
    description: "Come home to a spotless house. It's that simple.",
    image: "/bathroom2.png",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    ),
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 px-6 bg-gray-light">
      <div className="max-w-6xl mx-auto">
        <h2
          className="text-3xl md:text-5xl font-bold text-center text-dark mb-4"
          style={{ fontFamily: "var(--font-poppins)" }}
        >
          How it works
        </h2>
        <p className="text-center text-dark/60 mb-14 max-w-md mx-auto">
          Getting a clean home has never been easier
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, i) => (
            <div
              key={step.title}
              className={`animate-fade-up stagger-${i + 1} group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow`}
            >
              {/* Image */}
              <div className="relative h-52 overflow-hidden">
                <Image
                  src={step.image}
                  alt={step.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              </div>

              {/* Icon badge */}
              <div className="absolute top-44 left-1/2 -translate-x-1/2 w-14 h-14 rounded-full bg-green flex items-center justify-center shadow-lg border-4 border-white">
                {step.icon}
              </div>

              {/* Text */}
              <div className="pt-10 pb-6 px-6 text-center">
                <h3 className="text-xl font-bold text-dark mb-2 uppercase tracking-wide">{step.title}</h3>
                <p className="text-dark/60 text-sm leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
