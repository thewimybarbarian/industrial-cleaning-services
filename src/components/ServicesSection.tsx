"use client";

import Image from "next/image";
import { useState, useRef, useEffect } from "react";

/* ─── Service card data (bento grid) ─── */
const services = [
  {
    num: "01",
    id: "regular",
    title: "Regular Cleaning",
    subtitle: "Your home, handled",
    desc: "Keep your home fresh, clean, and organized with our reliable recurring cleaning service.",
    image: "/residential.jpeg",
    span: "md:col-span-7",
    height: "h-[320px] md:h-[400px]",
  },
  {
    num: "02",
    id: "commercial",
    title: "Commercial Cleaning",
    subtitle: "After hours, no hassle",
    desc: "We keep your business clean, organized, and presentable for both employees and customers.",
    image: "/commercial.jpeg",
    span: "md:col-span-5",
    height: "h-[320px] md:h-[400px]",
  },
  {
    num: "03",
    id: "deep",
    title: "Deep Cleaning",
    subtitle: "The full treatment",
    desc: "Perfect for homes that need extra attention, first-time cleanings, or a full reset.",
    image: "/deep.jpeg",
    span: "md:col-span-4",
    height: "h-[280px] md:h-[340px]",
  },
  {
    num: "04",
    id: "disinfection",
    title: "Office Disinfection",
    subtitle: "Health & safety first",
    desc: "Protect your employees and clients with our detailed disinfection service.",
    image: "/office.jpeg",
    span: "md:col-span-4",
    height: "h-[280px] md:h-[340px]",
  },
  {
    num: "05",
    id: "movein",
    title: "Move-In Cleaning",
    subtitle: "Fresh start",
    desc: "Start fresh in your new home with a detailed and spotless cleaning before you move in.",
    image: "/move-in.jpeg",
    span: "md:col-span-4",
    height: "h-[280px] md:h-[340px]",
  },
  {
    num: "06",
    id: "moveout",
    title: "Move-Out Cleaning",
    subtitle: "Get your deposit back",
    desc: "Leave your home spotless and ready for the next occupant. Perfect for tenants, landlords, and property managers.",
    image: "/move-out.jpeg",
    span: "md:col-span-6",
    height: "h-[300px] md:h-[360px]",
  },
  {
    num: "07",
    id: "airbnb",
    title: "Airbnb Cleaning",
    subtitle: "Turnover ready",
    desc: "Fast, thorough turnovers between guests. Fresh linens, spotless bathrooms, and five-star reviews every stay.",
    image: "/airbnb.jpeg",
    span: "md:col-span-6",
    height: "h-[300px] md:h-[360px]",
  },
];

/* ─── Detailed service content (checklist panels) ─── */
type ServiceCategory = {
  icon: string;
  title: string;
  items: string[];
};

type ServiceDetail = {
  intro?: string;
  categories: ServiceCategory[];
  footer?: { icon: string; title: string; items: string[] };
};

const serviceDetails: Record<string, ServiceDetail> = {
  regular: {
    categories: [
      {
        icon: "🛏️",
        title: "Bedrooms & Living Areas",
        items: [
          "Dusting all surfaces",
          "Vacuuming carpets and rugs",
          "Sweeping & mopping floors",
          "Making beds (optional)",
          "Cleaning mirrors",
        ],
      },
      {
        icon: "🍽️",
        title: "Kitchen",
        items: [
          "Wiping countertops",
          "Cleaning sink & faucet",
          "Exterior cleaning of appliances",
          "Light cabinet cleaning (outside)",
          "Taking out trash",
        ],
      },
      {
        icon: "🚿",
        title: "Bathrooms",
        items: [
          "Cleaning toilets, showers, and tubs",
          "Wiping sinks and countertops",
          "Cleaning mirrors",
          "Disinfecting high-touch surfaces",
        ],
      },
    ],
    footer: {
      icon: "🔄",
      title: "Recommended Frequency",
      items: ["Weekly", "Bi-weekly", "Monthly"],
    },
  },

  deep: {
    intro: "Everything in Regular Cleaning PLUS:",
    categories: [
      {
        icon: "🛏️",
        title: "Bedrooms & Living Areas",
        items: [
          "Detailed dusting (baseboards, blinds, vents)",
          "Cleaning doors, frames & light switches",
          "Vacuuming under furniture (if accessible)",
        ],
      },
      {
        icon: "🍽️",
        title: "Kitchen",
        items: [
          "Deep cleaning of appliances exterior",
          "Cleaning inside microwave",
          "Detailed cabinet cleaning (outside)",
          "Grease removal from surfaces",
        ],
      },
      {
        icon: "🚿",
        title: "Bathrooms",
        items: [
          "Deep scrubbing of showers & tubs",
          "Removing soap scum & buildup",
          "Detailed tile and grout cleaning",
        ],
      },
      {
        icon: "🧽",
        title: "Additional Details",
        items: [
          "Baseboards cleaned",
          "Window sills & tracks",
          "Hard-to-reach areas",
        ],
      },
    ],
  },

  commercial: {
    intro:
      "Perfect for offices, retail stores, clinics, and more.",
    categories: [
      {
        icon: "🧑‍💼",
        title: "Offices & Work Areas",
        items: [
          "Dusting desks and all surfaces",
          "Cleaning common areas",
          "Vacuuming carpets",
          "Sweeping & mopping floors",
          "Interior glass cleaning",
        ],
      },
      {
        icon: "🚻",
        title: "Restrooms",
        items: [
          "Cleaning and disinfecting toilets",
          "Cleaning sinks and mirrors",
          "Restocking supplies (if provided)",
          "Disinfecting all surfaces",
        ],
      },
      {
        icon: "🍽️",
        title: "Breakroom / Kitchen Areas",
        items: [
          "Cleaning tables and countertops",
          "Light cleaning of microwave (inside & outside)",
          "Cleaning sinks",
          "Taking out trash",
        ],
      },
      {
        icon: "🗑️",
        title: "General Cleaning",
        items: [
          "Emptying trash bins",
          "Replacing trash bags",
          "Disinfecting high-touch areas (doors, handles, switches)",
        ],
      },
    ],
    footer: {
      icon: "🕐",
      title: "Flexible Scheduling",
      items: ["Daily", "Weekly", "After-hours cleaning", "Weekend services"],
    },
  },

  disinfection: {
    intro:
      "We focus on eliminating germs, bacteria, and viruses in high-touch areas to maintain a safe and healthy workplace.",
    categories: [
      {
        icon: "🧑‍💼",
        title: "Workstations & Offices",
        items: [
          "Disinfecting desks, chairs, and surfaces",
          "Cleaning keyboards, phones, and equipment (light wipe)",
          "Disinfecting door handles and light switches",
        ],
      },
      {
        icon: "🚻",
        title: "Restrooms",
        items: [
          "Deep disinfection of toilets, sinks, and faucets",
          "Sanitizing all high-touch surfaces",
          "Mirror and fixture cleaning",
        ],
      },
      {
        icon: "🍽️",
        title: "Breakrooms / Kitchens",
        items: [
          "Disinfecting countertops and tables",
          "Cleaning sinks and appliance handles",
          "Disinfecting shared surfaces",
        ],
      },
      {
        icon: "🦠",
        title: "High-Touch Areas",
        items: [
          "Door handles & knobs",
          "Light switches",
          "Handrails",
          "Elevator buttons",
          "Shared equipment",
        ],
      },
      {
        icon: "🧴",
        title: "Products We Use",
        items: [
          "Professional-grade disinfectants",
          "Safe and effective cleaning solutions",
          "Products designed to kill germs and bacteria",
        ],
      },
    ],
    footer: {
      icon: "🕐",
      title: "Service Options",
      items: [
        "One-time disinfection",
        "Recurring service (daily, weekly)",
        "After-hours availability",
      ],
    },
  },

  movein: {
    categories: [
      {
        icon: "🛏️",
        title: "Bedrooms & Living Areas",
        items: [
          "Dusting all surfaces",
          "Vacuuming carpets",
          "Sweeping & mopping floors",
          "Cleaning baseboards and corners",
          "Wiping doors, frames, and light switches",
        ],
      },
      {
        icon: "🍽️",
        title: "Kitchen",
        items: [
          "Cleaning countertops and backsplash",
          "Deep cleaning of sink and faucet",
          "Cleaning inside & outside cabinets and drawers",
          "Cleaning inside microwave",
          "Exterior cleaning of appliances",
        ],
      },
      {
        icon: "🚿",
        title: "Bathrooms",
        items: [
          "Deep cleaning toilets, showers, and tubs",
          "Cleaning sinks, mirrors, and countertops",
          "Disinfecting all surfaces",
          "Removing buildup and residue",
        ],
      },
      {
        icon: "🧽",
        title: "Extra Attention",
        items: [
          "Inside cabinets & closets",
          "Corners and hard-to-reach areas",
          "Dust and debris removal",
        ],
      },
    ],
  },

  moveout: {
    categories: [
      {
        icon: "🛏️",
        title: "Bedrooms & Living Areas",
        items: [
          "Dusting all surfaces",
          "Vacuuming carpets",
          "Sweeping & mopping floors",
          "Cleaning baseboards, corners, and edges",
          "Wiping doors, frames, and light switches",
        ],
      },
      {
        icon: "🍽️",
        title: "Kitchen",
        items: [
          "Cleaning countertops and backsplash",
          "Deep cleaning sink and faucet",
          "Cleaning inside & outside cabinets and drawers",
          "Cleaning inside microwave",
          "Exterior cleaning of appliances",
        ],
      },
      {
        icon: "🚿",
        title: "Bathrooms",
        items: [
          "Deep cleaning toilets, showers, and tubs",
          "Cleaning sinks, mirrors, and countertops",
          "Disinfecting all surfaces",
          "Removing buildup and residue",
        ],
      },
      {
        icon: "🧽",
        title: "Extra Attention",
        items: [
          "Inside cabinets and closets",
          "Hard-to-reach areas",
          "Removing dust, dirt, and leftover debris",
        ],
      },
    ],
  },

  airbnb: {
    intro:
      "Fast, thorough turnovers between guests so you never miss a booking.",
    categories: [
      {
        icon: "🛏️",
        title: "Bedrooms & Living Areas",
        items: [
          "Dusting all surfaces",
          "Vacuuming carpets and rugs",
          "Sweeping & mopping floors",
          "Making beds with fresh linens",
          "Cleaning mirrors",
        ],
      },
      {
        icon: "🍽️",
        title: "Kitchen",
        items: [
          "Cleaning countertops and backsplash",
          "Washing dishes left behind",
          "Cleaning sink & faucet",
          "Cleaning inside microwave",
          "Exterior cleaning of appliances",
          "Restocking supplies (if provided)",
        ],
      },
      {
        icon: "🚿",
        title: "Bathrooms",
        items: [
          "Deep cleaning toilets, showers, and tubs",
          "Cleaning sinks, mirrors, and countertops",
          "Replacing towels and toiletries",
          "Disinfecting all surfaces",
        ],
      },
      {
        icon: "✨",
        title: "Guest-Ready Touches",
        items: [
          "Emptying all trash bins",
          "Checking for lost items",
          "Staging welcome amenities",
          "Final walkthrough inspection",
        ],
      },
    ],
    footer: {
      icon: "🕐",
      title: "Turnover Options",
      items: [
        "Same-day turnovers",
        "Recurring schedule",
        "Last-minute availability",
        "Key/lockbox access",
      ],
    },
  },
};

/* ─── Detail Panel Component ─── */
function ServiceDetailPanel({
  serviceId,
  title,
  onClose,
}: {
  serviceId: string;
  title: string;
  onClose: () => void;
}) {
  const detail = serviceDetails[serviceId];
  if (!detail) return null;

  return (
    <div className="bg-[#242424] rounded-2xl border border-white/10 overflow-hidden animate-slide-down">
      {/* Header */}
      <div className="flex items-center justify-between px-6 md:px-8 pt-6 pb-4 border-b border-white/10">
        <div>
          <h3
            className="text-2xl md:text-3xl font-bold text-white"
            style={{ fontFamily: "var(--font-poppins)" }}
          >
            {title}
          </h3>
          {detail.intro && (
            <p className="text-white/60 text-sm mt-1">{detail.intro}</p>
          )}
        </div>
        <button
          onClick={onClose}
          className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 transition-colors flex items-center justify-center text-white/70 hover:text-white shrink-0 ml-4"
          aria-label="Close details"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>

      {/* Checklist label */}
      <div className="px-6 md:px-8 pt-5 pb-2">
        <div className="flex items-center gap-2">
          <span className="text-green-400 text-lg">✓</span>
          <span className="text-gold text-sm font-semibold tracking-widest uppercase">
            What&apos;s Included
          </span>
        </div>
      </div>

      {/* Categories grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 px-6 md:px-8 pb-6">
        {detail.categories.map((cat) => (
          <div key={cat.title} className="bg-white/[0.04] rounded-xl p-5">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xl">{cat.icon}</span>
              <h4 className="text-white font-semibold text-sm">{cat.title}</h4>
            </div>
            <ul className="space-y-2">
              {cat.items.map((item) => (
                <li key={item} className="flex items-start gap-2 text-white/70 text-sm">
                  <span className="text-gold mt-0.5 shrink-0">•</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}

        {/* Footer category (frequency / scheduling) */}
        {detail.footer && (
          <div className="bg-gold/10 border border-gold/20 rounded-xl p-5">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xl">{detail.footer.icon}</span>
              <h4 className="text-gold font-semibold text-sm">
                {detail.footer.title}
              </h4>
            </div>
            <ul className="space-y-2">
              {detail.footer.items.map((item) => (
                <li key={item} className="flex items-start gap-2 text-white/70 text-sm">
                  <span className="text-gold mt-0.5 shrink-0">•</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* CTA */}
      <div className="px-6 md:px-8 pb-6">
        <a
          href="#pricing"
          className="inline-block px-8 py-3 rounded-full font-bold text-sm hover:shadow-xl hover:-translate-y-0.5 transition-all"
          style={{ backgroundColor: "#D4A843", color: "#fff" }}
        >
          Get a Quote
        </a>
      </div>
    </div>
  );
}

/* ─── Main Component ─── */
export default function ServicesSection() {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const detailRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (expandedId && detailRef.current) {
      setTimeout(() => {
        detailRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }, 100);
    }
  }, [expandedId]);

  const handleCardClick = (id: string) => {
    if (expandedId === id) {
      setExpandedId(null);
    } else {
      setExpandedId(id);
    }
  };

  return (
    <section id="services" className="pt-24 pb-24 px-6 bg-dark relative">
      {/* Wave top: white → dark */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-[0]" style={{ transform: "translateY(-99%)" }}>
        <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className="w-full h-[60px] md:h-[80px]">
          <path d="M0,40 C240,80 480,0 720,40 C960,80 1200,0 1440,40 L1440,80 L0,80 Z" fill="#2D2D2D" />
        </svg>
      </div>

      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 pattern-crosshatch pointer-events-none" />

      <div className="max-w-6xl mx-auto relative">
        {/* Section header */}
        <div className="text-center mb-16">
          <span className="inline-block text-gold text-sm font-semibold tracking-[0.2em] uppercase mb-3">
            What We Do
          </span>
          <h2
            className="text-3xl md:text-5xl font-bold text-white mb-5"
            style={{ fontFamily: "var(--font-poppins)" }}
          >
            We clean. You relax.
          </h2>
          <div className="flex items-center justify-center gap-2">
            <div className="w-8 h-[2px] bg-white/20 rounded-full" />
            <div className="w-16 h-[2px] bg-gold rounded-full" />
            <div className="w-8 h-[2px] bg-white/20 rounded-full" />
          </div>
          <p className="text-white/50 text-sm mt-4">Click any service to see the full checklist</p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-5">
          {services.map((service) => {
            const hasDetail = !!serviceDetails[service.id];
            const isExpanded = expandedId === service.id;

            return (
              <button
                type="button"
                key={service.num}
                onClick={() => hasDetail && handleCardClick(service.id)}
                className={`${service.span} group relative ${service.height} rounded-2xl overflow-hidden text-left ${
                  hasDetail ? "cursor-pointer" : "cursor-default"
                } ${isExpanded ? "ring-2 ring-gold ring-offset-2 ring-offset-[#2D2D2D]" : ""}`}
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

                {/* "View details" indicator */}
                {hasDetail && (
                  <div className="absolute top-4 left-4 flex items-center gap-1.5 bg-black/50 backdrop-blur-sm rounded-full px-3 py-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-gold text-xs font-semibold">
                      {isExpanded ? "Hide details" : "View details"}
                    </span>
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#D4A843"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className={`transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`}
                    >
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Expanded Detail Panel */}
        {expandedId && (
          <div ref={detailRef} className="mt-6">
            <ServiceDetailPanel
              serviceId={expandedId}
              title={services.find((s) => s.id === expandedId)?.title ?? ""}
              onClose={() => setExpandedId(null)}
            />
          </div>
        )}
      </div>

      {/* Wave bottom: dark → white */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0]" style={{ transform: "translateY(99%)" }}>
        <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className="w-full h-[60px] md:h-[80px]">
          <path d="M0,0 L0,40 C240,0 480,80 720,40 C960,0 1200,80 1440,40 L1440,0 Z" fill="#2D2D2D" />
        </svg>
      </div>
    </section>
  );
}
