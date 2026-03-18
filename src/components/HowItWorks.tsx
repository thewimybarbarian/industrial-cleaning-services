"use client";

import { useEffect, useRef, useState } from "react";

const steps = [
  {
    num: "01",
    title: "Book",
    description: "Pick your rooms, choose a time, and you're done. Takes less than 60 seconds.",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
        <line x1="10" y1="14" x2="10" y2="14.01" />
        <line x1="14" y1="14" x2="14" y2="14.01" />
        <line x1="10" y1="18" x2="10" y2="18.01" />
      </svg>
    ),
  },
  {
    num: "02",
    title: "We Clean",
    description: "Our team shows up on time, fully equipped, and handles everything top to bottom.",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
  },
  {
    num: "03",
    title: "You Relax",
    description: "Come home to a spotless house. That's it. Simple as it should be.",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    ),
  },
];

function StepCard({ step, index, isVisible }: { step: typeof steps[number]; index: number; isVisible: boolean }) {
  return (
    <div
      className={`relative transition-all duration-700 ease-out ${
        isVisible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-12"
      }`}
      style={{ transitionDelay: `${index * 200}ms` }}
    >
      {/* Connector line (not on last card) */}
      {index < steps.length - 1 && (
        <div className="hidden md:block absolute top-16 left-[calc(100%+0.5rem)] w-[calc(100%-1rem)] h-[2px]">
          <div
            className={`h-full bg-gradient-to-r from-green/40 to-green/10 transition-all duration-1000 ease-out origin-left ${
              isVisible ? "scale-x-100" : "scale-x-0"
            }`}
            style={{ transitionDelay: `${(index + 1) * 300}ms` }}
          />
        </div>
      )}

      <div className="group relative bg-white rounded-3xl p-8 md:p-10 shadow-md hover:shadow-xl transition-all duration-500 hover:-translate-y-2 border border-gray-100 overflow-hidden">
        {/* Background number */}
        <span
          className="absolute -top-4 -right-2 text-[120px] font-bold text-green/[0.04] leading-none select-none pointer-events-none"
          style={{ fontFamily: "var(--font-poppins)" }}
        >
          {step.num}
        </span>

        {/* Icon circle with pulse ring */}
        <div className="relative mb-6">
          <div className={`absolute inset-0 w-16 h-16 rounded-2xl bg-green/20 transition-all duration-700 ${isVisible ? "animate-pulse-slow" : ""}`} />
          <div className="relative w-16 h-16 rounded-2xl bg-green text-white flex items-center justify-center shadow-lg shadow-green/20 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
            {step.icon}
          </div>
        </div>

        {/* Step number + title */}
        <div className="flex items-center gap-3 mb-3">
          <span className="text-xs font-bold text-green tracking-widest uppercase">Step {step.num}</span>
          <div className="w-8 h-[2px] bg-gold rounded-full" />
        </div>

        <h3
          className="text-2xl md:text-3xl font-bold text-dark mb-3"
          style={{ fontFamily: "var(--font-poppins)" }}
        >
          {step.title}
        </h3>

        <p className="text-dark/60 text-base leading-relaxed">
          {step.description}
        </p>
      </div>
    </div>
  );
}

export default function HowItWorks() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="how-it-works" ref={sectionRef} className="py-24 px-6 bg-gray-light relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-green/[0.03] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative">
        <div className="text-center mb-16">
          <span className="inline-block text-green text-sm font-semibold tracking-[0.2em] uppercase mb-3">
            Simple Process
          </span>
          <h2
            className="text-3xl md:text-5xl font-bold text-dark mb-4"
            style={{ fontFamily: "var(--font-poppins)" }}
          >
            Three steps to a clean home
          </h2>
          <div className="flex items-center justify-center gap-2">
            <div className="w-8 h-[2px] bg-green/30 rounded-full" />
            <div className="w-16 h-[2px] bg-gold rounded-full" />
            <div className="w-8 h-[2px] bg-green/30 rounded-full" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, i) => (
            <StepCard key={step.title} step={step} index={i} isVisible={isVisible} />
          ))}
        </div>
      </div>
    </section>
  );
}
